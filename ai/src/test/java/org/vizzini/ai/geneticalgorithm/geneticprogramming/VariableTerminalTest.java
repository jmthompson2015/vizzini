package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>VariableTerminal</code> class.
 */
public final class VariableTerminalTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /** Converter. */
    private final Converter<Integer> converterInteger = new Converter<Integer>(Integer.class);

    /**
     * Test the <code>copy()</code> method.
     */
    @Test
    public void copyDouble()
    {
        // Setup.
        final VariableTerminal<Double> terminal = new VariableTerminal<Double>(converterDouble, "a");

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
    public void evaluateDouble()
    {
        // Setup.
        final VariableTerminal<Double> terminal = new VariableTerminal<Double>(converterDouble, "x");
        final Context context = createContextDouble();

        // Run.
        final Double result = terminal.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(1.0));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateInteger()
    {
        // Setup.
        final VariableTerminal<Integer> terminal = new VariableTerminal<Integer>(converterInteger, "x");
        final Context context = createContextInteger();

        // Run.
        final Integer result = terminal.evaluate(context);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(1));
    }

    /**
     * Test the <code>ConstantTerminal()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new VariableTerminal<Double>((Converter<Double>)null, "x");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }

        try
        {
            new VariableTerminal<Double>(converterDouble, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("variableName is null or empty"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final VariableTerminal<Double> node0 = create0();
        final VariableTerminal<Double> node1 = create1();
        final VariableTerminal<Double> node2 = create0();

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
        final VariableTerminal<Double> node0 = create0();
        final VariableTerminal<Double> node1 = create1();
        final VariableTerminal<Double> node2 = create0();

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
        final String expected = "VariableTerminal[returnType=Double,parent=<null>,symbol=x,variableName=x]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree node.
     */
    private VariableTerminal<Double> create0()
    {
        final String variableName = "x";

        return new VariableTerminal<Double>(converterDouble, variableName);
    }

    /**
     * @return a new tree node.
     */
    private VariableTerminal<Double> create1()
    {
        final String variableName = "y";

        return new VariableTerminal<Double>(converterDouble, variableName);
    }

    /**
     * @return a new context.
     */
    private Context createContextDouble()
    {
        final Context context = new DefaultContext();

        context.putVariable("x", 1.0);
        context.putVariable("y", 2.0);

        return context;
    }

    /**
     * @return a new context.
     */
    private Context createContextInteger()
    {
        final Context context = new DefaultContext();

        context.putVariable("x", 1);
        context.putVariable("y", 2);

        return context;
    }
}
