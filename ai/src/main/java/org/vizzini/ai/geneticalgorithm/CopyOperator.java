package org.vizzini.ai.geneticalgorithm;

/**
 * Defines methods required by a copy operator.
 * 
 * @param <E> Element type.
 */
public interface CopyOperator<E>
{
    /**
     * @param genome Genome.
     * 
     * @return a new copy of the given parameter.
     */
    Genome<E> copy(Genome<E> genome);
}
