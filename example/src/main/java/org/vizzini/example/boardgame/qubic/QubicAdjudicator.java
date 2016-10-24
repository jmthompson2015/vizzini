package org.vizzini.example.boardgame.qubic;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Token;

/**
 * Provides an implementation of an adjudicator for qubic.
 */
public final class QubicAdjudicator implements Adjudicator
{
    @Override
    public Agent determineWinner(final Environment environment)
    {
        Agent answer = null;

        if (environment != null)
        {
            final QubicEnvironment qEnvironment = (QubicEnvironment)environment;

            QubicTeam team = null;

            // Files.
            for (int z = 0; (team == null) && (z < QubicPosition.MAX_Z); z++)
            {
                for (int y = 0; (team == null) && (y < QubicPosition.MAX_Y); y++)
                {
                    final QubicPosition position = QubicPosition.findByCoordinates(0, y, z);
                    team = determineWinnerTeam(qEnvironment, position, 1, 0, 0);
                }
            }

            if (team == null)
            {
                // Ranks.
                for (int z = 0; (team == null) && (z < QubicPosition.MAX_Z); z++)
                {
                    for (int x = 0; (team == null) && (x < QubicPosition.MAX_X); x++)
                    {
                        final QubicPosition position = QubicPosition.findByCoordinates(x, 0, z);
                        team = determineWinnerTeam(qEnvironment, position, 0, 1, 0);
                    }
                }
            }

            if (team == null)
            {
                // Levels.
                for (int y = 0; (team == null) && (y < QubicPosition.MAX_Y); y++)
                {
                    for (int x = 0; (team == null) && (x < QubicPosition.MAX_X); x++)
                    {
                        final QubicPosition position = QubicPosition.findByCoordinates(x, y, 0);
                        team = determineWinnerTeam(qEnvironment, position, 0, 0, 1);
                    }
                }
            }

            if (team == null)
            {
                // XY diagonal.
                for (int z = 0; (team == null) && (z < QubicPosition.MAX_Z); z++)
                {
                    QubicPosition position = QubicPosition.findByCoordinates(0, 0, z);
                    team = determineWinnerTeam(qEnvironment, position, 1, 1, 0);

                    if (team == null)
                    {
                        position = QubicPosition.findByCoordinates(0, 3, z);
                        team = determineWinnerTeam(qEnvironment, position, 1, -1, 0);
                    }
                }
            }

            if (team == null)
            {
                // XZ diagonal.
                for (int y = 0; (team == null) && (y < QubicPosition.MAX_Y); y++)
                {
                    QubicPosition position = QubicPosition.findByCoordinates(0, y, 0);
                    team = determineWinnerTeam(qEnvironment, position, 1, 0, 1);

                    if (team == null)
                    {
                        position = QubicPosition.findByCoordinates(0, y, 3);
                        team = determineWinnerTeam(qEnvironment, position, 1, 0, -1);
                    }
                }
            }

            if (team == null)
            {
                // YZ diagonal.
                for (int x = 0; (team == null) && (x < QubicPosition.MAX_X); x++)
                {
                    QubicPosition position = QubicPosition.findByCoordinates(x, 0, 0);
                    team = determineWinnerTeam(qEnvironment, position, 0, 1, 1);

                    if (team == null)
                    {
                        position = QubicPosition.findByCoordinates(x, 0, 3);
                        team = determineWinnerTeam(qEnvironment, position, 0, 1, -1);
                    }
                }
            }

            if (team == null)
            {
                // Triagonal.
                final QubicPosition position = QubicPosition.findByCoordinates(0, 0, 0);
                team = determineWinnerTeam(qEnvironment, position, 1, 1, 1);
            }

            if (team == null)
            {
                // Triagonal.
                final QubicPosition position = QubicPosition.findByCoordinates(0, 0, 3);
                team = determineWinnerTeam(qEnvironment, position, 1, 1, -1);
            }

            if (team == null)
            {
                // Triagonal.
                final QubicPosition position = QubicPosition.findByCoordinates(0, 3, 0);
                team = determineWinnerTeam(qEnvironment, position, 1, -1, 1);
            }

            if (team == null)
            {
                // Triagonal.
                final QubicPosition position = QubicPosition.findByCoordinates(0, 3, 3);
                team = determineWinnerTeam(qEnvironment, position, 1, -1, -1);
            }

            answer = findAgentByTeam(qEnvironment, team);
        }

        return answer;
    }

    @Override
    public String getDescription()
    {
        return "A qubic adjudicator.";
    }

    @Override
    public String getName()
    {
        return "QubicAdjudicator";
    }

    @Override
    public boolean isActionLegal(final Action action)
    {
        boolean answer = false;

        if (action != null)
        {
            final QubicAction qAction = (QubicAction)action;
            final QubicEnvironment environment = qAction.getEnvironment();
            final QubicPosition position = qAction.getPosition();
            answer = (position != null) && environment.isEmpty(qAction.getPosition());
        }

        return answer;
    }

    @Override
    public boolean isGameOver(final Environment environment)
    {
        boolean answer = false;

        if (environment != null)
        {
            answer = ((environment.getTokenCount() == 9) || (determineWinner(environment) != null));
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param startPosition Start position.
     * @param dx Delta X.
     * @param dy Delta Y.
     * @param dz Delta Z.
     * 
     * @return the winning team, or null.
     */
    private QubicTeam determineWinnerTeam(final QubicEnvironment environment, final QubicPosition startPosition,
            final int dx, final int dy, final int dz)
    {
        QubicTeam answer = null;

        QubicToken token0 = null;
        QubicToken token1 = null;
        QubicToken token2 = null;
        QubicToken token3 = null;

        for (int i = 0; i < 4; i++)
        {
            final int x = startPosition.getX() + (i * dx);
            final int y = startPosition.getY() + (i * dy);
            final int z = startPosition.getZ() + (i * dz);

            final QubicPosition position = QubicPosition.findByCoordinates(x, y, z);
            final QubicToken token = environment.getTokenAt(position);

            switch (i)
            {
            case 0:
                token0 = token;
                break;
            case 1:
                token1 = token;
                break;
            case 2:
                token2 = token;
                break;
            case 3:
                token3 = token;
                break;
            }
        }

        if ((token0 != null) && (token1 != null) && (token2 != null) && (token3 != null))
        {
            final QubicTeam team0 = token0.getTeam();
            final QubicTeam team1 = token1.getTeam();
            final QubicTeam team2 = token2.getTeam();
            final QubicTeam team3 = token3.getTeam();

            if ((team0 == team1) && (team1 == team2) && (team2 == team3))
            {
                answer = team0;
            }
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param team Team.
     * 
     * @return the agent with the given name.
     */
    private Agent findAgentByTeam(final QubicEnvironment environment, final QubicTeam team)
    {
        Agent answer = null;

        if (team != null)
        {
            final QubicPosition[] values = QubicPosition.values();

            for (final QubicPosition position : values)
            {
                final Token token = environment.getTokenAt(position);

                if ((token != null) && (team == token.getTeam()))
                {
                    answer = token.getAgent();
                    break;
                }
            }
        }

        return answer;
    }
}
