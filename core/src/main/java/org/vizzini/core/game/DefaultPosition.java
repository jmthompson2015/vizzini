package org.vizzini.core.game;

/**
 * Provides a default implementation of a position.
 * 
 * @param <T> Coordinate type.
 */
public final class DefaultPosition<T> implements Position<T>
{
    /** X coordinate. */
    private final T x;

    /** Y coordinate. */
    private final T y;

    /** Z coordinate. */
    private final T z;

    /**
     * Construct this object.
     * 
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param z Z coordinate.
     */
    @SuppressWarnings("hiding")
    public DefaultPosition(final T x, final T y, final T z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    @Override
    public T getX()
    {
        return x;
    }

    @Override
    public T getY()
    {
        return y;
    }

    @Override
    public T getZ()
    {
        return z;
    }
}
