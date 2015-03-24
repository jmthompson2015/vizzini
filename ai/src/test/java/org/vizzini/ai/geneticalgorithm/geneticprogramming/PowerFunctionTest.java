package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>PowerFunction</code> class.
 */
public final class PowerFunctionTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /** Converter. */
    private final Converter<Integer> converterInteger = new Converter<Integer>(Integer.class);

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
        assertThat(result, is(8.0));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDoubleNoChildren()
    {
        try
        {
            new PowerFunction<Double>(converterDouble, null, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
            new PowerFunction<Double>(converterDouble, child0, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child1 is null"));
        }
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
        assertThat(result, is(8));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateIntegerNoChildren()
    {
        try
        {
            new PowerFunction<Integer>(converterInteger, null, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
            new PowerFunction<Integer>(converterInteger, child0, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child1 is null"));
        }
    }

    /**
     * Test the <code>getReturnType()</code> method.
     */
    @Test
    public void getReturnTypeDouble()
    {
        // Setup.
        final PowerFunction<Double> function = createDouble();

        // Run.
        final Class<?> result = function.getReturnType();

        // Verify.
        assertNotNull(result);
        assertTrue(result.getName(), result == Double.class);
    }

    /**
     * Test the <code>getReturnType()</code> method.
     */
    @Test
    public void getReturnTypeInteger()
    {
        // Setup.
        final PowerFunction<Integer> function = createInteger();

        // Run.
        final Class<?> result = function.getReturnType();

        // Verify.
        assertNotNull(result);
        assertTrue(result.getName(), result == Integer.class);
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final PowerFunction<Double> function0 = create0();
        final PowerFunction<Double> function1 = create1();
        final PowerFunction<Double> function2 = create0();

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
        final PowerFunction<Double> function0 = create0();
        final PowerFunction<Double> function1 = create1();
        final PowerFunction<Double> function2 = create0();

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
        final PowerFunction<Double> child0 = create0();

        final String result = child0.toString();

        assertNotNull(result);
        final String expected = "PowerFunction[returnType=Double,parent=<null>,symbol=^,children=[ConstantTerminal[returnType=Double,parent=PowerFunction,symbol=2.0,value=2.0], ConstantTerminal[returnType=Double,parent=PowerFunction,symbol=3.0,value=3.0]]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree function.
     */
    private PowerFunction<Double> create0()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 2.0);
        final TreeNode<Double> child1 = new ConstantTerminal<Double>(converterDouble, 3.0);

        return new PowerFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new tree function.
     */
    private PowerFunction<Double> create1()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 10.0);
        final TreeNode<Double> child1 = new ConstantTerminal<Double>(converterDouble, 9.0);

        return new PowerFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new function.
     */
    private PowerFunction<Double> createDouble()
    {
        final TreeNode<Double> child1 = new ConstantTerminal<Double>(converterDouble, 2.0);
        final TreeNode<Double> child2 = new ConstantTerminal<Double>(converterDouble, 3.0);

        return new PowerFunction<Double>(converterDouble, child1, child2);
    }

    /**
     * @return a new function.
     */
    private PowerFunction<Integer> createInteger()
    {
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 3);

        return new PowerFunction<Integer>(converterInteger, child1, child2);
    }
}
