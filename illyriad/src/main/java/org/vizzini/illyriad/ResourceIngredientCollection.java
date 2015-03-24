package org.vizzini.illyriad;

import java.util.Collection;
import java.util.Iterator;
import java.util.ListIterator;

import org.vizzini.core.Visitor;
import org.vizzini.core.crafting.DefaultIngredientCollection;
import org.vizzini.core.crafting.IngredientCollection;

/**
 * Provides an implementation of a resource ingredient collection.
 */
public final class ResourceIngredientCollection implements IngredientCollection<ResourceIngredient>
{
    /** Delegate. */
    private final IngredientCollection<ResourceIngredient> delegate;

    /**
     * Construct this object.
     */
    public ResourceIngredientCollection()
    {
        delegate = new DefaultIngredientCollection<ResourceIngredient>();
    }

    /**
     * Construct this object.
     * 
     * @param c Initial values.
     */
    public ResourceIngredientCollection(final Collection<? extends ResourceIngredient> c)
    {
        delegate = new DefaultIngredientCollection<ResourceIngredient>(c);
    }

    @Override
    public void accept(final Visitor<ResourceIngredient> visitor)
    {
        delegate.accept(visitor);
    }

    @Override
    public void add(final int index, final ResourceIngredient element)
    {
        delegate.add(index, element);
    }

    @Override
    public boolean add(final ResourceIngredient e)
    {
        return delegate.add(e);
    }

    @Override
    public boolean addAll(final Collection<? extends ResourceIngredient> c)
    {
        return delegate.addAll(c);
    }

    @Override
    public boolean addAll(final int index, final Collection<? extends ResourceIngredient> c)
    {
        return delegate.addAll(index, c);
    }

    @Override
    public void clear()
    {
        delegate.clear();
    }

    @Override
    public boolean contains(final Object o)
    {
        return delegate.contains(o);
    }

    @Override
    public boolean containsAll(final Collection<?> c)
    {
        return delegate.containsAll(c);
    }

    /**
     * @param id ID.
     * 
     * @return the ingredient with the given ID.
     */
    public ResourceIngredient findById(final long id)
    {
        ResourceIngredient answer = null;

        for (final ResourceIngredient ingredient : this)
        {
            if (id == ingredient.getId())
            {
                answer = ingredient;
                break;
            }
        }

        return answer;
    }

    @Override
    public ResourceIngredient findByName(final String name)
    {
        return delegate.findByName(name);
    }

    @Override
    public ResourceIngredient get(final int index)
    {
        return delegate.get(index);
    }

    @Override
    public int indexOf(final Object o)
    {
        return delegate.indexOf(o);
    }

    @Override
    public boolean isEmpty()
    {
        return delegate.isEmpty();
    }

    @Override
    public Iterator<ResourceIngredient> iterator()
    {
        return delegate.iterator();
    }

    @Override
    public int lastIndexOf(final Object o)
    {
        return delegate.lastIndexOf(o);
    }

    @Override
    public ListIterator<ResourceIngredient> listIterator()
    {
        return delegate.listIterator();
    }

    @Override
    public ListIterator<ResourceIngredient> listIterator(final int index)
    {
        return delegate.listIterator(index);
    }

    @Override
    public ResourceIngredient remove(final int index)
    {
        return delegate.remove(index);
    }

    @Override
    public boolean remove(final Object o)
    {
        return delegate.remove(o);
    }

    @Override
    public boolean removeAll(final Collection<?> c)
    {
        return delegate.removeAll(c);
    }

    @Override
    public boolean retainAll(final Collection<?> c)
    {
        return delegate.retainAll(c);
    }

    @Override
    public ResourceIngredient set(final int index, final ResourceIngredient element)
    {
        return delegate.set(index, element);
    }

    @Override
    public int size()
    {
        return delegate.size();
    }

    @Override
    public ResourceIngredientCollection subList(final int fromIndex, final int toIndex)
    {
        return new ResourceIngredientCollection(delegate.subList(fromIndex, toIndex));
    }

    @Override
    public Object[] toArray()
    {
        return delegate.toArray();
    }

    @Override
    public <T> T[] toArray(final T[] a)
    {
        return delegate.toArray(a);
    }
}
