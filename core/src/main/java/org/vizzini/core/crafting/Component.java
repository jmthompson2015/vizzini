package org.vizzini.core.crafting;

/**
 * Defines methods required by a component.
 * 
 * @param <I> Ingredient type.
 */
public interface Component<I extends Ingredient>
{
    /**
     * @return the ingredient.
     */
    I getIngredient();

    /**
     * @return the quantity.
     */
    double getQuantity();
}
