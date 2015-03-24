package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>AbsoluteValueFunction</code> class.
 */
public final class AbsoluteValueFunctionTest
{
    /** Converter. */
    private final Converter<Boolean> converterBoolean = new Converter<Boolean>(Boolean.class);

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
    public void evaluateBoolean()
    {
        // Setup.
        final AbsoluteValueFunction<Boolean> function = createBoolean();
        final Context context = new DefaultContext();

        // Run.
        final Boolean result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(Boolean.TRUE));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDouble()
    {
        // Setup.
        final AbsoluteValueFunction<Double> function = createDouble();
        final Context context = new DefaultContext();

        // Run.
        final Double result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(1.0));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDoubleNoChildren()
    {
        try
        {
            new AbsoluteValueFunction<Double>(converterDouble, (TreeNode<Double>)null);
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
        final AbsoluteValueFunction<Integer> function = createInteger();
        final Context context = new DefaultContext();

        // Run.
        final Integer result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(1));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateIntegerNoChildren()
    {
        try
        {
            new AbsoluteValueFunction<Integer>(converterInteger, (TreeNode<Integer>)null);
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
        final AbsoluteValueFunction<String> function = createString();
        final Context context = new DefaultContext();

        // Run.
        final String result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is("dog"));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateStringNoChildren()
    {
        try
        {
            new AbsoluteValueFunction<String>(converterString, (TreeNode<String>)null);
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
    public void getReturnTypeBoolean()
    {
        // Setup.
        final AbsoluteValueFunction<Boolean> function = createBoolean();

        // Run.
        final Class<?> result = function.getReturnType();

        // Verify.
        assertNotNull(result);
        assertTrue(result.getName(), result == Boolean.class);
    }

    /**
     * Test the <code>getReturnType()</code> method.
     */
    @Test
    public void getReturnTypeDouble()
    {
        // Setup.
        final AbsoluteValueFunction<Double> function = createDouble();

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
        final AbsoluteValueFunction<Integer> function = createInteger();

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
        final AbsoluteValueFunction<String> function = createString();

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
        final AbsoluteValueFunction<Double> function0 = create0();
        final AbsoluteValueFunction<Double> function1 = create1();
        final AbsoluteValueFunction<Double> function2 = create0();

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
        final AbsoluteValueFunction<Double> function0 = create0();
        final AbsoluteValueFunction<Double> function1 = create1();
        final AbsoluteValueFunction<Double> function2 = create0();

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
        final AbsoluteValueFunction<Double> node0 = create0();

        final String result = node0.toString();

        assertNotNull(result);
        final String expected = "AbsoluteValueFunction[returnType=Double,parent=<null>,symbol=abs,children=[ConstantTerminal[returnType=Double,parent=AbsoluteValueFunction,symbol=1.0,value=1.0]]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree function.
     */
    private AbsoluteValueFunction<Double> create0()
    {
        final TreeNode<Double> child = new ConstantTerminal<Double>(converterDouble, 1.0);

        return new AbsoluteValueFunction<Double>(converterDouble, child);
    }

    /**
     * @return a new tree function.
     */
    private AbsoluteValueFunction<Double> create1()
    {
        final TreeNode<Double> child = new ConstantTerminal<Double>(converterDouble, 10.0);

        return new AbsoluteValueFunction<Double>(converterDouble, child);
    }

    /**
     * @return a new function.
     */
    private AbsoluteValueFunction<Boolean> createBoolean()
    {
        final TreeNode<Boolean> child = new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE);

        return new AbsoluteValueFunction<Boolean>(converterBoolean, child);
    }

    /**
     * @return a new function.
     */
    private AbsoluteValueFunction<Double> createDouble()
    {
        final TreeNode<Double> child = new ConstantTerminal<Double>(converterDouble, 1.0);

        return new AbsoluteValueFunction<Double>(converterDouble, child);
    }

    /**
     * @return a new function.
     */
    private AbsoluteValueFunction<Integer> createInteger()
    {
        final TreeNode<Integer> child = new ConstantTerminal<Integer>(converterInteger, 1);

        return new AbsoluteValueFunction<Integer>(converterInteger, child);
    }

    /**
     * @return a new function.
     */
    private AbsoluteValueFunction<String> createString()
    {
        final TreeNode<String> child = new ConstantTerminal<String>(converterString, "dog");

        return new AbsoluteValueFunction<String>(converterString, child);
    }
}
