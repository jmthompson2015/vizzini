package org.vizzini.ai.geneticalgorithm;

import java.util.Map.Entry;

/**
 * Defines methods required by an evaluated population.
 * 
 * @param <E> Element type.
 */
public interface EvaluatedPopulation<E>
{
    /**
     * @return an entry with the least key, or null if this map is empty.
     */
    Entry<E, Double> bestEntry();

    /**
     * @param genome Genome.
     * 
     * @return the value to which the specified key is mapped, or null if this map contains no mapping for the key.
     */
    Double get(final E genome);

    /**
     * Associates the specified value with the specified key in this map.
     * 
     * @param genome Genome.
     * @param eval Evaluation.
     */
    void put(final E genome, final Double eval);
}
