/*
 * Provides an enumeration of ship actions for Starfighter Squadrons.
 */
define(function()
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
                value: "barrelRollLeft",
            },
            "barrelRollRight":
            {
                displayName: "Barrel Roll (right)",
                value: "barrelRollRight",
            },
            "boostLeft":
            {
                displayName: "Boost (left)",
                value: "boostLeft",
            },
            "boostStraight":
            {
                displayName: "Boost (straight)",
                value: "boostStraight",
            },
            "boostRight":
            {
                displayName: "Boost (right)",
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
