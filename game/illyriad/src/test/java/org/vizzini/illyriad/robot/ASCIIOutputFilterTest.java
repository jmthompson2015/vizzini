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
 * Provides unit tests for the <code>ASCIIOutputFilter</code> class.
 */
public final class ASCIIOutputFilterTest
{
    /** Filter. */
    private final ASCIIOutputFilter filter0 = new ASCIIOutputFilter();

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter()
    {
        final double[] input = new double[95];

        // Comma.
        {
            Arrays.fill(input, 0.0);
            input[44 - 32] = 1.0;
            final String result = filter0.filter(input);

            assertNotNull(result);
            assertThat(result, is(","));
        }

        // Decimal point.
        {
            Arrays.fill(input, 0.0);
            input[46 - 32] = 1.0;
            final String result = filter0.filter(input);

            assertNotNull(result);
            assertThat(result, is("."));
        }

        // Digits.
        for (int i = 48; i < 58; i++)
        {
            Arrays.fill(input, 0.0);
            input[i - 32] = 1.0;
            final String result = filter0.filter(input);

            assertNotNull(result);
            // final String expected = String.valueOf(Character.valueOf((char)i));
            final String expected = String.valueOf((char)i);
            // System.out.println(String.format("%d %s %s", i, expected, result));
            assertThat(i + " " + result + " " + expected, result, is(expected));
        }

        // Uppercase letters.
        for (int i = 65; i < 91; i++)
        {
            Arrays.fill(input, 0.0);
            input[i - 32] = 1.0;
            final String result = filter0.filter(input);

            assertNotNull(result);
            assertThat(result, is(String.valueOf((char)i)));
        }

        // Lowercase letters.
        for (int i = 97; i < 123; i++)
        {
            Arrays.fill(input, 0.0);
            input[i - 32] = 1.0;
            final String result = filter0.filter(input);

            assertNotNull(result);
            assertThat(result, is(String.valueOf((char)i)));
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
            filter0.filter(new double[94]);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Not enough inputs: 94; need 95"));
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
        final double[] input = new double[96];
        Arrays.fill(input, 0.0);
        input[95] = 1.0;

        try
        {
            filter0.filter(input);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Unrecognized input index: 95"));
        }
    }

    /**
     * Test the <code>reverseFilter()</code> method.
     */
    @Test
    public void reverseFilter()
    {
        {
            final String output = ",";
            final double[] result = filter0.reverseFilter(output);

            assertNotNull(result);
            assertThat(result.length, is(95));
            final char ch = output.charAt(0);
            final int index = ch - 32;
            assertThat(result[index], is(1.0));
        }

        {
            final String output = ".";
            final double[] result = filter0.reverseFilter(output);

            assertNotNull(result);
            assertThat(result.length, is(95));
            final char ch = output.charAt(0);
            final int index = ch - 32;
            assertThat(result[index], is(1.0));
        }

        for (char ch = '0'; ch <= '9'; ch++)
        {
            final String output = String.valueOf(ch);
            final double[] result = filter0.reverseFilter(output);

            assertNotNull(result);
            assertThat(result.length, is(95));
            final int index = ch - 32;
            assertThat(result[index], is(1.0));
        }

        for (char ch = 'A'; ch <= 'Z'; ch++)
        {
            final String output = String.valueOf(ch);
            final double[] result = filter0.reverseFilter(output);

            assertNotNull(result);
            assertThat(result.length, is(95));
            final int index = ch - 32;
            assertThat(result[index], is(1.0));
        }

        for (char ch = 'a'; ch <= 'z'; ch++)
        {
            final String output = String.valueOf(ch);
            final double[] result = filter0.reverseFilter(output);

            assertNotNull(result);
            assertThat(result.length, is(95));
            final int index = ch - 32;
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
            filter0.reverseFilter("\u007F");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Unknown output string: []"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        assertTrue(filter0.equals(filter0));

        final ASCIIOutputFilter filter1 = new ASCIIOutputFilter();
        assertTrue(filter0.equals(filter1));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        assertTrue(filter0.hashCode() == filter0.hashCode());

        final ASCIIOutputFilter filter1 = new ASCIIOutputFilter();
        assertTrue(filter0.hashCode() == filter1.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final String expected = "org.vizzini.illyriad.robot.ASCIIOutputFilter []";
        final String result = filter0.toString();
        assertEquals(expected, result);
    }
}
