package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>AllShipsSquadBuilder</code> class.
 */
public final class AllShipsSquadBuilderTest
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
        final SquadBuilder squadBuilder = AllShipsSquadBuilder.createImperial();

        // Run.
        final List<SSToken> result = squadBuilder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(10));

        {
            final SSToken token = result.get(7);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.ACADEMY_PILOT));
            assertThat(token.getShip(), is(Ship.TIE_FIGHTER));
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
        final SquadBuilder squadBuilder = AllShipsSquadBuilder.createImperial();

        // Run / Verify.
        try
        {
            squadBuilder.buildSquad(agent);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(
                    e.getMessage(),
                    is("Agent does not belong to team: SimpleAgent[name=Rebel,team=SSTeam[description=Rebel team.,name=Rebel]] SSTeam[description=Imperial team.,name=Imperial]"));
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
        final SquadBuilder squadBuilder = AllShipsSquadBuilder.createRebel();

        // Run.
        final List<SSToken> result = squadBuilder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(8));

        {
            final SSToken token = result.get(4);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.ROOKIE_PILOT));
            assertThat(token.getShip(), is(Ship.X_WING));
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
        final SquadBuilder squadBuilder = AllShipsSquadBuilder.createRebel();

        // Run / Verify.
        try
        {
            squadBuilder.buildSquad(agent);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(
                    e.getMessage(),
                    is("Agent does not belong to team: SimpleAgent[name=Imperial,team=SSTeam[description=Imperial team.,name=Imperial]] SSTeam[description=Rebel team.,name=Rebel]"));
        }
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsImperial()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder squadBuilder = AllShipsSquadBuilder.createImperial();

        // Run.
        final SquadStatistics result = squadBuilder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(25));
        assertThat(result.getPrimaryWeaponValue(), is(28));
        assertThat(result.getAgilityValue(), is(25));
        assertThat(result.getHullValue(), is(37));
        assertThat(result.getShieldValue(), is(16));
        assertThat(result.getSquadPointCost(), is(221));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsRebel()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder squadBuilder = AllShipsSquadBuilder.createRebel();

        // Run.
        final SquadStatistics result = squadBuilder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(13));
        assertThat(result.getPrimaryWeaponValue(), is(18));
        assertThat(result.getAgilityValue(), is(15));
        assertThat(result.getHullValue(), is(27));
        assertThat(result.getShieldValue(), is(22));
        assertThat(result.getSquadPointCost(), is(160));
    }
}
