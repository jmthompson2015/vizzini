package org.vizzini.chess.tridimensional;

import java.beans.PropertyChangeListener;
import java.util.BitSet;
import java.util.List;

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
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Position;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;

/**
 * Provides a tridimensional chess environment.
 */
public final class TridEnvironment implements ChessEnvironment
{
    /** Board delegate. */
    private DefaultChessEnvironment delegate;

    /**
     * Construct this object.
     */
    public TridEnvironment()
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
    public TridEnvironment(final int fiftyMoveCount, final int moveCount, final ChessTeam whoseMove)
    {
        delegate = new DefaultChessEnvironment(GameType.TRIDIMENSIONAL, fiftyMoveCount, moveCount, whoseMove);
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
    public Environment copy()
    {
        final TridEnvironment answer = new TridEnvironment(getFiftyMoveCount(), getMoveCount(), getWhoseMove());

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
        return TridPosition.findByIndex(delegate.getBlackKingIndex());
    }

    @Override
    public String getDescription()
    {
        return delegate.getDescription();
    }

    @Override
    public Dimensions getDimensions()
    {
        return delegate.getDimensions();
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
    public TridPosition getPositionFor(final int index)
    {
        return TridPosition.findByIndex(index);
    }

    @Override
    public TridPosition getPositionFor(final int file, final int rank, final int level)
    {
        return TridPosition.findByCoordinates(file, rank, level);
    }

    @Override
    public TridPosition[] getPositionValues()
    {
        return TridPosition.values();
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
        // if (!isUsable((TridPosition)position))
        // {
        // throw new RuntimeException("Position not usable: " + position);
        // }

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
        return TridPosition.findByIndex(delegate.getWhiteKingIndex());
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
        boolean answer = false;

        if (position != null)
        {
            final int level = position.getLevel();

            if ((level % 2) == 1)
            {
                // Fixed board.
                answer = true;
            }
            else
            {
                final int file = position.getFile();
                final int rank = position.getRank();

                if ((0 <= file) && (file < 2) && (0 <= rank) && (rank < 2) && (level == 0))
                {
                    answer = true;
                }
                else if ((4 <= file) && (file < 6) && (0 <= rank) && (rank < 2) && (level == 0))
                {
                    answer = true;
                }
                else if ((0 <= file) && (file < 2) && (4 <= rank) && (rank < 6) && (level == 6))
                {
                    answer = true;
                }
                else if ((4 <= file) && (file < 6) && (4 <= rank) && (rank < 6) && (level == 6))
                {
                    answer = true;
                }
            }
        }

        return answer;
    }

    @Override
    public void placeInitialTokens(final List<Agent> agents)
    {
        delegate.placeInitialTokens(agents);

        {
            final Agent agent = agents.get(0);

            placeToken(TridPosition.a1A, DefaultChessToken.WHITE_ROOK.withAgent(agent));
            placeToken(TridPosition.b1A, DefaultChessToken.WHITE_KNIGHT.withAgent(agent));
            placeToken(TridPosition.e1A, DefaultChessToken.WHITE_KNIGHT.withAgent(agent));
            placeToken(TridPosition.f1A, DefaultChessToken.WHITE_ROOK.withAgent(agent));

            placeToken(TridPosition.a2A, DefaultChessToken.WHITE_PAWN.withAgent(agent));
            placeToken(TridPosition.b2A, DefaultChessToken.WHITE_PAWN.withAgent(agent));
            placeToken(TridPosition.e2A, DefaultChessToken.WHITE_PAWN.withAgent(agent));
            placeToken(TridPosition.f2A, DefaultChessToken.WHITE_PAWN.withAgent(agent));

            placeToken(TridPosition.b2B, DefaultChessToken.WHITE_BISHOP.withAgent(agent));
            placeToken(TridPosition.c2B, DefaultChessToken.WHITE_QUEEN.withAgent(agent));
            placeToken(TridPosition.d2B, DefaultChessToken.WHITE_KING.withAgent(agent));
            placeToken(TridPosition.e2B, DefaultChessToken.WHITE_BISHOP.withAgent(agent));

            placeToken(TridPosition.b3B, DefaultChessToken.WHITE_PAWN.withAgent(agent));
            placeToken(TridPosition.c3B, DefaultChessToken.WHITE_PAWN.withAgent(agent));
            placeToken(TridPosition.d3B, DefaultChessToken.WHITE_PAWN.withAgent(agent));
            placeToken(TridPosition.e3B, DefaultChessToken.WHITE_PAWN.withAgent(agent));
        }

        {
            final Agent agent = agents.get(1);

            placeToken(TridPosition.b4F, DefaultChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(TridPosition.c4F, DefaultChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(TridPosition.d4F, DefaultChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(TridPosition.e4F, DefaultChessToken.BLACK_PAWN.withAgent(agent));

            placeToken(TridPosition.b5F, DefaultChessToken.BLACK_BISHOP.withAgent(agent));
            placeToken(TridPosition.c5F, DefaultChessToken.BLACK_QUEEN.withAgent(agent));
            placeToken(TridPosition.d5F, DefaultChessToken.BLACK_KING.withAgent(agent));
            placeToken(TridPosition.e5F, DefaultChessToken.BLACK_BISHOP.withAgent(agent));

            placeToken(TridPosition.a5G, DefaultChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(TridPosition.b5G, DefaultChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(TridPosition.e5G, DefaultChessToken.BLACK_PAWN.withAgent(agent));
            placeToken(TridPosition.f5G, DefaultChessToken.BLACK_PAWN.withAgent(agent));

            placeToken(TridPosition.a6G, DefaultChessToken.BLACK_ROOK.withAgent(agent));
            placeToken(TridPosition.b6G, DefaultChessToken.BLACK_KNIGHT.withAgent(agent));
            placeToken(TridPosition.e6G, DefaultChessToken.BLACK_KNIGHT.withAgent(agent));
            placeToken(TridPosition.f6G, DefaultChessToken.BLACK_ROOK.withAgent(agent));
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
        if (!isUsable((TridPosition)position))
        {
            throw new RuntimeException("Position not usable: " + position);
        }

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
        // if (!isUsable((TridPosition)position))
        // {
        // throw new RuntimeException("Position not usable: " + position);
        // }

        delegate.removeToken(position);
    }

    @Override
    public void removeUndoActionListener(final PropertyChangeListener listener)
    {
        delegate.removeUndoActionListener(listener);
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

        for (int level = 0; level < dimensions.getLevelCount(); level++)
        {
            sb.append("Level ").append((char)('A' + level)).append("\n");
            sb.append("   0 1 2 3 4 5\n");

            for (int rank = 0; rank < dimensions.getRankCount(); rank++)
            {
                // if ((level == 0) && (rank > 1))
                // {
                // continue;
                // }

                sb.append(rank).append(" |");

                for (int file = 0; file < dimensions.getFileCount(); file++)
                {
                    final TridPosition position = getPositionFor(file, rank, level);

                    if ((position == null) || !isUsable(position))
                    {
                        sb.append("-|");
                    }
                    else
                    {
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
                }

                if (rank < (dimensions.getRankCount() - 1))
                {
                    sb.append("\n");
                }
            }

            if (level < (dimensions.getLevelCount() - 1))
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
