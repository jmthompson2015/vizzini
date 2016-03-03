define([ "Maneuver" ], function(Maneuver)
{
    "use strict";
    var ShipAction =
    {
        BARREL_ROLL: "barrelRoll",
        BARREL_ROLL_LEFT: "barrelRollLeft",
        BARREL_ROLL_RIGHT: "barrelRollRight",
        BOOST: "boost",
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
            "barrelRoll":
            {
                displayName: "Barrel Roll",
                image: "BarrelRoll24.png",
                value: "barrelRoll",
            },
            "barrelRollLeft":
            {
                displayName: "Barrel Roll (left)",
                maneuver: Maneuver.BARREL_ROLL_LEFT_1_STANDARD,
                image: "BarrelRollLeft24.png",
                value: "barrelRollLeft",
            },
            "barrelRollRight":
            {
                displayName: "Barrel Roll (right)",
                maneuver: Maneuver.BARREL_ROLL_RIGHT_1_STANDARD,
                image: "BarrelRollRight24.png",
                value: "barrelRollRight",
            },
            "boost":
            {
                displayName: "Boost",
                image: "Boost24.png",
                value: "boost",
            },
            "boostLeft":
            {
                displayName: "Boost (left)",
                maneuver: Maneuver.BANK_LEFT_1_STANDARD,
                image: "BoostLeft24.png",
                value: "boostLeft",
            },
            "boostStraight":
            {
                displayName: "Boost (straight)",
                maneuver: Maneuver.STRAIGHT_1_STANDARD,
                image: "BoostStraight24.png",
                value: "boostStraight",
            },
            "boostRight":
            {
                displayName: "Boost (right)",
                maneuver: Maneuver.BANK_RIGHT_1_STANDARD,
                image: "BoostRight24.png",
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
                displayName: "SLAM",
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
