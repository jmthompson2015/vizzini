package org.vizzini.ai.geneticalgorithm;

import java.util.ArrayList;
import java.util.List;

/**
 * Provides a list implementation of a genome.
 * 
 * @param <E> Element type.
 */
public final class ListGenome<E> implements Genome<E>
{
    /** Fitness. */
    private double fitness;

    /** Length. */
    private final int length;

    /** Array of values. */
    private final List<E> list;

    /**
     * Construct this object.
     * 
     * @param length Genome length.
     */
    @SuppressWarnings("hiding")
    public ListGenome(final int length)
    {
        this.length = length;
        list = new ArrayList<E>(length);
    }

    @Override
    public boolean add(final E value)
    {
        if (list.size() >= length)
        {
            throw new IndexOutOfBoundsException("add() called on a full list.");
        }

        return list.add(value);
    }

    /**
     * @param list List.
     * 
     * @return true if this list changed as a result of the call.
     */
    @SuppressWarnings("hiding")
    public boolean addAll(final List<E> list)
    {
        return this.list.addAll(list);
    }

    @Override
    public Genome<E> copy()
    {
        final ListGenome<E> answer = new ListGenome<E>(this.length);

        answer.fitness = this.fitness;
        answer.list.addAll(this.list);

        return answer;
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
            final ListGenome<E> another = (ListGenome<E>)object;

            answer = length == another.length;

            if (answer)
            {
                answer = list.equals(another.list);
            }
        }

        return answer;
    }

    @Override
    public E get(final int index)
    {
        rangeCheck(index);

        return list.get(index);
    }

    @Override
    public double getFitness()
    {
        return fitness;
    }

    /**
     * @return a new list containing the genes.
     */
    public List<E> getList()
    {
        final List<E> answer = new ArrayList<E>();

        for (int i = 0; i < length; i++)
        {
            answer.add(get(i));
        }

        return answer;
    }

    @Override
    public int hashCode()
    {
        int answer = 0;

        final int[] primes = { 2, 3, };
        int i = 0;

        answer += primes[i++] * length;
        answer += primes[i++] * list.hashCode();

        return answer;
    }

    @Override
    public int length()
    {
        return length;
    }

    @SuppressWarnings("hiding")
    @Override
    public void setFitness(final double fitness)
    {
        this.fitness = fitness;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length(); i++)
        {
            sb.append(get(i)).append(" ");
        }

        sb.append("fitness = ").append(getFitness());

        return sb.toString();
    }

    /**
     * @param index Index.
     */
    private void rangeCheck(final int index)
    {
        if ((index < 0) || (length < index))
        {
            throw new IllegalArgumentException("Index out of range [0, " + length + "): " + index);
        }
    }
}
