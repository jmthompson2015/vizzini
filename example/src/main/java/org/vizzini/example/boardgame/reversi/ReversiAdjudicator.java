package org.vizzini.example.boardgame.reversi;

import java.util.List;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Provides an implementation of an adjudicator for reversi.
 */
public final class ReversiAdjudicator implements Adjudicator
{
    /** Directions. */
    public static final int[][] DIRECTIONS = { { -1, -1 }, { 0, -1 }, { 1, -1 }, { -1, 0 }, { 1, 0 }, { -1, 1 },
            { 0, 1 }, { 1, 1 }, };

    /** Action generator. */
    private final ReversiActionGenerator actionGenerator;

    /**
     * Construct this object.
     * 
     * @param actionGenerator Action generator. (required)
     */
    @SuppressWarnings("hiding")
    public ReversiAdjudicator(final ReversiActionGenerator actionGenerator)
    {
        if (actionGenerator == null)
        {
            throw new IllegalArgumentException("actionGenerator is null");
        }

        this.actionGenerator = actionGenerator;
    }

    @Override
    public Agent determineWinner(final Environment environment)
    {
        Agent answer = null;

        if (isGameOver(environment))
        {
            final ReversiEnvironment rEnvironment = (ReversiEnvironment)environment;
            final int blackCount = rEnvironment.getTokenCountFor(ReversiTeam.BLACK);
            final int whiteCount = rEnvironment.getTokenCountFor(ReversiTeam.WHITE);

            if (blackCount > whiteCount)
            {
                answer = rEnvironment.getFirstAgent();
            }
            else if (blackCount < whiteCount)
            {
                answer = rEnvironment.getSecondAgent();
            }
        }

        return answer;
    }

    /**
     * @return actionGenerator
     */
    public ReversiActionGenerator getActionGenerator()
    {
        return actionGenerator;
    }

    @Override
    public String getDescription()
    {
        return "A reversi adjudicator.";
    }

    @Override
    public String getName()
    {
        return "Reversi Adjudicator";
    }

    @Override
    public boolean isActionLegal(final Action action)
    {
        boolean answer = true;

        // Action can be null if the agent passes.
        if (action != null)
        {
            final ReversiAction rAction = (ReversiAction)action;
            final ReversiEnvironment environment = rAction.getEnvironment();
            final ReversiPosition position = rAction.getPosition();
            final ReversiTeam team = rAction.getToken().getTeam();

            answer = isActionLegalFor(environment, team, position);
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param team Team.
     * @param position Position.
     * 
     * @return true if the given action is legal.
     */
    public boolean isActionLegalFor(final ReversiEnvironment environment, final ReversiTeam team,
            final ReversiPosition position)
    {
        boolean answer = false;

        if (environment.getTokenAt(position) == null)
        {
            // Look around for an opposite agent's token, then one of ours.
            for (int i = 0; !answer && (i < DIRECTIONS.length); i++)
            {
                final int x1 = position.getX() + DIRECTIONS[i][0];
                final int y1 = position.getY() + DIRECTIONS[i][1];
                final ReversiPosition position1 = ReversiPosition.findByCoordinates(x1, y1);

                if (position1 != null)
                {
                    final ReversiToken token1 = environment.getTokenAt(position1);

                    if ((token1 != null) && !team.equals(token1.getTeam()))
                    {
                        final int lineLength = environment.determineLineLength(team, position, DIRECTIONS[i]);
                        answer = lineLength > 0;
                    }
                }
            }
        }

        return answer;
    }

    @Override
    public boolean isGameOver(final Environment environment)
    {
        boolean answer = false;

        if (environment != null)
        {
            final ReversiEnvironment rEnvironment = (ReversiEnvironment)environment;
            final Agent agentBlack = rEnvironment.getFirstAgent();
            final Agent agentWhite = rEnvironment.getSecondAgent();

            answer = (rEnvironment.getTokenCount() == 64)
                    || (!isActionAvailableFor(rEnvironment, agentBlack) && !isActionAvailableFor(rEnvironment,
                            agentWhite));
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param agent Agent.
     * 
     * @return true if there is at least one action available for the given agent.
     */
    private boolean isActionAvailableFor(final ReversiEnvironment environment, final Agent agent)
    {
        final List<Action> actions = actionGenerator.generateActions(environment, this, agent);

        return !actions.isEmpty();
    }
}
