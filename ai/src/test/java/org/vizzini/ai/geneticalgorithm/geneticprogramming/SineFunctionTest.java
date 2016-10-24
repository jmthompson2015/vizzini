package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>SineFunction</code> class.
 */
public final class SineFunctionTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDouble()
    {
        // Setup.
        final TreeNode<Double> function = create();
        final Context context = new DefaultContext();

        // Run.
        final Double result = function.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(String.format("%6.4f", result), is("0.7071"));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final SineFunction<Double> function0 = create0();
        final SineFunction<Double> function1 = create1();
        final SineFunction<Double> function2 = create0();

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
        final SineFunction<Double> function0 = create0();
        final SineFunction<Double> function1 = create1();
        final SineFunction<Double> function2 = create0();

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
        final SineFunction<Double> node0 = create0();

        final String result = node0.toString();

        assertNotNull(result);
        final String expected = "SineFunction[returnType=Double,parent=<null>,symbol=sin,children=[ConstantTerminal[returnType=Double,parent=SineFunction,symbol=1.0,value=1.0]]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new function.
     */
    private TreeNode<Double> create()
    {
        final TreeNode<Double> child = new ConstantTerminal<Double>(converterDouble, Math.PI / 4.0);

        return new SineFunction<Double>(converterDouble, child);
    }

    /**
     * @return a new tree function.
     */
    private SineFunction<Double> create0()
    {
        final TreeNode<Double> child = new ConstantTerminal<Double>(converterDouble, 1.0);

        return new SineFunction<Double>(converterDouble, child);
    }

    /**
     * @return a new tree function.
     */
    private SineFunction<Double> create1()
    {
        final TreeNode<Double> child = new ConstantTerminal<Double>(converterDouble, 10.0);

        return new SineFunction<Double>(converterDouble, child);
    }
}
