package org.vizzini.core.crafting;

import org.vizzini.core.NamedObject;
import org.vizzini.core.Visitable;

/**
 * Defines methods required by a product.
 * 
 * @param <I> Ingredient type.
 * @param <R> Recipe type.
 */
public interface Product<I extends Ingredient, R extends Recipe<I>> extends Comparable<Product<I, R>>, NamedObject,
        Visitable<Product<I, R>>
{
    /**
     * @return the ask
     */
    double getAsk();

    /**
     * @return the bid
     */
    double getBid();

    /**
     * @return a new string.
     */
    String getComponentsString();

    /**
     * @return the ingredient
     */
    I getIngredient();

    /**
     * @return the recipe
     */
    R getRecipe();

    /**
     * @return true if this is produced by a recipe.
     */
    boolean isCrafted();
}
