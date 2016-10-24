package org.vizzini.starfightersquadrons;

import org.vizzini.core.InputValidator;

/**
 * Provides an enumeration of waves for Starfighter Squadrons.
 */
public enum Wave
{
    /** Wave. */
    CORE("Core"),
    /** Wave. */
    ONE("1"),
    /** Wave. */
    TWO("2"),
    /** Wave. */
    THREE("3"),
    /** Wave. */
    THREE_FIVE("3.5"),
    /** Wave. */
    FOUR("4"),
    /** Wave. */
    FIVE("5"),
    /** Wave. */
    SIX("6");

    /** Display name. */
    private final String displayName;

    /**
     * Construct this object.
     *
     * @param displayName Display name.
     */
    @SuppressWarnings("hiding")
    private Wave(final String displayName)
    {
        InputValidator.validateNotEmpty("displayName", displayName);

        this.displayName = displayName;
    }

    /**
     * @return the displayName
     */
    public String getDisplayName()
    {
        return displayName;
    }
}
