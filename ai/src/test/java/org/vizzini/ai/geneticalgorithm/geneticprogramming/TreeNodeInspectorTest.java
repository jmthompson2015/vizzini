package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>TreeNodeInspector</code> class.
 */
public final class TreeNodeInspectorTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /**
     * Test the <code>getNode()</code> method.
     */
    @Test
    public void getNode()
    {
        // Setup.
        final TreeNode<Double> function = create();
        final TreeNodeInspector<Double> visitor = new TreeNodeInspector<Double>();
        // System.out.println("function = " + function);

        // Run.
        function.accept(visitor);

        final List<Integer> constantIndices = Arrays.asList(new Integer[] { 2, 8, 11, });
        final List<Integer> variableIndices = Arrays.asList(new Integer[] { 4, 5, 9, 13, });

        for (int i = 0; i < visitor.getNodeCount(); i++)
        {
            final TreeNode<Double> result = visitor.getNode(i);

            // Verify.
            assertNotNull(result);

            if (constantIndices.contains(i))
            {
                assertThat(i + " " + result.getClass().getName(), result, instanceOf(ConstantTerminal.class));
            }
            else if (variableIndices.contains(i))
            {
                assertThat(i + " " + result.getClass().getName(), result, instanceOf(VariableTerminal.class));
            }
            else if ((i == 0) || (i == 6) || (i == 10))
            {
                assertThat(i + " " + result.getClass().getName(), result, instanceOf(AddFunction.class));
            }
            else if ((i == 1) || (i == 3) || (i == 7))
            {
                assertThat(i + " " + result.getClass().getName(), result, instanceOf(MultiplyFunction.class));
            }
            else if (i == 12)
            {
                assertThat(i + " " + result.getClass().getName(), result, instanceOf(SineFunction.class));
            }
            else
            {
                throw new RuntimeException("missed check for i = " + i);
            }
        }
    }

    /**
     * Test the <code>getNodeCount()</code> method.
     */
    @Test
    public void getNodeCount()
    {
        // Setup.
        final TreeNode<Double> function = create();
        final TreeNodeInspector<Double> visitor = new TreeNodeInspector<Double>();
        // System.out.println("function = " + function);

        // Run.
        function.accept(visitor);
        final int result = visitor.getNodeCount();

        // Verify.
        assertThat(result, is(14));
    }

    /**
     * Test the <code>indexOf()</code> method.
     */
    @Test
    public void indexOf()
    {
        // Setup.
        final TreeNode<Double> function = create();
        final TreeNodeInspector<Double> visitor = new TreeNodeInspector<Double>();
        // System.out.println("function =\n" + TreeVisitor.toDescription(function));

        // Run.
        function.accept(visitor);

        for (int i = 0; i < visitor.getNodeCount(); i++)
        {
            final int result = visitor.indexOf(visitor.getNode(i));

            // Verify.
            if ((i == 5) || (i == 9) || (i == 13))
            {
                // All the variable x functions are equal.
                assertThat(String.valueOf(i), result, is(4));
            }
            else
            {
                assertThat(String.valueOf(i), result, is(i));
            }
        }
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

        // Add them.
        final Function<Double> function3 = new AddFunction<Double>(converterDouble, node5, function2);
        final Function<Double> function4 = new AddFunction<Double>(converterDouble, function1, function3);

        return new AddFunction<Double>(converterDouble, function0, function4);
    }
}
