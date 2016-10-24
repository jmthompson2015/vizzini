package org.vizzini.illyriad.robot.inventory;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.illyriad.City;
import org.vizzini.illyriad.IngredientRecipeBuilder;
import org.vizzini.illyriad.ResourceIngredient;
import org.vizzini.illyriad.ResourceIngredientCollection;

/**
 * Provides tests for the <code>InventoryDataFileWriter</code> class.
 */
public final class InventoryDataFileWriterTest
{
    /** Resource ingredient collection. */
    private ResourceIngredientCollection ingredients = new IngredientRecipeBuilder().build().getIngredientCollection();

    /**
     * Test the <code>InventoryDataFileWriter()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new InventoryDataFileWriter(null, new StringWriter());
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("ingredients is null"));
        }

        try
        {
            new InventoryDataFileWriter(ingredients, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("writer is null"));
        }
    }

    /**
     * Test the <code>write()</code> method.
     */
    @Test
    public void write()
    {
        final List<InventoryData> inventoryDataList = createInventoryDataList();
        final StringWriter stringWriter = new StringWriter();
        final InventoryDataFileWriter idfWriter = new InventoryDataFileWriter(getIngredientCollection(), stringWriter);

        idfWriter.write(inventoryDataList);

        final String result = stringWriter.toString();
        // System.out.println("result =\n" + result);

        assertNotNull(result);

        final String prefix = "// Inventory data for select resources.\n// Report written ";
        assertTrue(result.startsWith(prefix));

        final String suffix = "1 Hides Lockstone\n4 Hides Lock Downs\n\n2 Mineral Lockstone\n5 Mineral Lock Downs\n\n3 Herb Lockstone\n6 Herb Lock Downs\n\n\n";
        // System.out.println("suffix =\n" + suffix);
        // System.out.println("result =\n" + result);
        assertTrue(result.substring(result.length() - suffix.length(), result.length()), result.endsWith(suffix));
    }

    /**
     * Test the <code>write()</code> method.
     */
    @Test
    public void writeNull()
    {
        final StringWriter stringWriter = new StringWriter();
        final InventoryDataFileWriter idfWriter = new InventoryDataFileWriter(getIngredientCollection(), stringWriter);

        try
        {
            idfWriter.write(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("inventoryDataList is null"));
        }
    }

    /**
     * @param city City.
     * @param resourceName Resource display name.
     * @param count Count.
     * 
     * @return a new inventory data.
     */
    private InventoryData createInventoryData(final City city, final String resourceName, final int count)
    {
        final ResourceIngredient resource = ingredients.findByName(resourceName);
        final String countString = String.valueOf(count);

        return new InventoryData(city, resource, countString);
    }

    /**
     * @return a new inventory data list.
     */
    private List<InventoryData> createInventoryDataList()
    {
        final List<InventoryData> answer = new ArrayList<InventoryData>();

        answer.add(createInventoryData(City.LOCKSTONE, "Hides", 1));
        answer.add(createInventoryData(City.LOCKSTONE, "Mineral", 2));
        answer.add(createInventoryData(City.LOCKSTONE, "Herb", 3));

        answer.add(createInventoryData(City.LOCK_DOWNS, "Hides", 4));
        answer.add(createInventoryData(City.LOCK_DOWNS, "Mineral", 5));
        answer.add(createInventoryData(City.LOCK_DOWNS, "Herb", 6));

        assertThat(answer.size(), is(6));

        return answer;
    }

    /**
     * @return a resource ingredient collection.
     */
    private ResourceIngredientCollection getIngredientCollection()
    {
        if (ingredients == null)
        {
            final IngredientRecipeBuilder builder = new IngredientRecipeBuilder();
            builder.build();

            ingredients = builder.getIngredientCollection();
        }

        return ingredients;
    }
}
