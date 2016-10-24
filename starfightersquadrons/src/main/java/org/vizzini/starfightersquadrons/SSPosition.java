package org.vizzini.starfightersquadrons;

import java.awt.Polygon;
import java.awt.geom.PathIterator;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.InputValidator;
import org.vizzini.core.game.Position;

/**
 * Provides a position for Starfighter Squadrons. Heading zero is along the positive Y axis.
 * <p>
 * Small ship base is 40mm x 40mm.
 * </p>
 * <p>
 * Bearing straight, speed one maneuver is 40mm long. Other straight maneuvers are multiples of this.
 * </p>
 * <p>
 * The play area is 3 feet square, or 915 mm on a side. The coordinate system has its origin at the top left, with the
 * +X axis extending to the right and the +Y axis extending down. Angles are measure clockwise from the +X axis.
 * Coordinates are in millimeters.
 *
 * <pre>
 * (0,0)
 *   +-----> X
 *   |
 *   |
 *   v
 *   Y
 * </pre>
 *
 * </p>
 */
public final class SSPosition implements Position<Integer>
{
    /**
     * @param x1 X coordinate.
     * @param y1 Y coordinate.
     * @param x2 X coordinate.
     * @param y2 Y coordinate.
     *
     * @return the heading.
     */
    public static int computeHeading(final double x1, final double y1, final double x2, final double y2)
    {
        int answer = 0;

        final double dx = x2 - x1;
        final double dy = y2 - y1;

        answer = normalizeAngle(toInt(Math.toDegrees(Math.atan2(dy, dx))));

        return answer;
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     *
     * @return true if the point is in the play area.
     */
    public static boolean isInPlayArea(final int x, final int y)
    {
        return ((0 <= x) && (x < MAX_X)) && ((0 <= y) && (y < MAX_Y));
    }

    /**
     * @param polygon Polygon.
     *
     * @return true if all points of the polygon are in the play area.
     */
    public static boolean isInPlayArea(final Polygon polygon)
    {
        InputValidator.validateNotNull("polygon", polygon);

        boolean answer = true;

        final double[] coords = new double[6];

        for (final PathIterator iter = polygon.getPathIterator(null); !iter.isDone(); iter.next())
        {
            iter.currentSegment(coords);
            final int x = toInt(coords[0]);
            final int y = toInt(coords[1]);

            if (!SSPosition.isInPlayArea(x, y))
            {
                answer = false;
                break;
            }
        }

        return answer;
    }

    /**
     * @param angle Angle. (degrees)
     *
     * @return the angle in [0, 360)
     */
    public static int normalizeAngle(final int angle)
    {
        int answer = angle;

        while (answer < 0)
        {
            answer += 360;
        }

        answer = answer % 360;

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

    /** Maximum X coordinate value. (3 feet in mm) */
    public static final int MAX_X = 915;

    /** Maximum Y coordinate value. (3 feet in mm) */
    public static final int MAX_Y = MAX_X;

    /** Zero position. */
    public static final SSPosition ZERO = new SSPosition(0, 0, 0);

    /** Heading. (degrees) */
    private final int heading;

    /** X coordinate. (mm) */
    private final int x;

    /** Y coordinate. (mm) */
    private final int y;

    /**
     * Construct this object.
     *
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param heading Heading.
     */
    @SuppressWarnings("hiding")
    public SSPosition(final int x, final int y, final int heading)
    {
        if ((x < 0) || (MAX_X <= x))
        {
            throw new IndexOutOfBoundsException("X out of bounds [0, " + MAX_X + "): " + x);
        }

        if ((y < 0) || (MAX_Y <= y))
        {
            throw new IndexOutOfBoundsException("Y out of bounds [0, " + MAX_Y + "): " + y);
        }

        this.x = x;
        this.y = y;
        this.heading = normalizeAngle(heading);
    }

    /**
     * @param x2 X coordinate.
     * @param y2 Y coordinate.
     *
     * @return the bearing to the given position.
     */
    public int computeBearing(final double x2, final double y2)
    {
        int answer = computeHeading(x, y, x2, y2);
        answer -= heading;
        answer = normalizeAngle(answer);

        return answer;
    }

    /**
     * @param position Position.
     *
     * @return the bearing to the given position.
     */
    public int computeBearing(final SSPosition position)
    {
        InputValidator.validateNotNull("position", position);

        return computeBearing(position.getX(), position.getY());
    }

    /**
     * @param position Position.
     *
     * @return the distance from this to the given position.
     */
    public int computeDistance(final SSPosition position)
    {
        InputValidator.validateNotNull("position", position);

        final int dx = position.getX() - x;
        final int dy = position.getY() - y;

        return toInt(Math.sqrt((dx * dx) + (dy * dy)));
    }

    /**
     * @return the heading
     */
    public int getHeading()
    {
        return heading;
    }

    @Override
    public Integer getX()
    {
        return x;
    }

    @Override
    public Integer getY()
    {
        return y;
    }

    @Override
    public Integer getZ()
    {
        return 0;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
