package org.vizzini.core.crafting;

/**
 * Defines methods required by a product collection.
 * 
 * @param <I> Ingredient type.
 * @param <R> Recipe type.
 * @param <P> Product type.
 */
public interface ProductCollection<I extends Ingredient, R extends Recipe<I>, P extends Product<I, R>> extends
        NamedObjectCollection<P>
{
    /**
     * @param product Product.
     * 
     * @return the cost
     */
    double getCost(Product<I, R> product);

    /**
     * @param product Product.
     * 
     * @return the premium
     */
    double getPremium(final Product<I, R> product);

    /**
     * @param product Product.
     * 
     * @return the value
     */
    double getValue(final Product<I, R> product);
}
