package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.InputStreamReader;
import java.io.Reader;

import org.junit.Test;
import org.vizzini.illyriad.FileUtilities;

/**
 * Provides tests for the <code>DefaultTownDatabase</code> class.
 */
public final class DefaultTownDatabaseTest
{
    /** Geospatial ID converter. */
    private static final GeoIdConverter CONVERTER_BL = new GeoIdConverter(false);

    /** Geospatial ID converter. */
    private static final GeoIdConverter CONVERTER_ELGEA = new GeoIdConverter(true);

    /**
     * Test the <code>DefaultTownDatabase()</code> method.
     */
    @Test
    public void testConstructorBrokenLands()
    {
        // Setup.
        Reader townsDataReader = null;

        try
        {
            townsDataReader = new InputStreamReader(DefaultTownDatabase.class.getClassLoader().getResourceAsStream(
                    "mapData/datafile_towns.xml"));

            final TownDatabase database = new DefaultTownDatabase(CONVERTER_BL, townsDataReader);

            verifyDatabaseBrokenLands(database);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(townsDataReader);
        }
    }

    /**
     * Test the <code>DefaultTownDatabase()</code> method.
     */
    @Test
    public void testConstructorElgea()
    {
        // Setup.
        Reader townsDataReader = null;

        try
        {
            townsDataReader = new InputStreamReader(DefaultTownDatabase.class.getClassLoader().getResourceAsStream(
                    "mapData/datafile_towns.xml"));

            final TownDatabase database = new DefaultTownDatabase(CONVERTER_ELGEA, townsDataReader);

            verifyDatabaseElgea(database);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(townsDataReader);
        }
    }

    /**
     * Test the <code>DefaultTownDatabase()</code> method.
     */
    @Test
    public void testConstructorElgeaNull()
    {
        // Setup.
        final Reader townsDataReader = new InputStreamReader(DefaultTownDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/datafile_towns.xml"));

        // Run/Verify.
        try
        {
            new DefaultTownDatabase(null, townsDataReader);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }

        // Run/Verify.
        try
        {
            new DefaultTownDatabase(CONVERTER_ELGEA, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("townsDataReader is null"));
        }
    }

    /**
     * Test the <code>DefaultTownDatabase()</code> method.
     */
    @Test
    public void testConstructorTwoArgElgea()
    {
        // Run.
        final TownDatabase database = new DefaultTownDatabase(CONVERTER_ELGEA);

        // Verify.
        verifyDatabaseElgea(database);
    }

    /**
     * @param database Database.
     */
    private void verifyDatabaseBrokenLands(final TownDatabase database)
    {
        assertNotNull(database);

        System.out.println("database = " + database);

        assertThat(database.getTownSquares().cardinality(), is(401));

        {
            final int index = CONVERTER_BL.coordsToIndex(764, -2491);
            assertTrue(database.getTownSquares().get(index));
        }
    }

    /**
     * @param database Database.
     */
    private void verifyDatabaseElgea(final TownDatabase database)
    {
        assertNotNull(database);

        System.out.println("database = " + database);

        assertThat(database.getTownSquares().cardinality(), is(24092));

        {
            final int index = CONVERTER_ELGEA.coordsToIndex(-522, -482);
            assertTrue(database.getTownSquares().get(index));
        }
    }
}
