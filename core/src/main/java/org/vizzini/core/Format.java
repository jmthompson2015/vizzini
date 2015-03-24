package org.vizzini.core;

/**
 * Defines methods required by a formatter.
 * 
 * @param <T> Type.
 */
public interface Format<T>
{
    /**
     * @param object Object.
     * 
     * @return a string representation of the given parameter.
     */
    String format(final T object);

    /**
     * @param source Source string.
     * 
     * @return a new, populated object.
     */
    T parse(final String source);
}
