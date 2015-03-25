package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>CoreSetSquadBuilder</code> class.
 */
public final class CoreSetSquadBuilderTest
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
        final SquadBuilder squadBuilder = CoreSetSquadBuilder.createImperial();

        // Run.
        final List<SSToken> result = squadBuilder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(2));

        {
            final SSToken token = result.get(0);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.MAULER_MITHEL));
            assertThat(token.getShip(), is(Ship.TIE_FIGHTER));
            assertThat(token.getUpgradeCount(), is(1));
        }

        {
            final SSToken token = result.get(1);
            assertNotNull(token);
            assertThat(token.getPilot(), is(Pilot.DARK_CURSE));
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
        final SquadBuilder squadBuilder = CoreSetSquadBuilder.createImperial();

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
        final SquadBuilder squadBuilder = CoreSetSquadBuilder.createRebel();

        // Run.
        final List<SSToken> result = squadBuilder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(1));

        final SSToken token = result.get(0);
        assertNotNull(token);
        assertThat(token.getPilot(), is(Pilot.LUKE_SKYWALKER));
        assertThat(token.getShip(), is(Ship.X_WING));
        assertThat(token.getUpgradeCount(), is(2));
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadRebelWrongTeam()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder squadBuilder = CoreSetSquadBuilder.createRebel();

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
        final SquadBuilder squadBuilder = CoreSetSquadBuilder.createImperial();

        // Run.
        final SquadStatistics result = squadBuilder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(13));
        assertThat(result.getPrimaryWeaponValue(), is(4));
        assertThat(result.getAgilityValue(), is(6));
        assertThat(result.getHullValue(), is(6));
        assertThat(result.getShieldValue(), is(0));
        assertThat(result.getSquadPointCost(), is(36));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsRebel()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder squadBuilder = CoreSetSquadBuilder.createRebel();

        // Run.
        final SquadStatistics result = squadBuilder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(8));
        assertThat(result.getPrimaryWeaponValue(), is(3));
        assertThat(result.getAgilityValue(), is(2));
        assertThat(result.getHullValue(), is(3));
        assertThat(result.getShieldValue(), is(2));
        assertThat(result.getSquadPointCost(), is(36));
    }
}
