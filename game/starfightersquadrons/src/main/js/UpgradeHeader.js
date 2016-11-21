define(function()
{
    "use strict";
    var UpgradeHeader = {
        ACTION: "action",
        ATTACK: "attack",
        ATTACK_ENERGY: "attackEnergy",
        ATTACK_FOCUS: "attackFocus",
        ATTACK_TARGET_LOCK: "attackTargetLock",
        ENERGY: "energy",

        properties:
        {
            "action":
            {
                name: "Action",
                value: "action",
            },
            "attack":
            {
                name: "Attack",
                value: "attack",
            },
            "attackEnergy":
            {
                name: "Attack [Energy]",
                value: "attackEnergy",
            },
            "attackFocus":
            {
                name: "Attack [Focus]",
                value: "attackFocus",
            },
            "attackTargetLock":
            {
                name: "Attack [Target Lock]",
                value: "attackTargetLock",
            },
            "energy":
            {
                name: "Energy",
                value: "energy",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(UpgradeHeader.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(UpgradeHeader);
    }

    return UpgradeHeader;
});
