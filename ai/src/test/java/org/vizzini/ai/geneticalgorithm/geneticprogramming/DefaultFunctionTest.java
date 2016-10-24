package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultFunction</code> class.
 */
public final class DefaultFunctionTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /**
     * Test the <code>copy()</code> method.
     */
    @Test
    public void copyWithChildren()
    {
        // Setup.
        final DefaultFunction<Double> function = create0();
        final List<TreeNode<Double>> newChildren = new ArrayList<TreeNode<Double>>();
        newChildren.add(function.getChildAt(0));
        newChildren.add(new VariableTerminal<Double>(converterDouble, "r"));
        newChildren.add(function.getChildAt(2));

        // Run.
        final Function<Double> result = function.withChildren(newChildren);

        // Verify.
        assertNotNull(result);
        // System.out.println("function = " + function);
        // System.out.println("result = " + result);
        assertFalse(function.equals(result));
        assertThat(result, instanceOf(DefaultFunction.class));
        assertThat(result.getSymbol(), is(function.getSymbol()));
        assertThat(result.getChildAt(0), instanceOf(ConstantTerminal.class));
        assertThat(result.getChildAt(1), instanceOf(VariableTerminal.class));
        assertThat(result.getChildAt(2), instanceOf(ConstantTerminal.class));
    }

    /**
     * Test the <code>getMaxChildCount()</code> method.
     */
    @Test
    public void getMaxChildCount()
    {
        // Setup.
        final DefaultFunction<Double> function = create0();

        // Run.
        final int result = function.getArity();

        // Verify.
        assertThat(result, is(3));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final DefaultFunction<Double> function0 = create0();
        final DefaultFunction<Double> function1 = create1();
        final DefaultFunction<Double> function2 = create0();

        assertTrue(function0.equals(function0));
        assertFalse(function0.equals(function1));
        assertTrue(function0.equals(function2));

        assertFalse(function1.equals(function0));
        assertTrue(function1.equals(function1));
        assertFalse(function1.equals(function2));

        assertTrue(function2.equals(function0));
        assertFalse(function2.equals(function1));
        assertTrue(function2.equals(function2));

        assertFalse(function0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final DefaultFunction<Double> function0 = create0();
        final DefaultFunction<Double> function1 = create1();
        final DefaultFunction<Double> function2 = create0();

        assertTrue(function0.hashCode() == function0.hashCode());
        assertFalse(function0.hashCode() == function1.hashCode());
        assertTrue(function0.hashCode() == function2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final DefaultFunction<Double> node0 = create0();

        final String result = node0.toString();

        assertNotNull(result);
        final String expected = "DefaultFunction[returnType=Double,parent=<null>,symbol=+,children=[ConstantTerminal[returnType=Double,parent=DefaultFunction,symbol=1.0,value=1.0], ConstantTerminal[returnType=Double,parent=DefaultFunction,symbol=2.0,value=2.0], ConstantTerminal[returnType=Double,parent=DefaultFunction,symbol=3.0,value=3.0]]]";
        assertThat(result, is(expected));
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
