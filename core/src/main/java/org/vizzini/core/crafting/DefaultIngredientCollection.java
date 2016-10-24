package org.vizzini.core.crafting;

import java.util.Collection;

/**
 * Provides a default implementation of an ingredient collection.
 * 
 * @param <I> Ingredient type.
 */
public final class DefaultIngredientCollection<I extends Ingredient> extends DefaultNamedObjectCollection<I> implements
        IngredientCollection<I>
{
    /**
     * Construct this object.
     */
    public DefaultIngredientCollection()
    {
        super();
    }

    /**
     * Construct this object.
     * 
     * @param c Initial values.
     */
    public DefaultIngredientCollection(final Collection<? extends I> c)
    {
        super(c);
    }
}
