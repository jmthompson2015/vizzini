package org.vizzini.chess;

import org.apache.commons.lang3.StringUtils;

/**
 * Provides an enumeration of token types.
 */
public enum TokenType
{
    /** King. */
    KING("King", "K", 32767, 1),
    /** Queen. */
    QUEEN("Queen", "Q", 975, 1),
    /** Rook. */
    ROOK("Rook", "R", 500, 2),
    /** Bishop. */
    BISHOP("Bishop", "B", 325, 3),
    /** Knight. */
    KNIGHT("Knight", "N", 320, 3),
    /** Unicorn. */
    UNICORN("Unicorn", "U", 310, 3),
    /** Pawn. */
    PAWN("Pawn", "P", 100, 6);

    /**
     * @param symbol Symbol.
     * 
     * @return the token type for the given symbol.
     */
    public static TokenType getBySymbol(final String symbol)
    {
        TokenType answer = null;

        if (StringUtils.isNotEmpty(symbol))
        {
            final TokenType[] values = values();
            final int size = values.length;

            for (int i = 0; (answer == null) && (i < size); i++)
            {
                final TokenType tokenType = values[i];

                if (tokenType.getSymbol().equals(symbol))
                {
                    answer = tokenType;
                }
            }
        }

        return answer;
    }

    /** Name. */
    private final String name;

    /** Action value. */
    private final int actionValue;

    /** Symbol. */
    private final String symbol;

    /** Value. */
    private final int value;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param symbol Symbol.
     * @param value Piece value.
     * @param actionValue Action value.
     */
    @SuppressWarnings("hiding")
    private TokenType(final String name, final String symbol, final int value, final int actionValue)
    {
        this.name = name;
        this.symbol = symbol;
        this.value = value;
        this.actionValue = actionValue;
    }

    /**
     * @return the actionValue
     */
    public int getActionValue()
    {
        return actionValue;
    }

    /**
     * @return the name
     */
    public String getName()
    {
        return name;
    }

    /**
     * @return the symbol
     */
    public String getSymbol()
    {
        return symbol;
    }

    /**
     * @return the value
     */
    public int getValue()
    {
        return value;
    }
}
