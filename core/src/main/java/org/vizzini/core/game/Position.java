package org.vizzini.core.game;

/**
 * Defines methods required by a position.
 * 
 * @param <T> Coordinate type.
 */
public interface Position<T>
{
    /**
     * @return x
     */
    T getX();

    /**
     * @return y
     */
    T getY();

    /**
     * @return z
     */
    T getZ();
}
