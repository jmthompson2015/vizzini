package org.vizzini.example.boardgame.tictactoe;

import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;

/**
 * Provides an environment evaluator for tic-tac-toe.
 */
public final class TTTEnvironmentEvaluator implements EnvironmentEvaluator
{
    @Override
    public int evaluate(final Environment environment, final Adjudicator adjudicator, final Agent agent)
    {
        int answer = 0;

        final TTTEnvironment tEnvironment = (TTTEnvironment)environment;

        for (final TTTPosition position : TTTPosition.values())
        {
            final TTTToken token = tEnvironment.getTokenAt(position);

            if (token != null)
            {
                final int factor = (token.getTeam() == agent.getTeam() ? 1 : -1);

                if (position.isCenter())
                {
                    answer += factor * 3;
                }
                else if (position.isCorner())
                {
                    answer += factor * 2;
                }
                else
                {
                    answer += factor * 1;
                }
            }
        }

        return answer;
    }
}
