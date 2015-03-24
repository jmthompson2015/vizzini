package org.vizzini.core;

/**
 * Defines methods required by a visitor.
 * 
 * @param <E> Element type.
 */
public interface Visitor<E>
{
    /**
     * @param element Element.
     */
    void visit(E element);
}
