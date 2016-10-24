package org.vizzini.ai.geneticalgorithm;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>GenerationEvent</code> class.
 */
public final class GenerationEventTest
{
    /**
     * Test the <code>GenerationEvent()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        // Setup.
        final Object source = "A";
        final int generationNumber = 12;
        final Double bestEval = 12.34;
        final Double averageEval = 23.45;
        final Double minEval = 34.56;
        final Double maxEval = 45.67;

        try
        {
            new GenerationEvent(null, generationNumber, bestEval, averageEval, minEval, maxEval);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("null source"));
        }

        try
        {
            new GenerationEvent(source, generationNumber, null, averageEval, minEval, maxEval);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("bestEval is null"));
        }

        try
        {
            new GenerationEvent(source, generationNumber, bestEval, null, minEval, maxEval);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("averageEval is null"));
        }

        try
        {
            new GenerationEvent(source, generationNumber, bestEval, averageEval, null, maxEval);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("minEval is null"));
        }

        try
        {
            new GenerationEvent(source, generationNumber, bestEval, averageEval, minEval, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("maxEval is null"));
        }
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        // Setup.
        final Object source = "A";
        final int generationNumber = 12;
        final Double bestEval = 12.34;
        final Double averageEval = 23.45;
        final Double minEval = 34.56;
        final Double maxEval = 45.67;
        final GenerationEvent event = new GenerationEvent(source, generationNumber, bestEval, averageEval, minEval,
                maxEval);

        // Run.
        final String result = event.toString();

        // Verify.
        assertNotNull(result);
        final String expected = " 12 bestEval =  12.3400 (ave =  23.4500 min =  34.5600)";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToStringLarge()
    {
        // Setup.
        final Object source = "A";
        final int generationNumber = 12;
        final Double bestEval = 12.34E12;
        final Double averageEval = 23.45E12;
        final Double minEval = 34.56E12;
        final Double maxEval = 45.67E12;
        final GenerationEvent event = new GenerationEvent(source, generationNumber, bestEval, averageEval, minEval,
                maxEval);

        // Run.
        final String result = event.toString();

        // Verify.
        assertNotNull(result);
        final String expected = " 12 bestEval = 1.2340E+13 (ave = 2.3450E+13 min = 3.4560E+13)";
        assertThat(result, is(expected));
    }
}
