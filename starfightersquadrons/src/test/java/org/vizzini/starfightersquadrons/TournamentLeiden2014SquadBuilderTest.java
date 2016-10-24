package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.List;

import org.junit.Test;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.SquadBuilder;
import org.vizzini.starfightersquadrons.SquadStatistics;
import org.vizzini.starfightersquadrons.TournamentLeiden2014SquadBuilder;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSToken;

/**
 * Provides tests for the <code>TournamentLeiden2014SquadBuilder</code> class.
 */
public class TournamentLeiden2014SquadBuilderTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadImperialAndrei()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = TournamentLeiden2014SquadBuilder.createImperialAndrei();
        assertTrue(builder.getDescription().contains("5th"));

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(5));

        verifyToken(result.get(0), Pilot.ECHO, Ship.TIE_PHANTOM, 4);
        verifyToken(result.get(1), Pilot.HOWLRUNNER, Ship.TIE_FIGHTER, 1);

        for (int i = 2; i < 5; i++)
        {
            verifyToken(result.get(i), Pilot.ACADEMY_PILOT, Ship.TIE_FIGHTER, 0);
        }
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadImperialFrans()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = TournamentLeiden2014SquadBuilder.createImperialFrans();
        assertTrue(builder.getDescription().contains("4th"));

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(5));

        verifyToken(result.get(0), Pilot.WHISPER, Ship.TIE_PHANTOM, 3);

        verifyToken(result.get(1), Pilot.HOWLRUNNER, Ship.TIE_FIGHTER, 0);

        for (int i = 2; i < 5; i++)
        {
            verifyToken(result.get(i), Pilot.ACADEMY_PILOT, Ship.TIE_FIGHTER, 0);
        }
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadImperialPiers()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = TournamentLeiden2014SquadBuilder.createImperialPiers();
        assertTrue(builder.getDescription().contains("2nd"));

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(7));

        verifyToken(result.get(0), Pilot.OMICRON_GROUP_PILOT, Ship.LAMBDA_CLASS_SHUTTLE, 1);

        for (int i = 1; i < 5; i++)
        {
            verifyToken(result.get(i), Pilot.OBSIDIAN_SQUADRON_PILOT, Ship.TIE_FIGHTER, 0);
        }

        for (int i = 5; i < 7; i++)
        {
            verifyToken(result.get(i), Pilot.ACADEMY_PILOT, Ship.TIE_FIGHTER, 0);
        }
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadImperialStephan()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = TournamentLeiden2014SquadBuilder.createImperialStephan();
        assertTrue(builder.getDescription().contains("1st"));

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(6));

        verifyToken(result.get(0), Pilot.WHISPER, Ship.TIE_PHANTOM, 3);

        for (int i = 1; i < 6; i++)
        {
            verifyToken(result.get(i), Pilot.ACADEMY_PILOT, Ship.TIE_FIGHTER, 0);
        }
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadRebelOnno()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = TournamentLeiden2014SquadBuilder.createRebelOnno();
        assertTrue(builder.getDescription().contains("6th"));

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(3));

        verifyToken(result.get(0), Pilot.HAN_SOLO, Ship.YT_1300, 5);
        verifyToken(result.get(1), Pilot.BIGGS_DARKLIGHTER, Ship.X_WING, 0);
        verifyToken(result.get(2), Pilot.TALA_SQUADRON_PILOT, Ship.Z_95_HEADHUNTER, 0);
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadRebelToby()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = TournamentLeiden2014SquadBuilder.createRebelToby();
        assertTrue(builder.getDescription().contains("3rd"));

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(4));

        verifyToken(result.get(0), Pilot.BLUE_SQUADRON_PILOT, Ship.B_WING, 1);
        verifyToken(result.get(1), Pilot.LUKE_SKYWALKER, Ship.X_WING, 0);
        verifyToken(result.get(2), Pilot.TARN_MISON, Ship.X_WING, 1);
        verifyToken(result.get(3), Pilot.GOLD_SQUADRON_PILOT, Ship.Y_WING, 1);
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsImperialAndrei()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = TournamentLeiden2014SquadBuilder.createImperialAndrei();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(19));
        assertThat(result.getPrimaryWeaponValue(), is(12));
        assertThat(result.getAgilityValue(), is(15));
        assertThat(result.getHullValue(), is(14));
        assertThat(result.getShieldValue(), is(2));
        assertThat(result.getSquadPointCost(), is(99));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsImperialFrans()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = TournamentLeiden2014SquadBuilder.createImperialFrans();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(20));
        assertThat(result.getPrimaryWeaponValue(), is(12));
        assertThat(result.getAgilityValue(), is(14));
        assertThat(result.getHullValue(), is(14));
        assertThat(result.getShieldValue(), is(2));
        assertThat(result.getSquadPointCost(), is(93));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsImperialPiers()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = TournamentLeiden2014SquadBuilder.createImperialPiers();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(16));
        assertThat(result.getPrimaryWeaponValue(), is(15));
        assertThat(result.getAgilityValue(), is(19));
        assertThat(result.getHullValue(), is(23));
        assertThat(result.getShieldValue(), is(5));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsImperialStephan()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = TournamentLeiden2014SquadBuilder.createImperialStephan();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

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
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsRebelOnno()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = TournamentLeiden2014SquadBuilder.createRebelOnno();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(20));
        assertThat(result.getPrimaryWeaponValue(), is(8));
        assertThat(result.getAgilityValue(), is(5));
        assertThat(result.getHullValue(), is(13));
        assertThat(result.getShieldValue(), is(9));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsRebelToby()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = TournamentLeiden2014SquadBuilder.createRebelToby();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(15));
        assertThat(result.getPrimaryWeaponValue(), is(11));
        assertThat(result.getAgilityValue(), is(6));
        assertThat(result.getHullValue(), is(14));
        assertThat(result.getShieldValue(), is(12));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * @param token Token.
     * @param pilot Pilot.
     * @param ship Ship.
     * @param upgradeCount Upgrade count.
     */
    private void verifyToken(final SSToken token, final Pilot pilot, final Ship ship, final int upgradeCount)
    {
        assertNotNull(token);
        assertThat(token.getPilot(), is(pilot));
        assertThat(token.getShip(), is(ship));
        assertThat(token.getUpgradeCount(), is(upgradeCount));
    }

}
