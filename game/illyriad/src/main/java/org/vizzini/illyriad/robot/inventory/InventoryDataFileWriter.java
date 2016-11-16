package org.vizzini.illyriad.robot.inventory;

import java.io.IOException;
import java.io.Writer;
import java.util.Arrays;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.vizzini.illyriad.City;
import org.vizzini.illyriad.ResourceIngredient;
import org.vizzini.illyriad.ResourceIngredientCollection;

/**
 * Provides a file writer for inventory data.
 */
public final class InventoryDataFileWriter
{
    /** Resource ingredient collection. */
    private final ResourceIngredientCollection ingredients;

    /** Writer. */
    private final Writer writer;

    /**
     * Construct this object.
     * 
     * @param ingredients Resource ingredient collection.
     * @param writer Writer.
     */
    @SuppressWarnings("hiding")
    public InventoryDataFileWriter(final ResourceIngredientCollection ingredients, final Writer writer)
    {
        if (ingredients == null)
        {
            throw new IllegalArgumentException("ingredients is null");
        }

        if (writer == null)
        {
            throw new IllegalArgumentException("writer is null");
        }

        this.ingredients = ingredients;
        this.writer = writer;
    }

    /**
     * @param inventoryDataList Inventory data list.
     */
    public void write(final List<InventoryData> inventoryDataList)
    {
        if (inventoryDataList == null)
        {
            throw new IllegalArgumentException("inventoryDataList is null");
        }

        final Map<ResourceIngredient, Map<City, InventoryData>> resourceToCityToData = createMap(inventoryDataList);

        final List<ResourceIngredient> resources = Arrays.asList(new ResourceIngredient[] { // resources
                ingredients.findByName("Hides"), // Hides
                        ingredients.findByName("Mineral"), // Mineral
                        ingredients.findByName("Herb"), // Herb
                        ingredients.findByName("Horse"), // Horse
                });

        try
        {
            writer.write("// Inventory data for select resources.\n");
            writer.write("// Report written ");
            writer.write(getDateString());
            writer.write("\n\n");

            for (final ResourceIngredient resource : resources)
            {
                writeInventory(resourceToCityToData, resource);
                writer.write("\n");
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param inventoryDataList Inventory data list.
     * 
     * @return a new map of resource to city to inventory data.
     */
    private Map<ResourceIngredient, Map<City, InventoryData>> createMap(final List<InventoryData> inventoryDataList)
    {
        final Map<ResourceIngredient, Map<City, InventoryData>> answer = new LinkedHashMap<ResourceIngredient, Map<City, InventoryData>>();

        for (final InventoryData inventoryData : inventoryDataList)
        {
            final ResourceIngredient resource = inventoryData.getIngredient();

            Map<City, InventoryData> map = answer.get(resource);

            if (map == null)
            {
                map = new LinkedHashMap<City, InventoryData>();
                answer.put(resource, map);
            }

            final City city = inventoryData.getCity();
            map.put(city, inventoryData);
        }

        return answer;
    }

    /**
     * @param resourceToCityToData Map of resource to city to inventory data.
     * @param resource Resource.
     * @param city City.
     * 
     * @return inventory data for the given parameters.
     */
    private InventoryData findByResourceAndCity(
            final Map<ResourceIngredient, Map<City, InventoryData>> resourceToCityToData,
            final ResourceIngredient resource, final City city)
    {
        InventoryData answer = null;

        final Map<City, InventoryData> map = resourceToCityToData.get(resource);

        if (map != null)
        {
            answer = map.get(city);
        }

        return answer;
    }

    /**
     * @return the date.
     */
    private String getDateString()
    {
        final Calendar calendar = Calendar.getInstance();

        final StringBuilder sb = new StringBuilder();

        sb.append(calendar.get(Calendar.YEAR)).append(".");
        sb.append(String.format("%02d.", calendar.get(Calendar.MONTH) + 1));
        sb.append(String.format("%02d ", calendar.get(Calendar.DAY_OF_MONTH)));
        sb.append(String.format("%02d:", calendar.get(Calendar.HOUR_OF_DAY)));
        sb.append(String.format("%02d ", calendar.get(Calendar.MINUTE)));

        return sb.toString();
    }

    /**
     * @param resourceToCityToData Map of resource to city to inventory data.
     * @param resource Resource.
     * 
     * @throws IOException if there is an I/O problem.
     */
    private void writeInventory(final Map<ResourceIngredient, Map<City, InventoryData>> resourceToCityToData,
            final ResourceIngredient resource) throws IOException
    {
        for (final City city : City.values())
        {
            final InventoryData inventoryData = findByResourceAndCity(resourceToCityToData, resource, city);

            if (inventoryData != null)
            {
                String count = inventoryData.getCount();
                count = count.replaceAll("[,]", "");

                writer.write(count);
                writer.write(" ");
                writer.write(resource.getName());
                writer.write(" ");
                writer.write(city.getDisplayName());
                writer.write("\n");
            }
        }
    }
}
