define([ "Bearing", "Maneuver", "Phase", "Position", "RectanglePath", "ShipFledAction" ], function(Bearing, Maneuver,
        Phase, Position, RectanglePath, ShipFledAction)
{
    "use strict";
    function ManeuverAction(environment, maneuverKey, fromPosition, shipBaseKey)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("maneuverKey", maneuverKey);
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("shipBaseKey", shipBaseKey);

        this.environment = function()
        {
            return environment;
        };

        this.maneuverKey = function()
        {
            return maneuverKey;
        };

        this.fromPosition = function()
        {
            return fromPosition;
        };

        this.shipBaseKey = function()
        {
            return shipBaseKey;
        };

        var token;

        // Flag indicating if the maneuver is a barrel roll.
        var isBarrelRoll = false;

        // Flag indicating if the maneuver is a boost.
        var isBoost = false;

        this.doIt = function()
        {
            LOGGER.trace("ManeuverAction.doIt() start");
            token = environment.getTokenAt(fromPosition);
            LOGGER.trace("token = " + token);

            if (token)
            {
                token.activationState().maneuverAction(this);
                token.activationState().isTouching(false);
                environment.phase(Phase.ACTIVATION_REVEAL_DIAL);
                var bearing = Maneuver.properties[maneuverKey].bearing;
                isBarrelRoll = (bearing === Bearing.BARREL_ROLL_LEFT || bearing === Bearing.BARREL_ROLL_RIGHT);

                var toPosition = determineToPosition();
                LOGGER.trace("toPosition = " + toPosition);

                var toPolygon;

                if (toPosition)
                {
                    toPolygon = Maneuver.computePolygon(shipBaseKey, toPosition.x(), toPosition.y(), toPosition
                            .heading());
                }

                if (!toPosition && (isBarrelRoll || isBoost))
                {
                    // Maneuver failed.
                    var message = isBarrelRoll ? "Barrel Roll failed." : "Boost failed.";
                    LOGGER.info(message);
                }
                else if (!toPosition || !Position.isPathInPlayArea(toPolygon))
                {
                    LOGGER.info("Ship fled the battlefield: " + token.name());
                    var shipFledAction = new ShipFledAction(environment, token, fromPosition);
                    shipFledAction.doIt();
                }
                else
                {
                    environment.removeToken(fromPosition);
                    environment.placeToken(toPosition, token);
                    token.maneuverEffect(maneuverKey);

                    environment.phase(Phase.ACTIVATION_EXECUTE_MANEUVER);
                }
            }

            LOGGER.trace("ManeuverAction.doIt() end");
        };

        function ShipData(token, position, polygon)
        {
            this.token = function()
            {
                return token;
            };

            this.position = function()
            {
                return position;
            };

            this.polygon = function()
            {
                return polygon;
            };
        }

        function backOffFrom(shipData1, startIndex, shipDataMap)
        {
            InputValidator.validateNotNull("shipData1", shipData1);

            var answer = -2;

            var shipData0 = shipDataMap[token];
            var position0 = shipData0.position();
            var polygon1 = shipData1.polygon();

            // Find the shortest path until collision.
            var path = Maneuver.computePath(maneuverKey, fromPosition, shipBaseKey);
            var pathPoints = [];
            var points = path.points();
            var i;
            for (i = 0; i < points.length; i += 2)
            {
                pathPoints.push(
                {
                    x: points[i],
                    y: points[i + 1],
                });
            }
            var x0;
            var y0;
            var x1 = position0.x();
            var y1 = position0.y();

            LOGGER.trace("pathPoints.length = " + pathPoints.length);
            var index = (startIndex < 0 ? pathPoints.length - 2 : startIndex);

            for (i = index; i >= 0; i--)
            {
                var point1 = pathPoints[i];
                x0 = point1.x;
                y0 = point1.y;
                var heading = Position.computeHeading(x0, y0, x1, y1);
                LOGGER.trace(i + " x0, y0 = " + x0 + ", " + y0 + " x1, y1 = " + x1 + ", " + y1 + " heading = " +
                        heading);
                var polygon0 = Maneuver.computePolygon(shipBaseKey, Math.vizziniRound(x0, 0), Math.vizziniRound(y0, 0),
                        heading);

                if (!RectanglePath.doPolygonsCollide(polygon0, polygon1))
                {
                    var toPosition = interpolate(x0, y0, x1, y1, polygon1);
                    shipData0 = new ShipData(token, toPosition, polygon0);
                    shipDataMap[token] = shipData0;
                    answer = i;
                    break;
                }

                x1 = x0;
                y1 = y0;
            }

            return answer;
        }

        /*
         * @param x0 Non-collision X coordinate.
         * 
         * @param y0 Non-collision Y coordinate.
         * 
         * @param x1 Collision X coordinate.
         * 
         * @param y1 Collision Y coordinate.
         * 
         * @param polygon1 Colliding area.
         * 
         * @return the closest non-collision point.
         */
        function interpolate(x0, y0, x1, y1, polygon1)
        {
            InputValidator.validateNotNull("polygon1", polygon1);

            var answer = null;

            LOGGER.trace("x0, y0 = " + x0 + ", " + y0 + " x1, y1 = " + x1 + ", " + y1 + " heading = " +
                    Position.computeHeading(x0, y0, x1, y1));

            // Calculate the midpoint.
            var t = 0.5;
            var x01 = x0 + (t * (x1 - x0));
            var y01 = y0 + (t * (y1 - y0));
            var heading;

            if (((Math.vizziniRound(x0 - x01, 0) === 0) && (Math.vizziniRound(y0 - y01, 0) === 0)) ||
                    ((Math.vizziniRound(x01 - x1, 0) === 0) && (Math.vizziniRound(y01 - y1, 0) === 0)))
            {
                heading = Position.computeHeading(x0, y0, x1, y1);
                answer = new Position(Math.vizziniRound(x0, 0), Math.vizziniRound(y0, 0), heading);
            }
            else
            {
                var heading01 = Position.computeHeading(x0, y0, x01, y01);
                var polygon01 = Maneuver.computePolygon(shipBaseKey, Math.vizziniRound(x01, 0), Math.vizziniRound(y01,
                        0), heading01);

                if (RectanglePath.doPolygonsCollide(polygon01, polygon1))
                {
                    x01 = x0 + (t * (x01 - x0));
                    y01 = y0 + (t * (y01 - y0));
                    answer = interpolate(x0, y0, x01, y01, polygon1);
                }
                else
                {
                    x01 = x01 + (t * (x1 - x01));
                    y01 = y01 + (t * (y1 - y01));
                    answer = interpolate(x01, y01, x1, y1, polygon1);
                }
            }

            if (answer === null)
            {
                heading = Position.computeHeading(x0, y0, x1, y1);
                answer = new Position(toInt(x1), toInt(y1), heading);
            }

            return answer;
        }

        function createShipDataMap()
        {
            var answer = {};

            var tokens = environment.getTokensForActivation();

            tokens.forEach(function(token1)
            {
                var position1;
                var polygon1 = null;

                if (token1 == token)
                {
                    position1 = Maneuver.computeToPosition(maneuverKey, fromPosition, shipBaseKey);

                    if (position1)
                    {
                        polygon1 = Maneuver.computePolygon(shipBaseKey, position1.x(), position1.y(), position1
                                .heading());
                    }
                }
                else
                {
                    position1 = environment.getPositionFor(token1);
                    var shipBase1 = token1.pilot().shipTeam.ship.shipBaseKey;
                    polygon1 = Maneuver.computePolygon(shipBase1, position1.x(), position1.y(), position1.heading());
                }

                var shipData = new ShipData(token1, position1, polygon1);
                answer[token1] = shipData;
            });

            if (LOGGER.isDebugEnabled())
            {
                Object.getOwnPropertyNames(answer).forEach(function(tokenName)
                {
                    LOGGER.debug(tokenName + ": " + answer[tokenName]);
                });
            }

            return answer;
        }

        function determineToPosition()
        {
            var answer = null;

            if (isBarrelRoll || isBoost)
            {
                answer = determineToPositionWithoutBackOff();
            }
            else
            {
                answer = determineToPositionWithBackOff();
            }

            return answer;
        }

        function determineToPositionWithBackOff()
        {
            LOGGER.trace("determineToPositionWithBackOff() start");

            var answer = null;

            LOGGER.trace("fromPosition = " + fromPosition);

            var shipDataMap = createShipDataMap();
            var toPosition = shipDataMap[token].position();
            LOGGER.trace("nominal toPosition = " + toPosition);

            if (toPosition === null)
            {
                // Ship fled the battlefield.
                return null;
            }

            var shipData;
            var index = -1;

            var count = 0;

            do
            {
                shipData = findCollision(shipDataMap);
                LOGGER.trace("index = " + index + " shipData = " + shipData);

                if (shipData === null)
                {
                    // No collision.
                    answer = shipDataMap[token].position();
                }
                else
                {
                    // Collision with shipData, at least.
                    token.activationState().isTouching(true);
                    index = backOffFrom(shipData, index, shipDataMap);
                }

                count++;

                if (count > 100)
                {
                    LOGGER.info("token = " + token);
                    LOGGER.info("maneuver = " + maneuver);
                    LOGGER.info("index = " + index);
                    LOGGER.info("shipData = " + shipData);
                    throw new RuntimeException("Too long spent in do loop.");
                }

                if (index < -1)
                {
                    // Backoff failed.
                    answer = fromPosition;
                }

            }
            while (answer === null);

            LOGGER.trace("determineToPositionWithBackOff() end");

            return answer;
        }

        function determineToPositionWithoutBackOff()
        {
            var answer = null;

            LOGGER.trace("fromPosition = " + fromPosition);

            var shipDataMap = createShipDataMap();
            var toPosition = shipDataMap[token].position();
            LOGGER.trace("nominal toPosition = " + toPosition);

            if (toPosition === null)
            {
                // Ship fled the battlefield.
                return null;
            }

            var shipData;
            var index = -1;

            shipData = findCollision(shipDataMap);
            LOGGER.trace("index = " + index + " shipData = " + shipData);

            if (shipData === null)
            {
                // No collision.
                answer = shipDataMap[token].position();
            }

            return answer;
        }

        function findCollision(shipDataMap)
        {
            var answer = null;

            var shipData0 = shipDataMap[token];
            var area0 = shipData0.polygon();

            if (area0)
            {
                var keys = Object.getOwnPropertyNames(shipDataMap);
                for (var i = 0; i < keys.length; i++)
                {
                    var shipData1 = shipDataMap[keys[i]];

                    if (shipData0 != shipData1)
                    {
                        LOGGER.trace("shipData1 = " + shipData1);
                        var polygon1 = shipData1.polygon();

                        if (polygon1)
                        {
                            if (RectanglePath.doPolygonsCollide(area0, polygon1))
                            {
                                answer = shipData1;
                                break;
                            }
                        }
                    }
                }
            }

            return answer;
        }
    }

    return ManeuverAction;
});
