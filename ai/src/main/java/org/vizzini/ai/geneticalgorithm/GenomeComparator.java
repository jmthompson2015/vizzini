package org.vizzini.ai.geneticalgorithm;

import java.util.Comparator;

/**
 * Provides a genome comparator.
 * 
 * @param <E> Element type.
 */
public final class GenomeComparator<E> implements Comparator<Genome<E>>
{
    /** Flag indicating if this comparator is maximizing or minimizing. */
    private final boolean isMaximizing;

    /**
     * Construct this object.
     */
    public GenomeComparator()
    {
        this(true);
    }

    /**
     * Construct this object.
     * 
     * @param isMaximizing Flag indicating if this comparator is maximizing or minimizing.
     */
    @SuppressWarnings("hiding")
    public GenomeComparator(final boolean isMaximizing)
    {
        this.isMaximizing = isMaximizing;
    }

    @Override
    public int compare(final Genome<E> genome1, final Genome<E> genome2)
    {
        final Double fitness1 = genome1.getFitness();
        final Double fitness2 = genome2.getFitness();

        int answer = fitness2.compareTo(fitness1);

        if (answer == 0)
        {
            answer = genome1.toString().compareTo(genome2.toString());
        }

        if (!isMaximizing)
        {
            answer = -answer;
        }

        return answer;
    }
}
