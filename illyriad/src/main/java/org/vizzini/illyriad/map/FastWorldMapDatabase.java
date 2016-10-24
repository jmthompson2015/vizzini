package org.vizzini.illyriad.map;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.BitSet;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.Region;
import org.vizzini.illyriad.TradeHub;

/**
 * Provides a fast implementation of a world map information database.
 */
public final class FastWorldMapDatabase implements WorldMapDatabase
{
    /** User directory. */
    public static final File USER_DIR;

    static
    {
        String userDir = System.getProperty("user.dir");

        final String key = "/illyriad";

        if (userDir.endsWith(key))
        {
            userDir = userDir.substring(0, userDir.length() - key.length());
        }

        USER_DIR = new File(userDir);
    }

    /**
     * @param isElgea Flag indicating if this data is for Elgea.
     * 
     * @return a new reader.
     */
    private static Reader createEightFoodReader(final boolean isElgea)
    {
        return createReader(isElgea, "eightFoodSquares.txt");
    }

    /**
     * @param isElgea Flag indicating if this data is for Elgea.
     * 
     * @return a new reader.
     */
    private static Reader createFiveClayReader(final boolean isElgea)
    {
        return createReader(isElgea, "fiveClaySquares.txt");
    }

    /**
     * @param isElgea Flag indicating if this data is for Elgea.
     * 
     * @return a new reader.
     */
    private static Reader createFiveIronReader(final boolean isElgea)
    {
        return createReader(isElgea, "fiveIronSquares.txt");
    }

    /**
     * @param isElgea Flag indicating if this data is for Elgea.
     * 
     * @return a new reader.
     */
    private static Reader createFiveStoneReader(final boolean isElgea)
    {
        return createReader(isElgea, "fiveStoneSquares.txt");
    }

    /**
     * @param isElgea Flag indicating if this data is for Elgea.
     * 
     * @return a new reader.
     */
    private static Reader createFiveWoodReader(final boolean isElgea)
    {
        return createReader(isElgea, "fiveWoodSquares.txt");
    }

    /**
     * @param isElgea Flag indicating if this data is for Elgea.
     * 
     * @return a new reader.
     */
    private static Reader createHighFoodReader(final boolean isElgea)
    {
        return createReader(isElgea, "highFoodSquares.txt");
    }

    /**
     * @param isElgea Flag indicating if this data is for Elgea.
     * @param filename Filename.
     * 
     * @return a new reader.
     */
    private static Reader createReader(final boolean isElgea, final String filename)
    {
        final ClassLoader classLoader = FastWorldMapDatabase.class.getClassLoader();
        final String file = getBase(isElgea) + filename;

        return new InputStreamReader(classLoader.getResourceAsStream(file));
    }

    /**
     * @param isElgea Flag indicating if this data is for Elgea.
     * 
     * @return a new reader.
     */
    private static Reader createSevenFoodReader(final boolean isElgea)
    {
        return createReader(isElgea, "sevenFoodSquares.txt");
    }

    /**
     * @param isElgea Flag indicating if this data is for Elgea.
     * 
     * @return the base filename for the given parameter.
     */
    private static String getBase(final boolean isElgea)
    {
        final StringBuilder sb = new StringBuilder();

        sb.append("mapData/");
        sb.append(isElgea ? "elgea" : "brokenLands");
        sb.append("/");

        return sb.toString();
    }

    /** Geospatial ID converter. */
    private final GeoIdConverter converter;

    /** 8 food squares. */
    private BitSet eightFoodSquares;

    /** File utilities. */
    private final FileUtilities fileUtils = new FileUtilities();

    /** 5 clay squares. */
    private BitSet fiveClaySquares;

    /** 5 iron squares. */
    private BitSet fiveIronSquares;

    /** 5 stone squares. */
    private BitSet fiveStoneSquares;

    /** 5 wood squares. */
    private BitSet fiveWoodSquares;

    /** Bit set formatter. */
    private final BitSetFormat formatter;

    /** High food squares. */
    private BitSet highFoodSquares;

    /** Region squares. */
    private final Map<Region, BitSet> regionSquares = new HashMap<Region, BitSet>();

    /** 7 food squares. */
    private BitSet sevenFoodSquares;

    /** Terrain combat squares. */
    private final Map<TerrainCombat, BitSet> terrainCombatSquares = new HashMap<TerrainCombat, BitSet>();

    /** Terrain specific squares. */
    private final Map<TerrainSpecific, BitSet> terrainSpecificSquares = new HashMap<TerrainSpecific, BitSet>();

    /** Trade hub squares. */
    private final BitSet tradeHubSquares;

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     */
    @SuppressWarnings("hiding")
    public FastWorldMapDatabase(final GeoIdConverter converter)
    {
        this(converter, createSevenFoodReader(converter.isElgea()), createEightFoodReader(converter.isElgea()),
                createHighFoodReader(converter.isElgea()), createFiveWoodReader(converter.isElgea()),
                createFiveClayReader(converter.isElgea()), createFiveIronReader(converter.isElgea()),
                createFiveStoneReader(converter.isElgea()));
    }

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     * @param sevenFoodReader Data reader.
     * @param eightFoodReader Data reader.
     * @param highFoodReader Data reader.
     * @param fiveWoodReader Data reader.
     * @param fiveClayReader Data reader.
     * @param fiveIronReader Data reader.
     * @param fiveStoneReader Data reader.
     */
    @SuppressWarnings("hiding")
    public FastWorldMapDatabase(final GeoIdConverter converter, final Reader sevenFoodReader,
            final Reader eightFoodReader, final Reader highFoodReader, final Reader fiveWoodReader,
            final Reader fiveClayReader, final Reader fiveIronReader, final Reader fiveStoneReader)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        if (sevenFoodReader == null)
        {
            throw new IllegalArgumentException("sevenFoodReader is null");
        }

        if (eightFoodReader == null)
        {
            throw new IllegalArgumentException("eightFoodReader is null");
        }

        if (highFoodReader == null)
        {
            throw new IllegalArgumentException("highFoodReader is null");
        }

        if (fiveWoodReader == null)
        {
            throw new IllegalArgumentException("fiveWoodReader is null");
        }

        if (fiveClayReader == null)
        {
            throw new IllegalArgumentException("fiveClayReader is null");
        }

        if (fiveIronReader == null)
        {
            throw new IllegalArgumentException("fiveIronReader is null");
        }

        if (fiveStoneReader == null)
        {
            throw new IllegalArgumentException("fiveStoneReader is null");
        }

        this.converter = converter;

        formatter = new BitSetFormat();
        tradeHubSquares = new BitSet();

        loadMapSquares(sevenFoodReader, eightFoodReader, highFoodReader, fiveWoodReader, fiveClayReader,
                fiveIronReader, fiveStoneReader);
    }

    @Override
    public Region findRegionFor(final int index)
    {
        Region answer = null;

        final Region[] values = (isElgea() ? Region.valuesElgea() : Region.valuesBrokenLands());

        for (final Region region : values)
        {
            final BitSet bitSet = regionSquares.get(region);

            if (bitSet == null)
            {
                throw new RuntimeException("Didn't create regionSquares for " + region);
            }

            if (regionSquares.get(region).get(index))
            {
                answer = region;
                break;
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
            if (terrainCombatSquares.get(terrain).get(index))
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
            if (terrainSpecificSquares.get(terrain).get(index))
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
        return eightFoodSquares;
    }

    @Override
    public BitSet getFiveClaySquares()
    {
        return fiveClaySquares;
    }

    @Override
    public BitSet getFiveIronSquares()
    {
        return fiveIronSquares;
    }

    @Override
    public BitSet getFiveStoneSquares()
    {
        return fiveStoneSquares;
    }

    @Override
    public BitSet getFiveWoodSquares()
    {
        return fiveWoodSquares;
    }

    @Override
    public BitSet getHighFoodSquares()
    {
        return highFoodSquares;
    }

    @Override
    public BitSet getRegionSquares(final Region region)
    {
        return regionSquares.get(region);
    }

    @Override
    public BitSet getSevenFoodSquares()
    {
        return sevenFoodSquares;
    }

    @Override
    public BitSet getTerrainCombatSquares(final TerrainCombat terrain)
    {
        return terrainCombatSquares.get(terrain);
    }

    @Override
    public BitSet getTerrainSpecificSquares(final TerrainSpecific terrain)
    {
        return terrainSpecificSquares.get(terrain);
    }

    @Override
    public BitSet getTradeHubSquares()
    {
        if (tradeHubSquares.isEmpty())
        {
            final TradeHub[] values = (isElgea() ? TradeHub.valuesElgea() : TradeHub.valuesBrokenLands());

            for (final TradeHub tradeHub : values)
            {
                final int index = converter.coordsToIndex(tradeHub.getX(), tradeHub.getY());
                tradeHubSquares.set(index);
            }
        }

        return tradeHubSquares;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append("sevenFoodSquares ").append(sevenFoodSquares.cardinality());
        sb.append(", eightFoodSquares ").append(eightFoodSquares.cardinality());
        sb.append(", highFoodSquares ").append(highFoodSquares.cardinality());
        sb.append(", fiveWoodSquares ").append(fiveWoodSquares.cardinality());
        sb.append(", tradeHubSquares ").append(tradeHubSquares.cardinality());

        return sb.toString();
    }

    /**
     * @return a new URL to the test resources directory.
     */
    private URL createUrl()
    {
        final String protocol = "file";
        final String host = "";
        final String file = USER_DIR + "/illyriad/src/main/resources/mapData/" + (isElgea() ? "elgea" : "brokenLands");

        URL answer;

        try
        {
            answer = new URL(protocol, host, file);
        }
        catch (final MalformedURLException e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }

    /**
     * @return the isElgea
     */
    private boolean isElgea()
    {
        return converter.isElgea();
    }

    /**
     * @param sevenFoodReader Data reader.
     * @param eightFoodReader Data reader.
     * @param highFoodReader Data reader.
     * @param fiveWoodReader Data reader.
     * @param fiveClayReader Data reader.
     * @param fiveIronReader Data reader.
     * @param fiveStoneReader Data reader.
     */
    private void loadMapSquares(final Reader sevenFoodReader, final Reader eightFoodReader,
            final Reader highFoodReader, final Reader fiveWoodReader, final Reader fiveClayReader,
            final Reader fiveIronReader, final Reader fiveStoneReader)
    {
        final long start = System.currentTimeMillis();

        sevenFoodSquares = formatter.parse(sevenFoodReader);
        eightFoodSquares = formatter.parse(eightFoodReader);
        highFoodSquares = formatter.parse(highFoodReader);
        fiveWoodSquares = formatter.parse(fiveWoodReader);
        fiveClaySquares = formatter.parse(fiveClayReader);
        fiveIronSquares = formatter.parse(fiveIronReader);
        fiveStoneSquares = formatter.parse(fiveStoneReader);

        loadRegionSquares();
        loadTerrainCombatSquares();
        loadTerrainSpecificSquares();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime(
                "FastWorldMapDatabase.loadMapSquares() cardinality = " + sevenFoodSquares.cardinality(), start, end);
    }

    /**
     * Load region squares.
     */
    private void loadRegionSquares()
    {
        final URL[] urls = fileUtils.listFiles(createUrl());

        for (final URL url : urls)
        {
            final String path = url.getPath();

            if (path.contains("regionSquares"))
            {
                final String name = StringUtils.substringBetween(path, "regionSquares_", ".txt");
                final Region region = Region.valueOf(name);
                Reader reader = null;

                try
                {
                    reader = new FileReader(new File(url.getPath()));
                    final BitSet bitSet = formatter.parse(reader);
                    regionSquares.put(region, bitSet);
                }
                catch (final FileNotFoundException e)
                {
                    throw new RuntimeException(e);
                }
                finally
                {
                    fileUtils.close(reader);
                }
            }
        }
    }

    /**
     * Load terrain combat squares.
     */
    private void loadTerrainCombatSquares()
    {
        final URL[] urls = fileUtils.listFiles(createUrl());

        for (final URL url : urls)
        {
            final String path = url.getPath();

            if (path.contains("terrainCombatSquares"))
            {
                final String name = StringUtils.substringBetween(path, "terrainCombatSquares_", ".txt");
                final TerrainCombat terrain = TerrainCombat.valueOf(name);
                Reader reader = null;

                try
                {
                    reader = new FileReader(new File(url.getPath()));
                    final BitSet bitSet = formatter.parse(reader);
                    terrainCombatSquares.put(terrain, bitSet);
                }
                catch (final FileNotFoundException e)
                {
                    throw new RuntimeException(e);
                }
                finally
                {
                    fileUtils.close(reader);
                }
            }
        }
    }

    /**
     * Load terrain specific squares.
     */
    private void loadTerrainSpecificSquares()
    {
        final URL[] urls = fileUtils.listFiles(createUrl());

        for (final URL url : urls)
        {
            final String path = url.getPath();

            if (path.contains("terrainSpecificSquares"))
            {
                final String name = StringUtils.substringBetween(path, "terrainSpecificSquares_", ".txt");
                final TerrainSpecific terrain = TerrainSpecific.valueOf(name);
                Reader reader = null;

                try
                {
                    reader = new FileReader(new File(url.getPath()));
                    final BitSet bitSet = formatter.parse(reader);
                    terrainSpecificSquares.put(terrain, bitSet);
                }
                catch (final FileNotFoundException e)
                {
                    throw new RuntimeException(e);
                }
                finally
                {
                    fileUtils.close(reader);
                }
            }
        }
    }
}
