/*
 * Provides an enumeration of bearings.
 */
define(function()
{
    "use strict";
    var Bearing =
    {
        HUGE_BANK_LEFT: "hugeBankLeft",
        TURN_LEFT: "turnLeft",
        BANK_LEFT: "bankLeft",
        STRAIGHT: "straight",
        BANK_RIGHT: "bankRight",
        TURN_RIGHT: "turnRight",
        HUGE_BANK_RIGHT: "hugeBankRight",

        BARREL_ROLL_LEFT: "barrelRollLeft",
        SEGNORS_LOOP_LEFT: "segnorsLoopLeft",
        TALLON_ROLL_LEFT: "tallonRollLeft",
        KOIOGRAN_TURN: "kTurn",
        BARREL_ROLL_RIGHT: "barrelRollRight",
        SEGNORS_LOOP_RIGHT: "segnorsLoopRight",
        TALLON_ROLL_RIGHT: "tallonRollRight",

        properties:
        {
            "hugeBankLeft":
            {
                name: "Huge Bank Left",
                headingChange: -30,
                isBank: true,
                value: "hugeBankLeft",
            },
            "turnLeft":
            {
                name: "Turn Left",
                headingChange: -90,
                isTurn: true,
                value: "turnLeft",
            },
            "bankLeft":
            {
                name: "Bank Left",
                headingChange: -45,
                isBank: true,
                value: "bankLeft",
            },
            "straight":
            {
                name: "Straight",
                headingChange: 0,
                value: "straight",
            },
            "bankRight":
            {
                name: "Bank Right",
                headingChange: 45,
                isBank: true,
                value: "bankRight",
            },
            "turnRight":
            {
                name: "Turn Right",
                headingChange: 90,
                isTurn: true,
                value: "turnRight",
            },
            "hugeBankRight":
            {
                name: "Huge Bank Right",
                headingChange: 30,
                isBank: true,
                value: "hugeBankRight",
            },
            "barrelRollLeft":
            {
                name: "Barrel Roll Left",
                headingChange: 0,
                value: "barrelRollLeft",
            },
            "segnorsLoopLeft":
            {
                headingChange: 135,
                value: "segnorsLoopLeft",
            },
            "tallonRollLeft":
            {
                headingChange: 180,
                value: "tallonRollLeft",
            },
            "kTurn":
            {
                headingChange: 180,
                value: "kTurn",
            },
            "barrelRollRight":
            {
                name: "Barrel Roll Right",
                headingChange: 0,
                value: "barrelRollRight",
            },
            "segnorsLoopRight":
            {
                headingChange: 225,
                value: "segnorsLoopRight",
            },
            "tallonRollRight":
            {
                headingChange: 180,
                value: "tallonRollRight",
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
    }

    return Bearing;
});
