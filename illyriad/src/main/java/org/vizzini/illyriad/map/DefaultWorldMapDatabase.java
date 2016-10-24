package org.vizzini.illyriad.map;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.BitSet;
import java.util.HashMap;
import java.util.Map;

import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.Region;
import org.vizzini.illyriad.TradeHub;

/**
 * Provides a default implementation of a world map information database.
 */
public final class DefaultWorldMapDatabase implements WorldMapDatabase
{
    /** Geospatial ID converter. */
    private final GeoIdConverter converter;

    /** 8 food squares. */
    private final BitSet eightFoodSquares;

    /** 5 clay squares. */
    private final BitSet fiveClaySquares;

    /** 5 iron squares. */
    private final BitSet fiveIronSquares;

    /** 5 stone squares. */
    private final BitSet fiveStoneSquares;

    /** 5 wood squares. */
    private final BitSet fiveWoodSquares;

    /** High food squares. */
    private final BitSet highFoodSquares;

    /** High food amount threshold. */
    private final int highFoodThreshold;

    /** Region squares. */
    private final Map<Region, BitSet> regionSquares = new HashMap<Region, BitSet>();

    /** 7 food squares. */
    private final BitSet sevenFoodSquares;

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
    public DefaultWorldMapDatabase(final GeoIdConverter converter)
    {
        this(converter, new InputStreamReader(DefaultWorldMapDatabase.class.getClassLoader().getResourceAsStream(
                "mapData/datafile_worldmap.txt")));
    }

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     * @param worldmapDataReader World map data reader. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultWorldMapDatabase(final GeoIdConverter converter, final Reader worldmapDataReader)
    {
        this(converter, worldmapDataReader, 14);
    }

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     * @param worldmapDataReader World map data reader. (required)
     * @param highFoodThreshold High food amount threshold.
     */
    @SuppressWarnings("hiding")
    public DefaultWorldMapDatabase(final GeoIdConverter converter, final Reader worldmapDataReader,
            final int highFoodThreshold)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        if (worldmapDataReader == null)
        {
            throw new IllegalArgumentException("worldmapDataReader is null");
        }

        this.converter = converter;
        this.highFoodThreshold = highFoodThreshold;

        eightFoodSquares = new BitSet();
        fiveClaySquares = new BitSet();
        fiveIronSquares = new BitSet();
        fiveStoneSquares = new BitSet();
        fiveWoodSquares = new BitSet();
        highFoodSquares = new BitSet();
        sevenFoodSquares = new BitSet();
        tradeHubSquares = new BitSet();

        final Region[] regionValues = (isElgea() ? Region.valuesElgea() : Region.valuesBrokenLands());

        for (final Region region : regionValues)
        {
            regionSquares.put(region, new BitSet());
        }

        for (final TerrainCombat terrain : TerrainCombat.values())
        {
            terrainCombatSquares.put(terrain, new BitSet());
        }

        for (final TerrainSpecific terrain : TerrainSpecific.values())
        {
            terrainSpecificSquares.put(terrain, new BitSet());
        }

        loadMapSquares(worldmapDataReader);
    }

    @Override
    public Region findRegionFor(final int index)
    {
        Region answer = null;

        final Region[] values = (isElgea() ? Region.valuesElgea() : Region.valuesBrokenLands());

        for (final Region region : values)
        {
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

    /**
     * @return the highFoodThreshold
     */
    public int getHighFoodThreshold()
    {
        return highFoodThreshold;
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
     * @return the isElgea
     */
    private boolean isElgea()
    {
        return converter.isElgea();
    }

    /**
     * @param worldmapDataReader World map data reader.
     */
    private void loadMapSquares(final Reader worldmapDataReader)
    {
        final long start = System.currentTimeMillis();

        BufferedReader myReader = null;

        try
        {
            myReader = new BufferedReader(worldmapDataReader);
            final MapSquareParser parser = new MapSquareParser();

            // Skip the first line.
            String line = myReader.readLine();

            while ((line = myReader.readLine()) != null)
            {
                final String[] parts = parser.split(line);
                final int x = parser.getX(parts);
                final int y = parser.getY(parts);

                if (converter.isCoordsInRange(x, y))
                {
                    final int index = converter.coordsToIndex(x, y);
                    final int regionId = parser.getRegionId(parts);
                    final Region region = Region.valueOfId(regionId);

                    if (region == null)
                    {
                        throw new RuntimeException("Unknown region for ID = " + regionId + " and coordinates " + x
                                + ", " + y);
                    }

                    processFood(index, parser.getFood(parts));
                    processWood(index, parser.getWood(parts));
                    processClay(index, parser.getClay(parts));
                    processIron(index, parser.getIron(parts));
                    processStone(index, parser.getStone(parts));
                    processRegion(index, region);
                    processTerrainCombatTypeId(index, parser.getTerrainCombatTypeId(parts));
                    processTerrainSpecificTypeId(index, parser.getTerrainSpecificTypeId(parts));
                }
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(myReader);
        }

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime(
                "DefaultWorldMapDatabase.loadMapSquares() cardinality = " + sevenFoodSquares.cardinality(), start, end);
    }

    /**
     * @param index Geospatial index.
     * @param clay Clay amount.
     */
    private void processClay(final int index, final int clay)
    {
        if (clay == 5)
        {
            fiveClaySquares.set(index);
        }
    }

    /**
     * @param index Geospatial index.
     * @param food Food amount.
     */
    private void processFood(final int index, final int food)
    {
        if (food == 7)
        {
            sevenFoodSquares.set(index);
        }
        else if (food == 8)
        {
            eightFoodSquares.set(index);
        }
        else if (food >= highFoodThreshold)
        {
            highFoodSquares.set(index);
        }
    }

    /**
     * @param index Geospatial index.
     * @param iron Iron amount.
     */
    private void processIron(final int index, final int iron)
    {
        if (iron == 5)
        {
            fiveIronSquares.set(index);
        }
    }

    /**
     * @param index Geospatial index.
     * @param region Region.
     */
    private void processRegion(final int index, final Region region)
    {
        final BitSet bitSet = regionSquares.get(region);

        if (bitSet == null)
        {
            throw new RuntimeException("Didn't create regionSquares for " + region);
        }

        bitSet.set(index);
    }

    /**
     * @param index Geospatial index.
     * @param stone Stone amount.
     */
    private void processStone(final int index, final int stone)
    {
        if (stone == 5)
        {
            fiveStoneSquares.set(index);
        }
    }

    /**
     * @param index Geospatial index.
     * @param terrainId Terrain combat type ID.
     */
    private void processTerrainCombatTypeId(final int index, final int terrainId)
    {
        final TerrainCombat terrain = TerrainCombat.valueOfId(terrainId);

        if (terrain == null)
        {
            throw new RuntimeException("Unknown terrain combat for ID = " + terrainId + " and coordinates "
                    + converter.indexToPoint(index));
        }

        terrainCombatSquares.get(terrain).set(index);
    }

    /**
     * @param index Geospatial index.
     * @param terrainId Terrain specific type ID.
     */
    private void processTerrainSpecificTypeId(final int index, final int terrainId)
    {
        final TerrainSpecific terrain = TerrainSpecific.valueOfId(terrainId);

        if (terrain == null)
        {
            throw new RuntimeException("Unknown terrain specific for ID = " + terrainId + " and coordinates "
                    + converter.indexToPoint(index));
        }

        terrainSpecificSquares.get(terrain).set(index);
    }

    /**
     * @param index Geospatial index.
     * @param wood Wood amount.
     */
    private void processWood(final int index, final int wood)
    {
        if (wood == 5)
        {
            fiveWoodSquares.set(index);
        }
    }
}
