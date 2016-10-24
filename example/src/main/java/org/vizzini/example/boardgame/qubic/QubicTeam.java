package org.vizzini.example.boardgame.qubic;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Team;

/**
 * Provides a pseudo-enumeration of teams for qubic.
 */
public final class QubicTeam implements Team
{
    /** X. */
    public static final QubicTeam X = new QubicTeam("X", "team x");

    /** O. */
    public static final QubicTeam O = new QubicTeam("O", "team o");

    /** Values. */
    private static final QubicTeam[] VALUES;

    static
    {
        VALUES = new QubicTeam[2];

        int i = 0;

        VALUES[i++] = X;
        VALUES[i++] = O;
    }

    /**
     * @return values.
     */
    public static QubicTeam[] values()
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
    private QubicTeam(final String name, final String description)
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
    public QubicTeam opposite()
    {
        return (this == QubicTeam.X ? QubicTeam.O : QubicTeam.X);
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
