package org.vizzini.example.boardgame.hexchess;

import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultToken;
import org.vizzini.core.game.Token;

/**
 * Provides a hexagonal chess token.
 */
public final class HexChessToken implements Token
{
    /** White king. */
    public static final HexChessToken WHITE_KING = new HexChessToken(HexChessTeam.WHITE, TokenType.KING);

    /** Black king. */
    public static final HexChessToken BLACK_KING = new HexChessToken(HexChessTeam.BLACK, TokenType.KING);

    /** White queen. */
    public static final HexChessToken WHITE_QUEEN = new HexChessToken(HexChessTeam.WHITE, TokenType.QUEEN);

    /** Black queen. */
    public static final HexChessToken BLACK_QUEEN = new HexChessToken(HexChessTeam.BLACK, TokenType.QUEEN);

    /** White rook. */
    public static final HexChessToken WHITE_ROOK = new HexChessToken(HexChessTeam.WHITE, TokenType.ROOK);

    /** Black rook. */
    public static final HexChessToken BLACK_ROOK = new HexChessToken(HexChessTeam.BLACK, TokenType.ROOK);

    /** White bishop. */
    public static final HexChessToken WHITE_BISHOP = new HexChessToken(HexChessTeam.WHITE, TokenType.BISHOP);

    /** Black bishop. */
    public static final HexChessToken BLACK_BISHOP = new HexChessToken(HexChessTeam.BLACK, TokenType.BISHOP);

    /** White knight. */
    public static final HexChessToken WHITE_KNIGHT = new HexChessToken(HexChessTeam.WHITE, TokenType.KNIGHT);

    /** Black knight. */
    public static final HexChessToken BLACK_KNIGHT = new HexChessToken(HexChessTeam.BLACK, TokenType.KNIGHT);

    /** White pawn. */
    public static final HexChessToken WHITE_PAWN = new HexChessToken(HexChessTeam.WHITE, TokenType.PAWN);

    /** Black pawn. */
    public static final HexChessToken BLACK_PAWN = new HexChessToken(HexChessTeam.BLACK, TokenType.PAWN);

    /** Values. */
    private static final HexChessToken[] VALUES;

    static
    {
        VALUES = new HexChessToken[12];

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
        VALUES[i++] = WHITE_PAWN;
        VALUES[i++] = BLACK_PAWN;
    }

    /**
     * @param team Team.
     * @param type Token type.
     * 
     * @return the token.
     */
    public static HexChessToken findByTeamAndType(final HexChessTeam team, final TokenType type)
    {
        HexChessToken answer = null;

        for (final HexChessToken token : VALUES)
        {
            if ((token.getTeam() == team) && (token.getType() == type))
            {
                answer = token;
                break;
            }
        }

        return answer;
    }

    /** Delegate. */
    private final Token delegate;

    /** Token type. */
    private final TokenType type;

    /**
     * @param team Team.
     * @param type Token type.
     */
    @SuppressWarnings("hiding")
    private HexChessToken(final HexChessTeam team, final TokenType type)
    {
        this(team, type, null);
    }

    /**
     * @param team Team.
     * @param type Token type.
     * @param agent Agent.
     */
    @SuppressWarnings("hiding")
    private HexChessToken(final HexChessTeam team, final TokenType type, final Agent agent)
    {
        String name = type.getSymbol();

        if (team == HexChessTeam.BLACK)
        {
            name = name.toLowerCase();
        }

        final String description = team.getName() + " " + type.getName();

        delegate = new DefaultToken(name, description, team, agent);
        this.type = type;
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
            final HexChessToken another = (HexChessToken)object;

            answer = (delegate == another.delegate) || (delegate.equals(another.delegate));

            if (answer)
            {
                answer = type == another.type;
            }
        }

        return answer;
    }

    @Override
    public Agent getAgent()
    {
        return delegate.getAgent();
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
    public HexChessTeam getTeam()
    {
        return (HexChessTeam)delegate.getTeam();
    }

    /**
     * @return the type
     */
    public TokenType getType()
    {
        return type;
    }

    @Override
    public int hashCode()
    {
        int answer = delegate.hashCode();
        answer += (31 * type.hashCode());

        return answer;
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
    public HexChessToken withAgent(final Agent agent)
    {
        return new HexChessToken(getTeam(), getType(), agent);
    }
}
