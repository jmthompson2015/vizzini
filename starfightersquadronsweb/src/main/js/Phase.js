define(function()
{
    "use strict";
    var Phase = {
        SETUP: "setup",

        PLANNING_START: "planningStart",
        PLANNING_END: "planningEnd",

        ACTIVATION_START: "activationStart",
        ACTIVATION_REVEAL_DIAL: "activationRevealDial",
        ACTIVATION_SET_TEMPLATE: "activationSetTemplate",
        ACTIVATION_EXECUTE_MANEUVER: "activationExecuteManeuver",
        ACTIVATION_CHECK_PILOT_STRESS: "activationCheckPilotStress",
        ACTIVATION_CLEAN_UP: "activationCleanUp",
        ACTIVATION_GAIN_ENERGY: "activationGainEnergy",
        ACTIVATION_ALLOCATE_ENERGY: "activationAllocateEnergy",
        ACTIVATION_USE_ENERGY: "activationUseEnergy",
        ACTIVATION_PERFORM_ACTION: "activationPerformAction",
        ACTIVATION_END: "activationEnd",

        COMBAT_START: "combatStart",
        COMBAT_DECLARE_TARGET: "combatDeclareTarget",
        COMBAT_ROLL_ATTACK_DICE: "combatRollAttackDice",
        COMBAT_MODIFY_ATTACK_DICE: "combatModifyAttackDice",
        COMBAT_ROLL_DEFENSE_DICE: "combatRollDefenseDice",
        COMBAT_MODIFY_DEFENSE_DICE: "combatModifyDefenseDice",
        COMBAT_COMPARE_RESULTS: "combatCompareResults",
        COMBAT_NOTIFY_DAMAGE: "combatNotifyDamage",
        COMBAT_DEAL_DAMAGE: "combatDealDamage",
        COMBAT_AFTER_DEAL_DAMAGE: "combatAfterDealDamage",
        COMBAT_END: "combatEnd",

        END_START: "endStart",
        END_END: "endEnd",

        properties:
        {
            "setup":
            {
                name: "Setup",
                value: "setup",
            },
            "planningStart":
            {
                name: "Planning (start)",
                value: "planningStart",
            },
            "planningEnd":
            {
                name: "Planning (end)",
                value: "planningEnd",
            },
            "activationStart":
            {
                name: "Activation (start)",
                value: "activationStart",
            },
            "activationRevealDial":
            {
                name: "Activation (reveal dial)",
                value: "activationRevealDial",
            },
            "activationSetTemplate":
            {
                name: "Activation (set template)",
                value: "activationSetTemplate",
            },
            "activationExecuteManeuver":
            {
                name: "Activation (execute maneuver)",
                value: "activationExecuteManeuver",
            },
            "activationCheckPilotStress":
            {
                name: "Activation (check pilot stress)",
                value: "activationCheckPilotStress",
            },
            "activationCleanUp":
            {
                name: "Activation (clean up)",
                value: "activationCleanUp",
            },
            "activationGainEnergy":
            {
                name: "Activation (gain energy)",
                value: "activationGainEnergy",
            },
            "activationAllocateEnergy":
            {
                name: "Activation (allocate energy)",
                value: "activationAllocateEnergy",
            },
            "activationUseEnergy":
            {
                name: "Activation (use energy)",
                value: "activationUseEnergy",
            },
            "activationPerformAction":
            {
                name: "Activation (perform action)",
                value: "activationPerformAction",
            },
            "activationEnd":
            {
                name: "Activation (end)",
                value: "activationEnd",
            },
            "combatStart":
            {
                name: "Combat (start)",
                value: "combatStart",
            },
            "combatDeclareTarget":
            {
                name: "Combat (declare target)",
                value: "combatDeclareTarget",
            },
            "combatRollAttackDice":
            {
                name: "Combat (roll attack dice)",
                value: "combatRollAttackDice",
            },
            "combatModifyAttackDice":
            {
                name: "Combat (modify attack dice)",
                value: "combatModifyAttackDice",
            },
            "combatRollDefenseDice":
            {
                name: "Combat (roll defense dice)",
                value: "combatRollDefenseDice",
            },
            "combatModifyDefenseDice":
            {
                name: "Combat (modify defense dice)",
                value: "combatModifyDefenseDice",
            },
            "combatCompareResults":
            {
                name: "Combat (compare results)",
                value: "combatCompareResults",
            },
            "combatNotifyDamage":
            {
                name: "Combat (notify damage)",
                value: "combatNotifyDamage",
            },
            "combatDealDamage":
            {
                name: "Combat (deal damage)",
                value: "combatDealDamage",
            },
            "combatAfterDealDamage":
            {
                name: "Combat (after deal damage)",
                value: "combatAfterDealDamage",
            },
            "combatEnd":
            {
                name: "Combat (end)",
                value: "combatEnd",
            },
            "endStart":
            {
                name: "End (start)",
                value: "endStart",
            },
            "endEnd":
            {
                name: "End (end)",
                value: "endEnd",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Phase.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Phase);
    }

    return Phase;
});
