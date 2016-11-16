package org.vizzini.runescape;

import org.vizzini.core.Visitor;
import org.vizzini.core.crafting.DefaultProduct;
import org.vizzini.core.crafting.Product;

/**
 * Provides an implementation of an item product.
 */
public final class ItemProduct implements Product<ItemIngredient, ItemRecipe>
{
    /** Delegate. */
    private final Product<ItemIngredient, ItemRecipe> delegate;

    /**
     * Construct this object.
     * 
     * @param ingredient Ingredient. (required)
     * @param ask Ask price.
     * @param bid Bid price.
     * @param recipe Recipe. (optional)
     */
    public ItemProduct(final ItemIngredient ingredient, final double ask, final double bid, final ItemRecipe recipe)
    {
        delegate = new DefaultProduct<ItemIngredient, ItemRecipe>(ingredient, ask, bid, recipe);
    }

    @Override
    public void accept(final Visitor<Product<ItemIngredient, ItemRecipe>> visitor)
    {
        delegate.accept(visitor);
    }

    @Override
    public int compareTo(final Product<ItemIngredient, ItemRecipe> o)
    {
        return delegate.compareTo(o);
    }

    @Override
    public double getAsk()
    {
        return delegate.getAsk();
    }

    @Override
    public double getBid()
    {
        return delegate.getBid();
    }

    @Override
    public String getComponentsString()
    {
        return delegate.getComponentsString();
    }

    @Override
    public ItemIngredient getIngredient()
    {
        return delegate.getIngredient();
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public ItemRecipe getRecipe()
    {
        return delegate.getRecipe();
    }

    @Override
    public boolean isCrafted()
    {
        return delegate.isCrafted();
    }

    @Override
    public String toString()
    {
        // return delegate.toString();
        final StringBuilder sb = new StringBuilder();

        // sb.append(getClass().getName());
        // sb.append(" [");
        sb.append("name=").append(getName());
        // sb.append(",components=").append(components);
        // sb.append("]");
        // for(int i=0;i<getComponentCount();i++)
        // {
        // sb.append(getComp)
        // }
        // sb.append(",components=").append(getComponentsString());

        return sb.toString();
    }
}
