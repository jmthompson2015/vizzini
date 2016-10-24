package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.List;

import org.junit.Test;
import org.vizzini.starfightersquadrons.AttackDice;
import org.vizzini.starfightersquadrons.DefenseDice;
import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ModifyAttackDiceAction;
import org.vizzini.starfightersquadrons.ModifyDefenseDiceAction;
import org.vizzini.starfightersquadrons.PlanningAction;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.ShipAction;
import org.vizzini.starfightersquadrons.ShipActionAction;
import org.vizzini.starfightersquadrons.SSAdjudicator;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSGameInjector;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.swingui.WeaponAndDefenderChooser.WeaponAndDefender;

/**
 * Provides tests for the <code>Pilot</code> class.
 */
public final class SimpleAgentTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>chooseWeaponAndDefender()</code> method.
     */
    @Test
    public void chooseWeaponAndDefender()
    {
        // Setup.
        final SSGameInjector injector = new SSGameInjector();
        final SSEnvironment environment = testData.createEnvironment();
        final SSAdjudicator adjudicator = injector.injectAdjudicator();
        final List<SSToken> tokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken attacker = findShip(tokens, Ship.TIE_FIGHTER);
        final SSPosition fromPosition = environment.getPositionFor(attacker);
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = findShip(rebelTokens, Ship.X_WING);
        SSPosition position = environment.getPositionFor(defender);
        environment.removeToken(position);
        position = new SSPosition(fromPosition.getX() + 0, fromPosition.getY() + 100, -90);
        environment.placeToken(position, defender);
        final SSAgent agent = environment.getImperialAgent();

        // Run.
        final WeaponAndDefender result = agent.chooseWeaponAndDefender(environment, adjudicator, attacker);

        // Verify.
        assertNotNull(result);
        assertThat(result.getWeapon().getName(), is("Primary Weapon"));
        assertThat(result.getDefender().getShip(), is(Ship.X_WING));
    }

    /**
     * Test the <code>getModifyAttackDiceAction()</code> method.
     */
    @Test
    public void getModifyAttackDiceActionAgentMismatch()
    {
        // Setup.
        final SSGameInjector injector = new SSGameInjector();
        final SSEnvironment environment = testData.createEnvironment();
        final SSAdjudicator adjudicator = injector.injectAdjudicator();
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = findShip(imperialTokens, Ship.TIE_FIGHTER);
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken rebelToken = findShip(rebelTokens, Ship.X_WING);
        final AttackDice attackDice = new AttackDice(3);
        final SSAgent agent = environment.getImperialAgent();

        // Run / Verify.
        try
        {
            agent.getModifyAttackDiceAction(environment, adjudicator, rebelToken, attackDice, imperialToken);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("token does not belong to this agent"));
        }
    }

    /**
     * Test the <code>getModifyAttackDiceAction()</code> method.
     */
    @Test
    public void getModifyAttackDiceActionSpendFocus()
    {
        // Setup.
        final SSGameInjector injector = new SSGameInjector();
        final SSEnvironment environment = testData.createEnvironment();
        final SSAdjudicator adjudicator = injector.injectAdjudicator();
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = findShip(imperialTokens, Ship.TIE_FIGHTER);
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken rebelToken = findShip(rebelTokens, Ship.X_WING);
        imperialToken.increaseFocusCount();
        final AttackDice attackDice = new AttackDice(3);
        while (!((attackDice.getHitCount() + attackDice.getCriticalHitCount()) < attackDice.size()))
        {
            attackDice.rerollAll();
        }
        final SSAgent agent = environment.getImperialAgent();

        // Run.
        final ModifyAttackDiceAction result = agent.getModifyAttackDiceAction(environment, adjudicator, imperialToken,
                attackDice, rebelToken);

        // Verify.
        assertNotNull(result);
        assertThat(result.getModification(), is(ModifyAttackDiceAction.Modification.SPEND_FOCUS));
        assertThat(imperialToken.getFocusCount(), is(1));
        result.doIt();
        assertThat(imperialToken.getFocusCount(), is(0));
    }

    /**
     * Test the <code>getModifyDefenseDiceAction()</code> method.
     */
    @Test
    public void getModifyDefenseDiceActionAgentMismatch()
    {
        // Setup.
        final SSGameInjector injector = new SSGameInjector();
        final SSEnvironment environment = testData.createEnvironment();
        final SSAdjudicator adjudicator = injector.injectAdjudicator();
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken attacker = findShip(imperialTokens, Ship.TIE_FIGHTER);
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = findShip(rebelTokens, Ship.X_WING);
        final AttackDice attackDice = new AttackDice(3);
        final DefenseDice defenseDice = new DefenseDice(3);
        final SSAgent agent = environment.getImperialAgent();

        // Run / Verify.
        try
        {
            agent.getModifyDefenseDiceAction(environment, adjudicator, attacker, attackDice, defender, defenseDice);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("token does not belong to this agent"));
        }
    }

    /**
     * Test the <code>getModifyDefenseDiceAction()</code> method.
     */
    @Test
    public void getModifyDefenseDiceActionNull()
    {
        // Setup.
        final SSGameInjector injector = new SSGameInjector();
        final SSEnvironment environment = testData.createEnvironment();
        final SSAdjudicator adjudicator = injector.injectAdjudicator();
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken attacker = findShip(imperialTokens, Ship.TIE_FIGHTER);
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken defender = findShip(rebelTokens, Ship.X_WING);
        final AttackDice attackDice = new AttackDice(3);
        final DefenseDice defenseDice = new DefenseDice(3);
        final SSAgent agent = environment.getImperialAgent();

        // Run / Verify.
        try
        {
            agent.getModifyDefenseDiceAction(null, adjudicator, attacker, attackDice, defender, defenseDice);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("environment is null."));
        }

        // Run / Verify.
        try
        {
            agent.getModifyDefenseDiceAction(environment, null, attacker, attackDice, defender, defenseDice);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("adjudicator is null."));
        }

        // Run / Verify.
        try
        {
            agent.getModifyDefenseDiceAction(environment, adjudicator, null, attackDice, defender, defenseDice);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("attacker is null."));
        }

        // Run / Verify.
        try
        {
            agent.getModifyDefenseDiceAction(environment, adjudicator, attacker, null, defender, defenseDice);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("attackDice is null."));
        }

        // Run / Verify.
        try
        {
            agent.getModifyDefenseDiceAction(environment, adjudicator, attacker, attackDice, null, defenseDice);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("defender is null."));
        }

        // Run / Verify.
        try
        {
            agent.getModifyDefenseDiceAction(environment, adjudicator, attacker, attackDice, defender, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("defenseDice is null."));
        }
    }

    /**
     * Test the <code>getModifyDefenseDiceAction()</code> method.
     */
    @Test
    public void getModifyDefenseDiceActionSpendEvade()
    {
        // Setup.
        final SSGameInjector injector = new SSGameInjector();
        final SSEnvironment environment = testData.createEnvironment();
        final SSAdjudicator adjudicator = injector.injectAdjudicator();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = findShip(rebelTokens, Ship.X_WING);
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken defender = findShip(imperialTokens, Ship.TIE_FIGHTER);
        defender.increaseEvadeCount();
        final AttackDice attackDice = new AttackDice(3);
        final DefenseDice defenseDice = new DefenseDice(3);
        while (!((attackDice.getHitCount() + attackDice.getCriticalHitCount()) > defenseDice.getEvadeCount()))
        {
            attackDice.rerollAll();
            defenseDice.rerollAll();
        }
        final SSAgent agent = environment.getImperialAgent();

        // Run.
        final ModifyDefenseDiceAction result = agent.getModifyDefenseDiceAction(environment, adjudicator, attacker,
                attackDice, defender, defenseDice);

        // Verify.
        assertNotNull(result);
        assertThat(result.getModification(), is(ModifyDefenseDiceAction.Modification.SPEND_EVADE));
        assertThat(defender.getEvadeCount(), is(1));
        result.doIt();
        assertThat(defender.getEvadeCount(), is(0));
    }

    /**
     * Test the <code>getModifyDefenseDiceAction()</code> method.
     */
    @Test
    public void getModifyDefenseDiceActionSpendFocus()
    {
        // Setup.
        final SSGameInjector injector = new SSGameInjector();
        final SSEnvironment environment = testData.createEnvironment();
        final SSAdjudicator adjudicator = injector.injectAdjudicator();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = findShip(rebelTokens, Ship.X_WING);
        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken defender = findShip(imperialTokens, Ship.TIE_FIGHTER);
        defender.increaseFocusCount();
        final AttackDice attackDice = new AttackDice(3);
        final DefenseDice defenseDice = new DefenseDice(3);
        while (!((defenseDice.getFocusCount() > 0) && ((attackDice.getHitCount() + attackDice.getCriticalHitCount()) > defenseDice
                .getEvadeCount())))
        {
            attackDice.rerollAll();
            defenseDice.rerollAll();
        }
        final SSAgent agent = environment.getImperialAgent();

        // Run.
        final ModifyDefenseDiceAction result = agent.getModifyDefenseDiceAction(environment, adjudicator, attacker,
                attackDice, defender, defenseDice);

        // Verify.
        assertNotNull(result);
        assertThat(result.getModification(), is(ModifyDefenseDiceAction.Modification.SPEND_FOCUS));
        assertThat(defender.getFocusCount(), is(1));
        result.doIt();
        assertThat(defender.getFocusCount(), is(0));
    }

    /**
     * Test the <code>getPlanningAction()</code> method.
     */
    @Test
    public void getPlanningAction()
    {
        // Setup.
        final SSGameInjector injector = new SSGameInjector();
        final SSEnvironment environment = testData.createEnvironment();
        final SSAdjudicator adjudicator = injector.injectAdjudicator();
        final SSAgent agent = environment.getImperialAgent();

        // Run.
        final PlanningAction result = agent.getPlanningAction(environment, adjudicator);

        // Verify.
        assertNotNull(result);
        final List<SSToken> tokens = environment.getAttackers(SSTeam.IMPERIAL);
        for (final SSToken token : tokens)
        {
            final Maneuver maneuver = result.getManeuver(token);
            assertNotNull(maneuver);

            if (token.getShip() == Ship.TIE_FIGHTER)
            {
                assertThat(maneuver, is(Maneuver.STRAIGHT_5_STANDARD));
            }
            else
            {
                assertThat(maneuver, is(Maneuver.STRAIGHT_4_STANDARD));
            }
        }
    }

    /**
     * Test the <code>getShipActionAction()</code> method.
     */
    @Test
    public void getShipActionAction()
    {
        // Setup.
        final SSGameInjector injector = new SSGameInjector();
        final SSEnvironment environment = testData.createEnvironment();
        final SSAdjudicator adjudicator = injector.injectAdjudicator();
        final List<SSToken> tokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken token = findShip(tokens, Ship.TIE_FIGHTER);
        final SSAgent agent = environment.getImperialAgent();

        // Run.
        final ShipActionAction result = agent.getShipActionAction(environment, adjudicator, token);

        // Verify.
        assertNotNull(result);
        assertTrue(ShipAction.TIE_FIGHTER_ACTIONS.contains(result.getShipAction()));
    }

    /**
     * @param tokens Tokens.
     * @param ship Ship.
     * 
     * @return the first token which matches the given ship.
     */
    private SSToken findShip(final List<SSToken> tokens, final Ship ship)
    {
        SSToken token = null;

        for (final SSToken t : tokens)
        {
            if (t.getShip() == ship)
            {
                token = t;
                break;
            }
        }

        return token;
    }
}
