package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Context;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;

/**
 * Provides tests for the <code>LeftTerminal</code> class.
 */
public final class LeftTerminalTest
{
    /** Converter. */
    private final Converter<Integer> converter = new Converter<Integer>(Integer.class);

    /**
     * Test the <code>copy()</code> method.
     */
    @Test
    public void copy()
    {
        // Setup.
        final LeftTerminal terminal = new LeftTerminal(converter);

        // Run.
        final TreeNode<Integer> result = terminal.copy();

        // Verify.
        assertNotNull(result);
        assertFalse(terminal == result);
        assertTrue(terminal.equals(result));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate()
    {
        // Setup.
        final LeftTerminal terminal = new LeftTerminal(converter);
        final Context context = new AntContext();

        {
            // Run.
            final Integer result = terminal.evaluate(context);

            // Verify.
            assertNotNull(result);
            assertThat(result, is(1));
            assertThat((Integer)context.getVariable("x"), is(0));
            assertThat((Integer)context.getVariable("y"), is(0));
            assertThat((Direction)context.getVariable("direction"), is(Direction.NORTH));
        }

        {
            // Run.
            final Integer result = terminal.evaluate(context);

            // Verify.
            assertNotNull(result);
            assertThat(result, is(1));
            assertThat((Integer)context.getVariable("x"), is(0));
            assertThat((Integer)context.getVariable("y"), is(0));
            assertThat((Direction)context.getVariable("direction"), is(Direction.WEST));
        }

        {
            // Run.
            final Integer result = terminal.evaluate(context);

            // Verify.
            assertNotNull(result);
            assertThat(result, is(1));
            assertThat((Integer)context.getVariable("x"), is(0));
            assertThat((Integer)context.getVariable("y"), is(0));
            assertThat((Direction)context.getVariable("direction"), is(Direction.SOUTH));
        }

        {
            // Run.
            final Integer result = terminal.evaluate(context);

            // Verify.
            assertNotNull(result);
            assertThat(result, is(1));
            assertThat((Integer)context.getVariable("x"), is(0));
            assertThat((Integer)context.getVariable("y"), is(0));
            assertThat((Direction)context.getVariable("direction"), is(Direction.EAST));
        }
    }

    /**
     * Test the <code>LeftTerminal()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new LeftTerminal((Converter<Integer>)null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final LeftTerminal node0 = create0();
        final LeftTerminal node1 = create1();
        final LeftTerminal node2 = create0();

        assertTrue(node0.equals(node0));
        assertTrue(node0.equals(node1));
        assertTrue(node0.equals(node2));

        assertTrue(node1.equals(node0));
        assertTrue(node1.equals(node1));
        assertTrue(node1.equals(node2));

        assertTrue(node2.equals(node0));
        assertTrue(node2.equals(node1));
        assertTrue(node2.equals(node2));

        assertFalse(node0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final LeftTerminal node0 = create0();
        final LeftTerminal node1 = create1();
        final LeftTerminal node2 = create0();

        assertTrue(node0.hashCode() == node0.hashCode());
        assertTrue(node0.hashCode() == node1.hashCode());
        assertTrue(node0.hashCode() == node2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final Terminal<Integer> node0 = create0();

        final String result = node0.toString();

        assertNotNull(result);
        final String expected = "LeftTerminal[returnType=Integer,parent=<null>]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree node.
     */
    private LeftTerminal create0()
    {
        return new LeftTerminal(converter);
    }

    /**
     * @return a new tree node.
     */
    private LeftTerminal create1()
    {
        return new LeftTerminal(converter);
    }
}
