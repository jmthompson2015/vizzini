package org.vizzini.starfightersquadrons;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>SSAdjudicator</code> class.
 */
public final class SSAdjudicatorTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>canAttack()</code> method.
     */
    @Test
    public void canAttack()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken token0 = environment.getAttackers(SSTeam.IMPERIAL).get(0);
        final SSToken token1 = environment.getAttackers(SSTeam.IMPERIAL).get(1);
        token1.increaseCloakCount();
        final SSToken token2 = environment.getAttackers(SSTeam.REBEL).get(0);
        final SSAdjudicator adjudicator = new SSAdjudicator();

        // Run / Verify.
        assertTrue(adjudicator.canAttack(token0));
        assertFalse(adjudicator.canAttack(token1));
        assertTrue(adjudicator.canAttack(token2));
    }

    /**
     * Test the <code>canDecloak()</code> method.
     */
    @Test
    public void canDecloak()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken token0 = environment.getAttackers(SSTeam.IMPERIAL).get(0);
        final SSToken token1 = environment.getAttackers(SSTeam.IMPERIAL).get(1);
        token1.increaseCloakCount();
        final SSToken token2 = environment.getAttackers(SSTeam.REBEL).get(0);
        final SSAdjudicator adjudicator = new SSAdjudicator();

        // Run / Verify.
        assertFalse(adjudicator.canDecloak(token0));
        assertTrue(adjudicator.canDecloak(token1));
        assertFalse(adjudicator.canDecloak(token2));
    }

    /**
     * Test the <code>canModifyAttackDice()</code> method.
     */
    @Test
    public void canModifyAttackDice()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken token0 = environment.getAttackers(SSTeam.IMPERIAL).get(0);
        final SSToken token1 = environment.getAttackers(SSTeam.IMPERIAL).get(1);
        token1.increaseFocusCount();
        final SSToken token2 = environment.getAttackers(SSTeam.REBEL).get(0);
        TargetLock.getInstance(token2, token1);
        final SSAdjudicator adjudicator = new SSAdjudicator();

        // Run / Verify.
        assertFalse(adjudicator.canModifyAttackDice(token0, token2));
        assertTrue(adjudicator.canModifyAttackDice(token1, token2));
        assertFalse(adjudicator.canModifyAttackDice(token2, token0));
        assertTrue(adjudicator.canModifyAttackDice(token2, token1));

        // Cleanup.
        TargetLock.freeInstance(token2.getAttackerTargetLock());
    }

    /**
     * Test the <code>canModifyDefenseDice()</code> method.
     */
    @Test
    public void canModifyDefenseDice()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken token0 = environment.getAttackers(SSTeam.IMPERIAL).get(0);
        final SSToken token1 = environment.getAttackers(SSTeam.IMPERIAL).get(1);
        token1.increaseEvadeCount();
        final SSToken token2 = environment.getAttackers(SSTeam.REBEL).get(0);
        token2.increaseFocusCount();
        final SSAdjudicator adjudicator = new SSAdjudicator();

        // Run / Verify.
        assertFalse(adjudicator.canModifyDefenseDice(token0));
        assertTrue(adjudicator.canModifyDefenseDice(token1));
        assertTrue(adjudicator.canModifyDefenseDice(token2));
    }

    /**
     * Test the <code>canSelectShipAction()</code> method.
     */
    @Test
    public void canSelectShipAction()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken token = environment.getAttackers(SSTeam.IMPERIAL).get(0);
        final SSAdjudicator adjudicator = new SSAdjudicator();

        // Run / Verify.
        assertTrue(adjudicator.canSelectShipAction(token));
    }

    /**
     * Test the <code>canSelectShipAction()</code> method.
     */
    @Test
    public void canSelectShipActionStressed()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken token = environment.getAttackers(SSTeam.IMPERIAL).get(1);
        token.increaseStressCount();
        final SSAdjudicator adjudicator = new SSAdjudicator();

        // Run / Verify.
        assertFalse(adjudicator.canSelectShipAction(token));
    }

    /**
     * Test the <code>canSelectShipAction()</code> method.
     */
    @Test
    public void canSelectShipActionTouching()
    {
        // Setup.
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken defender = TestData.findShip(environment.getTokensForTeam(SSTeam.IMPERIAL), Ship.TIE_FIGHTER);
        final SSPosition defenderPosition = environment.getPositionFor(defender);
        final SSToken attacker = TestData.findShip(environment.getTokensForTeam(SSTeam.REBEL), Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);
        environment.removeToken(attackerPosition);
        final SSPosition attackerPosition2 = new SSPosition(defenderPosition.getX(), defenderPosition.getY() + 60,
                attackerPosition.getHeading());
        environment.placeToken(attackerPosition2, attacker);
        final ManeuverAction maneuverAction = new ManeuverAction(environment, Maneuver.STRAIGHT_1_EASY,
                attackerPosition2, attacker.getShip().getShipBase());
        maneuverAction.doIt();
        final SSAdjudicator adjudicator = new SSAdjudicator();

        // Run / Verify.
        assertFalse(adjudicator.canSelectShipAction(attacker));
    }
}
