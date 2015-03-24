package org.vizzini.core.crafting;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.SortedMap;
import java.util.SortedSet;
import java.util.TreeMap;
import java.util.TreeSet;

import org.vizzini.core.NamedObject;
import org.vizzini.core.Visitor;

/**
 * Provides a default implementation of a named object collection. This assumes the names are unique.
 * 
 * @param <E> Element type.
 */
class DefaultNamedObjectCollection<E extends NamedObject> implements NamedObjectCollection<E>
{
    /** Map of name to element. */
    private final SortedMap<String, E> nameToElement = new TreeMap<String, E>();

    /** Values. */
    private final SortedSet<E> values = new TreeSet<E>();

    /**
     * Construct this object.
     */
    public DefaultNamedObjectCollection()
    {
        // Nothing to do.
    }

    /**
     * Construct this object.
     * 
     * @param c Initial values.
     */
    public DefaultNamedObjectCollection(final Collection<? extends E> c)
    {
        addAll(c);
    }

    @Override
    public void accept(final Visitor<E> visitor)
    {
        if (visitor == null)
        {
            throw new IllegalArgumentException("visitor is null");
        }

        for (final E e : values)
        {
            visitor.visit(e);
        }
    }

    @Override
    public boolean add(final E e)
    {
        nameToElement.put(e.getName(), e);

        return values.add(e);
    }

    @Override
    public void add(final int index, final E element)
    {
        throw new RuntimeException("method not supported");
    }

    @Override
    public boolean addAll(final Collection<? extends E> c)
    {
        for (final E e : c)
        {
            nameToElement.put(e.getName(), e);
        }

        return values.addAll(c);
    }

    @Override
    public boolean addAll(final int index, final Collection<? extends E> c)
    {
        throw new RuntimeException("method not supported");
    }

    @Override
    public void clear()
    {
        throw new RuntimeException("method not supported");
    }

    @Override
    public boolean contains(final Object o)
    {
        return values.contains(o);
    }

    @Override
    public boolean containsAll(final Collection<?> c)
    {
        return values.containsAll(c);
    }

    @Override
    public E findByName(final String name)
    {
        return nameToElement.get(name);
    }

    @Override
    public E get(final int index)
    {
        return values().get(index);
    }

    @Override
    public int indexOf(final Object o)
    {
        return values().indexOf(o);
    }

    @Override
    public boolean isEmpty()
    {
        return values.isEmpty();
    }

    @Override
    public Iterator<E> iterator()
    {
        return values.iterator();
    }

    @Override
    public int lastIndexOf(final Object o)
    {
        return values().lastIndexOf(o);
    }

    @Override
    public ListIterator<E> listIterator()
    {
        return values().listIterator();
    }

    @Override
    public ListIterator<E> listIterator(final int index)
    {
        return values().listIterator(index);
    }

    @Override
    public E remove(final int index)
    {
        throw new RuntimeException("method not supported");
    }

    @Override
    public boolean remove(final Object o)
    {
        throw new RuntimeException("method not supported");
    }

    @Override
    public boolean removeAll(final Collection<?> c)
    {
        throw new RuntimeException("method not supported");
    }

    @Override
    public boolean retainAll(final Collection<?> c)
    {
        throw new RuntimeException("method not supported");
    }

    @Override
    public E set(final int index, final E element)
    {
        throw new RuntimeException("method not supported");
    }

    @Override
    public int size()
    {
        return values.size();
    }

    @Override
    public NamedObjectCollection<E> subList(final int fromIndex, final int toIndex)
    {
        final List<E> subList = values().subList(fromIndex, toIndex);

        return new DefaultNamedObjectCollection<E>(subList);
    }

    @Override
    public Object[] toArray()
    {
        return values.toArray();
    }

    @Override
    public <T> T[] toArray(final T[] a)
    {
        return values.toArray(a);
    }

    /**
     * @return a new list.
     */
    private List<E> values()
    {
        return new ArrayList<E>(values);
    }
}
