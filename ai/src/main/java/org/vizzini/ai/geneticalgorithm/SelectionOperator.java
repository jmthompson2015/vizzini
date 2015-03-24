package org.vizzini.ai.geneticalgorithm;

/**
 * Defines methods required by a selection operator.
 * 
 * @param <E> Element type.
 */
public interface SelectionOperator<E>
{
    /**
     * @param population Population. (assumed sorted)
     * 
     * @return a genome selected from the given parameter.
     */
    Genome<E> select(Population<E> population);
}
