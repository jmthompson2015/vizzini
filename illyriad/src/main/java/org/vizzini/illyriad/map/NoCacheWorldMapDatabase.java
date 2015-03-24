package org.vizzini.illyriad.map;

import java.awt.Point;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.BitSet;

import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.Region;
import org.vizzini.illyriad.TradeHub;

/**
 * Provides an implementation of a world map information database which caches nothing to ease memory requirements.
 */
public class NoCacheWorldMapDatabase implements WorldMapDatabase
{
    /** Flag indicating whether to print output. */
    private static final boolean IS_VERBOSE = false;

    /** Geospatial ID converter. */
    private final GeoIdConverter converter;

    /** Bit set formatter. */
    private final BitSetFormat formatter;

    /** File utilities. */
    private final FileUtilities fileUtils = new FileUtilities();

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter. (required)
     */
    @SuppressWarnings("hiding")
    public NoCacheWorldMapDatabase(final GeoIdConverter converter)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        this.converter = converter;

        formatter = new BitSetFormat();
    }

    @Override
    public Region findRegionFor(final int index)
    {
        Region answer = null;

        final Point point = converter.indexToPoint(index);

        final Region[] values = (converter.isElgea() ? Region.valuesElgea() : Region.valuesBrokenLands());

        for (final Region region : values)
        {
            if (region.maybeContains(point))
            {
                final BitSet regionSquares = getRegionSquares(region);

                if (regionSquares == null)
                {
                    throw new RuntimeException("Can't find regionSquares for " + region);
                }

                if (regionSquares.get(index))
                {
                    answer = region;
                    break;
                }

            }
        }

        return answer;
    }

    @Override
    public TerrainCombat findTerrainCombatFor(final int index)
    {
        TerrainCombat answer = null;

        for (final TerrainCombat terrain : TerrainCombat.values())
        {
            final BitSet squares = getTerrainCombatSquares(terrain);

            if (squares.get(index))
            {
                answer = terrain;
                break;
            }
        }

        return answer;
    }

    @Override
    public TerrainSpecific findTerrainSpecificFor(final int index)
    {
        TerrainSpecific answer = null;

        for (final TerrainSpecific terrain : TerrainSpecific.values())
        {
            final BitSet squares = getTerrainSpecificSquares(terrain);

            if (squares.get(index))
            {
                answer = terrain;
                break;
            }
        }

        return answer;
    }

    @Override
    public BitSet getEightFoodSquares()
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = loadBitSet("eightFoodSquares.txt");

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime(
                "NoCacheWorldMapDatabase.getEightFoodSquares() cardinality = " + answer.cardinality(), start, end);

        return answer;
    }

    @Override
    public BitSet getFiveClaySquares()
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = loadBitSet("fiveClaySquares.txt");

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime(
                "NoCacheWorldMapDatabase.getFiveClaySquares() cardinality = " + answer.cardinality(), start, end);

        return answer;
    }

    @Override
    public BitSet getFiveIronSquares()
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = loadBitSet("fiveIronSquares.txt.txt");

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime(
                "NoCacheWorldMapDatabase.getFiveIronSquares() cardinality = " + answer.cardinality(), start, end);

        return answer;
    }

    @Override
    public BitSet getFiveStoneSquares()
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = loadBitSet("fiveStoneSquares.txt");

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime(
                "NoCacheWorldMapDatabase.getFiveStoneSquares() cardinality = " + answer.cardinality(), start, end);

        return answer;
    }

    @Override
    public BitSet getFiveWoodSquares()
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = loadBitSet("fiveWoodSquares.txt");

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime(
                "NoCacheWorldMapDatabase.getFiveWoodSquares() cardinality = " + answer.cardinality(), start, end);

        return answer;
    }

    @Override
    public BitSet getHighFoodSquares()
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = loadBitSet("highFoodSquares.txt");

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime(
                "NoCacheWorldMapDatabase.getHighFoodSquares() cardinality = " + answer.cardinality(), start, end);

        return answer;
    }

    @Override
    public BitSet getRegionSquares(final Region region)
    {
        final long start = System.currentTimeMillis();

        final String filename = "regionSquares_" + region.name() + ".txt";
        final BitSet answer = loadBitSet(filename);

        final long end = System.currentTimeMillis();
        if (IS_VERBOSE)
        {
            new TimePrinter().printElapsedTime("NoCacheWorldMapDatabase.getRegionSquares() " + region.getDisplayName()
                    + " cardinality = " + answer.cardinality(), start, end);
        }

        return answer;
    }

    @Override
    public BitSet getSevenFoodSquares()
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = loadBitSet("sevenFoodSquares.txt");

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime(
                "NoCacheWorldMapDatabase.getSevenFoodSquares() cardinality = " + answer.cardinality(), start, end);

        return answer;
    }

    @Override
    public BitSet getTerrainCombatSquares(final TerrainCombat terrain)
    {
        final long start = System.currentTimeMillis();

        final String filename = "terrainCombatSquares_" + terrain.name() + ".txt";
        final BitSet answer = loadBitSet(filename);

        final long end = System.currentTimeMillis();
        if (IS_VERBOSE)
        {
            new TimePrinter().printElapsedTime(
                    "NoCacheWorldMapDatabase.getTerrainCombatSquares() " + terrain.getDisplayName() + " cardinality = "
                            + answer.cardinality(), start, end);
        }

        return answer;
    }

    @Override
    public BitSet getTerrainSpecificSquares(final TerrainSpecific terrain)
    {
        final long start = System.currentTimeMillis();

        final String filename = "terrainSpecificSquares_" + terrain.name() + ".txt";
        final BitSet answer = loadBitSet(filename);

        final long end = System.currentTimeMillis();
        if (IS_VERBOSE)
        {
            new TimePrinter().printElapsedTime(
                    "NoCacheWorldMapDatabase.getTerrainSpecificSquares() " + terrain.getDisplayName()
                            + " cardinality = " + answer.cardinality(), start, end);
        }

        return answer;
    }

    @Override
    public BitSet getTradeHubSquares()
    {
        final BitSet answer = new BitSet();

        final TradeHub[] values = (converter.isElgea() ? TradeHub.valuesElgea() : TradeHub.valuesBrokenLands());

        for (final TradeHub tradeHub : values)
        {
            final int index = converter.coordsToIndex(tradeHub.getX(), tradeHub.getY());
            answer.set(index);
        }

        return answer;
    }

    /**
     * @param filename Filename.
     * 
     * @return a new reader.
     */
    private Reader createReader(final String filename)
    {
        final ClassLoader classLoader = NoCacheWorldMapDatabase.class.getClassLoader();
        final String file = getBase() + filename;

        return new InputStreamReader(classLoader.getResourceAsStream(file));
    }

    /**
     * @return the base filename for the given parameter.
     */
    private String getBase()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append("mapData/");
        sb.append(isElgea() ? "elgea" : "brokenLands");
        sb.append("/");

        return sb.toString();
    }

    /**
     * @return the isElgea
     */
    private boolean isElgea()
    {
        return converter.isElgea();
    }

    /**
     * @param filename Filename.
     * 
     * @return a bit set loaded from a file.
     */
    private BitSet loadBitSet(final String filename)
    {
        BitSet answer = null;

        Reader reader = null;

        try
        {
            reader = createReader(filename);
            answer = formatter.parse(reader);
        }
        finally
        {
            fileUtils.close(reader);
        }

        return answer;
    }
}
