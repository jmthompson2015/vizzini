package org.vizzini.core.crafting;

/**
 * Defines methods required by a recipe registry.
 * 
 * @param <I> Ingredient type.
 * @param <R> Recipe type.
 */
public interface RecipeRegistry<I extends Ingredient, R extends Recipe<I>> extends Registry<R>
{
    // Nothing to do.
}
