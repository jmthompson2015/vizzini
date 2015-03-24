package org.vizzini.core.crafting;

/**
 * Provides a default implementation of a component.
 * 
 * @param <I> Ingredient type.
 */
public final class DefaultComponent<I extends Ingredient> implements Component<I>
{
    /** Ingredient. */
    private final I ingredient;

    /** Quantity. */
    private final double quantity;

    /**
     * Construct this object.
     * 
     * @param quantity Quantity.
     * @param ingredient Ingredient. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultComponent(final double quantity, final I ingredient)
    {
        if (ingredient == null)
        {
            throw new IllegalArgumentException("ingredient is null");
        }

        this.quantity = quantity;
        this.ingredient = ingredient;
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
            @SuppressWarnings("unchecked")
            final DefaultComponent<I> another = (DefaultComponent<I>)object;

            answer = getQuantity() == another.getQuantity();

            if (answer)
            {
                answer = ingredient.equals(another.ingredient);
            }
        }

        return answer;
    }

    @Override
    public I getIngredient()
    {
        return ingredient;
    }

    @Override
    public double getQuantity()
    {
        return quantity;
    }

    @Override
    public int hashCode()
    {
        int answer = 0;

        final int[] primes = { 2, 3, };
        int i = 0;

        answer += primes[i++] * getQuantity();
        answer += primes[i++] * getIngredient().hashCode();

        return answer;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append(getClass().getName());
        sb.append(" [");
        sb.append("quantity=").append(quantity);
        sb.append(",ingredient=").append(ingredient);
        sb.append("]");

        return sb.toString();
    }
}
