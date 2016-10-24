package org.vizzini.core;

/**
 * Defines methods required by an object which can be copied. This should be used instead of <code>Cloneable</code>, at
 * least according to some.
 * 
 * @param <T> Type.
 */
public interface Copyable<T>
{
    /**
     * @return a new copy of this.
     */
    T copy();
}
