package org.vizzini.illyriad.robot.inventory;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.io.InputStream;

import org.junit.Test;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.illyriad.City;
import org.vizzini.illyriad.IngredientRecipeBuilder;
import org.vizzini.illyriad.ResourceIngredient;
import org.vizzini.illyriad.ResourceIngredientCollection;

/**
 * Provides tests for the <code>InventoryDataImage</code> class.
 */
public final class InventoryDataImageTest
{
    /** Resource ingredient collection. */
    private ResourceIngredientCollection ingredients;

    /**
     * Test the <code>InventoryDataImage()</code> method.
     */
    @Test
    public void testConstructor()
    {
        final City city = City.LOCKSTONE;
        final ResourceIngredient resource = getIngredientCollection().findByName("Hides");
        final String filename = "someFile.png";
        final RobotImage image = getRobotImage();

        final InventoryDataImage result = new InventoryDataImage(city, resource, filename, image);

        assertThat(result.getCity(), is(city));
        assertThat(result.getIngredient(), is(resource));
        assertThat(result.getFilename(), is(filename));
        assertNotNull(result.getImage());
    }

    /**
     * Test the <code>InventoryDataImage()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final City city = City.LOCKSTONE;
        final ResourceIngredient resource = getIngredientCollection().findByName("Hides");
        final String filename = "someFile.png";
        final RobotImage image = getRobotImage();

        try
        {
            new InventoryDataImage(null, resource, filename, image);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("city is null"));
        }

        try
        {
            new InventoryDataImage(city, null, filename, image);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("resource is null"));
        }

        try
        {
            new InventoryDataImage(city, resource, null, image);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("filename is null or empty"));
        }

        try
        {
            new InventoryDataImage(city, resource, "", image);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("filename is null or empty"));
        }

        try
        {
            new InventoryDataImage(city, resource, filename, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("image is null"));
        }
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
     * @return a new robot image.
     */
    private RobotImage getRobotImage()
    {
        final InputStream inputStream = getClass().getResourceAsStream("/WoodAsk20131010.png");
        final RobotImageIO imageIo = new RobotImageIO();

        return imageIo.read(inputStream);
    }
}
