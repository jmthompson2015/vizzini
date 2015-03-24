package org.vizzini.example.boardgame.hexchess;

import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;

/**
 * Provides an environment evaluator for checkers.
 */
public final class HexChessEnvironmentEvaluator implements EnvironmentEvaluator
{
    @Override
    public int evaluate(final Environment environment, final Adjudicator adjudicator, final Agent agent)
    {
        final HexChessEnvironment cEnvironment = (HexChessEnvironment)environment;
        final HexChessTeam team = (HexChessTeam)agent.getTeam();

        int answer = 0;

        for (final HexChessPosition position : HexChessPosition.values())
        {
            final HexChessToken token = cEnvironment.getTokenAt(position);

            if (token != null)
            {
                final int factor = (token.getTeam() == team ? 1 : -1);
                answer += factor * token.getType().getValue();
            }
        }

        return answer;
    }
}
