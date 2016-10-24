package org.vizzini.core.game.cardgame;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * Provides a pseudo-enumeration of poker suits.
 */
public final class PokerSuit implements Suit
{
    /** Suit. */
    public static final PokerSuit CLUBS = new PokerSuit("Clubs");

    /** Suit. */
    public static final PokerSuit DIAMONDS = new PokerSuit("Diamonds");

    /** Suit. */
    public static final PokerSuit SPADES = new PokerSuit("Spades");

    /** Suit. */
    public static final PokerSuit HEARTS = new PokerSuit("Hearts");

    /** Name. */
    private final String name;

    /** Symbol. */
    private final String symbol;

    /** Values. */
    private static final PokerSuit[] VALUES;

    static
    {
        VALUES = new PokerSuit[4];

        int i = 0;

        VALUES[i++] = CLUBS;
        VALUES[i++] = DIAMONDS;
        VALUES[i++] = SPADES;
        VALUES[i++] = HEARTS;
    }

    /**
     * @return values.
     */
    public static PokerSuit[] values()
    {
        return VALUES;
    }

    /**
     * Construct this object.
     * 
     * @param name Name.
     */
    @SuppressWarnings("hiding")
    private PokerSuit(final String name)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        this.name = name;
        this.symbol = name.substring(0, 1);
    }

    @Override
    public int compareTo(final Suit another)
    {
        int answer = 0;

        if (this == another)
        {
            answer = 0;
        }
        else if (another == null)
        {
            answer = -1;
        }
        else if (this == CLUBS)
        {
            answer = -1;
        }
        else if (this == DIAMONDS)
        {
            if (another == CLUBS)
            {
                answer = 1;
            }
            else
            {
                answer = -1;
            }
        }
        else if (this == SPADES)
        {
            if ((another == CLUBS) || (another == DIAMONDS))
            {
                answer = 1;
            }
            else
            {
                answer = -1;
            }
        }
        else if (this == HEARTS)
        {
            answer = 1;
        }

        return answer;
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public String getSymbol()
    {
        return symbol;
    }

    /**
     * @return the name
     */
    public String name()
    {
        return name.toUpperCase();
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
