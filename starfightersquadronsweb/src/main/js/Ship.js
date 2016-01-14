define(
        [ "FiringArc", "Maneuver", "ShipAction", "ShipBase" ],
        function(FiringArc, Maneuver, ShipAction, ShipBase)
        {
            "use strict";
            var Ship =
            {
                A_WING: "aWing",
                AGGRESSOR: "aggressor",
                B_WING: "bWing",
                E_WING: "eWing",
                FIRESPRAY_31: "firespray31",
                HWK_290: "hwk290",
                K_WING: "kWing",
                KIHRAXZ_FIGHTER: "kihraxzFighter",
                LAMBDA_CLASS_SHUTTLE: "lambdaClassShuttle",
                M3_A_INTERCEPTOR: "m3AInterceptor",
                STAR_VIPER: "starViper",
                T_70_X_WING: "t70XWing",
                TIE_ADVANCED: "tieAdvanced",
                TIE_BOMBER: "tieBomber",
                TIE_DEFENDER: "tieDefender",
                TIE_FIGHTER: "tieFighter",
                TIE_FO_FIGHTER: "tieFoFighter",
                TIE_INTERCEPTOR: "tieInterceptor",
                TIE_PHANTOM: "tiePhantom",
                TIE_PUNISHER: "tiePunisher",
                VT_49_DECIMATOR: "vt49Decimator",
                X_WING: "xWing",
                Y_WING: "yWing",
                YT_1300: "yt1300",
                YT_2400: "yt2400",
                YV_666: "yv666",
                Z_95_HEADHUNTER: "z95Headhunter",
                properties:
                {
                    "aWing":
                    {
                        name: "A-Wing",
                        description: "An A-Wing.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_EASY, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_EASY, Maneuver.TURN_LEFT_3_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_EASY, Maneuver.STRAIGHT_5_EASY,
                                Maneuver.KOIOGRAN_TURN_5_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BOOST_LEFT,
                                ShipAction.BOOST_STRAIGHT, ShipAction.BOOST_RIGHT, ShipAction.EVADE ],
                        value: "aWing",
                    },
                    "aggressor":
                    {
                        name: "Aggressor",
                        description: "An Aggressor.",
                        shipBaseKey: ShipBase.LARGE,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.SEGNORS_LOOP_LEFT_3_HARD,
                                Maneuver.SEGNORS_LOOP_RIGHT_3_HARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BOOST_LEFT,
                                ShipAction.BOOST_STRAIGHT, ShipAction.BOOST_RIGHT, ShipAction.EVADE ],
                        value: "aggressor",
                    },
                    "bWing":
                    {
                        name: "B-Wing",
                        description: "A B-Wing.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.TURN_LEFT_1_HARD, Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_HARD, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.KOIOGRAN_TURN_2_HARD, Maneuver.BANK_LEFT_3_HARD, Maneuver.STRAIGHT_3_STANDARD,
                                Maneuver.BANK_RIGHT_3_HARD, Maneuver.STRAIGHT_4_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT ],
                        value: "bWing",
                    },
                    "eWing":
                    {
                        name: "E-Wing",
                        description: "An E-Wing.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.BANK_LEFT_1_STANDARD, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY,
                                Maneuver.TURN_RIGHT_2_STANDARD, Maneuver.TURN_LEFT_3_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD, Maneuver.STRAIGHT_5_STANDARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT, ShipAction.EVADE ],
                        value: "eWing",
                    },
                    "firespray31":
                    {
                        name: "Firespray-31",
                        description: "A Firespray-31.",
                        shipBaseKey: ShipBase.LARGE,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        auxiliaryFiringArcKey: FiringArc.AFT,
                        maneuverKeys: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD,
                                Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_STANDARD,
                                Maneuver.TURN_RIGHT_3_STANDARD, Maneuver.KOIOGRAN_TURN_3_HARD,
                                Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.EVADE ],
                        value: "firespray31",
                    },
                    "hwk290":
                    {
                        name: "HWK-290",
                        description: "An HWK-290.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_HARD, Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_HARD,
                                Maneuver.STRAIGHT_4_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "hwk290",
                    },
                    "kWing":
                    {
                        name: "K-Wing",
                        description: "A K-Wing.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_STANDARD,
                                Maneuver.BANK_RIGHT_3_STANDARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.SLAM ],
                        value: "kWing",
                    },
                    "kihraxzFighter":
                    {
                        name: "Kihraxz Fighter",
                        description: "A Kihraxz fighter.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_STANDARD,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD, Maneuver.KOIOGRAN_TURN_5_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "kihraxzFighter",
                    },
                    "lambdaClassShuttle":
                    {
                        name: "Lambda-class Shuttle",
                        description: "A Lambda-class shuttle.",
                        shipBaseKey: ShipBase.LARGE,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.STATIONARY_0_HARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_LEFT_2_HARD,
                                Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_HARD, Maneuver.BANK_LEFT_3_HARD,
                                Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "lambdaClassShuttle",
                    },
                    "m3AInterceptor":
                    {
                        name: "M3-A Interceptor",
                        description: "An M3-A Interceptor.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.KOIOGRAN_TURN_3_HARD,
                                Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_5_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT, ShipAction.EVADE ],
                        value: "m3AInterceptor",
                    },
                    "starViper":
                    {
                        name: "StarViper",
                        description: "A StarViper.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.SEGNORS_LOOP_LEFT_3_HARD,
                                Maneuver.SEGNORS_LOOP_RIGHT_3_HARD, Maneuver.STRAIGHT_4_STANDARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT, ShipAction.BOOST_LEFT, ShipAction.BOOST_STRAIGHT,
                                ShipAction.BOOST_RIGHT ],
                        value: "starViper",
                    },
                    "t70XWing":
                    {
                        name: "T-70 X-Wing",
                        description: "A T-70 X-Wing.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD,
                                Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_STANDARD,
                                Maneuver.TURN_RIGHT_3_STANDARD, Maneuver.TALLON_ROLL_LEFT_3_HARD,
                                Maneuver.TALLON_ROLL_RIGHT_3_HARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BOOST_LEFT,
                                ShipAction.BOOST_STRAIGHT, ShipAction.BOOST_RIGHT ],
                        value: "xWing",
                    },
                    "tieAdvanced":
                    {
                        name: "TIE Advanced",
                        description: "A TIE Advanced.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.BANK_RIGHT_1_EASY,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD,
                                Maneuver.STRAIGHT_5_STANDARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT, ShipAction.EVADE ],
                        value: "tieAdvanced",
                    },
                    "tieBomber":
                    {
                        name: "TIE Bomber",
                        description: "A TIE bomber.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.BANK_LEFT_1_STANDARD, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_HARD, Maneuver.BANK_LEFT_2_EASY,
                                Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_HARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_5_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT ],
                        value: "tieBomber",
                    },
                    "tieDefender":
                    {
                        name: "TIE Defender",
                        description: "A TIE defender.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.TURN_LEFT_1_HARD, Maneuver.BANK_LEFT_1_STANDARD,
                                Maneuver.BANK_RIGHT_1_STANDARD, Maneuver.TURN_RIGHT_1_HARD, Maneuver.TURN_LEFT_2_HARD,
                                Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_HARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.STRAIGHT_4_EASY, Maneuver.KOIOGRAN_TURN_4_STANDARD, Maneuver.STRAIGHT_5_EASY ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT ],
                        value: "tieDefender",
                    },
                    "tieFighter":
                    {
                        name: "TIE Fighter",
                        description: "A TIE fighter.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD, Maneuver.STRAIGHT_5_STANDARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.BARREL_ROLL_LEFT, ShipAction.BARREL_ROLL_RIGHT,
                                ShipAction.EVADE ],
                        value: "tieFighter",
                    },
                    "tieFoFighter":
                    {
                        name: "TIE/fo Fighter",
                        description: "A TIE/fo fighter.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_EASY, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_EASY,
                                Maneuver.SEGNORS_LOOP_LEFT_2_HARD, Maneuver.SEGNORS_LOOP_RIGHT_2_HARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD,
                                Maneuver.STRAIGHT_5_STANDARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT, ShipAction.EVADE ],
                        value: "tieFoFighter",
                    },
                    "tieInterceptor":
                    {
                        name: "TIE Interceptor",
                        description: "A TIE interceptor.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_EASY, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_EASY, Maneuver.TURN_LEFT_3_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_EASY, Maneuver.STRAIGHT_5_STANDARD,
                                Maneuver.KOIOGRAN_TURN_5_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.BARREL_ROLL_LEFT, ShipAction.BARREL_ROLL_RIGHT,
                                ShipAction.BOOST_LEFT, ShipAction.BOOST_STRAIGHT, ShipAction.BOOST_RIGHT,
                                ShipAction.EVADE ],
                        value: "tieInterceptor",
                    },
                    "tiePhantom":
                    {
                        name: "TIE Phantom",
                        description: "A TIE phantom.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.BARREL_ROLL, ShipAction.EVADE, ShipAction.CLOAK, ],
                        value: "tiePhantom",
                    },
                    "tiePunisher":
                    {
                        name: "TIE Punisher",
                        description: "A TIE punisher.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_LEFT_2_HARD, Maneuver.BANK_LEFT_2_STANDARD,
                                Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_HARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD,
                                Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_STANDARD,
                                Maneuver.TURN_RIGHT_3_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BOOST_LEFT,
                                ShipAction.BOOST_STRAIGHT, ShipAction.BOOST_RIGHT, ],
                        value: "tiePunisher",
                    },
                    "vt49Decimator":
                    {
                        name: "VT-49 Decimator",
                        description: "A VT-49 Decimator.",
                        shipBaseKey: ShipBase.LARGE,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        isPrimaryWeaponTurret: true,
                        maneuverKeys: [ Maneuver.BANK_LEFT_1_STANDARD, Maneuver.STRAIGHT_1_STANDARD,
                                Maneuver.BANK_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY,
                                Maneuver.TURN_RIGHT_2_STANDARD, Maneuver.TURN_LEFT_3_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.STRAIGHT_4_STANDARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "vt49Decimator",
                    },
                    "xWing":
                    {
                        name: "X-Wing",
                        description: "An X-Wing.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD,
                                Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_STANDARD,
                                Maneuver.TURN_RIGHT_3_STANDARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "xWing",
                    },
                    "yWing":
                    {
                        name: "Y-Wing",
                        description: "A Y-Wing.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.BANK_LEFT_1_STANDARD, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_HARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_STANDARD,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_HARD, Maneuver.STRAIGHT_4_HARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "yWing",
                    },
                    "yt1300":
                    {
                        name: "YT-1300",
                        description: "A YT-1300.",
                        shipBaseKey: ShipBase.LARGE,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        isPrimaryWeaponTurret: true,
                        maneuverKeys: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_STANDARD,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.KOIOGRAN_TURN_3_HARD,
                                Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "yt1300",
                    },
                    "yt2400":
                    {
                        name: "YT-2400",
                        description: "A YT-2400.",
                        shipBaseKey: ShipBase.LARGE,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        isPrimaryWeaponTurret: true,
                        maneuverKeys: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD,
                                Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_STANDARD,
                                Maneuver.TURN_RIGHT_3_STANDARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT ],
                        value: "yt2400",
                    },
                    "yv666":
                    {
                        name: "YV-666",
                        description: "A YV-666.",
                        shipBaseKey: ShipBase.LARGE,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        auxiliaryFiringArcKey: FiringArc.FULL_AFT,
                        maneuverKeys: [ Maneuver.STATIONARY_0_HARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_LEFT_2_HARD,
                                Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_HARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.STRAIGHT_4_STANDARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "yv666",
                    },
                    "z95Headhunter":
                    {
                        name: "Z-95 Headhunter",
                        description: "A Z-95 headhunter.",
                        shipBaseKey: ShipBase.SMALL,
                        primaryFiringArcKey: FiringArc.FORWARD,
                        maneuverKeys: [ Maneuver.BANK_LEFT_1_STANDARD, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY,
                                Maneuver.TURN_RIGHT_2_STANDARD, Maneuver.TURN_LEFT_3_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_STANDARD,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_STANDARD ],
                        shipActionKeys: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "z95Headhunter",
                    },
                },

                values: function()
                {
                    return Object.getOwnPropertyNames(Ship.properties);
                },
            };

            Ship.values().forEach(function(shipKey)
            {
                var ship = Ship.properties[shipKey];
                ship.shipBase = ShipBase.properties[ship.shipBaseKey];
                ship.primaryFiringArc = FiringArc.properties[ship.primaryFiringArcKey];
            });

            if (Object.freeze)
            {
                Object.freeze(Ship);
            }

            return Ship;
        });
