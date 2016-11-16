package org.vizzini.illyriad.map;

import java.awt.Point;
import java.util.BitSet;

import org.vizzini.core.TimePrinter;

/**
 * Provides an implementation of a bit set filter for high food squares.
 */
public final class TownTooCloseFilter implements BitSetFilter
{
    /** Geospatial ID converter. */
    private final GeoIdConverter converter;

    /** Town locations. */
    private final BitSet townLocations;

    /** Radius. */
    private final int radius;

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     * @param townLocations Town locations.
     * @param radius Radius.
     */
    @SuppressWarnings("hiding")
    public TownTooCloseFilter(final GeoIdConverter converter, final BitSet townLocations, final int radius)
    {
        this.converter = converter;
        this.townLocations = townLocations;
        this.radius = radius;
    }

    @Override
    public BitSet filter(final BitSet locations)
    {
        return filter(locations, true);
    }

    @Override
    public BitSet filter(final BitSet locations, final boolean isVerbose)
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = new BitSet();
        final int radiusSquared = radius * radius;

        for (int i = locations.nextSetBit(0); i >= 0; i = locations.nextSetBit(i + 1))
        {
            answer.set(i);

            for (int y = -radius; y <= radius; y++)
            {
                for (int x = -radius; x <= radius; x++)
                {
                    if (((x * x) + (y * y)) <= radiusSquared)
                    {
                        final Point origin = converter.indexToPoint(i);
                        final int xx = origin.x + x;
                        final int yy = origin.y + y;

                        if (converter.isCoordsInRange(xx, yy))
                        {
                            final int index = converter.coordsToIndex(xx, yy);

                            if (townLocations.get(index))
                            {
                                answer.clear(i);
                                x = radius + 1;
                                y = radius + 1;
                            }
                        }
                    }
                }
            }
        }

        if (isVerbose)
        {
            final long end = System.currentTimeMillis();
            new TimePrinter().printElapsedTime("TownTooCloseFilter.filter() cardinality = " + answer.cardinality(),
                    start, end);
        }

        return answer;
    }

    /**
     * @return the converter
     */
    public GeoIdConverter getConverter()
    {
        return converter;
    }

    /**
     * @return the radius
     */
    public int getRadius()
    {
        return radius;
    }

    /**
     * @return the townLocations
     */
    public BitSet getTownLocations()
    {
        return townLocations;
    }
}
