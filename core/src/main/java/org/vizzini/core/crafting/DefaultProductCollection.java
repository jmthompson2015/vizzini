package org.vizzini.core.crafting;

import java.util.Collection;

/**
 * Provides a default implementation of a product collection.
 * 
 * @param <I> Ingredient type.
 * @param <R> Recipe type.
 * @param <P> Product type.
 */
public final class DefaultProductCollection<I extends Ingredient, R extends Recipe<I>, P extends Product<I, R>> extends
        DefaultNamedObjectCollection<P> implements ProductCollection<I, R, P>
{
    /**
     * Construct this object.
     */
    public DefaultProductCollection()
    {
        super();
    }

    /**
     * Construct this object.
     * 
     * @param c Initial values.
     */
    public DefaultProductCollection(final Collection<? extends P> c)
    {
        super(c);
    }

    @Override
    public double getCost(final Product<I, R> product0)
    {
        double answer = 0.0;

        final Recipe<I> recipe = product0.getRecipe();

        if (recipe != null)
        {
            final int size = recipe.getComponentCount();

            for (int i = 0; i < size; i++)
            {
                final Component<I> component = recipe.getComponent(i);
                final String name = component.getIngredient().getName();
                final Product<I, R> product = findByName(name);

                if (product == null)
                {
                    throw new RuntimeException("Missing product for name: " + name);
                }

                answer += component.getQuantity() * getValue(product);
            }

            return answer;
        }

        return answer;
    }

    @Override
    public double getPremium(final Product<I, R> product)
    {
        double answer = 0.0;

        final double cost = getCost(product);

        if (cost != 0.0)
        {
            answer = getValue(product) / cost;
        }

        return answer;
    }

    @Override
    public double getValue(final Product<I, R> product)
    {
        double answer = 0;

        final double ask = product.getAsk();
        final double bid = product.getBid();

        if ((bid > 0) && (ask > 0))
        {
            answer = (0.5 * (bid + ask));
        }
        else if ((bid <= 0) && (ask > 0))
        {
            answer = ask;
        }
        else if ((bid > 0) && (ask <= 0))
        {
            answer = bid;
        }
        else
        {
            final Recipe<I> recipe = product.getRecipe();

            if (recipe != null)
            {
                answer = 3.0 * getCost(product);
            }
        }

        return answer;
    }
}
