package org.vizzini.runescape;

import org.vizzini.core.crafting.DefaultProductRegistry;
import org.vizzini.core.crafting.ProductRegistry;

/**
 * Provides an implementation of an item product registry.
 */
public final class ItemProductRegistry implements ProductRegistry<ItemIngredient, ItemRecipe, ItemProduct>
{
    /** Delegate. */
    private final ProductRegistry<ItemIngredient, ItemRecipe, ItemProduct> delegate;

    /**
     * Construct this object.
     */
    public ItemProductRegistry()
    {
        this(new ItemProductCollection());
    }

    /**
     * Construct this object.
     * 
     * @param productCollection Product collection.
     */
    public ItemProductRegistry(final ItemProductCollection productCollection)
    {
        delegate = new DefaultProductRegistry<ItemIngredient, ItemRecipe, ItemProduct>(productCollection);
    }

    @Override
    public ItemProductCollection getCollection()
    {
        return (ItemProductCollection)delegate.getCollection();
    }

    /**
     * @param ingredient Ingredient. (required)
     * @param ask Ask price.
     * @param bid Bid price.
     * 
     * @return a product.
     */
    public ItemProduct getInstance(final ItemIngredient ingredient, final double ask, final double bid)
    {
        return getInstance(ingredient, ask, bid, null);
    }

    /**
     * @param ingredient Ingredient. (required)
     * @param ask Ask price.
     * @param bid Bid price.
     * @param recipe Recipe. (optional)
     * 
     * @return a product.
     */
    public ItemProduct getInstance(final ItemIngredient ingredient, final double ask, final double bid,
            final ItemRecipe recipe)
    {
        if (ingredient == null)
        {
            throw new IllegalArgumentException("ingredient is null");
        }

        ItemProduct answer = getCollection().findByName(ingredient.getName());

        if (answer == null)
        {
            final ItemProduct product = new ItemProduct(ingredient, ask, bid, recipe);
            answer = product;

            getCollection().add(answer);
        }

        return answer;
    }
}
