package org.vizzini.illyriad.map;

import java.awt.Point;

/**
 * Provides a converter between a geospatial index and X, Y coordinates. For Elgea, index zero is SW (-1000, -1000)
 * (left bottom). For Broken Lands, index zero is SW (-1000, -3300) (left bottom).
 */
public final class GeoIdConverter
{
    /** Maximum X coordinate value. */
    public static final int MAX_X_COORD = 1000;

    /** Minimum index value. */
    public static final int MIN_INDEX = 0;

    /** Minimum X coordinate value. */
    public static final int MIN_X_COORD = -1000;

    /** X coordinate range. */
    public static final int X_COORD_RANGE = (MAX_X_COORD - MIN_X_COORD) + 1;

    /** Y coordinate range. */
    public static final int Y_COORD_RANGE = 2001;

    /** Square count. */
    private static final int SQUARE_COUNT = X_COORD_RANGE * Y_COORD_RANGE;

    /** Maximum index value. */
    public static final int MAX_INDEX = SQUARE_COUNT - 1;

    /** Flag indicating if this data is for Elgea. */
    private final boolean isElgea;

    /** Maximum Y coordinate. */
    private final int maxY;

    /** Minimum Y coordinate. */
    private final int minY;

    /**
     * Construct this object.
     * 
     * @param isElgea Flag indicating if this data is for Elgea.
     */
    @SuppressWarnings("hiding")
    public GeoIdConverter(final boolean isElgea)
    {
        this.isElgea = isElgea;

        if (isElgea)
        {
            minY = -1000;
            maxY = 1000;
        }
        else
        {
            minY = -3300;
            maxY = -1300;
        }
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return the geospatial ID for the given parameter.
     */
    public int coordsToIndex(final int x, final int y)
    {
        if (!isCoordsInRange(x, y))
        {
            throw new IllegalArgumentException("(x,y) = (" + x + "," + y + ") is out of range ([" + MIN_X_COORD + ", "
                    + MAX_X_COORD + "], [" + minY + ", " + maxY + "])");
        }

        final int myX = x - MIN_X_COORD;
        final int myY = y - minY;

        return (myY * X_COORD_RANGE) + myX;
    }

    /**
     * @return the maxY
     */
    public int getMaxY()
    {
        return maxY;
    }

    /**
     * @return the minY
     */
    public int getMinY()
    {
        return minY;
    }

    /**
     * @param index Index.
     * 
     * @return the point for the given parameter.
     */
    public Point indexToPoint(final int index)
    {
        if (!isIndexInRange(index))
        {
            throw new IllegalArgumentException("index = " + index + " is out of range [" + MIN_INDEX + ", " + MAX_INDEX
                    + "]");
        }

        final int y = Math.round(index / X_COORD_RANGE);
        final int x = index - (y * X_COORD_RANGE);

        return new Point(x + MIN_X_COORD, y + minY);
    }

    /**
     * @return the isBrokenLands
     */
    public boolean isBrokenLands()
    {
        return !isElgea();
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return true if the given parameters are on the map.
     */
    public boolean isCoordsInRange(final int x, final int y)
    {
        return (MIN_X_COORD <= x) && (x <= MAX_X_COORD) && (minY <= y) && (y <= maxY);
    }

    /**
     * @return the isElgea
     */
    public boolean isElgea()
    {
        return isElgea;
    }

    /**
     * @param index Index.
     * 
     * @return true if the given parameter is on the map.
     */
    public boolean isIndexInRange(final int index)
    {
        return (MIN_INDEX <= index) && (index <= MAX_INDEX);
    }

    /**
     * @param point Point.
     * 
     * @return true if the given parameters are on the map.
     */
    public boolean isPointInRange(final Point point)
    {
        return isCoordsInRange(point.x, point.y);
    }

    /**
     * @param point Point.
     * 
     * @return the index for the given parameter.
     */
    public int pointToIndex(final Point point)
    {
        return coordsToIndex(point.x, point.y);
    }
}
