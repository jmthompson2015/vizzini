package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.List;

import org.junit.Test;
import org.vizzini.starfightersquadrons.AttackDice;
import org.vizzini.starfightersquadrons.CombatAction;
import org.vizzini.starfightersquadrons.Phase;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.TargetLock;
import org.vizzini.starfightersquadrons.UpgradeCard;
import org.vizzini.starfightersquadrons.Weapon;
import org.vizzini.starfightersquadrons.SSAdjudicator;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.UpgradeCard.SecondaryWeaponUpgradeCard;

/**
 * Provides tests for the <code>UpgradeCard</code> class.
 */
public final class SecondaryWeaponUpgradeCardTest
{
    /** Before blank count. */
    private int blankCount0 = -1;

    /** Before critical hit count. */
    private int criticalHitCount0 = -1;

    /** Before focus count. */
    private int focusCount0 = -1;

    /** Before hit count. */
    private int hitCount0 = -1;

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>phaseEffect()</code> method.
     */
    @Test
    public void phaseEffectAdvancedProtonTorpedoes()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAdjudicator adjudicator = new SSAdjudicator();
        final List<SSToken> attackers = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(attackers, Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);
        final UpgradeCard upgrade = SecondaryWeaponUpgradeCard.ADVANCED_PROTON_TORPEDOES;
        attacker.getUpgrades().add(upgrade);
        assertThat(attacker.getUpgradeCount(), is(1));
        final Weapon weapon = (Weapon)upgrade;
        final List<SSToken> defenders = environment.getTokensForTeam(SSTeam.IMPERIAL);
        final SSToken defender = TestData.findShip(defenders, Ship.TIE_FIGHTER);
        final SSPosition defenderPosition = environment.getPositionFor(defender);
        environment.removeToken(defenderPosition);
        environment.placeToken(new SSPosition(defenderPosition.getX(), attackerPosition.getY() - 160,
                defenderPosition.getHeading()), defender);
        TargetLock.getInstance(attacker, defender);
        blankCount0 = -1;
        focusCount0 = -1;
        environment.addPhaseListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final Phase phase = (Phase)event.getNewValue();
                if (phase == Phase.COMBAT_ROLL_ATTACK_DICE)
                {
                    final AttackDice attackDice = attacker.getAttackDice();
                    // System.out.println("before atttackDice = " + attackDice);
                    blankCount0 = attackDice.getBlankCount();
                    focusCount0 = attackDice.getFocusCount();
                }
            }
        });

        // Run / Verify.
        environment.setPhase(Phase.COMBAT_START);
        final CombatAction combatAction = new CombatAction(environment, adjudicator, attacker, weapon, defender);
        combatAction.doIt();
        // System.out.println("after  atttackDice = " + attacker.getAttackDice());
        // System.out.println("blankCount0, focusCount0 = " + blankCount0 + ", " + focusCount0);
        assertThat(attacker.getUpgradeCount(), is(0));
        final AttackDice attackDice = attacker.getAttackDice();
        final int blankCount1 = attackDice.getBlankCount();
        final int focusCount1 = attackDice.getFocusCount();
        // System.out.println("blankCount1, focusCount1 = " + blankCount1 + ", " + focusCount1);
        if (blankCount0 == 0)
        {
            // No change.
            assertThat(blankCount1, is(blankCount0));
            assertThat(focusCount1, is(focusCount0));
        }
        else
        {
            assertThat(blankCount1, is(0));
            assertThat(focusCount1, is(focusCount0 + blankCount0));
        }
    }

    /**
     * Test the <code>phaseEffect()</code> method.
     */
    @Test
    public void phaseEffectConcussionMissles()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAdjudicator adjudicator = new SSAdjudicator();
        final List<SSToken> attackers = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(attackers, Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);
        final UpgradeCard upgrade = SecondaryWeaponUpgradeCard.CONCUSSION_MISSILES;
        attacker.getUpgrades().add(upgrade);
        assertThat(attacker.getUpgradeCount(), is(1));
        final Weapon weapon = (Weapon)upgrade;
        final List<SSToken> defenders = environment.getTokensForTeam(SSTeam.IMPERIAL);
        final SSToken defender = TestData.findShip(defenders, Ship.TIE_FIGHTER);
        final SSPosition defenderPosition = environment.getPositionFor(defender);
        environment.removeToken(defenderPosition);
        environment.placeToken(new SSPosition(defenderPosition.getX(), attackerPosition.getY() - 160,
                defenderPosition.getHeading()), defender);
        TargetLock.getInstance(attacker, defender);
        blankCount0 = -1;
        hitCount0 = -1;
        environment.addPhaseListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final Phase phase = (Phase)event.getNewValue();
                if (phase == Phase.COMBAT_ROLL_ATTACK_DICE)
                {
                    final AttackDice attackDice = attacker.getAttackDice();
                    // System.out.println("before atttackDice = " + attackDice);
                    blankCount0 = attackDice.getBlankCount();
                    hitCount0 = attackDice.getHitCount();
                }
            }
        });

        // Run / Verify.
        environment.setPhase(Phase.COMBAT_START);
        final CombatAction combatAction = new CombatAction(environment, adjudicator, attacker, weapon, defender);
        combatAction.doIt();
        // System.out.println("after  atttackDice = " + attacker.getAttackDice());
        // System.out.println("blankCount0, hitCount0 = " + blankCount0 + ", " + hitCount0);
        assertThat(attacker.getUpgradeCount(), is(0));
        final AttackDice attackDice = attacker.getAttackDice();
        final int blankCount1 = attackDice.getBlankCount();
        final int hitCount1 = attackDice.getHitCount();
        // System.out.println("blankCount1, hitCount1 = " + blankCount1 + ", " + hitCount1);
        if (blankCount0 == 0)
        {
            // No change.
            assertThat(blankCount1, is(blankCount0));
            assertThat(hitCount1, is(hitCount0));
        }
        else
        {
            assertThat(blankCount1, is(blankCount0 - 1));
            assertThat(hitCount1, is(hitCount0 + 1));
        }
    }

    /**
     * Test the <code>phaseEffect()</code> method.
     */
    @Test
    public void phaseEffectProtonTorpedoes()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSAdjudicator adjudicator = new SSAdjudicator();
        final List<SSToken> attackers = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = TestData.findShip(attackers, Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);
        final UpgradeCard upgrade = SecondaryWeaponUpgradeCard.PROTON_TORPEDOES;
        attacker.getUpgrades().add(upgrade);
        assertThat(attacker.getUpgradeCount(), is(1));
        final Weapon weapon = (Weapon)upgrade;
        final List<SSToken> defenders = environment.getTokensForTeam(SSTeam.IMPERIAL);
        final SSToken defender = TestData.findShip(defenders, Ship.TIE_FIGHTER);
        final SSPosition defenderPosition = environment.getPositionFor(defender);
        environment.removeToken(defenderPosition);
        environment.placeToken(new SSPosition(defenderPosition.getX(), attackerPosition.getY() - 160,
                defenderPosition.getHeading()), defender);
        TargetLock.getInstance(attacker, defender);
        focusCount0 = -1;
        criticalHitCount0 = -1;
        environment.addPhaseListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final Phase phase = (Phase)event.getNewValue();
                if (phase == Phase.COMBAT_ROLL_ATTACK_DICE)
                {
                    final AttackDice attackDice = attacker.getAttackDice();
                    // System.out.println("before atttackDice = " + attackDice);
                    focusCount0 = attackDice.getFocusCount();
                    criticalHitCount0 = attackDice.getCriticalHitCount();
                }
            }
        });

        // Run / Verify.
        environment.setPhase(Phase.COMBAT_START);
        final CombatAction combatAction = new CombatAction(environment, adjudicator, attacker, weapon, defender);
        combatAction.doIt();
        // System.out.println("after  atttackDice = " + attacker.getAttackDice());
        // System.out.println("focusCount0, criticalHitCount0 = " + focusCount0 + ", " + criticalHitCount0);
        assertThat(attacker.getUpgradeCount(), is(0));
        final AttackDice attackDice = attacker.getAttackDice();
        final int focusCount1 = attackDice.getFocusCount();
        final int criticalHitCount1 = attackDice.getCriticalHitCount();
        // System.out.println("focusCount1, criticalHitCount1 = " + focusCount1 + ", " + criticalHitCount1);
        if (focusCount0 == 0)
        {
            // No change.
            assertThat(focusCount1, is(focusCount0));
            assertThat(criticalHitCount1, is(criticalHitCount0));
        }
        else
        {
            assertThat(focusCount1, is(focusCount0 - 1));
            assertThat(criticalHitCount1, is(criticalHitCount0 + 1));
        }
    }
}
