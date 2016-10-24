package org.vizzini.core.crafting;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.ArrayList;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultRecipeRegistry</code> class.
 */
public final class DefaultRecipeRegistryTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>getInstance()</code> method.
     */
    @Test
    public void getInstanceNull()
    {
        final DefaultRecipeRegistry<Ingredient, Recipe<Ingredient>> registry = testData.getRecipeRegistry();

        try
        {
            registry.getInstance(null, testData.createBowComponents());
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));

        }

        try
        {
            registry.getInstance("", testData.createBowComponents());
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));

        }

        try
        {
            registry.getInstance(TestData.BOW_NAME, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("components is null"));

        }

        try
        {
            registry.getInstance(TestData.BOW_NAME, new ArrayList<Component<Ingredient>>());
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("components is empty"));

        }
    }
}
