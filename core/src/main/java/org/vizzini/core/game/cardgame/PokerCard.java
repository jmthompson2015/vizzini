package org.vizzini.core.game.cardgame;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultToken;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;

/**
 * Provides a pseudo-enumeration of poker cards.
 */
public final class PokerCard implements Card
{
    /** Card. */
    public static final PokerCard C1 = new PokerCard(PokerSuit.CLUBS, "Ace", 1);

    /** Card. */
    public static final PokerCard C2 = new PokerCard(PokerSuit.CLUBS, "Two", 2);

    /** Card. */
    public static final PokerCard C3 = new PokerCard(PokerSuit.CLUBS, "Three", 3);

    /** Card. */
    public static final PokerCard C4 = new PokerCard(PokerSuit.CLUBS, "Four", 4);

    /** Card. */
    public static final PokerCard C5 = new PokerCard(PokerSuit.CLUBS, "Five", 5);

    /** Card. */
    public static final PokerCard C6 = new PokerCard(PokerSuit.CLUBS, "Six", 6);

    /** Card. */
    public static final PokerCard C7 = new PokerCard(PokerSuit.CLUBS, "Seven", 7);

    /** Card. */
    public static final PokerCard C8 = new PokerCard(PokerSuit.CLUBS, "Eight", 8);

    /** Card. */
    public static final PokerCard C9 = new PokerCard(PokerSuit.CLUBS, "Nine", 9);

    /** Card. */
    public static final PokerCard C10 = new PokerCard(PokerSuit.CLUBS, "Ten", 10);

    /** Card. */
    public static final PokerCard C11 = new PokerCard(PokerSuit.CLUBS, "Jack", 11);

    /** Card. */
    public static final PokerCard C12 = new PokerCard(PokerSuit.CLUBS, "Queen", 12);

    /** Card. */
    public static final PokerCard C13 = new PokerCard(PokerSuit.CLUBS, "King", 13);

    /** Card. */
    public static final PokerCard D1 = new PokerCard(PokerSuit.DIAMONDS, "Ace", 1);

    /** Card. */
    public static final PokerCard D2 = new PokerCard(PokerSuit.DIAMONDS, "Two", 2);

    /** Card. */
    public static final PokerCard D3 = new PokerCard(PokerSuit.DIAMONDS, "Three", 3);

    /** Card. */
    public static final PokerCard D4 = new PokerCard(PokerSuit.DIAMONDS, "Four", 4);

    /** Card. */
    public static final PokerCard D5 = new PokerCard(PokerSuit.DIAMONDS, "Five", 5);

    /** Card. */
    public static final PokerCard D6 = new PokerCard(PokerSuit.DIAMONDS, "Six", 6);

    /** Card. */
    public static final PokerCard D7 = new PokerCard(PokerSuit.DIAMONDS, "Seven", 7);

    /** Card. */
    public static final PokerCard D8 = new PokerCard(PokerSuit.DIAMONDS, "Eight", 8);

    /** Card. */
    public static final PokerCard D9 = new PokerCard(PokerSuit.DIAMONDS, "Nine", 9);

    /** Card. */
    public static final PokerCard D10 = new PokerCard(PokerSuit.DIAMONDS, "Ten", 10);

    /** Card. */
    public static final PokerCard D11 = new PokerCard(PokerSuit.DIAMONDS, "Jack", 11);

    /** Card. */
    public static final PokerCard D12 = new PokerCard(PokerSuit.DIAMONDS, "Queen", 12);

    /** Card. */
    public static final PokerCard D13 = new PokerCard(PokerSuit.DIAMONDS, "King", 13);

    /** Card. */
    public static final PokerCard S1 = new PokerCard(PokerSuit.SPADES, "Ace", 1);

    /** Card. */
    public static final PokerCard S2 = new PokerCard(PokerSuit.SPADES, "Two", 2);

    /** Card. */
    public static final PokerCard S3 = new PokerCard(PokerSuit.SPADES, "Three", 3);

    /** Card. */
    public static final PokerCard S4 = new PokerCard(PokerSuit.SPADES, "Four", 4);

    /** Card. */
    public static final PokerCard S5 = new PokerCard(PokerSuit.SPADES, "Five", 5);

    /** Card. */
    public static final PokerCard S6 = new PokerCard(PokerSuit.SPADES, "Six", 6);

    /** Card. */
    public static final PokerCard S7 = new PokerCard(PokerSuit.SPADES, "Seven", 7);

    /** Card. */
    public static final PokerCard S8 = new PokerCard(PokerSuit.SPADES, "Eight", 8);

    /** Card. */
    public static final PokerCard S9 = new PokerCard(PokerSuit.SPADES, "Nine", 9);

    /** Card. */
    public static final PokerCard S10 = new PokerCard(PokerSuit.SPADES, "Ten", 10);

    /** Card. */
    public static final PokerCard S11 = new PokerCard(PokerSuit.SPADES, "Jack", 11);

    /** Card. */
    public static final PokerCard S12 = new PokerCard(PokerSuit.SPADES, "Queen", 12);

    /** Card. */
    public static final PokerCard S13 = new PokerCard(PokerSuit.SPADES, "King", 13);

    /** Card. */
    public static final PokerCard H1 = new PokerCard(PokerSuit.HEARTS, "Ace", 1);

    /** Card. */
    public static final PokerCard H2 = new PokerCard(PokerSuit.HEARTS, "Two", 2);

    /** Card. */
    public static final PokerCard H3 = new PokerCard(PokerSuit.HEARTS, "Three", 3);

    /** Card. */
    public static final PokerCard H4 = new PokerCard(PokerSuit.HEARTS, "Four", 4);

    /** Card. */
    public static final PokerCard H5 = new PokerCard(PokerSuit.HEARTS, "Five", 5);

    /** Card. */
    public static final PokerCard H6 = new PokerCard(PokerSuit.HEARTS, "Six", 6);

    /** Card. */
    public static final PokerCard H7 = new PokerCard(PokerSuit.HEARTS, "Seven", 7);

    /** Card. */
    public static final PokerCard H8 = new PokerCard(PokerSuit.HEARTS, "Eight", 8);

    /** Card. */
    public static final PokerCard H9 = new PokerCard(PokerSuit.HEARTS, "Nine", 9);

    /** Card. */
    public static final PokerCard H10 = new PokerCard(PokerSuit.HEARTS, "Ten", 10);

    /** Card. */
    public static final PokerCard H11 = new PokerCard(PokerSuit.HEARTS, "Jack", 11);

    /** Card. */
    public static final PokerCard H12 = new PokerCard(PokerSuit.HEARTS, "Queen", 12);

    /** Card. */
    public static final PokerCard H13 = new PokerCard(PokerSuit.HEARTS, "King", 13);

    /** Values. */
    private static final PokerCard[] VALUES;

    static
    {
        VALUES = new PokerCard[52];

        int i = 0;
        VALUES[i++] = C1;
        VALUES[i++] = C2;
        VALUES[i++] = C3;
        VALUES[i++] = C4;
        VALUES[i++] = C5;
        VALUES[i++] = C6;
        VALUES[i++] = C7;
        VALUES[i++] = C8;
        VALUES[i++] = C9;
        VALUES[i++] = C10;
        VALUES[i++] = C11;
        VALUES[i++] = C12;
        VALUES[i++] = C13;
        VALUES[i++] = D1;
        VALUES[i++] = D2;
        VALUES[i++] = D3;
        VALUES[i++] = D4;
        VALUES[i++] = D5;
        VALUES[i++] = D6;
        VALUES[i++] = D7;
        VALUES[i++] = D8;
        VALUES[i++] = D9;
        VALUES[i++] = D10;
        VALUES[i++] = D11;
        VALUES[i++] = D12;
        VALUES[i++] = D13;
        VALUES[i++] = S1;
        VALUES[i++] = S2;
        VALUES[i++] = S3;
        VALUES[i++] = S4;
        VALUES[i++] = S5;
        VALUES[i++] = S6;
        VALUES[i++] = S7;
        VALUES[i++] = S8;
        VALUES[i++] = S9;
        VALUES[i++] = S10;
        VALUES[i++] = S11;
        VALUES[i++] = S12;
        VALUES[i++] = S13;
        VALUES[i++] = H1;
        VALUES[i++] = H2;
        VALUES[i++] = H3;
        VALUES[i++] = H4;
        VALUES[i++] = H5;
        VALUES[i++] = H6;
        VALUES[i++] = H7;
        VALUES[i++] = H8;
        VALUES[i++] = H9;
        VALUES[i++] = H10;
        VALUES[i++] = H11;
        VALUES[i++] = H12;
        VALUES[i++] = H13;
    }

    /**
     * @param suit Suit.
     * @param rank Rank.
     * 
     * @return the card with the given parameters.
     */
    public static PokerCard findBySuitRank(final PokerSuit suit, final int rank)
    {
        PokerCard answer = null;

        for (final PokerCard card : values())
        {
            if ((card.getSuit() == suit) && (card.getRank() == rank))
            {
                answer = card;
                break;
            }
        }

        return answer;
    }

    /**
     * @return values.
     */
    public static PokerCard[] values()
    {
        return VALUES;
    }

    /** Delegate. */
    private final Token delegate;

    /** Rank. */
    private final int rank;

    /** Rank name. */
    private final String rankName;

    /** Symbol. */
    private final String symbol;

    /** Suit. */
    private final PokerSuit suit;

    /**
     * Construct this object.
     * 
     * @param suit Suit.
     * @param rankName Rank name.
     * @param rank Rank.
     */
    @SuppressWarnings("hiding")
    private PokerCard(final PokerSuit suit, final String rankName, final int rank)
    {
        this(suit, rankName, rank, null, null);
    }

    /**
     * Construct this object.
     * 
     * @param suit Suit.
     * @param rankName Rank name.
     * @param rank Rank.
     * @param team Team.
     * @param agent Agent.
     */
    @SuppressWarnings("hiding")
    private PokerCard(final PokerSuit suit, final String rankName, final int rank, final Team team, final Agent agent)
    {
        if (suit == null)
        {
            throw new IllegalArgumentException("suit is null");
        }

        if (StringUtils.isEmpty(rankName))
        {
            throw new IllegalArgumentException("rankName is null or empty");
        }

        this.suit = suit;
        this.rankName = rankName;
        this.rank = rank;
        this.symbol = createSymbol();

        final String description = rankName + " of " + suit.getName();

        delegate = new DefaultToken(description, description, team, agent);
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
            final PokerCard another = (PokerCard)object;

            answer = rank == another.rank;

            if (answer)
            {
                answer = suit == another.suit;
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
    public int getRank()
    {
        return rank;
    }

    @Override
    public String getRankName()
    {
        return rankName;
    }

    @Override
    public PokerSuit getSuit()
    {
        return suit;
    }

    @Override
    public String getSymbol()
    {
        return symbol;
    }

    @Override
    public Team getTeam()
    {
        return delegate.getTeam();
    }

    @Override
    public int hashCode()
    {
        int answer = 0;

        final int[] primes = { 2, 3, };
        int i = 0;

        answer += primes[i++] * rank;
        answer += primes[i++] * suit.hashCode();

        return answer;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Override
    public PokerCard withAgent(final Agent agent)
    {
        return new PokerCard(getSuit(), getRankName(), getRank(), getTeam(), agent);
    }

    /**
     * @return a symbol.
     */
    private String createSymbol()
    {
        String answer;

        if ((1 < rank) && (rank < 10))
        {
            answer = String.valueOf(rank) + getSuit().getSymbol();
        }
        else
        {
            answer = getRankName().substring(0, 1) + getSuit().getSymbol();
        }

        return answer;
    }
}
