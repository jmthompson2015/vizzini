package org.vizzini.example.boardgame.checkers;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Team;

/**
 * Provides a pseudo-enumeration of teams for checkers.
 */
public final class CheckersTeam implements Team
{
    /** Red. */
    public static final CheckersTeam RED = new CheckersTeam("Red", "team red");

    /** White. */
    public static final CheckersTeam WHITE = new CheckersTeam("White", "team white");

    /** Values. */
    private static final CheckersTeam[] VALUES;

    static
    {
        VALUES = new CheckersTeam[2];

        int i = 0;

        VALUES[i++] = RED;
        VALUES[i++] = WHITE;
    }

    /**
     * @return values.
     */
    public static CheckersTeam[] values()
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
    private CheckersTeam(final String name, final String description)
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
    public CheckersTeam opposite()
    {
        return (this == CheckersTeam.RED ? CheckersTeam.WHITE : CheckersTeam.RED);
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
