package org.vizzini.example.boardgame.reversi;

import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Token;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;

/**
 * Provides an environment evaluator for reversi.
 */
public final class ReversiEnvironmentEvaluator implements EnvironmentEvaluator
{
    @Override
    public int evaluate(final Environment environment, final Adjudicator adjudicator, final Agent agent)
    {
        final ReversiEnvironment rEnvironment = (ReversiEnvironment)environment;
        final ReversiTeam team = (ReversiTeam)agent.getTeam();

        int answer = 0;

        for (final ReversiPosition position : ReversiPosition.values())
        {
            final Token token = rEnvironment.getTokenAt(position);

            if (token != null)
            {
                final int factor = (token.getTeam() == team ? 1 : -1);

                if (position.isCorner())
                {
                    answer += factor * 3;
                }
                else if (position.isSide())
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
