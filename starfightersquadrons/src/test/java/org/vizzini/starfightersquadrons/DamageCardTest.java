package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.junit.Test;
import org.vizzini.starfightersquadrons.DamageCard;
import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ManeuverAction;
import org.vizzini.starfightersquadrons.ManeuverSet;
import org.vizzini.starfightersquadrons.Phase;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.UpgradeCard;
import org.vizzini.starfightersquadrons.UpgradeCardList;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.DamageCard.Trait;
import org.vizzini.starfightersquadrons.Maneuver.Bearing;
import org.vizzini.starfightersquadrons.Maneuver.Difficulty;
import org.vizzini.starfightersquadrons.ShipAction.DamageCardShipAction;
import org.vizzini.starfightersquadrons.UpgradeCard.SecondaryWeaponUpgradeCard;

/**
 * Provides tests for the <code>Damage</code> class.
 */
public final class DamageCardTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>activateEffect()</code> method.
     */
    @Test
    public void activateEffectDamagedCockpit()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.DAMAGED_COCKPIT;
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));

        // Run.
        damage.dealEffect(environment, defender);

        // Verify.
        assertThat(defender.getPilotSkillValue(), is(0));
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(1));
    }

    /**
     * Test the <code>activateEffect()</code> method.
     */
    @Test
    public void activateEffectDamagedEngine()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.DAMAGED_ENGINE;
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));

        // Run.
        damage.dealEffect(environment, defender);

        // Verify.
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(1));
        {
            final ManeuverSet result = defender.getManeuvers().valuesByBearing(Bearing.TURN_LEFT);
            assertThat(result.size(), is(2));
            for (final Maneuver maneuver : result)
            {
                assertThat(maneuver.getDifficulty(), is(Difficulty.HARD));
            }
        }
        {
            final ManeuverSet result = defender.getManeuvers().valuesByBearing(Bearing.TURN_RIGHT);
            assertThat(result.size(), is(2));
            for (final Maneuver maneuver : result)
            {
                assertThat(maneuver.getDifficulty(), is(Difficulty.HARD));
            }
        }
    }

    /**
     * Test the <code>activateEffect()</code> method.
     */
    @Test
    public void activateEffectDamagedSensorArray()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.DAMAGED_SENSOR_ARRAY;
        assertFalse(defender.getShipActions().isEmpty());
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));

        // Run.
        damage.dealEffect(environment, defender);

        // Verify.
        assertThat(defender.getShipActions().size(), is(1));
        assertThat(defender.getShipActions().iterator().next(), is(DamageCardShipAction.class));
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(1));
    }

    /**
     * Test the <code>activateEffect()</code> method.
     */
    @Test
    public void activateEffectDirectHit()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.DIRECT_HIT;
        final int hullValue = defender.getHullValue();
        assertThat(hullValue, is(3));
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));

        // Run.
        damage.dealEffect(environment, defender);

        // Verify.
        assertThat(defender.getHullValue(), is(hullValue - 1));
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(1));
    }

    /**
     * Test the <code>activateEffect()</code> method.
     */
    @Test
    public void activateEffectInjuredPilot()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAgent rebelAgent = environment.getRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList();
        upgrades.add(UpgradeCard.DETERMINATION);
        final SSToken defender = new SSToken(Pilot.LUKE_SKYWALKER, rebelAgent, upgrades);
        final DamageCard damage = DamageCard.INJURED_PILOT;
        assertThat(defender.getUpgradeCount(), is(1));
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));

        // Run.
        damage.dealEffect(environment, defender);

        // Verify.
        assertThat(defender.getPilotSkillValue(), is(0));
        assertThat(defender.getUpgradeCount(), is(0));
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(1));
    }

    /**
     * Test the <code>activateEffect()</code> method.
     */
    @Test
    public void activateEffectMinorExplosion()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.MINOR_EXPLOSION;
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));

        // Run.
        damage.dealEffect(environment, defender);

        // Verify.
        final int damageCount = defender.getDamageCount();
        assertTrue((1 <= damageCount) && (damageCount <= 2));
        assertThat(defender.getCriticalDamageCount(), is(0));
    }

    /**
     * Test the <code>activateEffect()</code> method.
     */
    @Test
    public void activateEffectMunitionsFailure()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAgent agent = testData.createRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(SecondaryWeaponUpgradeCard.PROTON_TORPEDOES);
        final SSToken defender = new SSToken(Pilot.ROOKIE_PILOT, agent, upgrades);
        final DamageCard damage = DamageCard.MUNITIONS_FAILURE;
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));
        assertThat(defender.getSecondaryWeapons().size(), is(1));

        // Run.
        damage.dealEffect(environment, defender);

        // Verify.
        assertThat(defender.getDamageCount(), is(1));
        assertThat(defender.getCriticalDamageCount(), is(0));
        assertThat(defender.getSecondaryWeapons().size(), is(0));
    }

    /**
     * Test the <code>activateEffect()</code> method.
     */
    @Test
    public void activateEffectStructuralDamage()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.STRUCTURAL_DAMAGE;
        final int agility = defender.getAgilityValue();
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));
        assertThat(defender.getStressCount(), is(0));

        // Run.
        damage.dealEffect(environment, defender);

        // Verify.
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(1));
        assertThat(defender.getAgilityValue(), is(agility - 1));
    }

    /**
     * Test the <code>activateEffect()</code> method.
     */
    @Test
    public void activateEffectThrustControlFire()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.THRUST_CONTROL_FIRE;
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));
        assertThat(defender.getStressCount(), is(0));

        // Run.
        damage.dealEffect(environment, defender);

        // Verify.
        assertThat(defender.getDamageCount(), is(1));
        assertThat(defender.getCriticalDamageCount(), is(0));
        assertThat(defender.getStressCount(), is(1));
    }

    /**
     * Test the <code>activateEffect()</code> method.
     */
    @Test
    public void activateEffectWeaponMalfunction()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.WEAPON_MALFUNCTION;
        final int primaryWeapon = defender.getPrimaryWeaponValue();
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));
        assertThat(defender.getStressCount(), is(0));

        // Run.
        damage.dealEffect(environment, defender);

        // Verify.
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(1));
        assertThat(defender.getPrimaryWeaponValue(), is(primaryWeapon - 1));
    }

    /**
     * Test the <code>createDeck()</code> method.
     */
    @Test
    public void createDeck()
    {
        // Run.
        final List<DamageCard> result = DamageCard.createDeck();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(33));
        final Set<DamageCard> set = new HashSet<DamageCard>();
        set.addAll(result);
        assertThat(set.size(), is(14));
    }

    /**
     * Test the <code>doAction()</code> method.
     */
    @Test
    public void doActionConsoleFire()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.CONSOLE_FIRE;
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));
        damage.dealEffect(environment, defender);

        // Run.
        damage.doAction(environment, defender);

        // Verify.
        final int damageCount = defender.getDamageCount();
        assertTrue((0 <= damageCount) && (damageCount <= 1));
        assertThat(defender.getCriticalDamageCount(), is(0));
    }

    /**
     * Test the <code>doAction()</code> method.
     */
    @Test
    public void doActionDamagedSensorArray()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.DAMAGED_SENSOR_ARRAY;
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));
        damage.dealEffect(environment, defender);

        // Run.
        damage.doAction(environment, defender);

        // Verify.
        final int damageCount = defender.getDamageCount();
        final int criticalDamageCount = defender.getCriticalDamageCount();
        if (damageCount == 0)
        {
            // Didn't roll a hit.
            assertThat(defender.getShipActions().size(), is(1));
            assertThat(defender.getShipActions().iterator().next(), is(DamageCardShipAction.class));
            assertThat(damageCount, is(0));
            assertThat(criticalDamageCount, is(1));
        }
        else
        {
            assertFalse(defender.getShipActions().isEmpty());
            assertThat(damageCount, is(1));
            assertThat(criticalDamageCount, is(0));
        }
    }

    /**
     * Test the <code>doAction()</code> method.
     */
    @Test
    public void doActionStructuralDamage()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.STRUCTURAL_DAMAGE;
        final int agility = defender.getAgilityValue();
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));
        damage.dealEffect(environment, defender);
        assertThat(defender.getAgilityValue(), is(agility - 1));

        // Run.
        damage.doAction(environment, defender);

        // Verify.
        final int agility2 = defender.getAgilityValue();
        final int damageCount = defender.getDamageCount();
        final int criticalDamageCount = defender.getCriticalDamageCount();
        if (damageCount == 0)
        {
            // Didn't roll a hit.
            assertThat(agility2, is(agility - 1));
            assertThat(damageCount, is(0));
            assertThat(criticalDamageCount, is(1));
        }
        else
        {
            assertThat(agility2, is(agility));
            assertThat(damageCount, is(1));
            assertThat(criticalDamageCount, is(0));
        }
    }

    /**
     * Test the <code>doAction()</code> method.
     */
    @Test
    public void doActionWeaponMalfunction()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.WEAPON_MALFUNCTION;
        final int primaryWeapon = defender.getPrimaryWeaponValue();
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));
        damage.dealEffect(environment, defender);

        // Run.
        damage.doAction(environment, defender);

        // Verify.
        final int primaryWeapon2 = defender.getPrimaryWeaponValue();
        final int damageCount = defender.getDamageCount();
        final int criticalDamageCount = defender.getCriticalDamageCount();
        if (damageCount == 0)
        {
            // Didn't roll a hit.
            assertThat(primaryWeapon2, is(primaryWeapon - 1));
            assertThat(damageCount, is(0));
            assertThat(criticalDamageCount, is(1));
        }
        else
        {
            assertThat(primaryWeapon2, is(primaryWeapon));
            assertThat(damageCount, is(1));
            assertThat(criticalDamageCount, is(0));
        }
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(DamageCard.BLINDED_PILOT.getName(), is("Blinded Pilot"));

        assertThat(DamageCard.CONSOLE_FIRE.getName(), is("Console Fire"));
    }

    /**
     * Test the <code>getTrait()</code> method.
     */
    @Test
    public void getTrait()
    {
        assertThat(DamageCard.BLINDED_PILOT.getTrait(), is(Trait.PILOT));

        assertThat(DamageCard.CONSOLE_FIRE.getTrait(), is(Trait.SHIP));
    }

    /**
     * Test the <code>maneuverEffect()</code> method.
     */
    @Test
    public void maneuverEffectMinorHullBreach()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.MINOR_HULL_BREACH;
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));
        final Maneuver maneuver = Maneuver.STRAIGHT_4_HARD;
        final SSPosition fromPosition = environment.getPositionFor(defender);
        final ShipBase shipBase = defender.getShip().getShipBase();
        final ManeuverAction maneuverAction = new ManeuverAction(environment, maneuver, fromPosition, shipBase);
        defender.setManeuverAction(maneuverAction);
        damage.dealEffect(environment, defender);

        // Run.
        damage.phaseEffect(environment, defender, Phase.ACTIVATION_EXECUTE_MANEUVER);

        // Verify.
        final int damageCount = defender.getDamageCount();
        final int criticalDamageCount = defender.getCriticalDamageCount();
        if (damageCount == 0)
        {
            // Didn't roll a hit.
            assertThat(damageCount, is(0));
            assertThat(criticalDamageCount, is(1));
        }
        else
        {
            assertThat(damageCount, is(1));
            assertThat(criticalDamageCount, is(1));
        }
    }

    /**
     * Test the <code>phaseEffect()</code> method.
     */
    @Test
    public void phaseEffectConsoleFire()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = TestData.findShip(rebelTokens, Ship.X_WING);
        final DamageCard damage = DamageCard.CONSOLE_FIRE;
        assertThat(defender.getDamageCount(), is(0));
        assertThat(defender.getCriticalDamageCount(), is(0));
        damage.dealEffect(environment, defender);

        // Run.
        damage.phaseEffect(environment, defender, Phase.COMBAT_START);

        // Verify.
        final int damageCount = defender.getDamageCount();
        assertTrue((0 <= damageCount) && (damageCount <= 1));
        assertThat(defender.getCriticalDamageCount(), is(1));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        // Run.
        final DamageCard[] result = DamageCard.values();

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(14));
    }

    /**
     * Test the <code>valuesByTrait()</code> method.
     */
    @Test
    public void valuesByTraitPilot()
    {
        // Run.
        final DamageCard[] result = DamageCard.valuesByTrait(Trait.PILOT);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(4));
        assertThat(result[0], is(DamageCard.BLINDED_PILOT));
        assertThat(result[3], is(DamageCard.STUNNED_PILOT));
    }

    /**
     * Test the <code>valuesByTrait()</code> method.
     */
    @Test
    public void valuesByTraitShip()
    {
        // Run.
        final DamageCard[] result = DamageCard.valuesByTrait(Trait.SHIP);

        // Verify.
        assertNotNull(result);
        assertThat(result.length, is(10));
        assertThat(result[0], is(DamageCard.CONSOLE_FIRE));
        assertThat(result[9], is(DamageCard.WEAPON_MALFUNCTION));
    }
}
