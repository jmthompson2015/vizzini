package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.Wave;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;

/**
 * Provides tests for the <code>Ship</code> class.
 */
public final class ShipTest
{
    /**
     * Test the <code>isInPrimaryFiringArc()</code> method.
     */
    @Test
    public void isInPrimaryFiringArcXWingTieFighter()
    {
        // Setup.
        final Ship ship = Ship.X_WING;
        final SSPosition fromPosition = new SSPosition(0, 450, 0);
        final Ship target = Ship.TIE_FIGHTER;

        // Run / Verify.
        assertTrue(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, 0))); // 0
        assertTrue(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, 100))); // 45
        assertTrue(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, 142))); // 45
        assertFalse(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, 143))); // 46
        assertFalse(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 0, 100))); // 76

        assertTrue(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, -100))); // 315
        assertTrue(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, -142))); // 315
        assertFalse(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, -143))); // 314
    }

    /**
     * Test the <code>isInPrimaryFiringArc()</code> method.
     */
    @Test
    public void isInPrimaryFiringArcYT1300TieFighter()
    {
        // Setup.
        final Ship ship = Ship.YT_1300;
        final SSPosition fromPosition = new SSPosition(0, 450, 0);
        final Ship target = Ship.TIE_FIGHTER;

        // Run / Verify.
        assertTrue(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, 0))); // 0
        assertTrue(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, 100))); // 45
        assertTrue(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, 142))); // 45
        assertFalse(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, 143))); // 46
        assertFalse(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 0, 100))); // 76

        assertTrue(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, -100))); // 315
        assertTrue(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, -142))); // 315
        assertFalse(ship.isInPrimaryFiringArc(fromPosition, target, createPosition(fromPosition, 100, -143))); // 314
    }

    /**
     * Test the <code>isVulnerableToPrimary()</code> method.
     */
    @Test
    public void isVulnerableToPrimaryXWingTieFighter()
    {
        // Setup.
        final Ship ship = Ship.X_WING;
        final SSPosition fromPosition = new SSPosition(0, 450, 0);
        final Ship target = Ship.TIE_FIGHTER;

        // Run / Verify.
        assertTrue(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, 0))); // 0
        assertTrue(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, 100))); // 45
        assertTrue(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, 142))); // 45
        assertFalse(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, 143))); // 46
        assertFalse(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 0, 100))); // 76

        assertTrue(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, -100))); // 315
        assertTrue(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, -142))); // 315
        assertFalse(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, -143))); // 314
    }

    /**
     * Test the <code>isVulnerableToPrimary()</code> method.
     */
    @Test
    public void isVulnerableToPrimaryYT1300TieFighter()
    {
        // Setup.
        final Ship ship = Ship.YT_1300;
        final SSPosition fromPosition = new SSPosition(0, 450, 0);
        final Ship target = Ship.TIE_FIGHTER;

        // Run / Verify.
        assertTrue(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, 0))); // 0
        assertTrue(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, 100))); // 45
        assertTrue(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, 142))); // 45
        assertTrue(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, 143))); // 46
        assertTrue(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 0, 100))); // 76

        assertTrue(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, -100))); // 315
        assertTrue(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, -142))); // 315
        assertTrue(ship.isVulnerableToPrimary(fromPosition, target, createPosition(fromPosition, 100, -143))); // 314
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        // Setup.

        // Run.
        final Ship[] result = Ship.values();

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(18));
        assertThat(result[0].getName(), is("A-Wing"));
        assertThat(result[11].getName(), is("TIE Fighter"));
        assertThat(result[14].getName(), is("X-Wing"));
        assertThat(result[16].getName(), is("YT-1300"));
        assertThat(result[17].getName(), is("Z-95 Headhunter"));
    }

    /**
     * Test the <code>valuesByTeam()</code> method.
     */
    @Test
    public void valuesByTeamImperial()
    {
        // Run.
        final Ship[] result = Ship.valuesByTeam(SSTeam.IMPERIAL);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(10));
        assertThat(result[0], is(Ship.FIRESPRAY_31));
        assertThat(result[9], is(Ship.TIE_PHANTOM));
    }

    /**
     * Test the <code>valuesByTeam()</code> method.
     */
    @Test
    public void valuesByTeamRebel()
    {
        // Run.
        final Ship[] result = Ship.valuesByTeam(SSTeam.REBEL);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(8));
        assertThat(result[0], is(Ship.A_WING));
        assertThat(result[7], is(Ship.Z_95_HEADHUNTER));
    }

    /**
     * Test the <code>valuesByWave()</code> method.
     */
    @Test
    public void valuesByWaveCore()
    {
        // Run.
        final Ship[] result = Ship.valuesByWave(Wave.CORE);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(2));
        assertThat(result[0], is(Ship.TIE_FIGHTER));
        assertThat(result[1], is(Ship.X_WING));
    }

    /**
     * Test the <code>valuesByWave()</code> method.
     */
    @Test
    public void valuesByWaveFour()
    {
        // Run.
        final Ship[] result = Ship.valuesByWave(Wave.FOUR);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(4));
        assertThat(result[0], is(Ship.E_WING));
        assertThat(result[1], is(Ship.TIE_DEFENDER));
        assertThat(result[2], is(Ship.TIE_PHANTOM));
        assertThat(result[3], is(Ship.Z_95_HEADHUNTER));
    }

    /**
     * Test the <code>valuesByWave()</code> method.
     */
    @Test
    public void valuesByWaveOne()
    {
        // Run.
        final Ship[] result = Ship.valuesByWave(Wave.ONE);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(2));
        assertThat(result[0], is(Ship.TIE_ADVANCED));
        assertThat(result[1], is(Ship.Y_WING));
    }

    /**
     * Test the <code>valuesByWave()</code> method.
     */
    @Test
    public void valuesByWaveThree()
    {
        // Run.
        final Ship[] result = Ship.valuesByWave(Wave.THREE);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(4));
        assertThat(result[0], is(Ship.B_WING));
        assertThat(result[1], is(Ship.HWK_290));
        assertThat(result[2], is(Ship.LAMBDA_CLASS_SHUTTLE));
        assertThat(result[3], is(Ship.TIE_BOMBER));
    }

    /**
     * Test the <code>valuesByWave()</code> method.
     */
    @Test
    public void valuesByWaveTwo()
    {
        // Run.
        final Ship[] result = Ship.valuesByWave(Wave.TWO);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(4));
        assertThat(result[0], is(Ship.A_WING));
        assertThat(result[1], is(Ship.FIRESPRAY_31));
        assertThat(result[2], is(Ship.TIE_INTERCEPTOR));
        assertThat(result[3], is(Ship.YT_1300));
    }

    /**
     * @param fromPosition From position.
     * @param dx Delta X.
     * @param dy Delta Y.
     * 
     * @return a new position.
     */
    private SSPosition createPosition(final SSPosition fromPosition, final int dx, final int dy)
    {
        return new SSPosition(fromPosition.getX() + dx, fromPosition.getY() + dy, 0);
    }
}
