package org.vizzini.core.crafting;

/**
 * Defines methods required by a crafter.
 * 
 * @param <I> Ingredient type.
 * @param <R> Recipe type.
 * @param <P> Product type.
 */
public interface Crafter<I extends Ingredient, R extends Recipe<I>, P extends Product<I, R>>
{
    /**
     * @return the ingredientCollection
     */
    IngredientCollection<I> getIngredientCollection();

    /**
     * @return the ingredientRegistry
     */
    IngredientRegistry<I> getIngredientRegistry();

    /**
     * @return the productCollection
     */
    ProductCollection<I, R, P> getProductCollection();

    /**
     * @return the productRegistry
     */
    ProductRegistry<I, R, P> getProductRegistry();

    /**
     * @return the recipeCollection
     */
    RecipeCollection<I, R> getRecipeCollection();

    /**
     * @return the recipeRegistry
     */
    RecipeRegistry<I, R> getRecipeRegistry();
}
