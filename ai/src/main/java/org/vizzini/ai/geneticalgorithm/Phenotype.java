package org.vizzini.ai.geneticalgorithm;

/**
 * Defines methods required by a phenotype. A phenome results from the expression of a genome.
 * 
 * @param <E> Genome element type.
 * @param <P> Phenome type.
 */
public interface Phenotype<E, P>
{
    /**
     * @return the genome.
     */
    Genome<E> getGenome();

    /**
     * @return the phenome.
     */
    P getPhenome();
}
