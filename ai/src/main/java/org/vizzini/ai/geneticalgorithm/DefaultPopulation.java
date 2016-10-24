package org.vizzini.ai.geneticalgorithm;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

/**
 * Provides a default implementation of a population.
 * 
 * @param <E> Element type.
 */
public final class DefaultPopulation<E> implements Population<E>
{
    /** Population. */
    private final List<Genome<E>> list;

    /**
     * Construct this object.
     */
    public DefaultPopulation()
    {
        list = new ArrayList<Genome<E>>();
    }

    /**
     * Construct this object.
     * 
     * @param popSize Population size.
     */
    public DefaultPopulation(final int popSize)
    {
        list = new ArrayList<Genome<E>>(popSize);
    }

    @Override
    public boolean add(final Genome<E> e)
    {
        return list.add(e);
    }

    @Override
    public void add(final int index, final Genome<E> element)
    {
        list.add(index, element);
    }

    @Override
    public boolean addAll(final Collection<? extends Genome<E>> c)
    {
        return list.addAll(c);
    }

    @Override
    public boolean addAll(final int index, final Collection<? extends Genome<E>> c)
    {
        return list.addAll(index, c);
    }

    @Override
    public void clear()
    {
        list.clear();
    }

    @Override
    public boolean contains(final Object o)
    {
        return list.contains(o);
    }

    @Override
    public boolean containsAll(final Collection<?> c)
    {
        return list.containsAll(c);
    }

    @Override
    public boolean equals(final Object o)
    {
        return list.equals(o);
    }

    @Override
    public Genome<E> get(final int index)
    {
        return list.get(index);
    }

    @Override
    public double getAverageFitness()
    {
        double sum = 0.0;

        for (final Genome<E> genome : list)
        {
            sum += genome.getFitness();
        }

        return sum / list.size();
    }

    @Override
    public int hashCode()
    {
        return list.hashCode();
    }

    @Override
    public int indexOf(final Object o)
    {
        return list.indexOf(o);
    }

    @Override
    public boolean isEmpty()
    {
        return list.isEmpty();
    }

    @Override
    public Iterator<Genome<E>> iterator()
    {
        return list.iterator();
    }

    @Override
    public int lastIndexOf(final Object o)
    {
        return list.lastIndexOf(o);
    }

    @Override
    public ListIterator<Genome<E>> listIterator()
    {
        return list.listIterator();
    }

    @Override
    public ListIterator<Genome<E>> listIterator(final int index)
    {
        return list.listIterator(index);
    }

    @Override
    public Genome<E> remove(final int index)
    {
        return list.remove(index);
    }

    @Override
    public boolean remove(final Object o)
    {
        return list.remove(o);
    }

    @Override
    public boolean removeAll(final Collection<?> c)
    {
        return list.removeAll(c);
    }

    @Override
    public boolean retainAll(final Collection<?> c)
    {
        return list.retainAll(c);
    }

    @Override
    public Genome<E> set(final int index, final Genome<E> element)
    {
        return list.set(index, element);
    }

    @Override
    public int size()
    {
        return list.size();
    }

    @Override
    public List<Genome<E>> subList(final int fromIndex, final int toIndex)
    {
        return list.subList(fromIndex, toIndex);
    }

    @Override
    public Object[] toArray()
    {
        return list.toArray();
    }

    @Override
    public <T> T[] toArray(final T[] a)
    {
        return list.toArray(a);
    }
}
