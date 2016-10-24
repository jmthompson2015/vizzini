package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.Ignore;
import org.junit.Test;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.SquadBuilder;
import org.vizzini.starfightersquadrons.SquadStatistics;
import org.vizzini.starfightersquadrons.Tournament2013SquadBuilder;
import org.vizzini.starfightersquadrons.UpgradeCard;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSToken;

/**
 * Provides tests for the <code>Tournament2013SquadBuilder</code> class.
 */
public final class Tournament2013SquadBuilderTest
{
    /**
     * Provides a comparator for upgrade cards.
     */
    private static class UpgradeComparator implements Comparator<UpgradeCard>
    {
        @Override
        public int compare(final UpgradeCard upgrade1, final UpgradeCard upgrade2)
        {
            final String name1 = upgrade1.getName();
            final String name2 = upgrade2.getName();

            return name1.compareTo(name2);
        }
    }

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadImperialDallasParker()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialDallasParker();

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(7));

        verifyToken(result.get(0), Pilot.HOWLRUNNER, Ship.TIE_FIGHTER, 2);
        verifyToken(result.get(1), Pilot.DARK_CURSE, Ship.TIE_FIGHTER, 0);

        for (int i = 2; i < 7; i++)
        {
            verifyToken(result.get(i), Pilot.ACADEMY_PILOT, Ship.TIE_FIGHTER, 0);
        }
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadImperialDanielDeBruijn()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialDanielDeBruijn();

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(5));

        verifyToken(result.get(0), Pilot.TURR_PHENNIR, Ship.TIE_INTERCEPTOR, 1);
        verifyToken(result.get(1), Pilot.DARK_CURSE, Ship.TIE_FIGHTER, 0);
        verifyToken(result.get(2), Pilot.DARTH_VADER, Ship.TIE_ADVANCED, 1);
        verifyToken(result.get(3), Pilot.ACADEMY_PILOT, Ship.TIE_FIGHTER, 0);
        verifyToken(result.get(4), Pilot.ACADEMY_PILOT, Ship.TIE_FIGHTER, 0);
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadImperialDavidBergstrom()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialDavidBergstrom();

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(7));

        verifyToken(result.get(0), Pilot.HOWLRUNNER, Ship.TIE_FIGHTER, 1);
        verifyToken(result.get(1), Pilot.BACKSTABBER, Ship.TIE_FIGHTER, 0);
        verifyToken(result.get(2), Pilot.OBSIDIAN_SQUADRON_PILOT, Ship.TIE_FIGHTER, 0);
        verifyToken(result.get(3), Pilot.OBSIDIAN_SQUADRON_PILOT, Ship.TIE_FIGHTER, 0);
        verifyToken(result.get(4), Pilot.OBSIDIAN_SQUADRON_PILOT, Ship.TIE_FIGHTER, 0);
        verifyToken(result.get(5), Pilot.ACADEMY_PILOT, Ship.TIE_FIGHTER, 0);
        verifyToken(result.get(6), Pilot.ACADEMY_PILOT, Ship.TIE_FIGHTER, 0);
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadImperialIainHamp()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialIainHamp();

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(8));

        for (int i = 0; i < 8; i++)
        {
            verifyToken(result.get(i), Pilot.ACADEMY_PILOT, Ship.TIE_FIGHTER, 0);
        }
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadImperialJip()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialJip();

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(5));

        verifyToken(result.get(0), Pilot.KRASSIS_TRELIX, Ship.FIRESPRAY_31, 1);
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
    public void buildSquadImperialJosse()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialJosse();

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(3));

        verifyToken(result.get(0), Pilot.KRASSIS_TRELIX, Ship.FIRESPRAY_31, 3);
        verifyToken(result.get(1), Pilot.SOONTIR_FEL, Ship.TIE_INTERCEPTOR, 2);
        verifyToken(result.get(2), Pilot.ALPHA_SQUADRON_PILOT, Ship.TIE_INTERCEPTOR, 1);
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadImperialNeilHoward()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialNeilHoward();

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(5));

        verifyToken(result.get(0), Pilot.CAPTAIN_JONUS, Ship.TIE_BOMBER, 2);
        verifyToken(result.get(1), Pilot.SCIMITAR_SQUADRON_PILOT, Ship.TIE_BOMBER, 2);
        verifyToken(result.get(2), Pilot.SCIMITAR_SQUADRON_PILOT, Ship.TIE_BOMBER, 2);
        verifyToken(result.get(3), Pilot.ACADEMY_PILOT, Ship.TIE_FIGHTER, 0);
        verifyToken(result.get(4), Pilot.ACADEMY_PILOT, Ship.TIE_FIGHTER, 0);
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadRebelBrandonBarthel()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createRebelBrandonBarthel();

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(4));

        verifyToken(result.get(0), Pilot.WEDGE_ANTILLES, Ship.X_WING, 2);
        verifyToken(result.get(1), Pilot.BIGGS_DARKLIGHTER, Ship.X_WING, 0);
        verifyToken(result.get(2), Pilot.ROOKIE_PILOT, Ship.X_WING, 0);
        verifyToken(result.get(3), Pilot.ROOKIE_PILOT, Ship.X_WING, 0);
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadRebelBrandonBarthelRebelWrongTeam()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createRebelBrandonBarthel();

        // Run / Verify.
        try
        {
            builder.buildSquad(agent);
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
    public void buildSquadRebelIvanPastor()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createRebelIvanPastor();

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(3));

        verifyToken(result.get(0), Pilot.HAN_SOLO, Ship.YT_1300, 3);
        verifyToken(result.get(1), Pilot.ROOKIE_PILOT, Ship.X_WING, 0);
        verifyToken(result.get(2), Pilot.ROOKIE_PILOT, Ship.X_WING, 0);
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadRebelJimBlakley()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createRebelJimBlakley();

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(5));

        verifyToken(result.get(0), Pilot.ROOKIE_PILOT, Ship.X_WING, 0);
        verifyToken(result.get(1), Pilot.ROOKIE_PILOT, Ship.X_WING, 0);
        verifyToken(result.get(2), Pilot.BLUE_SQUADRON_PILOT, Ship.B_WING, 0);
        verifyToken(result.get(3), Pilot.GOLD_SQUADRON_PILOT, Ship.Y_WING, 0);
        verifyToken(result.get(4), Pilot.GOLD_SQUADRON_PILOT, Ship.Y_WING, 0);
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadRebelJonathanGomes()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createRebelJonathanGomes();

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(4));

        verifyToken(result.get(0), Pilot.LUKE_SKYWALKER, Ship.X_WING, 3);
        verifyToken(result.get(1), Pilot.ROOKIE_PILOT, Ship.X_WING, 0);
        verifyToken(result.get(2), Pilot.ROOKIE_PILOT, Ship.X_WING, 0);
        verifyToken(result.get(3), Pilot.ROOKIE_PILOT, Ship.X_WING, 0);
    }

    /**
     * Test the <code>buildSquad()</code> method.
     */
    @Test
    public void buildSquadRebelPaulHeaver()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createRebelPaulHeaver();

        // Run.
        final List<SSToken> result = builder.buildSquad(agent);

        // Verify.
        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(4));

        verifyToken(result.get(0), Pilot.BIGGS_DARKLIGHTER, Ship.X_WING, 0);
        verifyToken(result.get(1), Pilot.ROOKIE_PILOT, Ship.X_WING, 0);
        verifyToken(result.get(2), Pilot.DAGGER_SQUADRON_PILOT, Ship.B_WING, 1);
        verifyToken(result.get(3), Pilot.DAGGER_SQUADRON_PILOT, Ship.B_WING, 1);
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsDallasParker()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialDallasParker();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(19));
        assertThat(result.getPrimaryWeaponValue(), is(14));
        assertThat(result.getAgilityValue(), is(22));
        assertThat(result.getHullValue(), is(21));
        assertThat(result.getShieldValue(), is(0));
        assertThat(result.getSquadPointCost(), is(98));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsDanielDeBruijn()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialDanielDeBruijn();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(24));
        assertThat(result.getPrimaryWeaponValue(), is(11));
        assertThat(result.getAgilityValue(), is(15));
        assertThat(result.getHullValue(), is(15));
        assertThat(result.getShieldValue(), is(2));
        assertThat(result.getSquadPointCost(), is(99));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsDavidBergstom()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialDavidBergstrom();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(25));
        assertThat(result.getPrimaryWeaponValue(), is(14));
        assertThat(result.getAgilityValue(), is(22));
        assertThat(result.getHullValue(), is(21));
        assertThat(result.getShieldValue(), is(0));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsIainHamp()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialIainHamp();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(8));
        assertThat(result.getPrimaryWeaponValue(), is(16));
        assertThat(result.getAgilityValue(), is(24));
        assertThat(result.getHullValue(), is(24));
        assertThat(result.getShieldValue(), is(0));
        assertThat(result.getSquadPointCost(), is(96));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsJip()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialJip();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(16));
        assertThat(result.getPrimaryWeaponValue(), is(11));
        assertThat(result.getAgilityValue(), is(15));
        assertThat(result.getHullValue(), is(18));
        assertThat(result.getShieldValue(), is(4));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsJosse()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialJosse();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(15));
        assertThat(result.getPrimaryWeaponValue(), is(9));
        assertThat(result.getAgilityValue(), is(10));
        assertThat(result.getHullValue(), is(12));
        assertThat(result.getShieldValue(), is(4));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsNeilHoward()
    {
        // Setup.
        final SSAgent agent = testData.createImperialAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createImperialNeilHoward();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(12));
        assertThat(result.getPrimaryWeaponValue(), is(10));
        assertThat(result.getAgilityValue(), is(12));
        assertThat(result.getHullValue(), is(24));
        assertThat(result.getShieldValue(), is(0));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsRebelBrandonBarthel()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createRebelBrandonBarthel();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(18));
        assertThat(result.getPrimaryWeaponValue(), is(12));
        assertThat(result.getAgilityValue(), is(8));
        assertThat(result.getHullValue(), is(12));
        assertThat(result.getShieldValue(), is(8));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsRebelIvanPastor()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createRebelIvanPastor();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(13));
        assertThat(result.getPrimaryWeaponValue(), is(9));
        assertThat(result.getAgilityValue(), is(5));
        assertThat(result.getHullValue(), is(14));
        assertThat(result.getShieldValue(), is(9));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsRebelJimBlakley()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createRebelJimBlakley();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(10));
        assertThat(result.getPrimaryWeaponValue(), is(13));
        assertThat(result.getAgilityValue(), is(7));
        assertThat(result.getHullValue(), is(19));
        assertThat(result.getShieldValue(), is(15));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsRebelJonathanGomes()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createRebelJonathanGomes();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(14));
        assertThat(result.getPrimaryWeaponValue(), is(12));
        assertThat(result.getAgilityValue(), is(8));
        assertThat(result.getHullValue(), is(12));
        assertThat(result.getShieldValue(), is(9));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * Test the <code>getSquadStatistics()</code> method.
     */
    @Test
    public void getSquadStatisticsRebelPaulHeaver()
    {
        // Setup.
        final SSAgent agent = testData.createRebelAgent();
        final SquadBuilder builder = Tournament2013SquadBuilder.createRebelPaulHeaver();

        // Run.
        final SquadStatistics result = builder.getSquadStatistics(agent);

        // Verify.
        assertNotNull(result);
        // System.out.println("result = " + result);
        assertThat(result.getPilotSkillValue(), is(15));
        assertThat(result.getPrimaryWeaponValue(), is(12));
        assertThat(result.getAgilityValue(), is(6));
        assertThat(result.getHullValue(), is(12));
        assertThat(result.getShieldValue(), is(14));
        assertThat(result.getSquadPointCost(), is(100));
    }

    /**
     * Write a report of the upgrades used.
     */
    @Ignore
    @SuppressWarnings("synthetic-access")
    @Test
    public void upgradeReport()
    {
        final List<SquadBuilder> imperialBuilders = new ArrayList<SquadBuilder>();

        imperialBuilders.add(Tournament2013SquadBuilder.createImperialDallasParker());
        imperialBuilders.add(Tournament2013SquadBuilder.createImperialDanielDeBruijn());
        imperialBuilders.add(Tournament2013SquadBuilder.createImperialDavidBergstrom());
        imperialBuilders.add(Tournament2013SquadBuilder.createImperialIainHamp());
        imperialBuilders.add(Tournament2013SquadBuilder.createImperialJip());
        imperialBuilders.add(Tournament2013SquadBuilder.createImperialJosse());
        imperialBuilders.add(Tournament2013SquadBuilder.createImperialNeilHoward());

        final SSAgent imperialAgent = testData.createImperialAgent();
        final Set<UpgradeCard> upgrades = new HashSet<UpgradeCard>();

        for (final SquadBuilder builder : imperialBuilders)
        {
            final List<SSToken> tokens = builder.buildSquad(imperialAgent);

            for (final SSToken token : tokens)
            {
                upgrades.addAll(token.getUpgrades());
            }
        }

        final List<SquadBuilder> rebelBuilders = new ArrayList<SquadBuilder>();

        rebelBuilders.add(Tournament2013SquadBuilder.createRebelBrandonBarthel());
        rebelBuilders.add(Tournament2013SquadBuilder.createRebelIvanPastor());
        rebelBuilders.add(Tournament2013SquadBuilder.createRebelJimBlakley());
        rebelBuilders.add(Tournament2013SquadBuilder.createRebelJonathanGomes());
        rebelBuilders.add(Tournament2013SquadBuilder.createRebelPaulHeaver());

        final SSAgent rebelAgent = testData.createRebelAgent();

        for (final SquadBuilder builder : rebelBuilders)
        {
            final List<SSToken> tokens = builder.buildSquad(rebelAgent);

            for (final SSToken token : tokens)
            {
                upgrades.addAll(token.getUpgrades());
            }
        }

        final List<UpgradeCard> list = new ArrayList<UpgradeCard>();
        list.addAll(upgrades);
        Collections.sort(list, new UpgradeComparator());
        final String format = "%-25s  %-12s  %-4s  %1d";

        for (final UpgradeCard upgrade : list)
        {
            System.out.println(String.format(format, upgrade.getName(), upgrade.getType().getDisplayName(), upgrade
                    .getWave().getDisplayName(), upgrade.getSquadPointCost()));
        }
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
