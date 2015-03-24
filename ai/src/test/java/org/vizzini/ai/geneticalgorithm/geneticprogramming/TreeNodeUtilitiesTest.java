package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>TreeNodeUtilities</code> class.
 */
public final class TreeNodeUtilitiesTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /**
     * Test the <code>copyAndReplaceNode()</code> method.
     */
    @Test
    public void copyAndReplaceNode()
    {
        // Setup.
        final DefaultFunction<Double> function = create0();
        final int index = 2;
        final TreeNode<Double> replacementNode = new VariableTerminal<Double>(converterDouble, "r");
        final TreeNodeUtilities<Double> treeNodeUtils = new TreeNodeUtilities<Double>();

        // Run.
        final Function<Double> result = treeNodeUtils.copyAndReplaceNode(function, index, replacementNode);

        // Verify.
        assertNotNull(result);
        assertFalse(function.equals(result));
        assertThat(result, instanceOf(DefaultFunction.class));
        assertThat(result.getChildAt(0), instanceOf(ConstantTerminal.class));
        assertThat(result.getChildAt(1), instanceOf(VariableTerminal.class));
        assertThat(result.getChildAt(2), instanceOf(ConstantTerminal.class));
    }

    /**
     * Test the <code>copyAndReplaceNode()</code> method.
     */
    @Test
    public void copyAndReplaceNodeDepth3()
    {
        // Setup.
        final List<TreeNode<Double>> children = new ArrayList<TreeNode<Double>>();
        children.add(create0());
        children.add(create1());
        final DefaultFunction<Double> function = new DefaultFunction<Double>(converterDouble, "E", 2, children);
        final int index = 3;
        final TreeNode<Double> replacementNode = new VariableTerminal<Double>(converterDouble, "r");
        final TreeNodeUtilities<Double> treeNodeUtils = new TreeNodeUtilities<Double>();

        // Run.
        final Function<Double> result = treeNodeUtils.copyAndReplaceNode(function, index, replacementNode);

        // Verify.
        assertNotNull(result);
        assertFalse(function.equals(result));
        assertThat(result, instanceOf(DefaultFunction.class));
        assertThat(result.getChildAt(0), instanceOf(DefaultFunction.class));

        final Function<Double> function0 = (Function<Double>)result.getChildAt(0);
        assertThat(function0.getChildAt(0), instanceOf(ConstantTerminal.class));
        assertThat(function0.getChildAt(1), instanceOf(VariableTerminal.class));
        assertThat(function0.getChildAt(2), instanceOf(ConstantTerminal.class));

        assertThat(result.getChildAt(1), instanceOf(DefaultFunction.class));
        final Function<Double> function1 = (Function<Double>)result.getChildAt(1);
        assertThat(function1.getChildAt(0), instanceOf(ConstantTerminal.class));
        assertThat(function1.getChildAt(1), instanceOf(ConstantTerminal.class));
        assertThat(function1.getChildAt(2), instanceOf(ConstantTerminal.class));
    }

    /**
     * Test the <code>copyAndReplaceNode()</code> method.
     */
    @Test
    public void copyAndReplaceNodeOutOfBounds()
    {
        // Setup.
        final DefaultFunction<Double> function = create0();
        final TreeNode<Double> replacementNode = new VariableTerminal<Double>(converterDouble, "r");
        final TreeNodeUtilities<Double> treeNodeUtils = new TreeNodeUtilities<Double>();

        // Run.
        try
        {
            treeNodeUtils.copyAndReplaceNode(function, 0, replacementNode);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Error: can't replace parent node (index = 0)"));
        }

        // Run.
        try
        {
            treeNodeUtils.copyAndReplaceNode(function, 4, replacementNode);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("index = 4 out of bounds (0,4)"));
        }
    }

    /**
     * @return a new tree function.
     */
    private DefaultFunction<Double> create0()
    {
        final String symbol = "+";
        final List<TreeNode<Double>> children = new ArrayList<TreeNode<Double>>();
        children.add(new ConstantTerminal<Double>(converterDouble, 1.0));
        children.add(new ConstantTerminal<Double>(converterDouble, 2.0));
        children.add(new ConstantTerminal<Double>(converterDouble, 3.0));

        return new DefaultFunction<Double>(converterDouble, symbol, 3, children);
    }

    /**
     * @return a new tree function.
     */
    private DefaultFunction<Double> create1()
    {
        final String symbol = "*";
        final List<TreeNode<Double>> children = new ArrayList<TreeNode<Double>>();
        children.add(new ConstantTerminal<Double>(converterDouble, 10.0));
        children.add(new ConstantTerminal<Double>(converterDouble, 9.0));
        children.add(new ConstantTerminal<Double>(converterDouble, 8.0));

        return new DefaultFunction<Double>(converterDouble, symbol, 3, children);
    }
}
