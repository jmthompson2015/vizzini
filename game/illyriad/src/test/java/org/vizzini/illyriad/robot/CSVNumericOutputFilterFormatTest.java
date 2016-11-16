package org.vizzini.illyriad.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>CSVNumericOutputFilterFormat</code> class.
 */
public final class CSVNumericOutputFilterFormatTest
{
    /** Formatter. */
    private final CSVNumericOutputFilterFormat formatter = new CSVNumericOutputFilterFormat();

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void format()
    {
        final NumericOutputFilter filter = new NumericOutputFilter();
        final String result = formatter.format(filter);

        assertNotNull(result);
        final String expected = "org.vizzini.illyriad.robot.NumericOutputFilter";
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
        final NumericOutputFilter result = formatter.parse("org.vizzini.illyriad.robot.NumericOutputFilter, 3, 4");

        assertNotNull(result);
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseNull()
    {
        final NumericOutputFilter result0 = formatter.parse(null);
        assertNull(result0);

        final NumericOutputFilter result1 = formatter.parse("");
        assertNull(result1);
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void roundTrip()
    {
        final NumericOutputFilter filter = new NumericOutputFilter();
        final String result0 = formatter.format(filter);
        final NumericOutputFilter result1 = formatter.parse(result0);
        final String result2 = formatter.format(result1);
        assertTrue(result1.equals(filter));
        assertThat(result2, is(result0));
    }
}
