package org.vizzini.illyriad.robot.inventory;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.io.File;
import java.util.List;

import org.junit.Test;
import org.vizzini.illyriad.City;
import org.vizzini.illyriad.IngredientRecipeBuilder;
import org.vizzini.illyriad.ResourceIngredientCollection;

/**
 * Provides tests for the <code>InventoryDataImageReader</code> class.
 */
public final class InventoryDataImageReaderTest
{
    /** Resource ingredient collection. */
    private ResourceIngredientCollection ingredients = new IngredientRecipeBuilder().build().getIngredientCollection();

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void read()
    {
        final InventoryDataImageReader reader = new InventoryDataImageReader(getIngredientCollection());

        File inputDirectory = Locations.CAPTURED_IMAGES_DIR;
        String path = inputDirectory.getAbsolutePath();

        if (!path.contains("illyriad"))
        {
            path = path.replaceAll("vizzini", "vizzini/illyriad");
        }

        if (!path.contains("src/test/resources"))
        {
            path = path.replaceAll("illyriad", "illyriad/src/test/resources");
        }

        path = path.replaceAll("main", "test");
        System.out.println("path = " + path);
        inputDirectory = new File(path);

        final List<InventoryDataImage> result = reader.read(inputDirectory);

        assertNotNull(result);
        assertThat(result.size(), is(8));

        verifyInventoryDataImage(result.get(0), "Lockstone", "Herb");
        verifyInventoryDataImage(result.get(1), "Lockstone", "Hides");
        verifyInventoryDataImage(result.get(2), "Lockstone", "Horse");
        verifyInventoryDataImage(result.get(3), "Lockstone", "Mineral");
        verifyInventoryDataImage(result.get(4), "Lock Downs", "Herb");
        verifyInventoryDataImage(result.get(5), "Lock Downs", "Hides");
        verifyInventoryDataImage(result.get(6), "Lock Downs", "Horse");
        verifyInventoryDataImage(result.get(7), "Lock Downs", "Mineral");
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

    /**
     * @param inventoryDataImage Inventory data image.
     * @param cityName City name.
     * @param resourceName Resource name.
     */
    private void verifyInventoryDataImage(final InventoryDataImage inventoryDataImage, final String cityName,
            final String resourceName)
    {
        assertNotNull(inventoryDataImage.getCity());
        assertThat(inventoryDataImage.getCity(), is(City.valueOfDisplayName(cityName)));
        assertNotNull(inventoryDataImage.getIngredient());
        assertThat(inventoryDataImage.getIngredient(), is(ingredients.findByName(resourceName)));
        assertNotNull("image", inventoryDataImage.getImage());
    }
}
