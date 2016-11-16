package org.vizzini.illyriad.robot.inventory;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.illyriad.City;
import org.vizzini.illyriad.IngredientRecipeBuilder;
import org.vizzini.illyriad.ResourceIngredient;
import org.vizzini.illyriad.ResourceIngredientCollection;
import org.vizzini.illyriad.ResourceMap;
import org.vizzini.illyriad.Shipper;
import org.vizzini.illyriad.ShippingOffice;
import org.vizzini.illyriad.TradeHub;

/**
 * Provides a shipping reporter.
 */
public final class ShippingReporter
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        final IngredientRecipeBuilder builder = new IngredientRecipeBuilder();
        builder.build();

        final File inventoryFile = Locations.INVENTORY_DATA_FILEPATH;
        System.out.println("inventoryFile = " + inventoryFile);
        final File distanceFile = new File(Locations.INVENTORY_DATA_DIR, "distances.html");

        Reader inventoryReader = null;
        Writer distanceWriter = null;
        final Writer outputWriter = new StringWriter();

        try
        {
            inventoryReader = new FileReader(inventoryFile);
            distanceWriter = new FileWriter(distanceFile);

            final ShippingReporter reporter = new ShippingReporter(builder.getIngredientCollection(), inventoryReader,
                    distanceWriter, outputWriter);

            reporter.report();
        }
        catch (final FileNotFoundException e)
        {
            throw new RuntimeException(e);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            if (inventoryReader != null)
            {
                try
                {
                    inventoryReader.close();
                }
                catch (final IOException ignore)
                {
                    // Nothing to do.
                }
            }

            if (distanceWriter != null)
            {
                try
                {
                    distanceWriter.flush();
                    distanceWriter.close();
                }
                catch (final IOException ignore)
                {
                    // Nothing to do.
                }
            }

            try
            {
                outputWriter.flush();
                outputWriter.close();
            }
            catch (final IOException ignore)
            {
                // Nothing to do.
            }
        }

        System.out.println(outputWriter.toString());
    }

    /** Map of city to map of resource to amount. */
    private final Map<City, ResourceMap> cityResourceMap = new HashMap<City, ResourceMap>();

    /** Distance writer. */
    private final Writer distanceWriter;

    /** Inventory reader. */
    private final Reader inventoryReader;

    /** Inventory writer. */
    private final Writer shippingWriter;

    /** Resource ingredient collection. */
    private final ResourceIngredientCollection ingredients;

    /**
     * Construct this object.
     * 
     * @param ingredients Resource ingredient collection.
     * @param inventoryReader Inventory reader. (required)
     * @param distanceWriter Distance writer. (required)
     * @param shippingWriter Shipping writer. (required)
     */
    @SuppressWarnings("hiding")
    public ShippingReporter(final ResourceIngredientCollection ingredients, final Reader inventoryReader,
            final Writer distanceWriter, final Writer shippingWriter)
    {
        if (ingredients == null)
        {
            throw new IllegalArgumentException("ingredients is null");
        }

        if (inventoryReader == null)
        {
            throw new IllegalArgumentException("inventoryReader is null");
        }

        if (distanceWriter == null)
        {
            throw new IllegalArgumentException("distanceWriter is null");
        }

        if (shippingWriter == null)
        {
            throw new IllegalArgumentException("shippingWriter is null");
        }

        this.ingredients = ingredients;
        this.inventoryReader = inventoryReader;
        this.distanceWriter = distanceWriter;
        this.shippingWriter = shippingWriter;
    }

    /**
     * Create a map of city to a map of resource to amount.
     */
    public void createCityResourceMap()
    {
        final long start = System.currentTimeMillis();

        final BufferedReader reader = new BufferedReader(inventoryReader);
        String line;

        try
        {
            while ((line = reader.readLine()) != null)
            {
                if (StringUtils.isNotEmpty(line) && !line.startsWith("//"))
                {
                    final String[] parts = line.split("[ ]");

                    final String valueString = parts[0];
                    final String resourceString = parts[1];

                    String cityName;

                    if (parts.length == 3)
                    {
                        cityName = parts[2];
                    }
                    else
                    {
                        cityName = parts[2] + " " + parts[3];
                    }

                    final City city = City.valueOfDisplayName(cityName);

                    if (city == null)
                    {
                        throw new RuntimeException("Unknown city: [" + cityName + "]");
                    }

                    final ResourceIngredient resource = ingredients.findByName(resourceString);

                    if (resource == null)
                    {
                        throw new RuntimeException("Unknown resource: [" + resourceString + "]");
                    }

                    final int value = Integer.parseInt(valueString);

                    final ResourceMap map = getResourceMap(city);
                    map.put(resource, value);
                }
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }

        final long end = System.currentTimeMillis();
        System.out.println("Loaded " + cityResourceMap.size() + " city inventory in " + (end - start) + " msec.");
    }

    /**
     * Write a resource report.
     */
    public void report()
    {
        createCityResourceMap();

        writeDistanceReport();
        writeShippingReport();
    }

    /**
     * @return a map of city to closest city.
     */
    private Map<City, City> determineClosestCities()
    {
        final Map<City, City> answer = new HashMap<City, City>();

        for (final City city : City.values())
        {
            answer.put(city, determineClosestCity(city));
        }

        return answer;
    }

    /**
     * @param city City.
     * 
     * @return the closest city to the given city.
     */
    private City determineClosestCity(final City city)
    {
        City answer = null;

        Double min = Double.MAX_VALUE;

        for (final City city2 : City.values())
        {
            if (city != city2)
            {
                final Double distance = city2.computeDistance(city);

                if (distance < min)
                {
                    answer = city2;
                    min = distance;
                }
            }
        }

        return answer;
    }

    /**
     * @param city City.
     * 
     * @return the closest trade hub to the given city.
     */
    private TradeHub determineClosestHub(final City city)
    {
        TradeHub answer = null;

        Double min = Double.MAX_VALUE;

        for (final TradeHub hub : TradeHub.values())
        {
            final Double distance = hub.computeDistance(city);

            if (distance < min)
            {
                answer = hub;
                min = distance;
            }
        }

        return answer;
    }

    /**
     * @return a map of city to closest trade hub.
     */
    private Map<City, TradeHub> determineClosestHubs()
    {
        final Map<City, TradeHub> answer = new HashMap<City, TradeHub>();

        for (final City city : City.values())
        {
            answer.put(city, determineClosestHub(city));
        }

        return answer;
    }

    /**
     * @return a date time string.
     */
    private String getDateTimeString()
    {
        final Date date = new Date();
        final DateFormat formatter = new SimpleDateFormat("yyyy.MM.dd HH:mm");

        return formatter.format(date);
    }

    /**
     * @param city City.
     * 
     * @return the resource map for the given parameter.
     */
    private ResourceMap getResourceMap(final City city)
    {
        ResourceMap answer = cityResourceMap.get(city);

        if (answer == null)
        {
            answer = new ResourceMap();
            cityResourceMap.put(city, answer);
        }

        return answer;
    }

    /**
     * Write a distance report.
     */
    private void writeDistanceReport()
    {
        // Determine the closest city to each city.
        final Map<City, City> cityMinimums = determineClosestCities();

        try
        {
            writeHtmlFileHeader(distanceWriter, "Illyriad Towns: Distances");
            distanceWriter.write("<p>This table shows the distances between the cities of Zarek Lock.</a></p>");
            distanceWriter.write("</td></tr>\n");
            distanceWriter.write("<tr><td>\n");

            distanceWriter.write("<p class='padding-top-10'><b>City Distances</b>\n");
            distanceWriter.write("<table class='table-details'>\n");
            distanceWriter.write("<tr>\n");
            distanceWriter.write("<th class='table-header-cell-details'></th>");

            for (final City city : City.values())
            {
                distanceWriter.write("<th class='table-header-cell-details'>");
                distanceWriter.write(city.getDisplayName());
                distanceWriter.write("</th>\n");
            }

            distanceWriter.write("</tr>\n");

            for (final City city : City.values())
            {
                distanceWriter.write("<tr>\n");
                distanceWriter.write("<td class='table-header-cell-details'>");
                distanceWriter.write(city.getDisplayName());
                distanceWriter.write("</td>\n");

                for (final City city2 : City.values())
                {
                    if (city == city2)
                    {
                        distanceWriter.write("<td class='table-cell-details background-lightgrey'>&nbsp</td>");
                    }
                    else
                    {
                        if (city2 == cityMinimums.get(city))
                        {
                            distanceWriter.write("<td class='table-cell-details right background-yellow'>");
                        }
                        else
                        {
                            distanceWriter.write("<td class='table-cell-details right'>");
                        }

                        distanceWriter.write(String.format("%10.1f", city.computeDistance(city2)));
                        distanceWriter.write("</td>\n");
                    }
                }

                distanceWriter.write("</tr>\n");
            }

            distanceWriter.write("</table>\n");
            distanceWriter.write("</td></tr>\n");
            distanceWriter.write("<tr><td>\n");

            // Determine the closest trade hub to each city.
            final Map<City, TradeHub> hubMinimums = determineClosestHubs();

            distanceWriter.write("<p class='padding-top-10'><b>Trade Hub Distances</b>\n");
            distanceWriter.write("<table class='table-details'>\n");
            distanceWriter.write("<tr>\n");
            distanceWriter.write("<th class='table-header-cell-details'></th>");

            for (final TradeHub hub : TradeHub.values())
            {
                distanceWriter.write("<th class='table-header-cell-details'>");
                distanceWriter.write(hub.getDisplayName());
                distanceWriter.write("</th>\n");
            }

            distanceWriter.write("</tr>\n");

            for (final City city : City.values())
            {
                distanceWriter.write("<tr>\n");
                distanceWriter.write("<td class='table-header-cell-details'>");
                distanceWriter.write(city.getDisplayName());
                distanceWriter.write("</td>\n");

                for (final TradeHub hub : TradeHub.values())
                {
                    if (hub == hubMinimums.get(city))
                    {
                        distanceWriter.write("<td class='table-cell-details right background-yellow'>");
                    }
                    else
                    {
                        distanceWriter.write("<td class='table-cell-details right'>");
                    }
                    distanceWriter.write(String.format("%10.1f", hub.computeDistance(city)));
                    distanceWriter.write("</td>\n");
                }

                distanceWriter.write("</tr>\n");
            }

            distanceWriter.write("</table>\n");
            distanceWriter.write("</td></tr>\n");
            writeHtmlFileFooter(distanceWriter);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param writer Writer.
     */
    private void writeHtmlFileFooter(final Writer writer)
    {
        try
        {
            writer.write("<tr><td class='padding-top-10'>\n");
            writer.write("<p>Generated " + getDateTimeString() + "</p>");
            writer.write("</td>\n");
            writer.write("</tr>\n");
            writer.write("<script src='../../includes/footer.js' type='text/javascript'></script>\n");
            writer.write("</tbody>\n");
            writer.write("</table>\n");

            writer.write("</body>\n");
            writer.write("</html>");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param writer Writer.
     * @param title Title.
     */
    private void writeHtmlFileHeader(final Writer writer, final String title)
    {
        try
        {
            writer.write("<html>\n");
            writer.write("<head>\n");
            writer.write("<title>");
            writer.write(title);
            writer.write("</title>\n");
            writer.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"../../includes/style.css\" />\n");
            writer.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" />\n");
            writer.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"https://dl.dropboxusercontent.com/u/1267954/website/includes/style.css\" />\n");
            writer.write("</head>\n");
            writer.write("<body>\n");
            writer.write("<table id='mainTable'>\n");
            writer.write("<tbody>\n");
            writer.write("<tr>\n");
            writer.write("<td style='font-size: small; padding: 0px;'>\n");
            writer.write("<a href='../../index.html'>Home</a> &gt; <a href='../index.html'>Game</a> &gt; <a href='index.html'>Illyriad</a>\n");
            writer.write("</td>\n");
            writer.write("</tr>\n");
            writer.write("<tr class='accent'>\n");
            writer.write("<td class='header1' colspan='2'>" + title + "</td>\n");
            writer.write("</tr>\n");
            writer.write("<tr>\n");
            writer.write("<td>&nbsp;</td>\n");
            writer.write("</tr>\n");
            writer.write("<tr>\n");
            writer.write("<td>\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * Write a shipping report.
     */
    private void writeShippingReport()
    {
        final ShippingOffice office = new ShippingOffice(ingredients, cityResourceMap);
        final Shipper shipper = office.determineShipper();

        try
        {
            shippingWriter.write("\n");
            shippingWriter.write(shipper.toString());
            shippingWriter.write("\n");
            shippingWriter.write("Best shipper fitness = ");
            shippingWriter.write(String.valueOf(shipper.getFitness()));
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}
