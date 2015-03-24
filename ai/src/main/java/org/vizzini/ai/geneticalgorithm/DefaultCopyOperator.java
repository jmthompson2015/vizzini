package org.vizzini.ai.geneticalgorithm;

/**
 * Provides a default implementation of a copy operator.
 * 
 * @param <E> Element type.
 */
public final class DefaultCopyOperator<E> implements CopyOperator<E>
{
    @Override
    public Genome<E> copy(final Genome<E> genome)
    {
        return genome.copy();
    }
}
