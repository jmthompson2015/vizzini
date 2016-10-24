package org.vizzini.ai.neuralnetwork.format;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.ai.neuralnetwork.BooleanInputFilter;

/**
 * Provides tests for the <code>CSVBooleanInputFilterFormat</code> class.
 */
public final class CSVBooleanInputFilterFormatTest
{

    /** Formatter. */
    private final BooleanInputFilterFormat formatter = new CSVBooleanInputFilterFormat();

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void format()
    {
        final BooleanInputFilter filter = create();
        final String result = formatter.format(filter);

        assertNotNull(result);
        final String expected = "org.vizzini.ai.neuralnetwork.BooleanInputFilter";
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
        final BooleanInputFilter result = (BooleanInputFilter)formatter
                .parse("org.vizzini.ai.neuralnetwork.BooleanInputFilter");

        assertNotNull(result);
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseNull()
    {
        final BooleanInputFilter result0 = (BooleanInputFilter)formatter.parse(null);
        assertNull(result0);

        final BooleanInputFilter result1 = (BooleanInputFilter)formatter.parse("");
        assertNull(result1);

        final BooleanInputFilter result2 = (BooleanInputFilter)formatter.parse("null");
        assertNull(result2);
    }

    /**
     * Test the <code>format()</code> and <code>reverseFormat()</code> methods.
     */
    @Test
    public void roundTrip()
    {
        final BooleanInputFilter filter = create();
        final String result0 = formatter.format(filter);
        final BooleanInputFilter result1 = (BooleanInputFilter)formatter.parse(result0);
        final String result2 = formatter.format(result1);
        assertTrue(result1.equals(filter));
        assertThat(result2, is(result0));
    }

    /**
     * @return a new connector.
     */
    private BooleanInputFilter create()
    {
        final BooleanInputFilter answer = new BooleanInputFilter();

        return answer;
    }
}
