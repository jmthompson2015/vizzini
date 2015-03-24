package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * Provides tests for the <code>BinaryDecodeFilter</code> class.
 */
public final class BinaryDecodeFilterTest
{
    /** Filter. */
    private BinaryDecodeFilter filter0;

    /** Filter. */
    private BinaryDecodeFilter filter1;

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter()
    {
        assertTrue(true);

        final BinaryEncoder[] encoders = new BinaryEncoder[2];
        encoders[0] = new BinaryEncoder(4);
        encoders[1] = new BinaryEncoder(10);

        final BinaryDecodeFilter filter = new BinaryDecodeFilter(encoders);
        assertThat(filter.getInputCount(), is(2));
        assertThat(filter.getOutputCount(), is(6));

        {
            // final double[] input = { 2.0, 4.0 };
            final double[] input = { 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, };
            final double[] output = filter.filter(input);

            // assertThat(output[0], is(1.0));
            // assertThat(output[1], is(0.0));
            // assertThat(output[2], is(0.0));
            // assertThat(output[3], is(1.0));
            // assertThat(output[4], is(0.0));
            // assertThat(output[5], is(0.0));

            assertThat(output[0], is(2.0));
            assertThat(output[1], is(4.0));
        }

        {
            // final double[] input = { 3.0, 10.0 };
            final double[] input = { 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, };
            final double[] output = filter.filter(input);

            // assertThat(output[0], is(1.0));
            // assertThat(output[1], is(1.0));
            // assertThat(output[2], is(1.0));
            // assertThat(output[3], is(0.0));
            // assertThat(output[4], is(1.0));
            // assertThat(output[5], is(0.0));

            assertThat(output[0], is(3.0));
            assertThat(output[1], is(10.0));
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
        final BinaryEncoder[] encoders = new BinaryEncoder[3];
        encoders[0] = new BinaryEncoder(4);
        encoders[1] = new BinaryEncoder(10);
        encoders[2] = new BinaryEncoder(10);

        filter0 = new BinaryDecodeFilter(encoders);
        filter1 = new BinaryDecodeFilter(encoders);
    }

    /**
     * Tear down the test.
     */
    @After
    public void tearDown()
    {
        filter0 = null;
        filter1 = null;
    }

    /**
     * Test the constructor method.
     */
    @Test
    public void testConstructor()
    {
        assertThat(filter0.getInputCount(), is(3));
        assertThat(filter0.getOutputCount(), is(10));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        assertTrue(filter0.equals(filter0));
        assertFalse(filter0.equals(filter1));

        assertFalse(filter1.equals(filter0));
        assertTrue(filter1.equals(filter1));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        assertTrue(filter0.hashCode() == filter0.hashCode());
        assertFalse(filter0.hashCode() == filter1.hashCode());

        assertFalse(filter1.hashCode() == filter0.hashCode());
        assertTrue(filter1.hashCode() == filter1.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final String expected = "org.vizzini.ai.neuralnetwork.BinaryDecodeFilter [inputCount=3,outputCount=10]";
        final String result = filter0.toString();

        assertNotNull(result);
        assertThat(result, is(expected));
    }
}
