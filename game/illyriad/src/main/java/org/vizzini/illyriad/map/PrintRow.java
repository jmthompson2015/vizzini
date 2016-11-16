package org.vizzini.illyriad.map;

import java.awt.Point;
import java.util.BitSet;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.illyriad.Mineral;
import org.vizzini.illyriad.Region;

/**
 * Provides a print row.
 */
public final class PrintRow implements Comparable<PrintRow>
{
    /** Format. */
    private static final String FORMAT = "%11s %-18s %-18s %-21s %11s %31s %11s";

    /** Point format. */
    private static final String POINT_FORMAT0 = "%5d/%-5d";

    /** Point format. */
    private static final String POINT_FORMAT1 = POINT_FORMAT0 + " (%4.1f)";

    /** Point string length. */
    private static final int POINT_LENGTH0 = 11;

    /** Point string length. */
    private static final int POINT_LENGTH1 = POINT_LENGTH0 + 7;

    /** Flag indicating whether to print output. */
    private static final boolean IS_VERBOSE = false;

    /** Map of geospatial index to mineral. */
    private static final Map<Integer, Mineral> INDEX_TO_MINERAL = new HashMap<Integer, Mineral>();

    /**
     * @return the header string.
     */
    public static String getHeaderString()
    {
        final String ptUnderline0 = StringUtils.repeat("-", POINT_LENGTH0);
        final String ptUnderline1 = StringUtils.repeat("-", POINT_LENGTH1);
        final String headerFormat = "%11s %18s %18s %21s %18s %35s %18s";

        final StringBuilder sb = new StringBuilder();

        sb.append(String.format(headerFormat, StringUtils.center("Square", POINT_LENGTH0),
                StringUtils.center("Region", 18), StringUtils.center("Terrain (Combat)", 18),
                StringUtils.center("Terrain (Specific)", 21), StringUtils.center("High Food", POINT_LENGTH1),
                StringUtils.center("Mineral", 25), StringUtils.center("Trade Hub", POINT_LENGTH1)));
        sb.append("\n");
        sb.append(String.format(headerFormat, ptUnderline0, StringUtils.repeat("-", 18), StringUtils.repeat("-", 18),
                StringUtils.repeat("-", 21), ptUnderline1, StringUtils.repeat("-", 35), ptUnderline1));

        return sb.toString();
    }

    /** Geospatial ID converter. */
    private final GeoIdConverter converter;

    /** Sweetspot finder. */
    private final SweetspotFinder finder;

    /** Geospatial index. */
    private final int index;

    /** Point. */
    private final Point point;

    /**
     * Construct this object.
     * 
     * @param finder Sweetspot finder.
     * @param converter Geospatial ID converter.
     * @param index Geospatial index.
     */
    @SuppressWarnings("hiding")
    public PrintRow(final SweetspotFinder finder, final GeoIdConverter converter, final int index)
    {
        this.finder = finder;
        this.converter = converter;
        this.index = index;

        this.point = converter.indexToPoint(index);
    }

    @Override
    public int compareTo(final PrintRow another)
    {
        int answer = another.evaluate() - evaluate();

        if (answer == 0)
        {
            answer = index - another.index;
        }

        return answer;
    }

    /**
     * @return highFoodIndex
     */
    public Integer getHighFoodIndex()
    {
        return processBitSet(finder.findNearbyHighFoodFor(index));
    }

    /**
     * @return highFood
     */
    public String getHighFoodString()
    {
        return getString(getHighFoodIndex());
    }

    /**
     * @return the index
     */
    public int getIndex()
    {
        return index;
    }

    /**
     * @return mineral
     */
    public Mineral getMineral()
    {
        Mineral answer = INDEX_TO_MINERAL.get(index);

        if (answer == null)
        {
            final Integer myIndex = getMineralIndex();

            if (myIndex != null)
            {
                answer = getMineralDatabase().findMineralFor(myIndex, IS_VERBOSE);
                INDEX_TO_MINERAL.put(myIndex, answer);
            }
        }

        return answer;
    }

    /**
     * @return mineral
     */
    public Integer getMineralAmount()
    {
        Integer answer = null;

        final Integer myIndex = getMineralIndex();

        if (myIndex != null)
        {
            answer = getMineralDatabase().getMineralAmount(myIndex);
        }

        return answer;
    }

    /**
     * @return mineralIndex
     */
    public Integer getMineralIndex()
    {
        return processBitSet(finder.findNearbyMineralFor(index));
    }

    /**
     * @return mineral
     */
    public String getMineralString()
    {
        final Mineral myMineral = getMineral();

        final String name = (myMineral == null ? "" : myMineral.getDisplayName());
        final Integer amount = getMineralAmount();
        final String prefix = name + " " + (amount == null ? "" : amount);

        return String.format("%16s %11s", prefix, getString(getMineralIndex()));
    }

    /**
     * @return point
     */
    public Point getPoint()
    {
        return point;
    }

    /**
     * @return point
     */
    public String getPointString()
    {
        return String.format(POINT_FORMAT0, point.x, point.y);
    }

    /**
     * @return region
     */
    public Region getRegion()
    {
        return getWorldMapDatabase().findRegionFor(index);
    }

    /**
     * @return terrainCombat
     */
    public TerrainCombat getTerrainCombat()
    {
        return getWorldMapDatabase().findTerrainCombatFor(index);
    }

    /**
     * @return terrainSpecific
     */
    public TerrainSpecific getTerrainSpecific()
    {
        return getWorldMapDatabase().findTerrainSpecificFor(index);
    }

    /**
     * @return tradeHubIndex
     */
    public Integer getTradeHubIndex()
    {
        return processBitSet(finder.findNearbyTradeHubFor(index));
    }

    /**
     * @return tradeHub
     */
    public String getTradeHubString()
    {
        return getString(getTradeHubIndex());
    }

    @Override
    public String toString()
    {
        return String.format(FORMAT, getPointString(), getRegion().getDisplayName(), getTerrainCombat()
                .getDisplayName(), getTerrainSpecific().getDisplayName(), getHighFoodString(), getMineralString(),
                getTradeHubString());
    }

    /**
     * @param myIndex Geospatial index.
     * 
     * @return the distance between index and the given parameter.
     */
    private double computeDistance(final Integer myIndex)
    {
        final Point myPoint = converter.indexToPoint(myIndex);

        return computeDistance(myPoint);
    }

    /**
     * @param myPoint Point.
     * 
     * @return the distance between index and the given parameter.
     */
    private double computeDistance(final Point myPoint)
    {
        return getPoint().distance(myPoint);
    }

    /**
     * @return an evaluation.
     */
    private int evaluate()
    {
        final boolean isHighFood = getHighFoodIndex() != null;
        final boolean isMineral = getMineralIndex() != null;
        final boolean isTradeHub = getTradeHubIndex() != null;

        int answer = 0;

        if (isHighFood)
        {
            answer += 4000;
            answer -= computeDistance(getHighFoodIndex()) * 100;
        }

        if (isMineral)
        {
            answer += 3000;
            answer -= computeDistance(getMineralIndex()) * 10;
        }

        if (isTradeHub)
        {
            answer += 2000;
            answer -= computeDistance(getTradeHubIndex());
        }

        return answer;
    }

    /**
     * @return the mineralDatabase
     */
    private MineralDatabase getMineralDatabase()
    {
        return finder.getMineralDatabase();
    }

    /**
     * @param myIndex Geospatial index.
     * 
     * @return a formatted version of the given parameter.
     */
    private String getString(final Integer myIndex)
    {
        String answer = StringUtils.center("n/a", POINT_LENGTH1);

        if (myIndex != null)
        {
            final Point myPoint = converter.indexToPoint(myIndex);
            final double distance = computeDistance(myPoint);

            answer = String.format(POINT_FORMAT1, myPoint.x, myPoint.y, distance);
        }

        return answer;
    }

    /**
     * @return the worldMapDatabase
     */
    private WorldMapDatabase getWorldMapDatabase()
    {
        return finder.getWorldMapDatabase();
    }

    /**
     * @param bitSet Bit set.
     * 
     * @return the first index, if any.
     */
    private Integer processBitSet(final BitSet bitSet)
    {
        Integer answer = null;

        if (bitSet != null)
        {
            final int myGeoId = bitSet.nextSetBit(0);

            if (myGeoId >= 0)
            {
                answer = myGeoId;
            }
        }

        return answer;
    }
}
