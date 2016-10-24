package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>GreaterThanFunction</code> class.
 */
public final class GreaterThanFunctionTest
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
        final TreeNode<Boolean> function = createBoolean();
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
        final TreeNode<Double> function = createDouble();
        final Context context = new DefaultContext();

        // Run.
        final Double result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(-1.0));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDoubleNoChildren()
    {
        try
        {
            new GreaterThanFunction<Double>(converterDouble, null, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
            new GreaterThanFunction<Double>(converterDouble, child0, null);
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
        assertThat(result, is(-1));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateIntegerNoChildren()
    {
        try
        {
            new GreaterThanFunction<Integer>(converterInteger, null, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
            new GreaterThanFunction<Integer>(converterInteger, child0, null);
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
    public void evaluateStringFalse()
    {
        // Setup.
        final TreeNode<String> child0 = new ConstantTerminal<String>(converterString, "dog");
        final TreeNode<String> child1 = new ConstantTerminal<String>(converterString, "hound");
        final TreeNode<String> function = new GreaterThanFunction<String>(converterString, child0, child1);
        final Context context = new DefaultContext();

        // Run.
        final String result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is("false"));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateStringNoChildren()
    {
        try
        {
            new GreaterThanFunction<String>(converterString, null, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<String> child0 = new ConstantTerminal<String>(converterString, "dog");
            new GreaterThanFunction<String>(converterString, child0, null);
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
    public void evaluateStringTrue()
    {
        // Setup.
        final TreeNode<String> child0 = new ConstantTerminal<String>(converterString, "hound");
        final TreeNode<String> child1 = new ConstantTerminal<String>(converterString, "dog");
        final TreeNode<String> function = new GreaterThanFunction<String>(converterString, child0, child1);
        final Context context = new DefaultContext();

        // Run.
        final String result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is("true"));
    }

    /**
     * Test the <code>getReturnType()</code> method.
     */
    @Test
    public void getReturnTypeBoolean()
    {
        // Setup.
        final GreaterThanFunction<Boolean> function = createBoolean();

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
        final GreaterThanFunction<Double> function = createDouble();

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
        final GreaterThanFunction<Integer> function = createInteger();

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
        final GreaterThanFunction<String> function = createString();

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
        final GreaterThanFunction<Double> function0 = create0();
        final GreaterThanFunction<Double> function1 = create1();
        final GreaterThanFunction<Double> function2 = create0();

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
        final GreaterThanFunction<Double> function0 = create0();
        final GreaterThanFunction<Double> function1 = create1();
        final GreaterThanFunction<Double> function2 = create0();

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
        final GreaterThanFunction<Double> node0 = create0();

        final String result = node0.toString();

        assertNotNull(result);
        final String expected = "GreaterThanFunction[returnType=Double,parent=<null>,symbol=>,children=[ConstantTerminal[returnType=Double,parent=GreaterThanFunction,symbol=1.0,value=1.0], ConstantTerminal[returnType=Double,parent=GreaterThanFunction,symbol=2.0,value=2.0]]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree function.
     */
    private GreaterThanFunction<Double> create0()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
        final TreeNode<Double> child1 = new ConstantTerminal<Double>(converterDouble, 2.0);

        return new GreaterThanFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new tree function.
     */
    private GreaterThanFunction<Double> create1()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 10.0);
        final TreeNode<Double> child1 = new ConstantTerminal<Double>(converterDouble, 9.0);

        return new GreaterThanFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new function.
     */
    private GreaterThanFunction<Boolean> createBoolean()
    {
        final TreeNode<Boolean> child0 = new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE);
        final TreeNode<Boolean> child1 = new ConstantTerminal<Boolean>(converterBoolean, Boolean.FALSE);

        return new GreaterThanFunction<Boolean>(converterBoolean, child0, child1);
    }

    /**
     * @return a new function.
     */
    private GreaterThanFunction<Double> createDouble()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
        final TreeNode<Double> child1 = new ConstantTerminal<Double>(converterDouble, 2.0);

        return new GreaterThanFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new function.
     */
    private GreaterThanFunction<Integer> createInteger()
    {
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 2);

        return new GreaterThanFunction<Integer>(converterInteger, child0, child1);
    }

    /**
     * @return a new function.
     */
    private GreaterThanFunction<String> createString()
    {
        final TreeNode<String> child0 = new ConstantTerminal<String>(converterString, "hound");
        final TreeNode<String> child1 = new ConstantTerminal<String>(converterString, "dog");

        return new GreaterThanFunction<String>(converterString, child0, child1);
    }
}
