package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;

/**
 * Provides tests for the <code>Simulator</code> class.
 */
public final class SimulatorTest
{
    /** Converter. */
    private final Converter<Integer> converter = new Converter<Integer>(Integer.class);

    /**
     * Test the <code>run()</code> method.
     */
    @Test
    public void runMove()
    {
        // Setup.
        final TreeNode<Integer> function = new MoveTerminal(converter);
        final Simulator simulator = new Simulator();

        // Run.
        final int result = simulator.run(function);

        // Verify.
        assertThat(result, is(3));
    }

    /**
     * Test the <code>run()</code> method.
     */
    @Test
    public void runSolution()
    {
        // Setup.
        final ArtificialAntProblem problem = new ArtificialAntProblem();
        final TreeNode<Integer> solution = problem.getSolution();
        final Simulator simulator = new Simulator();

        // Run.
        final int result = simulator.run(solution);

        // Verify.
        assertThat(result, is(89));
    }
}
