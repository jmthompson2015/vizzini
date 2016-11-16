package org.vizzini.illyriad;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>TradeHub</code> class.
 */
public final class TradeHubTest
{
    /**
     * Test the <code>computeDistance()</code> method.
     */
    @Test
    public void computeDistance()
    {
        final double result = TradeHub.CENTRUM.computeDistance(TradeHub.EARTHOLME);
        assertThat(String.format("%10.1f", result).trim(), is("702.0"));
    }

    /**
     * Test the <code>computeDistance()</code> method.
     */
    @Test
    public void computeDistanceCity()
    {
        double result = TradeHub.CENTRUM.computeDistance(City.LOCKSTONE);
        assertThat(String.format("%10.1f", result).trim(), is("710.5"));

        result = TradeHub.EARTHOLME.computeDistance(City.LOCKSTONE);
        assertThat(String.format("%10.1f", result).trim(), is("16.3"));

        result = TradeHub.GROVINTON.computeDistance(City.LOCKSTONE);
        assertThat(String.format("%10.1f", result).trim(), is("756.6"));

        result = TradeHub.STORMSTONE.computeDistance(City.LOCKSTONE);
        assertThat(String.format("%10.1f", result).trim(), is("685.9"));

        result = TradeHub.TILVERDALE.computeDistance(City.LOCKSTONE);
        assertThat(String.format("%10.1f", result).trim(), is("429.3"));
    }

    /**
     * Test the <code>getDisplayName()</code> method.
     */
    @Test
    public void getDisplayName()
    {
        assertThat(TradeHub.CENTRUM.getDisplayName(), is("Centrum"));
        assertThat(TradeHub.EARTHOLME.getDisplayName(), is("Eartholme"));
        assertThat(TradeHub.GROVINTON.getDisplayName(), is("Grovinton"));
        assertThat(TradeHub.KELSMOUTH.getDisplayName(), is("Kelsmouth"));
        assertThat(TradeHub.STORMSTONE.getDisplayName(), is("Stormstone"));
        assertThat(TradeHub.TILVERDALE.getDisplayName(), is("Tilverdale"));
    }

    /**
     * Test the <code>getX()</code> method.
     */
    @Test
    public void getX()
    {
        assertThat(TradeHub.CENTRUM.getX(), is(0));
        assertThat(TradeHub.EARTHOLME.getX(), is(-525));
        assertThat(TradeHub.GROVINTON.getX(), is(-145));
        assertThat(TradeHub.KELSMOUTH.getX(), is(-55));
        assertThat(TradeHub.STORMSTONE.getX(), is(-43));
        assertThat(TradeHub.TILVERDALE.getX(), is(-469));
    }

    /**
     * Test the <code>getY()</code> method.
     */
    @Test
    public void getY()
    {
        assertThat(TradeHub.CENTRUM.getY(), is(0));
        assertThat(TradeHub.EARTHOLME.getY(), is(-466));
        assertThat(TradeHub.GROVINTON.getY(), is(174));
        assertThat(TradeHub.KELSMOUTH.getY(), is(-853));
        assertThat(TradeHub.STORMSTONE.getY(), is(-973));
        assertThat(TradeHub.TILVERDALE.getY(), is(-56));
    }

    /**
     * Test the <code>isInBrokenLands()</code> method.
     */
    @Test
    public void isInBrokenLands()
    {
        assertFalse(TradeHub.CENTRUM.isInBrokenLands());
        assertFalse(TradeHub.STORMSTONE.isInBrokenLands());

        assertTrue(TradeHub.AELIF.isInBrokenLands());
        assertTrue(TradeHub.LANDINGSTOWN.isInBrokenLands());
    }

    /**
     * Test the <code>isInElgea()</code> method.
     */
    @Test
    public void isInElgea()
    {
        assertTrue(TradeHub.CENTRUM.isInElgea());
        assertTrue(TradeHub.STORMSTONE.isInElgea());

        assertFalse(TradeHub.AELIF.isInElgea());
        assertFalse(TradeHub.LANDINGSTOWN.isInElgea());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        assertThat(TradeHub.CENTRUM.toString(), is("Centrum"));
    }

    /**
     * Test the <code>valueOfDisplayName()</code> method.
     */
    @Test
    public void valueOfDisplayName()
    {
        assertThat(TradeHub.valueOfDisplayName("Centrum"), is(TradeHub.CENTRUM));
        assertThat(TradeHub.valueOfDisplayName("Eartholme"), is(TradeHub.EARTHOLME));
        assertThat(TradeHub.valueOfDisplayName("Grovinton"), is(TradeHub.GROVINTON));
        assertThat(TradeHub.valueOfDisplayName("Kelsmouth"), is(TradeHub.KELSMOUTH));
        assertThat(TradeHub.valueOfDisplayName("Stormstone"), is(TradeHub.STORMSTONE));
        assertThat(TradeHub.valueOfDisplayName("Tilverdale"), is(TradeHub.TILVERDALE));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        assertThat(TradeHub.values().length, is(253));
    }

    /**
     * Test the <code>valuesBrokenLands()</code> method.
     */
    @Test
    public void valuesBrokenLands()
    {
        assertThat(TradeHub.valuesBrokenLands().length, is(108));
    }

    /**
     * Test the <code>valuesElgea()</code> method.
     */
    @Test
    public void valuesElgea()
    {
        assertThat(TradeHub.valuesElgea().length, is(145));
    }
}
