package org.vizzini.runescape;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import org.vizzini.core.Visitor;
import org.vizzini.core.crafting.DefaultIngredientCollection;
import org.vizzini.core.crafting.IngredientCollection;

/**
 * Provides an implementation of an item ingredient collection.
 */
public final class ItemIngredientCollection implements IngredientCollection<ItemIngredient>
{
    /** Delegate. */
    private final IngredientCollection<ItemIngredient> delegate;

    /**
     * Construct this object.
     */
    public ItemIngredientCollection()
    {
        delegate = new DefaultIngredientCollection<ItemIngredient>();
    }

    @Override
    public void accept(final Visitor<ItemIngredient> visitor)
    {
        delegate.accept(visitor);
    }

    @Override
    public void add(final int index, final ItemIngredient element)
    {
        delegate.add(index, element);
    }

    @Override
    public boolean add(final ItemIngredient e)
    {
        return delegate.add(e);
    }

    @Override
    public boolean addAll(final Collection<? extends ItemIngredient> c)
    {
        return delegate.addAll(c);
    }

    @Override
    public boolean addAll(final int index, final Collection<? extends ItemIngredient> c)
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

    @Override
    public ItemIngredient findByName(final String name)
    {
        return delegate.findByName(name);
    }

    @Override
    public ItemIngredient get(final int index)
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
    public Iterator<ItemIngredient> iterator()
    {
        return delegate.iterator();
    }

    @Override
    public int lastIndexOf(final Object o)
    {
        return delegate.lastIndexOf(o);
    }

    @Override
    public ListIterator<ItemIngredient> listIterator()
    {
        return delegate.listIterator();
    }

    @Override
    public ListIterator<ItemIngredient> listIterator(final int index)
    {
        return delegate.listIterator(index);
    }

    @Override
    public ItemIngredient remove(final int index)
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
    public ItemIngredient set(final int index, final ItemIngredient element)
    {
        return delegate.set(index, element);
    }

    @Override
    public int size()
    {
        return delegate.size();
    }

    @Override
    public List<ItemIngredient> subList(final int fromIndex, final int toIndex)
    {
        return delegate.subList(fromIndex, toIndex);
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
