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
 * Provides tests for the <code>FastWorldMapDatabase</code> class.
 */
public final class FastWorldMapDatabaseTest
{
    /** Converter. */
    private static final GeoIdConverter CONVERTER_BL = new GeoIdConverter(false);

    /** Geospatial ID converter. */
    private static final GeoIdConverter CONVERTER_ELGEA = new GeoIdConverter(true);

    /**
     * Test the <code>FastWorldMapDatabase()</code> method.
     */
    @Test
    public void testConstructorBrokenLands()
    {
        // Setup.
        final Reader sevenFoodReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/brokenLands/sevenFoodSquares.txt"));
        final Reader eightFoodReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/brokenLands/eightFoodSquares.txt"));
        final Reader highFoodReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/brokenLands/highFoodSquares.txt"));
        final Reader fiveWoodReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/brokenLands/fiveWoodSquares.txt"));
        final Reader fiveClayReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/brokenLands/fiveClaySquares.txt"));
        final Reader fiveIronReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/brokenLands/fiveIronSquares.txt"));
        final Reader fiveStoneReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/brokenLands/fiveStoneSquares.txt"));

        // Run/Verify.
        try
        {
            final WorldMapDatabase database = new FastWorldMapDatabase(CONVERTER_BL, sevenFoodReader, eightFoodReader,
                    highFoodReader, fiveWoodReader, fiveClayReader, fiveIronReader, fiveStoneReader);

            verifyDatabaseBrokenLands(database);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(fiveWoodReader);
            fileUtils.close(highFoodReader);
            fileUtils.close(eightFoodReader);
            fileUtils.close(sevenFoodReader);
        }
    }

    /**
     * Test the <code>FastWorldMapDatabase()</code> method.
     */
    @Test
    public void testConstructorElgea()
    {
        // Setup.
        final Reader sevenFoodReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/sevenFoodSquares.txt"));
        final Reader eightFoodReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/eightFoodSquares.txt"));
        final Reader highFoodReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/highFoodSquares.txt"));
        final Reader fiveWoodReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/fiveWoodSquares.txt"));
        final Reader fiveClayReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/fiveClaySquares.txt"));
        final Reader fiveIronReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/fiveIronSquares.txt"));
        final Reader fiveStoneReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/fiveStoneSquares.txt"));

        // Run/Verify.
        try
        {
            final WorldMapDatabase database = new FastWorldMapDatabase(CONVERTER_ELGEA, sevenFoodReader,
                    eightFoodReader, highFoodReader, fiveWoodReader, fiveClayReader, fiveIronReader, fiveStoneReader);

            verifyDatabaseElgea(database);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(fiveWoodReader);
            fileUtils.close(highFoodReader);
            fileUtils.close(eightFoodReader);
            fileUtils.close(sevenFoodReader);
        }
    }

    /**
     * Test the <code>FastWorldMapDatabase()</code> method.
     */
    @Test
    public void testConstructorElgeaNull()
    {
        // Setup.
        final Reader sevenFoodReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/sevenFoodSquares.txt"));
        final Reader eightFoodReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/eightFoodSquares.txt"));
        final Reader highFoodReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/highFoodSquares.txt"));
        final Reader fiveWoodReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/fiveWoodSquares.txt"));
        final Reader fiveClayReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/fiveClaySquares.txt"));
        final Reader fiveIronReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/fiveIronSquares.txt"));
        final Reader fiveStoneReader = new InputStreamReader(FastWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/elgea/fiveStoneSquares.txt"));

        // Run/Verify.
        try
        {
            new FastWorldMapDatabase(null, sevenFoodReader, eightFoodReader, highFoodReader, fiveWoodReader,
                    fiveClayReader, fiveIronReader, fiveStoneReader);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("converter is null"));
        }

        // Run/Verify.
        try
        {
            new FastWorldMapDatabase(CONVERTER_ELGEA, null, eightFoodReader, highFoodReader, fiveWoodReader,
                    fiveClayReader, fiveIronReader, fiveStoneReader);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("sevenFoodReader is null"));
        }

        // Run/Verify.
        try
        {
            new FastWorldMapDatabase(CONVERTER_ELGEA, sevenFoodReader, null, highFoodReader, fiveWoodReader,
                    fiveClayReader, fiveIronReader, fiveStoneReader);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("eightFoodReader is null"));
        }

        // Run/Verify.
        try
        {
            new FastWorldMapDatabase(CONVERTER_ELGEA, sevenFoodReader, eightFoodReader, null, fiveWoodReader,
                    fiveClayReader, fiveIronReader, fiveStoneReader);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("highFoodReader is null"));
        }

        // Run/Verify.
        try
        {
            new FastWorldMapDatabase(CONVERTER_ELGEA, sevenFoodReader, eightFoodReader, highFoodReader, null,
                    fiveClayReader, fiveIronReader, fiveStoneReader);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("fiveWoodReader is null"));
        }

        // Run/Verify.
        try
        {
            new FastWorldMapDatabase(CONVERTER_ELGEA, sevenFoodReader, eightFoodReader, highFoodReader, fiveWoodReader,
                    null, fiveIronReader, fiveStoneReader);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("fiveClayReader is null"));
        }

        // Run/Verify.
        try
        {
            new FastWorldMapDatabase(CONVERTER_ELGEA, sevenFoodReader, eightFoodReader, highFoodReader, fiveWoodReader,
                    fiveClayReader, null, fiveStoneReader);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("fiveIronReader is null"));
        }

        // Run/Verify.
        try
        {
            new FastWorldMapDatabase(CONVERTER_ELGEA, sevenFoodReader, eightFoodReader, highFoodReader, fiveWoodReader,
                    fiveClayReader, fiveIronReader, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("fiveStoneReader is null"));
        }
    }

    /**
     * Test the <code>FastWorldMapDatabase()</code> method.
     */
    @Test
    public void testConstructorTwoArgBrokenLands()
    {
        // Run.
        final WorldMapDatabase database = new FastWorldMapDatabase(CONVERTER_BL);

        // Verify.
        verifyDatabaseBrokenLands(database);
    }

    /**
     * Test the <code>FastWorldMapDatabase()</code> method.
     */
    @Test
    public void testConstructorTwoArgElgea()
    {
        // Run.
        final WorldMapDatabase database = new FastWorldMapDatabase(CONVERTER_ELGEA);

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
