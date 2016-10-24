package org.vizzini.example.boardgame.tictactoe;

import org.vizzini.core.game.Token;

/**
 * Provides utility methods for an environment.
 */
public final class EnvironmentUtils
{
    /**
     * @param environment Environment.
     * 
     * @return a new rotated environment.
     */
    public TTTEnvironment getX180(final TTTEnvironment environment)
    {
        final TTTEnvironment answer = environment.copy();
        answer.clear();

        for (int x = 0; x < TTTPosition.MAX_X; x++)
        {
            for (int y = 0; y < TTTPosition.MAX_Y; y++)
            {
                final TTTPosition position = TTTPosition.findByCoordinates(x, y);
                final Token token = environment.getTokenAt(position);
                final TTTPosition position2 = getX180(environment, x, y, 0);
                answer.placeToken(position2, token);
            }
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     * @return the position for the given parameters.
     */
    public TTTPosition getX180(final TTTEnvironment environment, final int x, final int y, final int z)
    {
        return TTTPosition.findByCoordinates(x, TTTPosition.MAX_Y - y - 1);
    }

    /**
     * @param environment Environment.
     * @return a new rotated environment.
     */
    public TTTEnvironment getY180(final TTTEnvironment environment)
    {
        final TTTEnvironment answer = environment.copy();
        answer.clear();

        for (int x = 0; x < TTTPosition.MAX_X; x++)
        {
            for (int y = 0; y < TTTPosition.MAX_Y; y++)
            {
                final TTTPosition position = TTTPosition.findByCoordinates(x, y);
                final Token token = environment.getTokenAt(position);
                final TTTPosition position2 = getY180(environment, x, y, 0);
                answer.placeToken(position2, token);
            }
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     * @return the position for the given parameters.
     */
    public TTTPosition getY180(final TTTEnvironment environment, final int x, final int y, final int z)
    {
        return TTTPosition.findByCoordinates(TTTPosition.MAX_X - x - 1, y);
    }

    /**
     * @param environment Environment.
     * @return a new rotated environment.
     */
    public TTTEnvironment getZ090(final TTTEnvironment environment)
    {
        final TTTEnvironment answer = environment.copy();
        answer.clear();

        for (int x = 0; x < TTTPosition.MAX_X; x++)
        {
            for (int y = 0; y < TTTPosition.MAX_Y; y++)
            {
                final TTTPosition position = TTTPosition.findByCoordinates(x, y);
                final Token token = environment.getTokenAt(position);

                if (token != null)
                {
                    final TTTPosition position2 = getZ090(environment, x, y, 0);
                    answer.placeToken(position2, token);
                }
            }
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     * @return the position for the given parameters.
     */
    public TTTPosition getZ090(final TTTEnvironment environment, final int x, final int y, final int z)
    {
        return TTTPosition.findByCoordinates(TTTPosition.MAX_Y - y - 1, x);
    }

    /**
     * @param environment Environment.
     * @return a new rotated environment.
     */
    public TTTEnvironment getZ180(final TTTEnvironment environment)
    {
        final TTTEnvironment answer = environment.copy();
        answer.clear();

        for (int x = 0; x < TTTPosition.MAX_X; x++)
        {
            for (int y = 0; y < TTTPosition.MAX_Y; y++)
            {
                final TTTPosition position = TTTPosition.findByCoordinates(x, y);
                final Token token = environment.getTokenAt(position);

                if (token != null)
                {
                    final TTTPosition position2 = getZ180(environment, x, y, 0);
                    answer.placeToken(position2, token);
                }
            }
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     * @return the position for the given parameters.
     */
    public TTTPosition getZ180(final TTTEnvironment environment, final int x, final int y, final int z)
    {
        return TTTPosition.findByCoordinates(TTTPosition.MAX_X - x - 1, TTTPosition.MAX_Y - y - 1);
    }

    /**
     * @param environment Environment.
     * @return a new rotated environment.
     */
    public TTTEnvironment getZ270(final TTTEnvironment environment)
    {
        final TTTEnvironment answer = environment.copy();
        answer.clear();

        for (int x = 0; x < TTTPosition.MAX_X; x++)
        {
            for (int y = 0; y < TTTPosition.MAX_Y; y++)
            {
                final TTTPosition position = TTTPosition.findByCoordinates(x, y);
                final Token token = environment.getTokenAt(position);

                if (token != null)
                {
                    final TTTPosition position2 = getZ270(environment, x, y, 0);
                    answer.placeToken(position2, token);
                }
            }
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     * @return the position for the given parameters.
     */
    public TTTPosition getZ270(final TTTEnvironment environment, final int x, final int y, final int z)
    {
        return TTTPosition.findByCoordinates(y, TTTPosition.MAX_X - x - 1);
    }
}
