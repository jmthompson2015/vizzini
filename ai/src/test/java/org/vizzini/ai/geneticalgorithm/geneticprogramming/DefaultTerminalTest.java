package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultTerminal</code> class.
 */
public final class DefaultTerminalTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /**
     * Test the <code>getReturnType()</code> method.
     */
    @Test
    public void getReturnType()
    {
        // Setup.
        final DefaultTerminal<Double> function = create0();

        // Run.
        final Class<?> result = function.getReturnType();

        // Verify.
        assertNotNull(result);
        assertTrue(result.getName(), result == Double.class);
    }

    /**
     * Test the <code>ConstantTerminal()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new DefaultTerminal<Double>(null, "something");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }

        try
        {
            new DefaultTerminal<Double>(converterDouble, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("symbol is null or empty"));
        }

        try
        {
            new DefaultTerminal<Double>(converterDouble, "");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("symbol is null or empty"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final DefaultTerminal<Double> child0 = create0();
        final DefaultTerminal<Double> child1 = create1();
        final DefaultTerminal<Double> child2 = create0();

        assertTrue(child0.equals(child0));
        assertFalse(child0.equals(child1));
        assertFalse(child0.equals(child2));

        assertFalse(child1.equals(child0));
        assertTrue(child1.equals(child1));
        assertFalse(child1.equals(child2));

        assertFalse(child2.equals(child0));
        assertFalse(child2.equals(child1));
        assertTrue(child2.equals(child2));

        assertFalse(child0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final DefaultTerminal<Double> child0 = create0();
        final DefaultTerminal<Double> child1 = create1();
        final DefaultTerminal<Double> child2 = create0();

        assertTrue(child0.hashCode() == child0.hashCode());
        assertFalse(child0.hashCode() == child1.hashCode());
        assertFalse(child0.hashCode() == child2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString0()
    {
        final DefaultTerminal<Double> child0 = create0();

        final String result = child0.toString();

        assertNotNull(result);
        final String expected = "DefaultTerminal[returnType=Double,parent=<null>,symbol=something]";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString1()
    {
        final DefaultTerminal<Double> child0 = create1();

        final String result = child0.toString();

        assertNotNull(result);
        final String expected = "DefaultTerminal[returnType=Double,parent=DefaultTerminal,symbol=something]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree node.
     */
    private DefaultTerminal<Double> create0()
    {
        return new DefaultTerminal<Double>(converterDouble, "something");
    }

    /**
     * @return a new tree node.
     */
    private DefaultTerminal<Double> create1()
    {
        final DefaultTerminal<Double> answer = new DefaultTerminal<Double>(converterDouble, "something");

        answer.setParent(create0());

        return answer;
    }
}
