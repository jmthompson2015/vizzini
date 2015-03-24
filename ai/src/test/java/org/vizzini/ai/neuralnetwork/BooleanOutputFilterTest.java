package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.ai.neuralnetwork.BooleanOutputFilter;

/**
 * Provides tests for the <code>BooleanOutputFilter</code> class.
 */
public final class BooleanOutputFilterTest
{
    /** Filter. */
    private final BooleanOutputFilter filter0 = new BooleanOutputFilter();

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter()
    {
        {
            final boolean[] result = filter0.filter(new double[] { 0.0, 0.0 });
            assertThat(result[0], is(false));
            assertThat(result[1], is(false));
        }

        {
            final boolean[] result = filter0.filter(new double[] { 1.0, 0.0 });
            assertThat(result[0], is(true));
            assertThat(result[1], is(false));
        }

        {
            final boolean[] result = filter0.filter(new double[] { 0.0, 1.0 });
            assertThat(result[0], is(false));
            assertThat(result[1], is(true));
        }

        {
            final boolean[] result = filter0.filter(new double[] { 1.0, 1.0 });
            assertThat(result[0], is(true));
            assertThat(result[1], is(true));
        }

        {
            final boolean[] result = filter0.filter(new double[] { 0.49, 0.50, 0.51 });
            assertThat(result[0], is(false));
            assertThat(result[1], is(false));
            assertThat(result[2], is(true));
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
    public void reverseFilter()
    {
        {
            final double[] result = filter0.reverseFilter(new boolean[] { false, false });
            assertThat(result[0], is(0.0));
            assertThat(result[1], is(0.0));
        }

        {
            final double[] result = filter0.reverseFilter(new boolean[] { true, false });
            assertThat(result[0], is(1.0));
            assertThat(result[1], is(0.0));
        }

        {
            final double[] result = filter0.reverseFilter(new boolean[] { false, true });
            assertThat(result[0], is(0.0));
            assertThat(result[1], is(1.0));
        }

        {
            final double[] result = filter0.reverseFilter(new boolean[] { true, true });
            assertThat(result[0], is(1.0));
            assertThat(result[1], is(1.0));
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
