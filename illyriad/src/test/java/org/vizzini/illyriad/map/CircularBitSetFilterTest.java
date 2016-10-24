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
 * Provides tests for the <code>CircularBitSetFilter</code> class.
 */
public final class CircularBitSetFilterTest
{
    /** Geospatial ID converter. */
    private final GeoIdConverter converter = new GeoIdConverter(true);

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filterExclusive()
    {
        // Setup.
        final BitSet townLocations = new BitSet();
        townLocations.set(1);
        final int radius = 10;
        final boolean isInclusive = false;
        final CircularBitSetFilter filter = new CircularBitSetFilter(converter, townLocations, radius, isInclusive,
                new HashMap<Integer, BitSet>());
        final BitSet locations = new BitSet();
        locations.set(11);
        locations.set(12);
        locations.set(8 + (8 * GeoIdConverter.X_COORD_RANGE));
        locations.set(1 + (10 * GeoIdConverter.X_COORD_RANGE));
        locations.set(1 + (11 * GeoIdConverter.X_COORD_RANGE));
        assertThat(locations.cardinality(), is(5));

        // Run.
        final BitSet result = filter.filter(locations);

        // Verify.
        assertNotNull(result);

        // {
        // int count = 0;
        // for (int i = result.nextSetBit(0); i >= 0; i = result.nextSetBit(i + 1))
        // {
        // System.out.println("result" + (count++) + " = " + i);
        // }
        // }

        assertThat(result.cardinality(), is(3));
        assertThat(result.nextSetBit(0), is(12));
        assertThat(result.nextSetBit(13), is(16016));
        assertThat(result.nextSetBit(16017), is(22012));
    }

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filterInclusive()
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
        final boolean isInclusive = true;
        final Map<Integer, BitSet> nearbyPointsOfInterest = new HashMap<Integer, BitSet>();
        final CircularBitSetFilter filter = new CircularBitSetFilter(converter, thingSquares, radius, isInclusive,
                nearbyPointsOfInterest);
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
