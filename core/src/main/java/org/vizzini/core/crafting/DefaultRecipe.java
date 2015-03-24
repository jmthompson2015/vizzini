package org.vizzini.core.crafting;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.Visitor;

/**
 * Provides a default implementation of a recipe.
 * 
 * @param <I> Ingredient type.
 */
public final class DefaultRecipe<I extends Ingredient> implements Recipe<I>
{
    /** Components. */
    private final List<Component<I>> components;

    /** Name. */
    private final String name;

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * @param components Components. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultRecipe(final String name, final Component<I>... components)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        if (components.length == 0)
        {
            throw new IllegalArgumentException("components is empty");
        }

        this.name = name;
        this.components = new ArrayList<Component<I>>();

        for (int i = 0; i < components.length; i++)
        {
            final Component<I> component = components[i];

            if (component == null)
            {
                throw new IllegalArgumentException("components[" + i + "] is null");
            }

            this.components.add(component);
        }
    }

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * @param components Components. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultRecipe(final String name, final List<Component<I>> components)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        if (components == null)
        {
            throw new IllegalArgumentException("components is null");
        }

        if (components.isEmpty())
        {
            throw new IllegalArgumentException("components is empty");
        }

        this.name = name;
        this.components = new ArrayList<Component<I>>(components);
    }

    @Override
    public void accept(final Visitor<Recipe<I>> visitor)
    {
        if (visitor == null)
        {
            throw new IllegalArgumentException("visitor is null");
        }

        visitor.visit(this);
    }

    @Override
    public int compareTo(final Recipe<I> another)
    {
        return getName().compareTo(another.getName());
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
            final DefaultRecipe<I> another = (DefaultRecipe<I>)object;

            answer = getName().equals(another.getName());

            if (answer)
            {
                answer = components.equals(another.components);
            }
        }

        return answer;
    }

    @Override
    public Component<I> getComponent(final int index)
    {
        return components.get(index);
    }

    @Override
    public int getComponentCount()
    {
        return components.size();
    }

    @Override
    public String getComponentsString()
    {
        String answer = null;

        if (!components.isEmpty())
        {
            final int size = components.size();
            final StringBuilder sb = new StringBuilder();

            for (int i = 0; i < size; i++)
            {
                final Component<I> component = components.get(i);
                final double quantity = component.getQuantity();
                final Ingredient ingredient = component.getIngredient();

                sb.append(quantity);
                sb.append(" ");
                sb.append(ingredient.getName());

                if (i < (size - 1))
                {
                    sb.append(", ");
                }
            }

            answer = sb.toString();
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
        int answer = 0;

        final int[] primes = { 2, 3, };
        int i = 0;

        answer += primes[i++] * getName().hashCode();
        answer += primes[i++] * components.hashCode();

        return answer;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append(getClass().getName());
        sb.append(" [");
        sb.append("name=").append(getName());
        sb.append(",components=").append(components);
        sb.append("]");

        return sb.toString();
    }
}
