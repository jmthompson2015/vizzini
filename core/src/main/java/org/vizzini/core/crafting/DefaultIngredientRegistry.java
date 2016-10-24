package org.vizzini.core.crafting;

import org.apache.commons.lang3.StringUtils;

/**
 * Provides a class to manage ingredients.
 * 
 * @param <I> Ingredient type.
 */
public final class DefaultIngredientRegistry<I extends Ingredient> implements IngredientRegistry<I>
{
    /** Ingredient collection. */
    private final IngredientCollection<I> ingredientCollection;

    /**
     * Construct this object.
     * 
     * @param ingredientCollection Ingredient collection.
     */
    @SuppressWarnings("hiding")
    public DefaultIngredientRegistry(final IngredientCollection<I> ingredientCollection)
    {
        if (ingredientCollection == null)
        {
            throw new IllegalArgumentException("ingredientCollection is null");
        }

        this.ingredientCollection = ingredientCollection;
    }

    @Override
    public IngredientCollection<I> getCollection()
    {
        return ingredientCollection;
    }

    /**
     * @param name Name. (required)
     * 
     * @return an ingredient.
     */
    public I getInstance(final String name)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        I answer = ingredientCollection.findByName(name);

        if (answer == null)
        {
            @SuppressWarnings("unchecked")
            final I ingredient = (I)(new DefaultIngredient(name));
            answer = ingredient;

            ingredientCollection.add(answer);
        }

        return answer;
    }
}
