package org.vizzini.starfightersquadrons;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.core.game.Action;
import org.vizzini.starfightersquadrons.AttackDice.Value;

/**
 * Provides an action to modify the attack dice.
 */
public final class ModifyAttackDiceAction implements Action
{
    /** Provides an enumeration of possible modifications. */
    public enum Modification
    {
        /** Action. */
        SPEND_FOCUS,
        /** Action. */
        SPEND_TARGET_LOCK;
    }

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Attack dice. */
    private final AttackDice attackDice;

    /** Token. */
    private final SSToken attacker;

    /** Environment. */
    private final SSEnvironment environment;

    /** Action. */
    private final Modification modification;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     * @param attacker Attacker.
     * @param attackDice Attack dice.
     * @param modification Modification.
     */
    @SuppressWarnings("hiding")
    public ModifyAttackDiceAction(final SSEnvironment environment, final SSToken attacker,
            final AttackDice attackDice, final Modification modification)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackDice", attackDice);
        InputValidator.validateNotNull("modification", modification);

        this.environment = environment;
        this.attacker = attacker;
        this.attackDice = attackDice;
        this.modification = modification;
    }

    @Override
    public boolean doIt()
    {
        if (modification == Modification.SPEND_TARGET_LOCK)
        {
            final int size = attackDice.size();

            for (int i = 0; i < size; i++)
            {
                final Value value = attackDice.getValue(i);

                if ((value == Value.BLANK) || (value == Value.FOCUS))
                {
                    attackDice.reroll(i);
                    LOGGER.debug(i + " spend target lock: rerolled " + value + " to " + attackDice.getValue(i));
                }
            }

            final TargetLock targetLock = attacker.getAttackerTargetLock();
            TargetLock.freeInstance(targetLock);
        }
        else if (modification == Modification.SPEND_FOCUS)
        {
            attackDice.spendFocusToken();
            attacker.decreaseFocusCount();
        }

        return false;
    }

    @Override
    public SSAgent getAgent()
    {
        return attacker.getAgent();
    }

    /**
     * @return the attackDice
     */
    public AttackDice getAttackDice()
    {
        return attackDice;
    }

    /**
     * @return the attacker
     */
    public SSToken getAttacker()
    {
        return attacker;
    }

    @Override
    public SSEnvironment getEnvironment()
    {
        return environment;
    }

    /**
     * @return the modification
     */
    public Modification getModification()
    {
        return modification;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Override
    public boolean undoIt()
    {
        throw new RuntimeException("method not used");
    }
}
