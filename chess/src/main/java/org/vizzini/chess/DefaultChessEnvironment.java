package org.vizzini.chess;

import java.beans.PropertyChangeListener;
import java.util.BitSet;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultEnvironment;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Position;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;

/**
 * Provides a default implementation of a chess environment.
 * 
 * See <a href="http://en.wikipedia.org/wiki/Board_representation_(chess)">Wikipedia</a>.
 */
public final class DefaultChessEnvironment implements ChessEnvironment
{
    /** Black attack board. */
    private final BitSet blackAttackBoard;

    /** Black king index. */
    private int blackKingIndex;

    /** Delegate. */
    private final Environment delegate;

    /** Dimensions. */
    private final Dimensions dimensions;

    /** Fifty move count. */
    private int fiftyMoveCount;

    /** First agent. */
    private Agent firstAgent;

    /** Game type. */
    private final GameType gameType;

    /** Flag indicating if there is a black check. */
    private boolean isBlackCheck;

    /** Flag indicating a stale mate. */
    private boolean isStaleMate;

    /** Flag indicating if there is a white check. */
    private boolean isWhiteCheck;

    /** Move count. */
    private int moveCount;

    /** Repeated move count. */
    private int repeatedMoveCount;

    /** Second agent. */
    private Agent secondAgent;

    /** Map of index to token. */
    private Map<Integer, ChessToken> tokens = new TreeMap<Integer, ChessToken>();

    /** White attack board. */
    private final BitSet whiteAttackBoard;

    /** White king index. */
    private int whiteKingIndex;

    /** Whose move. */
    private ChessTeam whoseMove;

    /**
     * Construct this object.
     * 
     * @param gameType Game type.
     */
    @SuppressWarnings("hiding")
    public DefaultChessEnvironment(final GameType gameType)
    {
        this(gameType, 0, 1, ChessTeam.WHITE);
    }

    /**
     * Construct this object.
     * 
     * @param gameType Game type.
     * @param fiftyMoveCount Fifty move count.
     * @param moveCount Move count.
     * @param whoseMove Whose move.
     */
    @SuppressWarnings("hiding")
    public DefaultChessEnvironment(final GameType gameType, final int fiftyMoveCount, final int moveCount,
            final ChessTeam whoseMove)
    {
        dimensions = gameType.getDimensions();

        delegate = new DefaultEnvironment("Chess Board", "A chess board.");

        this.gameType = gameType;
        this.fiftyMoveCount = fiftyMoveCount;
        this.moveCount = moveCount;
        this.whoseMove = whoseMove;

        whiteAttackBoard = new BitSet(getDimensions().getCellCount());
        blackAttackBoard = new BitSet(getDimensions().getCellCount());

        setWhoseMove(whoseMove);
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
        isWhiteCheck = false;
        isBlackCheck = false;

        isStaleMate = false;

        whiteAttackBoard.clear();
        blackAttackBoard.clear();

        whiteKingIndex = -1;
        blackKingIndex = -1;

        for (final ChessToken token : tokens.values())
        {
            token.clearValidMoves();
        }
    }

    @Override
    public DefaultChessEnvironment copy()
    {
        final DefaultChessEnvironment answer = new DefaultChessEnvironment(gameType, fiftyMoveCount, moveCount,
                whoseMove);

        // Copy the tokens.
        for (final Entry<Integer, ChessToken> entry : tokens.entrySet())
        {
            final int index = entry.getKey();
            final ChessToken token = entry.getValue();

            answer.placeToken(index, token.copy());
        }

        return answer;
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }
        else
        {
            final DefaultChessEnvironment another = (DefaultChessEnvironment)object;

            answer = (dimensions == another.dimensions) || dimensions.equals(another.dimensions);

            if (answer)
            {
                answer = (moveCount == another.moveCount) && (whoseMove == another.whoseMove)
                        && tokens.equals(another.tokens);
            }
        }

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
        return blackAttackBoard;
    }

    /**
     * @return the blackKingIndex
     */
    public int getBlackKingIndex()
    {
        if (blackKingIndex < 0)
        {
            locateKings();
        }

        return blackKingIndex;
    }

    @Override
    public ChessPosition getBlackKingPosition()
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public String getDescription()
    {
        return delegate.getDescription();
    }

    @Override
    public Dimensions getDimensions()
    {
        return dimensions;
    }

    @Override
    public int getFiftyMoveCount()
    {
        return fiftyMoveCount;
    }

    @Override
    public Agent getFirstAgent()
    {
        if (firstAgent == null)
        {
            for (final ChessToken token : tokens.values())
            {
                if (token.getTeam() == ChessTeam.WHITE)
                {
                    firstAgent = token.getAgent();
                    break;
                }
            }
        }

        return firstAgent;
    }

    @Override
    public GameType getGameType()
    {
        return gameType;
    }

    @Override
    public int getMoveCount()
    {
        return moveCount;
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public ChessPosition getPositionFor(final int index)
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public ChessPosition getPositionFor(final int file, final int rank, final int level)
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public ChessPosition[] getPositionValues()
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public int getRepeatedMoveCount()
    {
        return repeatedMoveCount;
    }

    @Override
    public Agent getSecondAgent()
    {
        if (secondAgent == null)
        {
            for (final ChessToken token : tokens.values())
            {
                if (token.getTeam() == ChessTeam.BLACK)
                {
                    secondAgent = token.getAgent();
                    break;
                }
            }
        }

        return secondAgent;
    }

    @Override
    public ChessToken getTokenAt(final Integer index)
    {
        ChessToken answer = null;

        if (getDimensions().contains(index))
        {
            answer = tokens.get(index);
        }
        else
        {
            throw new IllegalArgumentException("index is out of range");
        }

        return answer;
    }

    @Override
    public ChessToken getTokenAt(final Position<?> position)
    {
        final ChessPosition cPosition = (ChessPosition)position;

        return getTokenAt(cPosition.getIndex());
    }

    @Override
    public int getTokenCount()
    {
        return tokens.size();
    }

    @Override
    public int getTokenCountFor(final Agent agent)
    {
        int answer = 0;

        for (final ChessToken token : tokens.values())
        {
            if (agent.equals(token.getAgent()))
            {
                answer++;
            }
        }

        return answer;
    }

    @Override
    public int getTokenCountFor(final Team team)
    {
        int answer = 0;

        for (final ChessToken token : tokens.values())
        {
            if (team == token.getTeam())
            {
                answer++;
            }
        }

        return answer;
    }

    @Override
    public BitSet getWhiteAttackBoard()
    {
        return whiteAttackBoard;
    }

    /**
     * @return the whiteKingIndex
     */
    public int getWhiteKingIndex()
    {
        if (whiteKingIndex < 0)
        {
            locateKings();
        }

        return whiteKingIndex;
    }

    @Override
    public ChessPosition getWhiteKingPosition()
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public ChessTeam getWhoseMove()
    {
        return whoseMove;
    }

    @Override
    public int hashCode()
    {
        int answer = moveCount;

        if (whoseMove != null)
        {
            answer += (31 * whoseMove.hashCode());
        }

        answer += (37 * tokens.hashCode());

        answer += (31 * dimensions.hashCode());

        return answer;
    }

    @Override
    public void incrementFiftyMoveCount()
    {
        fiftyMoveCount++;
    }

    @Override
    public void incrementMoveCount()
    {
        moveCount++;
    }

    @Override
    public boolean isInCheck(final ChessTeam team)
    {
        boolean answer = false;

        if (team == ChessTeam.WHITE)
        {
            answer = isWhiteCheck;
        }
        else if (team == ChessTeam.BLACK)
        {
            answer = isBlackCheck;
        }
        else
        {
            throw new IllegalArgumentException("Unknown team " + team);
        }

        return answer;
    }

    @Override
    public boolean isStaleMate()
    {
        return isStaleMate;
    }

    @Override
    public boolean isUsable(final ChessPosition position)
    {
        return (position != null);
    }

    @Override
    public void placeInitialTokens(final List<Agent> agents)
    {
        firstAgent = agents.get(0);
        secondAgent = agents.get(1);
    }

    @Override
    public void placeToken(final Integer index, final ChessToken token)
    {
        if (index == null)
        {
            throw new IllegalArgumentException("index is null");
        }

        if (token == null)
        {
            throw new IllegalArgumentException("token is null");
        }

        if (token.getAgent() == null)
        {
            throw new RuntimeException("token has no agent!");
        }

        tokens.put(index, token);
    }

    @Override
    public void placeToken(final Position<?> position, final Token token)
    {
        if (position == null)
        {
            throw new IllegalArgumentException("position is null");
        }

        if (token == null)
        {
            throw new IllegalArgumentException("token is null");
        }

        final ChessPosition cPosition = (ChessPosition)position;
        final ChessToken cToken = (ChessToken)token;

        placeToken(cPosition.getIndex(), cToken);
    }

    @Override
    public void removeDoActionListener(final PropertyChangeListener listener)
    {
        delegate.removeDoActionListener(listener);
    }

    @Override
    public void removeToken(final Integer index)
    {
        tokens.remove(index);
    }

    @Override
    public void removeToken(final Position<?> position)
    {
        final ChessPosition cPosition = (ChessPosition)position;

        removeToken(cPosition.getIndex());
    }

    @Override
    public void removeUndoActionListener(final PropertyChangeListener listener)
    {
        delegate.removeUndoActionListener(listener);
    }

    @Override
    public void setInCheck(final ChessTeam team, final boolean isInCheck)
    {
        if (team == ChessTeam.WHITE)
        {
            isWhiteCheck = isInCheck;
        }
        else if (team == ChessTeam.BLACK)
        {
            isBlackCheck = isInCheck;
        }
        else
        {
            throw new IllegalArgumentException("Unknown team " + team);
        }
    }

    @Override
    @SuppressWarnings("hiding")
    public void setStaleMate(final boolean isStaleMate)
    {
        this.isStaleMate = isStaleMate;
    }

    @Override
    @SuppressWarnings("hiding")
    public void setWhoseMove(final ChessTeam whoseMove)
    {
        this.whoseMove = whoseMove;
    }

    @Override
    public void zeroFiftyMoveCount()
    {
        fiftyMoveCount = 0;
    }

    /**
     * Locate the kings.
     */
    private void locateKings()
    {
        for (final Entry<Integer, ChessToken> entry : tokens.entrySet())
        {
            final ChessToken token = entry.getValue();

            if ((token != null) && (token.getType() == TokenType.KING))
            {
                final int index = entry.getKey();

                if (token.getTeam() == ChessTeam.WHITE)
                {
                    whiteKingIndex = index;
                }
                else
                {
                    blackKingIndex = index;
                }
            }
        }
    }
}
