package org.vizzini.ai.geneticalgorithm;

import org.vizzini.core.Copyable;

/**
 * Defines methods required by a genome.
 * 
 * @param <E> Element type.
 */
public interface Genome<E> extends Copyable<Genome<E>>
{
    /**
     * @param value Value.
     * 
     * @return true if this collection changed as a result of the call.
     */
    boolean add(E value);

    /**
     * @param index Index.
     * 
     * @return the gene at the given index.
     */
    E get(final int index);

    /**
     * @return the fitness
     */
    double getFitness();

    /**
     * @return the length
     */
    int length();

    /**
     * @param fitness the fitness to set
     */
    void setFitness(double fitness);
}
