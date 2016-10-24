package org.vizzini.illyriad.robot.market;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>PriceImageFilterConfiguration</code> class.
 */
public final class PriceImageFilterConfigurationTest
{
    /**
     * Test the <code>PriceImageFilterConfiguration()</code> method.
     */
    @Test
    public void testConstructorArrays()
    {
        final boolean isNormalized0 = false;
        final Float[] scaleFactors = { 1.0f, 2.0f, 3.0f, };
        final Float[] offsets = { 4.0f, 5.0f, 6.0f, };
        final boolean isNormalized1 = true;
        final double trimColorScale = 7.0;
        final double blackAndWhiteColorScale = 8.0;

        final PriceImageFilterConfiguration result = new PriceImageFilterConfiguration(isNormalized0, scaleFactors,
                offsets, isNormalized1, trimColorScale, blackAndWhiteColorScale);

        assertThat(result.isNormalized0(), is(false));
        assertThat(result.getScaleFactors()[0], is(1.0f));
        assertThat(result.getScaleFactors()[1], is(2.0f));
        assertThat(result.getScaleFactors()[2], is(3.0f));
        assertThat(result.getOffsets()[0], is(4.0f));
        assertThat(result.getOffsets()[1], is(5.0f));
        assertThat(result.getOffsets()[2], is(6.0f));
        assertThat(result.isNormalized1(), is(true));
        assertThat(result.getTrimColorScale(), is(7.0));
        assertThat(result.getBlackAndWhiteColorScale(), is(8.0));
    }

    /**
     * Test the <code>PriceImageFilterConfiguration()</code> method.
     */
    @Test
    public void testConstructorArraysNull()
    {
        final boolean isNormalized0 = false;
        final Float[] scaleFactors = { 1.0f, 2.0f, 3.0f, };
        final Float[] offsets = { 4.0f, 5.0f, 6.0f, };
        final boolean isNormalized1 = true;
        final double trimColorScale = 7.0;
        final double blackAndWhiteColorScale = 8.0;

        try
        {
            new PriceImageFilterConfiguration(isNormalized0, null, offsets, isNormalized1, trimColorScale,
                    blackAndWhiteColorScale);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("scaleFactors is null"));
        }

        try
        {
            new PriceImageFilterConfiguration(isNormalized0, scaleFactors, null, isNormalized1, trimColorScale,
                    blackAndWhiteColorScale);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("offsets is null"));
        }
    }

    /**
     * Test the <code>PriceImageFilterConfiguration()</code> method.
     */
    @Test
    public void testConstructorScalars()
    {
        final boolean isNormalized0 = false;
        final float scaleFactor = 1.0f;
        final float offset = 2.0f;
        final boolean isNormalized1 = true;
        final double trimColorScale = 3.0;
        final double blackAndWhiteColorScale = 4.0;

        final PriceImageFilterConfiguration result = new PriceImageFilterConfiguration(isNormalized0, scaleFactor,
                offset, isNormalized1, trimColorScale, blackAndWhiteColorScale);

        assertThat(result.isNormalized0(), is(false));
        assertThat(result.getScaleFactor(), is(1.0f));
        assertThat(result.getOffset(), is(2.0f));
        assertThat(result.isNormalized1(), is(true));
        assertThat(result.getTrimColorScale(), is(3.0));
        assertThat(result.getBlackAndWhiteColorScale(), is(4.0));
    }
}
