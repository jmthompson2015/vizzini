/*
 * Construct this object.
 * 
 * @param environment Environment. 
 * 
 * @param maneuver Maneuver. 
 * 
 * @param fromPosition From position. 
 * 
 * @param shipBase Ship base.
 */
define([ "Maneuver", "Phase", "Position", "RectanglePath", "ShipBase", "ShipFledAction" ], function(Maneuver, Phase,
        Position, RectanglePath, ShipBase, ShipFledAction)
{
    function ManeuverAction(environment, maneuver, fromPosition, shipBase)
    {
        var token = environment.getTokenAt(fromPosition);

        // Flag indicating if the maneuver is a barrel roll.
        var isBarrelRoll = false;

        // Flag indicating if the maneuver is a boost.
        var isBoost = false;

        this.getManeuver = function()
        {
            return maneuver;
        }

        this.getFromPosition = function()
        {
            return fromPosition;
        }

        this.getShipBase = function()
        {
            return shipBase;
        }

        var token = environment.getTokenAt(fromPosition);

        this.doIt = function()
        {
            token.setManeuverAction(this);
            token.setTouching(false);
            environment.setPhase(Phase.ACTIVATION_REVEAL_DIAL);

            var toPosition = determineToPosition();
            LOGGER.trace("toPosition = " + toPosition);

            if (!toPosition && (isBarrelRoll || isBoost))
            {
                // Maneuver failed.
                var message = isBarrelRoll ? "Barrel Roll failed." : "Boost failed.";
                LOGGER.info(message);
            }
            else if (!toPosition
                    || !Position.isPathInPlayArea(ShipBase.computePolygon(shipBase, toPosition.getX(), toPosition
                            .getY(), toPosition.getHeading())))
            {
                LOGGER.info("Ship fled the battlefield: " + token.getName());
                var shipFledAction = new ShipFledAction(environment, token, fromPosition);
                shipFledAction.doIt();
            }
            else
            {
                environment.removeToken(fromPosition);
                environment.placeToken(toPosition, token);

                environment.setPhase(Phase.ACTIVATION_EXECUTE_MANEUVER);
            }

            return false;
        }

        function ShipData(token, position, polygon)
        {
            this.getToken = function()
            {
                return token;
            }

            this.getPosition = function()
            {
                return position;
            }

            this.getPolygon = function()
            {
                return polygon;
            }
        }

        function backOffFrom(shipData1, startIndex)
        {
            InputValidator.validateNotNull("shipData1", shipData1);

            var answer = -2;

            ShipData
            shipData0 = shipDataMap[token];
            var position0 = shipData0.getPosition();
            var polygon1 = shipData1.getPolygon();

            // Find the shortest path until collision.
            var path = Maneuver.computePath(maneuver, fromPosition, shipBase);
            var pathPoints = [];
            var points = path.getPoints();
            for (var i = 0; i < points.length; i += 2)
            {
                pathPoints.push(
                {
                    x: points[i],
                    y: points[i + 1],
                });
            }
            var x0;
            var y0;
            var x1 = position0.getX();
            var y1 = position0.getY();

            LOGGER.trace("pathPoints.length = " + pathPoints.length);
            var index = (startIndex < 0 ? pathPoints.length - 2 : startIndex);

            for (var i = index; i >= 0; i--)
            {
                var point1 = pathPoints[i];
                x0 = point1.x;
                y0 = point1.y;
                var heading = Position.computeHeading(x0, y0, x1, y1);
                LOGGER.trace(i + " x0, y0 = " + x0 + ", " + y0 + " x1, y1 = " + x1 + ", " + y1 + " heading = "
                        + heading);
                var polygon0 = ShipBase.computePolygon(shipBase, Math.vizziniRound(x0, 0), Math.vizziniRound(y0, 0),
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

        /**
         * @param x0
         *            Non-collision X coordinate.
         * @param y0
         *            Non-collision Y coordinate.
         * @param x1
         *            Collision X coordinate.
         * @param y1
         *            Collision Y coordinate.
         * @param polygon1
         *            Colliding area.
         * 
         * @return the closest non-collision point.
         */
        function interpolate(x0, y0, x1, y1, polygon1)
        {
            InputValidator.validateNotNull("polygon1", polygon1);

            var answer = null;

            LOGGER.trace("x0, y0 = " + x0 + ", " + y0 + " x1, y1 = " + x1 + ", " + y1 + " heading = "
                    + Position.computeHeading(x0, y0, x1, y1));

            // Calculate the midpoint.
            var t = 0.5;
            var x01 = x0 + (t * (x1 - x0));
            var y01 = y0 + (t * (y1 - y0));

            if (((Math.vizziniRound(x0 - x01, 0) == 0) && (Math.vizziniRound(y0 - y01, 0) == 0))
                    || ((Math.vizziniRound(x01 - x1, 0) == 0) && (Math.vizziniRound(y01 - y1, 0) == 0)))
            {
                var heading = Position.computeHeading(x0, y0, x1, y1);
                answer = new Position(Math.vizziniRound(x0, 0), Math.vizziniRound(y0, 0), heading);
            }
            else
            {
                var heading01 = Position.computeHeading(x0, y0, x01, y01);
                var polygon01 = ShipBase.computePolygon(shipBase, Math.vizziniRound(x01, 0), Math.vizziniRound(y01, 0),
                        heading01);

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

            if (answer == null)
            {
                var heading = Position.computeHeading(x0, y0, x1, y1);
                answer = new Position(toInt(x1), toInt(y1), heading);
            }

            return answer;
        }

        /*
         * @return a new map of token to ship data.
         */
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
                    position1 = Maneuver.computeToPosition(maneuver, fromPosition, shipBase);

                    if (position1 != null)
                    {
                        polygon1 = ShipBase.computePolygon(shipBase, position1.getX(), position1.getY(), position1
                                .getHeading());
                    }
                }
                else
                {
                    position1 = environment.getPositionFor(token1);
                    var shipBase1 = token1.getShipBase();
                    polygon1 = ShipBase.computePolygon(shipBase1, position1.getX(), position1.getY(), position1
                            .getHeading());
                }

                var shipData = new ShipData(token1, position1, polygon1);
                answer[token1] = shipData;
            });

            Object.getOwnPropertyNames(answer).forEach(function(tokenName)
            {
                LOGGER.info(tokenName + ": " + answer[tokenName]);
            });

            return answer;
        }

        /*
         * @return the to position.
         */
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

        /*
         * @return the to position.
         */
        function determineToPositionWithBackOff()
        {
            LOGGER.trace("determineToPositionWithBackOff() start");

            var answer = null;

            LOGGER.trace("fromPosition = " + fromPosition);

            shipDataMap = createShipDataMap();
            var toPosition = shipDataMap[token].getPosition();
            LOGGER.trace("nominal toPosition = " + toPosition);

            if (toPosition == null)
            {
                // Ship fled the battlefield.
                return null;
            }

            var shipData;
            var index = -1;

            var count = 0;

            do
            {
                shipData = findCollision();
                LOGGER.trace("index = " + index + " shipData = " + shipData);

                if (shipData == null)
                {
                    // No collision.
                    answer = shipDataMap[token].getPosition();
                }
                else
                {
                    // Collision with shipData, at least.
                    token.setTouching(true);
                    index = backOffFrom(shipData, index);
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
            while (answer == null);

            LOGGER.trace("determineToPositionWithBackOff() end");

            return answer;
        }

        /*
         * @return the to position.
         */
        function determineToPositionWithoutBackOff()
        {
            SSPosition
            answer = null;

            LOGGER.trace("fromPosition = " + fromPosition);

            shipDataMap = createShipDataMap();
            var toPosition = shipDataMap.get(token).getPosition();
            LOGGER.trace("nominal toPosition = " + toPosition);

            if (toPosition == null)
            {
                // Ship fled the battlefield.
                return null;
            }

            ShipData
            shipData;
            var index = -1;

            shipData = findCollision();
            LOGGER.trace("index = " + index + " shipData = " + shipData);

            if (shipData == null)
            {
                // No collision.
                answer = shipDataMap[token].getPosition();
            }

            return answer;
        }

        /*
         * @return the first ship data in collision, or null.
         */
        function findCollision()
        {
            ShipData
            answer = null;

            var shipData0 = shipDataMap[token];
            var area0 = shipData0.getPolygon();

            var keys = Object.getOwnPropertyNames(shipDataMap);
            for (var i = 0; i < keys.length; i++)
            {
                var shipData1 = shipDataMap[keys[i]];

                if (shipData0 != shipData1)
                {
                    LOGGER.trace("shipData1 = " + shipData1);
                    var polygon1 = shipData1.getPolygon();

                    if (RectanglePath.doPolygonsCollide(area0, polygon1))
                    {
                        answer = shipData1;
                        break;
                    }
                }
            };

            return answer;
        }
    }

    return ManeuverAction;
});
