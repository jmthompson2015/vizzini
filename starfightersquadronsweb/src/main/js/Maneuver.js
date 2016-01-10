/*
 * Provides an enumeration of maneuvers for Starfighter Squadrons. <p> Small
 * ship base is 40mm x 40mm. </p> <p> Bearing straight, speed one maneuver is
 * 40mm long. Other straight maneuvers are multiples of this. </p>
 */
define([ "Bearing", "Difficulty" ], function(Bearing, Difficulty)
{
    "use strict";
    var Maneuver =
    {
        // Bank.
        BANK_LEFT_1_EASY: "bankLeft1Easy",
        BANK_LEFT_1_STANDARD: "bankLeft1Standard",
        BANK_LEFT_2_EASY: "bankLeft2Easy",
        BANK_LEFT_2_STANDARD: "bankLeft2Standard",
        BANK_LEFT_3_EASY: "bankLeft3Easy",
        BANK_LEFT_3_HARD: "bankLeft3Hard",
        BANK_LEFT_3_STANDARD: "bankLeft3Standard",
        BANK_RIGHT_1_EASY: "bankRight1Easy",
        BANK_RIGHT_1_STANDARD: "bankRight1Standard",
        BANK_RIGHT_2_EASY: "bankRight2Easy",
        BANK_RIGHT_2_STANDARD: "bankRight2Standard",
        BANK_RIGHT_3_EASY: "bankRight3Easy",
        BANK_RIGHT_3_HARD: "bankRight3Hard",
        BANK_RIGHT_3_STANDARD: "bankRight3Standard",

        // Barrel Roll.
        BARREL_ROLL_LEFT_1_STANDARD: "barrelRollLeft1Standard",
        BARREL_ROLL_RIGHT_1_STANDARD: "barrelRollRight1Standard",
        BARREL_ROLL_LEFT_2_STANDARD: "barrelRollLeft2Standard",
        BARREL_ROLL_RIGHT_2_STANDARD: "barrelRollRight2Standard",

        // Koiogran turn.
        KOIOGRAN_TURN_2_HARD: "koiogranTurn2Hard",
        KOIOGRAN_TURN_3_HARD: "koiogranTurn3Hard",
        KOIOGRAN_TURN_4_HARD: "koiogranTurn4Hard",
        KOIOGRAN_TURN_4_STANDARD: "koiogranTurn4Standard",
        KOIOGRAN_TURN_5_HARD: "koiogranTurn5Hard",

        // Segnor's loop.
        SEGNORS_LOOP_LEFT_2_HARD: "segnorsLoopLeft2Hard",
        SEGNORS_LOOP_RIGHT_2_HARD: "segnorsLoopRight2Hard",
        SEGNORS_LOOP_LEFT_3_HARD: "segnorsLoopLeft3Hard",
        SEGNORS_LOOP_RIGHT_3_HARD: "segnorsLoopRight3Hard",

        // Stationary.
        STATIONARY_0_HARD: "stationary0Hard",

        // Straight.
        STRAIGHT_1_EASY: "straight1Easy",
        STRAIGHT_1_STANDARD: "straight1Standard",
        STRAIGHT_2_EASY: "straight2Easy",
        STRAIGHT_2_STANDARD: "straight2Standard",
        STRAIGHT_3_EASY: "straight3Easy",
        STRAIGHT_3_STANDARD: "straight3Standard",
        STRAIGHT_4_EASY: "straight4Easy",
        STRAIGHT_4_HARD: "straight4Hard",
        STRAIGHT_4_STANDARD: "straight4Standard",
        STRAIGHT_5_EASY: "straight5Easy",
        STRAIGHT_5_STANDARD: "straight5Standard",

        // Tallon Roll.
        TALLON_ROLL_LEFT_3_HARD: "tallonRollLeft3Hard",
        TALLON_ROLL_RIGHT_3_HARD: "tallonRollRight3Hard",

        // Turn.
        TURN_LEFT_1_HARD: "turnLeft1Hard",
        TURN_LEFT_1_STANDARD: "turnLeft1Standard",
        TURN_LEFT_2_EASY: "turnLeft2Easy",
        TURN_LEFT_2_HARD: "turnLeft2Hard",
        TURN_LEFT_2_STANDARD: "turnLeft2Standard",
        TURN_LEFT_3_EASY: "turnLeft3Easy",
        TURN_LEFT_3_HARD: "turnLeft3Hard",
        TURN_LEFT_3_STANDARD: "turnLeft3Standard",
        TURN_RIGHT_1_HARD: "turnRight1Hard",
        TURN_RIGHT_1_STANDARD: "turnRight1Standard",
        TURN_RIGHT_2_EASY: "turnRight2Easy",
        TURN_RIGHT_2_HARD: "turnRight2Hard",
        TURN_RIGHT_2_STANDARD: "turnRight2Standard",
        TURN_RIGHT_3_EASY: "turnRight3Easy",
        TURN_RIGHT_3_HARD: "turnRight3Hard",
        TURN_RIGHT_3_STANDARD: "turnRight3Standard",
        properties:
        {
            "bankLeft1Easy":
            {
                bearingKey: Bearing.BANK_LEFT,
                speed: 1,
                difficultyKey: Difficulty.EASY,
                radius: 82.6,
                value: "bankLeft1Easy",
            },
            "bankLeft1Standard":
            {
                bearingKey: Bearing.BANK_LEFT,
                speed: 1,
                difficultyKey: Difficulty.STANDARD,
                radius: 82.6,
                value: "bankLeft1Standard",
            },
            "bankLeft2Easy":
            {
                bearingKey: Bearing.BANK_LEFT,
                speed: 2,
                difficultyKey: Difficulty.EASY,
                radius: 127.0,
                value: "bankLeft2Easy",
            },
            "bankLeft2Standard":
            {
                bearingKey: Bearing.BANK_LEFT,
                speed: 2,
                difficultyKey: Difficulty.STANDARD,
                radius: 127.0,
                value: "bankLeft2Standard",
            },
            "bankLeft3Easy":
            {
                bearingKey: Bearing.BANK_LEFT,
                speed: 3,
                difficultyKey: Difficulty.EASY,
                radius: 177.8,
                value: "bankLeft3Easy",
            },
            "bankLeft3Hard":
            {
                bearingKey: Bearing.BANK_LEFT,
                speed: 3,
                difficultyKey: Difficulty.HARD,
                radius: 177.8,
                value: "bankLeft3Hard",
            },
            "bankLeft3Standard":
            {
                bearingKey: Bearing.BANK_LEFT,
                speed: 3,
                difficultyKey: Difficulty.STANDARD,
                radius: 177.8,
                value: "bankLeft3Standard",
            },
            "bankRight1Easy":
            {
                bearingKey: Bearing.BANK_RIGHT,
                speed: 1,
                difficultyKey: Difficulty.EASY,
                radius: 82.6,
                value: "bankRight1Easy",
            },
            "bankRight1Standard":
            {
                bearingKey: Bearing.BANK_RIGHT,
                speed: 1,
                difficultyKey: Difficulty.STANDARD,
                radius: 82.6,
                value: "bankRight1Standard",
            },
            "bankRight2Easy":
            {
                bearingKey: Bearing.BANK_RIGHT,
                speed: 2,
                difficultyKey: Difficulty.EASY,
                radius: 127.0,
                value: "bankRight2Easy",
            },
            "bankRight2Standard":
            {
                bearingKey: Bearing.BANK_RIGHT,
                speed: 2,
                difficultyKey: Difficulty.STANDARD,
                radius: 127.0,
                value: "bankRight2Standard",
            },
            "bankRight3Easy":
            {
                bearingKey: Bearing.BANK_RIGHT,
                speed: 3,
                difficultyKey: Difficulty.EASY,
                radius: 177.8,
                value: "bankRight3Easy",
            },
            "bankRight3Hard":
            {
                bearingKey: Bearing.BANK_RIGHT,
                speed: 3,
                difficultyKey: Difficulty.HARD,
                radius: 177.8,
                value: "bankRight3Hard",
            },
            "bankRight3Standard":
            {
                bearingKey: Bearing.BANK_RIGHT,
                speed: 3,
                difficultyKey: Difficulty.STANDARD,
                radius: 177.8,
                value: "bankRight3Standard",
            },
            "barrelRollLeft1Standard":
            {
                bearingKey: Bearing.BARREL_ROLL_LEFT,
                speed: 1,
                difficultyKey: Difficulty.STANDARD,
                value: "barrelRollLeft1Standard",
            },
            "barrelRollRight1Standard":
            {
                bearingKey: Bearing.BARREL_ROLL_RIGHT,
                speed: 1,
                difficultyKey: Difficulty.STANDARD,
                value: "barrelRightLeft1Standard",
            },
            "barrelRollLeft2Standard":
            {
                bearingKey: Bearing.BARREL_ROLL_LEFT,
                speed: 2,
                difficultyKey: Difficulty.STANDARD,
                value: "barrelRollLeft2Standard",
            },
            "barrelRollRight2Standard":
            {
                bearingKey: Bearing.BARREL_ROLL_RIGHT,
                speed: 2,
                difficultyKey: Difficulty.STANDARD,
                value: "barrelRightLeft2Standard",
            },
            "koiogranTurn2Hard":
            {
                bearingKey: Bearing.KOIOGRAN_TURN,
                speed: 2,
                difficultyKey: Difficulty.HARD,
                value: "koiogranTurn2Hard",
            },
            "koiogranTurn3Hard":
            {
                bearingKey: Bearing.KOIOGRAN_TURN,
                speed: 3,
                difficultyKey: Difficulty.HARD,
                value: "koiogranTurn3Hard",
            },
            "koiogranTurn4Hard":
            {
                bearingKey: Bearing.KOIOGRAN_TURN,
                speed: 4,
                difficultyKey: Difficulty.HARD,
                value: "koiogranTurn4Hard",
            },
            "koiogranTurn4Standard":
            {
                bearingKey: Bearing.KOIOGRAN_TURN,
                speed: 4,
                difficultyKey: Difficulty.STANDARD,
                value: "koiogranTurn4Standard",
            },
            "koiogranTurn5Hard":
            {
                bearingKey: Bearing.KOIOGRAN_TURN,
                speed: 5,
                difficultyKey: Difficulty.HARD,
                value: "koiogranTurn5Hard",
            },
            "segnorsLoopLeft2Hard":
            {
                bearingKey: Bearing.SEGNORS_LOOP_LEFT,
                speed: 2,
                difficultyKey: Difficulty.HARD,
                radius: 127.0,
                value: "segnorsLoopLeft2Hard",
            },
            "segnorsLoopRight2Hard":
            {
                bearingKey: Bearing.SEGNORS_LOOP_RIGHT,
                speed: 2,
                difficultyKey: Difficulty.HARD,
                radius: 127.0,
                value: "segnorsLoopRight2Hard",
            },
            "segnorsLoopLeft3Hard":
            {
                bearingKey: Bearing.SEGNORS_LOOP_LEFT,
                speed: 3,
                difficultyKey: Difficulty.HARD,
                radius: 177.8,
                value: "segnorsLoopLeft3Hard",
            },
            "segnorsLoopRight3Hard":
            {
                bearingKey: Bearing.SEGNORS_LOOP_RIGHT,
                speed: 3,
                difficultyKey: Difficulty.HARD,
                radius: 177.8,
                value: "segnorsLoopRight3Hard",
            },
            "stationary0Hard":
            {
                speed: 0,
                difficultyKey: Difficulty.HARD,
                value: "stationary0Hard",
            },
            "straight1Easy":
            {
                bearingKey: Bearing.STRAIGHT,
                speed: 1,
                difficultyKey: Difficulty.EASY,
                value: "straight1Easy",
            },
            "straight1Standard":
            {
                bearingKey: Bearing.STRAIGHT,
                speed: 1,
                difficultyKey: Difficulty.STANDARD,
                value: "straight1Standard",
            },
            "straight2Easy":
            {
                bearingKey: Bearing.STRAIGHT,
                speed: 2,
                difficultyKey: Difficulty.EASY,
                value: "straight2Easy",
            },
            "straight2Standard":
            {
                bearingKey: Bearing.STRAIGHT,
                speed: 2,
                difficultyKey: Difficulty.STANDARD,
                value: "straight2Standard",
            },
            "straight3Easy":
            {
                bearingKey: Bearing.STRAIGHT,
                speed: 3,
                difficultyKey: Difficulty.EASY,
                value: "straight3Easy",
            },
            "straight3Standard":
            {
                bearingKey: Bearing.STRAIGHT,
                speed: 3,
                difficultyKey: Difficulty.STANDARD,
                value: "straight3Standard",
            },
            "straight4Easy":
            {
                bearingKey: Bearing.STRAIGHT,
                speed: 4,
                difficultyKey: Difficulty.EASY,
                value: "straight4Easy",
            },
            "straight4Hard":
            {
                bearingKey: Bearing.STRAIGHT,
                speed: 4,
                difficultyKey: Difficulty.HARD,
                value: "straight4Hard",
            },
            "straight4Standard":
            {
                bearingKey: Bearing.STRAIGHT,
                speed: 4,
                difficultyKey: Difficulty.STANDARD,
                value: "straight4Standard",
            },
            "straight5Easy":
            {
                bearingKey: Bearing.STRAIGHT,
                speed: 5,
                difficultyKey: Difficulty.EASY,
                value: "straight5Easy",
            },
            "straight5Standard":
            {
                bearingKey: Bearing.STRAIGHT,
                speed: 5,
                difficultyKey: Difficulty.STANDARD,
                value: "straight5Standard",
            },
            "tallonRollLeft3Hard":
            {
                bearingKey: Bearing.TALLON_ROLL_LEFT,
                speed: 3,
                difficultyKey: Difficulty.HARD,
                radius: 88.9,
                value: "tallonRollLeft3Hard",
            },
            "tallonRollRight3Hard":
            {
                bearingKey: Bearing.TALLON_ROLL_RIGHT,
                speed: 3,
                difficultyKey: Difficulty.HARD,
                radius: 88.9,
                value: "tallonRollRight3Hard",
            },
            "turnLeft1Hard":
            {
                bearingKey: Bearing.TURN_LEFT,
                speed: 1,
                difficultyKey: Difficulty.HARD,
                radius: 34.3,
                value: "turnLeft1Hard",
            },
            "turnLeft1Standard":
            {
                bearingKey: Bearing.TURN_LEFT,
                speed: 1,
                difficultyKey: Difficulty.STANDARD,
                radius: 34.3,
                value: "turnLeft1Standard",
            },
            "turnLeft2Easy":
            {
                bearingKey: Bearing.TURN_LEFT,
                speed: 2,
                difficultyKey: Difficulty.EASY,
                radius: 62.2,
                value: "turnLeft2Easy",
            },
            "turnLeft2Hard":
            {
                bearingKey: Bearing.TURN_LEFT,
                speed: 2,
                difficultyKey: Difficulty.HARD,
                radius: 62.2,
                value: "turnLeft2Hard",
            },
            "turnLeft2Standard":
            {
                bearingKey: Bearing.TURN_LEFT,
                speed: 2,
                difficultyKey: Difficulty.STANDARD,
                radius: 62.2,
                value: "turnLeft2Standard",
            },
            "turnLeft3Easy":
            {
                bearingKey: Bearing.TURN_LEFT,
                speed: 3,
                difficultyKey: Difficulty.EASY,
                radius: 88.9,
                value: "turnLeft3Easy",
            },
            "turnLeft3Hard":
            {
                bearingKey: Bearing.TURN_LEFT,
                speed: 3,
                difficultyKey: Difficulty.HARD,
                radius: 88.9,
                value: "turnLeft3Hard",
            },
            "turnLeft3Standard":
            {
                bearingKey: Bearing.TURN_LEFT,
                speed: 3,
                difficultyKey: Difficulty.STANDARD,
                radius: 88.9,
                value: "turnLeft3Standard",
            },
            "turnRight1Hard":
            {
                bearingKey: Bearing.TURN_RIGHT,
                speed: 1,
                difficultyKey: Difficulty.HARD,
                radius: 34.3,
                value: "turnRight1Hard",
            },
            "turnRight1Standard":
            {
                bearingKey: Bearing.TURN_RIGHT,
                speed: 1,
                difficultyKey: Difficulty.STANDARD,
                radius: 34.3,
                value: "turnRight1Standard",
            },
            "turnRight2Easy":
            {
                bearingKey: Bearing.TURN_RIGHT,
                speed: 2,
                difficultyKey: Difficulty.EASY,
                radius: 62.2,
                value: "turnRight2Easy",
            },
            "turnRight2Hard":
            {
                bearingKey: Bearing.TURN_RIGHT,
                speed: 2,
                difficultyKey: Difficulty.HARD,
                radius: 62.2,
                value: "turnRight2Hard",
            },
            "turnRight2Standard":
            {
                bearingKey: Bearing.TURN_RIGHT,
                speed: 2,
                difficultyKey: Difficulty.STANDARD,
                radius: 62.2,
                value: "turnRight2Standard",
            },
            "turnRight3Easy":
            {
                bearingKey: Bearing.TURN_RIGHT,
                speed: 3,
                difficultyKey: Difficulty.EASY,
                radius: 88.9,
                value: "turnRight3Easy",
            },
            "turnRight3Hard":
            {
                bearingKey: Bearing.TURN_RIGHT,
                speed: 3,
                difficultyKey: Difficulty.HARD,
                radius: 88.9,
                value: "turnRight3Hard",
            },
            "turnRight3Standard":
            {
                bearingKey: Bearing.TURN_RIGHT,
                speed: 3,
                difficultyKey: Difficulty.STANDARD,
                radius: 88.9,
                value: "turnRight3Standard",
            },
        },

        find: function(bearingKey, speed, difficultyKey)
        {
            InputValidator.validateNotNull("difficultyKey", difficultyKey);

            var answer;

            var values = Maneuver.values();

            for (var i = 0; i < values.length; i++)
            {
                var maneuver = values[i];
                var properties = Maneuver.properties[maneuver];

                if ((properties.bearingKey === bearingKey) && (properties.speed === speed) &&
                        (properties.difficultyKey === difficultyKey))
                {
                    answer = maneuver;
                    break;
                }
            }

            return answer;
        },

        toString: function(maneuverKey)
        {
            var m = Maneuver.properties[maneuverKey];
            var bearingName = Bearing.properties[m.bearingKey].name;
            var speed = m.speed;
            var difficultyName = Difficulty.properties[m.difficultyKey].name;

            return bearingName + " " + speed + " " + difficultyName;
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Maneuver.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Maneuver);
    }

    return Maneuver;
});
