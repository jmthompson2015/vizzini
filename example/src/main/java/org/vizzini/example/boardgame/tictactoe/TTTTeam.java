package org.vizzini.example.boardgame.tictactoe;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Team;

/**
 * Provides a pseudo-enumeration of teams for tic-tac-toe.
 */
public final class TTTTeam implements Team
{
    /** X. */
    public static final TTTTeam X = new TTTTeam("X", "team x");

    /** O. */
    public static final TTTTeam O = new TTTTeam("O", "team o");

    /** Values. */
    private static final TTTTeam[] VALUES;

    static
    {
        VALUES = new TTTTeam[2];

        int i = 0;

        VALUES[i++] = X;
        VALUES[i++] = O;
    }

    /**
     * @return values.
     */
    public static TTTTeam[] values()
    {
        return VALUES;
    }

    /** Description. */
    private final String description;

    /** Name. */
    private final String name;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param description Description.
     */
    @SuppressWarnings("hiding")
    private TTTTeam(final String name, final String description)
    {
        this.name = name;
        this.description = description;
    }

    @Override
    public String getDescription()
    {
        return description;
    }

    @Override
    public String getName()
    {
        return name;
    }

    /**
     * @return the opposite team.
     */
    public TTTTeam opposite()
    {
        return (this == TTTTeam.X ? TTTTeam.O : TTTTeam.X);
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
