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
        DECLOAK: "decloak",
        EVADE: "evade",
        FOCUS: "focus",
        SLAM: "slam",
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
            "decloak":
            {
                displayName: "Decloak",
                value: "decloak",
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
            "slam":
            {
                displayName: "SLAM (SubLight Acceleration Motor)",
                value: "slam",
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

    ShipAction.createDecloakShipAction = function(maneuver)
    {
        InputValidator.validateNotNull("maneuver", maneuver);

        return (
        {
            shipAction: ShipAction.DECLOAK,
            maneuver: maneuver,
        });
    };

    ShipAction.createSlamShipAction = function(maneuver)
    {
        InputValidator.validateNotNull("maneuver", maneuver);

        return (
        {
            shipAction: ShipAction.SLAM,
            maneuver: maneuver,
        });
    };

    ShipAction.createTargetLockShipAction = function(defender)
    {
        InputValidator.validateNotNull("defender", defender);

        return (
        {
            shipAction: ShipAction.TARGET_LOCK,
            defender: defender,
        });
    };

    if (Object.freeze)
    {
        Object.freeze(ShipAction);
    }

    return ShipAction;
});
