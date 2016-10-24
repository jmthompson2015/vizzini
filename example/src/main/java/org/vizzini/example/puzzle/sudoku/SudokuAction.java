package org.vizzini.example.puzzle.sudoku;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.PlaceAction;

/**
 * Provides an implementation of a place action for Sudoku.
 */
public final class SudokuAction implements PlaceAction
{
    /** Environment. */
    private final SudokuEnvironment environment;

    /** Position. */
    private final SudokuPosition position;

    /** Token. */
    private final SudokuToken token;

    /**
     * Construct this object.
     * 
     * @param environment Environment. (required)
     * @param position Position. (required)
     * @param token Token. (required)
     */
    @SuppressWarnings("hiding")
    public SudokuAction(final SudokuEnvironment environment, final SudokuPosition position, final SudokuToken token)
    {
        if (environment == null)
        {
            throw new IllegalArgumentException("environment is null");
        }

        if (position == null)
        {
            throw new IllegalArgumentException("position is null");
        }

        if (token == null)
        {
            throw new IllegalArgumentException("token is null");
        }

        this.environment = environment;
        this.position = position;
        this.token = token;
    }

    @Override
    public boolean doIt()
    {
        environment.placeToken(position, token);
        environment.fireDoActionPropertyChange(null, this);

        return true;
    }

    @Override
    public Agent getAgent()
    {
        return token.getAgent();
    }

    @Override
    public SudokuEnvironment getEnvironment()
    {
        return environment;
    }

    @Override
    public SudokuPosition getPosition()
    {
        return position;
    }

    @Override
    public SudokuToken getToken()
    {
        return token;
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("position", getPosition());
        builder.append("token", getToken());

        return builder.toString();
    }

    @Override
    public boolean undoIt()
    {
        environment.removeToken(position);
        environment.fireUndoActionPropertyChange(null, this);

        return true;
    }

    /**
     * @param agent Agent.
     * 
     * @return a new object with the given parameter.
     */
    public SudokuAction withAgent(final Agent agent)
    {
        return new SudokuAction(getEnvironment(), getPosition(), getToken().withAgent(agent));
    }

    /**
     * @param environment Environment.
     * 
     * @return a new object with the given parameter.
     */
    @SuppressWarnings("hiding")
    public SudokuAction withEnvironment(final SudokuEnvironment environment)
    {
        return new SudokuAction(environment, getPosition(), getToken());
    }
}
