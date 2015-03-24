package org.vizzini.ai.geneticalgorithm;

/**
 * Defines methods required by a mutation operator.
 * 
 * @param <E> Element type.
 */
public interface MutationOperator<E>
{
    /**
     * @param genome Genome.
     * 
     * @return a new, mutated genome.
     */
    Genome<E> mutate(Genome<E> genome);
}
