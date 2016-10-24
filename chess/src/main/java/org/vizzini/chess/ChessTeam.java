package org.vizzini.chess;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Team;

/**
 * Provides a pseudo-enumeration of teams for chess.
 */
public final class ChessTeam implements Team
{
    /** White. */
    public static final ChessTeam WHITE = new ChessTeam("White", "team white");

    /** Black. */
    public static final ChessTeam BLACK = new ChessTeam("Black", "team black");

    /** Values. */
    private static final ChessTeam[] VALUES;

    static
    {
        VALUES = new ChessTeam[2];

        int i = 0;

        VALUES[i++] = WHITE;
        VALUES[i++] = BLACK;
    }

    /**
     * @return values.
     */
    public static ChessTeam[] values()
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
    private ChessTeam(final String name, final String description)
    {
        this.name = name;
        this.description = description;
    }

    @Override
    public String getDescription()
    {
        return description;
    }

    /**
     * @return the team initial.
     */
    public String getInitial()
    {
        return name.substring(0, 1);
    }

    @Override
    public String getName()
    {
        return name;
    }

    /**
     * @return the opposite team.
     */
    public ChessTeam opposite()
    {
        return (this == ChessTeam.BLACK ? ChessTeam.WHITE : ChessTeam.BLACK);
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
