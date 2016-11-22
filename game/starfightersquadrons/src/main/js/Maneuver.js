/*
 * Provides an enumeration of maneuvers for Starfighter Squadrons. <p> Small
 * ship base is 40mm x 40mm. </p> <p> Bearing straight, speed one maneuver is
 * 40mm long. Other straight maneuvers are multiples of this. </p>
 */
define(["Bearing", "Difficulty"],
    function(Bearing, Difficulty)
    {
        "use strict";
        var Maneuver = {
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

            // Bank with energy.
            BANK_LEFT_1_2: "bankLeft1_2",
            BANK_LEFT_1_3: "bankLeft1_3",
            BANK_LEFT_2_1: "bankLeft2_1",
            BANK_LEFT_2_2: "bankLeft2_2",
            BANK_RIGHT_1_2: "bankRight1_2",
            BANK_RIGHT_1_3: "bankRight1_3",
            BANK_RIGHT_2_1: "bankRight2_1",
            BANK_RIGHT_2_2: "bankRight2_2",

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
            SEGNORS_LOOP_LEFT_2_STANDARD: "segnorsLoopLeft2Standard",
            SEGNORS_LOOP_RIGHT_2_HARD: "segnorsLoopRight2Hard",
            SEGNORS_LOOP_LEFT_3_HARD: "segnorsLoopLeft3Hard",
            SEGNORS_LOOP_RIGHT_3_HARD: "segnorsLoopRight3Hard",

            // Stationary.
            STATIONARY_0_HARD: "stationary0Hard",
            STATIONARY_0_STANDARD: "stationary0Standard",

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

            // Straight with energy.
            STRAIGHT_1_3: "straight1_3",
            STRAIGHT_2_2: "straight2_2",
            STRAIGHT_2_3: "straight2_3",
            STRAIGHT_3_1: "straight3_1",
            STRAIGHT_3_2: "straight3_2",
            STRAIGHT_4_0: "straight4_0",
            STRAIGHT_4_1: "straight4_1",
            STRAIGHT_4_2: "straight4_2",

            // Tallon Roll.
            TALLON_ROLL_LEFT_3_HARD: "tallonRollLeft3Hard",
            TALLON_ROLL_RIGHT_3_HARD: "tallonRollRight3Hard",

            // Turn.
            TURN_LEFT_1_EASY: "turnLeft1Easy",
            TURN_LEFT_1_HARD: "turnLeft1Hard",
            TURN_LEFT_1_STANDARD: "turnLeft1Standard",
            TURN_LEFT_2_EASY: "turnLeft2Easy",
            TURN_LEFT_2_HARD: "turnLeft2Hard",
            TURN_LEFT_2_STANDARD: "turnLeft2Standard",
            TURN_LEFT_3_EASY: "turnLeft3Easy",
            TURN_LEFT_3_HARD: "turnLeft3Hard",
            TURN_LEFT_3_STANDARD: "turnLeft3Standard",
            TURN_RIGHT_1_EASY: "turnRight1Easy",
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
                "bankLeft1_2":
                {
                    bearingKey: Bearing.HUGE_BANK_LEFT,
                    speed: 1,
                    energy: 2,
                    difficultyKey: Difficulty.STANDARD,
                    radius: 82.6,
                    value: "bankLeft1_2",
                },
                "bankLeft1_3":
                {
                    bearingKey: Bearing.HUGE_BANK_LEFT,
                    speed: 1,
                    energy: 3,
                    difficultyKey: Difficulty.STANDARD,
                    radius: 82.6,
                    value: "bankLeft1_3",
                },
                "bankLeft2_1":
                {
                    bearingKey: Bearing.HUGE_BANK_LEFT,
                    speed: 2,
                    energy: 1,
                    difficultyKey: Difficulty.STANDARD,
                    radius: 127.0,
                    value: "bankLeft2_1",
                },
                "bankLeft2_2":
                {
                    bearingKey: Bearing.HUGE_BANK_LEFT,
                    speed: 2,
                    energy: 2,
                    difficultyKey: Difficulty.STANDARD,
                    radius: 127.0,
                    value: "bankLeft2_2",
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
                "bankRight1_2":
                {
                    bearingKey: Bearing.HUGE_BANK_RIGHT,
                    speed: 1,
                    energy: 2,
                    difficultyKey: Difficulty.STANDARD,
                    radius: 82.6,
                    value: "bankRight1_2",
                },
                "bankRight1_3":
                {
                    bearingKey: Bearing.HUGE_BANK_RIGHT,
                    speed: 1,
                    energy: 3,
                    difficultyKey: Difficulty.STANDARD,
                    radius: 82.6,
                    value: "bankRight1_3",
                },
                "bankRight2_1":
                {
                    bearingKey: Bearing.HUGE_BANK_RIGHT,
                    speed: 2,
                    energy: 1,
                    difficultyKey: Difficulty.STANDARD,
                    radius: 127.0,
                    value: "bankRight2_1",
                },
                "bankRight2_2":
                {
                    bearingKey: Bearing.HUGE_BANK_RIGHT,
                    speed: 2,
                    energy: 2,
                    difficultyKey: Difficulty.STANDARD,
                    radius: 127.0,
                    value: "bankRight2_2",
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
                    value: "barrelRollRight1Standard",
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
                    value: "barrelRollRight2Standard",
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
                "segnorsLoopLeft2Standard":
                {
                    bearingKey: Bearing.SEGNORS_LOOP_LEFT,
                    speed: 2,
                    difficultyKey: Difficulty.STANDARD,
                    radius: 127.0,
                    value: "segnorsLoopLeft2Standard",
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
                "stationary0Standard":
                {
                    speed: 0,
                    difficultyKey: Difficulty.STANDARD,
                    value: "stationary0Standard",
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
                "straight1_3":
                {
                    bearingKey: Bearing.STRAIGHT,
                    speed: 1,
                    energy: 3,
                    difficultyKey: Difficulty.STANDARD,
                    value: "straight1_3",
                },
                "straight2_2":
                {
                    bearingKey: Bearing.STRAIGHT,
                    speed: 2,
                    energy: 2,
                    difficultyKey: Difficulty.STANDARD,
                    value: "straight2_2",
                },
                "straight2_3":
                {
                    bearingKey: Bearing.STRAIGHT,
                    speed: 2,
                    energy: 3,
                    difficultyKey: Difficulty.STANDARD,
                    value: "straight2_3",
                },
                "straight3_1":
                {
                    bearingKey: Bearing.STRAIGHT,
                    speed: 3,
                    energy: 1,
                    difficultyKey: Difficulty.STANDARD,
                    value: "straight3_1",
                },
                "straight3_2":
                {
                    bearingKey: Bearing.STRAIGHT,
                    speed: 3,
                    energy: 2,
                    difficultyKey: Difficulty.STANDARD,
                    value: "straight3_2",
                },
                "straight4_0":
                {
                    bearingKey: Bearing.STRAIGHT,
                    speed: 4,
                    energy: 0,
                    difficultyKey: Difficulty.STANDARD,
                    value: "straight4_0",
                },
                "straight4_1":
                {
                    bearingKey: Bearing.STRAIGHT,
                    speed: 4,
                    energy: 1,
                    difficultyKey: Difficulty.STANDARD,
                    value: "straight4_1",
                },
                "straight4_2":
                {
                    bearingKey: Bearing.STRAIGHT,
                    speed: 4,
                    energy: 2,
                    difficultyKey: Difficulty.STANDARD,
                    value: "straight4_2",
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
                "turnLeft1Easy":
                {
                    bearingKey: Bearing.TURN_LEFT,
                    speed: 1,
                    difficultyKey: Difficulty.EASY,
                    radius: 34.3,
                    value: "turnLeft1Easy",
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
                "turnRight1Easy":
                {
                    bearingKey: Bearing.TURN_RIGHT,
                    speed: 1,
                    difficultyKey: Difficulty.EASY,
                    radius: 34.3,
                    value: "turnRight1Easy",
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
                    var maneuverKey = values[i];
                    var maneuver = Maneuver.properties[maneuverKey];

                    if ((maneuver.bearingKey === bearingKey) && (maneuver.speed === speed) &&
                        (maneuver.difficultyKey === difficultyKey))
                    {
                        answer = maneuverKey;
                        break;
                    }
                }

                return answer;
            },

            toString: function(maneuverKey)
            {
                var maneuver = Maneuver.properties[maneuverKey];
                var bearingName = maneuver.bearing.name;
                var speed = maneuver.speed;
                var difficultyName = maneuver.difficulty.name;

                return bearingName + " " + speed + " " + difficultyName;
            },

            values: function()
            {
                return Object.getOwnPropertyNames(Maneuver.properties);
            },
        };

        Maneuver.values().forEach(function(maneuverKey)
        {
            var maneuver = Maneuver.properties[maneuverKey];
            maneuver.bearing = Bearing.properties[maneuver.bearingKey];
            maneuver.difficulty = Difficulty.properties[maneuver.difficultyKey];
        });

        if (Object.freeze)
        {
            Object.freeze(Maneuver);
        }

        return Maneuver;
    });
