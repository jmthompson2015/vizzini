package org.vizzini.illyriad.map;

import java.awt.Point;
import java.awt.Toolkit;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.FileUtilities;

/**
 * Provides a preprocessor for geo ID data.
 */
public final class GeoIdPointFetcher
{
    /** Map points of interest. */
    private static final List<Point> POINTS = new ArrayList<Point>();

    static
    {
        // Elgea.
        POINTS.add(new Point(-1000, 0)); // left center
        POINTS.add(new Point(0, 0)); // center
        POINTS.add(new Point(1000, 0)); // right center

        POINTS.add(new Point(-1000, 1000)); // left top
        POINTS.add(new Point(0, 1000)); // center top
        POINTS.add(new Point(1000, 1000)); // right top

        POINTS.add(new Point(-1000, -1000)); // left bottom
        POINTS.add(new Point(0, -1000)); // center bottom
        POINTS.add(new Point(1000, -1000)); // right bottom

        // Broken Lands.
        POINTS.add(new Point(-1000, -2300)); // left center
        POINTS.add(new Point(0, -2300)); // center
        POINTS.add(new Point(1000, -2300)); // right center

        POINTS.add(new Point(-1000, -1300)); // left top
        POINTS.add(new Point(0, -1300)); // center top
        POINTS.add(new Point(1000, -1300)); // right top

        POINTS.add(new Point(-1000, -3300)); // left bottom
        POINTS.add(new Point(0, -3300)); // center bottom
        POINTS.add(new Point(1000, -3300)); // right bottom
    }

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String args[])
    {
        final long start = System.currentTimeMillis();

        final GeoIdPointFetcher preprocessor = new GeoIdPointFetcher();

        preprocessor.preprocess();
        // preprocessor.solveEquation();

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
    public GeoIdPointFetcher()
    {
        this.worldmapDataReader = new InputStreamReader(GeoIdPointFetcher.class.getClassLoader().getResourceAsStream(
                "mapData/datafile_worldmap.txt"));
    }

    /**
     * Pre-process.
     */
    public void preprocess()
    {
        final long start = System.currentTimeMillis();

        final Map<Point, Integer> pointToGeoId = new TreeMap<Point, Integer>(createPointComparator());
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
                final int geoId = parser.getGeoId(parts);
                final int x = parser.getX(parts);
                final int y = parser.getY(parts);
                final Point point = new Point(x, y);

                if (POINTS.contains(point))
                {
                    pointToGeoId.put(point, geoId);

                    System.out.println("pointToGeoId.size() = " + pointToGeoId.size());

                    if (pointToGeoId.size() >= POINTS.size())
                    {
                        break;
                    }
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

        for (final Entry<Point, Integer> entry : pointToGeoId.entrySet())
        {
            final Point point = entry.getKey();
            System.out.println("{ " + point.x + ", " + point.y + ", " + entry.getValue() + "},");
        }

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("GeoIdPointFetcher.preprocess()", start, end);
    }

    /**
     * Solve the equation.
     */
    // public void solveEquation()
    // {
    // // f(x, y) = a * x + b * y + c
    //
    // // Elgea.
    // {
    // final Integer[][] points = { // elgea
    // { -1000, 1000, 1 }, { 0, 1000, 1001 }, // 1 center top
    // { 1000, 1000, 2001 }, { -1000, 0, 2001001 }, { 0, 0, 2002001 }, // 4 center
    // { 1000, 0, 2003001 }, // 5 right center
    // { -1000, -1000, 4002001 }, { 0, -1000, 4003001 }, { 1000, -1000, 4004001 }, };
    //
    // solveEquation("Elgea", 4, 1, 5, points);
    // // solveEquation("Elgea", 0, 4, 8, points);
    // }
    //
    // // Broken Lands.
    // {
    // final Integer[][] points = { // broken lands
    // { -1000, -1300, 4871523 }, { 0, -1300, 6434413 }, { 1000, -1300, 8552012 }, { -1000, -2300, 8553312 },
    // { 0, -2300, 4502322 }, { 1000, -2300, 4871136 }, { -1000, -3300, 8552312 }, { 0, -3300, 6432770 },
    // { 1000, -3300, 8550357 }, };
    //
    // // solveEquation("Broken Lands", 0, 4, 8, points);
    // solveEquation("Broken Lands", 4, 1, 5, points);
    // // solveEquation("Broken Lands", 0, 1, 2, points);
    // }
    // }

    /**
     * @param x X coordinate.
     * @param b b parameter.
     * @param y Y coordinate.
     * @param c c parameter.
     * @param f Function value.
     * 
     * @return the computed value.
     */
    // private int computeA(final int x, final int b, final int y, final int c, final int f)
    // {
    // return (f - (b * y) - c) / x;
    // }

    /**
     * @param a a parameter.
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param c c parameter.
     * @param f Function value.
     * 
     * @return the computed value.
     */
    // private int computeB(final int a, final int x, final int y, final int c, final int f)
    // {
    // return (f - (a * x) - c) / y;
    // }

    /**
     * @param a a parameter.
     * @param x X coordinate.
     * @param b b parameter.
     * @param y Y coordinate.
     * @param f Function value.
     * 
     * @return the computed value.
     */
    // private int computeC(final int a, final int x, final int b, final int y, final int f)
    // {
    // return f - (a * x) - (b * y);
    // }

    /**
     * @return a new comparator.
     */
    private Comparator<Point> createPointComparator()
    {
        return new Comparator<Point>()
        {
            @Override
            public int compare(final Point point1, final Point point2)
            {
                int answer = -1;

                answer = point2.y - point1.y;

                if (answer == 0)
                {
                    answer = point1.x - point2.x;
                }

                return answer;
            }
        };
    }

    /**
     * @param a a parameter.
     * @param b b parameter.
     * @param c c parameter.
     * @param points Points.
     */
    // private void printResults(final int a, final int b, final int c, final Integer[][] points)
    // {
    // System.out.println("x\ty\tff\tf");
    //
    // for (int i = 0; i < points.length; i++)
    // {
    // final Integer[] point = points[i];
    //
    // final int x = point[0];
    // final int y = point[1];
    // final int ff = point[2];
    //
    // int f;
    //
    // if (y >= -1000)
    // {
    // f = (a * x) + (b * y) + c;
    // }
    // else
    // {
    // f = (a * x) + (b * (y + 2300)) + c;
    // }
    //
    // System.out.println(x + "\t" + y + "\t" + ff + "\t" + f);
    // }
    // }

    // private void solveEquation(final String title, final int index0, final int index1, final int index2,
    // final Integer[][] points)
    // {
    // final Integer[] point0 = points[index0];
    // final Integer[] point1 = points[index1];
    // final Integer[] point2 = points[index2];
    //
    // final int x0 = point0[0];
    // final int y0 = point0[1];
    // final int f0 = point0[2];
    //
    // final int x1 = point1[0];
    // final int y1 = point1[1];
    // final int f1 = point1[2];
    //
    // final int x2 = point2[0];
    // final int y2 = point2[1];
    // final int f2 = point2[2];
    //
    // final int x10 = x1 - x0;
    // final int y10 = y1 - y0;
    // final int f10 = f1 - f0;
    //
    // final int x21 = x2 - x1;
    // final int y21 = y2 - y1;
    // final int f21 = f2 - f1;
    //
    // final int a = ((y10 * f21) - (y21 * f10)) / ((x21 * y10) + (x10 * y21));
    //
    // final int b = (f10 - (x10 * a)) / y10;
    //
    // final int c = f0 - (a * x0) - (b * y0);
    //
    // System.out.println(title + ": f(x, y) = " + a + " * x + " + b + " * y + " + c);
    //
    // printResults(a, b, c, points);
    // }
}
