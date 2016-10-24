package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.cartcentering;

import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.vizzini.ai.geneticalgorithm.Evaluator;
import org.vizzini.ai.geneticalgorithm.Genome;
import org.vizzini.ai.geneticalgorithm.Population;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNodeInspector;

/**
 * Provides an evaluator for the cart centering problem.
 */
final class CartCenteringEvaluator implements Evaluator<TreeNode<Double>>
{
    /** Fitness cases. */
    private final List<FitnessCase> fitnessCases;

    /** V threshold. */
    private final double vThreshold;

    /** X threshold. */
    private final double xThreshold;

    /**
     * Construct this object.
     * 
     * @param fitnessCases Fitness cases.
     * @param xThreshold X threshold.
     * @param vThreshold V threshold.
     */
    @SuppressWarnings("hiding")
    public CartCenteringEvaluator(final List<FitnessCase> fitnessCases, final double xThreshold, final double vThreshold)
    {
        if (CollectionUtils.isEmpty(fitnessCases))
        {
            throw new IllegalArgumentException("fitnessCases is null or empty");
        }

        this.fitnessCases = fitnessCases;
        this.xThreshold = xThreshold;
        this.vThreshold = vThreshold;
    }

    @Override
    public void evaluate(final Population<TreeNode<Double>> population)
    {
        final Simulator simulator = new Simulator(xThreshold, vThreshold);

        for (final Genome<TreeNode<Double>> genome : population)
        {
            final TreeNode<Double> treeNode = genome.get(0);
            double fitness = 0.0;

            for (final FitnessCase fitnessCase : fitnessCases)
            {
                final double x0 = fitnessCase.getX0();
                final double v0 = fitnessCase.getV0();
                fitness += simulator.run(x0, v0, treeNode, false);
            }

            // Penalize long answers.
            fitness *= 100.0;
            final TreeNodeInspector<Double> inspector = new TreeNodeInspector<Double>();
            treeNode.accept(inspector);
            fitness += inspector.getNodeCount();

            genome.setFitness(fitness);
        }
    }

    @Override
    public double idealEvaluation()
    {
        return 0.0;
    }

    @Override
    public boolean isMaximizing()
    {
        return false;
    }
}
