package org.vizzini.chess;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;

/**
 * Provides a default implementation of a chess action.
 */
public final class DefaultChessAction implements ChessAction
{
    /** Agent. */
    private final Agent agent;

    /** Environment. */
    private final ChessEnvironment environment;

    /** From position. */
    private final ChessPosition fromPosition;

    /** Flag indicating if a pawn is promoted. */
    private boolean isPawnPromoted;

    /** Moving token. */
    private final ChessToken movingToken;

    /** Environment. */
    private ChessEnvironment originalEnvironment;

    /** Taken token. */
    private final ChessToken takenToken;

    /** To position. */
    private final ChessPosition toPosition;

    /**
     * Construct this object.
     * 
     * @param environment Environment. (required)
     * @param agent Agent. (required)
     * @param fromPosition From position. (required)
     * @param toPosition To position. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultChessAction(final ChessEnvironment environment, final Agent agent, final ChessPosition fromPosition,
            final ChessPosition toPosition)
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

        movingToken = (ChessToken)environment.getTokenAt(fromPosition);
        takenToken = (ChessToken)environment.getTokenAt(toPosition);
    }

    @Override
    public boolean doIt()
    {
        originalEnvironment = (ChessEnvironment)environment.copy();
        final ChessToken fromToken = (ChessToken)environment.getTokenAt(fromPosition);

        // Add One to FiftyMoveCount to check for tie.
        environment.incrementFiftyMoveCount();

        if (fromToken.getTeam() == ChessTeam.BLACK)
        {
            environment.incrementMoveCount();
        }

        final ChessToken dstToken = (ChessToken)environment.getTokenAt(toPosition);

        if (dstToken != null)
        {
            environment.zeroFiftyMoveCount();
        }

        // Delete the token in its source position
        environment.removeToken(fromPosition);

        // Add the token to its new position
        fromToken.setMoved(true);
        fromToken.setSelected(false);
        environment.placeToken(toPosition, fromToken);

        if (fromToken.getType() == TokenType.PAWN)
        {
            environment.zeroFiftyMoveCount();
        }

        environment.setWhoseMove(environment.getWhoseMove() == ChessTeam.WHITE ? ChessTeam.BLACK : ChessTeam.WHITE);

        // Promote Pawns
        isPawnPromoted = promotePawns(environment.getDimensions(), fromToken, toPosition);

        if (environment.getFiftyMoveCount() >= 50)
        {
            environment.setStaleMate(true);
        }

        environment.fireDoActionPropertyChange(null, this);

        return true;
    }

    @Override
    public Agent getAgent()
    {
        return agent;
    }

    @Override
    public ChessEnvironment getEnvironment()
    {
        return environment;
    }

    @Override
    public ChessPosition getFromPosition()
    {
        return fromPosition;
    }

    /**
     * @return the movingToken
     */
    public ChessToken getMovingToken()
    {
        return movingToken;
    }

    /**
     * @return the takenToken
     */
    public ChessToken getTakenToken()
    {
        return takenToken;
    }

    @Override
    public ChessPosition getToPosition()
    {
        return toPosition;
    }

    @Override
    public boolean isPawnPromoted()
    {
        return isPawnPromoted;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Override
    public boolean undoIt()
    {
        environment.removeToken(toPosition);

        final ChessPosition[] values = environment.getPositionValues();

        for (final ChessPosition myPosition : values)
        {
            final ChessToken myToken = (ChessToken)originalEnvironment.getTokenAt(myPosition);

            if (myToken != null)
            {
                environment.placeToken(myPosition, myToken);
            }
        }

        environment.fireUndoActionPropertyChange(null, this);

        return true;
    }

    /**
     * @param dimensions Dimensions.
     * @param fromToken From token.
     * @param toPosition Destination position.
     * 
     * @return true if a pawn was promoted.
     */
    @SuppressWarnings("hiding")
    private boolean promotePawns(final Dimensions dimensions, final ChessToken fromToken, final ChessPosition toPosition)
    {
        boolean answer = false;

        if (fromToken.getType() == TokenType.PAWN)
        {
            final int toIndex = toPosition.getIndex();
            final Agent agent = fromToken.getAgent();

            if (toIndex < dimensions.getFileCount())
            {
                environment.placeToken(toPosition, DefaultChessToken.BLACK_QUEEN.withAgent(agent));
                answer = true;
            }
            else if (toIndex >= (dimensions.getCellCount() - dimensions.getFileCount()))
            {
                environment.placeToken(toPosition, DefaultChessToken.WHITE_QUEEN.withAgent(agent));
                answer = true;
            }
        }

        return answer;
    }
}
