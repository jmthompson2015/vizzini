package org.vizzini.example.boardgame.checkers;

import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Token;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;

/**
 * Provides an environment evaluator for checkers.
 */
public final class CheckersEnvironmentEvaluator implements EnvironmentEvaluator
{
    @Override
    public int evaluate(final Environment environment, final Adjudicator adjudicator, final Agent agent)
    {
        final CheckersEnvironment cEnvironment = (CheckersEnvironment)environment;
        final CheckersTeam team = (CheckersTeam)agent.getTeam();

        int answer = 0;

        for (final CheckersPosition position : CheckersPosition.values())
        {
            final Token token = cEnvironment.getTokenAt(position);

            if (token != null)
            {
                final int factor = (token.getTeam() == team ? 1 : -1);

                if (token instanceof King)
                {
                    answer += factor * 2;
                }
                else
                {
                    answer += factor;
                }
            }
        }

        return answer;
    }
}
