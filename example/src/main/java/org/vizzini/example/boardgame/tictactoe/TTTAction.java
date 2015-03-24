package org.vizzini.example.boardgame.tictactoe;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.PlaceAction;

/**
 * Provides an implementation of a place action for tic-tac-toe.
 */
public final class TTTAction implements PlaceAction
{
    /** Environment. */
    private final TTTEnvironment environment;

    /** Position. */
    private final TTTPosition position;

    /** Token. */
    private final TTTToken token;

    /**
     * Construct this object.
     * 
     * @param environment Environment. (required)
     * @param position Position. (required)
     * @param token Token. (required)
     */
    @SuppressWarnings("hiding")
    public TTTAction(final TTTEnvironment environment, final TTTPosition position, final TTTToken token)
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
    public TTTEnvironment getEnvironment()
    {
        return environment;
    }

    @Override
    public TTTPosition getPosition()
    {
        return position;
    }

    @Override
    public TTTToken getToken()
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
    public TTTAction withAgent(final Agent agent)
    {
        return new TTTAction(getEnvironment(), getPosition(), getToken().withAgent(agent));
    }

    /**
     * @param environment Environment.
     * 
     * @return a new object with the given parameter.
     */
    @SuppressWarnings("hiding")
    public TTTAction withEnvironment(final TTTEnvironment environment)
    {
        return new TTTAction(environment, getPosition(), getToken());
    }
}
