package org.vizzini.chess;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultToken;
import org.vizzini.core.game.Token;

/**
 * Provides a chess token.
 */
public final class DefaultChessToken implements ChessToken
{
    /** White king. */
    public static final ChessToken WHITE_KING = new DefaultChessToken(ChessTeam.WHITE, TokenType.KING);

    /** Black king. */
    public static final ChessToken BLACK_KING = new DefaultChessToken(ChessTeam.BLACK, TokenType.KING);

    /** White queen. */
    public static final ChessToken WHITE_QUEEN = new DefaultChessToken(ChessTeam.WHITE, TokenType.QUEEN);

    /** Black queen. */
    public static final ChessToken BLACK_QUEEN = new DefaultChessToken(ChessTeam.BLACK, TokenType.QUEEN);

    /** White rook. */
    public static final ChessToken WHITE_ROOK = new DefaultChessToken(ChessTeam.WHITE, TokenType.ROOK);

    /** Black rook. */
    public static final ChessToken BLACK_ROOK = new DefaultChessToken(ChessTeam.BLACK, TokenType.ROOK);

    /** White bishop. */
    public static final ChessToken WHITE_BISHOP = new DefaultChessToken(ChessTeam.WHITE, TokenType.BISHOP);

    /** Black bishop. */
    public static final ChessToken BLACK_BISHOP = new DefaultChessToken(ChessTeam.BLACK, TokenType.BISHOP);

    /** White knight. */
    public static final ChessToken WHITE_KNIGHT = new DefaultChessToken(ChessTeam.WHITE, TokenType.KNIGHT);

    /** Black knight. */
    public static final ChessToken BLACK_KNIGHT = new DefaultChessToken(ChessTeam.BLACK, TokenType.KNIGHT);

    /** White unicorn. */
    public static final ChessToken WHITE_UNICORN = new DefaultChessToken(ChessTeam.WHITE, TokenType.UNICORN);

    /** Black unicorn. */
    public static final ChessToken BLACK_UNICORN = new DefaultChessToken(ChessTeam.BLACK, TokenType.UNICORN);

    /** White pawn. */
    public static final ChessToken WHITE_PAWN = new DefaultChessToken(ChessTeam.WHITE, TokenType.PAWN);

    /** Black pawn. */
    public static final ChessToken BLACK_PAWN = new DefaultChessToken(ChessTeam.BLACK, TokenType.PAWN);

    /** Values. */
    private static final ChessToken[] VALUES;

    static
    {
        VALUES = new ChessToken[14];

        int i = 0;

        VALUES[i++] = WHITE_KING;
        VALUES[i++] = BLACK_KING;
        VALUES[i++] = WHITE_QUEEN;
        VALUES[i++] = BLACK_QUEEN;
        VALUES[i++] = WHITE_ROOK;
        VALUES[i++] = BLACK_ROOK;
        VALUES[i++] = WHITE_BISHOP;
        VALUES[i++] = BLACK_BISHOP;
        VALUES[i++] = WHITE_KNIGHT;
        VALUES[i++] = BLACK_KNIGHT;
        VALUES[i++] = WHITE_UNICORN;
        VALUES[i++] = BLACK_UNICORN;
        VALUES[i++] = WHITE_PAWN;
        VALUES[i++] = BLACK_PAWN;
    }

    /**
     * @param team Team.
     * @param type Token type.
     * 
     * @return the token.
     */
    public static ChessToken findByTeamAndType(final ChessTeam team, final TokenType type)
    {
        ChessToken answer = null;

        for (final ChessToken token : VALUES)
        {
            if ((token.getTeam() == team) && (token.getType() == type))
            {
                answer = token;
                break;
            }
        }

        return answer;
    }

    /** Attacked value. */
    private int attackedValue;

    /** Defended value. */
    private int defendedValue;

    /** Delegate. */
    private final Token delegate;

    /** Flag indicating if this token has been moved. */
    private boolean isMoved;

    /** Flag indicating if this token is selected. */
    private boolean isSelected;

    /** Token type. */
    private final TokenType type;

    /** Valid moves. */
    private List<Integer> validMoves = new ArrayList<Integer>();

    /**
     * @param team Team.
     * @param type Token type.
     */
    @SuppressWarnings("hiding")
    private DefaultChessToken(final ChessTeam team, final TokenType type)
    {
        this(team, type, null);
    }

    /**
     * @param team Team.
     * @param type Token type.
     * @param agent Agent.
     */
    @SuppressWarnings("hiding")
    private DefaultChessToken(final ChessTeam team, final TokenType type, final Agent agent)
    {
        String name = type.getSymbol();

        if (team == ChessTeam.BLACK)
        {
            name = name.toLowerCase();
        }

        final String description = team.getName() + " " + type.getName();

        delegate = new DefaultToken(name, description, team, agent);
        this.type = type;
    }

    @Override
    @SuppressWarnings("hiding")
    public void addAttackedValue(final int attackedValue)
    {
        this.attackedValue += attackedValue;
    }

    @Override
    @SuppressWarnings("hiding")
    public void addDefendedValue(final int defendedValue)
    {
        this.defendedValue += defendedValue;
    }

    @Override
    public void addValidMove(final int index)
    {
        validMoves.add(index);
    }

    @Override
    public void clearValidMoves()
    {
        validMoves.clear();
    }

    @Override
    public ChessToken copy()
    {
        final DefaultChessToken answer = new DefaultChessToken(getTeam(), getType(), getAgent());

        answer.attackedValue = this.attackedValue;
        answer.defendedValue = this.defendedValue;
        answer.isMoved = this.isMoved;
        answer.isSelected = this.isSelected;

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
            final DefaultChessToken another = (DefaultChessToken)object;

            answer = (delegate == another.delegate) || (delegate.equals(another.delegate));

            if (answer)
            {
                answer = type == another.type;
            }
        }

        return answer;
    }

    @Override
    public int getActionValue()
    {
        return getType().getActionValue();
    }

    @Override
    public Agent getAgent()
    {
        return delegate.getAgent();
    }

    @Override
    public int getAttackedValue()
    {
        return attackedValue;
    }

    @Override
    public int getDefendedValue()
    {
        return defendedValue;
    }

    @Override
    public String getDescription()
    {
        return delegate.getDescription();
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public ChessTeam getTeam()
    {
        return (ChessTeam)delegate.getTeam();
    }

    @Override
    public TokenType getType()
    {
        return type;
    }

    @Override
    public List<Integer> getValidMoves()
    {
        return validMoves;
    }

    @Override
    public int getValue()
    {
        return getType().getValue();
    }

    @Override
    public int hashCode()
    {
        int answer = delegate.hashCode();
        answer += (31 * type.hashCode());

        return answer;
    }

    @Override
    public boolean isMoved()
    {
        return isMoved;
    }

    @Override
    public boolean isSelected()
    {
        return isSelected;
    }

    @SuppressWarnings("hiding")
    @Override
    public void setMoved(final boolean isMoved)
    {
        this.isMoved = isMoved;
    }

    @SuppressWarnings("hiding")
    @Override
    public void setSelected(final boolean isSelected)
    {
        this.isSelected = isSelected;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append(getTeam().getName());
        sb.append(" ");
        sb.append(getType().getName());

        return sb.toString();
    }

    @Override
    public ChessToken withAgent(final Agent agent)
    {
        return new DefaultChessToken(getTeam(), getType(), agent);
    }
}
