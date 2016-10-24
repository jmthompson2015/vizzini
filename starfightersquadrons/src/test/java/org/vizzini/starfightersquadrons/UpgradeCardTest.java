package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.starfightersquadrons.AttackDice;
import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ManeuverAction;
import org.vizzini.starfightersquadrons.ManeuverSet;
import org.vizzini.starfightersquadrons.Phase;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.UpgradeCard;
import org.vizzini.starfightersquadrons.UpgradeCardList;
import org.vizzini.starfightersquadrons.UpgradeType;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.Maneuver.Difficulty;
import org.vizzini.starfightersquadrons.RangeRuler.Range;
import org.vizzini.starfightersquadrons.UpgradeCard.SecondaryWeaponUpgradeCard;

/**
 * Provides tests for the <code>UpgradeCard</code> class.
 */
public final class UpgradeCardTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>activateEffect()</code> method.
     */
    @Test
    public void activateEffectR2Astromech()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAgent rebelAgent = environment.getRebelAgent();
        final UpgradeCardList upgrades = new UpgradeCardList(UpgradeCard.R2_ASTROMECH);
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, rebelAgent, upgrades);
        assertThat(token.getUpgradeCount(), is(1));

        // Run / Verify.
        {
            final ManeuverSet result = token.getManeuvers().valuesBySpeed(1);
            assertThat(result.size(), is(3));
            for (final Maneuver maneuver : result)
            {
                assertThat(maneuver.getDifficulty(), is(Difficulty.EASY));
            }
        }
        {
            final ManeuverSet result = token.getManeuvers().valuesBySpeed(2);
            assertThat(result.size(), is(5));
            for (final Maneuver maneuver : result)
            {
                assertThat(maneuver.getDifficulty(), is(Difficulty.EASY));
            }
        }
    }

    /**
     * Test the <code>maneuverEffect()</code> method.
     */
    @Test
    public void maneuverEffectR2D2()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAgent rebelAgent = environment.getRebelAgent();
        final UpgradeCard upgrade = UpgradeCard.R2_D2;
        final UpgradeCardList upgrades = new UpgradeCardList();
        upgrades.add(upgrade);
        final SSToken token = new SSToken(Pilot.ROOKIE_PILOT, rebelAgent, upgrades);
        final SSPosition fromPosition = new SSPosition(400, 400, 0);
        environment.placeToken(fromPosition, token);
        environment.setActiveToken(token);
        final int shieldValue = token.getShieldValue();
        token.decreaseShieldCount();
        assertThat(token.getUpgradeCount(), is(1));
        final Maneuver maneuver = Maneuver.STRAIGHT_1_EASY;
        final ShipBase shipBase = token.getShip().getShipBase();
        final ManeuverAction maneuverAction = new ManeuverAction(environment, maneuver, fromPosition, shipBase);
        token.setManeuverAction(maneuverAction);

        // Run.
        upgrade.phaseEffect(environment, token, Phase.ACTIVATION_EXECUTE_MANEUVER);

        // Verify.
        assertThat(token.getShieldValue(), is(shieldValue));
        assertThat(token.getShieldCount(), is(shieldValue));

        // Run.
        upgrade.phaseEffect(environment, token, Phase.ACTIVATION_EXECUTE_MANEUVER);

        // Verify.
        assertThat(token.getShieldValue(), is(shieldValue));
        assertThat(token.getShieldCount(), is(shieldValue));
    }

    /**
     * Test the <code>phaseEffect()</code> method.
     */
    @Test
    public void phaseEffectMercenaryCopilot()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken attacker = TestData.findShip(environment.getTokensForTeam(SSTeam.REBEL), Ship.YT_1300);
        environment.setActiveToken(attacker);
        attacker.setRange(Range.THREE);
        final AttackDice attackDice = new AttackDice(5);
        attacker.setAttackDice(attackDice);

        // Make sure there is at least one hit result.
        int hitCount = attackDice.getHitCount();
        while (hitCount < 1)
        {
            attackDice.rerollAll();
            hitCount = attackDice.getFocusCount();
        }
        final int criticalHitCount = attackDice.getCriticalHitCount();

        // Run.
        UpgradeCard.MERCENARY_COPILOT.phaseEffect(environment, attacker, Phase.COMBAT_ROLL_ATTACK_DICE);

        // Verify.
        assertThat(attackDice.getHitCount(), is(hitCount - 1));
        assertThat(attackDice.getCriticalHitCount(), is(criticalHitCount + 1));
    }

    /**
     * Test the <code>phaseEffect()</code> method.
     */
    @Test
    public void phaseEffectRebelCaptive()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken attacker = TestData.findShip(environment.getTokensForTeam(SSTeam.IMPERIAL),
                Ship.FIRESPRAY_31);
        final SSToken defender = TestData.findShip(environment.getTokensForTeam(SSTeam.REBEL), Ship.X_WING);
        final UpgradeCard upgrade = UpgradeCard.REBEL_CAPTIVE;
        defender.getUpgrades().add(upgrade);

        // Run.
        environment.setActiveToken(defender);
        upgrade.phaseEffect(environment, defender, Phase.COMBAT_START);
        assertTrue(defender.isUpgradeActive(upgrade));
        environment.setActiveToken(attacker);
        attacker.setDefender(defender);
        upgrade.phaseEffect(environment, attacker, Phase.COMBAT_DECLARE_TARGET);
        environment.setActiveToken(defender);
        upgrade.phaseEffect(environment, defender, Phase.COMBAT_END);
        assertFalse(defender.isUpgradeActive(upgrade));

        // Verify.
        assertThat(attacker.getStressCount(), is(1));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        assertThat(SecondaryWeaponUpgradeCard.values().length, is(91));
        assertThat(UpgradeCard.values().length, is(91));
    }

    /**
     * Test the <code>valuesByType()</code> method.
     */
    @Test
    public void valuesByType()
    {
        assertThat(UpgradeCard.valuesByType(UpgradeType.ASTROMECH).length, is(12));
        assertThat(UpgradeCard.valuesByType(UpgradeType.BOMB).length, is(3));
        assertThat(UpgradeCard.valuesByType(UpgradeType.CANNON).length, is(3));
        // TODO: add Cargo upgrade cards
        // assertThat(UpgradeCard.valuesByType(UpgradeType.CARGO).length, is(10));
        assertThat(UpgradeCard.valuesByType(UpgradeType.CREW).length, is(24));
        assertThat(UpgradeCard.valuesByType(UpgradeType.ELITE).length, is(18));
        // TODO: add Hardpoint upgrade cards
        // assertThat(UpgradeCard.valuesByType(UpgradeType.HARDPOINT).length, is(2));
        assertThat(UpgradeCard.valuesByType(UpgradeType.MISSILE).length, is(5));
        assertThat(UpgradeCard.valuesByType(UpgradeType.MODIFICATION).length, is(10));
        assertThat(UpgradeCard.valuesByType(UpgradeType.SENSOR).length, is(3));
        assertThat(UpgradeCard.valuesByType(UpgradeType.TEAM).length, is(3));
        // TODO: add Title upgrade cards
        // assertThat(UpgradeCard.valuesByType(UpgradeType.TITLE).length, is(11));
        assertThat(UpgradeCard.valuesByType(UpgradeType.TORPEDO).length, is(3));
        assertThat(UpgradeCard.valuesByType(UpgradeType.TURRET).length, is(2));
    }
}
