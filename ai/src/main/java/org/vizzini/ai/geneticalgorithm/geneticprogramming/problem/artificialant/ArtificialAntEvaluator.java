package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import org.vizzini.ai.geneticalgorithm.Evaluator;
import org.vizzini.ai.geneticalgorithm.Genome;
import org.vizzini.ai.geneticalgorithm.Population;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;

/**
 * Provides an evaluator for this problem.
 */
final class ArtificialAntEvaluator implements Evaluator<TreeNode<Integer>>
{
    @Override
    public void evaluate(final Population<TreeNode<Integer>> population)
    {
        final Simulator simulator = new Simulator();

        for (final Genome<TreeNode<Integer>> genome : population)
        {
            final TreeNode<Integer> treeNode = genome.get(0);
            final double fitness = simulator.run(treeNode);
            genome.setFitness(fitness);
        }
    }

    @Override
    public double idealEvaluation()
    {
        return 89;
    }

    @Override
    public boolean isMaximizing()
    {
        return true;
    }
}
