package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Test;
import org.vizzini.ai.neuralnetwork.ArrayUtilities;

/**
 * Provides tests for the <code>ArrayUtilities</code> class.
 */
public final class ArrayUtilitiesTest
{
    /** Flag indicating whether test output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Array utilities. */
    private final ArrayUtilities arrayUtils = new ArrayUtilities();

    /**
     * Test the <code>asList()</code> method.
     */
    @Test
    public void asList()
    {
        final double[] array = new double[] { 0.1, 0.2, 0.3, 0.4, };

        final List<Double> result = arrayUtils.asList(array);

        assertNotNull(result);
        assertThat(result.size(), is(array.length));

        for (int i = 0; i < array.length; i++)
        {
            assertThat(result.get(i), is(array[i]));
        }
    }

    /**
     * Test the <code>booleanToDouble()</code> method.
     */
    @Test
    public void booleanToDouble()
    {
        final boolean[] array = new boolean[] { true, false, true, false, };

        final double[] result = arrayUtils.booleanToDouble(array);

        assertNotNull(result);
        assertThat(result.length, is(array.length));

        for (int i = 0; i < array.length; i++)
        {
            assertThat(result[i], is(array[i] ? 1.0 : 0.0));
        }
    }

    /**
     * Test the <code>booleanToDouble()</code> method.
     */
    @Test
    public void booleanToDoubleNull()
    {
        try
        {
            arrayUtils.booleanToDouble(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("value is null"));
        }
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString1()
    {
        final double[] array = new double[] { 0.1, 0.2, 0.3, 0.4, };

        final String result = arrayUtils.toString(array, "%4.2f");

        assertNotNull(result);
        final String expected = "[0.10, 0.20, 0.30, 0.40]";

        if (IS_VERBOSE)
        {
            System.out.println("\nexpected = " + expected);
            System.out.println("result   = " + result);
        }

        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString1Null()
    {
        {
            final String result = arrayUtils.toString((double[])null, null);

            final String expected = "null";

            if (IS_VERBOSE)
            {
                System.out.println("\nexpected = " + expected);
                System.out.println("result   = " + result);
            }

            assertThat(result, is(expected));
        }

        {
            final double[] array = new double[] { 0.1, 0.2, 0.3, 0.4, };
            final String result = arrayUtils.toString(array, null);

            final String expected = "[0.1, 0.2, 0.3, 0.4]";

            if (IS_VERBOSE)
            {
                System.out.println("\nexpected = " + expected);
                System.out.println("result   = " + result);
            }

            assertThat(result, is(expected));
        }
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString2()
    {
        final double[][] array = new double[][] { { 0.1, 0.2, 0.3, 0.4, }, { 0.5, 0.6, 0.7, 0.8, } };

        final String result = arrayUtils.toString(array, "%4.2f");

        assertNotNull(result);
        final String expected = "[\n[0.10, 0.20, 0.30, 0.40]\n[0.50, 0.60, 0.70, 0.80]\n]";

        if (IS_VERBOSE)
        {
            System.out.println("\nexpected = " + expected);
            System.out.println("result   = " + result);
        }

        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString2Null()
    {
        {
            final String result = arrayUtils.toString((double[][])null, null);

            final String expected = "null";

            if (IS_VERBOSE)
            {
                System.out.println("\nexpected = " + expected);
                System.out.println("result   = " + result);
            }

            assertThat(result, is(expected));
        }

        {
            final double[][] array = new double[][] { { 0.1, 0.2, 0.3, 0.4, }, { 0.5, 0.6, 0.7, 0.8, } };
            final String result = arrayUtils.toString(array, null);

            final String expected = "[\n[0.1, 0.2, 0.3, 0.4]\n[0.5, 0.6, 0.7, 0.8]\n]";

            if (IS_VERBOSE)
            {
                System.out.println("\nexpected = " + expected);
                System.out.println("result   = " + result);
            }

            assertThat(result, is(expected));
        }
    }
}
