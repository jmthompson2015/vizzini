package org.vizzini.ai.neuralnetwork.format;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.ai.neuralnetwork.LinearScalerFilter;

/**
 * Provides tests for the <code>CSVLinearScalerInputFilterFormat</code> class.
 */
public final class CSVLinearScalerInputFilterFormatTest
{
    /** First maximum input. */
    private static final double MAX_INPUT0 = 1.0;

    /** First maximum output. */
    private static final double MAX_OUTPUT0 = 0.5;

    /** First minimum input. */
    private static final double MIN_INPUT0 = -1.0;

    /** First minimum output. */
    private static final double MIN_OUTPUT0 = -0.5;

    /** Formatter. */
    private final LinearScalerInputFilterFormat formatter = new CSVLinearScalerInputFilterFormat();

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void format()
    {
        final LinearScalerFilter filter = create();
        final String result = formatter.format(filter);

        assertNotNull(result);
        final String expected = "org.vizzini.ai.neuralnetwork.LinearScalerFilter, -1.0, 1.0, -0.5, 0.5";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatNull()
    {
        final String result = formatter.format(null);
        assertNull(result);
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parse()
    {
        final LinearScalerFilter result = (LinearScalerFilter)formatter
                .parse("org.vizzini.ai.neuralnetwork.LinearScalerFilter, -1.0, 1.0, -0.5, 0.5");

        assertNotNull(result);
        assertThat(result.getMinInput(), is(-1.0));
        assertThat(result.getMaxInput(), is(1.0));
        assertThat(result.getMinOutput(), is(-0.5));
        assertThat(result.getMaxOutput(), is(0.5));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseNull()
    {
        final LinearScalerFilter result0 = (LinearScalerFilter)formatter.parse(null);
        assertNull(result0);

        final LinearScalerFilter result1 = (LinearScalerFilter)formatter.parse("");
        assertNull(result1);

        final LinearScalerFilter result2 = (LinearScalerFilter)formatter.parse("null");
        assertNull(result2);
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void roundTrip()
    {
        final LinearScalerFilter filter = create();
        final String result0 = formatter.format(filter);
        final LinearScalerFilter result1 = (LinearScalerFilter)formatter.parse(result0);
        final String result2 = formatter.format(result1);
        assertTrue(result1.equals(filter));
        assertThat(result2, is(result0));
    }

    /**
     * @return a new connector.
     */
    private LinearScalerFilter create()
    {
        final LinearScalerFilter answer = new LinearScalerFilter(MIN_INPUT0, MAX_INPUT0, MIN_OUTPUT0, MAX_OUTPUT0);

        return answer;
    }
}
