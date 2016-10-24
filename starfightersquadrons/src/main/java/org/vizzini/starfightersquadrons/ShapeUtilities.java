package org.vizzini.starfightersquadrons;

import java.awt.Shape;
import java.awt.geom.Area;
import java.awt.geom.PathIterator;
import java.awt.geom.Point2D;
import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.vizzini.core.InputValidator;

/**
 * Provides utility methods for dealing with <code>Shape</code>s.
 */
public final class ShapeUtilities
{
    /**
     * @param shape Shape.
     * 
     * @return a list of the points in the shape.
     */
    public List<Point2D> asList(final Shape shape)
    {
        InputValidator.validateNotNull("shape", shape);

        final List<Point2D> answer = new ArrayList<Point2D>();

        final double[] coords = new double[6];

        for (final PathIterator iter = shape.getPathIterator(null); !iter.isDone(); iter.next())
        {
            iter.currentSegment(coords);
            answer.add(new Point2D.Double(coords[0], coords[1]));
        }

        return answer;
    }

    /**
     * @param x1 First X coordinate.
     * @param y1 First Y coordinate.
     * @param x2 Second X coordinate.
     * @param y2 Second Y coordinate.
     * 
     * @return the distance between the points.
     */
    public double computeDistance(final double x1, final double y1, final double x2, final double y2)
    {
        return Math.sqrt(computeDistanceSquared(x1, y1, x2, y2));
    }

    /**
     * @param x1 First X coordinate.
     * @param y1 First Y coordinate.
     * @param x2 Second X coordinate.
     * @param y2 Second Y coordinate.
     * 
     * @return the distance squared between the points.
     */
    public double computeDistanceSquared(final double x1, final double y1, final double x2, final double y2)
    {
        final double dx = x2 - x1;
        final double dy = y2 - y1;

        return (dx * dx) + (dy * dy);
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param x1 Line segment X coordinate.
     * @param y1 Line segment Y coordinate.
     * @param x2 Line segment X coordinate.
     * @param y2 Line segment Y coordinate.
     * 
     * @return the minimum distance between a point and a line segment.
     * 
     * @see <a href="http://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment">
     *      Shortest distance between a point and a line segment</a>
     */
    public double computeMinimumDistance(final double x, final double y, final double x1, final double y1,
            final double x2, final double y2)
    {
        double answer = -1;

        // p = (x, y)
        // v = (x1, y1)
        // w = (x2, y2)

        // i.e. |w-v|^2 - avoid a sqrt
        final double l2 = computeDistanceSquared(x1, y1, x2, y2);

        // v == w case
        if (l2 == 0.0)
        {
            answer = computeDistance(x, y, x1, y1);
        }
        else
        {
            // Consider the line extending the segment, parameterized as v + t (w - v).
            // We find projection of point p onto the line.
            // It falls where t = [(p-v) . (w-v)] / |w-v|^2
            final double dx1 = x - x1;
            final double dy1 = y - y1;
            final double dx2 = x2 - x1;
            final double dy2 = y2 - y1;

            final double t = ((dx1 * dx2) + (dy1 * dy2)) / l2;

            if (t < 0.0)
            {
                // Beyond the 'v' end of the segment.
                answer = computeDistance(x, y, x1, y1);
            }
            else if (t > 1.0)
            {
                // Beyond the 'w' end of the segment.
                answer = computeDistance(x, y, x2, y2);
            }
            else
            {
                // Projection falls on the segment.
                // projection = v + t * (w - v);
                final double px = x1 + (t * (x2 - x1));
                final double py = y1 + (t * (y2 - y1));
                answer = computeDistance(x, y, px, py);
            }
        }

        return answer;
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param shape Shape.
     * 
     * @return the minimum distance between the given parameters.
     */
    public double computeMinimumDistance(final double x, final double y, final Shape shape)
    {
        InputValidator.validateNotNull("shape", shape);

        double distance = Double.MAX_VALUE;

        double[] lastCoords = null;
        double[] coords = new double[6];

        for (final PathIterator iter = shape.getPathIterator(null); !iter.isDone(); iter.next())
        {
            final int type = iter.currentSegment(coords);

            if (type == PathIterator.SEG_MOVETO)
            {
                lastCoords = coords;
                coords = new double[6];
            }
            else if (type == PathIterator.SEG_LINETO)
            {
                @SuppressWarnings("null")
                final double d = computeMinimumDistance(x, y, lastCoords[0], lastCoords[1], coords[0], coords[1]);
                distance = Math.min(d, distance);

                final double[] temp = lastCoords;
                lastCoords = coords;
                coords = temp;
            }
        }

        return distance;
    }

    /**
     * @param shape1 First shape.
     * @param shape2 Second shape.
     * 
     * @return the minimum distance between the shapes.
     */
    public double computeMinimumDistance(final Shape shape1, final Shape shape2)
    {
        InputValidator.validateNotNull("shape1", shape1);
        InputValidator.validateNotNull("shape2", shape2);

        double distance = Double.MAX_VALUE;

        final double[] coords = new double[6];

        for (final PathIterator iter = shape1.getPathIterator(null); !iter.isDone(); iter.next())
        {
            iter.currentSegment(coords);

            final double d = computeMinimumDistance(coords[0], coords[1], shape2);

            distance = Math.min(d, distance);
        }

        return distance;
    }

    /**
     * A method to determine if two instances of <code>Area</code> intersect.
     * 
     * @param area1 First area.
     * @param area2 Second area.
     * 
     * @return true if the areas collide.
     */
    public boolean doAreasCollide(final Area area1, final Area area2)
    {
        InputValidator.validateNotNull("area1", area1);
        InputValidator.validateNotNull("area2", area2);

        final Area collide1 = new Area(area1);
        collide1.subtract(area2);
        boolean answer = !collide1.equals(area1);

        if (!answer)
        {
            final Area collide2 = new Area(area2);
            collide2.subtract(area1);
            answer = !collide2.equals(area2);
        }

        return answer;
    }

    /**
     * A method to determine if two instances of <code>Shape</code> intersect.
     * 
     * @param shape1 First shape.
     * @param shape2 Second shape.
     * 
     * @return true if the shapes collide.
     */
    public boolean doShapesCollide(final Shape shape1, final Shape shape2)
    {
        InputValidator.validateNotNull("shape1", shape1);
        InputValidator.validateNotNull("shape2", shape2);

        final Area area1 = new Area(shape1);
        final Area area2 = new Area(shape2);

        return doAreasCollide(area1, area2);
    }

    /**
     * @param shape Shape.
     * 
     * @return the first point in the shape.
     */
    public Point2D getFirstPoint(final Shape shape)
    {
        InputValidator.validateNotNull("shape", shape);

        Point2D answer = null;

        final double[] coords = new double[6];
        final PathIterator iter = shape.getPathIterator(null);
        iter.currentSegment(coords);
        answer = new Point2D.Double(coords[0], coords[1]);

        return answer;
    }

    /**
     * @param shape Shape.
     * 
     * @return the last point in the shape.
     */
    public Point2D getLastPoint(final Shape shape)
    {
        InputValidator.validateNotNull("shape", shape);

        Point2D answer = null;

        final double[] coords = new double[6];

        for (final PathIterator iter = shape.getPathIterator(null); !iter.isDone(); iter.next())
        {
            iter.currentSegment(coords);
            answer = new Point2D.Double(coords[0], coords[1]);
        }

        return answer;
    }

    /**
     * @param shape Shape.
     * @param index Point index.
     * 
     * @return the point in the shape at the given index.
     */
    public Point2D getPoint(final Shape shape, final int index)
    {
        InputValidator.validateNotNull("shape", shape);

        Point2D answer = null;

        int count = 0;
        final double[] coords = new double[6];

        for (final PathIterator iter = shape.getPathIterator(null); !iter.isDone(); iter.next())
        {
            iter.currentSegment(coords);

            if (count == index)
            {
                answer = new Point2D.Double(coords[0], coords[1]);
                break;
            }

            count++;
        }

        return answer;
    }

    /**
     * @param type Type.
     * 
     * @return a string description of the given type.
     */
    public String getTypeString(final int type)
    {
        String typeString = "Unknown";

        switch (type)
        {
        case PathIterator.SEG_MOVETO:
            typeString = "MOVETO";
            break;
        case PathIterator.SEG_LINETO:
            typeString = "LINETO";
            break;
        case PathIterator.SEG_CLOSE:
            typeString = "CLOSE ";
            break;
        }

        return typeString;
    }

    /**
     * @param shape Shape.
     */
    public void printPoints(final Shape shape)
    {
        InputValidator.validateNotNull("shape", shape);

        final Writer writer = new StringWriter();
        writePoints(shape, writer);

        System.out.println(writer.toString());
    }

    /**
     * @param shape Shape.
     * 
     * @return the number of points in the given shape.
     */
    public int size(final Shape shape)
    {
        InputValidator.validateNotNull("shape", shape);

        int answer = 0;

        final double[] coords = new double[6];

        for (final PathIterator iter = shape.getPathIterator(null); !iter.isDone(); iter.next())
        {
            iter.currentSegment(coords);
            answer++;
        }

        return answer;
    }

    /**
     * @param shape Shape.
     * @param writer Writer.
     */
    public void writePoints(final Shape shape, final Writer writer)
    {
        InputValidator.validateNotNull("shape", shape);
        InputValidator.validateNotNull("writer", writer);

        try
        {
            final double[] coords = new double[6];
            int count = 0;

            for (final PathIterator iter = shape.getPathIterator(null); !iter.isDone(); iter.next())
            {
                final int type = iter.currentSegment(coords);
                final String typeString = getTypeString(type);
                writer.write(String.valueOf(count));
                writer.write(" ");
                writer.write(typeString);
                writer.write(" coords = ");
                writer.write(Arrays.toString(coords));
                writer.write("\n");
                count++;
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}
