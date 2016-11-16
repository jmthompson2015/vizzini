package org.vizzini.illyriad;

import java.util.Collection;
import java.util.Iterator;
import java.util.ListIterator;

import org.vizzini.core.Visitor;
import org.vizzini.core.crafting.DefaultProductCollection;
import org.vizzini.core.crafting.Product;
import org.vizzini.core.crafting.ProductCollection;

/**
 * Provides an implementation of a resource product collection.
 */
public final class ResourceProductCollection implements
        ProductCollection<ResourceIngredient, ResourceRecipe, ResourceProduct>
{
    /**
     * Provides a visitor which collects products of a given type.
     */
    private static class TypeVisitor implements Visitor<ResourceProduct>
    {
        /** Resource type. */
        private final ResourceType type;

        /** List of resource products of the given type. */
        private final ResourceProductCollection list = new ResourceProductCollection();

        /**
         * Construct this object.
         * 
         * @param type Resource type.
         */
        @SuppressWarnings("hiding")
        public TypeVisitor(final ResourceType type)
        {
            this.type = type;
        }

        /**
         * @return the list
         */
        public ResourceProductCollection getList()
        {
            return list;
        }

        @Override
        public void visit(final ResourceProduct product)
        {
            if (type == product.getType())
            {
                list.add(product);
            }
        }
    }

    /** Delegate. */
    private final ProductCollection<ResourceIngredient, ResourceRecipe, ResourceProduct> delegate;

    /**
     * Construct this object.
     */
    public ResourceProductCollection()
    {
        delegate = new DefaultProductCollection<ResourceIngredient, ResourceRecipe, ResourceProduct>();
    }

    /**
     * Construct this object.
     * 
     * @param c Initial values.
     */
    public ResourceProductCollection(final Collection<? extends ResourceProduct> c)
    {
        delegate = new DefaultProductCollection<ResourceIngredient, ResourceRecipe, ResourceProduct>(c);
    }

    @Override
    public void accept(final Visitor<ResourceProduct> visitor)
    {
        delegate.accept(visitor);
    }

    @Override
    public void add(final int index, final ResourceProduct product)
    {
        delegate.add(index, product);
    }

    @Override
    public boolean add(final ResourceProduct e)
    {
        return delegate.add(e);
    }

    @Override
    public boolean addAll(final Collection<? extends ResourceProduct> c)
    {
        return delegate.addAll(c);
    }

    @Override
    public boolean addAll(final int index, final Collection<? extends ResourceProduct> c)
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
    public ResourceProduct findById(final long id)
    {
        ResourceProduct answer = null;

        for (final ResourceProduct product : this)
        {
            if (id == product.getId())
            {
                answer = product;
                break;
            }
        }

        return answer;
    }

    @Override
    public ResourceProduct findByName(final String name)
    {
        return delegate.findByName(name);
    }

    /**
     * @param type Type.
     * 
     * @return resources of the given type.
     */
    public ResourceProductCollection findByType(final ResourceType type)
    {
        final TypeVisitor visitor = new TypeVisitor(type);
        accept(visitor);

        return visitor.getList();
    }

    @Override
    public ResourceProduct get(final int index)
    {
        return delegate.get(index);
    }

    @Override
    public double getCost(final Product<ResourceIngredient, ResourceRecipe> product)
    {
        return delegate.getCost(product);
    }

    @Override
    public double getPremium(final Product<ResourceIngredient, ResourceRecipe> product)
    {
        return delegate.getPremium(product);
    }

    @Override
    public double getValue(final Product<ResourceIngredient, ResourceRecipe> product)
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
    public Iterator<ResourceProduct> iterator()
    {
        return delegate.iterator();
    }

    @Override
    public int lastIndexOf(final Object o)
    {
        return delegate.lastIndexOf(o);
    }

    @Override
    public ListIterator<ResourceProduct> listIterator()
    {
        return delegate.listIterator();
    }

    @Override
    public ListIterator<ResourceProduct> listIterator(final int index)
    {
        return delegate.listIterator(index);
    }

    @Override
    public ResourceProduct remove(final int index)
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
    public ResourceProduct set(final int index, final ResourceProduct product)
    {
        return delegate.set(index, product);
    }

    @Override
    public int size()
    {
        return delegate.size();
    }

    @Override
    public ResourceProductCollection subList(final int fromIndex, final int toIndex)
    {
        return new ResourceProductCollection(delegate.subList(fromIndex, toIndex));
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
