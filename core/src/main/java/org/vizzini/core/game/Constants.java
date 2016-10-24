package org.vizzini.core.game;

/**
 * Provides constants.
 */
public final class Constants
{
    /** Infinity offset. */
    private static final int INFINITY_OFFSET = 1000;

    /** Infinity. */
    public static final int INFINITY = Math.min(-(Integer.MIN_VALUE + INFINITY_OFFSET), Integer.MAX_VALUE
            - INFINITY_OFFSET);
}
