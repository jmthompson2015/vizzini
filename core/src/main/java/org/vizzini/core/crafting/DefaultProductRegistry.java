package org.vizzini.core.crafting;

/**
 * Provides a class to manage products.
 * 
 * @param <I> Ingredient type.
 * @param <R> Recipe type.
 * @param <P> Product type.
 */
public final class DefaultProductRegistry<I extends Ingredient, R extends Recipe<I>, P extends Product<I, R>> implements
        ProductRegistry<I, R, P>
{
    /** Ingredient collection. */
    private final ProductCollection<I, R, P> productCollection;

    /**
     * Construct this object.
     * 
     * @param productCollection Product collection.
     */
    @SuppressWarnings("hiding")
    public DefaultProductRegistry(final ProductCollection<I, R, P> productCollection)
    {
        if (productCollection == null)
        {
            throw new IllegalArgumentException("productCollection is null");
        }

        this.productCollection = productCollection;
    }

    @Override
    public ProductCollection<I, R, P> getCollection()
    {
        return productCollection;
    }

    /**
     * @param ingredient Ingredient. (required)
     * @param ask Ask price.
     * @param bid Bid price.
     * 
     * @return a product.
     */
    public P getInstance(final I ingredient, final double ask, final double bid)
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
    public P getInstance(final I ingredient, final double ask, final double bid, final R recipe)
    {
        if (ingredient == null)
        {
            throw new IllegalArgumentException("ingredient is null");
        }

        P answer = productCollection.findByName(ingredient.getName());

        if (answer == null)
        {
            @SuppressWarnings("unchecked")
            final P product = (P)(new DefaultProduct<I, R>(ingredient, ask, bid, recipe));
            answer = product;

            productCollection.add(answer);
        }

        return answer;
    }
}
