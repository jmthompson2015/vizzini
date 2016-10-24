package org.vizzini.example.boardgame.checkers;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Token;
import org.vizzini.core.game.boardgame.ActionGenerator;

/**
 * Provides an action generator for jump and move actions.
 */
public final class CheckersActionGenerator implements ActionGenerator
{
    @Override
    public List<Action> generateActions(final Environment environment, final Adjudicator adjudicator, final Agent agent)
    {
        if (environment == null)
        {
            throw new IllegalArgumentException("environment is null");
        }

        if (adjudicator == null)
        {
            throw new IllegalArgumentException("adjudicator is null");
        }

        if (agent == null)
        {
            throw new IllegalArgumentException("agent is null");
        }

        final CheckersEnvironment cEnvironment = (CheckersEnvironment)environment;
        final CheckersAdjudicator cAdjudicator = (CheckersAdjudicator)adjudicator;

        List<Action> answer = generateJumpActions(cEnvironment, cAdjudicator, agent);

        if (answer.isEmpty())
        {
            answer = generateMoveActions(cEnvironment, cAdjudicator, agent);
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     * 
     * @return all the possible actions.
     */
    private List<Action> generateJumpActions(final CheckersEnvironment environment,
            final CheckersAdjudicator adjudicator, final Agent agent)
    {
        final List<Action> answer = new ArrayList<Action>();

        final CheckersTeam team = (CheckersTeam)agent.getTeam();
        final CheckersPosition[] values = CheckersPosition.values();

        for (final CheckersPosition fromPosition : values)
        {
            final Token fromToken = environment.getTokenAt(fromPosition);

            if ((fromToken != null) && (fromToken.getTeam() == team))
            {
                for (final CheckersPosition toPosition : values)
                {
                    final Token toToken = environment.getTokenAt(toPosition);

                    if ((toToken == null)
                            && adjudicator.isJumpActionLegalFor(environment, team, fromPosition, toPosition))
                    {
                        final CheckersJumpAction action = new CheckersJumpAction(environment, agent, fromPosition,
                                toPosition);
                        answer.add(action);
                    }
                }
            }
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     * 
     * @return all the possible actions.
     */
    private List<Action> generateMoveActions(final CheckersEnvironment environment,
            final CheckersAdjudicator adjudicator, final Agent agent)
    {
        final List<Action> answer = new ArrayList<Action>();

        final CheckersTeam team = (CheckersTeam)agent.getTeam();
        final CheckersPosition[] values = CheckersPosition.values();

        for (final CheckersPosition fromPosition : values)
        {
            final Token fromToken = environment.getTokenAt(fromPosition);

            if ((fromToken != null) && (fromToken.getTeam() == team))
            {
                for (final CheckersPosition toPosition : values)
                {
                    final Token toToken = environment.getTokenAt(toPosition);

                    if ((toToken == null)
                            && adjudicator.isMoveActionLegalFor(environment, team, fromPosition, toPosition))
                    {
                        final CheckersMoveAction action = new CheckersMoveAction(environment, agent, fromPosition,
                                toPosition);
                        answer.add(action);
                    }
                }
            }
        }

        return answer;
    }
}
