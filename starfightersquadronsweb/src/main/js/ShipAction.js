define(function()
{
    "use strict";
    var ShipAction =
    {
        BARREL_ROLL: "barrelRoll",
        BOOST: "boost",
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
            "boost":
            {
                displayName: "Boost",
                value: "boost",
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

    if (Object.freeze)
    {
        Object.freeze(ShipAction);
    }

    return ShipAction;
});
