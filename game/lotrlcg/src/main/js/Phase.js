define(function()
{
    "use strict";
    var Phase =
    {
        RESOURCE_START: "resourceStart",
        RESOURCE_END: "resourceEnd",

        PLANNING_START: "planningStart",
        PLANNING_END: "planningEnd",

        QUEST_START: "questStart",
        QUEST_COMMIT_CHARACTERS: "questCommitCharacters",
        QUEST_REVEAL_ENCOUNTER_CARDS: "questRevealEncounterCards",
        QUEST_RESOLVE: "questResolve",
        QUEST_END: "questEnd",

        TRAVEL_START: "travelStart",
        TRAVEL_END: "travelEnd",

        ENCOUNTER_START: "encounterStart",
        ENCOUNTER_PLAYER_ENGAGEMENT: "encounterPlayerEngagement",
        ENCOUNTER_ENGAGEMENT_CHECKS: "encounterEngagementChecks",
        ENCOUNTER_END: "encounterEnd",

        COMBAT_START: "combatStart",
        COMBAT_DEAL_SHADOW_CARDS: "combatDealShadowCards",
        COMBAT_DEFEND_START: "combatDefendStart",
        COMBAT_DEFEND_DECLARE_ATTACKER: "combatDefendDeclareAttacker",
        COMBAT_DEFEND_EXHAUST_DEFENDER: "combatDefendExhaustDefender",
        COMBAT_DEFEND_RESOLVE_SHADOW_EFFECT: "combatDefendResolveShadowEffect",
        COMBAT_DEFEND_DETERMINE_DAMAGE: "combatDefendDetermineDamage",
        COMBAT_DEFEND_END: "combatDefendEnd",
        COMBAT_ATTACK_START: "combatAttackStart",
        COMBAT_ATTACK_DECLARE_DEFENDER: "combatAttackDeclareDefender",
        COMBAT_ATTACK_EXHAUST_ATTACKERS: "combatAttackExhaustAttackers",
        COMBAT_ATTACK_DETERMINE_DAMAGE: "combatAttackDetermineDamage",
        COMBAT_ATTACK_END: "combatAttackEnd",
        COMBAT_END: "combatEnd",

        REFRESH_START: "refreshStart",
        REFRESH_END: "refreshEnd",

        properties:
        {
            "resourceStart":
            {
                name: "Resource (start)",
                value: "resourceStart",
            },
            "resourceEnd":
            {
                name: "Resource (end)",
                value: "resourceEnd",
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
            "questStart":
            {
                name: "Quest (start)",
                value: "questStart",
            },
            "questCommitCharacters":
            {
                name: "Quest (commit characters)",
                value: "questCommitCharacters",
            },
            "questRevealEncounterCards":
            {
                name: "Quest (reveal encounter cards)",
                value: "questRevealEncounterCards",
            },
            "questResolve":
            {
                name: "Quest (resolve)",
                value: "questResolve",
            },
            "questEnd":
            {
                name: "Quest (end)",
                value: "questEnd",
            },
            "travelStart":
            {
                name: "Travel (start)",
                value: "travelStart",
            },
            "travelEnd":
            {
                name: "Travel (end)",
                value: "travelEnd",
            },
            "encounterStart":
            {
                name: "Encounter (start)",
                value: "encounterStart",
            },
            "encounterPlayerEngagement":
            {
                name: "Encounter (player engagement)",
                value: "encounterPlayerEngagement",
            },
            "encounterEngagementChecks":
            {
                name: "Encounter (engagement checks)",
                value: "encounterEngagementChecks",
            },
            "encounterEnd":
            {
                name: "Encounter (end)",
                value: "encounterEnd",
            },
            "combatStart":
            {
                name: "Combat (start)",
                value: "combatStart",
            },
            "combatDealShadowCards":
            {
                name: "Combat (deal shadow cards)",
                value: "combatDealShadowCards",
            },
            "combatDefendStart":
            {
                name: "Combat Defend (start)",
                value: "combatDefendStart",
            },
            "combatDefendDeclareAttacker":
            {
                name: "Combat Defend (declare attacker)",
                value: "combatDefendDeclareAttacker",
            },
            "combatDefendExhaustDefender":
            {
                name: "Combat Defend (exhaust defender)",
                value: "combatDefendExhaustDefender",
            },
            "combatDefendResolveShadowEffect":
            {
                name: "Combat Defend (combatDefendResolveShadowEffect)",
                value: "combatDefendResolveShadowEffect",
            },
            "combatDefendDetermineDamage":
            {
                name: "Combat Defend (combatDefendDetermineDamage)",
                value: "combatDefendDetermineDamage",
            },
            "combatDefendEnd":
            {
                name: "Combat Defend (end)",
                value: "combatDefendEnd",
            },
            "combatAttackStart":
            {
                name: "Combat Attack (start)",
                value: "combatAttackStart",
            },
            "combatAttackDeclareDefender":
            {
                name: "Combat Attack (combatAttackDeclareDefender)",
                value: "combatAttackDeclareDefender",
            },
            "combatAttackExhaustAttackers":
            {
                name: "Combat Attack (combatAttackExhaustAttackers)",
                value: "combatAttackExhaustAttackers",
            },
            "combatAttackDetermineDamage":
            {
                name: "Combat Attack (combatAttackDetermineDamage)",
                value: "combatAttackDetermineDamage",
            },
            "combatAttackEnd":
            {
                name: "Combat Attack (end)",
                value: "combatAttackEnd",
            },
            "combatEnd":
            {
                name: "Combat (end)",
                value: "combatEnd",
            },
            "refreshStart":
            {
                name: "Refresh (start)",
                value: "refreshStart",
            },
            "refreshEnd":
            {
                name: "Refresh (end)",
                value: "refreshEnd",
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
