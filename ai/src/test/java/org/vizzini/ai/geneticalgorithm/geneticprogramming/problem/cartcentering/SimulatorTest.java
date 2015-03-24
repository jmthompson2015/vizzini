package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.cartcentering;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.MultiplyFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;

/**
 * Provides tests for the <code>Simulator</code> class.
 */
public final class SimulatorTest
{
    /**
     * Test the <code>run()</code> method.
     */
    @Test
    public void runNegativeNegative()
    {
        // Setup.
        final double x0 = -0.75;
        final double v0 = -0.75;
        final TreeNode<Double> treeNode = createTreeNode();
        final Simulator simulator = createSimulator();

        // Run.
        final Double result = simulator.run(x0, v0, treeNode, false);

        // Verify.
        assertThat(Math.round(result * 100.0) / 100.0, is(3.18));
    }

    /**
     * Test the <code>run()</code> method.
     */
    @Test
    public void runNegativeNegative2()
    {
        // Setup.
        final double x0 = -0.75;
        final double v0 = -0.75;
        final TreeNode<Double> treeNode = createTreeNode2();
        final Simulator simulator = createSimulator();

        // Run.
        final Double result = simulator.run(x0, v0, treeNode, false);

        // Verify.
        assertThat(Math.round(result * 100.0) / 100.0, is(3.18));
    }

    /**
     * Test the <code>run()</code> method.
     */
    @Test
    public void runNegativePositive()
    {
        // Setup.
        final double x0 = -0.75;
        final double v0 = 0.75;
        final TreeNode<Double> treeNode = createTreeNode();
        final Simulator simulator = createSimulator();

        // Run.
        final Double result = simulator.run(x0, v0, treeNode, false);

        // Verify.
        assertThat(Math.round(result * 100.0) / 100.0, is(1.62));
    }

    /**
     * Test the <code>run()</code> method.
     */
    @Test
    public void runPositiveNegative()
    {
        // Setup.
        final double x0 = 0.75;
        final double v0 = -0.75;
        final TreeNode<Double> treeNode = createTreeNode();
        final Simulator simulator = createSimulator();

        // Run.
        final Double result = simulator.run(x0, v0, treeNode, false);

        // Verify.
        assertThat(Math.round(result * 100.0) / 100.0, is(1.62));
    }

    /**
     * Test the <code>run()</code> method.
     */
    @Test
    public void runPositivePositive()
    {
        // Setup.
        final double x0 = 0.75;
        final double v0 = 0.75;
        final TreeNode<Double> treeNode = createTreeNode();
        final Simulator simulator = createSimulator();

        // Run.
        final Double result = simulator.run(x0, v0, treeNode, false);

        // Verify.
        assertThat(Math.round(result * 100.0) / 100.0, is(3.18));
    }

    /**
     * @return a new simulator.
     */
    private Simulator createSimulator()
    {
        return new Simulator(0.01, 0.01);
    }

    /**
     * @return a new tree node.
     */
    private TreeNode<Double> createTreeNode()
    {
        final CartCenteringProblem problem = new CartCenteringProblem();

        return problem.getSolution();
    }

    /**
     * @return a new tree node.
     */
    private TreeNode<Double> createTreeNode2()
    {
        final TreeNode<Double> child1 = createTreeNode();
        final Converter<Double> converter = child1.getConverter();
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converter, 2.0);

        return new MultiplyFunction<Double>(converter, child0, child1);
    }
}
