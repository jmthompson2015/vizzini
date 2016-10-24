package org.vizzini.starfightersquadrons;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.InputValidator;
import org.vizzini.core.game.Action;

/**
 * Provides an action to modify the attack dice.
 */
public final class ModifyDefenseDiceAction implements Action
{
    /** Provides an enumeration of possible modifications. */
    public enum Modification
    {
        /** Action. */
        SPEND_EVADE,
        /** Action. */
        SPEND_FOCUS;
    }

    /** Defender. */
    private final SSToken defender;

    /** Defense dice. */
    private final DefenseDice defenseDice;

    /** Environment. */
    private final SSEnvironment environment;

    /** Action. */
    private final Modification modification;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     * @param defender Defender.
     * @param defenseDice Defense dice.
     * @param modification Modification.
     */
    @SuppressWarnings("hiding")
    public ModifyDefenseDiceAction(final SSEnvironment environment, final SSToken defender,
            final DefenseDice defenseDice, final Modification modification)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenseDice", defenseDice);
        InputValidator.validateNotNull("modification", modification);

        this.environment = environment;
        this.defender = defender;
        this.defenseDice = defenseDice;
        this.modification = modification;
    }

    @Override
    public boolean doIt()
    {
        if (modification == Modification.SPEND_FOCUS)
        {
            defenseDice.spendFocusToken();
            defender.decreaseFocusCount();
        }
        else if (modification == Modification.SPEND_EVADE)
        {
            defenseDice.spendEvadeToken();
            defender.decreaseEvadeCount();
        }

        return false;
    }

    @Override
    public SSAgent getAgent()
    {
        return defender.getAgent();
    }

    /**
     * @return the defender
     */
    public SSToken getDefender()
    {
        return defender;
    }

    /**
     * @return the defenseDice
     */
    public DefenseDice getDefenseDice()
    {
        return defenseDice;
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
