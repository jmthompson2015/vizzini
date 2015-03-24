package org.vizzini.runescape;

import org.vizzini.core.crafting.Component;
import org.vizzini.core.crafting.DefaultComponent;

/**
 * Provides an implementation of an item component.
 */
public final class ItemComponent implements Component<ItemIngredient>
{
    /** Delegate. */
    private final Component<ItemIngredient> delegate;

    /**
     * Construct this object.
     * 
     * @param quantity Quantity.
     * @param ingredient Ingredient. (required)
     */
    public ItemComponent(final double quantity, final ItemIngredient ingredient)
    {
        delegate = new DefaultComponent<ItemIngredient>(quantity, ingredient);
    }

    @Override
    public ItemIngredient getIngredient()
    {
        return delegate.getIngredient();
    }

    @Override
    public double getQuantity()
    {
        return delegate.getQuantity();
    }
}
