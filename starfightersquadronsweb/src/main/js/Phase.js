define(function()
{
    "use strict";
    var Phase =
    {
        PLANNING_START: "planningStart",
        PLANNING_END: "planningEnd",
        ACTIVATION_START: "activationStart",
        ACTIVATION_REVEAL_DIAL: "activationRevealDial",
        ACTIVATION_EXECUTE_MANEUVER: "activationExecuteManeuver",
        ACTIVATION_PERFORM_ACTION: "activationPerformAction",
        ACTIVATION_END: "activationEnd",
        COMBAT_START: "combatStart",
        COMBAT_DECLARE_TARGET: "combatDeclareTarget",
        COMBAT_ROLL_ATTACK_DICE: "combatRollAttackDice",
        COMBAT_MODIFY_ATTACK_DICE: "combatModifyAttackDice",
        COMBAT_ROLL_DEFENSE_DICE: "combatRollDefenseDice",
        COMBAT_MODIFY_DEFENSE_DICE: "combatModifyDefenseDice",
        COMBAT_DEAL_DAMAGE: "combatDealDamage",
        COMBAT_END: "combatEnd",
        END_START: "endStart",
        END_END: "endEnd",
        properties:
        {
            "planningStart":
            {
                displayName: "Planning (start)",
                value: "planningStart",
            },
            "planningEnd":
            {
                displayName: "Planning (end)",
                value: "planningEnd",
            },
            "activationStart":
            {
                displayName: "Activation (start)",
                value: "activationStart",
            },
            "activationRevealDial":
            {
                displayName: "Activation (reveal dial)",
                value: "activationRevealDial",
            },
            "activationExecuteManeuver":
            {
                displayName: "Activation (execute maneuver)",
                value: "activationExecuteManeuver",
            },
            "activationPerformAction":
            {
                displayName: "Activation (perform action)",
                value: "activationPerformAction",
            },
            "activationEnd":
            {
                displayName: "Activation (end)",
                value: "activationEnd",
            },
            "combatStart":
            {
                displayName: "Combat (start)",
                value: "combatStart",
            },
            "combatDeclareTarget":
            {
                displayName: "Combat (declare target)",
                value: "combatDeclareTarget",
            },
            "combatRollAttackDice":
            {
                displayName: "Combat (roll attack dice)",
                value: "combatRollAttackDice",
            },
            "combatModifyAttackDice":
            {
                displayName: "Combat (modify attack dice)",
                value: "combatModifyAttackDice",
            },
            "combatRollDefenseDice":
            {
                displayName: "Combat (roll defense dice)",
                value: "combatRollDefenseDice",
            },
            "combatModifyDefenseDice":
            {
                displayName: "Combat (modify defense dice)",
                value: "combatModifyDefenseDice",
            },
            "combatDealDamage":
            {
                displayName: "Combat (deal damage)",
                value: "combatDealDamage",
            },
            "combatEnd":
            {
                displayName: "Combat (end)",
                value: "combatEnd",
            },
            "endStart":
            {
                displayName: "End (start)",
                value: "endStart",
            },
            "endEnd":
            {
                displayName: "End (end)",
                value: "endEnd",
            },
        },
        values: [ "planningStart", "planningEnd", "activationStart", "activationRevealDial",
                "activationExecuteManeuver", "activationPerformAction", "activationEnd", "combatStart",
                "combatDeclareTarget", "combatRollAttackDice", "combatModifyAttackDice", "combatRollDefenseDice",
                "combatModifyDefenseDice", "combatDealDamage", "combatEnd", "endStart", "endEnd", ],
    };

    if (Object.freeze)
    {
        Object.freeze(Phase);
    }

    return Phase;
});
