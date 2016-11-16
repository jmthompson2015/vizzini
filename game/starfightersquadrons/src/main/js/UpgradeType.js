define(function()
{
    "use strict";
    var UpgradeType =
    {
        ASTROMECH: "astromech",
        BOMB: "bomb",
        CANNON: "cannon",
        CARGO: "cargo",
        CREW: "crew",
        ELITE: "elite",
        HARDPOINT: "hardpoint",
        ILLICIT: "illicit",
        MISSILE: "missile",
        MODIFICATION: "modification",
        SALVAGED_ASTROMECH: "salvagedAstromech",
        SYSTEM: "system",
        TEAM: "team",
        TECH: "tech",
        TITLE: "title",
        TORPEDO: "torpedo",
        TURRET: "turret",
        properties:
        {
            "astromech":
            {
                name: "Astromech",
                value: "astromech",
            },
            "bomb":
            {
                name: "Bomb",
                value: "bomb",
            },
            "cannon":
            {
                name: "Cannon",
                value: "cannon",
            },
            "cargo":
            {
                name: "Cargo",
                value: "cargo",
            },
            "crew":
            {
                name: "Crew",
                value: "crew",
            },
            "elite":
            {
                name: "Elite",
                value: "elite",
            },
            "hardpoint":
            {
                name: "Hardpoint",
                value: "hardpoint",
            },
            "illicit":
            {
                name: "Illicit",
                value: "illicit",
            },
            "missile":
            {
                name: "Missile",
                value: "missile",
            },
            "modification":
            {
                name: "Modification",
                value: "modification",
            },
            "salvagedAstromech":
            {
                name: "Salvaged Astromech",
                value: "salvagedAstromech",
            },
            "system":
            {
                name: "System",
                value: "system",
            },
            "team":
            {
                name: "Team",
                value: "team",
            },
            "tech":
            {
                name: "Tech",
                value: "tech",
            },
            "title":
            {
                name: "Title",
                value: "title",
            },
            "torpedo":
            {
                name: "Torpedo",
                value: "torpedo",
            },
            "turret":
            {
                name: "Turret",
                value: "turret",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(UpgradeType.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(UpgradeType);
    }

    return UpgradeType;
});
