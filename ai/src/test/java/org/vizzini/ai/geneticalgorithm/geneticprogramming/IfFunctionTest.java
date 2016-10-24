package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>IfFunction</code> class.
 */
public final class IfFunctionTest
{
    /** Converter. */
    private final Converter<Boolean> converterBoolean = new Converter<Boolean>(Boolean.class);

    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /** Converter. */
    private final Converter<Integer> converterInteger = new Converter<Integer>(Integer.class);

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateBoolean()
    {
        // Setup.
        final TreeNode<Boolean> function = createBoolean();
        final Context context = new DefaultContext();

        // Run.
        final Boolean result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertTrue(result);
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDouble()
    {
        // Setup.
        final TreeNode<Double> function = createDouble();
        final Context context = new DefaultContext();

        // Run.
        final Double result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(2.0));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateInteger()
    {
        // Setup.
        final TreeNode<Integer> function = createInteger();
        final Context context = new DefaultContext();

        // Run.
        final Integer result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(2));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateIntegerNoChildren()
    {
        try
        {
            new IfFunction<Integer>(converterInteger, null, null, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
            new IfFunction<Integer>(converterInteger, child0, null, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child1 is null"));
        }

        try
        {
            final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
            final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 1);
            new IfFunction<Integer>(converterInteger, child0, child1, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child2 is null"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final IfFunction<Double> function0 = create0();
        final IfFunction<Double> function1 = create1();
        final IfFunction<Double> function2 = create0();

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
        final IfFunction<Double> function0 = create0();
        final IfFunction<Double> function1 = create1();
        final IfFunction<Double> function2 = create0();

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
        final IfFunction<Double> child0 = create0();

        final String result = child0.toString();

        assertNotNull(result);
        final String expected = "IfFunction[returnType=Double,parent=<null>,symbol=if,children=[ConstantTerminal[returnType=Double,parent=IfFunction,symbol=1.0,value=1.0], ConstantTerminal[returnType=Double,parent=IfFunction,symbol=2.0,value=2.0], ConstantTerminal[returnType=Double,parent=IfFunction,symbol=3.0,value=3.0]]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree function.
     */
    private IfFunction<Double> create0()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
        final TreeNode<Double> child1 = new ConstantTerminal<Double>(converterDouble, 2.0);
        final TreeNode<Double> child2 = new ConstantTerminal<Double>(converterDouble, 3.0);

        return new IfFunction<Double>(converterDouble, child0, child1, child2);
    }

    /**
     * @return a new tree function.
     */
    private IfFunction<Double> create1()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 10.0);
        final TreeNode<Double> child1 = new ConstantTerminal<Double>(converterDouble, 9.0);
        final TreeNode<Double> child2 = new ConstantTerminal<Double>(converterDouble, 8.0);

        return new IfFunction<Double>(converterDouble, child0, child1, child2);
    }

    /**
     * @return a new function.
     */
    private TreeNode<Boolean> createBoolean()
    {
        final TreeNode<Boolean> child1 = new ConstantTerminal<Boolean>(converterBoolean, true);
        final TreeNode<Boolean> child2 = new ConstantTerminal<Boolean>(converterBoolean, true);
        final TreeNode<Boolean> child3 = new ConstantTerminal<Boolean>(converterBoolean, false);

        return new IfFunction<Boolean>(converterBoolean, child1, child2, child3);
    }

    /**
     * @return a new function.
     */
    private TreeNode<Double> createDouble()
    {
        final TreeNode<Double> child1 = new ConstantTerminal<Double>(converterDouble, 1.0);
        final TreeNode<Double> child2 = new ConstantTerminal<Double>(converterDouble, 2.0);
        final TreeNode<Double> child3 = new ConstantTerminal<Double>(converterDouble, 3.0);

        return new IfFunction<Double>(converterDouble, child1, child2, child3);
    }

    /**
     * @return a new function.
     */
    private TreeNode<Integer> createInteger()
    {
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 1);
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child3 = new ConstantTerminal<Integer>(converterInteger, 3);

        return new IfFunction<Integer>(converterInteger, child1, child2, child3);
    }
}
