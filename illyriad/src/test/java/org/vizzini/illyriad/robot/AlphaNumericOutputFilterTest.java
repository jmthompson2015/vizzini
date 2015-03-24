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
 * Provides unit tests for the <code>AlphaNumericOutputFilter</code> class.
 */
public final class AlphaNumericOutputFilterTest
{
    /** Filter. */
    private final AlphaNumericOutputFilter filter0 = new AlphaNumericOutputFilter();

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter()
    {
        final double[] input = new double[64];

        // Digits.
        for (int i = 0; i < 10; i++)
        {
            Arrays.fill(input, 0.0);
            input[i] = 1.0;
            final String result = filter0.filter(input);

            assertNotNull(result);
            assertThat(result, is(String.valueOf(i)));
        }

        // Comma.
        {
            Arrays.fill(input, 0.0);
            input[10] = 1.0;
            final String result = filter0.filter(input);

            assertNotNull(result);
            assertThat(result, is(","));
        }

        // Decimal point.
        {
            Arrays.fill(input, 0.0);
            input[11] = 1.0;
            final String result = filter0.filter(input);

            assertNotNull(result);
            assertThat(result, is("."));
        }

        // Uppercase letters.
        for (int i = 12; i < 38; i++)
        {
            Arrays.fill(input, 0.0);
            input[i] = 1.0;
            final String result = filter0.filter(input);

            assertNotNull(result);
            assertThat(result, is(String.valueOf((char)('A' + (i - 12)))));
        }

        // Lowercase letters.
        for (int i = 38; i < 64; i++)
        {
            Arrays.fill(input, 0.0);
            input[i] = 1.0;
            final String result = filter0.filter(input);

            assertNotNull(result);
            assertThat(result, is(String.valueOf((char)('a' + (i - 38)))));
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
            filter0.filter(new double[62]);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Not enough inputs: 62; need 64"));
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
        final double[] input = new double[65];
        Arrays.fill(input, 0.0);
        input[64] = 1.0;

        try
        {
            filter0.filter(input);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Unrecognized input index: 64"));
        }
    }

    /**
     * Test the <code>reverseFilter()</code> method.
     */
    @Test
    public void reverseFilter()
    {
        for (char ch = '0'; ch <= '9'; ch++)
        {
            final String output = String.valueOf(ch);
            final double[] result = filter0.reverseFilter(output);

            assertNotNull(result);
            assertThat(result.length, is(64));
            final int index = ch - '0';
            assertThat(result[index], is(1.0));
        }

        {
            final String output = ",";
            final double[] result = filter0.reverseFilter(output);

            assertNotNull(result);
            assertThat(result.length, is(64));
            assertThat(result[10], is(1.0));
        }

        {
            final String output = ".";
            final double[] result = filter0.reverseFilter(output);

            assertNotNull(result);
            assertThat(result.length, is(64));
            assertThat(result[11], is(1.0));
        }

        for (char ch = 'A'; ch <= 'Z'; ch++)
        {
            final String output = String.valueOf(ch);
            final double[] result = filter0.reverseFilter(output);

            assertNotNull(result);
            assertThat(result.length, is(64));
            final int index = 12 + (ch - 'A');
            assertThat(result[index], is(1.0));
        }

        for (char ch = 'a'; ch <= 'z'; ch++)
        {
            final String output = String.valueOf(ch);
            final double[] result = filter0.reverseFilter(output);

            assertNotNull(result);
            assertThat(result.length, is(64));
            final int index = 38 + (ch - 'a');
            assertThat(result[index], is(1.0));
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

        final AlphaNumericOutputFilter filter1 = new AlphaNumericOutputFilter();
        assertTrue(filter0.equals(filter1));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        assertTrue(filter0.hashCode() == filter0.hashCode());

        final AlphaNumericOutputFilter filter1 = new AlphaNumericOutputFilter();
        assertTrue(filter0.hashCode() == filter1.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final String expected = "org.vizzini.illyriad.robot.AlphaNumericOutputFilter []";
        final String result = filter0.toString();
        assertEquals(expected, result);
    }
}
