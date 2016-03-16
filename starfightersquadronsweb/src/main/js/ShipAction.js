define(function()
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
        COORDINATE: "coordinate",
        DECLOAK: "decloak",
        EVADE: "evade",
        FOCUS: "focus",
        JAM: "jam",
        RECOVER: "recover",
        REINFORCE: "reinforce",
        SLAM: "slam",
        TARGET_LOCK: "targetLock",

        properties:
        {
            "barrelRoll":
            {
                displayName: "Barrel Roll",
                value: "barrelRoll",
            },
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
            "boost":
            {
                displayName: "Boost",
                value: "boost",
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
            "coordinate":
            {
                displayName: "Coordinate",
                value: "coordinate",
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
            "jam":
            {
                displayName: "Jam",
                value: "jam",
            },
            "recover":
            {
                displayName: "Recover",
                value: "recover",
            },
            "reinforce":
            {
                displayName: "Reinforce",
                value: "reinforce",
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

    ShipAction.createJamShipAction = function(defender)
    {
        InputValidator.validateNotNull("defender", defender);

        return (
        {
            shipAction: ShipAction.JAM,
            defender: defender,
        });
    };

    ShipAction.createReinforceShipAction = function(defender)
    {
        InputValidator.validateNotNull("defender", defender);

        return (
        {
            shipAction: ShipAction.REINFORCE,
            defender: defender,
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
