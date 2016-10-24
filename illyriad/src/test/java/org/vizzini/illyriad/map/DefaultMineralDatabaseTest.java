package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.io.InputStreamReader;
import java.io.Reader;

import org.junit.Test;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.Mineral;

/**
 * Provides tests for the <code>DefaultMineralDatabase</code> class.
 */
public final class DefaultMineralDatabaseTest
{
    /** Geospatial ID converter. */
    private static final GeoIdConverter CONVERTER_ELGEA = new GeoIdConverter(true);

    /** Converter. */
    private static final GeoIdConverter CONVERTER_BL = new GeoIdConverter(false);

    /**
     * Test the <code>MineralDatabase()</code> method.
     */
    @Test
    public void testConstructorBrokenLands()
    {
        // Setup.
        Reader mineralDataReader = null;

        // Run / Verify.
        try
        {
            mineralDataReader = new InputStreamReader(MineralDatabase.class.getClassLoader().getResourceAsStream(
                    "mapData/brokenLands/datafile_rare_minerals.txt"));

            final MineralDatabase database = new DefaultMineralDatabase(CONVERTER_BL, mineralDataReader);

            verifyDatabaseBrokenLands(database);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(mineralDataReader);
        }
    }

    /**
     * Test the <code>DefaultMineralDatabase()</code> method.
     */
    @Test
    public void testConstructorBrokenLandsNull()
    {
        // Setup.
        final Reader mineralDataReader = new InputStreamReader(DefaultMineralDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/brokenLands/datafile_rare_minerals.txt"));

        // Run/Verify.
        try
        {
            new DefaultMineralDatabase(null, mineralDataReader);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }

        // Run/Verify.
        try
        {
            new DefaultMineralDatabase(CONVERTER_ELGEA, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("mineralDataReader is null"));
        }
    }

    /**
     * Test the <code>DefaultMineralDatabase()</code> method.
     */
    @Test
    public void testConstructorElgea()
    {
        // Setup.
        Reader mineralDataReader = null;

        // Run / Verify.
        try
        {
            mineralDataReader = new InputStreamReader(DefaultMineralDatabase.class.getClassLoader()
                    .getResourceAsStream("mapData/elgea/illy_gems_22.js"));

            final MineralDatabase database = new DefaultMineralDatabase(CONVERTER_ELGEA, mineralDataReader);

            verifyDatabaseElgea(database);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(mineralDataReader);
        }
    }

    /**
     * Test the <code>DefaultMineralDatabase()</code> method.
     */
    @Test
    public void testConstructorElgeaNull()
    {
        // Setup.
        final Reader mineralDataReader = new InputStreamReader(DefaultMineralDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/illy_gems_22.js"));

        // Run/Verify.
        try
        {
            new DefaultMineralDatabase(null, mineralDataReader);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }

        // Run/Verify.
        try
        {
            new DefaultMineralDatabase(CONVERTER_ELGEA, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("mineralDataReader is null"));
        }
    }

    /**
     * Test the <code>DefaultMineralDatabase()</code> method.
     */
    @Test
    public void testConstructorTwoArgBrokenLands()
    {
        // Run.
        final MineralDatabase database = new DefaultMineralDatabase(CONVERTER_BL);

        // Verify.
        verifyDatabaseBrokenLands(database);
    }

    /**
     * Test the <code>DefaultMineralDatabase()</code> method.
     */
    @Test
    public void testConstructorTwoArgElgea()
    {
        // Run.
        final MineralDatabase database = new DefaultMineralDatabase(CONVERTER_ELGEA);

        // Verify.
        verifyDatabaseElgea(database);
    }

    /**
     * @param database Database.
     */
    private void verifyDatabaseBrokenLands(final MineralDatabase database)
    {
        assertNotNull(database);

        assertThat(database.getAllMineralSquares().cardinality(), is(432));

        {
            final int index = CONVERTER_BL.coordsToIndex(204, -3172);
            assertThat(database.findMineralFor(index, false), is(Mineral.UNKNOWN));
            assertThat(database.getMineralAmount(index), is(0));
        }

        {
            final int index = CONVERTER_BL.coordsToIndex(199, -2102);
            assertThat(database.findMineralFor(index, false), is(Mineral.TROVE));
            assertThat(database.getMineralAmount(index), is(7));
        }

        {
            // From Nesse's list.
            final int index = CONVERTER_BL.coordsToIndex(-462, -1335);
            assertThat(database.findMineralFor(index, false), is(Mineral.CLARISTRINE));
            assertThat(database.getMineralAmount(index), is(16));
        }

        {
            // From Nesse's list.
            final int index = CONVERTER_BL.coordsToIndex(-609, -3300);
            assertThat(database.findMineralFor(index, false), is(Mineral.ICEHEART));
            assertThat(database.getMineralAmount(index), is(80));
        }

        {
            // From the spreadsheet.
            final int index = CONVERTER_BL.coordsToIndex(-624, -2608);
            assertThat(database.findMineralFor(index, false), is(Mineral.UNKNOWN));
            assertThat(database.getMineralAmount(index), is(0));
        }

        {
            // From the spreadsheet.
            final int index = CONVERTER_BL.coordsToIndex(639, -2008);
            assertThat(database.findMineralFor(index, false), is(Mineral.ALMHURIN));
            assertThat(database.getMineralAmount(index), is(1));
        }
    }

    /**
     * @param database Database.
     */
    private void verifyDatabaseElgea(final MineralDatabase database)
    {
        assertNotNull(database);

        assertThat(database.getAllMineralSquares().cardinality(), is(1709));

        {
            final int index = CONVERTER_ELGEA.coordsToIndex(-132, -174);
            assertThat(database.findMineralFor(index, false), is(Mineral.EARTHBLOOD));
        }

        {
            final int index = CONVERTER_ELGEA.coordsToIndex(138, 977);
            assertThat(database.findMineralFor(index, false), is(Mineral.RAINBOWSTONE));
        }
    }
}
