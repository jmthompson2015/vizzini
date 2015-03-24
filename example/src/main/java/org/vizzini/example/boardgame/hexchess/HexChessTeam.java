package org.vizzini.example.boardgame.hexchess;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Team;

/**
 * Provides a pseudo-enumeration of teams for hexagonal chess.
 */
public final class HexChessTeam implements Team
{
    /** White. */
    public static final HexChessTeam WHITE = new HexChessTeam("White", "team white");

    /** Black. */
    public static final HexChessTeam BLACK = new HexChessTeam("Black", "team black");

    /** Values. */
    private static final HexChessTeam[] VALUES;

    static
    {
        VALUES = new HexChessTeam[2];

        int i = 0;

        VALUES[i++] = WHITE;
        VALUES[i++] = BLACK;
    }

    /**
     * @return values.
     */
    public static HexChessTeam[] values()
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
    private HexChessTeam(final String name, final String description)
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
    public HexChessTeam opposite()
    {
        return (this == HexChessTeam.BLACK ? HexChessTeam.WHITE : HexChessTeam.BLACK);
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
