package org.vizzini.ai.geneticalgorithm;

/**
 * Defines methods required by a crossover operator.
 * 
 * @param <E> Element type.
 */
public interface CrossoverOperator<E>
{
    /**
     * @param genome1 First genome.
     * @param genome2 Second genome.
     * 
     * @return a new genome created by crossover of the given parameters.
     */
    Genome<E> crossover(Genome<E> genome1, Genome<E> genome2);
}
