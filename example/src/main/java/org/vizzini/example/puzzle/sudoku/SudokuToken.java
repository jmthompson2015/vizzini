package org.vizzini.example.puzzle.sudoku;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultToken;
import org.vizzini.core.game.Token;

/**
 * Provides a pseudo-enumeration of tokens for Sudoku.
 */
public class SudokuToken implements Token
{
    /** Token. */
    public static final SudokuToken ONE = new SudokuToken("1", "One");

    /** Token. */
    public static final SudokuToken TWO = new SudokuToken("2", "Two");

    /** Token. */
    public static final SudokuToken THREE = new SudokuToken("3", "Three");

    /** Token. */
    public static final SudokuToken FOUR = new SudokuToken("4", "Four");

    /** Token. */
    public static final SudokuToken FIVE = new SudokuToken("5", "Five");

    /** Token. */
    public static final SudokuToken SIX = new SudokuToken("6", "Six");

    /** Token. */
    public static final SudokuToken SEVEN = new SudokuToken("7", "Seven");

    /** Token. */
    public static final SudokuToken EIGHT = new SudokuToken("8", "Eight");

    /** Token. */
    public static final SudokuToken NINE = new SudokuToken("9", "Nine");

    /** Values. */
    private static final SudokuToken[] VALUES;

    static
    {
        VALUES = new SudokuToken[9];

        int i = 0;

        VALUES[i++] = ONE;
        VALUES[i++] = TWO;
        VALUES[i++] = THREE;
        VALUES[i++] = FOUR;
        VALUES[i++] = FIVE;
        VALUES[i++] = SIX;
        VALUES[i++] = SEVEN;
        VALUES[i++] = EIGHT;
        VALUES[i++] = NINE;
    }

    /**
     * @param name Name.
     * 
     * @return the token with the given name.
     */
    public static SudokuToken findByName(final String name)
    {
        SudokuToken answer = null;

        for (final SudokuToken token : values())
        {
            if (token.getName().equals(name))
            {
                answer = token;
                break;
            }
        }

        return answer;
    }

    /**
     * @return values.
     */
    public static SudokuToken[] values()
    {
        return VALUES;
    }

    /** Delegate. */
    private final Token delegate;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param description Description.
     */
    private SudokuToken(final String name, final String description)
    {
        this(name, description, null);
    }

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param description Description.
     * @param agent Agent.
     */
    private SudokuToken(final String name, final String description, final Agent agent)
    {
        delegate = new DefaultToken(name, description, SudokuTeam.TEAM, agent);
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
    public SudokuTeam getTeam()
    {
        return (SudokuTeam)delegate.getTeam();
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Override
    public SudokuToken withAgent(final Agent agent)
    {
        return new SudokuToken(getName(), getDescription(), agent);
    }
}
