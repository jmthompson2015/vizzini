define(
        [ "FiringArc", "Maneuver", "ShipAction", "ShipBase" ],
        function(FiringArc, Maneuver, ShipAction, ShipBase)
        {
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
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_EASY, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_EASY, Maneuver.TURN_LEFT_3_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_EASY, Maneuver.STRAIGHT_5_EASY,
                                Maneuver.KOIOGRAN_TURN_5_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BOOST_LEFT,
                                ShipAction.BOOST_STRAIGHT, ShipAction.BOOST_RIGHT, ShipAction.EVADE ],
                        value: "aWing",
                    },
                    "aggressor":
                    {
                        name: "Aggressor",
                        description: "An Aggressor.",
                        shipBase: ShipBase.LARGE,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.SEGNORS_LOOP_LEFT_3_HARD,
                                Maneuver.SEGNORS_LOOP_RIGHT_3_HARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BOOST_LEFT,
                                ShipAction.BOOST_STRAIGHT, ShipAction.BOOST_RIGHT, ShipAction.EVADE ],
                        value: "aggressor",
                    },
                    "bWing":
                    {
                        name: "B-Wing",
                        description: "A B-Wing.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.TURN_LEFT_1_HARD, Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_HARD, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.KOIOGRAN_TURN_2_HARD, Maneuver.BANK_LEFT_3_HARD, Maneuver.STRAIGHT_3_STANDARD,
                                Maneuver.BANK_RIGHT_3_HARD, Maneuver.STRAIGHT_4_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT ],
                        value: "bWing",
                    },
                    "eWing":
                    {
                        name: "E-Wing",
                        description: "An E-Wing.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.BANK_LEFT_1_STANDARD, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY,
                                Maneuver.TURN_RIGHT_2_STANDARD, Maneuver.TURN_LEFT_3_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD, Maneuver.STRAIGHT_5_STANDARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT, ShipAction.EVADE ],
                        value: "eWing",
                    },
                    "firespray31":
                    {
                        name: "Firespray-31",
                        description: "A Firespray-31.",
                        shipBase: ShipBase.LARGE,
                        primaryFiringArc: FiringArc.FORWARD_AND_AFT,
                        maneuvers: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD,
                                Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_STANDARD,
                                Maneuver.TURN_RIGHT_3_STANDARD, Maneuver.KOIOGRAN_TURN_3_HARD,
                                Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.EVADE ],
                        value: "firespray31",
                    },
                    "hwk290":
                    {
                        name: "HWK-290",
                        description: "An HWK-290.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_HARD, Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_HARD,
                                Maneuver.STRAIGHT_4_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "hwk290",
                    },
                    "kWing":
                    {
                        name: "K-Wing",
                        description: "A K-Wing.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_STANDARD,
                                Maneuver.BANK_RIGHT_3_STANDARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.SLAM ],
                        value: "kWing",
                    },
                    "kihraxzFighter":
                    {
                        name: "Kihraxz Fighter",
                        description: "A Kihraxz fighter.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_STANDARD,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD, Maneuver.KOIOGRAN_TURN_5_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "kihraxzFighter",
                    },
                    "lambdaClassShuttle":
                    {
                        name: "Lambda-class Shuttle",
                        description: "A Lambda-class shuttle.",
                        shipBase: ShipBase.LARGE,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.STATIONARY_0_HARD, Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_LEFT_2_HARD, Maneuver.BANK_LEFT_2_STANDARD,
                                Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_HARD,
                                Maneuver.BANK_LEFT_3_HARD, Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "lambdaClassShuttle",
                    },
                    "m3AInterceptor":
                    {
                        name: "M3-A Interceptor",
                        description: "An M3-A Interceptor.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.KOIOGRAN_TURN_3_HARD,
                                Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_5_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT, ShipAction.EVADE ],
                        value: "m3AInterceptor",
                    },
                    "starViper":
                    {
                        name: "StarViper",
                        description: "A StarViper.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.SEGNORS_LOOP_LEFT_3_HARD,
                                Maneuver.SEGNORS_LOOP_RIGHT_3_HARD, Maneuver.STRAIGHT_4_STANDARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT, ShipAction.BOOST_LEFT, ShipAction.BOOST_STRAIGHT,
                                ShipAction.BOOST_RIGHT ],
                        value: "starViper",
                    },
                    "t70XWing":
                    {
                        name: "T-70 X-Wing",
                        description: "A T-70 X-Wing.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD,
                                Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_STANDARD,
                                Maneuver.TURN_RIGHT_3_STANDARD, Maneuver.TALLON_ROLL_LEFT_3_HARD,
                                Maneuver.TALLON_ROLL_RIGHT_3_HARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BOOST_LEFT,
                                ShipAction.BOOST_STRAIGHT, ShipAction.BOOST_RIGHT ],
                        value: "xWing",
                    },
                    "tieAdvanced":
                    {
                        name: "TIE Advanced",
                        description: "A TIE Advanced.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.BANK_RIGHT_1_EASY,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD,
                                Maneuver.STRAIGHT_5_STANDARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT, ShipAction.EVADE ],
                        value: "tieAdvanced",
                    },
                    "tieBomber":
                    {
                        name: "TIE Bomber",
                        description: "A TIE bomber.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.BANK_LEFT_1_STANDARD, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_HARD, Maneuver.BANK_LEFT_2_EASY,
                                Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_HARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_5_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT ],
                        value: "tieBomber",
                    },
                    "tieDefender":
                    {
                        name: "TIE Defender",
                        description: "A TIE defender.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.TURN_LEFT_1_HARD, Maneuver.BANK_LEFT_1_STANDARD,
                                Maneuver.BANK_RIGHT_1_STANDARD, Maneuver.TURN_RIGHT_1_HARD, Maneuver.TURN_LEFT_2_HARD,
                                Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_HARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.STRAIGHT_4_EASY, Maneuver.KOIOGRAN_TURN_4_STANDARD, Maneuver.STRAIGHT_5_EASY ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT ],
                        value: "tieDefender",
                    },
                    "tieFighter":
                    {
                        name: "TIE Fighter",
                        description: "A TIE fighter.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD, Maneuver.STRAIGHT_5_STANDARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.BARREL_ROLL_LEFT, ShipAction.BARREL_ROLL_RIGHT,
                                ShipAction.EVADE ],
                        value: "tieFighter",
                    },
                    "tieFoFighter":
                    {
                        name: "TIE/fo Fighter",
                        description: "A TIE/fo fighter.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_EASY, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_EASY,
                                Maneuver.SEGNORS_LOOP_LEFT_2_HARD, Maneuver.SEGNORS_LOOP_RIGHT_2_HARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD,
                                Maneuver.STRAIGHT_5_STANDARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT, ShipAction.EVADE ],
                        value: "tieFoFighter",
                    },
                    "tieInterceptor":
                    {
                        name: "TIE Interceptor",
                        description: "A TIE interceptor.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_EASY, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_EASY, Maneuver.TURN_LEFT_3_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_EASY, Maneuver.STRAIGHT_5_STANDARD,
                                Maneuver.KOIOGRAN_TURN_5_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.BARREL_ROLL_LEFT, ShipAction.BARREL_ROLL_RIGHT,
                                ShipAction.BOOST_LEFT, ShipAction.BOOST_STRAIGHT, ShipAction.BOOST_RIGHT,
                                ShipAction.EVADE ],
                        value: "tieInterceptor",
                    },
                    "tiePhantom":
                    {
                        name: "TIE Phantom",
                        description: "A TIE phantom.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.BARREL_ROLL, ShipAction.EVADE, ShipAction.CLOAK, ],
                        value: "tiePhantom",
                    },
                    "tiePunisher":
                    {
                        name: "TIE Punisher",
                        description: "A TIE punisher.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY,
                                Maneuver.TURN_LEFT_2_HARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_HARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD,
                                Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_STANDARD,
                                Maneuver.TURN_RIGHT_3_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BOOST_LEFT,
                                ShipAction.BOOST_STRAIGHT, ShipAction.BOOST_RIGHT, ],
                        value: "tiePunisher",
                    },
                    "vt49Decimator":
                    {
                        name: "VT-49 Decimator",
                        description: "A VT-49 Decimator.",
                        shipBase: ShipBase.LARGE,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.BANK_LEFT_1_STANDARD, Maneuver.STRAIGHT_1_STANDARD,
                                Maneuver.BANK_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY,
                                Maneuver.TURN_RIGHT_2_STANDARD, Maneuver.TURN_LEFT_3_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.STRAIGHT_4_STANDARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "vt49Decimator",
                    },
                    "xWing":
                    {
                        name: "X-Wing",
                        description: "An X-Wing.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD,
                                Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_STANDARD,
                                Maneuver.TURN_RIGHT_3_STANDARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "xWing",
                    },
                    "yWing":
                    {
                        name: "Y-Wing",
                        description: "A Y-Wing.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.BANK_LEFT_1_STANDARD, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_HARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_STANDARD,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_HARD, Maneuver.STRAIGHT_4_HARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "yWing",
                    },
                    "yt1300":
                    {
                        name: "YT-1300",
                        description: "A YT-1300.",
                        shipBase: ShipBase.LARGE,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_STANDARD,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.KOIOGRAN_TURN_3_HARD,
                                Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "yt1300",
                    },
                    "yt2400":
                    {
                        name: "YT-2400",
                        description: "A YT-2400.",
                        shipBase: ShipBase.LARGE,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD, Maneuver.BANK_LEFT_1_EASY,
                                Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                                Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                                Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_STANDARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD,
                                Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_STANDARD,
                                Maneuver.TURN_RIGHT_3_STANDARD, Maneuver.STRAIGHT_4_STANDARD,
                                Maneuver.KOIOGRAN_TURN_4_HARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK, ShipAction.BARREL_ROLL_LEFT,
                                ShipAction.BARREL_ROLL_RIGHT ],
                        value: "yt2400",
                    },
                    "yv666":
                    {
                        name: "YV-666",
                        description: "A YV-666.",
                        shipBase: ShipBase.LARGE,
                        primaryFiringArc: FiringArc.FORWARD_AND_FULL_AFT,
                        maneuvers: [ Maneuver.STATIONARY_0_HARD, Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_LEFT_2_HARD, Maneuver.BANK_LEFT_2_STANDARD,
                                Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_STANDARD, Maneuver.TURN_RIGHT_2_HARD,
                                Maneuver.TURN_LEFT_3_STANDARD, Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.STRAIGHT_4_STANDARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "yv666",
                    },
                    "z95Headhunter":
                    {
                        name: "Z-95 Headhunter",
                        description: "A Z-95 headhunter.",
                        shipBase: ShipBase.SMALL,
                        primaryFiringArc: FiringArc.FORWARD,
                        maneuvers: [ Maneuver.BANK_LEFT_1_STANDARD, Maneuver.STRAIGHT_1_EASY,
                                Maneuver.BANK_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_STANDARD,
                                Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY,
                                Maneuver.TURN_RIGHT_2_STANDARD, Maneuver.TURN_LEFT_3_STANDARD,
                                Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_STANDARD,
                                Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_STANDARD,
                                Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_STANDARD ],
                        shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
                        value: "z95Headhunter",
                    },
                },

                values: function()
                {
                    return Object.getOwnPropertyNames(Ship.properties);
                },
            };

            if (Object.freeze)
            {
                Object.freeze(Ship);
            };

            return Ship;
        });
