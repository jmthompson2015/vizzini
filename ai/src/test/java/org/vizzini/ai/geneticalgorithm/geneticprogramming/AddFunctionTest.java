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
 * Provides tests for the <code>AddFunction</code> class.
 */
public final class AddFunctionTest
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
        final AddFunction<Integer> result = AddFunction.createTree(converterInteger, children);

        // Verify.
        assertNotNull(result);
        assertThat(InfixNotationVisitor.toEquation(result), is("(1 + (2 + (3 + (4 + 5))))"));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateBoolean()
    {
        // Setup.
        final AddFunction<Boolean> function = createBoolean();
        final Context context = new DefaultContext();

        // Run.
        final Boolean result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(Boolean.FALSE));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDouble()
    {
        // Setup.
        final AddFunction<Double> function = createDouble();
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
            new AddFunction<Double>(converterDouble, null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
            new AddFunction<Double>(converterDouble, child0, null);
            fail("Should have thrown an exception");
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
        final AddFunction<Integer> function = createInteger();
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
            new AddFunction<Integer>(converterInteger, null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
            new AddFunction<Integer>(converterInteger, child0, null);
            fail("Should have thrown an exception");
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
        final AddFunction<String> function = createString();
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
            new AddFunction<String>(converterString, null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<String> child0 = new ConstantTerminal<String>(converterString, "dog");
            new AddFunction<String>(converterString, child0, null);
            fail("Should have thrown an exception");
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
    public void getReturnTypeBoolean()
    {
        // Setup.
        final AddFunction<Boolean> function = createBoolean();

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
        final AddFunction<Double> function = createDouble();

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
        final AddFunction<Integer> function = createInteger();

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
        final AddFunction<String> function = createString();

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
        final AddFunction<Double> function0 = create0();
        final AddFunction<Double> function1 = create1();
        final AddFunction<Double> function2 = create0();

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
        final AddFunction<Double> function0 = create0();
        final AddFunction<Double> function1 = create1();
        final AddFunction<Double> function2 = create0();

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
        final AddFunction<Double> node0 = create0();

        final String result = node0.toString();

        assertNotNull(result);
        final String expected = "AddFunction[returnType=Double,parent=<null>,symbol=+,children=[ConstantTerminal[returnType=Double,parent=AddFunction,symbol=1.0,value=1.0], AddFunction[returnType=Double,parent=AddFunction,symbol=+,children=[ConstantTerminal[returnType=Double,parent=AddFunction,symbol=2.0,value=2.0], ConstantTerminal[returnType=Double,parent=AddFunction,symbol=3.0,value=3.0]]]]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree function.
     */
    private AddFunction<Double> create0()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
        final TreeNode<Double> child00 = new ConstantTerminal<Double>(converterDouble, 2.0);
        final TreeNode<Double> child01 = new ConstantTerminal<Double>(converterDouble, 3.0);
        final TreeNode<Double> child1 = new AddFunction<Double>(converterDouble, child00, child01);

        return new AddFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new tree function.
     */
    private AddFunction<Double> create1()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 10.0);
        final TreeNode<Double> child00 = new ConstantTerminal<Double>(converterDouble, 9.0);
        final TreeNode<Double> child01 = new ConstantTerminal<Double>(converterDouble, 8.0);
        final TreeNode<Double> child1 = new AddFunction<Double>(converterDouble, child00, child01);

        return new AddFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new function.
     */
    private AddFunction<Boolean> createBoolean()
    {
        final TreeNode<Boolean> child0 = new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE);
        final TreeNode<Boolean> child00 = new ConstantTerminal<Boolean>(converterBoolean, Boolean.FALSE);
        final TreeNode<Boolean> child01 = new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE);
        final TreeNode<Boolean> child1 = new AddFunction<Boolean>(converterBoolean, child00, child01);

        return new AddFunction<Boolean>(converterBoolean, child0, child1);
    }

    /**
     * @return a new function.
     */
    private AddFunction<Double> createDouble()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
        final TreeNode<Double> child00 = new ConstantTerminal<Double>(converterDouble, 2.0);
        final TreeNode<Double> child01 = new ConstantTerminal<Double>(converterDouble, 3.0);
        final TreeNode<Double> child1 = new AddFunction<Double>(converterDouble, child00, child01);

        return new AddFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new function.
     */
    private AddFunction<Integer> createInteger()
    {
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
        final TreeNode<Integer> child00 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child01 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child1 = new AddFunction<Integer>(converterInteger, child00, child01);

        return new AddFunction<Integer>(converterInteger, child0, child1);
    }

    /**
     * @return a new function.
     */
    private AddFunction<String> createString()
    {
        final TreeNode<String> child0 = new ConstantTerminal<String>(converterString, "d");
        final TreeNode<String> child00 = new ConstantTerminal<String>(converterString, "o");
        final TreeNode<String> child01 = new ConstantTerminal<String>(converterString, "g");
        final TreeNode<String> child1 = new AddFunction<String>(converterString, child00, child01);

        return new AddFunction<String>(converterString, child0, child1);
    }
}
