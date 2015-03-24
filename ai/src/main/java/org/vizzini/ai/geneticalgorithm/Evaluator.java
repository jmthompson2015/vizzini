package org.vizzini.ai.geneticalgorithm;

/**
 * Defines methods required by an evaluator.
 * 
 * @param <E> Element type.
 */
public interface Evaluator<E>
{
    /**
     * @param population Population.
     */
    void evaluate(Population<E> population);

    /**
     * @return the ideal evaluation, used as a stopping condition.
     */
    double idealEvaluation();

    /**
     * @return a flag indicating whether the genetic algorithm is maximizing or minimizing.
     */
    boolean isMaximizing();
}
