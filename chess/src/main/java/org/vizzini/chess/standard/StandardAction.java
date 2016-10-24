package org.vizzini.chess.standard;

import org.vizzini.chess.ChessAction;
import org.vizzini.chess.ChessPosition;
import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.ChessToken;
import org.vizzini.chess.DefaultChessAction;
import org.vizzini.chess.TokenType;
import org.vizzini.core.game.Agent;

/**
 * Provides a standard chess action.
 */
public final class StandardAction implements ChessAction
{
    /** Delegate. */
    private final ChessAction delegate;

    /** Flag indicating if an en passant occurred. */
    private final boolean isEnPassantOccurred;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     * @param agent Agent.
     * @param fromPosition From position.
     * @param toPosition To position.
     * @param isEnPassantOccurred Flag indicating if an en passant occurred.
     */
    @SuppressWarnings("hiding")
    public StandardAction(final StandardEnvironment environment, final Agent agent, final ChessPosition fromPosition,
            final ChessPosition toPosition, final boolean isEnPassantOccurred)
    {
        delegate = new DefaultChessAction(environment, agent, fromPosition, toPosition);
        this.isEnPassantOccurred = isEnPassantOccurred;
    }

    @Override
    public boolean doIt()
    {
        final ChessToken token = getEnvironment().getTokenAt(getFromPosition());

        // Add One to FiftyMoveCount to check for tie.
        getEnvironment().incrementFiftyMoveCount();

        if (token.getTeam() == ChessTeam.BLACK)
        {
            getEnvironment().incrementMoveCount();
        }

        // En Passant
        // boolean isEnPassantOccurred = false;

        // if (getEnvironment().getEnPassantPosition() > 0)
        // {
        // isEnPassantOccurred = getEnvironment().setEnpassantMove(getToIndex(), (ChessTeam)token.getTeam());
        // }

        // if (!lastMove.isEnPassantOccurred())
        // {
        // final ChessToken dstToken = getEnvironment().getToken(getToIndex());
        //
        // if (dstToken != null)
        // {
        // getEnvironment().setFiftyMoveCount(0);
        // }
        // }

        // Delete the token in its source position
        getEnvironment().removeToken(getFromPosition());

        // Add the token to its new position
        token.setMoved(true);
        token.setSelected(false);
        getEnvironment().placeToken(getToPosition(), token);

        // Reset EnPassantPosition
        getEnvironment().setEnPassantPosition(0);

        // Record En Passant if Pawn Moving
        if (token.getType() == TokenType.PAWN)
        {
            getEnvironment().zeroFiftyMoveCount();
            recordEnPassant((ChessTeam)token.getTeam(), token.getType(), getFromPosition(), getToPosition());
        }

        getEnvironment().setWhoseMove(
                getEnvironment().getWhoseMove() == ChessTeam.WHITE ? ChessTeam.BLACK : ChessTeam.WHITE);

        kingCastle(token, getFromPosition(), getToPosition());

        // Promote Pawns
        // boolean isPawnPromoted = false;
        //
        // if (promotePawns(token, getToIndex()))
        // {
        // isPawnPromoted = true;
        // }
        // else
        // {
        // isPawnPromoted = false;
        // }

        // Record my last move
        // final Move lastMove = new DefaultStandardChessMove(this, token.getAgent(), getFromIndex(), getToIndex(),
        // isPawnPromoted, isEnPassantOccurred);

        if (getEnvironment().getFiftyMoveCount() >= 50)
        {
            getEnvironment().setStaleMate(true);
        }

        // return lastMove;

        return true;
    }

    @Override
    public Agent getAgent()
    {
        return delegate.getAgent();
    }

    @Override
    public StandardEnvironment getEnvironment()
    {
        return (StandardEnvironment)delegate.getEnvironment();
    }

    @Override
    public ChessPosition getFromPosition()
    {
        return delegate.getFromPosition();
    }

    @Override
    public ChessPosition getToPosition()
    {
        return delegate.getToPosition();
    }

    /**
     * @return the isEnPassantOccurred
     */
    public boolean isEnPassantOccurred()
    {
        return isEnPassantOccurred;
    }

    @Override
    public boolean isPawnPromoted()
    {
        return delegate.isPawnPromoted();
    }

    @Override
    public boolean undoIt()
    {
        // TODO Auto-generated method stub
        return false;
    }

    /**
     * @param token Token.
     * @param srcPosition Source position.
     * @param dstPosition Destination position.
     */
    private void kingCastle(final ChessToken token, final ChessPosition srcPosition, final ChessPosition dstPosition)
    {
        // TODO
    }

    /**
     * @param token Token.
     * @param dstPosition Destination position.
     * 
     * @return true if a pawn was promoted.
     */
    // private boolean promotePawns(final ChessToken token, final int dstPosition)
    // {
    // if (token.getType() == TokenType.PAWN)
    // {
    // if (dstPosition < 8)
    // {
    // getEnvironment().getTokens().put(dstPosition, new DefaultChessToken(ChessTeam.BLACK, TokenType.QUEEN));
    // return true;
    // }
    // if (dstPosition > 55)
    // {
    // getEnvironment().getTokens().put(dstPosition, new DefaultChessToken(ChessTeam.WHITE, TokenType.QUEEN));
    // return true;
    // }
    // }
    //
    // return false;
    // }

    /**
     * @param pcColor Token color.
     * @param pcType Token type.
     * @param srcPosition Source position.
     * @param dstPosition Destination position.
     */
    private void recordEnPassant(final ChessTeam pcColor, final TokenType pcType, final ChessPosition srcPosition,
            final ChessPosition dstPosition)
    {
        // Record En Passant if Pawn Moving
        if (pcType == TokenType.PAWN)
        {
            // Reset FiftyMoveCount if pawn moved
            getEnvironment().zeroFiftyMoveCount();

            final int srcIndex = srcPosition.getIndex();
            final int dstIndex = dstPosition.getIndex();

            final int difference = srcIndex - dstIndex;

            if ((difference == 16) || (difference == -16))
            {
                getEnvironment().setEnPassantPosition(dstIndex + (difference / 2));
                getEnvironment().setEnPassantColor(pcColor);
            }
        }
    }
}
