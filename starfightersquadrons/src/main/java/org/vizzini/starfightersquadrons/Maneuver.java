package org.vizzini.starfightersquadrons;

import java.awt.Point;
import java.awt.Polygon;
import java.awt.geom.AffineTransform;
import java.awt.geom.Path2D;
import java.awt.geom.Rectangle2D;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.InputValidator;

/**
 * Provides a maneuver for Starfighter Squadrons.
 * <p>
 * Small ship base is 40mm x 40mm.
 * </p>
 * <p>
 * Bearing straight, speed one maneuver is 40mm long. Other straight maneuvers are multiples of this.
 * </p>
 */
public class Maneuver
{
    /**
     * Provides a barrel roll maneuver.
     */
    public static class BarrelRollManeuver extends Maneuver
    {
        /** Maneuver. */
        public static final Maneuver BARREL_ROLL_LEFT_1 = new BarrelRollManeuver(false, 1);

        /** Maneuver. */
        public static final Maneuver BARREL_ROLL_LEFT_2 = new BarrelRollManeuver(false, 2);

        /** Maneuver. */
        public static final Maneuver BARREL_ROLL_RIGHT_1 = new BarrelRollManeuver(true, 1);

        /** Maneuver. */
        public static final Maneuver BARREL_ROLL_RIGHT_2 = new BarrelRollManeuver(true, 2);

        /** Flag indicating if this is a left or right barrel roll. */
        private final boolean isRight;

        /**
         * Construct this object.
         *
         * @param isRight Flag indicating if this is a left or right barrel roll.
         * @param speed Speed.
         */
        @SuppressWarnings({ "synthetic-access", "hiding" })
        public BarrelRollManeuver(final boolean isRight, final int speed)
        {
            super(null, speed, Difficulty.STANDARD);

            this.isRight = isRight;
        }

        @SuppressWarnings("synthetic-access")
        @Override
        public Path2D computePath(final SSPosition fromPosition, final ShipBase shipBase)
        {
            InputValidator.validateNotNull("fromPosition", fromPosition);
            InputValidator.validateNotNull("shipBase", shipBase);

            final Path2D answer = new Path2D.Double();

            // Initial point.
            answer.moveTo(0.0, 0.0);

            // First segment: move base center.
            final double factor = isRight ? 1.0 : -1.0;
            final double baseSize = shipBase.getRectangle().height / 2.0;
            double y = factor * baseSize;
            answer.lineTo(0.0, y);

            y = factor * (baseSize + 40);
            answer.lineTo(0.0, y);

            // Last segment: move base center.
            y = factor * (baseSize + 40 + baseSize);
            answer.lineTo(0.0, y);

            // Rotate and translate to fromPosition.
            transformPath(fromPosition, answer);

            return answer;
        }

        @SuppressWarnings("synthetic-access")
        @Override
        public SSPosition computeToPosition(final SSPosition fromPosition, final ShipBase shipBase)
        {
            InputValidator.validateNotNull("fromPosition", fromPosition);
            InputValidator.validateNotNull("shipBase", shipBase);

            final int baseSize = shipBase.getRectangle().height / 2;
            final double factor = isRight ? 1.0 : -1.0;
            final double dx = 0;
            final double dy = factor * (baseSize + 40 + baseSize);

            final SSPosition answer = createPosition(fromPosition, dx, dy, 0);

            return answer;
        }
    }

    /**
     * Provides an enumeration of bearings.
     */
    public enum Bearing
    {
        /** Bearing. */
        TURN_LEFT(-90),
        /** Bearing. */
        BANK_LEFT(-45),
        /** Bearing. */
        STRAIGHT(0),
        /** Bearing. */
        BANK_RIGHT(45),
        /** Bearing. */
        TURN_RIGHT(90),
        /** Bearing. */
        KOIOGRAN_TURN(180);

        /** Heading change. */
        private final int headingChange;

        /**
         * Construct this object.
         *
         * @param headingChange Heading change.
         */
        @SuppressWarnings("hiding")
        private Bearing(final int headingChange)
        {
            this.headingChange = headingChange;
        }

        /**
         * @return the headingChange
         */
        public int getHeadingChange()
        {
            return headingChange;
        }

        /**
         * @return true if this is a bank.
         */
        public boolean isBank()
        {
            return (this == BANK_LEFT) || (this == BANK_RIGHT);
        }

        /**
         * @return true if this is a bank.
         */
        public boolean isTurn()
        {
            return (this == TURN_LEFT) || (this == TURN_RIGHT);
        }
    }

    /**
     * Provides a boost maneuver.
     */
    public static class BoostManeuver extends Maneuver
    {
        /** Maneuver. */
        public static final Maneuver BOOST_BANK_LEFT_1_STANDARD = new BoostManeuver(Bearing.BANK_LEFT, 1,
                Difficulty.STANDARD);

        /** Maneuver. */
        public static final Maneuver BOOST_BANK_RIGHT_1_STANDARD = new BoostManeuver(Bearing.BANK_RIGHT, 1,
                Difficulty.STANDARD);

        /** Maneuver. */
        public static final Maneuver BOOST_STRAIGHT_1_STANDARD = new BoostManeuver(Bearing.STRAIGHT, 1,
                Difficulty.STANDARD);

        /**
         * Construct this object.
         *
         * @param bearing Bearing.
         * @param speed Speed.
         * @param difficulty Difficulty.
         */
        @SuppressWarnings("synthetic-access")
        public BoostManeuver(final Bearing bearing, final int speed, final Difficulty difficulty)
        {
            super(bearing, speed, difficulty);
        }
    }

    /**
     * Provides an enumeration of difficulties.
     */
    public enum Difficulty
    {
        /** Difficulty. */
        EASY,
        /** Difficulty. */
        STANDARD,
        /** Difficulty. */
        HARD;
    }

    /**
     * Provides a stationary maneuver.
     */
    static class StationaryManeuver extends Maneuver
    {
        /** Maneuver. */
        public static final Maneuver STATIONARY_0_HARD = new StationaryManeuver(Difficulty.HARD);

        /**
         * Construct this object.
         *
         * @param difficulty Difficulty.
         */
        @SuppressWarnings("synthetic-access")
        public StationaryManeuver(final Difficulty difficulty)
        {
            super(null, 0, difficulty);
        }

        @Override
        public Path2D computePath(final SSPosition fromPosition, final ShipBase shipBase)
        {
            InputValidator.validateNotNull("fromPosition", fromPosition);
            InputValidator.validateNotNull("shipBase", shipBase);

            final Path2D answer = new Path2D.Double();
            answer.moveTo(fromPosition.getX(), fromPosition.getY());

            return answer;
        }

        @Override
        public SSPosition computeToPosition(final SSPosition fromPosition, final ShipBase shipBase)
        {
            InputValidator.validateNotNull("fromPosition", fromPosition);
            InputValidator.validateNotNull("shipBase", shipBase);

            return fromPosition;
        }
    }

    /**
     * @param bearing Bearing.
     * @param speed Speed.
     * @param difficulty Difficulty.
     *
     * @return the maneuver with the given characteristics.
     */
    public static Maneuver find(final Bearing bearing, final int speed, final Difficulty difficulty)
    {
        InputValidator.validateNotNull("bearing", bearing);
        InputValidator.validateNotNull("difficulty", difficulty);

        Maneuver answer = null;

        for (final Maneuver maneuver : VALUES)
        {
            if ((maneuver.getBearing() == bearing) && (maneuver.getSpeed() == speed)
                    && (maneuver.getDifficulty() == difficulty) && (maneuver.getClass() == Maneuver.class))
            {
                answer = maneuver;
                break;
            }
        }

        return answer;
    }

    /**
     * @return the values.
     */
    public static Maneuver[] values()
    {
        return VALUES.toArray(new Maneuver[VALUES.size()]);
    }

    /**
     * @param fromPosition From position.
     * @param dx Delta X.
     * @param dy Delta Y.
     * @param headingChange Delta heading.
     *
     * @return a new position.
     */
    private static SSPosition createPosition(final SSPosition fromPosition, final double dx, final double dy,
            final int headingChange)
    {
        SSPosition answer = null;

        final double x0 = fromPosition.getX();
        final double y0 = fromPosition.getY();
        final double angle = Math.toRadians(fromPosition.getHeading());

        final int x = toInt((x0 + (dx * Math.cos(angle))) - (dy * Math.sin(angle)));
        final int y = toInt((y0 + (dx * Math.sin(angle))) + (dy * Math.cos(angle)));
        final int heading = fromPosition.getHeading() + headingChange;

        try
        {
            answer = new SSPosition(x, y, heading);
        }
        catch (final IndexOutOfBoundsException e)
        {
            // Nothing to do.
        }

        return answer;
    }

    /**
     * @param value Value.
     *
     * @return value rounded to an integer.
     */
    private static int toInt(final double value)
    {
        return (int)Math.round(value);
    }

    /**
     * @param fromPosition From position.
     * @param path Path.
     */
    private static void transformPath(final SSPosition fromPosition, final Path2D path)
    {
        final AffineTransform affineTransform = new AffineTransform();
        final double fromHeading = Math.toRadians(fromPosition.getHeading());
        affineTransform.translate(fromPosition.getX(), fromPosition.getY());
        affineTransform.rotate(fromHeading);

        path.transform(affineTransform);
    }

    /** Maneuver. */
    public static final Maneuver BANK_LEFT_1_EASY = (new Maneuver(Bearing.BANK_LEFT, 1, Difficulty.EASY));

    /** Maneuver. */
    public static final Maneuver BANK_LEFT_1_STANDARD = (new Maneuver(Bearing.BANK_LEFT, 1, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver BANK_LEFT_2_EASY = (new Maneuver(Bearing.BANK_LEFT, 2, Difficulty.EASY));

    /** Maneuver. */
    public static final Maneuver BANK_LEFT_2_STANDARD = (new Maneuver(Bearing.BANK_LEFT, 2, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver BANK_LEFT_3_HARD = (new Maneuver(Bearing.BANK_LEFT, 3, Difficulty.HARD));

    /** Maneuver. */
    public static final Maneuver BANK_LEFT_3_STANDARD = (new Maneuver(Bearing.BANK_LEFT, 3, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver BANK_RIGHT_1_EASY = (new Maneuver(Bearing.BANK_RIGHT, 1, Difficulty.EASY));

    /** Maneuver. */
    public static final Maneuver BANK_RIGHT_1_STANDARD = (new Maneuver(Bearing.BANK_RIGHT, 1, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver BANK_RIGHT_2_EASY = (new Maneuver(Bearing.BANK_RIGHT, 2, Difficulty.EASY));

    /** Maneuver. */
    public static final Maneuver BANK_RIGHT_2_STANDARD = (new Maneuver(Bearing.BANK_RIGHT, 2, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver BANK_RIGHT_3_HARD = (new Maneuver(Bearing.BANK_RIGHT, 3, Difficulty.HARD));

    /** Maneuver. */
    public static final Maneuver BANK_RIGHT_3_STANDARD = (new Maneuver(Bearing.BANK_RIGHT, 3, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver KOIOGRAN_TURN_2_HARD = (new Maneuver(Bearing.KOIOGRAN_TURN, 2, Difficulty.HARD));

    /** Maneuver. */
    public static final Maneuver KOIOGRAN_TURN_3_HARD = (new Maneuver(Bearing.KOIOGRAN_TURN, 3, Difficulty.HARD));

    /** Maneuver. */
    public static final Maneuver KOIOGRAN_TURN_4_HARD = (new Maneuver(Bearing.KOIOGRAN_TURN, 4, Difficulty.HARD));

    /** Maneuver. */
    public static final Maneuver KOIOGRAN_TURN_4_STANDARD = (new Maneuver(Bearing.KOIOGRAN_TURN, 4, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver KOIOGRAN_TURN_5_HARD = (new Maneuver(Bearing.KOIOGRAN_TURN, 5, Difficulty.HARD));

    /** Maneuver. */
    public static final Maneuver STRAIGHT_1_EASY = (new Maneuver(Bearing.STRAIGHT, 1, Difficulty.EASY));

    /** Maneuver. */
    public static final Maneuver STRAIGHT_1_STANDARD = (new Maneuver(Bearing.STRAIGHT, 1, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver STRAIGHT_2_EASY = (new Maneuver(Bearing.STRAIGHT, 2, Difficulty.EASY));

    /** Maneuver. */
    public static final Maneuver STRAIGHT_2_STANDARD = (new Maneuver(Bearing.STRAIGHT, 2, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver STRAIGHT_3_EASY = (new Maneuver(Bearing.STRAIGHT, 3, Difficulty.EASY));

    /** Maneuver. */
    public static final Maneuver STRAIGHT_3_STANDARD = (new Maneuver(Bearing.STRAIGHT, 3, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver STRAIGHT_4_EASY = (new Maneuver(Bearing.STRAIGHT, 4, Difficulty.EASY));

    /** Maneuver. */
    public static final Maneuver STRAIGHT_4_HARD = (new Maneuver(Bearing.STRAIGHT, 4, Difficulty.HARD));

    /** Maneuver. */
    public static final Maneuver STRAIGHT_4_STANDARD = (new Maneuver(Bearing.STRAIGHT, 4, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver STRAIGHT_5_EASY = (new Maneuver(Bearing.STRAIGHT, 5, Difficulty.EASY));

    /** Maneuver. */
    public static final Maneuver STRAIGHT_5_STANDARD = (new Maneuver(Bearing.STRAIGHT, 5, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver TURN_LEFT_1_HARD = (new Maneuver(Bearing.TURN_LEFT, 1, Difficulty.HARD));

    /** Maneuver. */
    public static final Maneuver TURN_LEFT_1_STANDARD = (new Maneuver(Bearing.TURN_LEFT, 1, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver TURN_LEFT_2_EASY = (new Maneuver(Bearing.TURN_LEFT, 2, Difficulty.EASY));

    /** Maneuver. */
    public static final Maneuver TURN_LEFT_2_HARD = (new Maneuver(Bearing.TURN_LEFT, 2, Difficulty.HARD));

    /** Maneuver. */
    public static final Maneuver TURN_LEFT_2_STANDARD = (new Maneuver(Bearing.TURN_LEFT, 2, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver TURN_LEFT_3_HARD = (new Maneuver(Bearing.TURN_LEFT, 3, Difficulty.HARD));

    /** Maneuver. */
    public static final Maneuver TURN_LEFT_3_STANDARD = (new Maneuver(Bearing.TURN_LEFT, 3, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver TURN_RIGHT_1_HARD = new Maneuver(Bearing.TURN_RIGHT, 1, Difficulty.HARD);

    /** Maneuver. */
    public static final Maneuver TURN_RIGHT_1_STANDARD = new Maneuver(Bearing.TURN_RIGHT, 1, Difficulty.STANDARD);

    /** Maneuver. */
    public static final Maneuver TURN_RIGHT_2_EASY = (new Maneuver(Bearing.TURN_RIGHT, 2, Difficulty.EASY));

    /** Maneuver. */
    public static final Maneuver TURN_RIGHT_2_HARD = (new Maneuver(Bearing.TURN_RIGHT, 2, Difficulty.HARD));

    /** Maneuver. */
    public static final Maneuver TURN_RIGHT_2_STANDARD = (new Maneuver(Bearing.TURN_RIGHT, 2, Difficulty.STANDARD));

    /** Maneuver. */
    public static final Maneuver TURN_RIGHT_3_HARD = (new Maneuver(Bearing.TURN_RIGHT, 3, Difficulty.HARD));

    /** Maneuver. */
    public static final Maneuver TURN_RIGHT_3_STANDARD = (new Maneuver(Bearing.TURN_RIGHT, 3, Difficulty.STANDARD));

    /** Values. */
    private static List<Maneuver> VALUES;

    /** Bearing. */
    private final Bearing bearing;

    /** Difficulty. */
    private final Difficulty difficulty;

    /** Speed. */
    private final int speed;

    /**
     * Construct this object.
     *
     * @param bearing Bearing. (optional)
     * @param speed Speed.
     * @param difficulty Difficulty.
     */
    @SuppressWarnings("hiding")
    private Maneuver(final Bearing bearing, final int speed, final Difficulty difficulty)
    {
        InputValidator.validateNotNull("difficulty", difficulty);

        this.bearing = bearing;
        this.speed = speed;
        this.difficulty = difficulty;

        if (VALUES == null)
        {
            VALUES = new ArrayList<Maneuver>();
        }

        VALUES.add(this);
    }

    /**
     * @param fromPosition Position.
     * @param shipBase Ship base.
     *
     * @return the union of the bounds of the from polygon, path, and to polygon.
     */
    public Rectangle2D computeBounds2D(final SSPosition fromPosition, final ShipBase shipBase)
    {
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("shipBase", shipBase);

        final Polygon fromPolygon = computeFromPolygon(fromPosition, shipBase);
        final Path2D path = computePath(fromPosition, shipBase);
        final Polygon toPolygon = computeToPolygon(fromPosition, shipBase);

        final Rectangle2D fromBounds = fromPolygon.getBounds2D();
        final Rectangle2D pathBounds = path.getBounds2D();
        final Rectangle2D toBounds = toPolygon.getBounds2D();

        final Rectangle2D bounds = fromBounds.createUnion(pathBounds).createUnion(toBounds);

        return bounds;
    }

    /**
     * @param fromPosition Position.
     * @param shipBase Ship base.
     *
     * @return the polygon representing the ship base at the given position. The first point is port-forward, the second
     *         point is starboard-forward.
     */
    public Polygon computeFromPolygon(final SSPosition fromPosition, final ShipBase shipBase)
    {
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("shipBase", shipBase);

        return shipBase.computePolygon(fromPosition);
    }

    /**
     * @param fromPosition From position.
     * @param shipBase Ship base.
     *
     * @return the position after executing this maneuver.
     */
    public Path2D computePath(final SSPosition fromPosition, final ShipBase shipBase)
    {
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("shipBase", shipBase);

        final Path2D.Double answer = new Path2D.Double();

        // Initial point.
        answer.moveTo(0.0, 0.0);

        // First segment: move base center.
        final double baseSize = shipBase.getRectangle().height / 2.0;
        double lastX;
        double lastY;

        {
            final double x = baseSize;
            answer.lineTo(x, 0.0);
            lastX = x;
            lastY = 0.0;
        }

        // Middle segments: follow the arc.
        switch (getBearing())
        {
        case STRAIGHT:
        case KOIOGRAN_TURN:
            double x = lastX;
            for (int i = 0; i < getSpeed(); i++)
            {
                x += 40;
                answer.lineTo(x, 0.0);
            }
            lastX = x;
            break;
        case BANK_LEFT:
        case BANK_RIGHT:
            Point last = addSegments(answer, lastX, 45, 3 + getSpeed());
            lastX = last.x;
            lastY = last.y;
            break;
        case TURN_LEFT:
        case TURN_RIGHT:
            last = addSegments(answer, lastX, 90, 5 + getSpeed());
            lastX = last.x;
            lastY = last.y;
            break;
        }

        // Last segment: move base center.
        switch (getBearing())
        {
        case STRAIGHT:
        case KOIOGRAN_TURN:
            double x = baseSize + lastX;
            answer.lineTo(x, 0.0);
            break;
        case BANK_LEFT:
        case BANK_RIGHT:
            double factor = (getBearing() == Bearing.BANK_RIGHT ? 1.0 : -1.0);
            x = (baseSize * Math.cos(Math.PI / 4.0)) + lastX;
            double y = (factor * baseSize * Math.cos(Math.PI / 4.0)) + lastY;
            answer.lineTo(x, y);
            break;
        case TURN_LEFT:
        case TURN_RIGHT:
            factor = (getBearing() == Bearing.TURN_RIGHT ? 1.0 : -1.0);
            y = (factor * baseSize) + lastY;
            answer.lineTo(lastX, y);
            break;
        }

        // Rotate and translate to fromPosition.
        transformPath(fromPosition, answer);

        return answer;
    }

    /**
     * @param fromPosition Position.
     * @param shipBase Ship base.
     *
     * @return the polygon representing the ship base at the given position. The first point is port-forward, the second
     *         point is starboard-forward.
     */
    public Polygon computeToPolygon(final SSPosition fromPosition, final ShipBase shipBase)
    {
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("shipBase", shipBase);

        final SSPosition toPosition = computeToPosition(fromPosition, shipBase);

        InputValidator.validateNotNull("toPosition", toPosition);

        final Polygon answer = shipBase.computePolygon(toPosition);

        return answer;
    }

    /**
     * @param fromPosition From position.
     * @param shipBase Ship base.
     *
     * @return the position after executing this maneuver.
     */
    public SSPosition computeToPosition(final SSPosition fromPosition, final ShipBase shipBase)
    {
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("shipBase", shipBase);

        double dx = Integer.MIN_VALUE;
        double dy = Integer.MIN_VALUE;
        final int baseSize = shipBase.getRectangle().height / 2;

        if ((getBearing() == Bearing.STRAIGHT) || (getBearing() == Bearing.KOIOGRAN_TURN))
        {
            dx = (2 * baseSize) + (40 * getSpeed());
            dy = 0;
        }
        else if (getBearing().isBank())
        {
            final double radius = getRadius();

            // Half base.
            final double x1 = baseSize;
            final double y1 = 0.0;

            // Curve.
            final double factor = (getBearing() == Bearing.BANK_RIGHT ? 1.0 : -1.0);
            final double angle = Math.toRadians(getBearing().getHeadingChange());
            final double x2 = radius * Math.cos(angle);
            final double y2 = factor * radius * (1.0 - (Math.sin(angle) * factor));

            // Half base.
            final double x3 = baseSize * Math.cos(angle);
            final double y3 = baseSize * Math.sin(angle);

            dx = x1 + x2 + x3;
            dy = y1 + y2 + y3;
        }
        else if (getBearing().isTurn())
        {
            final double radius = getRadius();

            // Half base.
            final double x1 = baseSize;
            final double y1 = 0.0;

            // Curve.
            final double factor = (getBearing() == Bearing.TURN_RIGHT ? 1.0 : -1.0);
            final double angle = Math.toRadians(getBearing().getHeadingChange());
            final double x2 = radius;
            final double y2 = factor * radius;

            // Half base.
            final double x3 = baseSize * Math.cos(angle);
            final double y3 = baseSize * Math.sin(angle);

            dx = x1 + x2 + x3;
            dy = y1 + y2 + y3;
        }

        if (dx == Integer.MIN_VALUE)
        {
            throw new RuntimeException("Maneuver.computeToPosition() not supported: " + this);
        }

        final SSPosition answer = createPosition(fromPosition, dx, dy, getBearing().getHeadingChange());

        return answer;
    }

    /**
     * @return the bearing
     */
    public Bearing getBearing()
    {
        return bearing;
    }

    /**
     * @return the difficulty
     */
    public Difficulty getDifficulty()
    {
        return difficulty;
    }

    /**
     * @return the curve radius, if any.
     */
    public Double getRadius()
    {
        Double answer = null;

        if (getBearing().isBank())
        {
            switch (getSpeed())
            {
            case 1:
                // 3.25 inches.
                answer = 82.6;
                break;
            case 2:
                // 5 inches.
                answer = 127.0;
                break;
            case 3:
                // 7 inches.
                answer = 177.8;
                break;
            }
        }
        else if (getBearing().isTurn())
        {
            switch (getSpeed())
            {
            case 1:
                // 1.35 inches.
                answer = 34.3;
                break;
            case 2:
                // 2.45 inches.
                answer = 62.2;
                break;
            case 3:
                // 3.5 inches.
                answer = 88.9;
                break;
            }
        }

        return answer;
    }

    /**
     * @return the speed
     */
    public int getSpeed()
    {
        return speed;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    /**
     * @param path Path.
     * @param lastX Last X coordinate.
     * @param heading Heading.
     * @param segmentCount Number of segments.
     *
     * @return a point containing the new last coordinates.
     */
    private Point addSegments(final Path2D path, final double lastX, final int heading, final int segmentCount)
    {
        InputValidator.validateNotNull("path", path);

        final double factor = ((getBearing() == Bearing.BANK_RIGHT) || (getBearing() == Bearing.TURN_RIGHT) ? 1.0
                : -1.0);
        final double radius = getRadius();
        final double deltaAngle = Math.toRadians(heading) / segmentCount;

        double myLastX = lastX;
        double myLastY = 0.0;

        for (int i = 1; i <= segmentCount; i++)
        {
            final double angle = deltaAngle * i;
            final double x = lastX + (radius * Math.sin(angle));
            final double y = factor * radius * (1.0 - Math.cos(angle));
            path.lineTo(x, y);
            myLastX = x;
            myLastY = y;
        }

        return new Point(toInt(myLastX), toInt(myLastY));
    }
}
