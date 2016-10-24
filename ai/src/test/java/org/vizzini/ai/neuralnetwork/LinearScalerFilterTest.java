package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * Provides unit tests for the <code>LinearScalerFilter</code> class.
 */
public final class LinearScalerFilterTest
{
    /** Delta. */
    private static final double DELTA = 1.0e-3;

    /** Minimum input. */
    private static final double MIN_INPUT0 = -1.0;

    /** Maximum input. */
    private static final double MAX_INPUT0 = 1.0;

    /** Minimum output. */
    private static final double MIN_OUTPUT0 = -0.5;

    /** Maximum output. */
    private static final double MAX_OUTPUT0 = 0.5;

    /** Filter. */
    private LinearScalerFilter filter0;

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter()
    {
        {
            final double[] result = filter0.filter(new double[] { -0.5 });
            assertEquals(-0.25, result[0], DELTA);
        }

        {
            final double[] result = filter0.filter(new double[] { 0.0 });
            assertEquals(0.0, result[0], DELTA);
        }

        {
            final double[] result = filter0.filter(new double[] { 0.5 });
            assertEquals(0.25, result[0], DELTA);
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
     * Test the <code>getMaxInput()</code> method.
     */
    @Test
    public void getMaxInput()
    {
        assertEquals(MAX_INPUT0, filter0.getMaxInput(), 0.0);
    }

    /**
     * Test the <code>getMaxOutput()</code> method.
     */
    @Test
    public void getMaxOutput()
    {
        assertEquals(MAX_OUTPUT0, filter0.getMaxOutput(), 0.0);
    }

    /**
     * Test the <code>getMinInput()</code> method.
     */
    @Test
    public void getMinInput()
    {
        assertEquals(MIN_INPUT0, filter0.getMinInput(), 0.0);
    }

    /**
     * Test the <code>getMinOutput()</code> method.
     */
    @Test
    public void getMinOutput()
    {
        assertEquals(MIN_OUTPUT0, filter0.getMinOutput(), 0.0);
    }

    /**
     * Test the <code>reverseFilter()</code> method.
     */
    @Test
    public void reverseFilter()
    {
        {
            final double[] result = filter0.reverseFilter(new double[] { -0.25 });
            assertEquals(-0.5, result[0], DELTA);
        }

        {
            final double[] result = filter0.reverseFilter(new double[] { 0.0 });
            assertEquals(-0.0, result[0], DELTA);
        }

        {
            final double[] result = filter0.reverseFilter(new double[] { 0.25 });
            assertEquals(0.5, result[0], DELTA);
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
     * Set up the test.
     */
    @Before
    public void setUp()
    {
        filter0 = new LinearScalerFilter(MIN_INPUT0, MAX_INPUT0, MIN_OUTPUT0, MAX_OUTPUT0);
    }

    /**
     * Tear down the test.
     */
    @After
    public void tearDown()
    {
        filter0 = null;
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        assertTrue(filter0.equals(filter0));

        final LinearScalerFilter filter1 = new LinearScalerFilter(-333.0, MAX_INPUT0, MIN_OUTPUT0, MAX_OUTPUT0);
        assertFalse(filter0.equals(filter1));

        final LinearScalerFilter filter2 = new LinearScalerFilter(MIN_INPUT0, MAX_INPUT0, MIN_OUTPUT0, MAX_OUTPUT0);
        assertTrue(filter0.equals(filter2));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        assertTrue(filter0.hashCode() == filter0.hashCode());

        final LinearScalerFilter filter1 = new LinearScalerFilter(-333.0, MAX_INPUT0, MIN_OUTPUT0, MAX_OUTPUT0);
        assertFalse(filter0.hashCode() == filter1.hashCode());

        final LinearScalerFilter filter2 = new LinearScalerFilter(MIN_INPUT0, MAX_INPUT0, MIN_OUTPUT0, MAX_OUTPUT0);
        assertTrue(filter0.hashCode() == filter2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final String expected = "org.vizzini.ai.neuralnetwork.LinearScalerFilter [minInput=-1.0, maxInput=1.0, minOutput=-0.5, maxOutput=0.5]";
        final String result = filter0.toString();
        assertEquals(expected, result);
    }
}
