package org.vizzini.ai.geneticalgorithm;

/**
 * Defines methods required by a genetic algorithm.
 * 
 * @param <E> Element type.
 */
public interface GeneticAlgorithm<E>
{
    /**
     * @param listener Listener.
     * 
     * @return this object.
     */
    GeneticAlgorithm<E> addGenerationListener(final GenerationListener listener);

    /**
     * @return the best genome.
     */
    Genome<E> determineBest();

    /**
     * @return copyOperator
     */
    CopyOperator<E> getCopyOperator();

    /**
     * @return crossoverOperator
     */
    CrossoverOperator<E> getCrossoverOperator();

    /**
     * @return genomeFactory
     */
    GenomeFactory<E> getGenomeFactory();

    /**
     * @return mutationOperator
     */
    MutationOperator<E> getMutationOperator();

    /**
     * @return selectionOperator
     */
    SelectionOperator<E> getSelectionOperator();

    /**
     * @param listener Listener.
     * 
     * @return this object.
     */
    GeneticAlgorithm<E> removeGenerationListener(final GenerationListener listener);
}
