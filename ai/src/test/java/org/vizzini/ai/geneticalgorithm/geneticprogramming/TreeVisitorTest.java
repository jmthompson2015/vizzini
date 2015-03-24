package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>TreeVisitor</code> class.
 */
public final class TreeVisitorTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate2()
    {
        // Setup.
        final TreeNode<Double> function = create();
        final TreeVisitor<Double> visitor = new TreeVisitor<Double>();

        // Run.
        function.accept(visitor);
        final String result = visitor.getDescription();

        // Verify.
        assertNotNull(result);
        final String expected = "0: + AddFunction\n  1: * MultiplyFunction\n    2: 2.0 ConstantTerminal\n    3: * MultiplyFunction\n      4: x VariableTerminal\n      5: x VariableTerminal\n  6: + AddFunction\n    7: * MultiplyFunction\n      8: 3.0 ConstantTerminal\n      9: x VariableTerminal\n    10: + AddFunction\n      11: 4.0 ConstantTerminal\n      12: + AddFunction\n        13: sin SineFunction\n          14: x VariableTerminal\n        15: put PutVariableFunction\n          16: 5.0 ConstantTerminal\n";
        // System.out.println("expected =\n" + expected);
        // System.out.println("result   =\n" + result);
        assertThat(result, is(expected));
    }

    /**
     * @return a new quadratic equation.
     */
    private TreeNode<Double> create()
    {
        // a * x^2
        final TreeNode<Double> node0 = new ConstantTerminal<Double>(converterDouble, 2.0);
        final TreeNode<Double> node1 = new VariableTerminal<Double>(converterDouble, "x");
        final TreeNode<Double> node2 = new VariableTerminal<Double>(converterDouble, "x");
        final Function<Double> function00 = new MultiplyFunction<Double>(converterDouble, node1, node2);
        final Function<Double> function0 = new MultiplyFunction<Double>(converterDouble, node0, function00);

        // b * x
        final TreeNode<Double> node3 = new ConstantTerminal<Double>(converterDouble, 3.0);
        final TreeNode<Double> node4 = new VariableTerminal<Double>(converterDouble, "x");
        final Function<Double> function1 = new MultiplyFunction<Double>(converterDouble, node3, node4);

        // c
        final TreeNode<Double> node5 = new ConstantTerminal<Double>(converterDouble, 4.0);

        // sin(x)
        final TreeNode<Double> node6 = new VariableTerminal<Double>(converterDouble, "x");
        final TreeNode<Double> function2 = new SineFunction<Double>(converterDouble, node6);

        // put(x)
        final TreeNode<Double> node7 = new ConstantTerminal<Double>(converterDouble, 5.0);
        final TreeNode<Double> function3 = new PutVariableFunction<Double>(converterDouble, "x", node7);

        // Add them.
        final List<TreeNode<Double>> children2 = new ArrayList<TreeNode<Double>>();
        children2.add(function0);
        children2.add(function1);
        children2.add(node5);
        children2.add(function2);
        children2.add(function3);

        final Function<Double> function4 = new AddFunction<Double>(converterDouble, function2, function3);
        final Function<Double> function5 = new AddFunction<Double>(converterDouble, node5, function4);
        final Function<Double> function6 = new AddFunction<Double>(converterDouble, function1, function5);
        final Function<Double> function = new AddFunction<Double>(converterDouble, function0, function6);

        return function;
    }
}
