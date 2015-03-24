package org.vizzini.core.crafting;

/**
 * Defines methods required by a product registry.
 * 
 * @param <I> Ingredient type.
 * @param <R> Recipe type.
 * @param <P> Product type.
 */
public interface ProductRegistry<I extends Ingredient, R extends Recipe<I>, P extends Product<I, R>> extends
        Registry<P>
{
    // Nothing to do.
}
