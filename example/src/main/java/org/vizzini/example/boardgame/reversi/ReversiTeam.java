package org.vizzini.example.boardgame.reversi;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Team;

/**
 * Provides a pseudo-enumeration of teams for reversi.
 */
public final class ReversiTeam implements Team
{
    /** Black. */
    public static final ReversiTeam BLACK = new ReversiTeam("Black", "team black");

    /** White. */
    public static final ReversiTeam WHITE = new ReversiTeam("White", "team white");

    /** Values. */
    private static final ReversiTeam[] VALUES;

    static
    {
        VALUES = new ReversiTeam[2];

        int i = 0;

        VALUES[i++] = BLACK;
        VALUES[i++] = WHITE;
    }

    /**
     * @return values.
     */
    public static ReversiTeam[] values()
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
    private ReversiTeam(final String name, final String description)
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
    public ReversiTeam opposite()
    {
        return (this == ReversiTeam.BLACK ? ReversiTeam.WHITE : ReversiTeam.BLACK);
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
