package org.vizzini.example.boardgame.qubic;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.PlaceAction;

/**
 * Provides an implementation of a place action for qubic.
 */
public final class QubicAction implements PlaceAction
{
    /** Environment. */
    private final QubicEnvironment environment;

    /** Position. */
    private final QubicPosition position;

    /** Token. */
    private final QubicToken token;

    /**
     * Construct this object.
     * 
     * @param environment Environment. (required)
     * @param position Position. (required)
     * @param token Token. (required)
     */
    @SuppressWarnings("hiding")
    public QubicAction(final QubicEnvironment environment, final QubicPosition position, final QubicToken token)
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
    public QubicEnvironment getEnvironment()
    {
        return environment;
    }

    @Override
    public QubicPosition getPosition()
    {
        return position;
    }

    @Override
    public QubicToken getToken()
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
    public QubicAction withAgent(final Agent agent)
    {
        return new QubicAction(getEnvironment(), getPosition(), getToken().withAgent(agent));
    }

    /**
     * @param environment Environment.
     * 
     * @return a new object with the given parameter.
     */
    @SuppressWarnings("hiding")
    public QubicAction withEnvironment(final QubicEnvironment environment)
    {
        return new QubicAction(environment, getPosition(), getToken());
    }
}
