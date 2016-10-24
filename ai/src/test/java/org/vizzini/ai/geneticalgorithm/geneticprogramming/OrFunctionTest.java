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
 * Provides tests for the <code>OrFunction</code> class.
 */
public final class OrFunctionTest
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
        final OrFunction<Integer> result = OrFunction.createTree(converterInteger, children);

        // Verify.
        assertNotNull(result);
        assertThat(InfixNotationVisitor.toEquation(result), is("(1 | (2 | (3 | (4 | 5))))"));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate()
    {
        // Setup.
        final TreeNode<Boolean> trueChild = new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE);
        final TreeNode<Boolean> falseChild = new ConstantTerminal<Boolean>(converterBoolean, Boolean.FALSE);
        final Context context = new DefaultContext();

        // Truth table.
        {
            final OrFunction<Boolean> function = new OrFunction<Boolean>(converterBoolean, trueChild, trueChild);
            assertThat(function.evaluate(context), is(Boolean.TRUE));
        }

        {
            final OrFunction<Boolean> function = new OrFunction<Boolean>(converterBoolean, trueChild, falseChild);
            assertThat(function.evaluate(context), is(Boolean.TRUE));
        }

        {
            final OrFunction<Boolean> function = new OrFunction<Boolean>(converterBoolean, falseChild, trueChild);
            assertThat(function.evaluate(context), is(Boolean.TRUE));
        }

        {
            final OrFunction<Boolean> function = new OrFunction<Boolean>(converterBoolean, falseChild, falseChild);
            assertThat(function.evaluate(context), is(Boolean.FALSE));
        }
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateBoolean()
    {
        // Setup.
        final OrFunction<Boolean> function = createBoolean();
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
        final OrFunction<Double> function = createDouble();
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
            new OrFunction<Double>(converterDouble, null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
            new OrFunction<Double>(converterDouble, child0, null);
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
        final OrFunction<Integer> function = createInteger();
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
            new OrFunction<Integer>(converterInteger, null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
            new OrFunction<Integer>(converterInteger, child0, null);
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
        final OrFunction<String> function = createString();
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
            new OrFunction<String>(converterString, null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("child0 is null"));
        }

        try
        {
            final TreeNode<String> child0 = new ConstantTerminal<String>(converterString, "dog");
            new OrFunction<String>(converterString, child0, null);
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
    public void evaluateTruthTableBoolean()
    {
        // Setup.
        final TreeNode<Boolean> childTrue = new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE);
        final TreeNode<Boolean> childFalse = new ConstantTerminal<Boolean>(converterBoolean, Boolean.FALSE);
        final Context context = new DefaultContext();

        // Run / Verify.
        assertThat(new OrFunction<Boolean>(converterBoolean, childTrue, childTrue).evaluate(context), is(Boolean.TRUE));
        assertThat(new OrFunction<Boolean>(converterBoolean, childFalse, childTrue).evaluate(context), is(Boolean.TRUE));
        assertThat(new OrFunction<Boolean>(converterBoolean, childTrue, childFalse).evaluate(context), is(Boolean.TRUE));
        assertThat(new OrFunction<Boolean>(converterBoolean, childFalse, childFalse).evaluate(context),
                is(Boolean.FALSE));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateTruthTableDouble()
    {
        // Setup.
        final TreeNode<Double> childTrue = new ConstantTerminal<Double>(converterDouble, 1.0);
        final TreeNode<Double> childFalse = new ConstantTerminal<Double>(converterDouble, -1.0);
        final Context context = new DefaultContext();

        // Run / Verify.
        assertThat(new OrFunction<Double>(converterDouble, childTrue, childTrue).evaluate(context), is(1.0));
        assertThat(new OrFunction<Double>(converterDouble, childFalse, childTrue).evaluate(context), is(1.0));
        assertThat(new OrFunction<Double>(converterDouble, childTrue, childFalse).evaluate(context), is(1.0));
        assertThat(new OrFunction<Double>(converterDouble, childFalse, childFalse).evaluate(context), is(-1.0));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateTruthTableInteger()
    {
        // Setup.
        final TreeNode<Integer> childTrue = new ConstantTerminal<Integer>(converterInteger, 1);
        final TreeNode<Integer> childFalse = new ConstantTerminal<Integer>(converterInteger, -1);
        final Context context = new DefaultContext();

        // Run / Verify.
        assertThat(new OrFunction<Integer>(converterInteger, childTrue, childTrue).evaluate(context), is(1));
        assertThat(new OrFunction<Integer>(converterInteger, childFalse, childTrue).evaluate(context), is(1));
        assertThat(new OrFunction<Integer>(converterInteger, childTrue, childFalse).evaluate(context), is(1));
        assertThat(new OrFunction<Integer>(converterInteger, childFalse, childFalse).evaluate(context), is(-1));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateTruthTableString()
    {
        // Setup.
        final TreeNode<String> childTrue = new ConstantTerminal<String>(converterString, "true");
        final TreeNode<String> childFalse = new ConstantTerminal<String>(converterString, "false");
        final Context context = new DefaultContext();

        // Run / Verify.
        assertThat(new OrFunction<String>(converterString, childTrue, childTrue).evaluate(context), is("true"));
        assertThat(new OrFunction<String>(converterString, childFalse, childTrue).evaluate(context), is("true"));
        assertThat(new OrFunction<String>(converterString, childTrue, childFalse).evaluate(context), is("true"));
        assertThat(new OrFunction<String>(converterString, childFalse, childFalse).evaluate(context), is("false"));
    }

    /**
     * Test the <code>getReturnType()</code> method.
     */
    @Test
    public void getReturnTypeBoolean()
    {
        // Setup.
        final OrFunction<Boolean> function = createBoolean();

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
        final OrFunction<Double> function = createDouble();

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
        final OrFunction<Integer> function = createInteger();

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
        final OrFunction<String> function = createString();

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
        final OrFunction<Double> function0 = create0();
        final OrFunction<Double> function1 = create1();
        final OrFunction<Double> function2 = create0();

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
        final OrFunction<Double> function0 = create0();
        final OrFunction<Double> function1 = create1();
        final OrFunction<Double> function2 = create0();

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
        final OrFunction<Double> node0 = create0();

        final String result = node0.toString();

        assertNotNull(result);
        final String expected = "OrFunction[returnType=Double,parent=<null>,symbol=|,children=[ConstantTerminal[returnType=Double,parent=OrFunction,symbol=1.0,value=1.0], OrFunction[returnType=Double,parent=OrFunction,symbol=|,children=[ConstantTerminal[returnType=Double,parent=OrFunction,symbol=2.0,value=2.0], ConstantTerminal[returnType=Double,parent=OrFunction,symbol=3.0,value=3.0]]]]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree function.
     */
    private OrFunction<Double> create0()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
        final TreeNode<Double> child00 = new ConstantTerminal<Double>(converterDouble, 2.0);
        final TreeNode<Double> child01 = new ConstantTerminal<Double>(converterDouble, 3.0);
        final TreeNode<Double> child1 = new OrFunction<Double>(converterDouble, child00, child01);

        return new OrFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new tree function.
     */
    private OrFunction<Double> create1()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 10.0);
        final TreeNode<Double> child00 = new ConstantTerminal<Double>(converterDouble, 9.0);
        final TreeNode<Double> child01 = new ConstantTerminal<Double>(converterDouble, 8.0);
        final TreeNode<Double> child1 = new OrFunction<Double>(converterDouble, child00, child01);

        return new OrFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new function.
     */
    private OrFunction<Boolean> createBoolean()
    {
        final TreeNode<Boolean> child0 = new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE);
        final TreeNode<Boolean> child00 = new ConstantTerminal<Boolean>(converterBoolean, Boolean.FALSE);
        final TreeNode<Boolean> child01 = new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE);
        final TreeNode<Boolean> child1 = new OrFunction<Boolean>(converterBoolean, child00, child01);

        return new OrFunction<Boolean>(converterBoolean, child0, child1);
    }

    /**
     * @return a new function.
     */
    private OrFunction<Double> createDouble()
    {
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
        final TreeNode<Double> child00 = new ConstantTerminal<Double>(converterDouble, 2.0);
        final TreeNode<Double> child01 = new ConstantTerminal<Double>(converterDouble, 3.0);
        final TreeNode<Double> child1 = new OrFunction<Double>(converterDouble, child00, child01);

        return new OrFunction<Double>(converterDouble, child0, child1);
    }

    /**
     * @return a new function.
     */
    private OrFunction<Integer> createInteger()
    {
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
        final TreeNode<Integer> child00 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child01 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child1 = new OrFunction<Integer>(converterInteger, child00, child01);

        return new OrFunction<Integer>(converterInteger, child0, child1);
    }

    /**
     * @return a new function.
     */
    private OrFunction<String> createString()
    {
        final TreeNode<String> child0 = new ConstantTerminal<String>(converterString, "d");
        final TreeNode<String> child00 = new ConstantTerminal<String>(converterString, "o");
        final TreeNode<String> child01 = new ConstantTerminal<String>(converterString, "g");
        final TreeNode<String> child1 = new OrFunction<String>(converterString, child00, child01);

        return new OrFunction<String>(converterString, child0, child1);
    }
}
