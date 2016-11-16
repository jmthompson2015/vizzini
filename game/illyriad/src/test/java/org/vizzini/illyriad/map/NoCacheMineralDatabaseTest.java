package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.illyriad.Mineral;

/**
 * Provides tests for the <code>NoCacheMineralDatabase</code> class.
 */
public final class NoCacheMineralDatabaseTest
{
    /** Geospatial ID converter. */
    private static final GeoIdConverter converter = new GeoIdConverter(true);

    /**
     * Test the <code>MineralDatabase()</code> method.
     */
    @Test
    public void testConstructorBrokenLands()
    {
        // Run / Verify.
        final MineralDatabase database = new NoCacheMineralDatabase(converter);

        verifyDatabaseBrokenLands(database);
    }

    /**
     * Test the <code>NoCacheMineralDatabase()</code> method.
     */
    @Test
    public void testConstructorBrokenLandsNull()
    {
        // Run/Verify.
        try
        {
            new NoCacheMineralDatabase(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }
    }

    /**
     * Test the <code>NoCacheMineralDatabase()</code> method.
     */
    @Test
    public void testConstructorElgea()
    {
        final MineralDatabase database = new NoCacheMineralDatabase(converter);

        verifyDatabaseElgea(database);
    }

    /**
     * Test the <code>NoCacheMineralDatabase()</code> method.
     */
    @Test
    public void testConstructorElgeaNull()
    {
        // Run/Verify.
        try
        {
            new NoCacheMineralDatabase(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }
    }

    /**
     * Test the <code>NoCacheMineralDatabase()</code> method.
     */
    @Test
    public void testConstructorTwoArgBrokenLands()
    {
        // Run.
        final MineralDatabase database = new NoCacheMineralDatabase(converter);

        // Verify.
        verifyDatabaseBrokenLands(database);
    }

    /**
     * Test the <code>NoCacheMineralDatabase()</code> method.
     */
    @Test
    public void testConstructorTwoArgElgea()
    {
        // Run.
        final MineralDatabase database = new NoCacheMineralDatabase(converter);

        // Verify.
        verifyDatabaseElgea(database);
    }

    /**
     * @param database Database.
     */
    private void verifyDatabaseBrokenLands(final MineralDatabase database)
    {
        assertNotNull(database);

        assertThat(database.getMineralSquares(Mineral.SILVERSTEEL).cardinality(), is(0));
        assertThat(database.getAllMineralSquares().cardinality(), is(63));

        final boolean isVerbose = false;

        {
            final int index = converter.coordsToIndex(204, -3172);
            assertThat(database.findMineralFor(index, isVerbose), is(Mineral.UNKNOWN));
        }

        {
            final int index = converter.coordsToIndex(199, -2102);
            assertThat(database.findMineralFor(index, isVerbose), is(Mineral.UNKNOWN));
        }
    }

    /**
     * @param database Database.
     */
    private void verifyDatabaseElgea(final MineralDatabase database)
    {
        assertNotNull(database);

        assertThat(database.getMineralSquares(Mineral.SILVERSTEEL).cardinality(), is(5));
        assertThat(database.getAllMineralSquares().cardinality(), is(1709));

        final boolean isVerbose = false;

        {
            final int index = converter.coordsToIndex(-132, -174);
            assertThat(database.findMineralFor(index, isVerbose), is(Mineral.EARTHBLOOD));
        }

        {
            final int index = converter.coordsToIndex(138, 977);
            assertThat(database.findMineralFor(index, isVerbose), is(Mineral.RAINBOWSTONE));
        }
    }
}
