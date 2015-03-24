package org.vizzini.core.crafting;


/**
 * Defines methods required by a recipe collection.
 * 
 * @param <I> Ingredient type.
 * @param <R> Recipe type.
 */
public interface RecipeCollection<I extends Ingredient, R extends Recipe<I>> extends NamedObjectCollection<R>
{
    /**
     * @param ingredient Ingredient.
     * 
     * @return true if the given parameter is used in a recipe.
     */
    boolean isUseful(I ingredient);

    /**
     * @param ingredient Ingredient.
     * 
     * @return true if the given parameter is not used in a recipe.
     */
    boolean isUseless(I ingredient);

    /**
     * @param ingredient Ingredient.
     * 
     * @return a list of recipes which use the given parameter.
     */
    RecipeCollection<I, R> whichUse(final I ingredient);
}
