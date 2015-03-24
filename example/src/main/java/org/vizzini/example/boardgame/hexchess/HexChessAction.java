package org.vizzini.example.boardgame.hexchess;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.MoveAction;
import org.vizzini.core.game.Token;

/**
 * Provides an action for hexagonal chess.
 */
public final class HexChessAction implements MoveAction
{
    /** Agent. */
    private final Agent agent;

    /** Environment. */
    private final HexChessEnvironment environment;

    /** From position. */
    private final HexChessPosition fromPosition;

    /** Environment. */
    private HexChessEnvironment originalEnvironment;

    /** To position. */
    private final HexChessPosition toPosition;

    /**
     * Construct this object.
     * 
     * @param environment Environment. (required)
     * @param agent Agent. (required)
     * @param fromPosition From position. (required)
     * @param toPosition To position. (required)
     */
    @SuppressWarnings("hiding")
    public HexChessAction(final HexChessEnvironment environment, final Agent agent,
            final HexChessPosition fromPosition, final HexChessPosition toPosition)
    {
        if (environment == null)
        {
            throw new RuntimeException("environment is null");
        }

        if (agent == null)
        {
            throw new RuntimeException("agent is null");
        }

        if (fromPosition == null)
        {
            throw new RuntimeException("fromPosition is null");
        }

        if (toPosition == null)
        {
            throw new RuntimeException("toPosition is null");
        }

        this.environment = environment;
        this.agent = agent;
        this.fromPosition = fromPosition;
        this.toPosition = toPosition;
    }

    @Override
    public boolean doIt()
    {
        originalEnvironment = getEnvironment().copy();

        Token token;

        if (isPawnPromotion())
        {
            final HexChessTeam team = (HexChessTeam)agent.getTeam();
            token = (team == HexChessTeam.WHITE ? HexChessToken.WHITE_QUEEN : HexChessToken.BLACK_QUEEN);
            token = token.withAgent(agent);
        }
        else
        {
            token = getEnvironment().getTokenAt(fromPosition);
        }

        getEnvironment().removeToken(fromPosition);
        getEnvironment().placeToken(toPosition, token);
        environment.fireDoActionPropertyChange(null, this);

        return true;
    }

    @Override
    public Agent getAgent()
    {
        return agent;
    }

    @Override
    public HexChessEnvironment getEnvironment()
    {
        return environment;
    }

    @Override
    public HexChessPosition getFromPosition()
    {
        return fromPosition;
    }

    @Override
    public HexChessPosition getToPosition()
    {
        return toPosition;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Override
    public boolean undoIt()
    {
        getEnvironment().removeToken(getToPosition());

        final HexChessPosition[] values = HexChessPosition.values();

        for (final HexChessPosition position : values)
        {
            final Token myToken = originalEnvironment.getTokenAt(position);

            if (myToken != null)
            {
                getEnvironment().placeToken(position, myToken);
            }
        }

        environment.fireUndoActionPropertyChange(null, this);

        return true;
    }

    /**
     * @return true if this action promotes a pawn to a king.
     */
    private boolean isPawnPromotion()
    {
        final HexChessTeam team = (HexChessTeam)getAgent().getTeam();

        // FIXME pawn promotion
        return ((team == HexChessTeam.BLACK) && (toPosition.getY() == 0))
                || ((team == HexChessTeam.WHITE) && (toPosition.getY() == 7));
    }
}
