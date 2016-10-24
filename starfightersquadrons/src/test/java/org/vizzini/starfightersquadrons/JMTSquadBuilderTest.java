package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Test;
import org.vizzini.starfightersquadrons.JMTSquadBuilder;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.SquadBuilder;
import org.vizzini.starfightersquadrons.SquadStatistics;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSToken;

/**
 * Provides tests for the <code>JMTSquadBuilder</code> class.
 */
public final class JMTSquadBuilderTest
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
        final SquadBuilder squadBuilder = JMTSquadBuilder.createImperial();

        // Run.
        final List<SSToken> result = squadBuilder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(6));

        {
            final SSToken token = result.get(0);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.WHISPER));
            assertThat(token.getShip(), is(Ship.TIE_PHANTOM));
            assertThat(token.getUpgradeCount(), is(3));
        }

        for (int i = 1; i < 6; i++)
        {
            final SSToken token = result.get(i);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.ACADEMY_PILOT));
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
        final SquadBuilder squadBuilder = JMTSquadBuilder.createImperial();

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
        final SquadBuilder squadBuilder = JMTSquadBuilder.createRebel();

        // Run.
        final List<SSToken> result = squadBuilder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(5));

        {
            final SSToken token = result.get(0);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.CHEWBACCA));
            assertThat(token.getShip(), is(Ship.YT_1300));
            assertThat(token.getUpgradeCount(), is(2));
        }

        for (int i = 1; i < 5; i++)
        {
            final SSToken token = result.get(i);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.TALA_SQUADRON_PILOT));
            assertThat(token.getShip(), is(Ship.Z_95_HEADHUNTER));
            assertThat(token.getUpgradeCount(), is(0));
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
        final SquadBuilder squadBuilder = JMTSquadBuilder.createRebel();

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
        final SquadBuilder squadBuilder = JMTSquadBuilder.createImperial();

        // Run.
        final SquadStatistics result = squadBuilder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(14));
        assertThat(result.getPrimaryWeaponValue(), is(14));
        assertThat(result.getAgilityValue(), is(17));
        assertThat(result.getHullValue(), is(17));
        assertThat(result.getShieldValue(), is(2));
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
        final SquadBuilder squadBuilder = JMTSquadBuilder.createRebel();

        // Run.
        final SquadStatistics result = squadBuilder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(21));
        assertThat(result.getPrimaryWeaponValue(), is(11));
        assertThat(result.getAgilityValue(), is(9));
        assertThat(result.getHullValue(), is(16));
        assertThat(result.getShieldValue(), is(13));
        assertThat(result.getSquadPointCost(), is(100));
    }
}
