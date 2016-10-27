define(function()
{
    "use strict";
    var ShipState = {
        PILOT_SKILL: "pilotSkill",
        PRIMARY_WEAPON: "primaryWeapon",
        TURRET_WEAPON: "turretWeapon",
        ENERGY: "energy",
        AGILITY: "agility",
        HULL: "hull",
        SHIELD: "shield",

        properties:
        {
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
            "turretWeapon":
            {
                name: "Turret Weapon",
                value: "turretWeapon",
            },
            "energy":
            {
                name: "Energy",
                value: "energy",
            },
            "agility":
            {
                name: "Agility",
                value: "agility",
            },
            "hull":
            {
                name: "Hull",
                value: "hull",
            },
            "shield":
            {
                name: "Shield",
                value: "shield",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(ShipState.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(ShipState);
    }

    return ShipState;
});
