/*
 * Provides an enumeration of upgrade types.
 */
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
            displayName: "Astromech",
            value: "astromech",
        },
        "bomb":
        {
            displayName: "Bomb",
            value: "bomb",
        },
        "cannon":
        {
            displayName: "Cannon",
            value: "cannon",
        },
        "cargo":
        {
            displayName: "Cargo",
            value: "cargo",
        },
        "crew":
        {
            displayName: "Crew",
            value: "crew",
        },
        "elite":
        {
            displayName: "Elite",
            value: "elite",
        },
        "hardpoint":
        {
            displayName: "Hardpoint",
            value: "hardpoint",
        },
        "illicit":
        {
            displayName: "Illicit",
            value: "illicit",
        },
        "missile":
        {
            displayName: "Missile",
            value: "missile",
        },
        "modification":
        {
            displayName: "Modification",
            value: "modification",
        },
        "salvagedAstromech":
        {
            displayName: "Salvaged Astromech",
            value: "salvagedAstromech",
        },
        "system":
        {
            displayName: "System",
            value: "system",
        },
        "team":
        {
            displayName: "Team",
            value: "team",
        },
        "tech":
        {
            displayName: "Tech",
            value: "tech",
        },
        "title":
        {
            displayName: "Title",
            value: "title",
        },
        "torpedo":
        {
            displayName: "Torpedo",
            value: "torpedo",
        },
        "turret":
        {
            displayName: "Turret",
            value: "turret",
        },
    },

    values: function()
    {
        return Object.getOwnPropertyNames(UpgradeType.properties);
    },
}

/*
 * @return true if this is a secondary weapon.
 */
UpgradeType.isSecondaryWeapon = function(upgradeType)
{
    return (upgradeType === CANNON) || (upgradeType === MISSILE) || (upgradeType === TORPEDO)
            || (upgradeType === TURRET);
}

if (Object.freeze)
{
    Object.freeze(UpgradeType);
};
