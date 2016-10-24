package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

import org.junit.Test;
import org.vizzini.starfightersquadrons.RangeRuler.Range;

/**
 * Provides tests for the <code>SSEnvironment</code> class.
 */
public final class SSEnvironmentTest
{
    /**
     * Provides a comparator for X-Wing tokens.
     */
    private static class SSTokenComparator implements Comparator<SSToken>
    {
        @Override
        public int compare(final SSToken token1, final SSToken token2)
        {
            final Ship ship1 = token1.getShip();
            final Ship ship2 = token2.getShip();

            final String name1 = ship1.getName();
            final String name2 = ship2.getName();

            return name1.compareTo(name2);
        }
    }

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>drawDamage()</code> method.
     */
    @Test
    public void drawDamage()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Run.
        for (int i = 0; i < 50; i++)
        {
            final DamageCard damage = environment.drawDamage();
            environment.discardDamage(damage);
        }
    }

    /**
     * Test the <code>getAttackers()</code> method.
     */
    @Test
    public void getAttackersImperial()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Run.
        final List<SSToken> result = environment.getAttackers(SSTeam.IMPERIAL);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));
    }

    /**
     * Test the <code>getAttackers()</code> method.
     */
    @Test
    public void getAttackersRebel()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Run.
        final List<SSToken> result = environment.getAttackers(SSTeam.REBEL);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));
    }

    /**
     * Test the <code>getClosestDefender()</code> method.
     */
    @Test
    public void getClosestDefender0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);

        // Run.
        final SSToken result = environment.getClosestDefender(attacker, attackerPosition);

        // Verify.
        assertNotNull(result);
        assertThat(result.getPilot(), is(Pilot.ACADEMY_PILOT));
        assertThat(result.getShip(), is(Ship.TIE_FIGHTER));
    }

    /**
     * Test the <code>getClosestDefender()</code> method.
     */
    @Test
    public void getClosestDefender1()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(rebelTokens, Ship.YT_1300);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);

        // Run.
        final SSToken result = environment.getClosestDefender(attacker, attackerPosition);

        // Verify.
        assertNotNull(result);
        assertThat(result.getPilot(), is(Pilot.BOUNTY_HUNTER));
        assertThat(result.getShip(), is(Ship.FIRESPRAY_31));
    }

    /**
     * Test the <code>getClosestInRangeDefender()</code> method.
     */
    @Test
    public void getClosestInRangeDefender0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(attackerPosition.getX(), attackerPosition.getY() - 100, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        final SSToken result = environment.getClosestInRangeDefender(attacker, attackerPosition,
                attacker.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.getPilot(), is(Pilot.ACADEMY_PILOT));
        assertThat(result.getShip(), is(Ship.TIE_FIGHTER));
    }

    /**
     * Test the <code>getClosestInRangeDefender()</code> method.
     */
    @Test
    public void getClosestInRangeDefender1()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(rebelTokens, Ship.YT_1300);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(attackerPosition.getX(), attackerPosition.getY() - 100, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        final SSToken result = environment.getClosestInRangeDefender(attacker, attackerPosition,
                attacker.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.getPilot(), is(Pilot.ACADEMY_PILOT));
        assertThat(result.getShip(), is(Ship.TIE_FIGHTER));
    }

    /**
     * Test the <code>getClosestTargetableDefender()</code> method.
     */
    @Test
    public void getClosestTargetableDefender()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken rebelToken0 = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition fromPosition0 = environment.getPositionFor(rebelToken0);
        final SSToken rebelToken1 = TestData.findShip(rebelTokens, Ship.YT_1300);
        final SSPosition fromPosition1 = environment.getPositionFor(rebelToken1);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(fromPosition0.getX(), fromPosition0.getY() - 177, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        SSToken result = environment.getClosestTargetableDefender(rebelToken0, fromPosition0,
                rebelToken0.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.getPilot(), is(Pilot.ACADEMY_PILOT));
        assertThat(result.getShip(), is(Ship.TIE_FIGHTER));

        // Run.
        result = environment.getClosestTargetableDefender(rebelToken1, fromPosition1, rebelToken1.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.getPilot(), is(Pilot.ACADEMY_PILOT));
        assertThat(result.getShip(), is(Ship.TIE_FIGHTER));
    }

    /**
     * Test the <code>getClosestTargetableDefender()</code> method.
     */
    @Test
    public void getClosestTargetableDefender2()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken rebelToken0 = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition fromPosition0 = environment.getPositionFor(rebelToken0);
        final SSToken rebelToken1 = TestData.findShip(rebelTokens, Ship.YT_1300);
        final SSPosition fromPosition1 = environment.getPositionFor(rebelToken1);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        {
            final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
            SSPosition imperialPosition = environment.getPositionFor(imperialToken);
            environment.removeToken(imperialPosition);
            imperialPosition = new SSPosition(imperialPosition.getX(), imperialPosition.getY() + 600, 90);
            environment.placeToken(imperialPosition, imperialToken);
        }
        {
            final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.FIRESPRAY_31);
            SSPosition imperialPosition = environment.getPositionFor(imperialToken);
            environment.removeToken(imperialPosition);
            imperialPosition = new SSPosition(imperialPosition.getX(), imperialPosition.getY() + 600, 90);
            environment.placeToken(imperialPosition, imperialToken);
        }

        // Run.
        SSToken result = environment.getClosestTargetableDefender(rebelToken0, fromPosition0,
                rebelToken0.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.getPilot(), is(Pilot.ACADEMY_PILOT));
        assertThat(result.getShip(), is(Ship.TIE_FIGHTER));

        // Run.
        result = environment.getClosestTargetableDefender(rebelToken1, fromPosition1, rebelToken1.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.getPilot(), is(Pilot.BOUNTY_HUNTER));
        assertThat(result.getShip(), is(Ship.FIRESPRAY_31));
    }

    /**
     * Test the <code>getClosestTargetableDefender()</code> method.
     */
    @Test
    public void getClosestTargetableDefender3()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken0 = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition fromPosition0;
        {
            final SSPosition imperialPosition = environment.getPositionFor(imperialToken0);
            environment.removeToken(imperialPosition);
            fromPosition0 = new SSPosition(imperialPosition.getX(), imperialPosition.getY() + 600, 90);
            environment.placeToken(imperialPosition, imperialToken0);
        }
        final SSToken imperialToken1 = TestData.findShip(imperialTokens, Ship.FIRESPRAY_31);
        SSPosition fromPosition1;
        {
            final SSPosition imperialPosition = environment.getPositionFor(imperialToken1);
            environment.removeToken(imperialPosition);
            fromPosition1 = new SSPosition(imperialPosition.getX(), imperialPosition.getY() + 600, 90);
            environment.placeToken(imperialPosition, imperialToken1);
        }

        // Run.
        SSToken result = environment.getClosestTargetableDefender(imperialToken0, fromPosition0,
                imperialToken0.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.getPilot(), is(Pilot.ROOKIE_PILOT));
        assertThat(result.getShip(), is(Ship.X_WING));

        // Run.
        result = environment.getClosestTargetableDefender(imperialToken1, fromPosition1,
                imperialToken1.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.getPilot(), is(Pilot.OUTER_RIM_SMUGGLER));
        assertThat(result.getShip(), is(Ship.YT_1300));

        // Run. Turn the Firespray-31 around.
        environment.removeToken(fromPosition1);
        fromPosition1 = new SSPosition(fromPosition1.getX(), fromPosition1.getY(), -90);
        environment.placeToken(fromPosition1, imperialToken1);
        result = environment.getClosestTargetableDefender(imperialToken1, fromPosition1,
                imperialToken1.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.getPilot(), is(Pilot.OUTER_RIM_SMUGGLER));
        assertThat(result.getShip(), is(Ship.YT_1300));
    }

    /**
     * Test the <code>getClosestTargetableDefender()</code> method.
     */
    @Test
    public void getClosestTargetableDefenderNone()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken rebelToken0 = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition fromPosition0 = environment.getPositionFor(rebelToken0);
        final SSToken rebelToken1 = TestData.findShip(rebelTokens, Ship.YT_1300);
        final SSPosition fromPosition1 = environment.getPositionFor(rebelToken1);

        // Run.
        SSToken result = environment.getClosestTargetableDefender(rebelToken0, fromPosition0,
                rebelToken0.getPrimaryWeapon());

        // Verify.
        assertNull(result);

        // Run.
        result = environment.getClosestTargetableDefender(rebelToken1, fromPosition1, rebelToken1.getPrimaryWeapon());

        // Verify.
        assertNull(result);
    }

    /**
     * Test the <code>getClosestVulnerableDefender()</code> method.
     */
    @Test
    public void getClosestVulnerableDefender0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(attackerPosition.getX(), attackerPosition.getY() - 100, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        final SSToken result = environment.getClosestVulnerableDefender(attacker, attackerPosition,
                attacker.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.getPilot(), is(Pilot.ACADEMY_PILOT));
        assertThat(result.getShip(), is(Ship.TIE_FIGHTER));
    }

    /**
     * Test the <code>getClosestVulnerableDefender()</code> method.
     */
    @Test
    public void getClosestVulnerableDefender1()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(rebelTokens, Ship.YT_1300);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(attackerPosition.getX(), attackerPosition.getY() - 100, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        final SSToken result = environment.getClosestVulnerableDefender(attacker, attackerPosition,
                attacker.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.getPilot(), is(Pilot.ACADEMY_PILOT));
        assertThat(result.getShip(), is(Ship.TIE_FIGHTER));
    }

    /**
     * Test the <code>getDefendersAtRange()</code> method.
     */
    @Test
    public void getDefendersAtRangeOne()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken rebelToken0 = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition fromPosition0 = environment.getPositionFor(rebelToken0);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(fromPosition0.getX(), fromPosition0.getY() - 100, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        final List<SSToken> result = environment.getDefendersAtRange(rebelToken0, fromPosition0, Range.ONE);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));
        final SSToken token0 = result.get(0);
        assertThat(token0.getShip(), is(Ship.TIE_FIGHTER));

        assertTrue(environment.getDefendersAtRange(rebelToken0, fromPosition0, Range.TWO).isEmpty());
        assertTrue(environment.getDefendersAtRange(rebelToken0, fromPosition0, Range.THREE).isEmpty());
    }

    /**
     * Test the <code>getDefendersAtRange()</code> method.
     */
    @Test
    public void getDefendersAtRangeThree()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken rebelToken0 = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition fromPosition0 = environment.getPositionFor(rebelToken0);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(fromPosition0.getX(), fromPosition0.getY() - 300, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        final List<SSToken> result = environment.getDefendersAtRange(rebelToken0, fromPosition0, Range.THREE);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));
        final SSToken token0 = result.get(0);
        assertThat(token0.getShip(), is(Ship.TIE_FIGHTER));

        assertTrue(environment.getDefendersAtRange(rebelToken0, fromPosition0, Range.ONE).isEmpty());
        assertTrue(environment.getDefendersAtRange(rebelToken0, fromPosition0, Range.TWO).isEmpty());
    }

    /**
     * Test the <code>getDefendersAtRange()</code> method.
     */
    @Test
    public void getDefendersAtRangeTwo()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken rebelToken0 = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition fromPosition0 = environment.getPositionFor(rebelToken0);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(fromPosition0.getX(), fromPosition0.getY() - 200, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        final List<SSToken> result = environment.getDefendersAtRange(rebelToken0, fromPosition0, Range.TWO);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));
        final SSToken token0 = result.get(0);
        assertThat(token0.getShip(), is(Ship.TIE_FIGHTER));

        assertTrue(environment.getDefendersAtRange(rebelToken0, fromPosition0, Range.ONE).isEmpty());
        assertTrue(environment.getDefendersAtRange(rebelToken0, fromPosition0, Range.THREE).isEmpty());
    }

    /**
     * Test the <code>getInRangeDefenders()</code> method.
     */
    @Test
    public void getInRangeDefenders()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(attackerPosition.getX(), attackerPosition.getY() - 100, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        final List<SSToken> result = environment.getInRangeDefenders(attacker, attackerPosition,
                attacker.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));
        final SSToken token0 = result.get(0);
        assertThat(token0.getShip(), is(Ship.TIE_FIGHTER));
    }

    /**
     * Test the <code>getTargetableDefenders()</code> method.
     */
    @Test
    public void getTargetableDefenders()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(attackerPosition.getX(), attackerPosition.getY() - 100, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        final List<SSToken> result = environment.getTargetableDefenders(attacker, attackerPosition,
                attacker.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));
        final SSToken token0 = result.get(0);
        assertThat(token0.getShip(), is(Ship.TIE_FIGHTER));
    }

    /**
     * Test the <code>getTargetableDefendersAtRange()</code> method.
     */
    @Test
    public void getTargetableDefendersAtRangeOneTouching()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(attackerPosition.getX(), attackerPosition.getY() - 40, 90);
        environment.placeToken(imperialPosition, imperialToken);
        // System.out.println("environment.getTokensTouching(attacker) = " + environment.getTokensTouching(attacker));

        // Run.
        final List<SSToken> result = environment.getTargetableDefendersAtRange(attacker, attackerPosition,
                attacker.getPrimaryWeapon(), Range.ONE);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(0));

        assertTrue(environment.getDefendersAtRange(attacker, attackerPosition, Range.TWO).isEmpty());
        assertTrue(environment.getDefendersAtRange(attacker, attackerPosition, Range.THREE).isEmpty());
    }

    /**
     * Test the <code>getTargetableDefendersAtRange()</code> method.
     */
    @Test
    public void getTargetableDefendersAtRangeOneXWing()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(attackerPosition.getX(), attackerPosition.getY() - 100, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        final List<SSToken> result = environment.getTargetableDefendersAtRange(attacker, attackerPosition,
                attacker.getPrimaryWeapon(), Range.ONE);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));
        final SSToken token0 = result.get(0);
        assertThat(token0.getShip(), is(Ship.TIE_FIGHTER));

        assertTrue(environment.getDefendersAtRange(attacker, attackerPosition, Range.TWO).isEmpty());
        assertTrue(environment.getDefendersAtRange(attacker, attackerPosition, Range.THREE).isEmpty());
    }

    /**
     * Test the <code>getTargetableDefendersAtRange()</code> method.
     */
    @Test
    public void getTargetableDefendersAtRangeOneYT1300()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(rebelTokens, Ship.YT_1300);
        SSPosition attackerPosition = environment.getPositionFor(attacker);
        environment.removeToken(attackerPosition);
        attackerPosition = new SSPosition(400, 400, 0);
        environment.placeToken(attackerPosition, attacker);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(attackerPosition.getX(), attackerPosition.getY() - 61, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        final List<SSToken> result = environment.getTargetableDefendersAtRange(attacker, attackerPosition,
                attacker.getPrimaryWeapon(), Range.ONE);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));
        final SSToken token0 = result.get(0);
        assertThat(token0.getShip(), is(Ship.TIE_FIGHTER));

        assertTrue(environment.getDefendersAtRange(attacker, attackerPosition, Range.TWO).isEmpty());
        assertFalse(environment.getDefendersAtRange(attacker, attackerPosition, Range.THREE).isEmpty());
    }

    /**
     * Test the <code>getTokenCount()</code> method.
     */
    @Test
    public void getTokenCount()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Run.
        final int result = environment.getTokenCount();

        // Verify.
        assertThat(result, is(4));
    }

    /**
     * Test the <code>getTokenCountFor()</code> method.
     */
    @Test
    public void getTokenCountForAgent()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAgent agent = environment.getImperialAgent();

        // Run.
        final int result = environment.getTokenCountFor(agent);

        // Verify.
        assertThat(result, is(2));
    }

    /**
     * Test the <code>getTokenCountFor()</code> method.
     */
    @Test
    public void getTokenCountForTeam()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSTeam team = SSTeam.IMPERIAL;

        // Run.
        final int result = environment.getTokenCountFor(team);

        // Verify.
        assertThat(result, is(2));
    }

    /**
     * Test the <code>getTokensForActivation()</code> method.
     */
    @Test
    public void getTokensForActivation()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Run.
        final List<SSToken> result = environment.getTokensForActivation();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(4));

        {
            final SSToken token = result.get(0);
            assertTrue(token.getName(), token.getName().endsWith(" Academy Pilot (TIE Fighter)"));
            assertThat(token.getPilot().getName(), is("Academy Pilot"));
            assertThat(token.getPilot().getShip().getTeam(), is(SSTeam.IMPERIAL));
            assertThat(token.getShip(), is(Ship.TIE_FIGHTER));
        }

        {
            final SSToken token = result.get(1);
            assertTrue(token.getName(), token.getName().endsWith(" Outer Rim Smuggler (YT-1300)"));
            assertThat(token.getPilot().getName(), is("Outer Rim Smuggler"));
            assertThat(token.getPilot().getShip().getTeam(), is(SSTeam.REBEL));
            assertThat(token.getShip(), is(Ship.YT_1300));
        }

        {
            final SSToken token = result.get(2);
            assertTrue(token.getName(), token.getName().endsWith(" Rookie Pilot (X-Wing)"));
            assertThat(token.getPilot().getName(), is("Rookie Pilot"));
            assertThat(token.getPilot().getShip().getTeam(), is(SSTeam.REBEL));
            assertThat(token.getShip(), is(Ship.X_WING));
        }

        {
            final SSToken token = result.get(3);
            assertTrue(token.getName(), token.getName().endsWith(" Bounty Hunter (Firespray-31)"));
            assertThat(token.getPilot().getName(), is("Bounty Hunter"));
            assertThat(token.getPilot().getShip().getTeam(), is(SSTeam.IMPERIAL));
            assertThat(token.getShip(), is(Ship.FIRESPRAY_31));
        }
    }

    /**
     * Test the <code>getTokensForCombat()</code> method.
     */
    @Test
    public void getTokensForCombat()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Run.
        final List<SSToken> result = environment.getTokensForCombat();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(4));
        assertThat(result.get(0).getShip().getTeam(), is(SSTeam.IMPERIAL));
        assertThat(result.get(1).getShip().getTeam(), is(SSTeam.REBEL));

        {
            final SSToken token = result.get(0);
            assertTrue(token.getName(), token.getName().endsWith(" Bounty Hunter (Firespray-31)"));
            assertThat(token.getPilot().getName(), is("Bounty Hunter"));
            assertThat(token.getPilot().getShip().getTeam(), is(SSTeam.IMPERIAL));
            assertThat(token.getShip(), is(Ship.FIRESPRAY_31));
        }

        {
            final SSToken token = result.get(1);
            assertTrue(token.getName(), token.getName().endsWith(" Rookie Pilot (X-Wing)"));
            assertThat(token.getPilot().getName(), is("Rookie Pilot"));
            assertThat(token.getPilot().getShip().getTeam(), is(SSTeam.REBEL));
            assertThat(token.getShip(), is(Ship.X_WING));
        }

        {
            final SSToken token = result.get(2);
            assertTrue(token.getName().endsWith(" Academy Pilot (TIE Fighter)"));
            assertThat(token.getPilot().getName(), is("Academy Pilot"));
            assertThat(token.getPilot().getShip().getTeam(), is(SSTeam.IMPERIAL));
            assertThat(token.getShip(), is(Ship.TIE_FIGHTER));
        }

        {
            final SSToken token = result.get(3);
            assertTrue(token.getName(), token.getName().endsWith(" Outer Rim Smuggler (YT-1300)"));
            assertThat(token.getPilot().getName(), is("Outer Rim Smuggler"));
            assertThat(token.getPilot().getShip().getTeam(), is(SSTeam.REBEL));
            assertThat(token.getShip(), is(Ship.YT_1300));
        }
    }

    /**
     * Test the <code>getTokensForTeam()</code> method.
     */
    @Test
    public void getTokensForTeamImperial()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Run.
        final List<SSToken> result = environment.getTokensForTeam(SSTeam.IMPERIAL);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));
    }

    /**
     * Test the <code>getTokensForTeam()</code> method.
     */
    @Test
    public void getTokensForTeamRebel()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();

        // Run.
        final List<SSToken> result = environment.getTokensForTeam(SSTeam.REBEL);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));
    }

    /**
     * Test the <code>getTokensTouching()</code> method.
     */
    @Test
    public void getTokensTouchingNone()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken attacker = TestData.findShip(environment.getTokensForTeam(SSTeam.REBEL), Ship.X_WING);

        // Run.
        final Set<SSToken> result = environment.getTokensTouching(attacker);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(0));
    }

    /**
     * Test the <code>getTokensTouching()</code> method.
     */
    @Test
    public void getTokensTouchingOne()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken defender = TestData.findShip(environment.getTokensForTeam(SSTeam.IMPERIAL), Ship.TIE_FIGHTER);
        final SSPosition defenderPosition = environment.getPositionFor(defender);
        final SSToken attacker = TestData.findShip(environment.getTokensForTeam(SSTeam.REBEL), Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);
        environment.removeToken(attackerPosition);
        final SSPosition attackerPosition2 = new SSPosition(defenderPosition.getX(), defenderPosition.getY() + 40,
                attackerPosition.getHeading());
        environment.placeToken(attackerPosition2, attacker);

        // Run.
        final Set<SSToken> result = environment.getTokensTouching(attacker);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));
        final SSToken token = result.iterator().next();
        assertNotNull(token);
        assertThat(token, is(defender));
    }

    /**
     * Test the <code>getVulnerableDefenders()</code> method.
     */
    @SuppressWarnings("synthetic-access")
    @Test
    public void getVulnerableDefenders()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(rebelTokens, Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);

        // Move imperial in front of rebel.
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = TestData.findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(attackerPosition.getX(), attackerPosition.getY() - 100, 90);
        environment.placeToken(imperialPosition, imperialToken);

        // Run.
        final List<SSToken> result = environment.getVulnerableDefenders(attacker, attackerPosition,
                attacker.getPrimaryWeapon());

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));
        Collections.sort(result, new SSTokenComparator());
        {
            final SSToken token = result.get(0);
            assertThat(token.getShip(), is(Ship.FIRESPRAY_31));
        }
        {
            final SSToken token = result.get(1);
            assertThat(token.getShip(), is(Ship.TIE_FIGHTER));
        }
    }
}
