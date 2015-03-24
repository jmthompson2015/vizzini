package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>PutVariableFunction</code> class.
 */
public final class PutVariableFunctionTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /** Converter. */
    private final Converter<Integer> converterInteger = new Converter<Integer>(Integer.class);

    /** Converter. */
    private final Converter<String> converterString = new Converter<String>(String.class);

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDouble()
    {
        // Setup.
        final TreeNode<Double> function = createDouble();
        final Context context = new DefaultContext();
        assertNull(context.getVariable("x"));

        // Run.
        final Double result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(1.0));
        assertThat((Double)context.getVariable("x"), is(1.0));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDoubleNoChildren()
    {
        try
        {
            new PutVariableFunction<Double>(converterDouble, "x", (TreeNode<Double>)null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
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
        assertThat(result, is(1));
        assertThat((Integer)context.getVariable("x"), is(1));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateIntegerNoChildren()
    {
        try
        {
            new PutVariableFunction<Integer>(converterInteger, "x", (TreeNode<Integer>)null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateString()
    {
        // Setup.
        final TreeNode<String> function = createString();
        final Context context = new DefaultContext();

        // Run.
        final String result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is("d"));
        assertThat((String)context.getVariable("x"), is("d"));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateStringNoChildren()
    {
        try
        {
            new PutVariableFunction<String>(converterString, "x", (TreeNode<String>)null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }
    }

    /**
     * Test the <code>getReturnType()</code> method.
     */
    @Test
    public void getReturnTypeDouble()
    {
        // Setup.
        final PutVariableFunction<Double> function = createDouble();

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
        final PutVariableFunction<Integer> function = createInteger();

        // Run.
        final Class<?> result = function.getReturnType();

        // Verify.
        assertNotNull(result);
        assertTrue(result.getName(), result == Integer.class);
    }

    /**
     * Test the <code>getReturnType()</code> method.
     */
    @Test
    public void getReturnTypeString()
    {
        // Setup.
        final PutVariableFunction<String> function = createString();

        // Run.
        final Class<?> result = function.getReturnType();

        // Verify.
        assertNotNull(result);
        assertTrue(result.getName(), result == String.class);
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final PutVariableFunction<Double> function0 = create0();
        final PutVariableFunction<Double> function1 = create1();
        final PutVariableFunction<Double> function2 = create0();

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
        final PutVariableFunction<Double> function0 = create0();
        final PutVariableFunction<Double> function1 = create1();
        final PutVariableFunction<Double> function2 = create0();

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
        final PutVariableFunction<Double> child0 = create0();

        final String result = child0.toString();

        assertNotNull(result);
        final String expected = "PutVariableFunction[returnType=Double,parent=<null>,variableName=x,symbol=put,children=[ConstantTerminal[returnType=Double,parent=PutVariableFunction,symbol=1.0,value=1.0]]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree function.
     */
    private PutVariableFunction<Double> create0()
    {
        final TreeNode<Double> child = new ConstantTerminal<Double>(converterDouble, 1.0);

        return new PutVariableFunction<Double>(converterDouble, "x", child);
    }

    /**
     * @return a new tree function.
     */
    private PutVariableFunction<Double> create1()
    {
        final TreeNode<Double> child = new ConstantTerminal<Double>(converterDouble, 10.0);

        return new PutVariableFunction<Double>(converterDouble, "x", child);
    }

    /**
     * @return a new function.
     */
    private PutVariableFunction<Double> createDouble()
    {
        final TreeNode<Double> child1 = new ConstantTerminal<Double>(converterDouble, 1.0);

        return new PutVariableFunction<Double>(converterDouble, "x", child1);
    }

    /**
     * @return a new function.
     */
    private PutVariableFunction<Integer> createInteger()
    {
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 1);

        return new PutVariableFunction<Integer>(converterInteger, "x", child1);
    }

    /**
     * @return a new function.
     */
    private PutVariableFunction<String> createString()
    {
        final TreeNode<String> child1 = new ConstantTerminal<String>(converterString, "d");

        return new PutVariableFunction<String>(converterString, "x", child1);
    }
}
