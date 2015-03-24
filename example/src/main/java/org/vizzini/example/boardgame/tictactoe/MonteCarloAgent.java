package org.vizzini.example.boardgame.tictactoe;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.TimePrinter;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Provides an implementation of an agent which uses a Monte Carlo tree search.
 * 
 * @see <a href="http://spectrum.ieee.org/robotics/artificial-intelligence/ais-have-mastered-chess-will-go-be-next">AIs
 *      Have Mastered Chess. Will Go Be Next?</a>
 * @see <a href="http://en.wikipedia.org/wiki/Monte_Carlo_tree_search">Monte-Carlo tree search (Wikipedia)</a>
 */
public final class MonteCarloAgent implements Agent
{
    /** Flag indicating whether to print output. */
    private static final boolean IS_VERBOSE = false;

    /** Action generator. */
    private final TTTActionGenerator actionGenerator;

    /** Name. */
    private final String name;

    /** Team. */
    private final TTTTeam team;

    /** Trial count. */
    private final int trialCount;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param team Team.
     * @param actionGenerator Action generator.
     * @param trialCount Trial count.
     */
    @SuppressWarnings("hiding")
    public MonteCarloAgent(final String name, final TTTTeam team, final TTTActionGenerator actionGenerator,
            final int trialCount)
    {
        this.name = name;
        this.team = team;
        this.actionGenerator = actionGenerator;
        this.trialCount = trialCount;
    }

    /**
     * Construct this object.
     * 
     * @param team Team.
     * @param actionGenerator Action generator.
     * @param trialCount Trial count.
     */
    @SuppressWarnings("hiding")
    public MonteCarloAgent(final TTTTeam team, final TTTActionGenerator actionGenerator, final int trialCount)
    {
        this(team.getName(), team, actionGenerator, trialCount);
    }

    @Override
    public TTTAction getAction(final Environment environment, final Adjudicator adjudicator)
    {
        final long start = System.currentTimeMillis();

        final TTTEnvironment tEnvironment = (TTTEnvironment)environment;
        final TTTAdjudicator tAdjudicator = (TTTAdjudicator)adjudicator;
        final Map<TTTAction, Integer> actionToWins = new HashMap<TTTAction, Integer>();
        final Map<TTTAction, Integer> actionToDraws = new HashMap<TTTAction, Integer>();
        final Map<TTTAction, Integer> actionToLosses = new HashMap<TTTAction, Integer>();
        final Map<TTTAction, Integer> actionToUse = new HashMap<TTTAction, Integer>();
        final List<Action> actions = actionGenerator.generateActions(environment, adjudicator, this);

        // Run trials using a randomly selected action.
        for (int i = 0; i < trialCount; i++)
        {
            final TTTAction action = selectAction(actions);
            final Boolean gameResult = playGame(tEnvironment, tAdjudicator, action);

            if (gameResult == null)
            {
                // Draw.
                incrementCount(actionToDraws, action);
            }
            else if (gameResult)
            {
                // Win.
                incrementCount(actionToWins, action);
            }
            else
            {
                // Loss.
                incrementCount(actionToLosses, action);
            }

            incrementCount(actionToUse, action);
        }

        // if (IS_VERBOSE)
        {
            printTrialResults(actionToWins, actionToDraws, actionToLosses, actionToUse);
        }

        // Find the action with the most wins.
        int bestCount = -1;
        TTTAction bestAction = null;

        // for (final Entry<TTTAction, Integer> entry : actionToWins.entrySet())
        for (final Entry<TTTAction, Integer> entry : actionToUse.entrySet())
        {
            // final int count = entry.getValue();
            final TTTAction action = entry.getKey();
            Integer count = actionToLosses.get(action);

            if (count == null)
            {
                count = 0;
            }

            // if ((bestAction == null) || (count > bestCount))
            if ((bestAction == null) || (count < bestCount))
            {
                bestCount = count;
                bestAction = action;
            }
        }

        System.out.println("returning bestAction = " + bestAction);

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("MonteCarloAgent.getAction()", start, end);

        return bestAction;
    }

    @Override
    public String getDescription()
    {
        return "This agent performs a Monte Carlo tree search to find the best action.";
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
        // Nothing to do.
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
     * @param map Map of action to count.
     * @param action Action.
     */
    private void incrementCount(final Map<TTTAction, Integer> map, final TTTAction action)
    {
        Integer count = map.get(action);

        if (count == null)
        {
            count = 0;
        }

        map.put(action, count + 1);
    }

    /**
     * @param environment The current environment.
     * @param adjudicator Adjudicator for determining legal actions.
     * @param firstAction The first action.
     * 
     * @return true if this agent is the winner.
     */
    private Boolean playGame(final TTTEnvironment environment, final TTTAdjudicator adjudicator,
            final TTTAction firstAction)
    {
        final TTTEnvironment tEnvironment = environment.copy();
        final TTTTeam opponentTeam = getTeam().opposite();
        final Agent opponent = new SimpleAgent(opponentTeam.getName(), opponentTeam, actionGenerator);

        // Perform the first action.
        final TTTPosition position = firstAction.getPosition();
        final TTTToken token = firstAction.getToken().withAgent(this);
        Action action = new TTTAction(tEnvironment, position, token);

        if (IS_VERBOSE)
        {
            System.out.println("performing action " + action);
        }

        action.doIt();

        if (IS_VERBOSE)
        {
            System.out.println(tEnvironment);
        }

        // Play out the game.
        Agent current = opponent;
        Agent winner = adjudicator.determineWinner(tEnvironment);

        if (IS_VERBOSE)
        {
            System.out.println(tEnvironment);
            System.out.println("0 winner = " + winner);
            System.out.println("0 isGameOver ? " + adjudicator.isGameOver(tEnvironment));
        }

        while ((winner == null) && !adjudicator.isGameOver(tEnvironment))
        {
            final List<Action> actions = actionGenerator.generateActions(tEnvironment, adjudicator, current);
            action = selectAction(actions);

            if (IS_VERBOSE)
            {
                System.out.println("performing action " + action);
            }

            action.doIt();

            current = (current == this ? opponent : this);
            winner = adjudicator.determineWinner(tEnvironment);

            if (IS_VERBOSE)
            {
                System.out.println(tEnvironment);
                System.out.println("winner = " + winner);
                System.out.println("isGameOver ? " + adjudicator.isGameOver(tEnvironment));
            }
        }

        Boolean answer = null;

        if (winner != null)
        {
            answer = (winner.getTeam() == team);
        }

        if (IS_VERBOSE)
        {
            System.out.println("returning answer ? " + answer);
        }

        return answer;
    }

    /**
     * @param actionToWins Map of action to win count.
     * @param actionToDraws Map of action to draw count.
     * @param actionToLosses Map of action to loss count.
     * @param actionToUse Map of action to use count.
     */
    private void printTrialResults(final Map<TTTAction, Integer> actionToWins,
            final Map<TTTAction, Integer> actionToDraws, final Map<TTTAction, Integer> actionToLosses,
            final Map<TTTAction, Integer> actionToUse)
    {
        System.out.println("actionToWins.size() " + actionToWins.size());

        int winCount = 0;
        int drawCount = 0;
        int lossCount = 0;
        int useCount = 0;

        for (final Entry<TTTAction, Integer> entry : actionToWins.entrySet())
        {
            final TTTAction action = entry.getKey();
            final Integer wins = entry.getValue();

            System.out.println(action.getPosition() + " wins = " + wins);

            if (wins != null)
            {
                winCount += wins;
            }
        }

        for (final Entry<TTTAction, Integer> entry : actionToDraws.entrySet())
        {
            final TTTAction action = entry.getKey();
            final Integer draws = entry.getValue();

            System.out.println(action.getPosition() + " draws " + draws);

            if (draws != null)
            {
                drawCount += draws;
            }
        }

        for (final Entry<TTTAction, Integer> entry : actionToLosses.entrySet())
        {
            final TTTAction action = entry.getKey();
            final Integer losses = entry.getValue();

            System.out.println(action.getPosition() + " losses " + losses);

            if (losses != null)
            {
                lossCount += losses;
            }
        }

        for (final Entry<TTTAction, Integer> entry : actionToUse.entrySet())
        {
            final TTTAction action = entry.getKey();
            final Integer uses = entry.getValue();

            System.out.println(action.getPosition() + " uses " + uses);

            if (uses != null)
            {
                useCount += uses;
            }
        }

        System.out.println("won " + winCount + " / drew " + drawCount + " / lost " + lossCount + " / " + useCount
                + " games");
    }

    /**
     * @param actions Actions.
     * 
     * @return a randomly selected action.
     */
    private TTTAction selectAction(final List<Action> actions)
    {
        TTTAction answer = null;

        if (CollectionUtils.isNotEmpty(actions))
        {
            if (actions.size() == 1)
            {
                answer = (TTTAction)actions.get(0);
            }
            else
            {
                // Randomly pick an action.
                final int size = actions.size();
                final int index = (int)(size * Math.random());
                answer = (TTTAction)actions.get(index);
            }
        }

        return answer;
    }
}
