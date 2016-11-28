define(function()
{
    "use strict";
    var Count = {
        CLOAK: "cloak",
        ENERGY: "energy",
        EVADE: "evade",
        FOCUS: "focus",
        ION: "ion",
        REINFORCE: "reinforce",
        SHIELD: "shield",
        STRESS: "stress",
        TRACTOR_BEAM: "tractorBeam",
        WEAPONS_DISABLED: "weaponsDisabled",

        properties:
        {
            "cloak":
            {
                name: "Cloak",
                image: "token/CloakToken32.png",
                value: "cloak",
            },
            "energy":
            {
                name: "Energy",
                image: "token/EnergyToken32.png",
                value: "energy",
            },
            "evade":
            {
                name: "Evade",
                image: "token/EvadeToken32.png",
                value: "evade",
            },
            "focus":
            {
                name: "Focus",
                image: "token/FocusToken32.png",
                value: "focus",
            },
            "ion":
            {
                name: "Ion",
                image: "token/IonToken32.png",
                value: "ion",
            },
            "reinforce":
            {
                name: "Reinforce",
                image: "token/ReinforceToken32.png",
                value: "reinforce",
            },
            "shield":
            {
                name: "Shield",
                image: "token/ShieldToken32.png",
                value: "shield",
            },
            "stress":
            {
                name: "Stress",
                image: "token/StressToken32.png",
                value: "stress",
            },
            "tractorBeam":
            {
                name: "Tractor Beam",
                image: "token/TractorBeamToken32.png",
                value: "tractorBeam",
            },
            "weaponsDisabled":
            {
                name: "Weapons Disabled",
                image: "token/WeaponsDisabledToken32.png",
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
