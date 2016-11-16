package org.vizzini.illyriad.map;

import java.awt.Point;
import java.util.BitSet;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.Region;

/**
 * Provides a sweet spot finder.
 */
public final class SweetspotFinder
{
    /** Geospatial ID converter. */
    private final GeoIdConverter converter;

    /** Feature radius. */
    private int highFoodRadius;

    /** Square condition flag. */
    private boolean isEightFood;

    /** Square condition flag. */
    private boolean isFiveClay;

    /** Square condition flag. */
    private boolean isFiveIron;

    /** Square condition flag. */
    private boolean isFiveStone;

    /** Square condition flag. */
    private boolean isFiveWood;

    /** Square condition flag. */
    private boolean isHighFoodClose;

    /** Square condition flag. */
    private boolean isInRegions;

    /** Square condition flag. */
    private boolean isMineralClose;

    /** Square condition flag. */
    private boolean isNoTownTooClose;

    /** Square condition flag. */
    private boolean isOnTerrainCombat;

    /** Square condition flag. */
    private boolean isOnTerrainSpecific;

    /** Square condition flag. */
    private boolean isSevenFood;

    /** Square condition flag. */
    private boolean isTradeHubClose;

    /** Map of a location of interest to a nearby high food spot. */
    private Map<Integer, BitSet> locationToNearbyHighFood = new HashMap<Integer, BitSet>();

    /** Map of a location of interest to a nearby mineral. */
    private Map<Integer, BitSet> locationToNearbyMineral = new HashMap<Integer, BitSet>();

    /** Map of a location of interest to a nearby trade hub. */
    private Map<Integer, BitSet> locationToNearbyTradeHub = new HashMap<Integer, BitSet>();

    /** Mineral database. */
    private final MineralDatabase mineralDatabase;

    /** Feature radius. */
    private int mineralRadius;

    /** Feature radius. */
    private int noTownTooCloseRadius;

    /** Regions. */
    private Set<Region> regions;

    /** Terrain combats. */
    private Set<TerrainCombat> terrainCombats;

    /** Terrain combats. */
    private Set<TerrainSpecific> terrainSpecifics;

    /** Town database. */
    private final TownDatabase townDatabase;

    /** Feature radius. */
    private int tradeHubRadius;

    /** World map database. */
    private final WorldMapDatabase worldMapDatabase;

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     * @param worldMapDatabase World map database. (required)
     * @param mineralDatabase Mineral database. (required)
     * @param townDatabase Town database. (required)
     */
    @SuppressWarnings("hiding")
    public SweetspotFinder(final GeoIdConverter converter, final WorldMapDatabase worldMapDatabase,
            final MineralDatabase mineralDatabase, final TownDatabase townDatabase)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        if (worldMapDatabase == null)
        {
            throw new IllegalArgumentException("worldMapDatabase is null");
        }

        if (mineralDatabase == null)
        {
            throw new IllegalArgumentException("mineralDatabase is null");
        }

        if (townDatabase == null)
        {
            throw new IllegalArgumentException("townDatabase is null");
        }

        this.converter = converter;
        this.worldMapDatabase = worldMapDatabase;
        this.mineralDatabase = mineralDatabase;
        this.townDatabase = townDatabase;
    }

    /**
     * @param index Geospatial index.
     * @param squares Potential destinations.
     * @param radius Radius.
     * 
     * @return a new filtered set of potential destinations.
     */
    public BitSet filterSquareClose(final int index, final BitSet squares, final int radius)
    {
        return filterSquareClose(index, squares, radius, true);
    }

    /**
     * @param index Geospatial index.
     * @param squares Potential destinations.
     * @param radius Radius.
     * @param isVerbose Flag indicating whether to provide output.
     * 
     * @return a new filtered set of potential destinations.
     */
    public BitSet filterSquareClose(final int index, final BitSet squares, final int radius, final boolean isVerbose)
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = new BitSet();

        final Point point = converter.indexToPoint(index);
        final int radiusSquared = radius * radius;

        for (int i = squares.nextSetBit(0); i >= 0; i = squares.nextSetBit(i + 1))
        {
            final Point anotherPoint = converter.indexToPoint(i);

            if (point.distanceSq(anotherPoint) <= radiusSquared)
            {
                answer.set(i);
            }
        }

        if (isVerbose)
        {
            final long end = System.currentTimeMillis();
            new TimePrinter().printElapsedTime("filterSquareClose() cardinality = " + answer.cardinality(), start, end);
        }

        return answer;
    }

    /**
     * @param index Geospatial index.
     * 
     * @return the geospatial ID of a nearby point of interest.
     */
    public BitSet findNearbyHighFoodFor(final int index)
    {
        return locationToNearbyHighFood.get(index);
    }

    /**
     * @param index Geospatial index.
     * 
     * @return the geospatial ID of a nearby point of interest.
     */
    public BitSet findNearbyMineralFor(final int index)
    {
        return locationToNearbyMineral.get(index);
    }

    /**
     * @param index Geospatial index.
     * 
     * @return the geospatial ID of a nearby point of interest.
     */
    public BitSet findNearbyTradeHubFor(final int index)
    {
        return locationToNearbyTradeHub.get(index);
    }

    /**
     * @return the highFoodRadius
     */
    public int getHighFoodRadius()
    {
        return highFoodRadius;
    }

    /**
     * @return the mineralDatabase
     */
    public MineralDatabase getMineralDatabase()
    {
        return mineralDatabase;
    }

    /**
     * @return the mineralRadius
     */
    public int getMineralRadius()
    {
        return mineralRadius;
    }

    /**
     * @return the noTownTooCloseRadius
     */
    public int getNoTownTooCloseRadius()
    {
        return noTownTooCloseRadius;
    }

    /**
     * @return the regions
     */
    public Set<Region> getRegions()
    {
        return regions;
    }

    /**
     * @return the terrainCombats
     */
    public Set<TerrainCombat> getTerrainCombats()
    {
        return terrainCombats;
    }

    /**
     * @return the terrainSpecifics
     */
    public Set<TerrainSpecific> getTerrainSpecifics()
    {
        return terrainSpecifics;
    }

    /**
     * @return the townDatabase
     */
    public TownDatabase getTownDatabase()
    {
        return townDatabase;
    }

    /**
     * @return the tradeHubRadius
     */
    public int getTradeHubRadius()
    {
        return tradeHubRadius;
    }

    /**
     * @return the worldMapDatabase
     */
    public WorldMapDatabase getWorldMapDatabase()
    {
        return worldMapDatabase;
    }

    /**
     * @return the isEightFood
     */
    public boolean isEightFood()
    {
        return isEightFood;
    }

    /**
     * @return the isFiveClay
     */
    public boolean isFiveClay()
    {
        return isFiveClay;
    }

    /**
     * @return the isFiveIron
     */
    public boolean isFiveIron()
    {
        return isFiveIron;
    }

    /**
     * @return the isFiveStone
     */
    public boolean isFiveStone()
    {
        return isFiveStone;
    }

    /**
     * @return the isFiveWood
     */
    public boolean isFiveWood()
    {
        return isFiveWood;
    }

    /**
     * @return the isHighFoodClose
     */
    public boolean isHighFoodClose()
    {
        return isHighFoodClose;
    }

    /**
     * @return the isInRegions
     */
    public boolean isInRegions()
    {
        return isInRegions;
    }

    /**
     * @return the isMineralClose
     */
    public boolean isMineralClose()
    {
        return isMineralClose;
    }

    /**
     * @return the isNoTownTooClose
     */
    public boolean isNoTownTooClose()
    {
        return isNoTownTooClose;
    }

    /**
     * @return the isOnTerrainCombat
     */
    public boolean isOnTerrainCombat()
    {
        return isOnTerrainCombat;
    }

    /**
     * @return the isOnTerrainSpecific
     */
    public boolean isOnTerrainSpecific()
    {
        return isOnTerrainSpecific;
    }

    /**
     * @return the isSevenFood
     */
    public boolean isSevenFood()
    {
        return isSevenFood;
    }

    /**
     * @return the isTradeHubClose
     */
    public boolean isTradeHubClose()
    {
        return isTradeHubClose;
    }

    /**
     * Search.
     * 
     * @return potential destinations.
     */
    public BitSet search()
    {
        boolean isAnswerInitialized = false;
        BitSet answer = new BitSet();

        if (isSevenFood())
        {
            answer.or(worldMapDatabase.getSevenFoodSquares());
            isAnswerInitialized = true;
        }

        if (isEightFood())
        {
            answer.or(worldMapDatabase.getEightFoodSquares());
            isAnswerInitialized = true;
        }

        if (isFiveWood())
        {
            if (!isAnswerInitialized)
            {
                answer.or(worldMapDatabase.getFiveWoodSquares());
            }
            else
            {
                answer.and(worldMapDatabase.getFiveWoodSquares());
            }

            isAnswerInitialized = true;
        }

        if (isFiveClay())
        {
            if (!isAnswerInitialized)
            {
                answer.or(worldMapDatabase.getFiveClaySquares());
            }
            else
            {
                answer.and(worldMapDatabase.getFiveClaySquares());
            }

            isAnswerInitialized = true;
        }

        if (isFiveIron())
        {
            if (!isAnswerInitialized)
            {
                answer.or(worldMapDatabase.getFiveIronSquares());
            }
            else
            {
                answer.and(worldMapDatabase.getFiveIronSquares());
            }

            isAnswerInitialized = true;
        }

        if (isFiveStone())
        {
            if (!isAnswerInitialized)
            {
                answer.or(worldMapDatabase.getFiveStoneSquares());
            }
            else
            {
                answer.and(worldMapDatabase.getFiveStoneSquares());
            }

            isAnswerInitialized = true;
        }

        if (isInRegions())
        {
            if (!isAnswerInitialized)
            {
                answer.or(getAllRegions());
            }
            else
            {
                answer.and(getAllRegions());
            }

            isAnswerInitialized = true;
        }

        if (isOnTerrainCombat())
        {
            if (!isAnswerInitialized)
            {
                answer.or(getAllTerrainCombats());
            }
            else
            {
                answer.and(getAllTerrainCombats());
            }

            isAnswerInitialized = true;
        }

        if (isOnTerrainSpecific())
        {
            if (!isAnswerInitialized)
            {
                answer.or(getAllTerrainSpecifics());
            }
            else
            {
                answer.and(getAllTerrainSpecifics());
            }

            isAnswerInitialized = true;
        }

        if (isNoTownTooClose())
        {
            answer.andNot(townDatabase.getTownSquares());
            answer = filterNoTownTooClose(answer, getNoTownTooCloseRadius());
        }

        if (isHighFoodClose() || isMineralClose() || isTradeHubClose())
        {
            answer = filterFeatures(answer);
        }

        return answer;
    }

    /**
     * @param isEightFood the isEightFood to set
     */
    @SuppressWarnings("hiding")
    public void setEightFood(final boolean isEightFood)
    {
        this.isEightFood = isEightFood;
    }

    /**
     * @param isFiveClay the isFiveClay to set
     */
    @SuppressWarnings("hiding")
    public void setFiveClay(final boolean isFiveClay)
    {
        this.isFiveClay = isFiveClay;
    }

    /**
     * @param isFiveIron the isFiveIron to set
     */
    @SuppressWarnings("hiding")
    public void setFiveIron(final boolean isFiveIron)
    {
        this.isFiveIron = isFiveIron;
    }

    /**
     * @param isFiveStone the isFiveStone to set
     */
    @SuppressWarnings("hiding")
    public void setFiveStone(final boolean isFiveStone)
    {
        this.isFiveStone = isFiveStone;
    }

    /**
     * @param isFiveWood the isFiveWood to set
     */
    @SuppressWarnings("hiding")
    public void setFiveWood(final boolean isFiveWood)
    {
        this.isFiveWood = isFiveWood;
    }

    /**
     * @param isHighFoodClose the isHighFoodClose to set
     */
    @SuppressWarnings("hiding")
    public void setHighFoodClose(final boolean isHighFoodClose)
    {
        this.isHighFoodClose = isHighFoodClose;
    }

    /**
     * @param highFoodRadius the highFoodRadius to set
     */
    @SuppressWarnings("hiding")
    public void setHighFoodRadius(final int highFoodRadius)
    {
        this.highFoodRadius = highFoodRadius;
    }

    /**
     * @param isInRegions the isInRegions to set
     */
    @SuppressWarnings("hiding")
    public void setInRegions(final boolean isInRegions)
    {
        this.isInRegions = isInRegions;
    }

    /**
     * @param isMineralClose the isMineralClose to set
     */
    @SuppressWarnings("hiding")
    public void setMineralClose(final boolean isMineralClose)
    {
        this.isMineralClose = isMineralClose;
    }

    /**
     * @param mineralRadius the mineralRadius to set
     */
    @SuppressWarnings("hiding")
    public void setMineralRadius(final int mineralRadius)
    {
        this.mineralRadius = mineralRadius;
    }

    /**
     * @param isNoTownTooClose the isNoTownTooClose to set
     */
    @SuppressWarnings("hiding")
    public void setNoTownTooClose(final boolean isNoTownTooClose)
    {
        this.isNoTownTooClose = isNoTownTooClose;
    }

    /**
     * @param noTownTooCloseRadius the noTownTooCloseRadius to set
     */
    @SuppressWarnings("hiding")
    public void setNoTownTooCloseRadius(final int noTownTooCloseRadius)
    {
        this.noTownTooCloseRadius = noTownTooCloseRadius;
    }

    /**
     * @param isOnTerrainCombat the isOnTerrainCombat to set
     */
    @SuppressWarnings("hiding")
    public void setOnTerrainCombat(final boolean isOnTerrainCombat)
    {
        this.isOnTerrainCombat = isOnTerrainCombat;
    }

    /**
     * @param isOnTerrainSpecific the isOnTerrainSpecific to set
     */
    @SuppressWarnings("hiding")
    public void setOnTerrainSpecific(final boolean isOnTerrainSpecific)
    {
        this.isOnTerrainSpecific = isOnTerrainSpecific;
    }

    /**
     * @param regions the regions to set
     */
    @SuppressWarnings("hiding")
    public void setRegions(final Set<Region> regions)
    {
        this.regions = new TreeSet<Region>(regions);
    }

    /**
     * @param isSevenFood the isSevenFood to set
     */
    @SuppressWarnings("hiding")
    public void setSevenFood(final boolean isSevenFood)
    {
        this.isSevenFood = isSevenFood;
    }

    /**
     * @param terrainCombats the terrainCombats to set
     */
    @SuppressWarnings("hiding")
    public void setTerrainCombats(final Set<TerrainCombat> terrainCombats)
    {
        this.terrainCombats = new TreeSet<TerrainCombat>(terrainCombats);
    }

    /**
     * @param terrainSpecifics the terrainSpecifics to set
     */
    @SuppressWarnings("hiding")
    public void setTerrainSpecifics(final Set<TerrainSpecific> terrainSpecifics)
    {
        this.terrainSpecifics = new TreeSet<TerrainSpecific>(terrainSpecifics);
    }

    /**
     * @param isTradeHubClose the isTradeHubClose to set
     */
    @SuppressWarnings("hiding")
    public void setTradeHubClose(final boolean isTradeHubClose)
    {
        this.isTradeHubClose = isTradeHubClose;
    }

    /**
     * @param tradeHubRadius the tradeHubRadius to set
     */
    @SuppressWarnings("hiding")
    public void setTradeHubRadius(final int tradeHubRadius)
    {
        this.tradeHubRadius = tradeHubRadius;
    }

    /**
     * @param squares Squares.
     * 
     * @return a new bit set of potential destinations.
     */
    private BitSet filterFeatures(final BitSet squares)
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = new BitSet();

        {
            final BitSet highFood = filterHighFoodClose(squares, highFoodRadius);
            answer.or(highFood);
        }

        {
            final BitSet mineral = filterMineralClose(squares, mineralRadius);
            answer.or(mineral);
        }

        {
            final BitSet tradeHub = filterTradeHubClose(squares, tradeHubRadius);
            answer.or(tradeHub);
        }

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("filterFeatures() cardinality = " + answer.cardinality(), start, end);

        return answer;
    }

    /**
     * @param squares Potential destinations.
     * @param radius Radius.
     * 
     * @return a new filtered set of potential destinations.
     */
    private BitSet filterHighFoodClose(final BitSet squares, final int radius)
    {
        locationToNearbyHighFood.clear();

        BitSet answer = squares;

        if (isHighFoodClose)
        {
            final BitSetFilter filter = new ThingCloseFilter(converter, worldMapDatabase.getHighFoodSquares(), radius,
                    locationToNearbyHighFood);

            answer = filter.filter(squares);
        }

        return answer;
    }

    /**
     * @param squares Potential destinations.
     * @param radius Radius.
     * 
     * @return a new filtered set of potential destinations.
     */
    private BitSet filterMineralClose(final BitSet squares, final int radius)
    {
        locationToNearbyMineral.clear();

        BitSet answer = squares;

        if (isMineralClose)
        {
            final BitSetFilter filter = new ThingCloseFilter(converter, mineralDatabase.getAllMineralSquares(), radius,
                    locationToNearbyMineral);

            answer = filter.filter(squares);
        }

        return answer;
    }

    /**
     * @param squares Potential destinations.
     * @param radius Radius.
     * 
     * @return a new filtered set of potential destinations.
     */
    private BitSet filterNoTownTooClose(final BitSet squares, final int radius)
    {
        final BitSetFilter filter = new TownTooCloseFilter(converter, townDatabase.getTownSquares(), radius);

        return filter.filter(squares);
    }

    /**
     * @param squares Potential destinations.
     * @param radius Radius.
     * 
     * @return a new filtered set of potential destinations.
     */
    private BitSet filterTradeHubClose(final BitSet squares, final int radius)
    {
        locationToNearbyTradeHub.clear();

        BitSet answer = squares;

        if (isTradeHubClose)
        {
            final BitSetFilter filter = new ThingCloseFilter(converter, worldMapDatabase.getTradeHubSquares(), radius,
                    locationToNearbyTradeHub);

            answer = filter.filter(squares);
        }

        return answer;
    }

    /**
     * @return a new bit set representing all desired regions.
     */
    private BitSet getAllRegions()
    {
        final BitSet answer = new BitSet();

        for (final Region region : regions)
        {
            final BitSet bitSet = getWorldMapDatabase().getRegionSquares(region);
            answer.or(bitSet);
        }

        return answer;
    }

    /**
     * @return a new bit set representing all desired terrain combats.
     */
    private BitSet getAllTerrainCombats()
    {
        final BitSet answer = new BitSet();

        for (final TerrainCombat terrain : terrainCombats)
        {
            final BitSet bitSet = getWorldMapDatabase().getTerrainCombatSquares(terrain);
            answer.or(bitSet);
        }

        return answer;
    }

    /**
     * @return a new bit set representing all desired terrain specifics.
     */
    private BitSet getAllTerrainSpecifics()
    {
        final BitSet answer = new BitSet();

        for (final TerrainSpecific terrain : terrainSpecifics)
        {
            final BitSet bitSet = getWorldMapDatabase().getTerrainSpecificSquares(terrain);
            answer.or(bitSet);
        }

        return answer;
    }
}
