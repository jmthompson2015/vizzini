package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>ConstantTerminal</code> class.
 */
public final class ConstantTerminalTest
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
     * Test the <code>copy()</code> method.
     */
    @Test
    public void copyDouble()
    {
        // Setup.
        final ConstantTerminal<Double> terminal = new ConstantTerminal<Double>(converterDouble, 2.0);

        // Run.
        final TreeNode<Double> result = terminal.copy();

        // Verify.
        assertNotNull(result);
        assertFalse(terminal == result);
        assertTrue(terminal.equals(result));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateBoolean()
    {
        // Setup.
        final ConstantTerminal<Boolean> terminal = new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE);
        final Context context = new DefaultContext();

        // Run.
        final Boolean result = terminal.evaluate(context);

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
        final ConstantTerminal<Double> terminal = new ConstantTerminal<Double>(converterDouble, 2.0);
        final Context context = new DefaultContext();

        // Run.
        final Double result = terminal.evaluate(context);

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
        final ConstantTerminal<Integer> terminal = new ConstantTerminal<Integer>(converterInteger, 2);
        final Context context = new DefaultContext();

        // Run.
        final Integer result = terminal.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(2));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateString()
    {
        // Setup.
        final ConstantTerminal<String> terminal = new ConstantTerminal<String>(converterString, "a");
        final Context context = new DefaultContext();

        // Run.
        final String result = terminal.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is("a"));
    }

    /**
     * Test the <code>getValue()</code> method.
     */
    @Test
    public void getValueBoolean()
    {
        // Setup.
        final ConstantTerminal<Boolean> terminal = new ConstantTerminal<Boolean>(converterBoolean, Boolean.TRUE);

        // Run / Verify.
        assertTrue(terminal.getValue());
    }

    /**
     * Test the <code>getValue()</code> method.
     */
    @Test
    public void getValueDouble()
    {
        // Setup.
        final ConstantTerminal<Double> terminal = new ConstantTerminal<Double>(converterDouble, 2.0);

        // Run / Verify.
        assertThat(terminal.getValue(), is(2.0));
    }

    /**
     * Test the <code>getValue()</code> method.
     */
    @Test
    public void getValueInteger()
    {
        // Setup.
        final ConstantTerminal<Integer> terminal = new ConstantTerminal<Integer>(converterInteger, 2);

        // Run / Verify.
        assertThat(terminal.getValue(), is(2));
    }

    /**
     * Test the <code>getValue()</code> method.
     */
    @Test
    public void getValueString()
    {
        // Setup.
        final ConstantTerminal<String> terminal = new ConstantTerminal<String>(converterString, "a");

        // Run / Verify.
        assertThat(terminal.getValue(), is("a"));
    }

    /**
     * Test the <code>ConstantTerminal()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final Double value = 1.0;

        try
        {
            new ConstantTerminal<Double>((Converter<Double>)null, value);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }

        try
        {
            new ConstantTerminal<Double>(converterDouble, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("value is null"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final ConstantTerminal<Double> node0 = create0();
        final ConstantTerminal<Double> node1 = create1();
        final ConstantTerminal<Double> node2 = create0();

        assertTrue(node0.equals(node0));
        assertFalse(node0.equals(node1));
        assertTrue(node0.equals(node2));

        assertFalse(node1.equals(node0));
        assertTrue(node1.equals(node1));
        assertFalse(node1.equals(node2));

        assertTrue(node2.equals(node0));
        assertFalse(node2.equals(node1));
        assertTrue(node2.equals(node2));

        assertFalse(node0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final ConstantTerminal<Double> node0 = create0();
        final ConstantTerminal<Double> node1 = create1();
        final ConstantTerminal<Double> node2 = create0();

        assertTrue(node0.hashCode() == node0.hashCode());
        assertFalse(node0.hashCode() == node1.hashCode());
        assertTrue(node0.hashCode() == node2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final Terminal<Double> node0 = create0();

        final String result = node0.toString();

        assertNotNull(result);
        final String expected = "ConstantTerminal[returnType=Double,parent=<null>,symbol=1.0,value=1.0]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree node.
     */
    private ConstantTerminal<Double> create0()
    {
        return new ConstantTerminal<Double>(converterDouble, 1.0);
    }

    /**
     * @return a new tree node.
     */
    private ConstantTerminal<Double> create1()
    {
        return new ConstantTerminal<Double>(converterDouble, 2.0);
    }
}
