package org.vizzini.example.boardgame.checkers;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.MoveAction;

/**
 * Provides an action base class for checkers.
 */
public abstract class CheckersAction implements MoveAction
{
    /** Agent. */
    private final Agent agent;

    /** Environment. */
    private final CheckersEnvironment environment;

    /** From position. */
    private final CheckersPosition fromPosition;

    /** To position. */
    private final CheckersPosition toPosition;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     * @param agent Agent.
     * @param fromPosition From position.
     * @param toPosition To position.
     */
    @SuppressWarnings("hiding")
    public CheckersAction(final CheckersEnvironment environment, final Agent agent,
            final CheckersPosition fromPosition, final CheckersPosition toPosition)
    {
        this.environment = environment;
        this.agent = agent;
        this.fromPosition = fromPosition;
        this.toPosition = toPosition;
    }

    @Override
    public Agent getAgent()
    {
        return agent;
    }

    @Override
    public CheckersEnvironment getEnvironment()
    {
        return environment;
    }

    @Override
    public CheckersPosition getFromPosition()
    {
        return fromPosition;
    }

    @Override
    public CheckersPosition getToPosition()
    {
        return toPosition;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    /**
     * @return true if this action promotes a pawn to a king.
     */
    protected boolean isPawnPromotion()
    {
        final CheckersTeam team = (CheckersTeam)getAgent().getTeam();

        return ((team == CheckersTeam.RED) && (getToPosition().getY() == 0))
                || ((team == CheckersTeam.WHITE) && (getToPosition().getY() == 7));
    }
}
