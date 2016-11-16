package org.vizzini.illyriad.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>CSVRobotImageInputFilterFormat</code> class.
 */
public final class CSVRobotImageInputFilterFormatTest
{
    /** Formatter. */
    private final CSVRobotImageInputFilterFormat formatter = new CSVRobotImageInputFilterFormat();

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatBlackAndWhite()
    {
        final RobotImageInputFilter filter = new BlackAndWhiteImageInputFilter(3, 4);
        final String result = formatter.format(filter);

        assertNotNull(result);
        final String expected = "org.vizzini.illyriad.robot.BlackAndWhiteImageInputFilter, 3, 4";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatGrayscale()
    {
        final RobotImageInputFilter filter = new GrayScaleImageInputFilter(3, 4);
        final String result = formatter.format(filter);

        assertNotNull(result);
        final String expected = "org.vizzini.illyriad.robot.GrayScaleImageInputFilter, 3, 4";
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
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatRGB()
    {
        final RobotImageInputFilter filter = new RGBImageInputFilter(3, 4);
        final String result = formatter.format(filter);

        assertNotNull(result);
        final String expected = "org.vizzini.illyriad.robot.RGBImageInputFilter, 3, 4";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseBlackAndWhite()
    {
        final RobotImageInputFilter result = formatter
                .parse("org.vizzini.illyriad.robot.BlackAndWhiteImageInputFilter, 3, 4");

        assertNotNull(result);
        assertThat(result, is(BlackAndWhiteImageInputFilter.class));
        assertThat(result.getMaxWidth(), is(3));
        assertThat(result.getMaxHeight(), is(4));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseGrayscale()
    {
        final RobotImageInputFilter result = formatter
                .parse("org.vizzini.illyriad.robot.GrayscaleImageInputFilter, 3, 4");

        assertNotNull(result);
        assertThat(result, is(GrayScaleImageInputFilter.class));
        assertThat(result.getMaxWidth(), is(3));
        assertThat(result.getMaxHeight(), is(4));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseNull()
    {
        final RobotImageInputFilter result0 = formatter.parse(null);
        assertNull(result0);

        final RobotImageInputFilter result1 = formatter.parse("");
        assertNull(result1);
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseRGB()
    {
        final RobotImageInputFilter result = formatter.parse("org.vizzini.illyriad.robot.RGBImageInputFilter, 3, 4");

        assertNotNull(result);
        assertThat(result, is(RGBImageInputFilter.class));
        assertThat(result.getMaxWidth(), is(3));
        assertThat(result.getMaxHeight(), is(4));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void roundTrip()
    {
        final RobotImageInputFilter filter = new BlackAndWhiteImageInputFilter(3, 4);
        final String result0 = formatter.format(filter);
        final RobotImageInputFilter result1 = formatter.parse(result0);
        final String result2 = formatter.format(result1);
        assertTrue(result1.equals(filter));
        assertThat(result2, is(result0));
    }
}
