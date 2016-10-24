package org.vizzini.core;

/**
 * Defines methods required by a factory.
 * 
 * @param <T> Type.
 */
public interface Factory<T>
{
    /**
     * @return a new object.
     */
    T create();
}
