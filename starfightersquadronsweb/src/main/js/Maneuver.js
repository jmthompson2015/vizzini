// require("Bearing");
// require("Difficulty");

/*
 * Provides an enumeration of maneuvers for Starfighter Squadrons. <p> Small
 * ship base is 40mm x 40mm. </p> <p> Bearing straight, speed one maneuver is
 * 40mm long. Other straight maneuvers are multiples of this. </p>
 */
var Maneuver =
{
    // Bank.
    BANK_LEFT_1_EASY: "bankLeft1Easy",
    BANK_LEFT_1_STANDARD: "bankLeft1Standard",
    BANK_LEFT_2_EASY: "bankLeft2Easy",
    BANK_LEFT_2_STANDARD: "bankLeft2Standard",
    BANK_LEFT_3_HARD: "bankLeft3Hard",
    BANK_LEFT_3_STANDARD: "bankLeft3Standard",
    BANK_RIGHT_1_EASY: "bankRight1Easy",
    BANK_RIGHT_1_STANDARD: "bankRight1Standard",
    BANK_RIGHT_2_EASY: "bankRight2Easy",
    BANK_RIGHT_2_STANDARD: "bankRight2Standard",
    BANK_RIGHT_3_HARD: "bankRight3Hard",
    BANK_RIGHT_3_STANDARD: "bankRight3Standard",

    // Koiogran turn.
    KOIOGRAN_TURN_2_HARD: "koiogranTurn2Hard",
    KOIOGRAN_TURN_3_HARD: "koiogranTurn3Hard",
    KOIOGRAN_TURN_4_HARD: "koiogranTurn4Hard",
    KOIOGRAN_TURN_4_STANDARD: "koiogranTurn4Standard",
    KOIOGRAN_TURN_5_HARD: "koiogranTurn5Hard",

    // Segnor's loop.
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

    // Turn.
    TURN_LEFT_1_HARD: "turnLeft1Hard",
    TURN_LEFT_1_STANDARD: "turnLeft1Standard",
    TURN_LEFT_2_EASY: "turnLeft2Easy",
    TURN_LEFT_2_HARD: "turnLeft2Hard",
    TURN_LEFT_2_STANDARD: "turnLeft2Standard",
    TURN_LEFT_3_HARD: "turnLeft3Hard",
    TURN_LEFT_3_STANDARD: "turnLeft3Standard",
    TURN_RIGHT_1_HARD: "turnRight1Hard",
    TURN_RIGHT_1_STANDARD: "turnRight1Standard",
    TURN_RIGHT_2_EASY: "turnRight2Easy",
    TURN_RIGHT_2_HARD: "turnRight2Hard",
    TURN_RIGHT_2_STANDARD: "turnRight2Standard",
    TURN_RIGHT_3_HARD: "turnRight3Hard",
    TURN_RIGHT_3_STANDARD: "turnRight3Standard",
    properties:
    {
        "bankLeft1Easy":
        {
            bearing: Bearing.BANK_LEFT,
            speed: 1,
            difficulty: Difficulty.EASY,
            radius: 82.6,
            value: "bankLeft1Easy",
        },
        "bankLeft1Standard":
        {
            bearing: Bearing.BANK_LEFT,
            speed: 1,
            difficulty: Difficulty.STANDARD,
            radius: 82.6,
            value: "bankLeft1Standard",
        },
        "bankLeft2Easy":
        {
            bearing: Bearing.BANK_LEFT,
            speed: 2,
            difficulty: Difficulty.EASY,
            radius: 127.0,
            value: "bankLeft2Easy",
        },
        "bankLeft2Standard":
        {
            bearing: Bearing.BANK_LEFT,
            speed: 2,
            difficulty: Difficulty.STANDARD,
            radius: 127.0,
            value: "bankLeft2Standard",
        },
        "bankLeft3Hard":
        {
            bearing: Bearing.BANK_LEFT,
            speed: 3,
            difficulty: Difficulty.HARD,
            radius: 177.8,
            value: "bankLeft3Hard",
        },
        "bankLeft3Standard":
        {
            bearing: Bearing.BANK_LEFT,
            speed: 3,
            difficulty: Difficulty.STANDARD,
            radius: 177.8,
            value: "bankLeft3Standard",
        },
        "bankRight1Easy":
        {
            bearing: Bearing.BANK_RIGHT,
            speed: 1,
            difficulty: Difficulty.EASY,
            radius: 82.6,
            value: "bankRight1Easy",
        },
        "bankRight1Standard":
        {
            bearing: Bearing.BANK_RIGHT,
            speed: 1,
            difficulty: Difficulty.STANDARD,
            radius: 82.6,
            value: "bankRight1Standard",
        },
        "bankRight2Easy":
        {
            bearing: Bearing.BANK_RIGHT,
            speed: 2,
            difficulty: Difficulty.EASY,
            radius: 127.0,
            value: "bankRight2Easy",
        },
        "bankRight2Standard":
        {
            bearing: Bearing.BANK_RIGHT,
            speed: 2,
            difficulty: Difficulty.STANDARD,
            radius: 127.0,
            value: "bankRight2Standard",
        },
        "bankRight3Hard":
        {
            bearing: Bearing.BANK_RIGHT,
            speed: 3,
            difficulty: Difficulty.HARD,
            radius: 177.8,
            value: "bankRight3Hard",
        },
        "bankRight3Standard":
        {
            bearing: Bearing.BANK_RIGHT,
            speed: 3,
            difficulty: Difficulty.STANDARD,
            radius: 177.8,
            value: "bankRight3Standard",
        },
        "koiogranTurn2Hard":
        {
            bearing: Bearing.KOIOGRAN_TURN,
            speed: 2,
            difficulty: Difficulty.HARD,
            value: "koiogranTurn2Hard",
        },
        "koiogranTurn3Hard":
        {
            bearing: Bearing.KOIOGRAN_TURN,
            speed: 3,
            difficulty: Difficulty.HARD,
            value: "koiogranTurn3Hard",
        },
        "koiogranTurn4Hard":
        {
            bearing: Bearing.KOIOGRAN_TURN,
            speed: 4,
            difficulty: Difficulty.HARD,
            value: "koiogranTurn4Hard",
        },
        "koiogranTurn4Standard":
        {
            bearing: Bearing.KOIOGRAN_TURN,
            speed: 4,
            difficulty: Difficulty.STANDARD,
            value: "koiogranTurn4Standard",
        },
        "koiogranTurn5Hard":
        {
            bearing: Bearing.KOIOGRAN_TURN,
            speed: 5,
            difficulty: Difficulty.HARD,
            value: "koiogranTurn5Hard",
        },
        "segnorsLoopLeft3Hard":
        {
            bearing: Bearing.SEGNORS_LOOP_LEFT,
            speed: 3,
            difficulty: Difficulty.HARD,
            radius: 177.8,
            value: "segnorsLoopLeft3Hard",
        },
        "segnorsLoopRight3Hard":
        {
            bearing: Bearing.SEGNORS_LOOP_RIGHT,
            speed: 3,
            difficulty: Difficulty.HARD,
            radius: 177.8,
            value: "segnorsLoopRight3Hard",
        },
        "stationary0Hard":
        {
            speed: 0,
            difficulty: Difficulty.HARD,
            value: "stationary0Hard",
        },
        "straight1Easy":
        {
            bearing: Bearing.STRAIGHT,
            speed: 1,
            difficulty: Difficulty.EASY,
            value: "straight1Easy",
        },
        "straight1Standard":
        {
            bearing: Bearing.STRAIGHT,
            speed: 1,
            difficulty: Difficulty.STANDARD,
            value: "straight1Standard",
        },
        "straight2Easy":
        {
            bearing: Bearing.STRAIGHT,
            speed: 2,
            difficulty: Difficulty.EASY,
            value: "straight2Easy",
        },
        "straight2Standard":
        {
            bearing: Bearing.STRAIGHT,
            speed: 2,
            difficulty: Difficulty.STANDARD,
            value: "straight2Standard",
        },
        "straight3Easy":
        {
            bearing: Bearing.STRAIGHT,
            speed: 3,
            difficulty: Difficulty.EASY,
            value: "straight3Easy",
        },
        "straight3Standard":
        {
            bearing: Bearing.STRAIGHT,
            speed: 3,
            difficulty: Difficulty.STANDARD,
            value: "straight3Standard",
        },
        "straight4Easy":
        {
            bearing: Bearing.STRAIGHT,
            speed: 4,
            difficulty: Difficulty.EASY,
            value: "straight4Easy",
        },
        "straight4Hard":
        {
            bearing: Bearing.STRAIGHT,
            speed: 4,
            difficulty: Difficulty.HARD,
            value: "straight4Hard",
        },
        "straight4Standard":
        {
            bearing: Bearing.STRAIGHT,
            speed: 4,
            difficulty: Difficulty.STANDARD,
            value: "straight4Standard",
        },
        "straight5Easy":
        {
            bearing: Bearing.STRAIGHT,
            speed: 5,
            difficulty: Difficulty.EASY,
            value: "straight5Easy",
        },
        "straight5Standard":
        {
            bearing: Bearing.STRAIGHT,
            speed: 5,
            difficulty: Difficulty.STANDARD,
            value: "straight5Standard",
        },
        "turnLeft1Hard":
        {
            bearing: Bearing.TURN_LEFT,
            speed: 1,
            difficulty: Difficulty.HARD,
            radius: 34.3,
            value: "turnLeft1Hard",
        },
        "turnLeft1Standard":
        {
            bearing: Bearing.TURN_LEFT,
            speed: 1,
            difficulty: Difficulty.STANDARD,
            radius: 34.3,
            value: "turnLeft1Standard",
        },
        "turnLeft2Easy":
        {
            bearing: Bearing.TURN_LEFT,
            speed: 2,
            difficulty: Difficulty.EASY,
            radius: 62.2,
            value: "turnLeft2Easy",
        },
        "turnLeft2Hard":
        {
            bearing: Bearing.TURN_LEFT,
            speed: 2,
            difficulty: Difficulty.HARD,
            radius: 62.2,
            value: "turnLeft2Hard",
        },
        "turnLeft2Standard":
        {
            bearing: Bearing.TURN_LEFT,
            speed: 2,
            difficulty: Difficulty.STANDARD,
            radius: 62.2,
            value: "turnLeft2Standard",
        },
        "turnLeft3Hard":
        {
            bearing: Bearing.TURN_LEFT,
            speed: 3,
            difficulty: Difficulty.HARD,
            radius: 88.9,
            value: "turnLeft3Hard",
        },
        "turnLeft3Standard":
        {
            bearing: Bearing.TURN_LEFT,
            speed: 3,
            difficulty: Difficulty.STANDARD,
            radius: 88.9,
            value: "turnLeft3Standard",
        },
        "turnRight1Hard":
        {
            bearing: Bearing.TURN_RIGHT,
            speed: 1,
            difficulty: Difficulty.HARD,
            radius: 34.3,
            value: "turnRight1Hard",
        },
        "turnRight1Standard":
        {
            bearing: Bearing.TURN_RIGHT,
            speed: 1,
            difficulty: Difficulty.STANDARD,
            radius: 34.3,
            value: "turnRight1Standard",
        },
        "turnRight2Easy":
        {
            bearing: Bearing.TURN_RIGHT,
            speed: 2,
            difficulty: Difficulty.EASY,
            radius: 62.2,
            value: "turnRight2Easy",
        },
        "turnRight2Hard":
        {
            bearing: Bearing.TURN_RIGHT,
            speed: 2,
            difficulty: Difficulty.HARD,
            radius: 62.2,
            value: "turnRight2Hard",
        },
        "turnRight2Standard":
        {
            bearing: Bearing.TURN_RIGHT,
            speed: 2,
            difficulty: Difficulty.STANDARD,
            radius: 62.2,
            value: "turnRight2Standard",
        },
        "turnRight3Hard":
        {
            bearing: Bearing.TURN_RIGHT,
            speed: 3,
            difficulty: Difficulty.HARD,
            radius: 88.9,
            value: "turnRight3Hard",
        },
        "turnRight3Standard":
        {
            bearing: Bearing.TURN_RIGHT,
            speed: 3,
            difficulty: Difficulty.STANDARD,
            radius: 88.9,
            value: "turnRight3Standard",
        },
    },

    values: function()
    {
        return Object.getOwnPropertyNames(Maneuver.properties);
    },
};

/*
 * @param fromPosition Position.
 * 
 * @param shipBase Ship base.
 * 
 * @return the polygon representing the ship base at the given position. The first point is port-forward, the second
 * point is starboard-forward.
 */
Maneuver.computeFromPolygon = function(fromPosition, shipBase)
{
    return ShipBase.computePolygon(shipBase, fromPosition.getX(), fromPosition.getY(), fromPosition.getHeading());
}

/*
 * @param fromPosition Position.
 * 
 * @param shipBase Ship base.
 * 
 * @return the polygon representing the ship base at the given position. The first point is port-forward, the second
 * point is starboard-forward.
 */
Maneuver.computeToPolygon = function(maneuver, fromPosition, shipBase)
{
    InputValidator.validateNotNull("fromPosition", fromPosition);
    InputValidator.validateNotNull("shipBase", shipBase);

    var toPosition = Maneuver.computeToPosition(maneuver, fromPosition, shipBase);

    InputValidator.validateNotNull("toPosition", toPosition);

    return ShipBase.computePolygon(shipBase, toPosition.getX(), toPosition.getY(), toPosition.getHeading());
}

/*
 * @param fromPosition From position.
 * 
 * @param shipBase Ship base.
 * 
 * @return the position after executing this maneuver.
 */
Maneuver.computePath = function(maneuver, fromPosition, shipBase)
{
    InputValidator.validateNotNull("fromPosition", fromPosition);
    InputValidator.validateNotNull("shipBase", shipBase);
    var bearing = Maneuver.properties[maneuver].bearing;
    var speed = Maneuver.properties[maneuver].speed;

    var answer = new Path();

    // Initial point.
    answer.add(0.0, 0.0);

    // First segment: move base center.
    var baseSize = ShipBase.properties[shipBase].height / 2.0;
    var lastX;
    var lastY;

    if (maneuver != Maneuver.STATIONARY_0_HARD)
    {
        var x = baseSize;
        answer.add(x, 0.0);
        lastX = x;
        lastY = 0.0;
    }

    // Middle segments: follow the arc.
    switch (bearing)
    {
    case Bearing.STRAIGHT:
    case Bearing.KOIOGRAN_TURN:
        var x = lastX;
        for (var i = 0; i < speed; i++)
        {
            x += 40;
            answer.add(x, 0.0);
        }
        lastX = x;
        break;
    case Bearing.BANK_LEFT:
    case Bearing.BANK_RIGHT:
    case Bearing.SEGNORS_LOOP_LEFT:
    case Bearing.SEGNORS_LOOP_RIGHT:
        var last = Maneuver.addSegments(maneuver, answer, lastX, 45, 3 + speed);
        lastX = last.x;
        lastY = last.y;
        break;
    case Bearing.TURN_LEFT:
    case Bearing.TURN_RIGHT:
        last = Maneuver.addSegments(maneuver, answer, lastX, 90, 5 + speed);
        lastX = last.x;
        lastY = last.y;
        break;
    }

    // Last segment: move base center.
    switch (bearing)
    {
    case Bearing.STRAIGHT:
    case Bearing.KOIOGRAN_TURN:
        var x = baseSize + lastX;
        answer.add(x, 0.0);
        break;
    case Bearing.BANK_LEFT:
    case Bearing.BANK_RIGHT:
    case Bearing.SEGNORS_LOOP_LEFT:
    case Bearing.SEGNORS_LOOP_RIGHT:
        var factor = (bearing === Bearing.BANK_RIGHT || bearing === Bearing.SEGNORS_LOOP_RIGHT ? 1.0 : -1.0);
        x = (baseSize * Math.cos(Math.PI / 4.0)) + lastX;
        var y = (factor * baseSize * Math.cos(Math.PI / 4.0)) + lastY;
        answer.add(x, y);
        break;
    case Bearing.TURN_LEFT:
    case Bearing.TURN_RIGHT:
        factor = (bearing === Bearing.TURN_RIGHT ? 1.0 : -1.0);
        y = (factor * baseSize) + lastY;
        answer.add(lastX, y);
        break;
    }

    // Rotate and translate to fromPosition.
    var angle = fromPosition.getHeading() * Math.PI / 180;
    answer.rotate(angle);
    answer.translate(fromPosition.getX(), fromPosition.getY());

    return answer;
}

/*
 * @param fromPosition From position.
 * 
 * @param shipBase Ship base.
 * 
 * @return the position after executing this maneuver.
 */
Maneuver.computeToPosition = function(maneuver, fromPosition, shipBase)
{
    InputValidator.validateNotNull("fromPosition", fromPosition);
    InputValidator.validateNotNull("shipBase", shipBase);

    if (maneuver === Maneuver.STATIONARY_0_HARD) { return fromPosition; }

    var dx = -10000; // Integer.MIN_VALUE
    var dy = 10000; // Integer.MAX_VALUE
    var baseSize = ShipBase.properties[shipBase].height / 2;
    var bearing = Maneuver.properties[maneuver].bearing;
    var speed = Maneuver.properties[maneuver].speed;
    var headingChange;
    if (bearing)
    {
        headingChange = Bearing.properties[bearing].headingChange;
    }
    var radius = Maneuver.properties[maneuver].radius;

    if ((bearing === Bearing.STRAIGHT) || (bearing === Bearing.KOIOGRAN_TURN))
    {
        dx = (2 * baseSize) + (40 * speed);
        dy = 0;
    }
    else if ((bearing && Bearing.properties[bearing].isBank) || bearing === Bearing.SEGNORS_LOOP_LEFT
            || bearing === Bearing.SEGNORS_LOOP_RIGHT)
    {
        // Half base.
        var x1 = baseSize;
        var y1 = 0.0;

        // Curve.
        var factor = (bearing === Bearing.BANK_RIGHT || bearing === Bearing.SEGNORS_LOOP_RIGHT ? 1.0 : -1.0);
        var angle = 45.0 * Math.PI / 180.0;
        var x2 = radius * Math.cos(angle);
        var y2 = factor * radius * (1.0 - (Math.sin(angle) * factor));

        // Half base.
        var x3 = baseSize * Math.cos(angle);
        var y3 = baseSize * Math.sin(angle);

        dx = x1 + x2 + x3;
        dy = y1 + y2 + y3;
    }
    else if (bearing && Bearing.properties[bearing].isTurn)
    {
        // Half base.
        var x1 = baseSize;
        var y1 = 0.0;

        // Curve.
        var factor = (bearing === Bearing.TURN_RIGHT ? 1.0 : -1.0);
        var angle = headingChange * Math.PI / 180.0;
        var x2 = radius;
        var y2 = factor * radius;

        // Half base.
        var x3 = baseSize * Math.cos(angle);
        var y3 = baseSize * Math.sin(angle);

        dx = x1 + x2 + x3;
        dy = y1 + y2 + y3;
    }
    else
    {
        throw "Unknown Maneuver: " + maneuver;
    }

    return Maneuver.createPosition(fromPosition, dx, dy, headingChange);
};

/*
 * @param path Path.
 * 
 * @param lastX Last X coordinate.
 * 
 * @param heading Heading.
 * 
 * @param segmentCount Number of segments.
 * 
 * @return a point containing the new last coordinates.
 */
Maneuver.addSegments = function(maneuver, path, lastX, heading, segmentCount)
{
    InputValidator.validateNotNull("path", path);
    var bearing = Maneuver.properties[maneuver].bearing;
    var radius = Maneuver.properties[maneuver].radius;

    var factor = ((bearing === Bearing.BANK_RIGHT)
            || (bearing === Bearing.TURN_RIGHT || bearing === Bearing.SEGNORS_LOOP_RIGHT) ? 1.0 : -1.0);
    var deltaAngle = (heading * Math.PI / 180) / segmentCount;

    var myLastX = lastX;
    var myLastY = 0.0;

    for (var i = 1; i <= segmentCount; i++)
    {
        var angle = deltaAngle * i;
        var x = lastX + (radius * Math.sin(angle));
        var y = factor * radius * (1.0 - Math.cos(angle));
        path.add(x, y);
        myLastX = x;
        myLastY = y;
    }

    var answer = {};
    answer.x = Math.round(myLastX);
    answer.y = Math.round(myLastY);
    return answer;
}

/*
 * @param fromPosition From position.
 * 
 * @param dx Delta X.
 * 
 * @param dy Delta Y.
 * 
 * @param headingChange Delta heading.
 * 
 * @return a new position.
 */
Maneuver.createPosition = function(fromPosition, dx, dy, headingChange)
{
    var x0 = fromPosition.getX();
    var y0 = fromPosition.getY();
    var angle = fromPosition.getHeading() * Math.PI / 180;

    var x = Math.round((x0 + (dx * Math.cos(angle))) - (dy * Math.sin(angle)));
    var y = Math.round((y0 + (dx * Math.sin(angle))) + (dy * Math.cos(angle)));
    var heading = fromPosition.getHeading() + headingChange;

    var answer;

    if (Position.isPointInPlayArea(x, y))
    {
        answer = new Position(x, y, heading);
    }

    return answer;
};

/*
 * @param bearing Bearing.
 * 
 * @param speed Speed.
 * 
 * @param difficulty Difficulty.
 * 
 * @return the maneuver with the given characteristics.
 */
Maneuver.find = function(bearing, speed, difficulty)
{
    InputValidator.validateNotNull("difficulty", difficulty);

    var answer;

    var values = Maneuver.values();

    for (var i = 0; i < values.length; i++)
    {
        var maneuver = values[i];
        var properties = Maneuver.properties[maneuver];

        if ((properties.bearing === bearing) && (properties.speed === speed) && (properties.difficulty === difficulty))
        {
            answer = maneuver;
            break;
        }
    }

    return answer;
}

if (Object.freeze)
{
    Object.freeze(Maneuver);
};
