package org.vizzini.illyriad.map;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.BitSet;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.Mineral;

/**
 * Provides an implementation of a mineral information database which caches nothing to ease memory requirements.
 */
public class NoCacheMineralDatabase implements MineralDatabase
{
    /** Geospatial ID converter. */
    private final GeoIdConverter converter;

    /** File utilities. */
    private final FileUtilities fileUtils = new FileUtilities();

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     */
    @SuppressWarnings("hiding")
    public NoCacheMineralDatabase(final GeoIdConverter converter)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        this.converter = converter;
    }

    @Override
    public Mineral findMineralFor(final int index, final boolean isVerbose)
    {
        final long start = System.currentTimeMillis();

        Mineral answer = null;

        if (isElgea())
        {
            answer = loadSquaresByIndexElgea(index, false);
        }
        else
        {
            answer = loadSquaresByIndexBrokenLands(index, false);
        }

        final long end = System.currentTimeMillis();
        if (isVerbose)
        {
            new TimePrinter().printElapsedTime("NoCacheMineralDatabase.findMineralFor() ", start, end);
        }

        return answer;
    }

    @Override
    public BitSet getAllMineralSquares()
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = new BitSet();

        for (final Mineral mineral : Mineral.values())
        {
            answer.or(getMineralSquares(mineral, false));
        }

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("NoCacheMineralDatabase.getAllMineralSquares() ", start, end);

        return answer;
    }

    @Override
    public GeoIdConverter getConverter()
    {
        return converter;
    }

    @Override
    public int getMineralAmount(final int index)
    {
        // TODO Auto-generated method stub
        return 0;
    }

    @Override
    public BitSet getMineralSquares(final Mineral mineral)
    {
        return getMineralSquares(mineral, true);
    }

    /**
     * @return a new reader.
     */
    private Reader createBrokenLandsReader()
    {
        return new InputStreamReader(NoCacheMineralDatabase.class.getClassLoader().getResourceAsStream(
                "mapData/brokenLands/datafile_rare_minerals.txt"));
    }

    /**
     * @return a new reader.
     */
    private Reader createElgeaReader()
    {
        return new InputStreamReader(NoCacheMineralDatabase.class.getClassLoader().getResourceAsStream(
                "mapData/elgea/illy_gems_22.js"));
    }

    /**
     * @param mineral Mineral.
     * @param isVerbose Flag indicating whether to print output.
     * 
     * @return the mineral squares.
     */
    private BitSet getMineralSquares(final Mineral mineral, final boolean isVerbose)
    {
        BitSet answer = null;

        if (isElgea())
        {
            answer = loadSquaresByMineralElgea(mineral, isVerbose);
        }
        else
        {
            answer = loadSquaresByMineralBrokenLands(mineral, isVerbose);
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
     * @param index Geospatial index.
     * @param isVerbose Flag indicating whether to print output.
     * 
     * @return the mineral for the given parameter.
     */
    private Mineral loadSquaresByIndexBrokenLands(final int index, final boolean isVerbose)
    {
        final long start = System.currentTimeMillis();

        Mineral answer = null;

        final Reader mineralDataReader = createBrokenLandsReader();
        BufferedReader myReader = null;

        try
        {
            myReader = new BufferedReader(mineralDataReader);

            // Skip the first line.
            String line = myReader.readLine();

            while ((line = myReader.readLine()) != null)
            {
                final String[] parts = line.split("[|]");
                final int x = Integer.parseInt(parts[0]);
                final int y = Integer.parseInt(parts[1]);
                final int myIndex = converter.coordsToIndex(x, y);

                if (myIndex == index)
                {
                    final int mineralId = Integer.parseInt(parts[2]);
                    final Mineral mineral = Mineral.valueOfId(mineralId);
                    answer = mineral;
                    break;
                }
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            fileUtils.close(myReader);
            fileUtils.close(mineralDataReader);
        }

        final long end = System.currentTimeMillis();
        if (isVerbose)
        {
            new TimePrinter().printElapsedTime("NoCacheMineralDatabase.loadSquaresByIndexBrokenLands() ", start, end);
        }

        return answer;
    }

    /**
     * Load mineral locations. Data from <a href="http://www.puzzleslogic.com/illy/illy_gems_22.js"></a>
     * 
     * @param index Geospatial index.
     * @param isVerbose Flag indicating whether to print output.
     * 
     * @return the mineral for the given parameter.
     */
    private Mineral loadSquaresByIndexElgea(final int index, final boolean isVerbose)
    {
        final long start = System.currentTimeMillis();

        Mineral answer = null;

        Reader mineralDataReader = null;

        try
        {
            mineralDataReader = createElgeaReader();
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
                final int myIndex = converter.coordsToIndex(x, y);

                if (myIndex == index)
                {
                    final int id = Integer.parseInt(parts[1]);
                    final Mineral mineral = Mineral.valueOfId(id);
                    answer = mineral;
                }
            }
        }
        finally
        {
            fileUtils.close(mineralDataReader);
        }

        final long end = System.currentTimeMillis();
        if (isVerbose)
        {
            new TimePrinter().printElapsedTime("NoCacheMineralDatabase.loadSquaresByIndexElgea() ", start, end);
        }

        return answer;
    }

    /**
     * Load mineral locations.
     * 
     * @param mineral Mineral. (required)
     * @param isVerbose Flag indicating whether to print output.
     * 
     * @return the mineral squares.
     */
    private BitSet loadSquaresByMineralBrokenLands(final Mineral mineral, final boolean isVerbose)
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = new BitSet();

        final Reader mineralDataReader = createBrokenLandsReader();
        BufferedReader myReader = null;

        try
        {
            myReader = new BufferedReader(mineralDataReader);

            // Skip the first line.
            String line = myReader.readLine();

            while ((line = myReader.readLine()) != null)
            {
                final String[] parts = line.split("[|]");
                final int mineralId = Integer.parseInt(parts[2]);

                if (mineralId == mineral.getId())
                {
                    final int x = Integer.parseInt(parts[0]);
                    final int y = Integer.parseInt(parts[1]);
                    final int index = converter.coordsToIndex(x, y);

                    answer.set(index);
                }
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            fileUtils.close(myReader);
            fileUtils.close(mineralDataReader);
        }

        final long end = System.currentTimeMillis();
        if (isVerbose)
        {
            new TimePrinter().printElapsedTime("NoCacheMineralDatabase.loadSquaresByMineralBrokenLands() ", start, end);
        }

        return answer;
    }

    /**
     * Load mineral locations. Data from <a href="http://www.puzzleslogic.com/illy/illy_gems_22.js"></a>
     * 
     * @param mineral Mineral. (required)
     * @param isVerbose Flag indicating whether to print output.
     * 
     * @return the mineral squares.
     */
    private BitSet loadSquaresByMineralElgea(final Mineral mineral, final boolean isVerbose)
    {
        final long start = System.currentTimeMillis();

        final BitSet answer = new BitSet();

        Reader mineralDataReader = null;

        try
        {
            mineralDataReader = createElgeaReader();
            final String content = fileUtils.readContent(mineralDataReader);
            String data = StringUtils.substringBetween(content, "\"", "\";");
            data = data.replaceAll("[\r\n]", "");
            final String[] entries = data.split("[*]");

            for (final String entry : entries)
            {
                final String[] parts = entry.split(":");
                final int id = Integer.parseInt(parts[1]);

                if (id == mineral.getId())
                {
                    final String[] coords = parts[0].split("[|]");
                    final int x = Integer.parseInt(coords[0]);
                    final int y = Integer.parseInt(coords[1]);
                    final int index = converter.coordsToIndex(x, y);

                    answer.set(index);
                }
            }
        }
        finally
        {
            fileUtils.close(mineralDataReader);
        }

        final long end = System.currentTimeMillis();
        if (isVerbose)
        {
            new TimePrinter().printElapsedTime("NoCacheMineralDatabase.loadSquaresByMineralElgea() ", start, end);
        }

        return answer;
    }
}
