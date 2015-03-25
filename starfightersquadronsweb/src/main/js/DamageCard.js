/*
 * Provides an enumeration of traits.
 */
var Trait =
{
    PILOT: "pilot",
    SHIP: "ship",
}

/*
 * Provides an enumeration of damage cards.
 */
var DamageCard =
{
    BLINDED_PILOT: "blindedPilot",
    CONSOLE_FIRE: "consoleFire",
    DAMAGED_COCKPIT: "damagedCockpit",
    DAMAGED_ENGINE: "damagedEngine",
    DAMAGED_SENSOR_ARRAY: "damagedSensorArray",
    DIRECT_HIT: "directHit",
    INJURED_PILOT: "injuredPilot",
    MINOR_EXPLOSION: "minorExplosion",
    MINOR_HULL_BREACH: "minorHullBreach",
    MUNITIONS_FAILURE: "munitionsFailure",
    STRUCTURAL_DAMAGE: "structuralDamage",
    STUNNED_PILOT: "stunnedPilot",
    THRUST_CONTROL_FIRE: "thrustControlFire",
    WEAPON_MALFUNCTION: "weaponMalfunction",
    properties:
    {
        "blindedPilot":
        {
            // Effect implemented elsewhere.
            // @see SSToken#computeAttackDiceCount()
            name: "Blinded Pilot",
            trait: Trait.PILOT,
            description: "The next time you attack, do not roll any attack dice. Then flip this card facedown.",
            shipState: new ShipState(0, 0, 0, 0, 0),
            hasAction: false,
            value: "blindedPilot",
        },
        "consoleFire":
        {
            name: "Console Fire",
            trait: Trait.SHIP,
            description: "At the start of each Combat phase, roll 1 attack die. On a hit result, suffer 1 damage.",
            shipState: new ShipState(0, 0, 0, 0, 0),
            hasAction: true,
            actionDescription: "Flip this card facedown.",
            actionShipState: new ShipState(0, 0, 0, 0, 0),
            value: "consoleFire",
        },
        "damagedCockpit":
        {
            // Effect implemented elsewhere.
            // @see SSToken#getPilotSkillValue()
            name: "Damaged Cockpit",
            trait: Trait.PILOT,
            description: "After the round in which you receive this card, treat your pilot skill value as \"0.\"",
            shipState: new ShipState(0, 0, 0, 0, 0),
            hasAction: false,
            value: "damagedCockpit",
        },
        "damagedEngine":
        {
            name: "Damaged Engine",
            trait: Trait.SHIP,
            description: "Treat all turn maneuvers (left turn or right turn) as red maneuvers.",
            shipState: new ShipState(0, 0, 0, 0, 0),
            hasAction: false,
            value: "damagedEngine",
        },
        "damagedSensorArray":
        {
            name: "Damaged Sensor Array",
            trait: Trait.SHIP,
            description: "You cannot perform the actions listed in your action bar.",
            shipState: new ShipState(0, 0, 0, 0, 0),
            hasAction: true,
            actionDescription: "Roll 1 attack die. On a hit result, flip this card facedown.",
            actionShipState: new ShipState(0, 0, 0, 0, 0),
            value: "damagedSensorArray",
        },
        "directHit":
        {
            // Effect implemented elsewhere.
            // @see SSToken#getHullValue()
            name: "Direct Hit!",
            trait: Trait.SHIP,
            description: "This card counts as 2 damage against your hull.",
            shipState: new ShipState(0, 0, 0, -1, 0),
            hasAction: false,
            value: "directHit",
        },
        "injuredPilot":
        {
            // Effect implemented elsewhere.
            // @see SSToken#getPilotSkillValue()
            name: "Injured Pilot",
            trait: Trait.PILOT,
            description: "All players must ignore your pilot ability and all of your Elite Upgrade cards.",
            shipState: new ShipState(0, 0, 0, 0, 0),
            hasAction: false,
            value: "injuredPilot",
        },
        "minorExplosion":
        {
            name: "Minor Explosion",
            trait: Trait.SHIP,
            description: "Immediately roll 1 attack die. On a hit result, suffer 1 damage. Then flip this card facedown.",
            shipState: new ShipState(0, 0, 0, 0, 0),
            hasAction: false,
            value: "minorExplosion",
        },
        "minorHullBreach":
        {
            name: "Minor Hull Breach",
            trait: Trait.SHIP,
            description: "After executing a red maneuver, roll 1 attack die. On a hit result, suffer 1 damage.",
            shipState: new ShipState(0, 0, 0, 0, 0),
            hasAction: false,
            value: "minorHullBreach",
        },
        "munitionsFailure":
        {
            name: "Munitions Failure",
            trait: Trait.SHIP,
            description: "Immediately choose 1 of your secondary weapon Upgrade cards and discard it. Then flip this Damage card facedown.",
            shipState: new ShipState(0, 0, 0, 0, 0),
            hasAction: false,
            value: "munitionsFailure",
        },
        "structuralDamage":
        {
            name: "Structural Damage",
            trait: Trait.SHIP,
            description: "Reduce your agility value by 1 (to a minimum of \"0\").",
            shipState: new ShipState(0, 0, -1, 0, 0),
            hasAction: true,
            actionDescription: "Roll 1 attack die. On a hit result, flip this card facedown.",
            actionShipState: new ShipState(0, 0, 0, 0, 0),
            value: "structuralDamage",
        },
        "stunnedPilot":
        {
            name: "Stunned Pilot",
            trait: Trait.PILOT,
            description: "After you execute a maneuver that causes you to overlap either another ship or an obstacle token, suffer 1 damage.",
            shipState: new ShipState(0, 0, 0, 0, 0),
            hasAction: false,
            value: "stunnedPilot",
        },
        "thrustControlFire":
        {
            name: "Thrust Control Fire",
            trait: Trait.SHIP,
            description: "Immediately receive 1 stress token. Then flip this card facedown.",
            shipState: new ShipState(0, 0, 0, 0, 0),
            hasAction: false,
            value: "thrustControlFire",
        },
        "weaponMalfunction":
        {
            // Effect implemented elsewhere.
            // @see SSToken#getPrimaryWeaponValue()
            name: "Weapon Malfunction",
            trait: Trait.SHIP,
            description: "Reduce your primary weapon value by 1 (to a minimum of \"0\").",
            shipState: new ShipState(0, -1, 0, 0, 0),
            hasAction: true,
            actionDescription: "Roll 1 attack die. On a hit or critical hit result, flip this card facedown.",
            actionShipState: new ShipState(0, 0, 0, 0, 0),
            value: "weaponMalfunction",
        },
    },
    values: [ "blindedPilot", "consoleFire", "damagedCockpit", "damagedEngine",
            "damagedSensorArray", "directHit", "injuredPilot",
            "minorExplosion", "minorHullBreach", "munitionsFailure",
            "structuralDamage", "stunnedPilot", "thrustControlFire",
            "weaponMalfunction", ],
}

DamageCard.createDeck = function()
{
    var answer = [];

    // There are two of each, except seven of Direct Hit!
    var values = DamageCard.values;

    for (var i = 0; i < values.length; i++)
    {
        var damage = values[i];
        answer[answer.length] = damage;
        answer[answer.length] = damage;
    }

    for (var i = 0; i < 5; i++)
    {
        answer[answer.length] = DamageCard.DIRECT_HIT;
    }

    ArrayUtilities.shuffle(answer);

    return answer;
}
