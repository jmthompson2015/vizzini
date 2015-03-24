package org.vizzini.core;

/**
 * Defines methods required by a filter.
 * 
 * @param <T> Type.
 */
public interface Filter<T>
{
    /**
     * @param input Input.
     * 
     * @return a new filtered version of the given parameter.
     */
    T filter(T input);

    /**
     * @param input Input.
     * @param isVerbose Flag indicating whether to print informational messages.
     * 
     * @return a new filtered version of the given parameter.
     */
    T filter(T input, boolean isVerbose);
}
