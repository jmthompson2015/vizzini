package org.vizzini.core.crafting;

import java.util.Collection;

/**
 * Provides a default implementation of a recipe collection.
 * 
 * @param <I> Ingredient type.
 * @param <R> Recipe type.
 */
public final class DefaultRecipeCollection<I extends Ingredient, R extends Recipe<I>> extends
        DefaultNamedObjectCollection<R> implements RecipeCollection<I, R>
{
    /**
     * Construct this object.
     */
    public DefaultRecipeCollection()
    {
        super();
    }

    /**
     * Construct this object.
     * 
     * @param c Initial values.
     */
    public DefaultRecipeCollection(final Collection<? extends R> c)
    {
        super(c);
    }

    @Override
    public boolean isUseful(final Ingredient ingredient)
    {
        return !isUseless(ingredient);
    }

    @Override
    public boolean isUseless(final Ingredient ingredient)
    {
        return whichUse(ingredient).isEmpty();
    }

    @Override
    public RecipeCollection<I, R> whichUse(final Ingredient ingredient)
    {
        if (ingredient == null)
        {
            throw new IllegalArgumentException("ingredient is null");
        }

        final RecipeCollection<I, R> answer = new DefaultRecipeCollection<I, R>();

        for (final R recipe : this)
        {
            final int size = recipe.getComponentCount();

            for (int i = 0; i < size; i++)
            {
                final Component<I> component = recipe.getComponent(i);

                if (component.getIngredient().equals(ingredient))
                {
                    answer.add(recipe);
                    break;
                }
            }
        }

        return answer;
    }
}
