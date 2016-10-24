package org.vizzini.core.crafting;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.Visitor;

/**
 * Provides a default implementation of an ingredient.
 */
public final class DefaultIngredient implements Ingredient
{
    /** Name. */
    private final String name;

    /**
     * @param name Name. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultIngredient(final String name)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        this.name = name;
    }

    @Override
    public void accept(final Visitor<Ingredient> visitor)
    {
        if (visitor == null)
        {
            throw new IllegalArgumentException("visitor is null");
        }

        visitor.visit(this);
    }

    @Override
    public int compareTo(final Ingredient another)
    {
        return name.compareTo(another.getName());
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
            final DefaultIngredient another = (DefaultIngredient)object;

            answer = name.equals(another.name);
        }

        return answer;
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public int hashCode()
    {
        return getName().hashCode();
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append(getClass().getName());
        sb.append(" [");
        sb.append("name=").append(getName());
        sb.append("]");

        return sb.toString();
    }
}
