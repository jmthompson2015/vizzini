package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.BitSet;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

/**
 * Provides tests for the <code>ThingCloseFilter</code> class.
 */
public final class ThingCloseFilterTest
{
    /** Geospatial ID converter. */
    private final GeoIdConverter converter = new GeoIdConverter(true);

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter()
    {
        // Setup.
        final BitSet thingSquares = new BitSet();
        thingSquares.set(1);
        thingSquares.set(22);
        thingSquares.set(1 + (21 * GeoIdConverter.X_COORD_RANGE)); // 42022

        // {
        // int count = 0;
        // for (int i = thingSquares.nextSetBit(0); i >= 0; i = thingSquares.nextSetBit(i + 1))
        // {
        // System.out.println("thingSquare" + (count++) + " = " + i);
        // }
        // }

        final int radius = 10;
        final Map<Integer, BitSet> nearbyPointsOfInterest = new HashMap<Integer, BitSet>();
        final ThingCloseFilter filter = new ThingCloseFilter(converter, thingSquares, radius, nearbyPointsOfInterest);
        final BitSet squares = new BitSet();
        squares.set(11);
        squares.set(12);
        squares.set(7 + (7 * GeoIdConverter.X_COORD_RANGE)); // 14014
        squares.set(8 + (8 * GeoIdConverter.X_COORD_RANGE)); // 16016
        squares.set(1 + (10 * GeoIdConverter.X_COORD_RANGE)); // 20011
        squares.set(1 + (11 * GeoIdConverter.X_COORD_RANGE)); // 22012
        assertThat(squares.cardinality(), is(6));

        // {
        // int count = 0;
        // for (int i = squares.nextSetBit(0); i >= 0; i = squares.nextSetBit(i + 1))
        // {
        // System.out.println("square" + (count++) + " = " + i);
        // }
        // }

        // Run.
        final BitSet result = filter.filter(squares);

        // Verify.
        assertNotNull(result);
        assertThat(result.cardinality(), is(5));
        assertThat(result.nextSetBit(0), is(11));
        assertThat(result.nextSetBit(12), is(12));
        assertThat(result.nextSetBit(13), is(14014));
        assertThat(result.nextSetBit(14015), is(20011));
        assertThat(result.nextSetBit(20012), is(22012));

        assertThat(nearbyPointsOfInterest.size(), is(5));

        // for (final Entry<Integer, BitSet> entry : nearbyPointsOfInterest.entrySet())
        // {
        // System.out.println(entry.getKey() + ": " + entry.getValue());
        // }

        assertTrue(nearbyPointsOfInterest.get(11).get(1));
        assertTrue(nearbyPointsOfInterest.get(12).get(22));
        assertTrue(nearbyPointsOfInterest.get(14014).get(1));
        assertTrue(nearbyPointsOfInterest.get(20011).get(1));
        assertTrue(nearbyPointsOfInterest.get(22012).get(42022));
    }
}
