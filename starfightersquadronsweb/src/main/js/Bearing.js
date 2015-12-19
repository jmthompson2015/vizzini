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
        KOIOGRAN_TURN: "kTurn",
        SEGNORS_LOOP_LEFT: "segnorsLoopLeft",
        SEGNORS_LOOP_RIGHT: "segnorsLoopRight",
        BARREL_ROLL_LEFT: "barrelRollLeft",
        BARREL_ROLL_RIGHT: "barrelRollRight",
        properties:
        {
            "turnLeft":
            {
                headingChange: -90,
                isBank: false,
                isTurn: true,
            },
            "bankLeft":
            {
                headingChange: -45,
                isBank: true,
                isTurn: false,
            },
            "straight":
            {
                headingChange: 0,
                isBank: false,
                isTurn: false,
            },
            "bankRight":
            {
                headingChange: 45,
                isBank: true,
                isTurn: false,
            },
            "turnRight":
            {
                headingChange: 90,
                isBank: false,
                isTurn: true,
            },
            "kTurn":
            {
                headingChange: 180,
                isBank: false,
                isTurn: false,
            },
            "segnorsLoopLeft":
            {
                headingChange: 135,
                isBank: false,
                isTurn: false,
            },
            "segnorsLoopRight":
            {
                headingChange: 225,
                isBank: false,
                isTurn: false,
            },
            "barrelRollLeft":
            {
                headingChange: 0,
                isBank: false,
                isTurn: false,
            },
            "barrelRollRight":
            {
                headingChange: 0,
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
