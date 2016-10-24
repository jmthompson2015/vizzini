package org.vizzini.illyriad;

import org.vizzini.core.crafting.DefaultProductRegistry;
import org.vizzini.core.crafting.ProductCollection;
import org.vizzini.core.crafting.ProductRegistry;

/**
 * Provides an implementation of a resource product registry.
 */
public final class ResourceProductRegistry implements
        ProductRegistry<ResourceIngredient, ResourceRecipe, ResourceProduct>
{
    /** Delegate. */
    private final ProductRegistry<ResourceIngredient, ResourceRecipe, ResourceProduct> delegate;

    /**
     * Construct this object.
     */
    public ResourceProductRegistry()
    {
        delegate = new DefaultProductRegistry<ResourceIngredient, ResourceRecipe, ResourceProduct>(
                new ResourceProductCollection());
    }

    /**
     * Construct this object.
     * 
     * @param productCollection Product collection.
     */
    public ResourceProductRegistry(
            final ProductCollection<ResourceIngredient, ResourceRecipe, ResourceProduct> productCollection)
    {
        delegate = new DefaultProductRegistry<ResourceIngredient, ResourceRecipe, ResourceProduct>(productCollection);
    }

    @Override
    public ResourceProductCollection getCollection()
    {
        return (ResourceProductCollection)delegate.getCollection();
    }

    /**
     * @param ingredient Ingredient. (required)
     * @param ask Ask price.
     * @param bid Bid price.
     * 
     * @return a product.
     */
    public ResourceProduct getInstance(final ResourceIngredient ingredient, final double ask, final double bid)
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
    public ResourceProduct getInstance(final ResourceIngredient ingredient, final double ask, final double bid,
            final ResourceRecipe recipe)
    {
        if (ingredient == null)
        {
            throw new IllegalArgumentException("ingredient is null");
        }

        ResourceProduct answer = getCollection().findByName(ingredient.getName());

        if (answer == null)
        {
            final ResourceProduct product = new ResourceProduct(ingredient, ask, bid, recipe);
            answer = product;

            getCollection().add(answer);
        }

        return answer;
    }
}
