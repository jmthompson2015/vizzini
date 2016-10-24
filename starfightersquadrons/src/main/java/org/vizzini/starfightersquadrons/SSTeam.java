package org.vizzini.starfightersquadrons;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Team;

/**
 * Provides a pseudo-enumeration of teams for Starfighter Squadrons.
 */
public final class SSTeam implements Team
{
    /**
     * @return values.
     */
    public static SSTeam[] values()
    {
        return VALUES;
    }

    /** Imperial. */
    public static final SSTeam IMPERIAL = new SSTeam("Imperial", "Imperial team.");

    /** Rebel. */
    public static final SSTeam REBEL = new SSTeam("Rebel", "Rebel team.");

    /** Values. */
    private static final SSTeam[] VALUES;

    static
    {
        VALUES = new SSTeam[2];

        int i = 0;

        VALUES[i++] = IMPERIAL;
        VALUES[i++] = REBEL;
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
    private SSTeam(final String name, final String description)
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
    public SSTeam opposite()
    {
        return (this == SSTeam.REBEL ? SSTeam.IMPERIAL : SSTeam.REBEL);
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
