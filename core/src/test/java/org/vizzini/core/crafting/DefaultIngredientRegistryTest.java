package org.vizzini.core.crafting;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultIngredientRegistry</code> class.
 */
public final class DefaultIngredientRegistryTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>getInstance()</code> method.
     */
    @Test
    public void getInstanceNull()
    {
        final DefaultIngredientRegistry<Ingredient> registry = testData.getIngredientRegistry();

        try
        {
            registry.getInstance(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            registry.getInstance("");
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }
    }
}
