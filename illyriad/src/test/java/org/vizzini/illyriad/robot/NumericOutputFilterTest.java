package org.vizzini.illyriad.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.Arrays;

import org.junit.Test;

/**
 * Provides unit tests for the <code>NumericOutputFilter</code> class.
 */
public final class NumericOutputFilterTest
{
    /** Filter. */
    private final NumericOutputFilter filter0 = new NumericOutputFilter();

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter()
    {
        final double[] input = new double[12];

        for (int i = 0; i < 10; i++)
        {
            Arrays.fill(input, 0.0);
            input[i] = 1.0;
            final String result = filter0.filter(input);

            assertNotNull(result);
            assertThat(result, is(String.valueOf(i)));
        }

        {
            Arrays.fill(input, 0.0);
            input[10] = 1.0;
            final String result = filter0.filter(input);

            assertNotNull(result);
            assertThat(result, is(","));
        }

        {
            Arrays.fill(input, 0.0);
            input[11] = 1.0;
            final String result = filter0.filter(input);

            assertNotNull(result);
            assertThat(result, is("."));
        }
    }

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filterNotEnoughInputs()
    {
        try
        {
            filter0.filter(new double[10]);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Not enough inputs: 10; need 12"));
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
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filterUnknown()
    {
        final double[] input = new double[13];
        Arrays.fill(input, 0.0);
        input[12] = 1.0;

        try
        {
            filter0.filter(input);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Unrecognized input index: 12"));
        }
    }

    /**
     * Test the <code>reverseFilter()</code> method.
     */
    @Test
    public void reverseFilter0()
    {
        final String output = "0";
        final double[] result = filter0.reverseFilter(output);

        assertNotNull(result);
        assertThat(result.length, is(12));
        assertThat(result[0], is(1.0));
    }

    /**
     * Test the <code>reverseFilter()</code> method.
     */
    @Test
    public void reverseFilterComma()
    {
        final String output = ",";
        final double[] result = filter0.reverseFilter(output);

        assertNotNull(result);
        assertThat(result.length, is(12));
        assertThat(result[10], is(1.0));
    }

    /**
     * Test the <code>reverseFilter()</code> method.
     */
    @Test
    public void reverseFilterDecimalPoint()
    {
        final String output = ".";
        final double[] result = filter0.reverseFilter(output);

        assertNotNull(result);
        assertThat(result.length, is(12));
        assertThat(result[11], is(1.0));
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
            assertThat(e.getMessage(), is("output is null or empty"));
        }

        try
        {
            filter0.reverseFilter("");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("output is null or empty"));
        }
    }

    /**
     * Test the <code>reverseFilter()</code> method.
     */
    @Test
    public void reverseFilterUnknown()
    {
        try
        {
            filter0.reverseFilter("{");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Unknown output string: [{]"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        assertTrue(filter0.equals(filter0));

        final NumericOutputFilter filter1 = new NumericOutputFilter();
        assertTrue(filter0.equals(filter1));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        assertTrue(filter0.hashCode() == filter0.hashCode());

        final NumericOutputFilter filter1 = new NumericOutputFilter();
        assertTrue(filter0.hashCode() == filter1.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final String expected = "org.vizzini.illyriad.robot.NumericOutputFilter []";
        final String result = filter0.toString();
        assertEquals(expected, result);
    }
}
