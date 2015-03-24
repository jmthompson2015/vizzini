package org.vizzini.illyriad.map;

import java.util.BitSet;
import java.util.HashMap;
import java.util.Map;

import org.vizzini.core.TimePrinter;

/**
 * Provides an implementation of a bit set filter for thing squares.
 */
public final class ThingCloseFilter implements BitSetFilter
{
    /** Delegate. */
    private final CircularBitSetFilter delegate;

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     * @param thingSquares Thing squares.
     * @param radius Radius.
     */
    public ThingCloseFilter(final GeoIdConverter converter, final BitSet thingSquares, final int radius)
    {
        this(converter, thingSquares, radius, new HashMap<Integer, BitSet>());
    }

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     * @param thingSquares Thing squares.
     * @param radius Radius.
     * @param nearbyPointsOfInterest Nearby points of interest.
     */
    public ThingCloseFilter(final GeoIdConverter converter, final BitSet thingSquares, final int radius,
            final Map<Integer, BitSet> nearbyPointsOfInterest)
    {
        final boolean isInclusive = true;
        delegate = new CircularBitSetFilter(converter, thingSquares, radius, isInclusive, nearbyPointsOfInterest);
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

        final BitSet answer = delegate.filter(squares, false);

        if (isVerbose)
        {
            final long end = System.currentTimeMillis();
            new TimePrinter().printElapsedTime("ThingCloseFilter.filter() cardinality = " + answer.cardinality(),
                    start, end);
        }

        return answer;
    }
}
