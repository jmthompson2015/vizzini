package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ManeuverSet;
import org.vizzini.starfightersquadrons.Maneuver.Bearing;

/**
 * Provides tests for the <code>ManeuverSet</code> class.
 */
public final class ManeuverSetTest
{
    /**
     * Test the <code>contains()</code> method.
     */
    @Test
    public void containsTieFighter()
    {
        // Setup.
        final ManeuverSet result = ManeuverSet.TIE_FIGHTER_MANEUVERS;

        // Run / Verify.
        assertNotNull(result);
        assertThat(result.size(), is(16));

        assertTrue(result.contains(Maneuver.TURN_LEFT_1_STANDARD));
        assertTrue(result.contains(Maneuver.TURN_RIGHT_1_STANDARD));

        assertTrue(result.contains(Maneuver.TURN_LEFT_2_STANDARD));
        assertTrue(result.contains(Maneuver.BANK_LEFT_2_EASY));
        assertTrue(result.contains(Maneuver.STRAIGHT_2_EASY));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_2_EASY));
        assertTrue(result.contains(Maneuver.TURN_RIGHT_2_STANDARD));

        assertTrue(result.contains(Maneuver.TURN_LEFT_3_STANDARD));
        assertTrue(result.contains(Maneuver.BANK_LEFT_3_STANDARD));
        assertTrue(result.contains(Maneuver.STRAIGHT_3_EASY));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_3_STANDARD));
        assertTrue(result.contains(Maneuver.TURN_RIGHT_3_STANDARD));
        assertTrue(result.contains(Maneuver.KOIOGRAN_TURN_3_HARD));

        assertTrue(result.contains(Maneuver.STRAIGHT_4_STANDARD));
        assertTrue(result.contains(Maneuver.KOIOGRAN_TURN_4_HARD));

        assertTrue(result.contains(Maneuver.STRAIGHT_5_STANDARD));
    }

    /**
     * Test the <code>contains()</code> method.
     */
    @Test
    public void containsXWing()
    {
        // Setup.
        final ManeuverSet result = ManeuverSet.X_WING_MANEUVERS;

        // Run / Verify.
        assertNotNull(result);
        assertThat(result.size(), is(15));

        assertTrue(result.contains(Maneuver.BANK_LEFT_1_EASY));
        assertTrue(result.contains(Maneuver.STRAIGHT_1_EASY));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_1_EASY));

        assertTrue(result.contains(Maneuver.TURN_LEFT_2_STANDARD));
        assertTrue(result.contains(Maneuver.BANK_LEFT_2_STANDARD));
        assertTrue(result.contains(Maneuver.STRAIGHT_2_EASY));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_2_STANDARD));
        assertTrue(result.contains(Maneuver.TURN_RIGHT_2_STANDARD));

        assertTrue(result.contains(Maneuver.TURN_LEFT_3_STANDARD));
        assertTrue(result.contains(Maneuver.BANK_LEFT_3_STANDARD));
        assertTrue(result.contains(Maneuver.STRAIGHT_3_STANDARD));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_3_STANDARD));
        assertTrue(result.contains(Maneuver.TURN_RIGHT_3_STANDARD));

        assertTrue(result.contains(Maneuver.STRAIGHT_4_STANDARD));
        assertTrue(result.contains(Maneuver.KOIOGRAN_TURN_4_HARD));
    }

    /**
     * Test the <code>findByBearingAndSpeed()</code> method.
     */
    @Test
    public void findByBearingAndSpeed()
    {
        // Setup.
        final ManeuverSet set = ManeuverSet.TIE_FIGHTER_MANEUVERS;

        // Run / Verify.
        assertNotNull(set.findByBearingAndSpeed(Bearing.TURN_LEFT, 1));
        assertNull(set.findByBearingAndSpeed(Bearing.BANK_LEFT, 1));
        assertNull(set.findByBearingAndSpeed(Bearing.STRAIGHT, 1));
        assertNull(set.findByBearingAndSpeed(Bearing.BANK_RIGHT, 1));
        assertNotNull(set.findByBearingAndSpeed(Bearing.TURN_RIGHT, 1));
        assertNull(set.findByBearingAndSpeed(Bearing.KOIOGRAN_TURN, 1));

        assertNotNull(set.findByBearingAndSpeed(Bearing.TURN_LEFT, 2));
        assertNotNull(set.findByBearingAndSpeed(Bearing.BANK_LEFT, 2));
        assertNotNull(set.findByBearingAndSpeed(Bearing.STRAIGHT, 2));
        assertNotNull(set.findByBearingAndSpeed(Bearing.BANK_RIGHT, 2));
        assertNotNull(set.findByBearingAndSpeed(Bearing.TURN_RIGHT, 2));
        assertNull(set.findByBearingAndSpeed(Bearing.KOIOGRAN_TURN, 2));

        assertNotNull(set.findByBearingAndSpeed(Bearing.TURN_LEFT, 3));
        assertNotNull(set.findByBearingAndSpeed(Bearing.BANK_LEFT, 3));
        assertNotNull(set.findByBearingAndSpeed(Bearing.STRAIGHT, 3));
        assertNotNull(set.findByBearingAndSpeed(Bearing.BANK_RIGHT, 3));
        assertNotNull(set.findByBearingAndSpeed(Bearing.TURN_RIGHT, 3));
        assertNotNull(set.findByBearingAndSpeed(Bearing.KOIOGRAN_TURN, 3));

        assertNotNull(set.findByBearingAndSpeed(Bearing.STRAIGHT, 4));
        assertNotNull(set.findByBearingAndSpeed(Bearing.KOIOGRAN_TURN, 4));

        assertNotNull(set.findByBearingAndSpeed(Bearing.STRAIGHT, 5));
        assertNull(set.findByBearingAndSpeed(Bearing.KOIOGRAN_TURN, 5));
    }

    /**
     * Test the <code>getEasyManeuvers()</code> method.
     */
    @Test
    public void getEasyManeuversTieFighter()
    {
        // Setup.
        final ManeuverSet maneuvers = ManeuverSet.TIE_FIGHTER_MANEUVERS;

        // Run.
        final ManeuverSet result = maneuvers.getEasyManeuvers();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(4));

        assertTrue(result.contains(Maneuver.BANK_LEFT_2_EASY));
        assertTrue(result.contains(Maneuver.STRAIGHT_2_EASY));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_2_EASY));

        assertTrue(result.contains(Maneuver.STRAIGHT_3_EASY));
    }

    /**
     * Test the <code>getNonHardManeuvers()</code> method.
     */
    @Test
    public void getManeuversFirespray31()
    {
        // Run.
        final ManeuverSet result = ManeuverSet.FIRESPRAY_31_MANEUVERS;

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(16));

        assertTrue(result.contains(Maneuver.BANK_LEFT_1_EASY));
        assertTrue(result.contains(Maneuver.STRAIGHT_1_EASY));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_1_EASY));

        assertTrue(result.contains(Maneuver.TURN_LEFT_2_STANDARD));
        assertTrue(result.contains(Maneuver.BANK_LEFT_2_STANDARD));
        assertTrue(result.contains(Maneuver.STRAIGHT_2_EASY));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_2_STANDARD));
        assertTrue(result.contains(Maneuver.TURN_RIGHT_2_STANDARD));

        assertTrue(result.contains(Maneuver.TURN_LEFT_3_STANDARD));
        assertTrue(result.contains(Maneuver.BANK_LEFT_3_STANDARD));
        assertTrue(result.contains(Maneuver.STRAIGHT_3_STANDARD));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_3_STANDARD));
        assertTrue(result.contains(Maneuver.TURN_RIGHT_3_STANDARD));
        assertTrue(result.contains(Maneuver.KOIOGRAN_TURN_3_HARD));

        assertTrue(result.contains(Maneuver.STRAIGHT_4_STANDARD));
        assertTrue(result.contains(Maneuver.KOIOGRAN_TURN_4_HARD));
    }

    /**
     * Test the <code>getMaximumSpeed()</code> method.
     */
    @Test
    public void getMaximumSpeedLambdaClassShuttle()
    {
        // Setup.
        final ManeuverSet maneuvers = ManeuverSet.LAMBDA_CLASS_SHUTTLE_MANEUVERS;

        // Run.
        final int result = maneuvers.getMaximumSpeed();

        // Verify.
        assertThat(result, is(3));
    }

    /**
     * Test the <code>getMaximumSpeed()</code> method.
     */
    @Test
    public void getMaximumSpeedTieFighter()
    {
        // Setup.
        final ManeuverSet maneuvers = ManeuverSet.TIE_FIGHTER_MANEUVERS;

        // Run.
        final int result = maneuvers.getMaximumSpeed();

        // Verify.
        assertThat(result, is(5));
    }

    /**
     * Test the <code>getMinimumSpeed()</code> method.
     */
    @Test
    public void getMinimumSpeedLambdaClassShuttle()
    {
        // Setup.
        final ManeuverSet maneuvers = ManeuverSet.LAMBDA_CLASS_SHUTTLE_MANEUVERS;

        // Run.
        final int result = maneuvers.getMinimumSpeed();

        // Verify.
        assertThat(result, is(0));
    }

    /**
     * Test the <code>getMinimumSpeed()</code> method.
     */
    @Test
    public void getMinimumSpeedTieFighter()
    {
        // Setup.
        final ManeuverSet maneuvers = ManeuverSet.TIE_FIGHTER_MANEUVERS;

        // Run.
        final int result = maneuvers.getMinimumSpeed();

        // Verify.
        assertThat(result, is(1));
    }

    /**
     * Test the <code>getNonHardManeuvers()</code> method.
     */
    @Test
    public void getNonHardManeuversFirespray31()
    {
        // Setup.
        final ManeuverSet maneuvers = ManeuverSet.FIRESPRAY_31_MANEUVERS;

        // Run.
        final ManeuverSet result = maneuvers.getNonHardManeuvers();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(14));

        assertTrue(result.contains(Maneuver.BANK_LEFT_1_EASY));
        assertTrue(result.contains(Maneuver.STRAIGHT_1_EASY));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_1_EASY));

        assertTrue(result.contains(Maneuver.TURN_LEFT_2_STANDARD));
        assertTrue(result.contains(Maneuver.BANK_LEFT_2_STANDARD));
        assertTrue(result.contains(Maneuver.STRAIGHT_2_EASY));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_2_STANDARD));
        assertTrue(result.contains(Maneuver.TURN_RIGHT_2_STANDARD));

        assertTrue(result.contains(Maneuver.TURN_LEFT_3_STANDARD));
        assertTrue(result.contains(Maneuver.BANK_LEFT_3_STANDARD));
        assertTrue(result.contains(Maneuver.STRAIGHT_3_STANDARD));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_3_STANDARD));
        assertTrue(result.contains(Maneuver.TURN_RIGHT_3_STANDARD));

        assertTrue(result.contains(Maneuver.STRAIGHT_4_STANDARD));
    }

    /**
     * Test the <code>getNonHardManeuvers()</code> method.
     */
    @Test
    public void getNonHardManeuversTieFighter()
    {
        // Setup.
        final ManeuverSet maneuvers = ManeuverSet.TIE_FIGHTER_MANEUVERS;

        // Run.
        final ManeuverSet result = maneuvers.getNonHardManeuvers();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(14));

        assertTrue(result.contains(Maneuver.TURN_LEFT_1_STANDARD));
        assertTrue(result.contains(Maneuver.TURN_RIGHT_1_STANDARD));

        assertTrue(result.contains(Maneuver.TURN_LEFT_2_STANDARD));
        assertTrue(result.contains(Maneuver.BANK_LEFT_2_EASY));
        assertTrue(result.contains(Maneuver.STRAIGHT_2_EASY));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_2_EASY));
        assertTrue(result.contains(Maneuver.TURN_RIGHT_2_STANDARD));

        assertTrue(result.contains(Maneuver.TURN_LEFT_3_STANDARD));
        assertTrue(result.contains(Maneuver.BANK_LEFT_3_STANDARD));
        assertTrue(result.contains(Maneuver.STRAIGHT_3_EASY));
        assertTrue(result.contains(Maneuver.BANK_RIGHT_3_STANDARD));
        assertTrue(result.contains(Maneuver.TURN_RIGHT_3_STANDARD));

        assertTrue(result.contains(Maneuver.STRAIGHT_4_STANDARD));

        assertTrue(result.contains(Maneuver.STRAIGHT_5_STANDARD));
    }

    /**
     * Test the <code>valuesByBearing()</code> method.
     */
    @Test
    public void valuesByBearingTieFighter()
    {
        // Setup.
        final ManeuverSet set = ManeuverSet.TIE_FIGHTER_MANEUVERS;

        // Run / Verify.
        assertThat(set.valuesByBearing(Bearing.TURN_LEFT).size(), is(3));
        assertThat(set.valuesByBearing(Bearing.BANK_LEFT).size(), is(2));
        assertThat(set.valuesByBearing(Bearing.STRAIGHT).size(), is(4));
        assertThat(set.valuesByBearing(Bearing.BANK_RIGHT).size(), is(2));
        assertThat(set.valuesByBearing(Bearing.TURN_RIGHT).size(), is(3));
        assertThat(set.valuesByBearing(Bearing.KOIOGRAN_TURN).size(), is(2));
    }

    /**
     * Test the <code>valuesByBearing()</code> method.
     */
    @Test
    public void valuesByBearingXWing()
    {
        // Setup.
        final ManeuverSet set = ManeuverSet.X_WING_MANEUVERS;

        // Run / Verify.
        assertThat(set.valuesByBearing(Bearing.TURN_LEFT).size(), is(2));
        assertThat(set.valuesByBearing(Bearing.BANK_LEFT).size(), is(3));
        assertThat(set.valuesByBearing(Bearing.STRAIGHT).size(), is(4));
        assertThat(set.valuesByBearing(Bearing.BANK_RIGHT).size(), is(3));
        assertThat(set.valuesByBearing(Bearing.TURN_RIGHT).size(), is(2));
        assertThat(set.valuesByBearing(Bearing.KOIOGRAN_TURN).size(), is(1));
    }

    /**
     * Test the <code>valuesBySpeed()</code> method.
     */
    @Test
    public void valuesBySpeedXWing()
    {
        // Setup.
        final ManeuverSet set = ManeuverSet.X_WING_MANEUVERS;

        // Run / Verify.
        assertThat(set.valuesBySpeed(1).size(), is(3));
        assertThat(set.valuesBySpeed(2).size(), is(5));
        assertThat(set.valuesBySpeed(3).size(), is(5));
        assertThat(set.valuesBySpeed(4).size(), is(2));
        assertThat(set.valuesBySpeed(5).size(), is(0));
    }
}
