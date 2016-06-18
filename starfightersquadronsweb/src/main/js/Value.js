define(function()
{
    "use strict";
    var Value =
    {
        AGILITY: "agility",
        ENERGY: "energy",
        HULL: "hull",
        PILOT_SKILL: "pilotSkill",
        PRIMARY_WEAPON: "primaryWeapon",
        SHIELD: "shield",

        properties:
        {
            "agility":
            {
                name: "Agility",
                value: "agility",
            },
            "energy":
            {
                name: "Energy",
                value: "energy",
            },
            "hull":
            {
                name: "Hull",
                value: "hull",
            },
            "pilotSkill":
            {
                name: "Pilot Skill",
                value: "pilotSkill",
            },
            "primaryWeapon":
            {
                name: "Primary Weapon",
                value: "primaryWeapon",
            },
            "shield":
            {
                name: "Shield",
                value: "shield",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Value.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Value);
    }

    return Value;
});
