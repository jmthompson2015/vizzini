/*
 * Provides an enumeration of ship actions for Starfighter Squadrons.
 */
define([ "Maneuver" ], function(Maneuver)
{
    var ShipAction =
    {
        BARREL_ROLL_LEFT: "barrelRollLeft",
        BARREL_ROLL_RIGHT: "barrelRollRight",
        BOOST_LEFT: "boostLeft",
        BOOST_RIGHT: "boostRight",
        BOOST_STRAIGHT: "boostStraight",
        CLOAK: "cloak",
        EVADE: "evade",
        FOCUS: "focus",
        TARGET_LOCK: "targetLock",

        properties:
        {
            "barrelRollLeft":
            {
                displayName: "Barrel Roll (left)",
                maneuver: Maneuver.BARREL_ROLL_LEFT_1_STANDARD,
                value: "barrelRollLeft",
            },
            "barrelRollRight":
            {
                displayName: "Barrel Roll (right)",
                maneuver: Maneuver.BARREL_ROLL_RIGHT_1_STANDARD,
                value: "barrelRollRight",
            },
            "boostLeft":
            {
                displayName: "Boost (left)",
                maneuver: Maneuver.BANK_LEFT_1_STANDARD,
                value: "boostLeft",
            },
            "boostStraight":
            {
                displayName: "Boost (straight)",
                maneuver: Maneuver.STRAIGHT_1_STANDARD,
                value: "boostStraight",
            },
            "boostRight":
            {
                displayName: "Boost (right)",
                maneuver: Maneuver.BANK_RIGHT_1_STANDARD,
                value: "boostRight",
            },
            "cloak":
            {
                displayName: "Cloak",
                value: "cloak",
            },
            "evade":
            {
                displayName: "Evade",
                value: "evade",
            },
            "focus":
            {
                displayName: "Focus",
                value: "focus",
            },
            "targetLock":
            {
                displayName: "Target Lock",
                value: "targetLock",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(ShipAction.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(ShipAction);
    };

    return ShipAction;
});
