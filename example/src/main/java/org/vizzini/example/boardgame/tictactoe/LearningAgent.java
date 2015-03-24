package org.vizzini.example.boardgame.tictactoe;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Provides an implementation of a computer agent for tic-tac-toe which learns from experience.
 */
public final class LearningAgent implements Agent
{
    /** Action generator. */
    private final TTTActionGenerator actionGenerator;

    /** Agent memory. */
    private AgentMemory agentMemory;

    /** Environment stringifier. */
    private final EnvironmentStringifier environmentStringifier;

    /** List of actions for a single game. */
    private final List<PotentialAction> myActions = new ArrayList<PotentialAction>();

    /** Name. */
    private final String name;

    /** Team. */
    private final TTTTeam team;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param team Team.
     * @param actionGenerator Action generator.
     * @param environmentStringifier Environment stringifier.
     */
    @SuppressWarnings("hiding")
    public LearningAgent(final String name, final TTTTeam team, final TTTActionGenerator actionGenerator,
            final EnvironmentStringifier environmentStringifier)
    {
        this.name = name;
        this.team = team;
        this.actionGenerator = actionGenerator;
        this.environmentStringifier = environmentStringifier;
    }

    @Override
    public Action getAction(final Environment environment, final Adjudicator adjudicator)
    {
        final TTTEnvironment board = (TTTEnvironment)environment;

        if (agentMemory == null)
        {
            agentMemory = new AgentMemory(board);
        }

        final String boardString = environmentStringifier.stringify(board);

        List<PotentialAction> actions = agentMemory.get(boardString);

        if (CollectionUtils.isEmpty(actions))
        {
            final List<Action> tActions = actionGenerator.generateActions(board, adjudicator, this);
            actions = createPotentialActions(tActions);
            agentMemory.put(boardString, actions);
        }

        printActions(actions);

        final PotentialAction potentialAction = determineBestAction(boardString, (TTTAdjudicator)adjudicator, actions);
        myActions.add(potentialAction);

        return potentialAction.createAction(board, this);
    }

    @Override
    public String getDescription()
    {
        return "This agent learns from experience.";
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public TTTTeam getTeam()
    {
        return team;
    }

    @Override
    public void postProcessGame(final Agent winner)
    {
        final boolean isDraw = winner == null;
        final boolean isWin = (winner == this);

        for (final PotentialAction action : myActions)
        {
            if (isDraw)
            {
                action.getStatistics().incrementDraws();
            }
            else if (isWin)
            {
                action.getStatistics().incrementWins();
            }
            else
            {
                action.getStatistics().incrementLosses();
            }
        }

        agentMemory.writeMemory();
        myActions.clear();

        System.out.println();
        agentMemory.printMemoryReport("postProcessGame(): ");
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("name", getName());
        builder.append("team", getTeam());

        return builder.toString();
    }

    /**
     * @param actions Actions.
     * 
     * @return a new list of potential actions.
     */
    private List<PotentialAction> createPotentialActions(final List<Action> actions)
    {
        final List<PotentialAction> answer = new ArrayList<PotentialAction>();

        for (final Action action : actions)
        {
            final TTTAction tAction = (TTTAction)action;
            answer.add(new PotentialAction(tAction));
        }

        return answer;
    }

    /**
     * @param actions Possible actions.
     * 
     * @return the best action from the given parameter.
     */
    private PotentialAction determineBestAction(final List<PotentialAction> actions)
    {
        PotentialAction answer = null;

        final Set<PotentialAction> bestActions = determineBestActions(actions);

        final int size = bestActions.size();
        Iterator<PotentialAction> iter = bestActions.iterator();

        if (size == 1)
        {
            answer = iter.next();
            System.out.print("picked sole action ");
            System.out.println(answer.toString());
        }
        else
        {
            // Prefer the center square.
            while ((answer == null) && iter.hasNext())
            {
                final PotentialAction action = iter.next();
                final TTTPosition position = action.getAction().getPosition();

                if (position == TTTPosition.CENTER)
                {
                    answer = action;
                    System.out.print("picked center square ");
                    System.out.println(answer.toString());
                }
            }

            if (answer == null)
            {
                iter = bestActions.iterator();
                final int index = (int)(Math.random() * size);

                for (int i = 0; i <= index; i++)
                {
                    answer = iter.next();
                }

                System.out.print("picked action #" + index + " ");

                if (answer != null)
                {
                    System.out.println(answer.toString());
                }
            }
        }

        return answer;
    }

    /**
     * @param boardString Board string.
     * @param adjudicator Adjudicator.
     * @param actions Possible actions.
     * 
     * @return the best action.
     */
    private PotentialAction determineBestAction(final String boardString, final TTTAdjudicator adjudicator,
            final List<PotentialAction> actions)
    {
        PotentialAction answer = null;

        if (CollectionUtils.isNotEmpty(actions))
        {
            // First, look for a winning action.
            answer = determineWinningAction(boardString, adjudicator, actions, team);

            if (answer != null)
            {
                System.out.print("\nFound a winning action: ");
                System.out.println(answer.toString());
            }

            if (answer == null)
            {
                // Next, look for a blocking action.
                answer = determineWinningAction(boardString, adjudicator, actions, team.opposite());

                if (answer != null)
                {
                    System.out.print("\nFound a blocking action: ");
                    System.out.println(answer.toString());
                }

                if (answer == null)
                {
                    // Then, look for the best action.
                    answer = determineBestAction(actions);
                }
            }
        }

        return answer;
    }

    /**
     * @param actions Possible actions.
     * 
     * @return the subset of best actions from the given parameter.
     */
    private Set<PotentialAction> determineBestActions(final List<PotentialAction> actions)
    {
        final Set<PotentialAction> answer = new HashSet<PotentialAction>();

        double bestRating = Double.NEGATIVE_INFINITY;

        for (final PotentialAction action : actions)
        {
            final double rating = action.getStatistics().getRating();

            if (rating > bestRating)
            {
                bestRating = rating;
                answer.clear();
                answer.add(action);
            }
            else if (rating == bestRating)
            {
                answer.add(action);
            }
        }

        return answer;
    }

    /**
     * @param boardString Board string.
     * @param adjudicator Adjudicator.
     * @param actions Possible actions.
     * @param team Team.
     * 
     * @return the first winning action, if any.
     */
    @SuppressWarnings("hiding")
    private PotentialAction determineWinningAction(final String boardString, final TTTAdjudicator adjudicator,
            final List<PotentialAction> actions, final TTTTeam team)
    {
        PotentialAction answer = null;

        for (final PotentialAction action : actions)
        {
            final int index = action.getAction().getPosition().getIndex();
            final String boardString2 = boardString.substring(0, index) + team.getName()
                    + boardString.substring(index + 1);
            final TTTTeam winnerTeam = adjudicator.determineWinningAgentTeam(boardString2);

            if (team == winnerTeam)
            {
                answer = action;
                break;
            }
        }

        return answer;
    }

    /**
     * @param actions Actions.
     */
    private void printActions(final List<PotentialAction> actions)
    {
        for (final PotentialAction action : actions)
        {
            System.out.println(action.toString());
        }
    }
}
