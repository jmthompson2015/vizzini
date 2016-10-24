package org.vizzini.example.boardgame.checkers;

import java.util.List;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Token;

/**
 * Provides an adjudicator for checkers.
 * 
 * @see <a href="http://en.wikipedia.org/wiki/Checkers">Checkers (Wikipedia)</a>
 * @see <a href="http://en.wikipedia.org/wiki/English_draughts">English Draughts (Wikipedia)</a>
 */
public final class CheckersAdjudicator implements Adjudicator
{
    /** Action generator. */
    private final CheckersActionGenerator actionGenerator;

    /**
     * Construct this object.
     * 
     * @param actionGenerator Action generator. (required)
     */
    @SuppressWarnings("hiding")
    public CheckersAdjudicator(final CheckersActionGenerator actionGenerator)
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

        if (environment != null)
        {
            final CheckersEnvironment cEnvironment = (CheckersEnvironment)environment;
            final Agent agentRed = cEnvironment.getFirstAgent();
            final Agent agentWhite = cEnvironment.getSecondAgent();
            final boolean isRedAvailable = isActionAvailableFor(cEnvironment, agentRed);
            final boolean isWhiteAvailable = isActionAvailableFor(cEnvironment, agentWhite);
            // System.out.println("isRedAvailable ? " + isRedAvailable + " isWhiteAvailable ? " + isWhiteAvailable);

            if (!(isRedAvailable && isWhiteAvailable))
            {
                if (!isRedAvailable && !isWhiteAvailable)
                {
                    // Draw.
                }
                else if (isRedAvailable)
                {
                    answer = agentRed;
                }
                else if (isWhiteAvailable)
                {
                    answer = agentWhite;
                }
                else
                {
                    final int redCount = cEnvironment.getTokenCountFor(CheckersTeam.RED);
                    final int whiteCount = cEnvironment.getTokenCountFor(CheckersTeam.WHITE);

                    if (redCount > whiteCount)
                    {
                        answer = agentRed;
                    }
                    else if (redCount < whiteCount)
                    {
                        answer = agentWhite;
                    }
                }
            }
        }

        return answer;
    }

    /**
     * @return the actionGenerator
     */
    public CheckersActionGenerator getActionGenerator()
    {
        return actionGenerator;
    }

    @Override
    public String getDescription()
    {
        return "checkers adjudicator";
    }

    @Override
    public String getName()
    {
        return "Checkers Adjudicator";
    }

    @Override
    public boolean isActionLegal(final Action action)
    {
        boolean answer = false;

        if (action != null)
        {
            if (action instanceof CheckersJumpAction)
            {
                final CheckersJumpAction jAction = (CheckersJumpAction)action;
                final CheckersEnvironment environment = jAction.getEnvironment();
                final CheckersTeam team = (CheckersTeam)jAction.getAgent().getTeam();
                final CheckersPosition fromPosition = jAction.getFromPosition();
                final CheckersPosition toPosition = jAction.getToPosition();

                answer = isJumpActionLegalFor(environment, team, fromPosition, toPosition);
            }
            else if (action instanceof CheckersMoveAction)
            {
                final CheckersMoveAction mAction = (CheckersMoveAction)action;
                final CheckersEnvironment environment = mAction.getEnvironment();

                if (!isJumpActionAvailableFor(environment, mAction.getAgent()))
                {
                    final CheckersTeam team = (CheckersTeam)mAction.getAgent().getTeam();
                    final CheckersPosition fromPosition = mAction.getFromPosition();
                    final CheckersPosition toPosition = mAction.getToPosition();

                    answer = isMoveActionLegalFor(environment, team, fromPosition, toPosition);
                }
            }
            else
            {
                throw new RuntimeException("Unknown action type: " + action.getClass().getName());
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
            final CheckersEnvironment cEnvironment = (CheckersEnvironment)environment;
            final Agent agentRed = cEnvironment.getFirstAgent();
            final Agent agentWhite = cEnvironment.getSecondAgent();

            answer = !(isActionAvailableFor(cEnvironment, agentRed) && isActionAvailableFor(cEnvironment, agentWhite));
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param team Team.
     * @param fromPosition From position.
     * @param toPosition To position.
     * 
     * @return true if the given action is legal.
     */
    public boolean isJumpActionLegalFor(final CheckersEnvironment environment, final CheckersTeam team,
            final CheckersPosition fromPosition, final CheckersPosition toPosition)
    {
        boolean answer = false;

        final Token fromToken = environment.getTokenAt(fromPosition);
        final Token toToken = environment.getTokenAt(toPosition);
        final int dx = toPosition.getX() - fromPosition.getX();

        if ((fromToken != null) && (toToken == null) && (fromToken.getTeam() == team) && (Math.abs(dx) == 2))
        {
            final int dy = toPosition.getY() - fromPosition.getY();

            if (((fromToken instanceof Pawn) && ((team == CheckersTeam.RED) && (dy == -2)))
                    || ((team == CheckersTeam.WHITE) && (dy == 2)))
            {
                final Token victimToken = getVictimToken(environment, fromPosition, toPosition);

                if ((victimToken != null) && (victimToken.getTeam() == team.opposite()))
                {
                    answer = true;
                }
            }
            else if ((fromToken instanceof King) && (Math.abs(dy) == 2))
            {
                final Token victimToken = getVictimToken(environment, fromPosition, toPosition);

                if ((victimToken != null) && (victimToken.getTeam() == team.opposite()))
                {
                    answer = true;
                }
            }
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param team Team.
     * @param fromPosition From position.
     * @param toPosition To position.
     * 
     * @return true if the given action is legal.
     */
    public boolean isMoveActionLegalFor(final CheckersEnvironment environment, final CheckersTeam team,
            final CheckersPosition fromPosition, final CheckersPosition toPosition)
    {
        boolean answer = false;

        final Token fromToken = environment.getTokenAt(fromPosition);
        final Token toToken = environment.getTokenAt(toPosition);
        final int dx = toPosition.getX() - fromPosition.getX();

        if ((fromToken != null) && (toToken == null) && (fromToken.getTeam() == team) && (Math.abs(dx) == 1))
        {
            final int dy = toPosition.getY() - fromPosition.getY();

            if ((fromToken instanceof Pawn)
                    && (((team == CheckersTeam.RED) && (dy == -1)) || ((team == CheckersTeam.WHITE) && (dy == 1))))
            {
                answer = true;
            }
            else if ((fromToken instanceof King) && (Math.abs(dy) == 1))
            {
                answer = true;
            }
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param fromPosition From position.
     * @param toPosition To position.
     * 
     * @return the victim token.
     */
    private Token getVictimToken(final CheckersEnvironment environment, final CheckersPosition fromPosition,
            final CheckersPosition toPosition)
    {
        final int dx = toPosition.getX() - fromPosition.getX();
        final int dy = toPosition.getY() - fromPosition.getY();
        final int x = fromPosition.getX() + (dx / 2);
        final int y = fromPosition.getY() + (dy / 2);
        final CheckersPosition victimPosition = CheckersPosition.findByCoordinates(x, y);

        return environment.getTokenAt(victimPosition);
    }

    /**
     * @param environment Environment.
     * @param agent Agent.
     * 
     * @return true if there is at least one action available for the given agent.
     */
    private boolean isActionAvailableFor(final CheckersEnvironment environment, final Agent agent)
    {
        final List<Action> actions = getActionGenerator().generateActions(environment, this, agent);

        return !actions.isEmpty();
    }

    /**
     * @param environment Environment.
     * @param agent Agent.
     * 
     * @return true if there is at least one jump action available for the given agent.
     */
    private boolean isJumpActionAvailableFor(final CheckersEnvironment environment, final Agent agent)
    {
        final List<Action> actions = getActionGenerator().generateActions(environment, this, agent);

        return !actions.isEmpty() && (actions.get(0) instanceof CheckersJumpAction);
    }
}
