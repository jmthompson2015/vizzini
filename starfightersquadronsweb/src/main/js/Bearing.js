/*
 * Provides an enumeration of bearings.
 */
define(function()
{
    var Bearing =
    {
        TURN_LEFT: "turnLeft",
        BANK_LEFT: "bankLeft",
        STRAIGHT: "straight",
        BANK_RIGHT: "bankRight",
        TURN_RIGHT: "turnRight",
        BARREL_ROLL_LEFT: "barrelRollLeft",
        SEGNORS_LOOP_LEFT: "segnorsLoopLeft",
        TALLON_ROLL_LEFT: "tallonRollLeft",
        KOIOGRAN_TURN: "kTurn",
        BARREL_ROLL_RIGHT: "barrelRollRight",
        SEGNORS_LOOP_RIGHT: "segnorsLoopRight",
        TALLON_ROLL_RIGHT: "tallonRollRight",

        properties:
        {
            "turnLeft":
            {
                name: "Turn Left",
                headingChange: -90,
                isBank: false,
                isTurn: true,
            },
            "bankLeft":
            {
                name: "Bank Left",
                headingChange: -45,
                isBank: true,
                isTurn: false,
            },
            "straight":
            {
                name: "Straight",
                headingChange: 0,
                isBank: false,
                isTurn: false,
            },
            "bankRight":
            {
                name: "Bank Right",
                headingChange: 45,
                isBank: true,
                isTurn: false,
            },
            "turnRight":
            {
                name: "Turn Right",
                headingChange: 90,
                isBank: false,
                isTurn: true,
            },
            "barrelRollLeft":
            {
                headingChange: 0,
                isBank: false,
                isTurn: false,
            },
            "segnorsLoopLeft":
            {
                headingChange: 135,
                isBank: false,
                isTurn: false,
            },
            "tallonRollLeft":
            {
                headingChange: 180,
                isBank: false,
                isTurn: false,
            },
            "kTurn":
            {
                headingChange: 180,
                isBank: false,
                isTurn: false,
            },
            "barrelRollRight":
            {
                headingChange: 0,
                isBank: false,
                isTurn: false,
            },
            "segnorsLoopRight":
            {
                headingChange: 225,
                isBank: false,
                isTurn: false,
            },
            "tallonRollRight":
            {
                headingChange: 180,
                isBank: false,
                isTurn: false,
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Bearing.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Bearing);
    };

    return Bearing;
});
