package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Test;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.SquadBuilder;
import org.vizzini.starfightersquadrons.SquadStatistics;
import org.vizzini.starfightersquadrons.VeldrinsSquadBuilder;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSToken;

/**
 * Provides tests for the <code>VeldrinsSquadBuilder</code> class.
 */
public final class VeldrinsSquadBuilderTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadImperial()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder squadBuilder = VeldrinsSquadBuilder.createImperialHowlingTurr();

        // Run.
        final List<SSToken> result = squadBuilder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(6));

        {
            final SSToken token = result.get(0);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.HOWLRUNNER));
            assertThat(token.getShip(), is(Ship.TIE_FIGHTER));
            assertThat(token.getUpgradeCount(), is(0));
        }

        {
            final SSToken token = result.get(1);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.TURR_PHENNIR));
            assertThat(token.getShip(), is(Ship.TIE_INTERCEPTOR));
            assertThat(token.getUpgradeCount(), is(1));
        }

        {
            final SSToken token = result.get(2);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.BLACK_SQUADRON_PILOT));
            assertThat(token.getShip(), is(Ship.TIE_FIGHTER));
            assertThat(token.getUpgradeCount(), is(1));
        }

        {
            final SSToken token = result.get(3);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.OBSIDIAN_SQUADRON_PILOT));
            assertThat(token.getShip(), is(Ship.TIE_FIGHTER));
            assertThat(token.getUpgradeCount(), is(0));
        }

        {
            final SSToken token = result.get(4);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.OBSIDIAN_SQUADRON_PILOT));
            assertThat(token.getShip(), is(Ship.TIE_FIGHTER));
            assertThat(token.getUpgradeCount(), is(0));
        }

        {
            final SSToken token = result.get(5);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.OBSIDIAN_SQUADRON_PILOT));
            assertThat(token.getShip(), is(Ship.TIE_FIGHTER));
            assertThat(token.getUpgradeCount(), is(0));
        }
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadImperialWrongTeam()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder squadBuilder = VeldrinsSquadBuilder.createImperialHowlingTurr();

        // Run / Verify.
        try
        {
            squadBuilder.buildSquad(agent);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("ship and agent have different teams"));
        }
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadRebel()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder squadBuilder = VeldrinsSquadBuilder.createRebelChewieBlues();

        // Run.
        final List<SSToken> result = squadBuilder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(3));

        {
            final SSToken token = result.get(0);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.CHEWBACCA));
            assertThat(token.getShip(), is(Ship.YT_1300));
            assertThat(token.getUpgradeCount(), is(2));
        }

        {
            final SSToken token = result.get(1);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.BLUE_SQUADRON_PILOT));
            assertThat(token.getShip(), is(Ship.B_WING));
            assertThat(token.getUpgradeCount(), is(1));
        }

        {
            final SSToken token = result.get(2);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.BLUE_SQUADRON_PILOT));
            assertThat(token.getShip(), is(Ship.B_WING));
            assertThat(token.getUpgradeCount(), is(1));
        }
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadRebel2()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder squadBuilder = VeldrinsSquadBuilder.createRebelVeldrinsSquad();

        // Run.
        final List<SSToken> result = squadBuilder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(3));

        {
            final SSToken token = result.get(0);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.OUTER_RIM_SMUGGLER));
            assertThat(token.getShip(), is(Ship.YT_1300));
            assertThat(token.getUpgradeCount(), is(3));
        }

        {
            final SSToken token = result.get(1);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.JEK_PORKINS));
            assertThat(token.getShip(), is(Ship.X_WING));
            assertThat(token.getUpgradeCount(), is(2));
        }

        {
            final SSToken token = result.get(2);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.WEDGE_ANTILLES));
            assertThat(token.getShip(), is(Ship.X_WING));
            assertThat(token.getUpgradeCount(), is(2));
        }
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadRebelWrongTeam()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder squadBuilder = VeldrinsSquadBuilder.createRebelChewieBlues();

        // Run / Verify.
        try
        {
            squadBuilder.buildSquad(agent);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("ship and agent have different teams"));
        }
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadRebelWrongTeam2()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder squadBuilder = VeldrinsSquadBuilder.createRebelVeldrinsSquad();

        // Run / Verify.
        try
        {
            squadBuilder.buildSquad(agent);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("ship and agent have different teams"));
        }
    }

    /**
     * Test the <code>getImperialSquadStatistics()</code> method.
     */
    @Test
    public void getImperialSquadStatistics()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder squadBuilder = VeldrinsSquadBuilder.createImperialHowlingTurr();

        // Run.
        final SquadStatistics result = squadBuilder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(28));
        assertThat(result.getPrimaryWeaponValue(), is(13));
        assertThat(result.getAgilityValue(), is(18));
        assertThat(result.getHullValue(), is(18));
        assertThat(result.getShieldValue(), is(0));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * Test the <code>getRebelSquadStatistics()</code> method.
     */
    @Test
    public void getRebelSquadStatistics()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder squadBuilder = VeldrinsSquadBuilder.createRebelChewieBlues();

        // Run.
        final SquadStatistics result = squadBuilder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(9));
        assertThat(result.getPrimaryWeaponValue(), is(9));
        assertThat(result.getAgilityValue(), is(3));
        assertThat(result.getHullValue(), is(14));
        assertThat(result.getShieldValue(), is(15));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * Test the <code>getRebelSquadStatistics()</code> method.
     */
    @Test
    public void getRebelSquadStatistics2()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder squadBuilder = VeldrinsSquadBuilder.createRebelVeldrinsSquad();

        // Run.
        final SquadStatistics result = squadBuilder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(19));
        assertThat(result.getPrimaryWeaponValue(), is(8));
        assertThat(result.getAgilityValue(), is(5));
        assertThat(result.getHullValue(), is(13));
        assertThat(result.getShieldValue(), is(9));
        assertThat(result.getSquadPointCost(), is(100));
    }
}
