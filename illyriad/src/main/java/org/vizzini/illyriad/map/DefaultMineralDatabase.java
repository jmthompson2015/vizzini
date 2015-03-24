package org.vizzini.illyriad.map;

import java.awt.Point;
import java.awt.Toolkit;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.BitSet;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.Mineral;

/**
 * Provides a database of mineral information.
 */
public final class DefaultMineralDatabase implements MineralDatabase
{
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

        final DefaultMineralDatabase database = new DefaultMineralDatabase(converter);
        database.report();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("\nDefaultMineralDatabase", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** All mineral squares. */
    private final BitSet allMineralSquares;

    /** Geospatial ID converter. */
    private final GeoIdConverter converter;

    /** Map of index to mineral amount. */
    private final Map<Integer, Integer> mineralAmounts = new TreeMap<Integer, Integer>();

    /** Mineral squares. */
    private final Map<Mineral, BitSet> mineralSquares = new HashMap<Mineral, BitSet>();

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     */
    @SuppressWarnings("hiding")
    public DefaultMineralDatabase(final GeoIdConverter converter)
    {
        this(converter, new InputStreamReader(DefaultMineralDatabase.class.getClassLoader().getResourceAsStream(
                converter.isElgea() ? "mapData/elgea/illy_gems_22.js"
                        : "mapData/brokenLands/datafile_rare_minerals.txt")));
    }

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter. (required)
     * @param mineralDataReader Mineral data reader. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultMineralDatabase(final GeoIdConverter converter, final Reader mineralDataReader)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        if (mineralDataReader == null)
        {
            throw new IllegalArgumentException("mineralDataReader is null");
        }

        this.converter = converter;

        allMineralSquares = new BitSet();

        if (isElgea())
        {
            loadMineralSquaresElgea(mineralDataReader);
        }
        else
        {
            loadMineralSquaresBrokenLands(mineralDataReader);
        }

        final boolean isPrinting = false;

        if (isPrinting)
        {
            printData();
        }
    }

    @Override
    public Mineral findMineralFor(final int index, final boolean isVerbose)
    {
        Mineral answer = null;

        for (final Mineral mineral : Mineral.values())
        {
            final BitSet minerals = mineralSquares.get(mineral);

            if ((minerals != null) && minerals.get(index))
            {
                answer = mineral;
                break;
            }
        }

        return answer;
    }

    @Override
    public BitSet getAllMineralSquares()
    {
        return allMineralSquares;
    }

    @Override
    public GeoIdConverter getConverter()
    {
        return converter;
    }

    @Override
    public int getMineralAmount(final int index)
    {
        final Integer amount = mineralAmounts.get(index);

        return (amount == null ? 0 : amount);
    }

    @Override
    public BitSet getMineralSquares(final Mineral mineral)
    {
        if (mineral == null)
        {
            throw new IllegalArgumentException("mineral is null");
        }

        BitSet answer = mineralSquares.get(mineral);

        if (answer == null)
        {
            answer = new BitSet();
            mineralSquares.put(mineral, answer);
        }

        return answer;
    }

    /**
     * Write a report for sharing.
     */
    public void report()
    {
        final Map<Integer, Map<Integer, Mineral>> map = new TreeMap<Integer, Map<Integer, Mineral>>();

        for (int index = allMineralSquares.nextSetBit(0); index >= 0; index = allMineralSquares.nextSetBit(index + 1))
        {
            final Mineral mineral = findMineralFor(index, false);
            final Point point = converter.indexToPoint(index);

            Map<Integer, Mineral> xMap = map.get(point.x);

            if (xMap == null)
            {
                xMap = new TreeMap<Integer, Mineral>();
                map.put(point.x, xMap);
            }

            xMap.put(point.y, mineral);
        }

        System.out.println("X\tY\tOre Type\tOre Amount");

        for (final Entry<Integer, Map<Integer, Mineral>> xEntry : map.entrySet())
        {
            final Integer x = xEntry.getKey();
            for (final Entry<Integer, Mineral> yEntry : xEntry.getValue().entrySet())
            {
                final Integer y = yEntry.getKey();
                final Mineral mineral = yEntry.getValue();
                final int index = converter.coordsToIndex(x, y);
                Integer amount = mineralAmounts.get(index);

                if (amount == null)
                {
                    amount = 0;
                }

                System.out.println(x + "\t" + y + "\t" + mineral.getDisplayName() + "\t" + amount);
            }
        }
    }

    /**
     * Determine all mineral locations.
     */
    private void determineAllMineralSquares()
    {
        for (final Mineral mineral : Mineral.values())
        {
            final BitSet minerals = mineralSquares.get(mineral);

            if (minerals != null)
            {
                allMineralSquares.or(minerals);
            }
        }
    }

    /**
     * @param mineral0 Existing mineral.
     * @param name Mineral name.
     * 
     * @return the mineral.
     */
    private Mineral determineMineral(final Mineral mineral0, final String name)
    {
        Mineral answer = null;

        if (StringUtils.isNotEmpty(name))
        {
            answer = Mineral.valueOfDisplayName(name);

            if (answer == null)
            {
                System.err.println("failed to find mineral for name [" + name + "]");
            }
        }

        if ((answer == null) || (answer == Mineral.UNKNOWN))
        {
            answer = (mineral0 != null ? mineral0 : Mineral.UNKNOWN);
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
     * Load mineral locations.
     */
    private void loadMineralSquaresBLNesse()
    {
        final long start = System.currentTimeMillis();

        Reader mineralDataReader = null;
        BufferedReader myReader = null;

        try
        {
            mineralDataReader = new InputStreamReader(getClass().getClassLoader().getResourceAsStream(
                    "mapData/brokenLands/datafile_rare_minerals_nesse.txt"));
            myReader = new BufferedReader(mineralDataReader);

            // Skip the first line.
            String line = myReader.readLine();

            final String prefix = "#/World/Map/";

            while ((line = myReader.readLine()) != null)
            {
                if (line.startsWith(prefix))
                {
                    line = line.substring(prefix.length());
                }

                final String[] parts = line.split("[\t]");
                final int length = parts.length;
                final String xString = parts[length - 4].trim();
                final String yString = parts[length - 3].trim();

                final int x = Integer.parseInt(xString);
                final int y = Integer.parseInt(yString);

                if (converter.isCoordsInRange(x, y))
                {
                    final int index = converter.coordsToIndex(x, y);

                    final String amountString = parts[length - 1].trim();
                    String name = parts[length - 2].trim();

                    // Fix spelling errors.
                    if ("Aeghis".equals(name) || "Aegheris".equals(name))
                    {
                        name = Mineral.AEGHRIS.getDisplayName();
                    }
                    else if ("Deep silver".equals(name))
                    {
                        name = Mineral.DEEPSILVER.getDisplayName();
                    }
                    else if ("obsidian".equals(name))
                    {
                        name = Mineral.OBSIDIAN.getDisplayName();
                    }
                    else if ("Raibowstone".equals(name) || "Rainbow".equals(name))
                    {
                        name = Mineral.RAINBOWSTONE.getDisplayName();
                    }
                    else if ("Svelaugh".equals(name))
                    {
                        name = Mineral.SVELAUGH_SAND.getDisplayName();
                    }

                    final Mineral mineral0 = findMineralFor(index, false);

                    if (mineral0 != null)
                    {
                        getMineralSquares(mineral0).clear(index);
                    }

                    final Mineral mineral = determineMineral(mineral0, name);
                    getMineralSquares(mineral).set(index);

                    if (StringUtils.isNotEmpty(amountString))
                    {
                        try
                        {
                            final int amount = Integer.parseInt(amountString);
                            mineralAmounts.put(index, amount);
                        }
                        catch (final Throwable ignore)
                        {
                            // Nothing to do.
                        }
                    }
                }
                else
                {
                    System.out.println("Coordinates " + x + ", " + y + " are out of range.");
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
            fileUtils.close(mineralDataReader);
        }

        determineAllMineralSquares();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("DefaultMineralDatabase.loadMineralSquaresBLNesse() ", start, end);
    }

    /**
     * Load mineral locations.
     */
    private void loadMineralSquaresBLSpreadsheet()
    {
        final long start = System.currentTimeMillis();

        Reader mineralDataReader = null;
        BufferedReader myReader = null;

        try
        {
            mineralDataReader = new InputStreamReader(getClass().getClassLoader().getResourceAsStream(
                    "mapData/brokenLands/datafile_rare_minerals_spreadsheet.txt"));
            myReader = new BufferedReader(mineralDataReader);

            // Skip the first line.
            String line = myReader.readLine();

            final String prefix = "http://elgea.illyriad.co.uk/#/World/Map/";

            while ((line = myReader.readLine()) != null)
            {
                final String[] parts = line.split("[\t]");
                String link = parts[0];
                link = link.substring(prefix.length());
                final String[] coordinates = link.split("[/]");
                final String xString = coordinates[0];
                final String yString = coordinates[1];

                final int x = Integer.parseInt(xString);
                final int y = Integer.parseInt(yString);

                if (converter.isCoordsInRange(x, y))
                {
                    final int index = converter.coordsToIndex(x, y);

                    String name = (parts.length > 1 ? parts[1] : null);

                    // Fix spelling errors.
                    if ("Rainbow".equals(name))
                    {
                        name = Mineral.RAINBOWSTONE.getDisplayName();
                    }
                    else if ("Svelaugh".equals(name))
                    {
                        name = Mineral.SVELAUGH_SAND.getDisplayName();
                    }

                    final Mineral mineral0 = findMineralFor(index, false);

                    if (mineral0 != null)
                    {
                        getMineralSquares(mineral0).clear(index);
                    }

                    final Mineral mineral = determineMineral(mineral0, name);
                    getMineralSquares(mineral).set(index);
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
            fileUtils.close(mineralDataReader);
        }

        determineAllMineralSquares();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("DefaultMineralDatabase.loadMineralSquaresBLSpreadsheet() ", start, end);
    }

    /**
     * Load mineral locations.
     * 
     * @param mineralDataReader Mine data reader. (required)
     */
    private void loadMineralSquaresBrokenLands(final Reader mineralDataReader)
    {
        final long start = System.currentTimeMillis();

        BufferedReader myReader = null;

        try
        {
            myReader = new BufferedReader(mineralDataReader);

            // Skip the first line.
            String line = myReader.readLine();

            while ((line = myReader.readLine()) != null)
            {
                final String[] parts = line.split("[/]");

                final int x = Integer.parseInt(parts[0]);
                final int y = Integer.parseInt(parts[1]);

                if (converter.isCoordsInRange(x, y))
                {
                    final int index = converter.coordsToIndex(x, y);
                    final int mineralId = Integer.parseInt(parts[2]);
                    final Mineral mineral = Mineral.valueOfId(mineralId);

                    if (mineral == null)
                    {
                        throw new RuntimeException("Unknown mineral for mineralId = " + mineralId);
                    }

                    if (getMineralSquares(mineral).get(index))
                    {
                        System.out.println("DefaultMineralDatabase duplicate entry: " + line);
                    }

                    getMineralSquares(mineral).set(index);

                    final int amount = Integer.parseInt(parts[3]);
                    mineralAmounts.put(index, amount);
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

        loadMineralSquaresBLNesse();
        loadMineralSquaresBLSpreadsheet();

        determineAllMineralSquares();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("DefaultMineralDatabase.loadMineralSquaresBrokenLands() ", start, end);
    }

    /**
     * Load mineral locations. Data from <a href="http://www.puzzleslogic.com/illy/illy_gems_22.js"></a>
     * 
     * @param mineralDataReader Mine data reader. (required)
     */
    private void loadMineralSquaresElgea(final Reader mineralDataReader)
    {
        final long start = System.currentTimeMillis();

        final FileUtilities fileUtils = new FileUtilities();
        final String content = fileUtils.readContent(mineralDataReader);
        String data = StringUtils.substringBetween(content, "\"", "\";");
        data = data.replaceAll("[\r\n]", "");
        final String[] entries = data.split("[*]");

        for (final String entry : entries)
        {
            final String[] parts = entry.split(":");
            final String[] coords = parts[0].split("[|]");
            final int x = Integer.parseInt(coords[0]);
            final int y = Integer.parseInt(coords[1]);

            if (converter.isCoordsInRange(x, y))
            {
                final int index = converter.coordsToIndex(x, y);
                final int id = Integer.parseInt(parts[1]);
                final Mineral mineral = Mineral.valueOfId(id);

                if (mineral == null)
                {
                    throw new RuntimeException("Unknown mineral for id = " + id);
                }

                getMineralSquares(mineral).set(index);
            }
        }

        determineAllMineralSquares();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("DefaultMineralDatabase.loadMineralSquaresElgea() ", start, end);
    }

    /**
     * Print the data as a sorted list.
     */
    private void printData()
    {
        final String delimiter = "/";
        final String negativeFormat = "%05d";
        final String positiveFormat = "%04d";
        final List<String> list = new ArrayList<String>();

        for (final Entry<Mineral, BitSet> entry : mineralSquares.entrySet())
        {
            final Mineral mineral = entry.getKey();
            final BitSet bitSet = entry.getValue();

            for (int index = bitSet.nextSetBit(0); index >= 0; index = bitSet.nextSetBit(index + 1))
            {
                final Point point = converter.indexToPoint(index);
                final String format = (point.x < 0 ? negativeFormat : positiveFormat);
                final String x = String.format(format, point.x);
                final int amount = getMineralAmount(index);

                list.add(x + delimiter + point.y + delimiter + mineral.getId() + delimiter + amount);
            }
        }

        Collections.sort(list);

        System.out.println("X/Y/MineralID/MineralAmount");

        for (final String line : list)
        {
            System.out.println(line);
        }
    }
}
