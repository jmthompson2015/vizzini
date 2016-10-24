package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultTreeNode</code> class.
 */
public final class DefaultTreeNodeTest
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
        final DefaultTreeNode<Double> function = create0();

        // Run.
        final Class<?> result = function.getReturnType();

        // Verify.
        assertNotNull(result);
        assertTrue(result.getName(), result == Double.class);
    }

    /**
     * Test the <code>getSymbol()</code> method.
     */
    @Test
    public void getSymbol()
    {
        // Setup.
        final DefaultTreeNode<Double> function = create0();

        // Run.
        final String result = function.getSymbol();

        // Verify.
        assertNotNull(result);
        assertThat(result, is("something"));
    }

    /**
     * Test the <code>ConstantTerminal()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new DefaultTreeNode<Double>(null, "something");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }

        try
        {
            new DefaultTreeNode<Double>(converterDouble, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("symbol is null or empty"));
        }

        try
        {
            new DefaultTreeNode<Double>(converterDouble, "");
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
        final DefaultTreeNode<Double> node0 = create0();
        final DefaultTreeNode<Double> node1 = create1();
        final DefaultTreeNode<Double> node2 = create0();

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
        final DefaultTreeNode<Double> node0 = create0();
        final DefaultTreeNode<Double> node1 = create1();
        final DefaultTreeNode<Double> node2 = create0();

        assertTrue(node0.hashCode() == node0.hashCode());
        assertFalse(node0.hashCode() == node1.hashCode());
        assertTrue(node0.hashCode() == node2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString0()
    {
        final DefaultTreeNode<Double> node0 = create0();

        final String result = node0.toString();

        assertNotNull(result);
        final String expected = "DefaultTreeNode[returnType=Double,parent=<null>]";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString1()
    {
        final DefaultTreeNode<Double> node0 = create1();

        final String result = node0.toString();

        assertNotNull(result);
        final String expected = "DefaultTreeNode[returnType=Double,parent=DefaultTreeNode]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new tree node.
     */
    private DefaultTreeNode<Double> create0()
    {
        return new DefaultTreeNode<Double>(converterDouble, "something");
    }

    /**
     * @return a new tree node.
     */
    private DefaultTreeNode<Double> create1()
    {
        final DefaultTreeNode<Double> answer = new DefaultTreeNode<Double>(converterDouble, "another");

        answer.setParent(create0());

        return answer;
    }
}
