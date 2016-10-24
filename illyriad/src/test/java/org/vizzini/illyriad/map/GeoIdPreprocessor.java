package org.vizzini.illyriad.map;

import java.awt.Point;
import java.awt.Toolkit;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.Writer;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.FileUtilities;

/**
 * Provides a preprocessor for geo ID data.
 * <p>
 * geoId in [4004002, 8606301]
 * </p>
 * <p>
 * x in [-1000, 1000]
 * </p>
 * <p>
 * y in [-3300, -1001]
 * </p>
 */
public final class GeoIdPreprocessor
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String args[])
    {
        final long start = System.currentTimeMillis();

        final GeoIdPreprocessor preprocessor = new GeoIdPreprocessor();

        preprocessor.preprocess();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("\nGeoIdPreprocessor", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** File utilities. */
    private final FileUtilities fileUtils = new FileUtilities();

    /** World map data reader. */
    private final Reader worldmapDataReader;

    /**
     * Construct this object.
     */
    public GeoIdPreprocessor()
    {
        this.worldmapDataReader = new InputStreamReader(GeoIdPreprocessor.class.getClassLoader().getResourceAsStream(
                "mapData/datafile_worldmap.txt"));
    }

    /**
     * Pre-process.
     */
    public void preprocess()
    {
        final long start = System.currentTimeMillis();

        // final Map<Point, Integer> pointToGeoId = new TreeMap<Point, Integer>(createPointComparator());
        final Map<Integer, Point> geoIdToPoint = new TreeMap<Integer, Point>();
        int minGeoId = Integer.MAX_VALUE;
        int maxGeoId = Integer.MIN_VALUE;
        int minX = Integer.MAX_VALUE;
        int maxX = Integer.MIN_VALUE;
        int minY = Integer.MAX_VALUE;
        int maxY = Integer.MIN_VALUE;
        BufferedReader myReader = null;

        try
        {
            myReader = new BufferedReader(worldmapDataReader);
            final MapSquareParser parser = new MapSquareParser();

            // Skip the first line.
            String line = myReader.readLine();

            System.out.println("start while loop");

            while ((line = myReader.readLine()) != null)
            // while (((line = myReader.readLine()) != null) && (pointToGeoId.size() < 2000))
            {
                final String[] parts = parser.split(line);
                final int y = parser.getY(parts);

                // Broken Lands only.
                if (y < -1000)
                {
                    final int x = parser.getX(parts);
                    final int geoId = parser.getGeoId(parts);

                    // if (pointToGeoId.size() > 886000)
                    // {
                    // System.out.println("x, y = " + x + ", " + y + " geoId = " + geoId + " pointToGeoId.size() = "
                    // + pointToGeoId.size());
                    // }

                    final Point point = new Point(x, y);

                    // pointToGeoId.put(point, geoId);
                    geoIdToPoint.put(geoId, point);

                    minGeoId = Math.min(geoId, minGeoId);
                    maxGeoId = Math.max(geoId, maxGeoId);
                    minX = Math.min(x, minX);
                    maxX = Math.max(x, maxX);
                    minY = Math.min(y, minY);
                    maxY = Math.max(y, maxY);
                }

                if (!geoIdToPoint.isEmpty() && ((geoIdToPoint.size() % 100000) == 0))
                {
                    System.out.println("geoIdToPoint.size() = " + geoIdToPoint.size());
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
        }

        System.out.println("end while loop");

        System.out.println("geoId in [" + minGeoId + ", " + maxGeoId + "]");
        System.out.println("x     in [" + minX + ", " + maxX + "]");
        System.out.println("y     in [" + minY + ", " + maxY + "]");

        final File parent = new File("mapData");

        final File file = new File(parent, "datafile_worldmap_coordinates.txt");
        writeData(file, geoIdToPoint);

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("GeoIdPreprocessor.preprocess()", start, end);
    }

    /**
     * @return a new comparator.
     */
    // private Comparator<Point> createPointComparator()
    // {
    // return new Comparator<Point>()
    // {
    // @Override
    // public int compare(final Point point1, final Point point2)
    // {
    // int answer = -1;
    //
    // answer = point2.y - point1.y;
    //
    // if (answer == 0)
    // {
    // answer = point1.x - point2.x;
    // }
    //
    // return answer;
    // }
    // };
    // }

    /**
     * @param file File.
     * @param geoIdToPoint Map of geo ID to point.
     */
    private void writeData(final File file, final Map<Integer, Point> geoIdToPoint)
    {
        Writer writer = null;

        System.out.println("writing to file " + file.getName());

        try
        {
            writer = fileUtils.createFileWriter(file);
            writer.write("GeoID|X|Y\n");

            for (final Entry<Integer, Point> entry : geoIdToPoint.entrySet())
            {
                final int geoId = entry.getKey();
                final Point point = entry.getValue();
                writer.write(String.valueOf(geoId));
                writer.write("|");
                writer.write(String.valueOf(point.x));
                writer.write("|");
                writer.write(String.valueOf(point.y));
                writer.write("\n");
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

        System.out.println("file written");
    }
}
