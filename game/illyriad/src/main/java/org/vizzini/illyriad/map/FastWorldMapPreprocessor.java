package org.vizzini.illyriad.map;

import java.awt.Toolkit;
import java.io.File;
import java.io.IOException;
import java.io.Writer;
import java.util.BitSet;

import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.Region;

/**
 * Provides a preprocessor for world map data. Use a java argument such as '-Xmx2048m' to allow enough memory.
 */
public final class FastWorldMapPreprocessor
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String args[])
    {
        final long start = System.currentTimeMillis();

        // {
        // final boolean isElgea = true;
        // final GeoIdConverter converter = new GeoIdConverter(isElgea);
        // final FastWorldMapPreprocessor preprocessor = new FastWorldMapPreprocessor(converter);
        // preprocessor.preprocess();
        // }

        {
            final boolean isElgea = false;
            final GeoIdConverter converter = new GeoIdConverter(isElgea);
            final FastWorldMapPreprocessor preprocessor = new FastWorldMapPreprocessor(converter);
            preprocessor.preprocess();
        }

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("\nFastWorldMapPreprocessor", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Geospatial ID converter. */
    private final GeoIdConverter converter;

    /** File utilities. */
    private final FileUtilities fileUtils = new FileUtilities();

    /** Bit set formatter. */
    private final BitSetFormat formatter;

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     */
    @SuppressWarnings("hiding")
    public FastWorldMapPreprocessor(final GeoIdConverter converter)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        this.converter = converter;

        formatter = new BitSetFormat();
    }

    /**
     * Pre-process.
     */
    public void preprocess()
    {
        final WorldMapDatabase worldMapDatabase = new DefaultWorldMapDatabase(converter);

        final String base = "mapData/" + (converter.isElgea() ? "elgea" : "brokenLands");
        final File parent = new File(base);

        writeBitSet(new File(parent, "sevenFoodSquares.txt"), worldMapDatabase.getSevenFoodSquares());
        writeBitSet(new File(parent, "eightFoodSquares.txt"), worldMapDatabase.getEightFoodSquares());
        writeBitSet(new File(parent, "highFoodSquares.txt"), worldMapDatabase.getHighFoodSquares());
        writeBitSet(new File(parent, "fiveWoodSquares.txt"), worldMapDatabase.getFiveWoodSquares());
        writeBitSet(new File(parent, "fiveClaySquares.txt"), worldMapDatabase.getFiveClaySquares());
        writeBitSet(new File(parent, "fiveIronSquares.txt"), worldMapDatabase.getFiveIronSquares());
        writeBitSet(new File(parent, "fiveStoneSquares.txt"), worldMapDatabase.getFiveStoneSquares());

        final Region[] regionValues = (converter.isElgea() ? Region.valuesElgea() : Region.valuesBrokenLands());

        for (final Region region : regionValues)
        {
            writeRegionSquares(parent, region, worldMapDatabase);
        }

        for (final TerrainCombat terrain : TerrainCombat.values())
        {
            writeTerrainCombatSquares(parent, terrain, worldMapDatabase);
        }

        for (final TerrainSpecific terrain : TerrainSpecific.values())
        {
            writeTerrainSpecificSquares(parent, terrain, worldMapDatabase);
        }
    }

    /**
     * @param file File.
     * @param bitSet Bit set.
     */
    private void writeBitSet(final File file, final BitSet bitSet)
    {
        Writer writer = null;

        try
        {
            writer = fileUtils.createFileWriter(file);
            writer.write(formatter.format(bitSet));
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            fileUtils.close(writer);
        }
    }

    /**
     * @param parent Parent directory.
     * @param region Region.
     * @param worldMapDatabase World map database.
     */
    private void writeRegionSquares(final File parent, final Region region, final WorldMapDatabase worldMapDatabase)
    {
        final File file = new File(parent, "regionSquares_" + region.name() + ".txt");
        Writer writer = null;

        try
        {
            writer = fileUtils.createFileWriter(file);
            final BitSet bitSet = worldMapDatabase.getRegionSquares(region);

            if ((bitSet != null) && !bitSet.isEmpty())
            {
                writer.write(formatter.format(bitSet));
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            fileUtils.close(writer);
        }
    }

    /**
     * @param parent Parent directory.
     * @param terrain Terrain combat.
     * @param worldMapDatabase World map database.
     */
    private void writeTerrainCombatSquares(final File parent, final TerrainCombat terrain,
            final WorldMapDatabase worldMapDatabase)
    {
        final File file = new File(parent, "terrainCombatSquares_" + terrain.name() + ".txt");
        Writer writer = null;

        try
        {
            writer = fileUtils.createFileWriter(file);
            final BitSet bitSet = worldMapDatabase.getTerrainCombatSquares(terrain);

            if ((bitSet != null) && !bitSet.isEmpty())
            {
                writer.write(formatter.format(bitSet));
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            fileUtils.close(writer);
        }
    }

    /**
     * @param parent Parent directory.
     * @param terrain Terrain combat.
     * @param worldMapDatabase World map database.
     */
    private void writeTerrainSpecificSquares(final File parent, final TerrainSpecific terrain,
            final WorldMapDatabase worldMapDatabase)
    {
        final File file = new File(parent, "terrainSpecificSquares_" + terrain.name() + ".txt");
        Writer writer = null;

        try
        {
            writer = fileUtils.createFileWriter(file);
            final BitSet bitSet = worldMapDatabase.getTerrainSpecificSquares(terrain);

            if ((bitSet != null) && !bitSet.isEmpty())
            {
                writer.write(formatter.format(bitSet));
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            fileUtils.close(writer);
        }
    }
}
