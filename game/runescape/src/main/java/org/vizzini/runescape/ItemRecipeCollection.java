package org.vizzini.runescape;

import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import org.vizzini.core.Visitor;
import org.vizzini.core.crafting.DefaultRecipeCollection;
import org.vizzini.core.crafting.RecipeCollection;

/**
 * Provides an implementation of an item recipe collection.
 */
public final class ItemRecipeCollection implements RecipeCollection<ItemIngredient, ItemRecipe>
{
    /** Delegate. */
    private final RecipeCollection<ItemIngredient, ItemRecipe> delegate;

    /**
     * Construct this object.
     */
    public ItemRecipeCollection()
    {
        delegate = new DefaultRecipeCollection<ItemIngredient, ItemRecipe>();
    }

    @Override
    public void accept(final Visitor<ItemRecipe> visitor)
    {
        delegate.accept(visitor);
    }

    @Override
    public void add(final int index, final ItemRecipe element)
    {
        delegate.add(index, element);
    }

    @Override
    public boolean add(final ItemRecipe e)
    {
        return delegate.add(e);
    }

    @Override
    public boolean addAll(final Collection<? extends ItemRecipe> c)
    {
        return delegate.addAll(c);
    }

    @Override
    public boolean addAll(final int index, final Collection<? extends ItemRecipe> c)
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
    public ItemRecipe findByName(final String name)
    {
        return delegate.findByName(name);
    }

    @Override
    public ItemRecipe get(final int index)
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
    public boolean isUseful(final ItemIngredient ingredient)
    {
        return delegate.isUseful(ingredient);
    }

    @Override
    public boolean isUseless(final ItemIngredient ingredient)
    {
        return delegate.isUseless(ingredient);
    }

    @Override
    public Iterator<ItemRecipe> iterator()
    {
        return delegate.iterator();
    }

    @Override
    public int lastIndexOf(final Object o)
    {
        return delegate.lastIndexOf(o);
    }

    @Override
    public ListIterator<ItemRecipe> listIterator()
    {
        return delegate.listIterator();
    }

    @Override
    public ListIterator<ItemRecipe> listIterator(final int index)
    {
        return delegate.listIterator(index);
    }

    @Override
    public ItemRecipe remove(final int index)
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
    public ItemRecipe set(final int index, final ItemRecipe element)
    {
        return delegate.set(index, element);
    }

    @Override
    public int size()
    {
        return delegate.size();
    }

    @Override
    public List<ItemRecipe> subList(final int fromIndex, final int toIndex)
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

    @Override
    public RecipeCollection<ItemIngredient, ItemRecipe> whichUse(final ItemIngredient ingredient)
    {
        return delegate.whichUse(ingredient);
    }
}
