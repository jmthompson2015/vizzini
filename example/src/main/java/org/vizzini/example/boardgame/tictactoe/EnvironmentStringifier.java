package org.vizzini.example.boardgame.tictactoe;

import org.vizzini.core.game.Token;

/**
 * Provides a way to turn an environment into a string.
 */
public final class EnvironmentStringifier
{
    /**
     * @param environment Tic-tac-toe environment.
     * 
     * @return a string representation of the given parameter.
     */
    public String stringify(final TTTEnvironment environment)
    {
        String answer = null;

        if (environment != null)
        {
            final StringBuilder sb = new StringBuilder();
            final TTTPosition[] values = TTTPosition.values();

            for (final TTTPosition position : values)
            {
                final Token token = environment.getTokenAt(position);
                sb.append(token == null ? "-" : token.getName());
            }

            answer = sb.toString();
        }

        return answer;
    }
}
