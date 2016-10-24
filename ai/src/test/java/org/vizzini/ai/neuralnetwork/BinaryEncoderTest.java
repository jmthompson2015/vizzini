package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.Arrays;
import java.util.BitSet;

import org.junit.Test;
import org.vizzini.ai.neuralnetwork.BinaryEncoder;

/**
 * Provides unit tests for the <code>BinaryEncoder</code> class.
 */
public final class BinaryEncoderTest
{
    /** Flag indicating whether test output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /**
     * Test the <code>computeDigits()</code> method.
     */
    @Test
    public void computeDigits()
    {
        assertEquals(1, BinaryEncoder.computeDigits(0.0, 1.0));
        assertEquals(1, BinaryEncoder.computeDigits(1.0, 1.0));
        assertEquals(1, BinaryEncoder.computeDigits(2.0, 1.0));
        assertEquals(2, BinaryEncoder.computeDigits(3.0, 1.0));
        assertEquals(2, BinaryEncoder.computeDigits(4.0, 1.0));
        assertEquals(3, BinaryEncoder.computeDigits(4.5, 1.0));
        assertEquals(3, BinaryEncoder.computeDigits(5.0, 1.0));
        assertEquals(3, BinaryEncoder.computeDigits(6.0, 1.0));
        assertEquals(3, BinaryEncoder.computeDigits(7.0, 1.0));
        assertEquals(3, BinaryEncoder.computeDigits(8.0, 1.0));
        assertEquals(4, BinaryEncoder.computeDigits(9.0, 1.0));

        assertEquals(1, BinaryEncoder.computeDigits(0.0, 0.1));
        assertEquals(4, BinaryEncoder.computeDigits(1.0, 0.1));
        assertEquals(5, BinaryEncoder.computeDigits(2.0, 0.1));
        assertEquals(5, BinaryEncoder.computeDigits(3.0, 0.1));
        assertEquals(6, BinaryEncoder.computeDigits(4.0, 0.1));

        assertEquals(1, BinaryEncoder.computeDigits(0.0, 0.01));
        assertEquals(7, BinaryEncoder.computeDigits(1.0, 0.01));
        assertEquals(8, BinaryEncoder.computeDigits(2.0, 0.01));
        assertEquals(9, BinaryEncoder.computeDigits(3.0, 0.01));
        assertEquals(9, BinaryEncoder.computeDigits(4.0, 0.01));

        assertEquals(1, BinaryEncoder.computeDigits(0.0, 10.0));
        assertEquals(1, BinaryEncoder.computeDigits(1.0, 10.0));
        assertEquals(1, BinaryEncoder.computeDigits(2.0, 10.0));
        assertEquals(1, BinaryEncoder.computeDigits(3.0, 10.0));
        assertEquals(1, BinaryEncoder.computeDigits(4.0, 10.0));
        assertEquals(2, BinaryEncoder.computeDigits(30.0, 10.0));
        assertEquals(2, BinaryEncoder.computeDigits(40.0, 10.0));
    }

    /**
     * Test the <code>decode()</code> method.
     */
    @Test
    public void decodeDouble()
    {
        final double[] array = new double[4];
        array[0] = 0;
        array[1] = 0;
        array[2] = 1;
        array[3] = 1;

        final BinaryEncoder encoder = new BinaryEncoder(16);
        assertEquals(3.0, encoder.decode(array), 0.0);
    }

    /**
     * Test the <code>decode()</code> method.
     */
    @Test
    public void decodeDoubleNegative()
    {
        final double[] array = new double[4];
        array[0] = 0;
        array[1] = 0;
        array[2] = 1;
        array[3] = 1;

        final BinaryEncoder encoder = new BinaryEncoder(-8, 8, 1.0);
        assertThat(encoder.decode(array), is(-5.0));
    }

    /**
     * Test the <code>decode()</code> method.
     */
    @Test
    public void decodeString()
    {
        final BinaryEncoder encoder = new BinaryEncoder(16);
        assertThat(encoder.decode("0011"), is(3.0));
    }

    /**
     * Test the <code>decode()</code> method.
     */
    @Test
    public void decodeStringDelta()
    {
        {
            final BinaryEncoder encoder = new BinaryEncoder(0, 16, 1.0);
            assertEquals(3.0, encoder.decode("0011"), 0.0);
        }

        {
            final BinaryEncoder encoder = new BinaryEncoder(0, 16, 2.0);
            assertEquals(0.0, encoder.decode("0001"), 2.0);
        }

        {
            final BinaryEncoder encoder = new BinaryEncoder(0, 16, 0.5);
            assertEquals(3.0, encoder.decode("00110"), 0.0);
        }
    }

    /**
     * Test the <code>decode()</code> method.
     */
    @Test
    public void decodeStringNegative()
    {
        final BinaryEncoder encoder = new BinaryEncoder(-8, 8, 1.0);
        assertThat(encoder.decode("0011"), is(-5.0));
    }

    /**
     * Test the <code>encodeAsBitSet()</code> method.
     */
    @Test
    public void encodeAsBitSet()
    {
        int value = 6;
        final BinaryEncoder encoder = new BinaryEncoder(16);

        BitSet result = encoder.encodeAsBitSet(value);

        if (IS_VERBOSE)
        {
            System.out.println("result = " + result);
        }
        assertNotNull(result);

        assertFalse(result.get(0));
        assertTrue(result.get(1));
        assertTrue(result.get(2));
        assertFalse(result.get(3));

        value = 20; // > 16 outside range
        result = encoder.encodeAsBitSet(value);
        if (IS_VERBOSE)
        {
            System.out.println("result = " + result);
        }
        assertNotNull(result);

        // 0100 Best fit into 4 digits; ignores higher bits.
        assertFalse(result.get(0));
        assertFalse(result.get(1));
        assertTrue(result.get(2));
        assertFalse(result.get(3));
    }

    /**
     * Test the <code>encodeAsBitSet()</code> method.
     */
    @Test
    public void encodeAsBitSetNegative()
    {
        final int value = -5;
        final BinaryEncoder encoder = new BinaryEncoder(-8, 8, 1.0);

        final BitSet result = encoder.encodeAsBitSet(value);

        if (IS_VERBOSE)
        {
            System.out.println("result = " + result);
        }
        assertNotNull(result);

        assertTrue(result.get(0));
        assertTrue(result.get(1));
        assertFalse(result.get(2));
        assertFalse(result.get(3));
    }

    /**
     * Test the <code>encodeAsDoubleArray()</code> method.
     */
    @Test
    public void encodeAsDoubleArray()
    {
        double value = 5;
        final BinaryEncoder encoder = new BinaryEncoder(16);
        double[] result = encoder.encodeAsDoubleArray(value);

        if (IS_VERBOSE)
        {
            System.out.println("result = " + Arrays.toString(result));
        }

        assertNotNull(result);
        assertEquals(4, result.length);
        assertThat(result[0], is(0.0));
        assertThat(result[1], is(1.0));
        assertThat(result[2], is(0.0));
        assertThat(result[3], is(1.0));

        value = 20; // > 16 outside range
        result = encoder.encodeAsDoubleArray(value);
        if (IS_VERBOSE)
        {
            System.out.println("result = " + result);
        }
        assertNotNull(result);

        // 0100 Best fit into 4 digits; ignores higher bits
        assertEquals(4, result.length);
        assertThat(result[0], is(0.0));
        assertThat(result[1], is(1.0));
        assertThat(result[2], is(0.0));
        assertThat(result[3], is(0.0));
    }

    /**
     * Test the <code>encodeAsDoubleArray()</code> method.
     */
    @Test
    public void encodeAsDoubleArrayNegative()
    {
        final double value = -5;
        final BinaryEncoder encoder = new BinaryEncoder(-8, 8, 1.0);
        final double[] result = encoder.encodeAsDoubleArray(value);

        if (IS_VERBOSE)
        {
            System.out.println("result = " + Arrays.toString(result));
        }

        assertNotNull(result);
        assertEquals(4, result.length);
        assertThat(result[0], is(0.0));
        assertThat(result[1], is(0.0));
        assertThat(result[2], is(1.0));
        assertThat(result[3], is(1.0));
    }

    /**
     * Test the <code>encodeAsIntArray()</code> method.
     */
    @Test
    public void encodeAsIntArray()
    {
        int value = 5;
        BinaryEncoder encoder = new BinaryEncoder(16);
        int[] result = encoder.encodeAsIntArray(value);
        if (IS_VERBOSE)
        {
            System.out.println("result = " + Arrays.toString(result));
        }
        assertNotNull(result);
        assertEquals(4, result.length);
        assertEquals(0, result[0]);
        assertEquals(1, result[1]);
        assertEquals(0, result[2]);
        assertEquals(1, result[3]);

        value = 5;
        encoder = new BinaryEncoder(0, 16, 2);
        result = encoder.encodeAsIntArray(value);
        if (IS_VERBOSE)
        {
            System.out.println("result = " + Arrays.toString(result));
        }
        assertNotNull(result);
        assertEquals(3, result.length);
        assertEquals(0, result[0]);
        assertEquals(1, result[1]);
        assertEquals(0, result[2]);

        value = 5;
        encoder = new BinaryEncoder(0, 8, 0.1);
        result = encoder.encodeAsIntArray(value);
        if (IS_VERBOSE)
        {
            System.out.println("result = " + Arrays.toString(result));
        }
        assertNotNull(result);
        assertEquals(7, result.length);
        assertEquals(0, result[0]);
        assertEquals(1, result[1]);
        assertEquals(1, result[2]);
        assertEquals(0, result[3]);
        assertEquals(0, result[4]);
        assertEquals(1, result[5]);
        assertEquals(0, result[6]);
    }

    /**
     * Test the <code>encodeAsIntArray()</code> method.
     */
    @Test
    public void encodeAsIntArrayNegative()
    {
        final int value = -5;
        final BinaryEncoder encoder = new BinaryEncoder(-8, 8, 1.0);
        final int[] result = encoder.encodeAsIntArray(value);
        if (IS_VERBOSE)
        {
            System.out.println("result = " + Arrays.toString(result));
        }
        assertNotNull(result);
        assertEquals(4, result.length);
        assertEquals(0, result[0]);
        assertEquals(0, result[1]);
        assertEquals(1, result[2]);
        assertEquals(1, result[3]);
    }

    /**
     * Test the <code>encodeAsString()</code> method.
     */
    @Test
    public void encodeAsString()
    {
        int value = 3;
        BinaryEncoder encoder = new BinaryEncoder(16);
        String result = encoder.encodeAsString(value);
        if (IS_VERBOSE)
        {
            System.out.println("result = " + result);
        }
        assertNotNull(result);
        assertEquals("0011", result);

        value = 20; // > 16 outside range
        result = encoder.encodeAsString(value);
        if (IS_VERBOSE)
        {
            System.out.println("result = " + result);
        }
        assertNotNull(result);
        assertEquals("0100", result); // Best fit into 4 digits; ignores higher bits

        encoder = new BinaryEncoder(0.0, 360.0, 1.0);
        assertEquals(9, encoder.getLength());
        assertEquals("000000000", encoder.encodeAsString(0.0));
        assertEquals("000000001", encoder.encodeAsString(1.0));
        assertEquals("000101101", encoder.encodeAsString(45.0));
        assertEquals("001011010", encoder.encodeAsString(90.0));
        assertEquals("010110100", encoder.encodeAsString(180.0));
        assertEquals("101101000", encoder.encodeAsString(360.0));
    }

    /**
     * Test the <code>encodeAsString()</code> method.
     */
    @Test
    public void encodeAsStringNegative()
    {
        final int value = -5;
        final BinaryEncoder encoder = new BinaryEncoder(-8, 8, 1.0);
        final String result = encoder.encodeAsString(value);
        if (IS_VERBOSE)
        {
            System.out.println("result = " + result);
        }
        assertNotNull(result);
        assertEquals("0011", result);
    }

    /**
     * Test the <code>encodeAsBitSet()</code> method.
     */
    @Test
    public void encodeTiming()
    {
        final int max = 10000;
        final int value = 236;
        final BinaryEncoder encoder = new BinaryEncoder(256);

        long start = System.currentTimeMillis();

        for (int i = 0; i < max; i++)
        {
            encoder.encodeAsDoubleArray(value);
        }

        long end = System.currentTimeMillis();
        logElapsedTime("double array", start, end);

        start = System.currentTimeMillis();

        for (int i = 0; i < max; i++)
        {
            encoder.encodeAsIntArray(value);
        }

        end = System.currentTimeMillis();
        logElapsedTime("int array", start, end);

        start = System.currentTimeMillis();

        for (int i = 0; i < max; i++)
        {
            encoder.encodeAsBitSet(value);
        }

        end = System.currentTimeMillis();
        logElapsedTime("bit set", start, end);

        start = System.currentTimeMillis();

        for (int i = 0; i < max; i++)
        {
            encoder.encodeAsString(value);
        }

        end = System.currentTimeMillis();
        logElapsedTime("string", start, end);
    }

    /**
     * Test the <code>BinaryEncoder()</code> method.
     */
    @Test
    public void testConstructor3()
    {
        final BinaryEncoder encoder = new BinaryEncoder(0, 16, 1.0);
        assertThat(encoder.getMin(), is(0.0));
        assertThat(encoder.getMax(), is(16.0));
        assertThat(encoder.getDelta(), is(1.0));
        assertThat(encoder.getLength(), is(4));
    }

    /**
     * Test the <code>BinaryEncoder()</code> method.
     */
    @Test
    public void testConstructor3Negative()
    {
        final BinaryEncoder encoder = new BinaryEncoder(-8, 8, 1.0);
        assertThat(encoder.getMin(), is(-8.0));
        assertThat(encoder.getMax(), is(8.0));
        assertThat(encoder.getDelta(), is(1.0));
        assertThat(encoder.getLength(), is(4));
    }

    /**
     * @param title Title.
     * @param start Start time.
     * @param end End time.
     */
    private void logElapsedTime(final String title, final long start, final long end)
    {
        if (IS_VERBOSE)
        {
            System.out.println(title + " elapsed: " + (end - start) + " ms");
        }
    }
}
