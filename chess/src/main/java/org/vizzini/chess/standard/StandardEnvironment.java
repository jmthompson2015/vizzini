package org.vizzini.chess.standard;

import java.beans.PropertyChangeListener;
import java.util.BitSet;
import java.util.List;

import org.vizzini.chess.ChessAction;
import org.vizzini.chess.ChessEnvironment;
import org.vizzini.chess.ChessPosition;
import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.ChessToken;
import org.vizzini.chess.DefaultChessEnvironment;
import org.vizzini.chess.DefaultChessToken;
import org.vizzini.chess.Dimensions;
import org.vizzini.chess.GameType;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Position;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;

/**
 * Provides a standard chess environment.
 * 
 * See <a href="http://en.wikipedia.org/wiki/Board_representation_(chess)">Wikipedia</a>.
 */
public final class StandardEnvironment implements ChessEnvironment
{
    /** Board delegate. */
    private DefaultChessEnvironment delegate;

    /** En passant color. */
    private ChessTeam enPassantColor;

    /** En passant position. */
    private int enPassantPosition = -1;

    /** Flag indicating if black has castled. */
    private boolean isBlackCastled;

    /** Flag indicating if white has castled. */
    private boolean isWhiteCastled;

    /** Last move. */
    private StandardAction lastMove;

    /**
     * Construct this object.
     */
    public StandardEnvironment()
    {
        this(0, 1, ChessTeam.WHITE);
    }

    /**
     * Construct this object.
     * 
     * @param fiftyMoveCount Fifty move count.
     * @param moveCount Move count.
     * @param whoseMove Whose move.
     */
    public StandardEnvironment(final int fiftyMoveCount, final int moveCount, final ChessTeam whoseMove)
    {
        delegate = new DefaultChessEnvironment(GameType.STANDARD, fiftyMoveCount, moveCount, whoseMove);
    }

    @Override
    public void addDoActionListener(final PropertyChangeListener listener)
    {
        delegate.addDoActionListener(listener);
    }

    @Override
    public void addUndoActionListener(final PropertyChangeListener listener)
    {
        delegate.addUndoActionListener(listener);
    }

    @Override
    public void clear()
    {
        delegate.clear();
    }

    @Override
    public StandardEnvironment copy()
    {
        final StandardEnvironment answer = new StandardEnvironment(getFiftyMoveCount(), getMoveCount(), getWhoseMove());

        answer.delegate = delegate.copy();

        return answer;
    }

    @Override
    public void fireDoActionPropertyChange(final Action oldValue, final Action newValue)
    {
        delegate.fireDoActionPropertyChange(oldValue, newValue);
    }

    @Override
    public void fireUndoActionPropertyChange(final Action oldValue, final Action newValue)
    {
        delegate.fireUndoActionPropertyChange(oldValue, newValue);
    }

    @Override
    public BitSet getBlackAttackBoard()
    {
        return delegate.getBlackAttackBoard();
    }

    @Override
    public ChessPosition getBlackKingPosition()
    {
        return StandardPosition.findByIndex(delegate.getBlackKingIndex());
    }

    @Override
    public String getDescription()
    {
        return delegate.getDescription();
    }

    @Override
    public Dimensions getDimensions()
    {
        return delegate.getGameType().getDimensions();
    }

    /**
     * @return En passant token color.
     */
    public ChessTeam getEnPassantColor()
    {
        return enPassantColor;
    }

    /**
     * @return En passant token position.
     */
    public int getEnPassantPosition()
    {
        return enPassantPosition;
    }

    @Override
    public int getFiftyMoveCount()
    {
        return delegate.getFiftyMoveCount();
    }

    @Override
    public Agent getFirstAgent()
    {
        return delegate.getFirstAgent();
    }

    @Override
    public GameType getGameType()
    {
        return delegate.getGameType();
    }

    /**
     * @return the lastMove
     */
    public ChessAction getLastMove()
    {
        return lastMove;
    }

    @Override
    public int getMoveCount()
    {
        return delegate.getMoveCount();
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public ChessPosition getPositionFor(final int index)
    {
        return StandardPosition.findByIndex(index);
    }

    @Override
    public ChessPosition getPositionFor(final int file, final int rank, final int level)
    {
        return StandardPosition.findByCoordinates(file, rank);
    }

    @Override
    public ChessPosition[] getPositionValues()
    {
        return StandardPosition.values();
    }

    @Override
    public int getRepeatedMoveCount()
    {
        return delegate.getRepeatedMoveCount();
    }

    @Override
    public Agent getSecondAgent()
    {
        return delegate.getSecondAgent();
    }

    @Override
    public ChessToken getTokenAt(final Integer index)
    {
        return delegate.getTokenAt(index);
    }

    @Override
    public ChessToken getTokenAt(final Position<?> position)
    {
        return delegate.getTokenAt(position);
    }

    @Override
    public int getTokenCount()
    {
        return delegate.getTokenCount();
    }

    @Override
    public int getTokenCountFor(final Agent agent)
    {
        return delegate.getTokenCountFor(agent);
    }

    @Override
    public int getTokenCountFor(final Team team)
    {
        return delegate.getTokenCountFor(team);
    }

    @Override
    public BitSet getWhiteAttackBoard()
    {
        return delegate.getWhiteAttackBoard();
    }

    @Override
    public ChessPosition getWhiteKingPosition()
    {
        return StandardPosition.findByIndex(delegate.getWhiteKingIndex());
    }

    @Override
    public ChessTeam getWhoseMove()
    {
        return delegate.getWhoseMove();
    }

    @Override
    public void incrementFiftyMoveCount()
    {
        delegate.incrementFiftyMoveCount();
    }

    @Override
    public void incrementMoveCount()
    {
        delegate.incrementMoveCount();
    }

    /**
     * @return true if black has castled.
     */
    public boolean isBlackCastled()
    {
        return isBlackCastled;
    }

    @Override
    public boolean isInCheck(final ChessTeam team)
    {
        return delegate.isInCheck(team);
    }

    @Override
    public boolean isStaleMate()
    {
        return delegate.isStaleMate();
    }

    @Override
    public boolean isUsable(final ChessPosition position)
    {
        return delegate.isUsable(position);
    }

    /**
     * @return true if white has castled.
     */
    public boolean isWhiteCastled()
    {
        return isWhiteCastled;
    }

    @Override
    public void placeInitialTokens(final List<Agent> agents)
    {
        delegate.placeInitialTokens(agents);

        {
            final Agent agent = agents.get(0);

            placeToken(StandardPosition.a1, DefaultChessToken.WHITE_ROOK.withAgent(agent));
            placeToken(StandardPosition.b1, DefaultChessToken.WHITE_KNIGHT.withAgent(agent));
            placeToken(StandardPosition.c1, DefaultChessToken.WHITE_BISHOP.withAgent(agent));
            placeToken(StandardPosition.d1, DefaultChessToken.WHITE_QUEEN.withAgent(agent));
            placeToken(StandardPosition.e1, DefaultChessToken.WHITE_KING.withAgent(agent));
            placeToken(StandardPosition.f1, DefaultChessToken.WHITE_BISHOP.withAgent(agent));
            placeToken(StandardPosition.g1, DefaultChessToken.WHITE_KNIGHT.withAgent(agent));
            placeToken(StandardPosition.h1, DefaultChessToken.WHITE_ROOK.withAgent(agent));

            final int start = StandardPosition.a2.getIndex();

            for (int i = start; i < (start + 8); i++)
            {
                placeToken(i, (ChessToken)DefaultChessToken.WHITE_PAWN.withAgent(agent));
            }
        }

        {
            final Agent agent = agents.get(1);

            final int start = StandardPosition.a7.getIndex();

            for (int i = start; i < (start + 8); i++)
            {
                placeToken(i, (ChessToken)DefaultChessToken.BLACK_PAWN.withAgent(agent));
            }

            placeToken(StandardPosition.a8, DefaultChessToken.BLACK_ROOK.withAgent(agent));
            placeToken(StandardPosition.b8, DefaultChessToken.BLACK_KNIGHT.withAgent(agent));
            placeToken(StandardPosition.c8, DefaultChessToken.BLACK_BISHOP.withAgent(agent));
            placeToken(StandardPosition.d8, DefaultChessToken.BLACK_QUEEN.withAgent(agent));
            placeToken(StandardPosition.e8, DefaultChessToken.BLACK_KING.withAgent(agent));
            placeToken(StandardPosition.f8, DefaultChessToken.BLACK_BISHOP.withAgent(agent));
            placeToken(StandardPosition.g8, DefaultChessToken.BLACK_KNIGHT.withAgent(agent));
            placeToken(StandardPosition.h8, DefaultChessToken.BLACK_ROOK.withAgent(agent));
        }

        fireDoActionPropertyChange(null, null);
    }

    @Override
    public void placeToken(final Integer index, final ChessToken token)
    {
        delegate.placeToken(index, token);
    }

    @Override
    public void placeToken(final Position<?> position, final Token token)
    {
        delegate.placeToken(position, token);
    }

    @Override
    public void removeDoActionListener(final PropertyChangeListener listener)
    {
        delegate.removeDoActionListener(listener);
    }

    @Override
    public void removeToken(final Integer index)
    {
        delegate.removeToken(index);
    }

    @Override
    public void removeToken(final Position<?> position)
    {
        delegate.removeToken(position);
    }

    @Override
    public void removeUndoActionListener(final PropertyChangeListener listener)
    {
        delegate.removeUndoActionListener(listener);
    }

    /**
     * @param isBlackCastled Flag indicating if black has castled.
     */
    @SuppressWarnings("hiding")
    public void setBlackCastled(final boolean isBlackCastled)
    {
        this.isBlackCastled = isBlackCastled;
    }

    /**
     * @param enPassantColor En passant color.
     */
    @SuppressWarnings("hiding")
    public void setEnPassantColor(final ChessTeam enPassantColor)
    {
        this.enPassantColor = enPassantColor;
    }

    /**
     * @param enPassantPosition En passant position.
     */
    @SuppressWarnings("hiding")
    public void setEnPassantPosition(final int enPassantPosition)
    {
        this.enPassantPosition = enPassantPosition;
    }

    @Override
    public void setInCheck(final ChessTeam team, final boolean isInCheck)
    {
        delegate.setInCheck(team, isInCheck);
    }

    @Override
    public void setStaleMate(final boolean isStaleMate)
    {
        delegate.setStaleMate(isStaleMate);
    }

    /**
     * @param isWhiteCastled Flag indicating if white has castled.
     */
    @SuppressWarnings("hiding")
    public void setWhiteCastled(final boolean isWhiteCastled)
    {
        this.isWhiteCastled = isWhiteCastled;
    }

    @Override
    public void setWhoseMove(final ChessTeam whoseMove)
    {
        delegate.setWhoseMove(whoseMove);
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        final Dimensions dimensions = getDimensions();

        sb.append("   0 1 2 3 4 5 6 7\n");

        for (int rank = 0; rank < dimensions.getRankCount(); rank++)
        {
            sb.append(rank).append(" |");

            for (int file = 0; file < dimensions.getFileCount(); file++)
            {
                final ChessPosition position = getPositionFor(file, rank, 0);
                final Token token = getTokenAt(position);

                if (token == null)
                {
                    sb.append(" ");
                }
                else
                {
                    sb.append(token.getName().substring(0, 1));
                }

                sb.append("|");
            }

            if (rank < (dimensions.getRankCount() - 1))
            {
                sb.append("\n");
            }
        }

        return sb.toString();
    }

    @Override
    public void zeroFiftyMoveCount()
    {
        delegate.zeroFiftyMoveCount();
    }
}
