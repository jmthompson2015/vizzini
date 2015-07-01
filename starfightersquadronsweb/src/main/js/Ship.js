/*
 * Provides an enumeration of firing arcs for Starfighter Squadrons.
 */
var FiringArc =
{
    FORWARD: "forward",
    FORWARD_AND_AFT: "forwardAndAft",
    properties:
    {
        "forward":
        {
            isInFiringArc: function(bearing)
            {
                return (315 <= bearing) || (bearing <= 45);
            },
        },
        "forwardAndAft":
        {
            isInFiringArc: function(bearing)
            {
                return ((315 <= bearing) || (bearing <= 45))
                        || ((135 <= bearing) && (bearing <= 225));
            },
        },
    }
};

if (Object.freeze)
{
    Object.freeze(FiringArc)
};

/*
 * Provides an enumeration of ship bases for Starfighter Squadrons.
 */
var ShipBase =
{
    STANDARD: "standard",
    LARGE: "large",
    HUGE1: "huge1",
    HUGE2: "huge2",
    properties:
    {
        "standard":
        {
            width: 40,
            height: 40,
        },
        "large":
        {
            width: 80,
            height: 80,
        },
        "huge1":
        {
            width: 195,
            height: 80,
        },
        "huge2":
        {
            width: 225,
            height: 80,
        }
    }
};

ShipBase.computePolygon = function(shipBase, x, y, heading)
{
    var properties = ShipBase.properties[shipBase];

    var answer = new RectanglePath(properties.width, properties.height);

    answer.rotate(heading * Math.PI / 180);
    answer.translate(x, y);

    return answer;
}

if (Object.freeze)
{
    Object.freeze(ShipBase)
};

/*
 * Provides an enumeration of ships for Starfighter Squadrons.
 */
var Ship =
{
    A_WING: "aWing",
    B_WING: "bWing",
    E_WING: "eWing",
    FIRESPRAY_31: "firespray31",
    HWK_290: "hwk290",
    LAMBDA_CLASS_SHUTTLE: "lambdaClassShuttle",
    ROYAL_GUARD_TIE: "royalGuardTie",
    SABER_SQUADRON_TIE: "saberSquadronTie",
    TIE_ADVANCED: "tieAdvanced",
    TIE_BOMBER: "tieBomber",
    TIE_DEFENDER: "tieDefender",
    TIE_FIGHTER: "tieFighter",
    TIE_INTERCEPTOR: "tieInterceptor",
    TIE_PHANTOM: "tiePhantom",
    VT_49_DECIMATOR: "vt49Decimator",
    X_WING: "xWing",
    Y_WING: "yWing",
    YT_1300: "yt1300",
    YT_2400: "yt2400",
    Z_95_HEADHUNTER: "z95Headhunter",
    properties:
    {
        "aWing":
        {
            name: "A-Wing",
            description: "An A-Wing.",
            team: Team.REBEL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD,
                    Maneuver.TURN_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_EASY,
                    Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                    Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_EASY,
                    Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_EASY,
                    Maneuver.STRAIGHT_5_EASY, Maneuver.KOIOGRAN_TURN_5_HARD ],
            shipActions: [ ShipAction.EVADE, ShipAction.BOOST,
                    ShipAction.TARGET_LOCK, ShipAction.FOCUS ],
            value: "aWing",
        },
        "bWing":
        {
            name: "B-Wing",
            description: "A B-Wing.",
            team: Team.REBEL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.TURN_LEFT_1_HARD, Maneuver.BANK_LEFT_1_EASY,
                    Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY,
                    Maneuver.TURN_RIGHT_1_HARD, Maneuver.TURN_LEFT_2_STANDARD,
                    Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                    Maneuver.BANK_RIGHT_2_STANDARD,
                    Maneuver.TURN_RIGHT_2_STANDARD,
                    Maneuver.KOIOGRAN_TURN_2_HARD, Maneuver.BANK_LEFT_3_HARD,
                    Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_HARD,
                    Maneuver.STRAIGHT_4_HARD ],
            shipActions: [ ShipAction.TARGET_LOCK, ShipAction.FOCUS,
                    ShipAction.BARREL_ROLL ],
            value: "bWing",
        },
        "eWing":
        {
            name: "E-Wing",
            description: "An E-Wing.",
            team: Team.REBEL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.BANK_LEFT_1_STANDARD,
                    Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_STANDARD,
                    Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY,
                    Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY,
                    Maneuver.TURN_RIGHT_2_STANDARD,
                    Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.KOIOGRAN_TURN_3_HARD,
                    Maneuver.STRAIGHT_4_STANDARD,
                    Maneuver.KOIOGRAN_TURN_4_HARD, Maneuver.STRAIGHT_5_STANDARD ],
            shipActions: [ ShipAction.EVADE, ShipAction.TARGET_LOCK,
                    ShipAction.FOCUS, ShipAction.BARREL_ROLL ],
            value: "eWing",
        },
        "firespray31":
        {
            name: "Firespray-31",
            description: "A Firespray-31.",
            team: Team.IMPERIAL,
            shipBase: ShipBase.LARGE,
            primaryFiringArc: FiringArc.FORWARD_AND_AFT,
            maneuvers: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                    Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_LEFT_2_STANDARD,
                    Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                    Maneuver.BANK_RIGHT_2_STANDARD,
                    Maneuver.TURN_RIGHT_2_STANDARD,
                    Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD,
                    Maneuver.STRAIGHT_3_STANDARD,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.KOIOGRAN_TURN_3_HARD,
                    Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
            shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK,
                    ShipAction.EVADE ],
            value: "firespray31",
        },
        "hwk290":
        {
            name: "HWK-290",
            description: "An HWK-290.",
            team: Team.REBEL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                    Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_LEFT_2_STANDARD,
                    Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                    Maneuver.BANK_RIGHT_2_STANDARD,
                    Maneuver.TURN_RIGHT_2_STANDARD, Maneuver.BANK_LEFT_3_HARD,
                    Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_HARD,
                    Maneuver.STRAIGHT_4_HARD ],
            shipActions: [ ShipAction.TARGET_LOCK, ShipAction.FOCUS ],
            value: "hwk290",
        },
        "lambdaClassShuttle":
        {
            name: "Lambda-class Shuttle",
            description: "A Lambda-class shuttle.",
            team: Team.IMPERIAL,
            shipBase: ShipBase.LARGE,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.STATIONARY_0_HARD, Maneuver.BANK_LEFT_1_EASY,
                    Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_EASY,
                    Maneuver.TURN_LEFT_2_HARD, Maneuver.BANK_LEFT_2_STANDARD,
                    Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_STANDARD,
                    Maneuver.TURN_RIGHT_2_HARD, Maneuver.BANK_LEFT_3_HARD,
                    Maneuver.STRAIGHT_3_STANDARD, Maneuver.BANK_RIGHT_3_HARD ],
            shipActions: [ ShipAction.TARGET_LOCK, ShipAction.FOCUS ],
            value: "lambdaClassShuttle",
        },
        "royalGuardTie":
        {
            name: "Royal Guard TIE",
            description: "A Royal Guard TIE interceptor.",
            team: Team.IMPERIAL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD,
                    Maneuver.TURN_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_EASY,
                    Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                    Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_EASY,
                    Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_EASY,
                    Maneuver.STRAIGHT_5_STANDARD, Maneuver.KOIOGRAN_TURN_5_HARD ],
            shipActions: [ ShipAction.EVADE, ShipAction.BOOST,
                    ShipAction.FOCUS, ShipAction.BARREL_ROLL ],
            value: "royalGuardTie",
        },
        "saberSquadronTie":
        {
            name: "Saber Squadron TIE",
            description: "A Saber Squadron TIE interceptor.",
            team: Team.IMPERIAL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD,
                    Maneuver.TURN_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_EASY,
                    Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                    Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_EASY,
                    Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_EASY,
                    Maneuver.STRAIGHT_5_STANDARD, Maneuver.KOIOGRAN_TURN_5_HARD ],
            shipActions: [ ShipAction.EVADE, ShipAction.BOOST,
                    ShipAction.FOCUS, ShipAction.BARREL_ROLL ],
            value: "saberSquadronTie",
        },
        "tieAdvanced":
        {
            name: "TIE Advanced",
            description: "A TIE advanced.",
            team: Team.IMPERIAL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.BANK_RIGHT_1_EASY,
                    Maneuver.TURN_LEFT_2_STANDARD,
                    Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                    Maneuver.BANK_RIGHT_2_STANDARD,
                    Maneuver.TURN_RIGHT_2_STANDARD,
                    Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.STRAIGHT_4_STANDARD,
                    Maneuver.KOIOGRAN_TURN_4_HARD, Maneuver.STRAIGHT_5_STANDARD ],
            shipActions: [ ShipAction.EVADE, ShipAction.TARGET_LOCK,
                    ShipAction.FOCUS, ShipAction.BARREL_ROLL ],
            value: "tieAdvanced",
        },
        "tieBomber":
        {
            name: "TIE Bomber",
            description: "A TIE bomber.",
            team: Team.IMPERIAL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.BANK_LEFT_1_STANDARD,
                    Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_STANDARD,
                    Maneuver.TURN_LEFT_2_HARD, Maneuver.BANK_LEFT_2_EASY,
                    Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY,
                    Maneuver.TURN_RIGHT_2_HARD, Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_5_HARD ],
            shipActions: [ ShipAction.TARGET_LOCK, ShipAction.FOCUS,
                    ShipAction.BARREL_ROLL ],
            value: "tieBomber",
        },
        "tieDefender":
        {
            name: "TIE Defender",
            description: "A TIE defender.",
            team: Team.IMPERIAL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.TURN_LEFT_1_HARD,
                    Maneuver.BANK_LEFT_1_STANDARD,
                    Maneuver.BANK_RIGHT_1_STANDARD, Maneuver.TURN_RIGHT_1_HARD,
                    Maneuver.TURN_LEFT_2_HARD, Maneuver.BANK_LEFT_2_STANDARD,
                    Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_STANDARD,
                    Maneuver.TURN_RIGHT_2_HARD, Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD, Maneuver.STRAIGHT_4_EASY,
                    Maneuver.KOIOGRAN_TURN_4_STANDARD, Maneuver.STRAIGHT_5_EASY ],
            shipActions: [ ShipAction.TARGET_LOCK, ShipAction.FOCUS,
                    ShipAction.BARREL_ROLL ],
            value: "tieDefender",
        },
        "tieFighter":
        {
            name: "TIE Fighter",
            description: "A TIE fighter.",
            team: Team.IMPERIAL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD,
                    Maneuver.TURN_RIGHT_1_STANDARD,
                    Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY,
                    Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY,
                    Maneuver.TURN_RIGHT_2_STANDARD,
                    Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.KOIOGRAN_TURN_3_HARD,
                    Maneuver.STRAIGHT_4_STANDARD,
                    Maneuver.KOIOGRAN_TURN_4_HARD, Maneuver.STRAIGHT_5_STANDARD ],
            shipActions: [ ShipAction.FOCUS, ShipAction.BARREL_ROLL,
                    ShipAction.EVADE ],
            value: "tieFighter",
        },
        "tieInterceptor":
        {
            name: "TIE Interceptor",
            description: "A TIE interceptor.",
            team: Team.IMPERIAL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD,
                    Maneuver.TURN_RIGHT_1_STANDARD, Maneuver.TURN_LEFT_2_EASY,
                    Maneuver.BANK_LEFT_2_EASY, Maneuver.STRAIGHT_2_EASY,
                    Maneuver.BANK_RIGHT_2_EASY, Maneuver.TURN_RIGHT_2_EASY,
                    Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_EASY,
                    Maneuver.STRAIGHT_5_STANDARD, Maneuver.KOIOGRAN_TURN_5_HARD ],
            shipActions: [ ShipAction.EVADE, ShipAction.BOOST,
                    ShipAction.FOCUS, ShipAction.BARREL_ROLL ],
            value: "tieInterceptor",
        },
        "tiePhantom":
        {
            name: "TIE Phantom",
            description: "A TIE phantom.",
            team: Team.IMPERIAL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD,
                    Maneuver.TURN_RIGHT_1_STANDARD,
                    Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY,
                    Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY,
                    Maneuver.TURN_RIGHT_2_STANDARD,
                    Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.KOIOGRAN_TURN_3_HARD,
                    Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
            shipActions: [ ShipAction.EVADE, ShipAction.CLOAK,
                    ShipAction.FOCUS, ShipAction.BARREL_ROLL ],
            value: "tiePhantom",
        },
        "vt49Decimator":
        {
            name: "VT-49 Decimator",
            description: "A VT-49 Decimator.",
            team: Team.IMPERIAL,
            shipBase: ShipBase.LARGE,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.BANK_LEFT_1_STANDARD,
                    Maneuver.STRAIGHT_1_STANDARD,
                    Maneuver.BANK_RIGHT_1_STANDARD,
                    Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY,
                    Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY,
                    Maneuver.TURN_RIGHT_2_STANDARD,
                    Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD, Maneuver.STRAIGHT_3_EASY,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.STRAIGHT_4_STANDARD ],
            shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
            value: "vt49Decimator",
        },
        "xWing":
        {
            name: "X-Wing",
            description: "An X-Wing.",
            team: Team.REBEL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                    Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_LEFT_2_STANDARD,
                    Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                    Maneuver.BANK_RIGHT_2_STANDARD,
                    Maneuver.TURN_RIGHT_2_STANDARD,
                    Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD,
                    Maneuver.STRAIGHT_3_STANDARD,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
            shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK ],
            value: "xWing",
        },
        "yWing":
        {
            name: "Y-Wing",
            description: "A Y-Wing.",
            team: Team.REBEL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.BANK_LEFT_1_STANDARD,
                    Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_STANDARD,
                    Maneuver.TURN_LEFT_2_STANDARD,
                    Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                    Maneuver.BANK_RIGHT_2_STANDARD,
                    Maneuver.TURN_RIGHT_2_STANDARD, Maneuver.TURN_LEFT_3_HARD,
                    Maneuver.BANK_LEFT_3_STANDARD,
                    Maneuver.STRAIGHT_3_STANDARD,
                    Maneuver.BANK_RIGHT_3_STANDARD, Maneuver.TURN_RIGHT_3_HARD,
                    Maneuver.STRAIGHT_4_HARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
            shipActions: [ ShipAction.TARGET_LOCK, ShipAction.FOCUS ],
            value: "yWing",
        },
        "yt1300":
        {
            name: "YT-1300",
            description: "A YT-1300.",
            team: Team.REBEL,
            shipBase: ShipBase.LARGE,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD,
                    Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                    Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                    Maneuver.TURN_LEFT_2_STANDARD,
                    Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                    Maneuver.BANK_RIGHT_2_STANDARD,
                    Maneuver.TURN_RIGHT_2_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD,
                    Maneuver.STRAIGHT_3_STANDARD,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.KOIOGRAN_TURN_3_HARD,
                    Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
            shipActions: [ ShipAction.TARGET_LOCK, ShipAction.FOCUS ],
            value: "yt1300",
        },
        "yt2400":
        {
            name: "YT-2400",
            description: "A YT-2400.",
            team: Team.REBEL,
            shipBase: ShipBase.LARGE,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.TURN_LEFT_1_STANDARD,
                    Maneuver.BANK_LEFT_1_EASY, Maneuver.STRAIGHT_1_EASY,
                    Maneuver.BANK_RIGHT_1_EASY, Maneuver.TURN_RIGHT_1_STANDARD,
                    Maneuver.TURN_LEFT_2_STANDARD,
                    Maneuver.BANK_LEFT_2_STANDARD, Maneuver.STRAIGHT_2_EASY,
                    Maneuver.BANK_RIGHT_2_STANDARD,
                    Maneuver.TURN_RIGHT_2_STANDARD,
                    Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD,
                    Maneuver.STRAIGHT_3_STANDARD,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.STRAIGHT_4_STANDARD, Maneuver.KOIOGRAN_TURN_4_HARD ],
            shipActions: [ ShipAction.FOCUS, ShipAction.TARGET_LOCK,
                    ShipAction.BARREL_ROLL ],
            value: "yt2400",
        },
        "z95Headhunter":
        {
            name: "Z-95 Headhunter",
            description: "A Z-95 headhunter.",
            team: Team.REBEL,
            shipBase: ShipBase.STANDARD,
            primaryFiringArc: FiringArc.FORWARD,
            maneuvers: [ Maneuver.BANK_LEFT_1_STANDARD,
                    Maneuver.STRAIGHT_1_EASY, Maneuver.BANK_RIGHT_1_STANDARD,
                    Maneuver.TURN_LEFT_2_STANDARD, Maneuver.BANK_LEFT_2_EASY,
                    Maneuver.STRAIGHT_2_EASY, Maneuver.BANK_RIGHT_2_EASY,
                    Maneuver.TURN_RIGHT_2_STANDARD,
                    Maneuver.TURN_LEFT_3_STANDARD,
                    Maneuver.BANK_LEFT_3_STANDARD,
                    Maneuver.STRAIGHT_3_STANDARD,
                    Maneuver.BANK_RIGHT_3_STANDARD,
                    Maneuver.TURN_RIGHT_3_STANDARD,
                    Maneuver.KOIOGRAN_TURN_3_HARD, Maneuver.STRAIGHT_4_STANDARD ],
            shipActions: [ ShipAction.TARGET_LOCK, ShipAction.FOCUS ],
            value: "z95Headhunter",
        },
    },

    values: function()
    {
        return Object.getOwnPropertyNames(Ship.properties);
    },

    valuesByTeam: function(team)
    {
        var answer = [];
        var values = this.values();
        var properties = this.properties;

        for (var i = 0; i < values.length; i++)
        {
            var value = values[i];

            if (properties[value].team === team)
            {
                answer[answer.length] = value;
            }
        }

        return answer;
    },
};

if (Object.freeze)
{
    Object.freeze(Ship)
};
