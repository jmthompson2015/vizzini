package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.util.BitSet;

import org.junit.Test;

/**
 * Provides tests for the <code>SweetspotFinder</code> class.
 */
public final class SweetspotFinderTest
{
    /** Geo ID converter. */
    private static final GeoIdConverter converter = new GeoIdConverter(true);

    /** Town database. */
    private static final TownDatabase townDatabase = new DefaultTownDatabase(converter);

    /** Mineral database. */
    private static final MineralDatabase mineralDatabase = new DefaultMineralDatabase(converter);

    /** World map database. */
    private static final WorldMapDatabase worldMapDatabase = new FastWorldMapDatabase(converter);

    /**
     * Test the <code>search()</code> method.
     */
    @Test
    public void search()
    {
        // Setup.
        final SweetspotFinder finder = new SweetspotFinder(converter, worldMapDatabase, mineralDatabase, townDatabase);
        finder.setSevenFood(true);
        finder.setFiveWood(true);
        finder.setNoTownTooClose(true);
        finder.setNoTownTooCloseRadius(10);
        finder.setHighFoodClose(true);
        finder.setHighFoodRadius(3);
        finder.setMineralClose(true);
        finder.setMineralRadius(10);

        // Run.
        final BitSet squares = finder.search();

        // Verify.
        assertNotNull(squares);
        assertThat(squares.cardinality(), is(2098));
    }
}
