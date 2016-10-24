package org.vizzini.example.boardgame.qubic;

import static org.vizzini.core.game.Constants.INFINITY;

import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;

/**
 * Provides an environment evaluator for qubic.
 */
public final class QubicEnvironmentEvaluator implements EnvironmentEvaluator
{
    @Override
    public int evaluate(final Environment environment, final Adjudicator adjudicator, final Agent agent)
    {
        int answer = 0;

        if (adjudicator.isGameOver(environment))
        {
            final Agent winner = adjudicator.determineWinner(environment);

            if (winner != null)
            {
                final QubicTeam winnerTeam = (QubicTeam)winner.getTeam();
                final int factor = (winnerTeam == agent.getTeam() ? 1 : -1);
                answer = factor * (INFINITY - 1);
            }
        }
        else
        {
            final QubicEnvironment qEnvironment = (QubicEnvironment)environment;

            for (final QubicPosition position : QubicPosition.values())
            {
                final QubicToken token = qEnvironment.getTokenAt(position);

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
        }

        return answer;
    }
}
