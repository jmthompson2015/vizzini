package org.vizzini.illyriad;

import java.util.List;

import org.vizzini.core.Visitor;
import org.vizzini.core.crafting.Component;
import org.vizzini.core.crafting.DefaultRecipe;
import org.vizzini.core.crafting.Recipe;

/**
 * Provides an implementation of a resource recipe.
 */
public final class ResourceRecipe implements Recipe<ResourceIngredient>
{
    /** Delegate. */
    private final Recipe<ResourceIngredient> delegate;

    /** ID. */
    private final long id;

    /**
     * Construct this object.
     * 
     * @param id ID.
     * @param name Name. (required)
     * @param components Components. (required)
     */
    @SuppressWarnings("hiding")
    public ResourceRecipe(final long id, final String name, final List<Component<ResourceIngredient>> components)
    {
        this.id = id;
        delegate = new DefaultRecipe<ResourceIngredient>(name, components);
    }

    @Override
    public void accept(final Visitor<Recipe<ResourceIngredient>> visitor)
    {
        delegate.accept(visitor);
    }

    @Override
    public int compareTo(final Recipe<ResourceIngredient> o)
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
            final ResourceRecipe another = (ResourceRecipe)object;

            answer = getName().equals(another.getName());

            if (answer)
            {
                answer = getId() == another.getId();
            }
        }

        return answer;
    }

    @Override
    public Component<ResourceIngredient> getComponent(final int index)
    {
        return delegate.getComponent(index);
    }

    @Override
    public int getComponentCount()
    {
        return delegate.getComponentCount();
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
        return id;
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public int hashCode()
    {
        int answer = 0;

        final int[] primes = { 2, 3, };
        int i = 0;

        answer += primes[i++] * getId();
        answer += primes[i++] * getName().hashCode();

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
        sb.append(",components=[");

        for (int i = 0; i < getComponentCount(); i++)
        {
            final Component<ResourceIngredient> component = getComponent(i);
            sb.append(component);

            if (i < (getComponentCount() - 1))
            {
                sb.append(",");
            }
        }

        sb.append("]]");

        return sb.toString();
    }
}
