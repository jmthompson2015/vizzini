package org.vizzini.illyriad;

import org.vizzini.core.Visitor;
import org.vizzini.core.crafting.DefaultProduct;
import org.vizzini.core.crafting.Product;

/**
 * Provides an implementation of a resource product.
 */
public final class ResourceProduct implements Product<ResourceIngredient, ResourceRecipe>
{
    /** Delegate. */
    private Product<ResourceIngredient, ResourceRecipe> delegate;

    /**
     * Construct this object.
     * 
     * @param ingredient Ingredient. (required)
     * @param ask Ask price.
     * @param bid Bid price.
     */
    public ResourceProduct(final ResourceIngredient ingredient, final double ask, final double bid)
    {
        delegate = new DefaultProduct<ResourceIngredient, ResourceRecipe>(ingredient, ask, bid);
    }

    /**
     * Construct this object.
     * 
     * @param ingredient Ingredient. (required)
     * @param ask Ask price.
     * @param bid Bid price.
     * @param recipe Recipe. (optional)
     */
    public ResourceProduct(final ResourceIngredient ingredient, final double ask, final double bid,
            final ResourceRecipe recipe)
    {
        delegate = new DefaultProduct<ResourceIngredient, ResourceRecipe>(ingredient, ask, bid, recipe);
    }

    @Override
    public void accept(final Visitor<Product<ResourceIngredient, ResourceRecipe>> visitor)
    {
        delegate.accept(visitor);
    }

    @Override
    public int compareTo(final Product<ResourceIngredient, ResourceRecipe> o)
    {
        return delegate.compareTo(o);
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }
        else
        {
            final ResourceProduct another = (ResourceProduct)object;

            answer = getIngredient().equals(another.getIngredient());

            if (answer)
            {
                answer = getAsk() == another.getAsk();

                if (answer)
                {
                    answer = getBid() == another.getBid();

                    if (answer && (getRecipe() != null))
                    {
                        answer = getRecipe().equals(another.getRecipe());
                    }
                }
            }
        }

        return answer;
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

    /**
     * @return the id
     */
    public long getId()
    {
        return getIngredient().getId();
    }

    @Override
    public ResourceIngredient getIngredient()
    {
        return delegate.getIngredient();
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public ResourceRecipe getRecipe()
    {
        return delegate.getRecipe();
    }

    /**
     * @return the type
     */
    public ResourceType getType()
    {
        return getIngredient().getType();
    }

    @Override
    public int hashCode()
    {
        int answer = 0;

        final int[] primes = { 2, 3, 5, 7, };
        int i = 0;

        answer += primes[i++] * getIngredient().hashCode();
        answer += primes[i++] * getAsk();
        answer += primes[i++] * getBid();

        if (getRecipe() != null)
        {
            answer += primes[i++] * getRecipe().hashCode();
        }

        return answer;
    }

    @Override
    public boolean isCrafted()
    {
        return delegate.isCrafted();
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append(getClass().getName());
        sb.append(" [");
        sb.append("ingredient=").append(getIngredient());
        sb.append(",ask=").append(getAsk());
        sb.append(",bid=").append(getBid());

        if (getRecipe() != null)
        {
            sb.append(",recipe=").append(getRecipe());
        }

        sb.append("]");

        return sb.toString();
    }
}
