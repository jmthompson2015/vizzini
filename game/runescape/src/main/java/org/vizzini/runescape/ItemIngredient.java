package org.vizzini.runescape;

import org.vizzini.core.Visitor;
import org.vizzini.core.crafting.DefaultIngredient;
import org.vizzini.core.crafting.Ingredient;

/**
 * Provides an implementation of an item ingredient.
 */
public final class ItemIngredient implements Ingredient
{
    /** Delegate. */
    private final Ingredient delegate;

    /**
     * Construct this object.
     * 
     * @param name Name.
     */
    public ItemIngredient(final String name)
    {
        delegate = new DefaultIngredient(name);
    }

    @Override
    public void accept(final Visitor<Ingredient> visitor)
    {
        delegate.accept(visitor);
    }

    @Override
    public int compareTo(final Ingredient o)
    {
        return delegate.compareTo(o);
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }
}
