package org.vizzini.illyriad.robot.inventory;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.illyriad.City;
import org.vizzini.illyriad.IngredientRecipeBuilder;
import org.vizzini.illyriad.ResourceIngredient;
import org.vizzini.illyriad.ResourceIngredientCollection;

/**
 * Provides tests for the <code>InventoryData</code> class.
 */
public final class InventoryDataTest
{
    /** Resource ingredient collection. */
    private ResourceIngredientCollection ingredients;

    /**
     * Test the <code>InventoryData()</code> method.
     */
    @Test
    public void testConstructor()
    {
        final City city = City.LOCKSTONE;
        final ResourceIngredient resource = getIngredientCollection().findByName("Hides");
        final String count = "1";
        final InventoryData result = new InventoryData(city, resource, count);

        assertThat(result.getCity(), is(city));
        assertThat(result.getIngredient(), is(resource));
        assertThat(result.getCount(), is(count));
    }

    /**
     * Test the <code>InventoryData()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final City city = City.LOCKSTONE;
        final ResourceIngredient resource = getIngredientCollection().findByName("Hides");
        final String count = "1";

        try
        {
            new InventoryData(null, resource, count);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("city is null"));
        }

        try
        {
            new InventoryData(city, null, count);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("resource is null"));
        }

        try
        {
            new InventoryData(city, resource, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("count is null or empty"));
        }

        try
        {
            new InventoryData(city, resource, "");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("count is null or empty"));
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
}
