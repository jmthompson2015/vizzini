package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.ai.neuralnetwork.MaxOutputValueIndexFilter;

/**
 * Provides unit tests for the <code>MaxOutputValueIndexFilter</code> class.
 */
public final class MaxOutputValueIndexFilterTest
{
    /** Filter. */
    private final MaxOutputValueIndexFilter filter0 = new MaxOutputValueIndexFilter();

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter()
    {
        final double[] input = new double[5];
        input[0] = 0.1;
        input[1] = -0.2;
        input[2] = 0.9;
        input[3] = -0.4;
        input[4] = 0.8;

        final Integer result = filter0.filter(input);

        assertNotNull(result);
        assertThat(result, is(2));
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
        try
        {
            filter0.reverseFilter(2);
        }
        catch (final RuntimeException e)
        {
            assertThat(e.getMessage(), is("Error: reverse filter data not available"));
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
}
