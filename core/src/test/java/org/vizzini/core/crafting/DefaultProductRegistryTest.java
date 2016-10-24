package org.vizzini.core.crafting;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultProductRegistry</code> class.
 */
public final class DefaultProductRegistryTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>getInstance()</code> method.
     */
    @Test
    public void getInstance3Null()
    {
        final double ask = 1.0;
        final double bid = 2.0;

        final DefaultProductRegistry<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> registry = testData
                .getProductRegistry();

        try
        {
            registry.getInstance(null, ask, bid);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("ingredient is null"));
        }
    }

    /**
     * Test the <code>getInstance()</code> method.
     */
    @Test
    public void getInstance4Null()
    {
        final double ask = 1.0;
        final double bid = 2.0;
        final Recipe<Ingredient> recipe = testData.getBowRecipe();

        final DefaultProductRegistry<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> registry = testData
                .getProductRegistry();

        try
        {
            registry.getInstance(null, ask, bid, recipe);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("ingredient is null"));
        }
    }
}
