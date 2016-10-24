package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.cartcentering;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.ai.geneticalgorithm.DefaultPopulation;
import org.vizzini.ai.geneticalgorithm.Evaluator;
import org.vizzini.ai.geneticalgorithm.Genome;
import org.vizzini.ai.geneticalgorithm.ListGenome;
import org.vizzini.ai.geneticalgorithm.Population;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;

/**
 * Provides tests for the <code>CartCenteringEvaluator</code> class.
 */
public final class CartCenteringEvaluatorTest
{
    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate()
    {
        // Setup.
        final List<FitnessCase> fitnessCases = createFitnessCases();
        final Evaluator<TreeNode<Double>> evaluator = new CartCenteringEvaluator(fitnessCases, 0.01, 0.01);
        final Population<TreeNode<Double>> population = createPopulation();

        // Run.
        evaluator.evaluate(population);

        // Verify.
        final Genome<TreeNode<Double>> genome = population.get(0);
        assertThat(Math.round(genome.getFitness() * 100.0) / 100.0, is(648.0));
    }

    /**
     * Test the <code>idealEvaluation()</code> method.
     */
    @Test
    public void idealEvaluation()
    {
        // Setup.
        final List<FitnessCase> fitnessCases = createFitnessCases();
        final Evaluator<TreeNode<Double>> evaluator = new CartCenteringEvaluator(fitnessCases, 0.01, 0.01);

        // Run.
        final double result = evaluator.idealEvaluation();

        // Verify.
        assertThat(result, is(0.0));
    }

    /**
     * Test the <code>idealEvaluation()</code> method.
     */
    @Test
    public void isMaximizing()
    {
        // Setup.
        final List<FitnessCase> fitnessCases = createFitnessCases();
        final Evaluator<TreeNode<Double>> evaluator = new CartCenteringEvaluator(fitnessCases, 0.01, 0.01);

        // Run.
        final boolean result = evaluator.isMaximizing();

        // Verify.
        assertFalse(result);
    }

    /**
     * Test the <code>CartCenteringEvaluator()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        // Setup.
        final double xThreshold = 0.01;
        final double vThreshold = 0.01;

        try
        {
            new CartCenteringEvaluator(null, xThreshold, vThreshold);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("fitnessCases is null or empty"));
        }

        try
        {
            new CartCenteringEvaluator(new ArrayList<FitnessCase>(), xThreshold, vThreshold);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("fitnessCases is null or empty"));
        }
    }

    /**
     * @return a new list of fitness cases.
     */
    private List<FitnessCase> createFitnessCases()
    {
        final List<FitnessCase> answer = new ArrayList<FitnessCase>();

        answer.add(new FitnessCase(-0.75, -0.75));
        answer.add(new FitnessCase(0.0, 0.0));
        answer.add(new FitnessCase(0.75, 0.75));

        return answer;
    }

    /**
     * @return a new population.
     */
    private Population<TreeNode<Double>> createPopulation()
    {
        final Population<TreeNode<Double>> answer = new DefaultPopulation<TreeNode<Double>>();

        final CartCenteringProblem problem = new CartCenteringProblem();
        final Genome<TreeNode<Double>> genome = new ListGenome<TreeNode<Double>>(1);
        genome.add(problem.getSolution());
        answer.add(genome);

        return answer;
    }
}
