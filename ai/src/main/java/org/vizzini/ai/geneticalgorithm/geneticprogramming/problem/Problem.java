package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem;

import java.util.Set;

import org.vizzini.ai.geneticalgorithm.Genome;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Function;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;
import org.vizzini.core.Factory;

/**
 * Defines methods required by a genetic programming problem.
 * 
 * @param <T> Type.
 */
public interface Problem<T>
{
    /**
     * @return the best tree node found by a genetic algorithm.
     */
    Genome<TreeNode<T>> determineBest();

    /**
     * @return the set of function exemplars.
     */
    Set<Function<T>> getFunctionExemplars();

    /**
     * @return the known solution to the problem, if any.
     */
    TreeNode<T> getSolution();

    /**
     * @return the set of terminal factories.
     */
    Set<Factory<Terminal<T>>> getTerminalFactories();
}
