package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultSquadBuilder</code> class.
 */
public final class DefaultSquadBuilderTest
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
        final SquadBuilder squadBuilder = new DefaultSquadBuilder("description", SSTeam.IMPERIAL);

        // Run.
        final List<SSToken> result = squadBuilder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadImperialWrongTeam()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder squadBuilder = new DefaultSquadBuilder("description", SSTeam.IMPERIAL);

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
    public void buildSquadNull()
    {
        // Setup.
        final SquadBuilder squadBuilder = new DefaultSquadBuilder("description", SSTeam.IMPERIAL);

        // Run / Verify.
        try
        {
            squadBuilder.buildSquad(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("agent is null."));
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
        final SquadBuilder squadBuilder = new DefaultSquadBuilder("description", SSTeam.REBEL);

        // Run.
        final List<SSToken> result = squadBuilder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadRebelWrongTeam()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder squadBuilder = new DefaultSquadBuilder("description", SSTeam.REBEL);

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
        final SquadBuilder squadBuilder = new DefaultSquadBuilder("description", SSTeam.IMPERIAL);

        // Run.
        final SquadStatistics result = squadBuilder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(0));
        assertThat(result.getPrimaryWeaponValue(), is(0));
        assertThat(result.getAgilityValue(), is(0));
        assertThat(result.getHullValue(), is(0));
        assertThat(result.getShieldValue(), is(0));
        assertThat(result.getSquadPointCost(), is(0));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsRebel()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder squadBuilder = new DefaultSquadBuilder("description", SSTeam.REBEL);

        // Run.
        final SquadStatistics result = squadBuilder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(0));
        assertThat(result.getPrimaryWeaponValue(), is(0));
        assertThat(result.getAgilityValue(), is(0));
        assertThat(result.getHullValue(), is(0));
        assertThat(result.getShieldValue(), is(0));
        assertThat(result.getSquadPointCost(), is(0));
    }

    /**
     * Test the <code>DefaultSquadBuilder()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        // Run / Verify.
        try
        {
            new DefaultSquadBuilder(null, SSTeam.REBEL);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("description is null or empty."));
        }

        // Run / Verify.
        try
        {
            new DefaultSquadBuilder("description", null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("team is null."));
        }
    }
}
