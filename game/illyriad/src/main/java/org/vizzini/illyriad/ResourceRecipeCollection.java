package org.vizzini.illyriad;

import java.util.Collection;
import java.util.Iterator;
import java.util.ListIterator;

import org.vizzini.core.Visitor;
import org.vizzini.core.crafting.DefaultRecipeCollection;
import org.vizzini.core.crafting.RecipeCollection;

/**
 * Provides an implementation of a resource recipe collection.
 */
public final class ResourceRecipeCollection implements RecipeCollection<ResourceIngredient, ResourceRecipe>
{
    /** Delegate. */
    private final RecipeCollection<ResourceIngredient, ResourceRecipe> delegate;

    /**
     * Construct this object.
     */
    public ResourceRecipeCollection()
    {
        delegate = new DefaultRecipeCollection<ResourceIngredient, ResourceRecipe>();
    }

    /**
     * Construct this object.
     * 
     * @param c Initial values.
     */
    public ResourceRecipeCollection(final Collection<? extends ResourceRecipe> c)
    {
        delegate = new DefaultRecipeCollection<ResourceIngredient, ResourceRecipe>(c);
    }

    @Override
    public void accept(final Visitor<ResourceRecipe> visitor)
    {
        delegate.accept(visitor);
    }

    @Override
    public void add(final int index, final ResourceRecipe element)
    {
        delegate.add(index, element);
    }

    @Override
    public boolean add(final ResourceRecipe e)
    {
        return delegate.add(e);
    }

    @Override
    public boolean addAll(final Collection<? extends ResourceRecipe> c)
    {
        return delegate.addAll(c);
    }

    @Override
    public boolean addAll(final int index, final Collection<? extends ResourceRecipe> c)
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
    public ResourceRecipe findById(final long id)
    {
        ResourceRecipe answer = null;

        for (final ResourceRecipe recipe : this)
        {
            if (id == recipe.getId())
            {
                answer = recipe;
                break;
            }
        }

        return answer;
    }

    @Override
    public ResourceRecipe findByName(final String name)
    {
        return delegate.findByName(name);
    }

    @Override
    public ResourceRecipe get(final int index)
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
    public boolean isUseful(final ResourceIngredient ingredient)
    {
        return delegate.isUseful(ingredient);
    }

    @Override
    public boolean isUseless(final ResourceIngredient ingredient)
    {
        return delegate.isUseless(ingredient);
    }

    @Override
    public Iterator<ResourceRecipe> iterator()
    {
        return delegate.iterator();
    }

    @Override
    public int lastIndexOf(final Object o)
    {
        return delegate.lastIndexOf(o);
    }

    @Override
    public ListIterator<ResourceRecipe> listIterator()
    {
        return delegate.listIterator();
    }

    @Override
    public ListIterator<ResourceRecipe> listIterator(final int index)
    {
        return delegate.listIterator(index);
    }

    @Override
    public ResourceRecipe remove(final int index)
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
    public ResourceRecipe set(final int index, final ResourceRecipe element)
    {
        return delegate.set(index, element);
    }

    @Override
    public int size()
    {
        return delegate.size();
    }

    @Override
    public ResourceRecipeCollection subList(final int fromIndex, final int toIndex)
    {
        return new ResourceRecipeCollection(delegate.subList(fromIndex, toIndex));
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
    public ResourceRecipeCollection whichUse(final ResourceIngredient ingredient)
    {
        return new ResourceRecipeCollection(delegate.whichUse(ingredient));
    }
}
