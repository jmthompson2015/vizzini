package org.vizzini.illyriad.map;

import java.awt.Point;
import java.util.BitSet;
import java.util.Map;

import org.vizzini.core.TimePrinter;

/**
 * Provides an implementation of a bit set filter which is circular.
 */
public final class CircularBitSetFilter implements BitSetFilter
{
    /** Geospatial ID converter. */
    private final GeoIdConverter converter;

    /** Flag indicating if things are included or excluded from the circular region. */
    private final boolean isInclusive;

    /** Map of index to nearby points of interest. */
    private final Map<Integer, BitSet> nearbyPointsOfInterest;

    /** Radius. */
    private final int radius;

    /** Radius squared. */
    private final int radiusSquared;

    /** Thing squares. */
    private final BitSet thingSquares;

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     * @param thingSquares Thing squares.
     * @param radius Radius.
     * @param isInclusive Flag indicating if things are included or excluded from the circular region.
     * @param nearbyPointsOfInterest Nearby points of interest.
     */
    @SuppressWarnings("hiding")
    public CircularBitSetFilter(final GeoIdConverter converter, final BitSet thingSquares, final int radius,
            final boolean isInclusive, final Map<Integer, BitSet> nearbyPointsOfInterest)
    {
        this.converter = converter;
        this.thingSquares = thingSquares;
        this.radius = radius;
        this.isInclusive = isInclusive;
        this.nearbyPointsOfInterest = nearbyPointsOfInterest;

        this.radiusSquared = radius * radius;
    }

    /**
     * @param index Geospatial index.
     * 
     * @return a new circular bit set centered at the given parameter.
     */
    public BitSet createFilter(final int index)
    {
        final Point origin = converter.indexToPoint(index);

        final BitSet answer = new BitSet();

        for (int y = -radius; y <= radius; y++)
        {
            for (int x = -radius; x <= radius; x++)
            {
                if (((x * x) + (y * y)) <= radiusSquared)
                {
                    final int xx = origin.x + x;
                    final int yy = origin.y + y;

                    if (converter.isCoordsInRange(xx, yy))
                    {
                        answer.set(converter.coordsToIndex(xx, yy));
                    }
                }
            }
        }

        answer.clear(converter.pointToIndex(origin));

        return answer;
    }

    @Override
    public BitSet filter(final BitSet squares)
    {
        return filter(squares, true);
    }

    @Override
    public BitSet filter(final BitSet squares, final boolean isVerbose)
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = new BitSet();

        for (int i = squares.nextSetBit(0); i >= 0; i = squares.nextSetBit(i + 1))
        {
            if (!isInclusive)
            {
                answer.set(i);
            }

            final BitSet mask = createFilter(i);

            mask.and(thingSquares);

            if (!mask.isEmpty())
            {
                if (isInclusive)
                {
                    answer.set(i);
                    nearbyPointsOfInterest.put(i, mask);
                }
                else
                {
                    answer.clear(i);
                }
            }
        }

        if (isVerbose)
        {
            final long end = System.currentTimeMillis();
            new TimePrinter().printElapsedTime("CircularBitSetFilter.filter() cardinality = " + answer.cardinality(),
                    start, end);
        }

        return answer;
    }
}
