define(function()
{
    "use strict";
    var Count =
    {
        CLOAK: "cloak",
        ENERGY: "energy",
        EVADE: "evade",
        FOCUS: "focus",
        ION: "ion",
        REINFORCE: "reinforce",
        SHIELD: "shield",
        STRESS: "stress",
        WEAPONS_DISABLED: "weaponsDisabled",

        properties:
        {
            "cloak":
            {
                name: "Cloak",
                value: "cloak",
            },
            "energy":
            {
                name: "Energy",
                value: "energy",
            },
            "evade":
            {
                name: "Evade",
                value: "evade",
            },
            "focus":
            {
                name: "Focus",
                value: "focus",
            },
            "ion":
            {
                name: "Ion",
                value: "ion",
            },
            "reinforce":
            {
                name: "Reinforce",
                value: "reinforce",
            },
            "shield":
            {
                name: "Shield",
                value: "shield",
            },
            "stress":
            {
                name: "Stress",
                value: "stress",
            },
            "weaponsDisabled":
            {
                name: "Weapons Disabled",
                value: "weaponsDisabled",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Count.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Count);
    }

    return Count;
});
