package org.vizzini.starfightersquadrons;

import org.vizzini.core.InputValidator;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Provides an adjudicator for Starfighter Squadrons.
 */
public final class SSAdjudicator implements Adjudicator
{
    /**
     * @param attacker Attacker.
     *
     * @return true if the attacker can attack.
     */
    public boolean canAttack(final SSToken attacker)
    {
        InputValidator.validateNotNull("attacker", attacker);

        // A cloaked ship cannot attack.
        return !attacker.isCloaked();
    }

    /**
     * @param attacker Attacker.
     *
     * @return true if the attacker can attack.
     */
    public boolean canDecloak(final SSToken attacker)
    {
        InputValidator.validateNotNull("attacker", attacker);

        // A cloaked ship can decloak.
        return attacker.isCloaked();
    }

    /**
     * @param attacker Attacker.
     * @param defender Defender.
     *
     * @return true if the attacker can modify attack dice.
     */
    public boolean canModifyAttackDice(final SSToken attacker, final SSToken defender)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("defender", defender);

        // Have to have a focus token, or
        // have to have a target lock on the defender.
        return (attacker.getFocusCount() > 0)
                || ((attacker.getAttackerTargetLock() != null) && (attacker.getAttackerTargetLock().getDefender() == defender));
    }

    /**
     * @param defender Defender.
     *
     * @return true if the defender can modify defense dice.
     */
    public boolean canModifyDefenseDice(final SSToken defender)
    {
        InputValidator.validateNotNull("defender", defender);

        // Have to have an evade token, or
        // have to have a focus token.
        return (defender.getEvadeCount() > 0) || (defender.getFocusCount() > 0);
    }

    /**
     * @param attacker Attacker.
     *
     * @return true if the attacker can select a ship action.
     */
    public boolean canSelectShipAction(final SSToken attacker)
    {
        InputValidator.validateNotNull("attacker", attacker);

        // Cannot select a ship action if the ship is stressed, or
        // if the ship is touching another ship.
        return !attacker.isStressed() && !attacker.isTouching();
    }

    @Override
    public Agent determineWinner(final Environment environment)
    {
        SSAgent answer = null;

        final SSEnvironment xEnvironment = (SSEnvironment)environment;
        final int imperialCount = xEnvironment.getTokenCountFor(SSTeam.IMPERIAL);
        final int rebelCount = xEnvironment.getTokenCountFor(SSTeam.REBEL);

        if (imperialCount == 0)
        {
            answer = xEnvironment.getRebelAgent();
        }
        else if (rebelCount == 0)
        {
            answer = xEnvironment.getImperialAgent();
        }

        return answer;
    }

    @Override
    public String getDescription()
    {
        return "Starfighter Squadrons adjudicator.";
    }

    @Override
    public String getName()
    {
        return "SSAdjudicator";
    }

    @Override
    public boolean isActionLegal(final Action action)
    {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean isGameOver(final Environment environment)
    {
        boolean answer = false;

        final SSEnvironment xEnvironment = (SSEnvironment)environment;

        final int imperialCount = xEnvironment.getTokenCountFor(SSTeam.IMPERIAL);

        answer = (imperialCount == 0);

        if (!answer)
        {
            final int rebelCount = xEnvironment.getTokenCountFor(SSTeam.REBEL);
            answer = (rebelCount == 0);
        }

        return answer;
    }
}
