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
    SENSOR: "sensor",
    TEAM: "team",
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
        "sensor":
        {
            displayName: "Sensor",
            value: "sensor",
        },
        "team":
        {
            displayName: "Team",
            value: "team",
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
