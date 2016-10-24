package org.vizzini.starfightersquadrons;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.UpgradeCard.UpgradeRestriction;

/**
 * Provides tests for the <code>UpgradeRestriction</code> class.
 */
public final class UpgradeRestrictionTest
{
    /**
     * Test the <code>passes()</code> method.
     */
    @Test
    public void passesHwk290Only()
    {
        // Setup.
        final UpgradeRestriction restriction = UpgradeRestriction.HWK_290_ONLY;

        assertFalse(restriction.passes(Ship.TIE_FIGHTER));
        assertTrue(restriction.passes(Ship.HWK_290));
    }

    /**
     * Test the <code>passes()</code> method.
     */
    @Test
    public void passesImperialOnly()
    {
        // Setup.
        final UpgradeRestriction restriction = UpgradeRestriction.IMPERIAL_ONLY;

        assertTrue(restriction.passes(Ship.TIE_FIGHTER));
        assertFalse(restriction.passes(Ship.X_WING));
    }

    /**
     * Test the <code>passes()</code> method.
     */
    @Test
    public void passesLargeShipOnly()
    {
        // Setup.
        final UpgradeRestriction restriction = UpgradeRestriction.LARGE_SHIP_ONLY;

        assertFalse(restriction.passes(Ship.TIE_FIGHTER));
        assertTrue(restriction.passes(Ship.YT_1300));
    }

    /**
     * Test the <code>passes()</code> method.
     */
    @Test
    public void passesRebelOnly()
    {
        // Setup.
        final UpgradeRestriction restriction = UpgradeRestriction.REBEL_ONLY;

        assertFalse(restriction.passes(Ship.TIE_FIGHTER));
        assertTrue(restriction.passes(Ship.X_WING));
    }

    /**
     * Test the <code>passes()</code> method.
     */
    @Test
    public void passesTieInterceptorOnly()
    {
        // Setup.
        final UpgradeRestriction restriction = UpgradeRestriction.TIE_INTERCEPTOR_ONLY;

        assertTrue(restriction.passes(Ship.TIE_INTERCEPTOR));
        assertFalse(restriction.passes(Ship.X_WING));
    }
}
