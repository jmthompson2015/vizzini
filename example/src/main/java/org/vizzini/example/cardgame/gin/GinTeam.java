package org.vizzini.example.cardgame.gin;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Team;

/**
 * Provides a pseudo-enumeration of teams for gin.
 */
public final class GinTeam implements Team
{
    /** First. */
    public static final GinTeam FIRST = new GinTeam("First", "first team");

    /** Second. */
    public static final GinTeam SECOND = new GinTeam("Second", "second team");

    /** Values. */
    private static final GinTeam[] VALUES;

    static
    {
        VALUES = new GinTeam[2];

        int i = 0;

        VALUES[i++] = FIRST;
        VALUES[i++] = SECOND;
    }

    /**
     * @return values.
     */
    public static GinTeam[] values()
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
    private GinTeam(final String name, final String description)
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
    public GinTeam opposite()
    {
        return (this == GinTeam.FIRST ? GinTeam.SECOND : GinTeam.FIRST);
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
