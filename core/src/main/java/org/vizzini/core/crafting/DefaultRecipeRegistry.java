package org.vizzini.core.crafting;

import java.util.List;

import org.apache.commons.lang3.StringUtils;

/**
 * Provides a class to manage recipes.
 * 
 * @param <I> Ingredient type.
 * @param <R> Recipe type.
 */
public final class DefaultRecipeRegistry<I extends Ingredient, R extends Recipe<I>> implements RecipeRegistry<I, R>
{
    /** Recipe collection. */
    private final RecipeCollection<I, R> recipeCollection;

    /**
     * Construct this object.
     * 
     * @param recipeCollection Recipe collection.
     */
    @SuppressWarnings("hiding")
    public DefaultRecipeRegistry(final RecipeCollection<I, R> recipeCollection)
    {
        this.recipeCollection = recipeCollection;
    }

    @Override
    public RecipeCollection<I, R> getCollection()
    {
        return recipeCollection;
    }

    /**
     * @param name Name. (required)
     * @param components Components. (required)
     * 
     * @return a recipe.
     */
    public R getInstance(final String name, final List<Component<I>> components)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        R answer = recipeCollection.findByName(name);

        if (answer == null)
        {
            @SuppressWarnings("unchecked")
            final R recipe = (R)(new DefaultRecipe<I>(name, components));
            answer = recipe;

            recipeCollection.add(answer);
        }

        return answer;
    }
}
