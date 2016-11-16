package org.vizzini.illyriad;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>Region</code> class.
 */
public final class RegionTest
{
    /**
     * Test the <code>getDisplayName()</code> method.
     */
    @Test
    public void getDisplayName()
    {
        assertThat(Region.ARRAN.getDisplayName(), is("Arran"));
        assertThat(Region.LAN_LAROSH.getDisplayName(), is("Lan Larosh"));
    }

    /**
     * Test the <code>getId()</code> method.
     */
    @Test
    public void getId()
    {
        assertThat(Region.ARRAN.getId(), is(25));
        assertThat(Region.LAN_LAROSH.getId(), is(24));
    }

    /**
     * Test the <code>isInBrokenLands()</code> method.
     */
    @Test
    public void isInBrokenLands()
    {
        assertFalse(Region.AZURA.isInBrokenLands());
        assertFalse(Region.KEPPEN.isInBrokenLands());
        assertFalse(Region.LAN_LAROSH.isInBrokenLands());

        assertTrue(Region.HIGH_HILLS.isInBrokenLands());
        assertTrue(Region.NEWLANDS.isInBrokenLands());
        assertTrue(Region.VINDOREL.isInBrokenLands());

        // Ocean is in both.
        assertTrue(Region.OCEAN.isInBrokenLands());
    }

    /**
     * Test the <code>isInElgea()</code> method.
     */
    @Test
    public void isInElgea()
    {
        assertTrue(Region.AZURA.isInElgea());
        assertTrue(Region.KEPPEN.isInElgea());
        assertTrue(Region.LAN_LAROSH.isInElgea());

        assertFalse(Region.HIGH_HILLS.isInElgea());
        assertFalse(Region.NEWLANDS.isInElgea());
        assertFalse(Region.VINDOREL.isInElgea());

        // Ocean is in both.
        assertTrue(Region.OCEAN.isInElgea());
    }

    /**
     * Test the <code>maybeContains()</code> method.
     */
    @Test
    public void maybeContains()
    {
        assertFalse(Region.MIDDLE_KINGDOM.maybeContains(-234, -218));
        assertFalse(Region.MIDDLE_KINGDOM.maybeContains(-233, -219));
        assertTrue(Region.MIDDLE_KINGDOM.maybeContains(-233, -218));
        assertTrue(Region.MIDDLE_KINGDOM.maybeContains(0, 0));
        assertTrue(Region.MIDDLE_KINGDOM.maybeContains(329, 261));
        assertFalse(Region.MIDDLE_KINGDOM.maybeContains(330, 261));
        assertFalse(Region.MIDDLE_KINGDOM.maybeContains(329, 262));

        assertFalse(Region.THE_LONG_WHITE.maybeContains(-997, -3300));
        assertFalse(Region.THE_LONG_WHITE.maybeContains(-996, -3301));
        assertTrue(Region.THE_LONG_WHITE.maybeContains(-996, -3300));
        assertTrue(Region.THE_LONG_WHITE.maybeContains(0, -3200));
        assertTrue(Region.THE_LONG_WHITE.maybeContains(278, -3088));
        assertFalse(Region.THE_LONG_WHITE.maybeContains(279, -3088));
        assertFalse(Region.THE_LONG_WHITE.maybeContains(278, -3087));
    }

    /**
     * Test the <code>valueOfDisplayName()</code> method.
     */
    @Test
    public void valueOfDisplayName()
    {
        assertThat(Region.valueOfDisplayName("Arran"), is(Region.ARRAN));
        assertThat(Region.valueOfDisplayName("Lan Larosh"), is(Region.LAN_LAROSH));
    }

    /**
     * Test the <code>valueOfId()</code> method.
     */
    @Test
    public void valueOfId()
    {
        assertThat(Region.valueOfId(25), is(Region.ARRAN));
        assertThat(Region.valueOfId(24), is(Region.LAN_LAROSH));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        assertThat(Region.values().length, is(77));
    }

    /**
     * Test the <code>valuesBrokenLands()</code> method.
     */
    @Test
    public void valuesBrokenLands()
    {
        assertThat(Region.valuesBrokenLands().length, is(40));
    }

    /**
     * Test the <code>valuesElgea()</code> method.
     */
    @Test
    public void valuesElgea()
    {
        assertThat(Region.valuesElgea().length, is(38));
    }
}
