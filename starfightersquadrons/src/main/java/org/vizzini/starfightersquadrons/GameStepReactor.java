package org.vizzini.starfightersquadrons;

/**
 * Defines methods required by a game step reactor.
 * <ol>
 * <li>Apply</li>
 * <li>Remove</li>
 * <li>Planning Phase (start)</li>
 * <li>-Choose Maneuver</li>
 * <li>Planning Phase (end)</li>
 * <li>Activation Phase (start)</li>
 * <li>-Reveal Dial</li>
 * <li>-Execute Maneuver</li>
 * <li><b>-Fled The Battlefield? Is Touching?</b></li>
 * <li>-Check Pilot Stress</li>
 * <li>-Perform Action</li>
 * <li>Activation Phase (end)</li>
 * <li>Combat Phase (start)</li>
 * <li>-Declare Target</li>
 * <li>-Roll Attack Dice</li>
 * <li>-Modify Attack Dice</li>
 * <li>-Roll Defense Dice</li>
 * <li>-Modify Defense Dice</li>
 * <li><b>-Attack hits?</b></li>
 * <li>-Deal Damage</li>
 * <li><b>-Is Destroyed?</b></li>
 * <li>Combat Phase (end)</li>
 * <li>End Phase (start)</li>
 * <li>-Remove Evade Tokens</li>
 * <li>-Remove Focus Tokens</li>
 * <li>End Phase (end)</li>
 * </ol>
 */
public interface GameStepReactor
{
    /**
     * @return the hasAction
     */
    boolean hasAction();

    /**
     * @param environment Environment.
     * @param token Token.
     * @param phase Phase.
     */
    void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase);
}
