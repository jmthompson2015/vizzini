package org.vizzini.illyriad;

import org.vizzini.core.Visitor;
import org.vizzini.core.crafting.DefaultIngredient;
import org.vizzini.core.crafting.Ingredient;

/**
 * Provides an implementation of a resource ingredient.
 */
public final class ResourceIngredient implements Ingredient
{
    /** Delegate. */
    private final DefaultIngredient delegate;

    /** ID. */
    private final long id;

    /** Resource type. */
    private final ResourceType type;

    /**
     * Construct this object.
     * 
     * @param id ID.
     * @param name Name. (required)
     * @param type Type. (required)
     */
    @SuppressWarnings("hiding")
    public ResourceIngredient(final long id, final String name, final ResourceType type)
    {
        this.id = id;
        delegate = new DefaultIngredient(name);
        this.type = type;
    }

    @Override
    public void accept(final Visitor<Ingredient> visitor)
    {
        delegate.accept(visitor);
    }

    @Override
    public int compareTo(final Ingredient another)
    {
        return delegate.compareTo(another);
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
            final ResourceIngredient another = (ResourceIngredient)object;

            answer = getName().equals(another.getName());

            if (answer)
            {
                answer = getType() == another.getType();

                if (answer)
                {
                    answer = getId() == another.getId();
                }
            }
        }

        return answer;
    }

    /**
     * @return the id
     */
    public long getId()
    {
        return id;
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    /**
     * @return the type
     */
    public ResourceType getType()
    {
        return type;
    }

    @Override
    public int hashCode()
    {
        int answer = 0;

        final int[] primes = { 2, 3, 5, };
        int i = 0;

        answer += primes[i++] * getId();
        answer += primes[i++] * getName().hashCode();
        answer += primes[i++] * getType().hashCode();

        return answer;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append(getClass().getName());
        sb.append(" [");
        sb.append("id=").append(getId());
        sb.append(",name=").append(getName());
        sb.append(",type=").append(getType());
        sb.append("]");

        return sb.toString();
    }
}
