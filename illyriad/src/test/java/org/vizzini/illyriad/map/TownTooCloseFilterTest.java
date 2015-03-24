package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.BitSet;

import org.junit.Test;

/**
 * Provides tests for the <code>TownTooCloseFilter</code> class.
 */
public final class TownTooCloseFilterTest
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
        final BitSet townLocations = new BitSet();
        townLocations.set(1);
        final int radius = 10;
        final TownTooCloseFilter filter = new TownTooCloseFilter(converter, townLocations, radius);
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
        assertThat(result.cardinality(), is(3));
        assertThat(result.nextSetBit(0), is(12));
        assertThat(result.nextSetBit(13), is(16016));
        assertThat(result.nextSetBit(16017), is(22012));
    }
}
