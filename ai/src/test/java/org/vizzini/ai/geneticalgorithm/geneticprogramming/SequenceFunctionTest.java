package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>SequenceFunction</code> class.
 */
public final class SequenceFunctionTest
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
        final SequenceFunction<Boolean> function = createBoolean();
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
        final SequenceFunction<Double> function = createDouble();
        final Context context = new DefaultContext();

        // Run.
        final Double result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(3.0));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDoubleNoChildren()
    {
        try
        {
            new SequenceFunction<Double>(converterDouble, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("children is null or empty"));
        }

        try
        {
            new SequenceFunction<Double>(converterDouble, new ArrayList<TreeNode<Double>>());
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("children is null or empty"));
        }
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateInteger()
    {
        // Setup.
        final SequenceFunction<Integer> function = createInteger();
        final Context context = new DefaultContext();

        // Run.
        final Integer result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(3));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateIntegerNoChildren()
    {
        try
        {
            new SequenceFunction<Integer>(converterInteger, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("children is null or empty"));
        }

        try
        {
            new SequenceFunction<Integer>(converterInteger, new ArrayList<TreeNode<Integer>>());
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("children is null or empty"));
        }
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateString()
    {
        // Setup.
        final SequenceFunction<String> function = createString();
        final Context context = new DefaultContext();

        // Run.
        final String result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is("g"));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateStringNoChildren()
    {
        try
        {
            new SequenceFunction<String>(converterString, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("children is null or empty"));
        }

        try
        {
            new SequenceFunction<String>(converterString, new ArrayList<TreeNode<String>>());
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("children is null or empty"));
        }
    }

    /**
     * Test the <code>getReturnType()</code> method.
     */
    @Test
    public void getReturnTypeBoolean()
    {
        // Setup.
        final SequenceFunction<Boolean> function = createBoolean();

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
        final SequenceFunction<Double> function = createDouble();

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
        final SequenceFunction<Integer> function = createInteger();

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
        final SequenceFunction<String> function = createString();

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
        final SequenceFunction<Double> function0 = create0();
        final SequenceFunction<Double> function1 = create1();
        final SequenceFunction<Double> function2 = create0();

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
        final SequenceFunction<Double> function0 = create0();
        final SequenceFunction<Double> function1 = create1();
        final SequenceFunction<Double> function2 = create0();

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
        final SequenceFunction<Double> node0 = create0();

        final String result = node0.toString();

        assertNotNull(result);
        final String expected = "SequenceFunction[returnType=Double,parent=<null>,symbol=seq3,children=[ConstantTerminal[returnType=Double,parent=SequenceFunction,symbol=1.0,value=1.0], ConstantTerminal[returnType=Double,parent=SequenceFunction,symbol=2.0,value=2.0], ConstantTerminal[returnType=Double,parent=SequenceFunction,symbol=3.0,value=3.0]]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree function.
     */
    private SequenceFunction<Double> create0()
    {
        final List<TreeNode<Double>> children = new ArrayList<TreeNode<Double>>();
        children.add(new ConstantTerminal<Double>(converterDouble, 1.0));
        children.add(new ConstantTerminal<Double>(converterDouble, 2.0));
        children.add(new ConstantTerminal<Double>(converterDouble, 3.0));

        return new SequenceFunction<Double>(converterDouble, children);
    }

    /**
     * @return a new tree function.
     */
    private SequenceFunction<Double> create1()
    {
        final List<TreeNode<Double>> children = new ArrayList<TreeNode<Double>>();
        children.add(new ConstantTerminal<Double>(converterDouble, 10.0));
        children.add(new ConstantTerminal<Double>(converterDouble, 9.0));
        children.add(new ConstantTerminal<Double>(converterDouble, 8.0));

        return new SequenceFunction<Double>(converterDouble, children);
    }

    /**
     * @return a new function.
     */
    private SequenceFunction<Boolean> createBoolean()
    {
        final List<TreeNode<Boolean>> children = new ArrayList<TreeNode<Boolean>>();
        children.add(new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE));
        children.add(new ConstantTerminal<Boolean>(converterBoolean, Boolean.FALSE));
        children.add(new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE));

        return new SequenceFunction<Boolean>(converterBoolean, children);
    }

    /**
     * @return a new function.
     */
    private SequenceFunction<Double> createDouble()
    {
        final List<TreeNode<Double>> children = new ArrayList<TreeNode<Double>>();
        children.add(new ConstantTerminal<Double>(converterDouble, 1.0));
        children.add(new ConstantTerminal<Double>(converterDouble, 2.0));
        children.add(new ConstantTerminal<Double>(converterDouble, 3.0));

        return new SequenceFunction<Double>(converterDouble, children);
    }

    /**
     * @return a new function.
     */
    private SequenceFunction<Integer> createInteger()
    {
        final List<TreeNode<Integer>> children = new ArrayList<TreeNode<Integer>>();
        children.add(new ConstantTerminal<Integer>(converterInteger, 1));
        children.add(new ConstantTerminal<Integer>(converterInteger, 2));
        children.add(new ConstantTerminal<Integer>(converterInteger, 3));

        return new SequenceFunction<Integer>(converterInteger, children);
    }

    /**
     * @return a new function.
     */
    private SequenceFunction<String> createString()
    {
        final List<TreeNode<String>> children = new ArrayList<TreeNode<String>>();
        children.add(new ConstantTerminal<String>(converterString, "d"));
        children.add(new ConstantTerminal<String>(converterString, "o"));
        children.add(new ConstantTerminal<String>(converterString, "g"));

        return new SequenceFunction<String>(converterString, children);
    }
}
