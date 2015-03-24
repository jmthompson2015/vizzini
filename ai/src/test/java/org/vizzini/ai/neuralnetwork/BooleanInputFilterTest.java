package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>BooleanInputFilter</code> class.
 */
public final class BooleanInputFilterTest
{
    /** Filter. */
    private final BooleanInputFilter filter0 = new BooleanInputFilter();

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter()
    {
        {
            final double[] result = filter0.filter(new boolean[] { false, false });
            assertThat(result[0], is(0.0));
            assertThat(result[1], is(0.0));
        }

        {
            final double[] result = filter0.filter(new boolean[] { true, false });
            assertThat(result[0], is(1.0));
            assertThat(result[1], is(0.0));
        }

        {
            final double[] result = filter0.filter(new boolean[] { false, true });
            assertThat(result[0], is(0.0));
            assertThat(result[1], is(1.0));
        }

        {
            final double[] result = filter0.filter(new boolean[] { true, true });
            assertThat(result[0], is(1.0));
            assertThat(result[1], is(1.0));
        }
    }

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filterNull()
    {
        try
        {
            filter0.filter(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("input is null"));
        }
    }

    /**
     * Test the <code>reverseFilter()</code> method.
     */
    @Test
    public void reverseFilter()
    {
        {
            final boolean[] result = filter0.reverseFilter(new double[] { 0.0, 0.0 });
            assertThat(result[0], is(false));
            assertThat(result[1], is(false));
        }

        {
            final boolean[] result = filter0.reverseFilter(new double[] { 1.0, 0.0 });
            assertThat(result[0], is(true));
            assertThat(result[1], is(false));
        }

        {
            final boolean[] result = filter0.reverseFilter(new double[] { 0.0, 1.0 });
            assertThat(result[0], is(false));
            assertThat(result[1], is(true));
        }

        {
            final boolean[] result = filter0.reverseFilter(new double[] { 1.0, 1.0 });
            assertThat(result[0], is(true));
            assertThat(result[1], is(true));
        }

        {
            final boolean[] result = filter0.reverseFilter(new double[] { 0.49, 0.50, 0.51 });
            assertThat(result[0], is(false));
            assertThat(result[1], is(false));
            assertThat(result[2], is(true));
        }
    }

    /**
     * Test the <code>reverseFilter()</code> method.
     */
    @Test
    public void reverseFilterNull()
    {
        try
        {
            filter0.reverseFilter(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("output is null"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        assertTrue(filter0.equals(filter0));

        final BooleanInputFilter filter1 = new BooleanInputFilter();
        assertTrue(filter0.equals(filter1));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        assertTrue(filter0.hashCode() == filter0.hashCode());

        final BooleanInputFilter filter1 = new BooleanInputFilter();
        assertTrue(filter0.hashCode() == filter1.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final String expected = "org.vizzini.ai.neuralnetwork.BooleanInputFilter []";
        final String result = filter0.toString();
        assertEquals(expected, result);
    }
}
