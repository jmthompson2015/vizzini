package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.starfightersquadrons.DamageCard;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.CombatAction.DamageDealer;

/**
 * Provides tests for the <code>DamageDealer</code> class.
 */
public final class DamageDealerTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>dealDamage()</code> method.
     */
    @Test
    public void dealDamage0_0_0()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Agent imperialAgent = testData.createImperialAgent();
        final SSToken defender = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final int hitCount = 0;
        final int criticalHitCount = 0;
        final int evadeCount = 0;
        final DamageDealer damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender,
                evadeCount);

        // Run.
        damageDealer.dealDamage();

        // Verify.
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));
        assertFalse(defender.isDestroyed());
    }

    /**
     * Test the <code>dealDamage()</code> method.
     */
    @Test
    public void dealDamage1_0_1()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final Agent imperialAgent = testData.createImperialAgent();
        final SSToken defender = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final int hitCount = 1;
        final int criticalHitCount = 0;
        final int evadeCount = 1;
        final DamageDealer damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender,
                evadeCount);

        // Run.
        damageDealer.dealDamage();

        // Verify.
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));
        assertFalse(defender.isDestroyed());
    }

    /**
     * Test the <code>dealDamage()</code> method.
     */
    @Test
    public void dealDamage1_1_1_DirectHit()
    {
        // Setup.
        final List<DamageCard> damageDeck = new ArrayList<DamageCard>();
        damageDeck.add(DamageCard.DIRECT_HIT);
        final SSEnvironment environment = new SSEnvironment(damageDeck);
        final Agent imperialAgent = testData.createImperialAgent();
        final SSToken defender = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final int hullValue = defender.getHullValue();
        final int hitCount = 1;
        final int criticalHitCount = 1;
        final int evadeCount = 1;
        final DamageDealer damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender,
                evadeCount);

        // Run.
        damageDealer.dealDamage();

        // Verify.
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(1));
        assertThat(defender.getHullValue(), is(hullValue - 1));
        assertFalse(defender.isDestroyed());
    }

    /**
     * Test the <code>dealDamage()</code> method.
     */
    @Test
    public void dealDamage1_1_1_ThrustControlFire()
    {
        // Setup.
        final List<DamageCard> damageDeck = new ArrayList<DamageCard>();
        damageDeck.add(DamageCard.THRUST_CONTROL_FIRE);
        final SSEnvironment environment = new SSEnvironment(damageDeck);
        final Agent imperialAgent = testData.createImperialAgent();
        final SSToken defender = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final int hitCount = 1;
        final int criticalHitCount = 1;
        final int evadeCount = 1;
        final DamageDealer damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender,
                evadeCount);

        // Run.
        damageDealer.dealDamage();

        // Verify.
        assertThat(defender.getDamageCount(), is(1));
        assertThat(defender.getCriticalDamageCount(), is(0));
        assertThat(defender.getStressCount(), is(1));
        assertFalse(defender.isDestroyed());
    }

    /**
     * Test the <code>dealDamage()</code> method.
     */
    @Test
    public void dealDamage2_2_1()
    {
        // Setup.
        final List<DamageCard> damageDeck = new ArrayList<DamageCard>();
        damageDeck.add(DamageCard.THRUST_CONTROL_FIRE);
        damageDeck.add(DamageCard.THRUST_CONTROL_FIRE);
        damageDeck.add(DamageCard.DIRECT_HIT);
        final SSEnvironment environment = new SSEnvironment(damageDeck);
        final Agent imperialAgent = testData.createImperialAgent();
        final SSToken defender = new SSToken(Pilot.ACADEMY_PILOT, imperialAgent);
        final int hullValue = defender.getHullValue();
        final int hitCount = 2;
        final int criticalHitCount = 2;
        final int evadeCount = 1;
        final DamageDealer damageDealer = new DamageDealer(environment, hitCount, criticalHitCount, defender,
                evadeCount);

        // Run.
        damageDealer.dealDamage();

        // Verify.
        assertThat(defender.getDamageCount(), is(2));
        assertThat(defender.getCriticalDamageCount(), is(1));
        assertThat(defender.getHullValue(), is(hullValue - 1));
        assertThat(defender.getStressCount(), is(1));
        assertTrue(defender.isDestroyed());
    }
}
