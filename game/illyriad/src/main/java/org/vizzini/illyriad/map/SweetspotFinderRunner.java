package org.vizzini.illyriad.map;

import java.awt.Point;
import java.awt.Toolkit;
import java.util.BitSet;
import java.util.Set;
import java.util.TreeSet;

import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.Region;

/**
 * Provides an executable for a sweetspot finder.
 * <p>
 * We are looking for two types of spots.
 * <ol>
 * <li>Tenaril spell destination
 * <ol>
 * <li>mountain terrain</li>
 * <li>at least 10 squares from nearest city</li>
 * <li>high food square nearby</li>
 * <li>mineral square nearby</li>
 * <li>trade hub nearby</li>
 * </ol>
 * </li>
 * <li>Exodus destination
 * <ol>
 * <li>7 food</li>
 * <li>5 wood</li>
 * <li>mountain terrain</li>
 * <li>at least 10 squares from nearest city</li>
 * <li>high food square nearby</li>
 * <li>mineral square nearby</li>
 * <li>trade hub nearby</li>
 * </ol>
 * </li>
 * </ol>
 * </p>
 */
public final class SweetspotFinderRunner
{
    /** Broken Lands hub for Dwarves. */
    private static final Point CLOGHORDS_HAVEN_HUB = new Point(-498, -1887);

    /** Broken Lands hub for Orcs. */
    private static final Point GRISJ_HHURAGK_HUB = new Point(180, -3124);

    /** Guthix city. */
    // private static final Point GRISLY_GHOUL_GARRISON = new Point(216, -3120);

    /** Flag indicating if the search is for Zarek Lock or Guthix. */
    private static final boolean IS_ZAREK_LOCK = false;

    /** Zarek Lock city. */
    // private static final Point LOCKAND_KEY = new Point(-424, -1914);

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String args[])
    {
        final long start = System.currentTimeMillis();

        final boolean isElgea = false;
        final GeoIdConverter converter = new GeoIdConverter(isElgea);

        final SweetspotFinderRunner runner = new SweetspotFinderRunner(converter);

        // Search.
        runner.search();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("\nSweetspotFinderRunner", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Geospatial index converter. */
    private final GeoIdConverter converter;

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     */
    @SuppressWarnings("hiding")
    public SweetspotFinderRunner(final GeoIdConverter converter)
    {
        this.converter = converter;
    }

    /**
     * Search.
     * 
     * @return potential destinations.
     */
    public BitSet search()
    {
        final SweetspotFinder finder = createSweetspotFinder();
        // final SweetspotFinder finder = createSweetspotFinderIceheart();

        BitSet squares = finder.search();

        {
            final int radius = 400;
            System.out.println("radius = " + radius);
            int geoId;

            if (IS_ZAREK_LOCK)
            {
                geoId = converter.pointToIndex(CLOGHORDS_HAVEN_HUB);
            }
            else
            {
                geoId = converter.pointToIndex(GRISJ_HHURAGK_HUB);
            }

            squares = finder.filterSquareClose(geoId, squares, radius, false);
        }

        System.out.println("squares.cardinality() = " + squares.cardinality());

        report("New settlement squares", squares, finder);

        return squares;
    }

    /**
     * @return a new sweetspot finder.
     */
    private SweetspotFinder createSweetspotFinder()
    {
        final WorldMapDatabase worldMapDatabase = new FastWorldMapDatabase(converter);
        final MineralDatabase mineralDatabase = new DefaultMineralDatabase(converter);
        final TownDatabase townDatabase = new DefaultTownDatabase(converter);

        final SweetspotFinder answer = new SweetspotFinder(converter, worldMapDatabase, mineralDatabase, townDatabase);

        answer.setSevenFood(true);
        answer.setEightFood(true);

        answer.setInRegions(true);
        answer.setRegions(getRegions());

        answer.setOnTerrainSpecific(true);
        answer.setTerrainSpecifics(TerrainSpecific.settleableValues());

        answer.setNoTownTooClose(true);
        answer.setNoTownTooCloseRadius(10);

        answer.setHighFoodClose(true);
        answer.setHighFoodRadius(5);
        answer.setMineralClose(true);
        answer.setMineralRadius(5);
        answer.setTradeHubClose(true);
        answer.setTradeHubRadius(500);

        return answer;
    }

    /**
     * @return a new sweetspot finder.
     */
    private SweetspotFinder createSweetspotFinderIceheart()
    {
        final WorldMapDatabase worldMapDatabase = new FastWorldMapDatabase(converter);
        final MineralDatabase mineralDatabase = new DefaultMineralDatabase(converter);
        final TownDatabase townDatabase = new DefaultTownDatabase(converter);

        final SweetspotFinder answer = new SweetspotFinder(converter, worldMapDatabase, mineralDatabase, townDatabase);

        answer.setSevenFood(true);
        answer.setEightFood(true);

        answer.setInRegions(true);
        answer.setRegions(getRegions());

        answer.setOnTerrainSpecific(true);
        answer.setTerrainSpecifics(TerrainSpecific.settleableValues());

        answer.setNoTownTooClose(true);
        answer.setNoTownTooCloseRadius(10);

        answer.setMineralClose(true);
        answer.setMineralRadius(30);

        return answer;
    }

    /**
     * @return regions.
     */
    private Set<Region> getRegions()
    {
        final Set<Region> answer = new TreeSet<Region>();

        if (IS_ZAREK_LOCK)
        {
            // Zarek Lock.
            answer.add(Region.COANHARA);
            answer.add(Region.NORTHMARCH);
            answer.add(Region.WESTMARCH);
            answer.add(Region.OARNAMLY);
            // answer.add(Region.HURONIRE);
            // answer.add(Region.GLANHAD);
        }
        else
        {
            // Guthix.
            // answer.add(Region.SHARDLANDS);
            answer.add(Region.JURGOR);
            // answer.add(Region.THE_ORKEN_COAST);
            // answer.add(Region.THE_LONG_WHITE);
        }

        return answer;
    }

    /**
     * @param title Report title.
     * @param squares Squares.
     * @param finder Sweetspot finder.
     */
    private void report(final String title, final BitSet squares, final SweetspotFinder finder)
    {
        System.out.println("SweetspotFinderRunner.report()");

        // Report.
        final SquareReporter reporter = new SquareReporter(converter, squares, finder);
        reporter.report(null);
    }
}
