package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.io.Reader;
import java.io.StringReader;
import java.util.BitSet;

import org.junit.Test;

/**
 * Provides tests for the <code>BitSetFormat</code> class.
 */
public final class BitSetFormatTest
{
    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void format()
    {
        // Setup.
        final BitSet bitSet = new BitSet();

        for (int i = 2; i <= 10; i += 2)
        {
            bitSet.set(i);
        }

        assertThat(bitSet.cardinality(), is(5));
        final BitSetFormat formatter = new BitSetFormat();

        // Run.
        final String result = formatter.format(bitSet);

        // Verify.
        assertNotNull(result);

        final String expected = "2\n4\n6\n8\n10\n";
        // System.out.println("expected =\n" + expected);
        // System.out.println("result   =\n" + result);

        assertThat(result, is(expected));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseReader()
    {
        // Setup.
        final String bitSetString = "2\n4\n6\n8\n10\n";
        final Reader reader = new StringReader(bitSetString);
        final BitSetFormat formatter = new BitSetFormat();

        // Run.
        final BitSet result = formatter.parse(reader);

        // Verify.
        verifyBitSet(result);
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseReaderNull()
    {
        // Setup.
        final BitSetFormat formatter = new BitSetFormat();

        try
        {
            // Run.
            final BitSet result = formatter.parse((Reader)null);

            // Verify.
            verifyBitSet(result);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("reader is null"));
        }
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseString()
    {
        // Setup.
        final String bitSetString = "2\n4\n6\n8\n10\n";
        final BitSetFormat formatter = new BitSetFormat();

        // Run.
        final BitSet result = formatter.parse(bitSetString);

        // Verify.
        verifyBitSet(result);
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseStringNull()
    {
        // Setup.
        final BitSetFormat formatter = new BitSetFormat();

        try
        {
            // Run.
            final BitSet result = formatter.parse((String)null);

            // Verify.
            verifyBitSet(result);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("source is null or empty"));
        }
    }

    /**
     * @param result Bit set.
     */
    private void verifyBitSet(final BitSet result)
    {
        assertNotNull(result);
        assertThat(result.cardinality(), is(5));

        for (int i = 1; i <= 10; i++)
        {
            assertThat("" + i, result.get(i), is((i % 2) == 0));
        }
    }
}
