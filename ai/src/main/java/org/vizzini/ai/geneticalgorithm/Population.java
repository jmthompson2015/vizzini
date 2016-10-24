package org.vizzini.ai.geneticalgorithm;

import java.util.List;

/**
 * Defines methods required by a population for a genetic algorithm.
 * 
 * @param <E> Element type.
 */
public interface Population<E> extends List<Genome<E>>
{
    /**
     * @return the average fitness.
     */
    double getAverageFitness();
}
