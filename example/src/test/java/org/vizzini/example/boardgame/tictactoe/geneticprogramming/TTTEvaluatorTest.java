package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import java.util.Collections;

import org.junit.Test;
import org.vizzini.ai.geneticalgorithm.Genome;
import org.vizzini.ai.geneticalgorithm.GenomeComparator;
import org.vizzini.ai.geneticalgorithm.Population;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;

/**
 * Provides tests for the <code>TTTEvaluator</code> class.
 */
public final class TTTEvaluatorTest
{
    /** Problem. */
    private final TTTProblem problem = new TTTProblem();

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate()
    {
        // Setup.
        final Population<TreeNode<Integer>> population = problem.createPopulation(10);
        final TTTEvaluator evaluator = new TTTEvaluator();

        // Run.
        evaluator.evaluate(population);

        // Verify.
        Collections.sort(population, new GenomeComparator<TreeNode<Integer>>(evaluator.isMaximizing()));

        for (int i = 0; i < population.size(); i++)
        {
            final Genome<TreeNode<Integer>> genome = population.get(i);
            System.out.println(i + " " + genome.getFitness());
        }
    }
}
