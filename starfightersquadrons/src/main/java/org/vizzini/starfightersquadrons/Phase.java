package org.vizzini.starfightersquadrons;

/**
 * Provides an enumeration of game phases.
 */
public enum Phase
{
    /** Phase. */
    PLANNING_START("Planning (start)"),

    /** Phase. */
    PLANNING_END("Planning (end)"),

    /** Phase. */
    ACTIVATION_START("Activation (start)"),

    /** Activation phase. */
    ACTIVATION_REVEAL_DIAL("Activation (reveal dial)"),

    /** Activation phase. */
    // ACTIVATION_SET_TEMPLATE("Activation (set template)"),

    /** Activation phase. */
    ACTIVATION_EXECUTE_MANEUVER("Activation (execute maneuver)"),

    /** Activation phase. */
    // ACTIVATION_CHECK_PILOT_STRESS("Activation (check pilot stress)"),

    /** Activation phase. */
    // ACTIVATION_CLEAN_UP("Activation (clean up)"),

    /** Activation phase. */
    ACTIVATION_PERFORM_ACTION("Activation (perform action)"),

    /** Phase. */
    ACTIVATION_END("Activation (end)"),

    /** Phase. */
    COMBAT_START("Combat (start)"),

    /** Combat phase. */
    COMBAT_DECLARE_TARGET("Combat (declare target)"),

    /** Combat phase. */
    COMBAT_ROLL_ATTACK_DICE("Combat (roll attack dice)"),

    /** Combat phase. */
    COMBAT_MODIFY_ATTACK_DICE("Combat (modify attack dice)"),

    /** Combat phase. */
    COMBAT_ROLL_DEFENSE_DICE("Combat (roll defense dice)"),

    /** Combat phase. */
    COMBAT_MODIFY_DEFENSE_DICE("Combat (modify defense dice)"),

    /** Combat phase. */
    // COMBAT_COMPARE_RESULTS("Combat (compare results)"),

    /** Combat phase. */
    COMBAT_DEAL_DAMAGE("Combat (deal damage)"),

    /** Phase. */
    COMBAT_END("Combat (end)"),

    /** Phase. */
    END_START("End (start)"),

    /** End phase. */
    // END_REMOVE_EVADE_TOKENS("End (remove evade tokens)"),

    /** End phase. */
    // END_REMOVE_FOCUS_TOKENS("End (remove focus tokens)"),

    /** Phase. */
    END_END("End (end)");

    /** Display name. */
    private final String displayName;

    /**
     * Construct this object.
     * 
     * @param displayName Display name.
     */
    @SuppressWarnings("hiding")
    private Phase(final String displayName)
    {
        this.displayName = displayName;
    }

    /**
     * @return the displayName
     */
    public String getDisplayName()
    {
        return displayName;
    }

    @Override
    public String toString()
    {
        return displayName;
    }
}
