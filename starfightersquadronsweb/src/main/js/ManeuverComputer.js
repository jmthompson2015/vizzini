/*
 * Small ship base is 40mm x 40mm.
 * <p>Bearing straight, speed one maneuver is 40mm long. Other straight maneuvers are multiples of this.</p>
 */
define([ "Bearing", "Maneuver", "Path", "Position", "RectanglePath", "ShipBase" ], function(Bearing, Maneuver, Path,
        Position, RectanglePath, ShipBase)
{
    "use strict";
    var ManeuverComputer = {};

    ManeuverComputer.computeFromPolygon = function(fromPosition, shipBase)
    {
        return ManeuverComputer.computePolygon(shipBase, fromPosition.x(), fromPosition.y(), fromPosition.heading());
    };

    ManeuverComputer.computePolygon = function(shipBase, x, y, heading)
    {
        var properties = ShipBase.properties[shipBase];

        var answer = new RectanglePath(properties.width, properties.height);

        answer.rotate(heading * Math.PI / 180);
        answer.translate(x, y);

        return answer;
    };

    ManeuverComputer.computeToPolygon = function(maneuver, fromPosition, shipBase)
    {
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("shipBase", shipBase);

        var toPosition = ManeuverComputer.computeToPosition(maneuver, fromPosition, shipBase);

        var answer;

        if (toPosition)
        {
            answer = ManeuverComputer.computePolygon(shipBase, toPosition.x(), toPosition.y(), toPosition.heading());
        }

        return answer;
    };

    ManeuverComputer.computePath = function(maneuverKey, fromPosition, shipBase)
    {
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("shipBase", shipBase);
        var bearingKey = Maneuver.properties[maneuverKey].bearingKey;
        var speed = Maneuver.properties[maneuverKey].speed;

        var answer = new Path();

        // Initial point.
        answer.add(0.0, 0.0);

        // First segment: move base center.
        var baseSize = ShipBase.properties[shipBase].height / 2.0;
        var lastX;
        var lastY;
        var x, y, factor;

        if (bearingKey === Bearing.BARREL_ROLL_LEFT || bearingKey === Bearing.BARREL_ROLL_RIGHT)
        {
            factor = (bearingKey === Bearing.BARREL_ROLL_RIGHT ? 1.0 : -1.0);
            y = factor * baseSize;
            answer.add(0.0, y);
            lastX = 0.0;
            lastY = y;
        }
        else if (maneuverKey !== Maneuver.STATIONARY_0_HARD)
        {
            x = baseSize;
            answer.add(x, 0.0);
            lastX = x;
            lastY = 0.0;
        }

        // Middle segments: follow the arc.
        switch (bearingKey)
        {
        case Bearing.STRAIGHT:
        case Bearing.KOIOGRAN_TURN:
            x = lastX;
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
            var last = ManeuverComputer.addSegments(maneuverKey, answer, lastX, 45, 3 + speed);
            lastX = last.x;
            lastY = last.y;
            break;
        case Bearing.TURN_LEFT:
        case Bearing.TURN_RIGHT:
            last = ManeuverComputer.addSegments(maneuverKey, answer, lastX, 90, 5 + speed);
            lastX = last.x;
            lastY = last.y;
            break;
        case Bearing.BARREL_ROLL_LEFT:
        case Bearing.BARREL_ROLL_RIGHT:
            factor = (bearingKey === Bearing.BARREL_ROLL_RIGHT ? 1.0 : -1.0);
            y = lastY;
            for (var j = 0; j < speed; j++)
            {
                y += factor * 40;
                answer.add(0.0, y);
            }
            lastY = y;
            break;
        }

        // Last segment: move base center.
        switch (bearingKey)
        {
        case Bearing.STRAIGHT:
        case Bearing.KOIOGRAN_TURN:
            x = baseSize + lastX;
            answer.add(x, 0.0);
            break;
        case Bearing.BANK_LEFT:
        case Bearing.BANK_RIGHT:
        case Bearing.SEGNORS_LOOP_LEFT:
        case Bearing.SEGNORS_LOOP_RIGHT:
            factor = (bearingKey === Bearing.BANK_RIGHT || bearingKey === Bearing.SEGNORS_LOOP_RIGHT ? 1.0 : -1.0);
            x = (baseSize * Math.cos(Math.PI / 4.0)) + lastX;
            y = (factor * baseSize * Math.cos(Math.PI / 4.0)) + lastY;
            answer.add(x, y);
            break;
        case Bearing.TURN_LEFT:
        case Bearing.TURN_RIGHT:
            factor = (bearingKey === Bearing.TURN_RIGHT ? 1.0 : -1.0);
            y = (factor * baseSize) + lastY;
            answer.add(lastX, y);
            break;
        case Bearing.BARREL_ROLL_LEFT:
        case Bearing.BARREL_ROLL_RIGHT:
            factor = (bearingKey === Bearing.BARREL_ROLL_RIGHT ? 1.0 : -1.0);
            y = factor * baseSize + lastY;
            answer.add(0.0, y);
            break;
        }

        // Rotate and translate to fromPosition.
        var angle = fromPosition.heading() * Math.PI / 180;
        answer.rotate(angle);
        answer.translate(fromPosition.x(), fromPosition.y());

        return answer;
    };

    ManeuverComputer.computeToPosition = function(maneuverKey, fromPosition, shipBase)
    {
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("shipBase", shipBase);

        if (maneuverKey === Maneuver.STATIONARY_0_HARD) { return fromPosition; }

        var dx = -10000; // Integer.MIN_VALUE
        var dy = 10000; // Integer.MAX_VALUE
        var baseSize = ShipBase.properties[shipBase].height / 2;
        var maneuver = Maneuver.properties[maneuverKey];
        var bearingKey = maneuver.bearingKey;
        var speed = maneuver.speed;
        var headingChange;
        if (bearingKey)
        {
            headingChange = maneuver.bearing.headingChange;
        }
        var radius = Maneuver.properties[maneuverKey].radius;

        var x1, x2, x3;
        var y1, y2, y3;
        var factor, angle;

        if ((bearingKey === Bearing.STRAIGHT) || (bearingKey === Bearing.KOIOGRAN_TURN))
        {
            dx = (2 * baseSize) + (40 * speed);
            dy = 0;
        }
        else if (bearingKey && maneuver.bearing.isBank)
        {
            // Half base.
            x1 = baseSize;
            y1 = 0.0;

            // Curve.
            factor = (bearingKey === Bearing.BANK_RIGHT ? 1.0 : -1.0);
            angle = headingChange * Math.PI / 180.0;
            x2 = radius * Math.cos(angle);
            y2 = factor * radius * (1.0 - (Math.sin(angle) * factor));

            // Half base.
            x3 = baseSize * Math.cos(angle);
            y3 = baseSize * Math.sin(angle);

            dx = x1 + x2 + x3;
            dy = y1 + y2 + y3;
        }
        else if (bearingKey === Bearing.SEGNORS_LOOP_LEFT || bearingKey === Bearing.SEGNORS_LOOP_RIGHT)
        {
            // Half base.
            x1 = baseSize;
            y1 = 0.0;

            // Curve.
            factor = (bearingKey === Bearing.SEGNORS_LOOP_RIGHT ? 1.0 : -1.0);
            angle = factor * 45.0 * Math.PI / 180.0;
            x2 = radius * Math.cos(angle);
            y2 = factor * radius * (1.0 - (Math.sin(angle) * factor));

            // Half base.
            x3 = baseSize * Math.cos(angle);
            y3 = baseSize * Math.sin(angle);

            dx = x1 + x2 + x3;
            dy = y1 + y2 + y3;
        }
        else if (bearingKey && maneuver.bearing.isTurn)
        {
            // Half base.
            x1 = baseSize;
            y1 = 0.0;

            // Curve.
            factor = (bearingKey === Bearing.TURN_RIGHT ? 1.0 : -1.0);
            angle = headingChange * Math.PI / 180.0;
            x2 = radius;
            y2 = factor * radius;

            // Half base.
            x3 = baseSize * Math.cos(angle);
            y3 = baseSize * Math.sin(angle);

            dx = x1 + x2 + x3;
            dy = y1 + y2 + y3;
        }
        else if (bearingKey === Bearing.TALLON_ROLL_LEFT || bearingKey === Bearing.TALLON_ROLL_RIGHT)
        {
            // Half base.
            x1 = baseSize;
            y1 = 0.0;

            // Curve.
            factor = (bearingKey === Bearing.TALLON_ROLL_RIGHT ? 1.0 : -1.0);
            angle = factor * 90.0 * Math.PI / 180.0;
            x2 = radius;
            y2 = factor * radius;

            // Half base.
            x3 = baseSize * Math.cos(angle);
            y3 = baseSize * Math.sin(angle);

            dx = x1 + x2 + x3;
            dy = y1 + y2 + y3;
        }
        else if ((maneuverKey === Maneuver.BARREL_ROLL_LEFT_1_STANDARD) ||
                (maneuverKey === Maneuver.BARREL_ROLL_RIGHT_1_STANDARD) ||
                (maneuverKey === Maneuver.BARREL_ROLL_LEFT_2_STANDARD) ||
                (maneuverKey === Maneuver.BARREL_ROLL_RIGHT_2_STANDARD))
        {
            factor = (maneuverKey === Maneuver.BARREL_ROLL_RIGHT_1_STANDARD ||
                    maneuverKey === Maneuver.BARREL_ROLL_RIGHT_2_STANDARD ? 1.0 : -1.0);
            dx = 0;
            dy = factor * ((2 * baseSize) + (40 * speed));
            headingChange = 0;
        }
        else
        {
            throw "Unknown maneuverKey: " + maneuverKey;
        }

        return ManeuverComputer.createPosition(fromPosition, dx, dy, headingChange);
    };

    ManeuverComputer.addSegments = function(maneuverKey, path, lastX, heading, segmentCount)
    {
        InputValidator.validateNotNull("path", path);
        var bearingKey = Maneuver.properties[maneuverKey].bearingKey;
        var radius = Maneuver.properties[maneuverKey].radius;

        var factor = ((bearingKey === Bearing.BANK_RIGHT) ||
                (bearingKey === Bearing.TURN_RIGHT || bearingKey === Bearing.SEGNORS_LOOP_RIGHT) ? 1.0 : -1.0);
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
    };

    ManeuverComputer.createPosition = function(fromPosition, dx, dy, headingChange)
    {
        var x0 = fromPosition.x();
        var y0 = fromPosition.y();
        var angle = fromPosition.heading() * Math.PI / 180;

        var x = Math.round((x0 + (dx * Math.cos(angle))) - (dy * Math.sin(angle)));
        var y = Math.round((y0 + (dx * Math.sin(angle))) + (dy * Math.cos(angle)));
        var heading = fromPosition.heading() + headingChange;

        var answer;

        if (Position.isPointInPlayArea(x, y))
        {
            answer = new Position(x, y, heading);
        }

        return answer;
    };

    if (Object.freeze)
    {
        Object.freeze(ManeuverComputer);
    }

    return ManeuverComputer;
});
