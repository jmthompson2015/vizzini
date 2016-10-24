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
 * Provides tests for the <code>MultiplyFunction</code> class.
 */
public final class MultiplyFunctionTest
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
     * Test the <code>createTree()</code> method.
     */
    @Test
    public void createTree()
    {
        // Setup.
        final List<TreeNode<Integer>> children = new ArrayList<TreeNode<Integer>>();
        children.add(new ConstantTerminal<Integer>(converterInteger, 1));
        children.add(new ConstantTerminal<Integer>(converterInteger, 2));
        children.add(new ConstantTerminal<Integer>(converterInteger, 3));
        children.add(new ConstantTerminal<Integer>(converterInteger, 4));
        children.add(new ConstantTerminal<Integer>(converterInteger, 5));

        // Run.
        final MultiplyFunction<Integer> result = MultiplyFunction.createTree(converterInteger, children);

        // Verify.
        assertNotNull(result);
        assertThat(InfixNotationVisitor.toEquation(result), is("(1 * (2 * (3 * (4 * 5))))"));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateBoolean()
    {
        // Setup.
        final MultiplyFunction<Boolean> function = createBoolean();
        final Context context = new DefaultContext();

        // Run / Verify.
        try
        {
            function.evaluate(context);
            fail("Should have thrown an exception");
        }
        catch (final RuntimeException e)
        {
            assertThat(e.getMessage(), is("Unsupported type: java.lang.Boolean"));
        }
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDouble()
    {
        // Setup.
        final MultiplyFunction<Double> function = createDouble();
        final Context context = new DefaultContext();

        // Run.
        final Double result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(6.0));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDoubleNoChildren()
    {
        try
        {
            new MultiplyFunction<Double>(converterDouble, null, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
            new MultiplyFunction<Double>(converterDouble, child0, null);
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
        final MultiplyFunction<Integer> function = createInteger();
        final Context context = new DefaultContext();

        // Run.
        final Integer result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(6));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateIntegerNoChildren()
    {
        try
        {
            new MultiplyFunction<Integer>(converterInteger, null, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
            new MultiplyFunction<Integer>(converterInteger, child0, null);
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
    public void evaluateString()
    {
        // Setup.
        final MultiplyFunction<String> function = createString();
        final Context context = new DefaultContext();

        // Run / Verify.
        try
        {
            function.evaluate(context);
            fail("Should have thrown an exception");
        }
        catch (final RuntimeException e)
        {
            assertThat(e.getMessage(), is("Unsupported type: java.lang.String"));
        }
    }

    /**
     * Test the <code>getReturnType()</code> method.
     */
    @Test
    public void getReturnTypeBoolean()
    {
        // Setup.
        final MultiplyFunction<Boolean> function = createBoolean();

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
        final MultiplyFunction<Double> function = createDouble();

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
        final MultiplyFunction<Integer> function = createInteger();

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
        final MultiplyFunction<String> function = createString();

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
    public void testConstructorNull()
    {
        final ConstantTerminal<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);

        try
        {
            new MultiplyFunction<Integer>(null, null, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }

        try
        {
            new MultiplyFunction<Integer>(converterInteger, null, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            new MultiplyFunction<Integer>(converterInteger, child0, null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child1 is null"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final MultiplyFunction<Double> function0 = create0();
        final MultiplyFunction<Double> function1 = create1();
        final MultiplyFunction<Double> function2 = create0();

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
        final MultiplyFunction<Double> function0 = create0();
        final MultiplyFunction<Double> function1 = create1();
        final MultiplyFunction<Double> function2 = create0();

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
        final MultiplyFunction<Double> node0 = create0();

        final String result = node0.toString();

        assertNotNull(result);
        final String expected = "MultiplyFunction[returnType=Double,parent=<null>,symbol=*,children=[ConstantTerminal[returnType=Double,parent=MultiplyFunction,symbol=1.0,value=1.0], MultiplyFunction[returnType=Double,parent=MultiplyFunction,symbol=*,children=[ConstantTerminal[returnType=Double,parent=MultiplyFunction,symbol=2.0,value=2.0], ConstantTerminal[returnType=Double,parent=MultiplyFunction,symbol=3.0,value=3.0]]]]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree function.
     */
    private MultiplyFunction<Double> create0()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
        final TreeNode<Double> child00 = new ConstantTerminal<Double>(converterDouble, 2.0);
        final TreeNode<Double> child01 = new ConstantTerminal<Double>(converterDouble, 3.0);
        final TreeNode<Double> child1 = new MultiplyFunction<Double>(converterDouble, child00, child01);

        return new MultiplyFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new tree function.
     */
    private MultiplyFunction<Double> create1()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 10.0);
        final TreeNode<Double> child00 = new ConstantTerminal<Double>(converterDouble, 9.0);
        final TreeNode<Double> child01 = new ConstantTerminal<Double>(converterDouble, 8.0);
        final TreeNode<Double> child1 = new MultiplyFunction<Double>(converterDouble, child00, child01);

        return new MultiplyFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new function.
     */
    private MultiplyFunction<Boolean> createBoolean()
    {
        final TreeNode<Boolean> child0 = new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE);
        final TreeNode<Boolean> child00 = new ConstantTerminal<Boolean>(converterBoolean, Boolean.FALSE);
        final TreeNode<Boolean> child01 = new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE);
        final TreeNode<Boolean> child1 = new MultiplyFunction<Boolean>(converterBoolean, child00, child01);

        return new MultiplyFunction<Boolean>(converterBoolean, child0, child1);
    }

    /**
     * @return a new function.
     */
    private MultiplyFunction<Double> createDouble()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
        final TreeNode<Double> child00 = new ConstantTerminal<Double>(converterDouble, 2.0);
        final TreeNode<Double> child01 = new ConstantTerminal<Double>(converterDouble, 3.0);
        final TreeNode<Double> child1 = new MultiplyFunction<Double>(converterDouble, child00, child01);

        return new MultiplyFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new function.
     */
    private MultiplyFunction<Integer> createInteger()
    {
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
        final TreeNode<Integer> child00 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child01 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child1 = new MultiplyFunction<Integer>(converterInteger, child00, child01);

        return new MultiplyFunction<Integer>(converterInteger, child0, child1);
    }

    /**
     * @return a new function.
     */
    private MultiplyFunction<String> createString()
    {
        final TreeNode<String> child0 = new ConstantTerminal<String>(converterString, "d");
        final TreeNode<String> child00 = new ConstantTerminal<String>(converterString, "o");
        final TreeNode<String> child01 = new ConstantTerminal<String>(converterString, "g");
        final TreeNode<String> child1 = new MultiplyFunction<String>(converterString, child00, child01);

        return new MultiplyFunction<String>(converterString, child0, child1);
    }
}
