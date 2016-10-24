package org.vizzini.ai.geneticalgorithm;

/**
 * Defines methods required by a genome factory.
 * 
 * @param <E> Element type.
 */
public interface GenomeFactory<E>
{
    /**
     * @return a new, random genome.
     */
    Genome<E> create();
}
