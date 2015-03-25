package org.vizzini.starfightersquadrons;

import java.awt.Polygon;
import java.awt.geom.Area;
import java.awt.geom.Path2D;
import java.awt.geom.Point2D;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;
import org.vizzini.starfightersquadrons.Maneuver.BarrelRollManeuver;

/**
 * Provides a maneuver action for Starfighter Squadrons.
 */
public final class ManeuverAction implements Action
{
    /** Provides ship data. */
    private static class ShipData
    {
        /** Ship base area. */
        private final Area area;

        /** Ship position. */
        private final SSPosition position;

        /** Token. */
        private final SSToken token;

        /**
         * Construct this object.
         *
         * @param token Token.
         * @param position Position.
         * @param area Area.
         */
        @SuppressWarnings("hiding")
        public ShipData(final SSToken token, final SSPosition position, final Area area)
        {
            InputValidator.validateNotNull("token", token);

            this.token = token;
            this.position = position;
            this.area = area;
        }

        /**
         * @return the area
         */
        public Area getArea()
        {
            return area;
        }

        /**
         * @return the position
         */
        public SSPosition getPosition()
        {
            return position;
        }

        @Override
        public String toString()
        {
            return token.getName() + " " + position;
        }

        /**
         * @return a string representation of this object.
         */
        @SuppressWarnings("synthetic-access")
        public String toStringWithArea()
        {
            final Writer writer = new StringWriter();
            SHAPE_UTILS.writePoints(area, writer);
            return toString() + "\n" + writer.toString();
        }
    }

    /** Update trigger. */
    public static final ManeuverAction UPDATE_TRIGGER = new ManeuverAction();

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Shape utilities. */
    private static final ShapeUtilities SHAPE_UTILS = new ShapeUtilities();

    /** Environment. */
    private final SSEnvironment environment;

    /** From position. */
    private final SSPosition fromPosition;

    /** Flag indicating if the maneuver is a barrel roll. */
    private final boolean isBarrelRoll;

    /** Flag indicating if the maneuver is a boost. */
    private final boolean isBoost;

    /** Maneuver. */
    private final Maneuver maneuver;

    /** Ship base. */
    private final ShipBase shipBase;

    /** Map of token to ship data. */
    private Map<SSToken, ShipData> shipDataMap;

    /** Token. */
    private final SSToken token;

    /**
     * Construct this object.
     *
     * @param environment Environment.
     * @param maneuver Maneuver.
     * @param fromPosition From position.
     * @param shipBase Ship base.
     */
    @SuppressWarnings("hiding")
    public ManeuverAction(final SSEnvironment environment, final Maneuver maneuver,
            final SSPosition fromPosition, final ShipBase shipBase)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("maneuver", maneuver);
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("shipBase", shipBase);

        this.environment = environment;
        this.maneuver = maneuver;
        this.fromPosition = fromPosition;
        this.shipBase = shipBase;
        this.token = environment.getTokenAt(fromPosition);

        isBarrelRoll = maneuver instanceof BarrelRollManeuver;
        isBoost = ManeuverSet.BOOST_MANEUVERS.contains(maneuver);
    }

    /**
     * Construct this object.
     */
    private ManeuverAction()
    {
        this.environment = null;
        this.maneuver = null;
        this.fromPosition = null;
        this.shipBase = null;
        this.token = null;

        this.isBarrelRoll = false;
        this.isBoost = false;
    }

    @Override
    public boolean doIt()
    {
        LOGGER.debug("maneuver = " + maneuver);

        token.setManeuverAction(this);
        token.setTouching(false);
        environment.setPhase(Phase.ACTIVATION_REVEAL_DIAL);

        final SSPosition toPosition = determineToPosition();
        LOGGER.debug("toPosition = " + toPosition);

        if ((toPosition == null) && (isBarrelRoll || isBoost))
        {
            // Maneuver failed.
            final String message = isBarrelRoll ? "Barrel Roll failed." : "Boost failed.";
            LOGGER.info(message);
        }
        else if ((toPosition == null) || !SSPosition.isInPlayArea(shipBase.computePolygon(toPosition)))
        {
            LOGGER.trace("Ship fled the battlefield");
            final ShipFledAction shipFledAction = new ShipFledAction(environment, token, fromPosition);
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

    @Override
    public Agent getAgent()
    {
        return token.getAgent();
    }

    @Override
    public SSEnvironment getEnvironment()
    {
        return environment;
    }

    /**
     * @return the fromPosition
     */
    public SSPosition getFromPosition()
    {
        return fromPosition;
    }

    /**
     * @return the maneuver
     */
    public Maneuver getManeuver()
    {
        return maneuver;
    }

    /**
     * @return the shipBase
     */
    public ShipBase getShipBase()
    {
        return shipBase;
    }

    /**
     * @return the token
     */
    public SSToken getToken()
    {
        return token;
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("maneuver", getManeuver());
        builder.append("fromPosition", getFromPosition());
        builder.append("agent", getAgent());

        return builder.toString();
    }

    @Override
    public boolean undoIt()
    {
        throw new RuntimeException("method not used");
    }

    /**
     * @param shipData1 Collision ship data.
     * @param startIndex Starting path points index.
     *
     * @return the new ship data for token.
     */
    private int backOffFrom(final ShipData shipData1, final int startIndex)
    {
        InputValidator.validateNotNull("shipData1", shipData1);

        int answer = -2;

        ShipData shipData0 = shipDataMap.get(token);
        final SSPosition position0 = shipData0.getPosition();
        final Area area1 = shipData1.getArea();

        // Find the shortest path until collision.
        final Path2D path = maneuver.computePath(fromPosition, shipBase);
        final List<Point2D> pathPoints = SHAPE_UTILS.asList(path);
        double x0;
        double y0;
        double x1 = position0.getX();
        double y1 = position0.getY();

        LOGGER.trace("pathPoints.size() = " + pathPoints.size());
        final int index = (startIndex < 0 ? pathPoints.size() - 2 : startIndex);

        for (int i = index; i >= 0; i--)
        {
            final Point2D point1 = pathPoints.get(i);
            x0 = point1.getX();
            y0 = point1.getY();
            final int heading = SSPosition.computeHeading(x0, y0, x1, y1);
            LOGGER.trace(i + " x0, y0 = " + x0 + ", " + y0 + " x1, y1 = " + x1 + ", " + y1 + " heading = " + heading);
            final Polygon polygon0 = shipBase.computePolygon(toInt(x0), toInt(y0), heading);
            final Area area0 = new Area(polygon0);

            if (!SHAPE_UTILS.doAreasCollide(area0, area1))
            {
                LOGGER.trace("doAreasCollide(area0, area1) ? false");
                final SSPosition toPosition = interpolate(x0, y0, x1, y1, area1);
                shipData0 = new ShipData(token, toPosition, area0);
                shipDataMap.put(token, shipData0);
                answer = i;
                break;
            }

            x1 = x0;
            y1 = y0;
        }

        return answer;
    }

    /**
     * @return a new map of token to ship data.
     */
    private Map<SSToken, ShipData> createShipDataMap()
    {
        final Map<SSToken, ShipData> answer = new HashMap<SSToken, ShipData>();

        final List<SSToken> tokens = environment.getTokensForActivation();

        for (final SSToken token1 : tokens)
        {
            SSPosition position1;
            Area area1 = null;

            if (token1 == token)
            {
                position1 = maneuver.computeToPosition(fromPosition, shipBase);

                if (position1 != null)
                {
                    final Polygon polygon1 = shipBase.computePolygon(position1);
                    area1 = new Area(polygon1);
                }
            }
            else
            {
                position1 = environment.getPositionFor(token1);
                final ShipBase shipBase1 = token1.getShip().getShipBase();
                final Polygon polygon1 = shipBase1.computePolygon(position1);
                area1 = new Area(polygon1);
            }

            final ShipData shipData = new ShipData(token1, position1, area1);
            answer.put(token1, shipData);
        }

        return answer;
    }

    /**
     * @return the to position.
     */
    private SSPosition determineToPosition()
    {
        SSPosition answer = null;

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

    /**
     * @return the to position.
     */
    private SSPosition determineToPositionWithBackOff()
    {
        SSPosition answer = null;

        LOGGER.trace("fromPosition = " + fromPosition);

        shipDataMap = createShipDataMap();
        final SSPosition toPosition = shipDataMap.get(token).getPosition();
        LOGGER.trace("nominal toPosition = " + toPosition);

        if (toPosition == null)
        {
            // Ship fled the battlefield.
            return null;
        }

        ShipData shipData;
        int index = -1;

        if (LOGGER.isTraceEnabled())
        {
            for (final Entry<SSToken, ShipData> entry : shipDataMap.entrySet())
            {
                final ShipData shipData1 = entry.getValue();
                LOGGER.trace("shipData = " + shipData1.toStringWithArea());
            }
        }

        int count = 0;

        do
        {
            shipData = findCollision();
            LOGGER.trace("index = " + index + " shipData = " + shipData);

            if (shipData == null)
            {
                // No collision.
                answer = shipDataMap.get(token).getPosition();
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

        } while (answer == null);

        return answer;
    }

    /**
     * @return the to position.
     */
    private SSPosition determineToPositionWithoutBackOff()
    {
        SSPosition answer = null;

        LOGGER.trace("fromPosition = " + fromPosition);

        shipDataMap = createShipDataMap();
        final SSPosition toPosition = shipDataMap.get(token).getPosition();
        LOGGER.trace("nominal toPosition = " + toPosition);

        if (toPosition == null)
        {
            // Ship fled the battlefield.
            return null;
        }

        ShipData shipData;
        final int index = -1;

        if (LOGGER.isTraceEnabled())
        {
            for (final Entry<SSToken, ShipData> entry : shipDataMap.entrySet())
            {
                final ShipData shipData1 = entry.getValue();
                LOGGER.trace("shipData = " + shipData1.toStringWithArea());
            }
        }

        shipData = findCollision();
        LOGGER.trace("index = " + index + " shipData = " + shipData);

        if (shipData == null)
        {
            // No collision.
            answer = shipDataMap.get(token).getPosition();
        }

        return answer;
    }

    /**
     * @return the first ship data in collision, or null.
     */
    private ShipData findCollision()
    {
        ShipData answer = null;

        final ShipData shipData0 = shipDataMap.get(token);
        final Area area0 = shipData0.getArea();

        for (final Entry<SSToken, ShipData> entry : shipDataMap.entrySet())
        {
            final ShipData shipData1 = entry.getValue();

            if (shipData0 == shipData1)
            {
                continue;
            }

            LOGGER.trace("shipData1 = " + shipData1);
            final Area area1 = shipData1.getArea();
            LOGGER.trace("doAreasCollide(area0, area1) ? " + SHAPE_UTILS.doAreasCollide(area0, area1));

            if (SHAPE_UTILS.doAreasCollide(area0, area1))
            {
                answer = shipData1;
                break;
            }
        }

        return answer;
    }

    /**
     * @param x0 Non-collision X coordinate.
     * @param y0 Non-collision Y coordinate.
     * @param x1 Collision X coordinate.
     * @param y1 Collision Y coordinate.
     * @param area1 Colliding area.
     *
     * @return the closest non-collision point.
     */
    private SSPosition interpolate(final double x0, final double y0, final double x1, final double y1,
            final Area area1)
    {
        InputValidator.validateNotNull("area1", area1);

        SSPosition answer = null;

        LOGGER.trace("x0, y0 = " + x0 + ", " + y0 + " x1, y1 = " + x1 + ", " + y1 + " heading = "
                + SSPosition.computeHeading(x0, y0, x1, y1));

        // Calculate the midpoint.
        final double t = 0.5;
        double x01 = x0 + (t * (x1 - x0));
        double y01 = y0 + (t * (y1 - y0));

        if (((toInt(x0 - x01) == 0) && (toInt(y0 - y01) == 0)) || ((toInt(x01 - x1) == 0) && (toInt(y01 - y1) == 0)))
        {
            final int heading = SSPosition.computeHeading(x0, y0, x1, y1);
            answer = new SSPosition(toInt(x0), toInt(y0), heading);
        }
        else
        {
            final int heading01 = SSPosition.computeHeading(x0, y0, x01, y01);
            final Polygon polygon01 = shipBase.computePolygon(toInt(x01), toInt(y01), heading01);
            final Area area01 = new Area(polygon01);

            if (SHAPE_UTILS.doAreasCollide(area01, area1))
            {
                x01 = x0 + (t * (x01 - x0));
                y01 = y0 + (t * (y01 - y0));
                answer = interpolate(x0, y0, x01, y01, area1);
            }
            else
            {
                x01 = x01 + (t * (x1 - x01));
                y01 = y01 + (t * (y1 - y01));
                answer = interpolate(x01, y01, x1, y1, area1);
            }
        }

        if (answer == null)
        {
            final int heading = SSPosition.computeHeading(x0, y0, x1, y1);
            answer = new SSPosition(toInt(x1), toInt(y1), heading);
        }

        return answer;
    }

    /**
     * @param value Value.
     *
     * @return value rounded to an integer.
     */
    private int toInt(final double value)
    {
        return (int)Math.round(value);
    }
}
