package org.vizzini.starfightersquadrons;

import java.util.List;

import org.vizzini.core.game.Agent;
import org.vizzini.starfightersquadrons.swingui.WeaponAndDefenderChooser.WeaponAndDefender;

/**
 * Defines methods required by an agent for Starfighter Squadrons.
 */
public interface SSAgent extends Agent
{
    /**
     * @return a list of new tokens.
     */
    List<SSToken> buildSquad();

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param token Token.
     *
     * @return a target token.
     */
    Maneuver chooseDecloakManeuver(final SSEnvironment environment, final SSAdjudicator adjudicator,
            SSToken token);

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param attacker Attacker.
     *
     * @return a target token.
     */
    WeaponAndDefender chooseWeaponAndDefender(final SSEnvironment environment, final SSAdjudicator adjudicator,
            SSToken attacker);

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param attacker Token.
     * @param attackDice Attack dice.
     * @param defender Defender.
     *
     * @return a new action.
     */
    ModifyAttackDiceAction getModifyAttackDiceAction(final SSEnvironment environment,
            final SSAdjudicator adjudicator, SSToken attacker, AttackDice attackDice, SSToken defender);

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param attacker Token.
     * @param attackDice Attack dice.
     * @param defender Defender.
     * @param defenseDice Defense dice.
     *
     * @return a new action.
     */
    ModifyDefenseDiceAction getModifyDefenseDiceAction(final SSEnvironment environment,
            final SSAdjudicator adjudicator, SSToken attacker, AttackDice attackDice, SSToken defender,
            DefenseDice defenseDice);

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     *
     * @return a new action.
     */
    PlanningAction getPlanningAction(final SSEnvironment environment, final SSAdjudicator adjudicator);

    /**
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param attacker Attacker.
     *
     * @return a new action.
     */
    ShipActionAction getShipActionAction(final SSEnvironment environment, final SSAdjudicator adjudicator,
            SSToken attacker);
}
