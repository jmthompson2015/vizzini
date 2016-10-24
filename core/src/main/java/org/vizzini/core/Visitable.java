package org.vizzini.core;

/**
 * Defines methods required by an object which accepts a visitor.
 * 
 * @param <E> Element type.
 */
public interface Visitable<E>
{
    /**
     * @param visitor Visitor.
     */
    void accept(Visitor<E> visitor);
}
