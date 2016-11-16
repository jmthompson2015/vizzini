package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.io.InputStreamReader;
import java.io.Reader;

import org.junit.Test;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.Region;

/**
 * Provides tests for the <code>DefaultWorldMapDatabase</code> class.
 */
public final class DefaultWorldMapDatabaseTest
{
    /** Geospatial ID converter. */
    private static final GeoIdConverter CONVERTER_BL = new GeoIdConverter(false);

    /** Geospatial ID converter. */
    private static final GeoIdConverter CONVERTER_ELGEA = new GeoIdConverter(true);

    /**
     * Test the <code>WorldMapDatabase()</code> method.
     */
    @Test
    public void testConstructorBrokenLands()
    {
        Reader worldmapDataReader = null;

        try
        {
            worldmapDataReader = new InputStreamReader(DefaultWorldMapDatabase.class.getClassLoader()
                    .getResourceAsStream("mapData/datafile_worldmap.txt"));

            final WorldMapDatabase database = new DefaultWorldMapDatabase(CONVERTER_BL, worldmapDataReader);

            verifyDatabaseBrokenLands(database);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(worldmapDataReader);
        }
    }

    /**
     * Test the <code>WorldMapDatabase()</code> method.
     */
    @Test
    public void testConstructorBrokenLandsNull()
    {
        // Run/Verify.
        try
        {
            new DefaultWorldMapDatabase(CONVERTER_BL, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("worldmapDataReader is null"));
        }
    }

    /**
     * Test the <code>WorldMapDatabase()</code> method.
     */
    @Test
    public void testConstructorElgea()
    {
        Reader worldmapDataReader = null;

        try
        {
            worldmapDataReader = new InputStreamReader(DefaultWorldMapDatabase.class.getClassLoader()
                    .getResourceAsStream("mapData/datafile_worldmap.txt"));

            final WorldMapDatabase database = new DefaultWorldMapDatabase(CONVERTER_ELGEA, worldmapDataReader);

            verifyDatabaseElgea(database);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(worldmapDataReader);
        }
    }

    /**
     * Test the <code>WorldMapDatabase()</code> method.
     */
    @Test
    public void testConstructorElgeaNull()
    {
        // Run/Verify.
        try
        {
            new DefaultWorldMapDatabase(CONVERTER_ELGEA, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("worldmapDataReader is null"));
        }
    }

    /**
     * Test the <code>WorldMapDatabase()</code> method.
     */
    @Test
    public void testConstructorOneArgBrokenLands()
    {
        // Run.
        final WorldMapDatabase database = new DefaultWorldMapDatabase(CONVERTER_BL);

        // Verify.
        verifyDatabaseBrokenLands(database);
    }

    /**
     * Test the <code>WorldMapDatabase()</code> method.
     */
    @Test
    public void testConstructorOneArgElgea()
    {
        // Run.
        final WorldMapDatabase database = new DefaultWorldMapDatabase(CONVERTER_ELGEA);

        // Verify.
        verifyDatabaseElgea(database);
    }

    /**
     * @param database Database.
     */
    private void verifyDatabaseBrokenLands(final WorldMapDatabase database)
    {
        assertNotNull(database);

        // System.out.println("Broken Lands");
        // System.out.println("getEightFoodSquares() = " + database.getEightFoodSquares().cardinality());
        // System.out.println("getFiveWoodSquares() = " + database.getFiveWoodSquares().cardinality());
        // System.out.println("getHighFoodSquares() = " + database.getHighFoodSquares().cardinality());
        // System.out.println("getSevenFoodSquares() = " + database.getSevenFoodSquares().cardinality());
        // System.out.println("getTradeHubSquares() = " + database.getTradeHubSquares().cardinality());

        assertThat(database.getEightFoodSquares().cardinality(), is(12340));
        assertThat(database.getFiveWoodSquares().cardinality(), is(1192844));
        assertThat(database.getHighFoodSquares().cardinality(), is(8977));
        assertThat(database.getSevenFoodSquares().cardinality(), is(156552));
        assertThat(database.getTradeHubSquares().cardinality(), is(108));

        {
            // GeoID|X|Y|Wood|Clay|Iron|Stone|Food|TerrainSpecificTypeID|TerrainCombatTypeID|RegionID
            // 4502322|0|-2300|5|6|5|4|5|11|4|59
            final int index = CONVERTER_BL.coordsToIndex(0, -2300);
            assertThat(index, is(2002000));
            assertThat(database.findRegionFor(index), is(Region.NEWLANDS));
            assertThat(database.findTerrainCombatFor(index), is(TerrainCombat.SMALL_HILL));
            assertThat(database.findTerrainSpecificFor(index), is(TerrainSpecific.HEAVY_CLAY_SEAM));
        }

        {
            // GeoID|X|Y|Wood|Clay|Iron|Stone|Food|TerrainSpecificTypeID|TerrainCombatTypeID|RegionID
            // 6695777|123|-1456|7|5|4|4|5|114|10|41
            final int index = CONVERTER_BL.coordsToIndex(123, -1456);
            assertThat(index, is(3690967));
            assertThat(database.findRegionFor(index), is(Region.PUCHUALLPA));
            assertThat(database.findTerrainCombatFor(index), is(TerrainCombat.LARGE_FOREST));
            assertThat(database.findTerrainSpecificFor(index), is(TerrainSpecific.MONSOON_HILLTOP));
        }
    }

    /**
     * @param database Database.
     */
    private void verifyDatabaseElgea(final WorldMapDatabase database)
    {
        assertNotNull(database);

        // System.out.println("Elgea");
        // System.out.println("getEightFoodSquares() = " + database.getEightFoodSquares().cardinality());
        // System.out.println("getFiveWoodSquares() = " + database.getFiveWoodSquares().cardinality());
        // System.out.println("getHighFoodSquares() = " + database.getHighFoodSquares().cardinality());
        // System.out.println("getSevenFoodSquares() = " + database.getSevenFoodSquares().cardinality());
        // System.out.println("getTradeHubSquares() = " + database.getTradeHubSquares().cardinality());

        assertThat(database.getEightFoodSquares().cardinality(), is(11604));
        assertThat(database.getFiveWoodSquares().cardinality(), is(1890552));
        assertThat(database.getHighFoodSquares().cardinality(), is(11633));
        assertThat(database.getSevenFoodSquares().cardinality(), is(180678));
        assertThat(database.getTradeHubSquares().cardinality(), is(145));

        {
            // GeoID|X|Y|Wood|Clay|Iron|Stone|Food|TerrainSpecificTypeID|TerrainCombatTypeID|RegionID
            // 2360050|-130|-179|5|3|5|5|7|12|3|18
            final int index = CONVERTER_ELGEA.coordsToIndex(-130, -179);
            assertThat(index, is(1643691));
            assertThat(database.findRegionFor(index), is(Region.TOR_CARROCK));
            assertThat(database.findTerrainCombatFor(index), is(TerrainCombat.LARGE_HILL));
            assertThat(database.findTerrainSpecificFor(index), is(TerrainSpecific.ABUNDANT_CROPS));
        }

        {
            // GeoID|X|Y|Wood|Clay|Iron|Stone|Food|TerrainSpecificTypeID|TerrainCombatTypeID|RegionID
            // 49165|140|976|5|4|5|4|7|45|2|3
            final int index = CONVERTER_ELGEA.coordsToIndex(140, 976);
            assertThat(index, is(3955116));
            assertThat(database.findRegionFor(index), is(Region.WOLGAST));
            assertThat(database.findTerrainCombatFor(index), is(TerrainCombat.SMALL_MOUNTAIN));
            assertThat(database.findTerrainSpecificFor(index), is(TerrainSpecific.DOLMEN));
        }
    }
}
