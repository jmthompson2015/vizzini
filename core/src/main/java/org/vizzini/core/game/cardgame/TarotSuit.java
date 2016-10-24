package org.vizzini.core.game.cardgame;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * Provides a pseudo-enumeration of tarot suits.
 */
public final class TarotSuit implements Suit
{
    /** Suit. */
    public static final TarotSuit WANDS = new TarotSuit("Wands");

    /** Suit. */
    public static final TarotSuit PENTACLES = new TarotSuit("Pentacles");

    /** Suit. */
    public static final TarotSuit SWORDS = new TarotSuit("Swords");

    /** Suit. */
    public static final TarotSuit CUPS = new TarotSuit("Cups");

    /** Name. */
    private final String name;

    /** Symbol. */
    private final String symbol;

    /** Values. */
    private static final TarotSuit[] VALUES;

    static
    {
        VALUES = new TarotSuit[4];

        int i = 0;

        VALUES[i++] = WANDS;
        VALUES[i++] = PENTACLES;
        VALUES[i++] = SWORDS;
        VALUES[i++] = CUPS;
    }

    /**
     * @return values.
     */
    public static TarotSuit[] values()
    {
        return VALUES;
    }

    /**
     * Construct this object.
     * 
     * @param name Name.
     */
    @SuppressWarnings("hiding")
    private TarotSuit(final String name)
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
        else if (this == WANDS)
        {
            answer = -1;
        }
        else if (this == PENTACLES)
        {
            if (another == WANDS)
            {
                answer = 1;
            }
            else
            {
                answer = -1;
            }
        }
        else if (this == SWORDS)
        {
            if ((another == WANDS) || (another == PENTACLES))
            {
                answer = 1;
            }
            else
            {
                answer = -1;
            }
        }
        else if (this == CUPS)
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
        // String myName = name;
        //
        // final int index = myName.indexOf(" ");
        //
        // if (index >= 0)
        // {
        // myName = myName.substring(0, index);
        // }
        //
        // return myName.toUpperCase();
        return name.toUpperCase();
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
