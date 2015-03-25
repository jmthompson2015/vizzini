package org.vizzini.starfightersquadrons;

import java.awt.Polygon;
import java.awt.Rectangle;
import java.awt.geom.AffineTransform;
import java.awt.geom.PathIterator;

import org.vizzini.core.InputValidator;

/**
 * Provides an enumeration of ship bases for Starfighter Squadrons.
 */
public enum ShipBase
{
    /** Ship base. */
    STANDARD(40, 40),
    /** Ship base. */
    LARGE(80, 80),
    /** Ship base. */
    HUGE1(195, 80),
    /** Ship base. */
    HUGE2(225, 80);

    /** Rectangle. */
    private final Rectangle rectangle;

    /**
     * Construct this object.
     *
     * @param width Width.
     * @param height Height.
     */
    private ShipBase(final int width, final int height)
    {
        final int x = -width / 2;
        final int y = -height / 2;
        rectangle = new Rectangle(x, y, width, height);
    }

    /**
     * @param heading Heading. (deg)
     *
     * @return the polygon representing this base at the given position. The first point is port-forward, the second
     *         point is starboard-forward.
     */
    public Polygon computePolygon(final int heading)
    {
        return computePolygon(heading, 0);
    }

    /**
     * @param heading Heading. (deg)
     * @param offset Offset.
     *
     * @return the polygon representing this base at the given position. The first point is port-forward, the second
     *         point is starboard-forward.
     */
    public Polygon computePolygon(final int heading, final int offset)
    {
        final Polygon answer = new Polygon();

        final AffineTransform affineTransform = new AffineTransform();
        affineTransform.rotate(Math.toRadians(heading));

        final double[] coords = new double[6];

        for (final PathIterator iter = getRectangle(offset).getPathIterator(affineTransform); !iter.isDone(); iter
                .next())
        {
            final int type = iter.currentSegment(coords);

            if ((type == PathIterator.SEG_MOVETO) || (type == PathIterator.SEG_LINETO))
            {
                answer.addPoint(toInt(coords[0]), toInt(coords[1]));
            }
        }

        return answer;
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param heading Heading. (deg)
     *
     * @return the polygon representing this base at the given position. The first point is port-forward, the second
     *         point is starboard-forward.
     */
    public Polygon computePolygon(final int x, final int y, final int heading)
    {
        return computePolygon(x, y, heading, 0);
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param heading Heading. (deg)
     * @param offset Offset.
     *
     * @return the polygon representing this base at the given position. The first point is port-forward, the second
     *         point is starboard-forward.
     */
    public Polygon computePolygon(final int x, final int y, final int heading, final int offset)
    {
        final Polygon answer = computePolygon(heading, offset);

        answer.translate(x, y);

        return answer;
    }

    /**
     * @param position Position.
     *
     * @return the polygon representing this base at the given position. The first point is port-forward, the second
     *         point is starboard-forward.
     */
    public Polygon computePolygon(final SSPosition position)
    {
        InputValidator.validateNotNull("position", position);

        final int x = position.getX();
        final int y = position.getY();
        final int heading = position.getHeading();

        return computePolygon(x, y, heading);
    }

    /**
     * @param position Position.
     * @param offset Offset.
     *
     * @return the polygon representing this base at the given position. The first point is port-forward, the second
     *         point is starboard-forward.
     */
    public Polygon computePolygon(final SSPosition position, final int offset)
    {
        InputValidator.validateNotNull("position", position);

        final int x = position.getX();
        final int y = position.getY();
        final int heading = position.getHeading();

        return computePolygon(x, y, heading, offset);
    }

    /**
     * @return the rectangle
     */
    public Rectangle getRectangle()
    {
        return rectangle;
    }

    /**
     * @param offset Offset.
     *
     * @return the rectangle
     */
    public Rectangle getRectangle(final int offset)
    {
        Rectangle answer;

        if (offset == 0)
        {
            answer = rectangle;
        }
        else
        {
            final int width = rectangle.width + (2 * offset);
            final int height = rectangle.height + (2 * offset);
            final int x = -width / 2;
            final int y = -height / 2;
            answer = new Rectangle(x, y, width, height);
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
