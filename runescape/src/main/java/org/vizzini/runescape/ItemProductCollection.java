package org.vizzini.runescape;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import org.vizzini.core.Visitor;
import org.vizzini.core.crafting.DefaultProductCollection;
import org.vizzini.core.crafting.Product;
import org.vizzini.core.crafting.ProductCollection;

/**
 * Provides an implementation of an item product collection.
 */
public final class ItemProductCollection implements ProductCollection<ItemIngredient, ItemRecipe, ItemProduct>
{
    /** Delegate. */
    private final ProductCollection<ItemIngredient, ItemRecipe, ItemProduct> delegate;

    /**
     * Construct this object.
     */
    public ItemProductCollection()
    {
        delegate = new DefaultProductCollection<ItemIngredient, ItemRecipe, ItemProduct>();
    }

    @Override
    public void accept(final Visitor<ItemProduct> visitor)
    {
        delegate.accept(visitor);
    }

    @Override
    public void add(final int index, final ItemProduct element)
    {
        delegate.add(index, element);
    }

    @Override
    public boolean add(final ItemProduct e)
    {
        return delegate.add(e);
    }

    @Override
    public boolean addAll(final Collection<? extends ItemProduct> c)
    {
        return delegate.addAll(c);
    }

    @Override
    public boolean addAll(final int index, final Collection<? extends ItemProduct> c)
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
    public ItemProduct findByName(final String name)
    {
        return delegate.findByName(name);
    }

    @Override
    public ItemProduct get(final int index)
    {
        return delegate.get(index);
    }

    @Override
    public double getCost(final Product<ItemIngredient, ItemRecipe> product)
    {
        return delegate.getCost(product);
    }

    @Override
    public double getPremium(final Product<ItemIngredient, ItemRecipe> product)
    {
        return delegate.getPremium(product);
    }

    @Override
    public double getValue(final Product<ItemIngredient, ItemRecipe> product)
    {
        return delegate.getValue(product);
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
    public Iterator<ItemProduct> iterator()
    {
        return delegate.iterator();
    }

    @Override
    public int lastIndexOf(final Object o)
    {
        return delegate.lastIndexOf(o);
    }

    @Override
    public ListIterator<ItemProduct> listIterator()
    {
        return delegate.listIterator();
    }

    @Override
    public ListIterator<ItemProduct> listIterator(final int index)
    {
        return delegate.listIterator(index);
    }

    @Override
    public ItemProduct remove(final int index)
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
    public ItemProduct set(final int index, final ItemProduct element)
    {
        return delegate.set(index, element);
    }

    @Override
    public int size()
    {
        return delegate.size();
    }

    @Override
    public List<ItemProduct> subList(final int fromIndex, final int toIndex)
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
