package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;

/**
 * Provides tests for the <code>MoveTerminal</code> class.
 */
public final class MoveTerminalTest
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
        final MoveTerminal terminal = new MoveTerminal(converter);

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
        final MoveTerminal terminal = new MoveTerminal(converter);
        final AntContext context = new AntContext();

        {
            // Run.
            final Integer result = terminal.evaluate(context);

            // Verify.
            assertNotNull(result);
            assertThat(result, is(1));
            assertThat(context.getX(), is(1));
            assertThat(context.getY(), is(0));
            assertThat(context.getDirection(), is(Direction.EAST));

            final SantaFeTrail environment = (SantaFeTrail)context.getVariable("environment");
            assertTrue(environment.isFootprint(0, 0));
            assertTrue(environment.isFootprint(1, 0));
            assertTrue(environment.isFood(2, 0));
            assertThat(environment.foodConsumed(), is(1));
        }

        {
            // Run.
            final Integer result = terminal.evaluate(context);

            // Verify.
            assertNotNull(result);
            assertThat(result, is(1));
            assertThat(context.getX(), is(2));
            assertThat(context.getY(), is(0));
            assertThat(context.getDirection(), is(Direction.EAST));

            final SantaFeTrail environment = context.getEnvironment();
            assertTrue(environment.isFootprint(0, 0));
            assertTrue(environment.isFootprint(1, 0));
            assertTrue(environment.isFootprint(2, 0));
            assertThat(environment.foodConsumed(), is(2));
        }
    }

    /**
     * Test the <code>MoveTerminal()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new MoveTerminal((Converter<Integer>)null);
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
        final MoveTerminal node0 = create0();
        final MoveTerminal node1 = create1();
        final MoveTerminal node2 = create0();

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
        final MoveTerminal node0 = create0();
        final MoveTerminal node1 = create1();
        final MoveTerminal node2 = create0();

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
        final String expected = "MoveTerminal[returnType=Integer,parent=<null>]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree node.
     */
    private MoveTerminal create0()
    {
        return new MoveTerminal(converter);
    }

    /**
     * @return a new tree node.
     */
    private MoveTerminal create1()
    {
        return new MoveTerminal(converter);
    }
}
