package org.vizzini.core.crafting;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultCrafter</code> class.
 */
public final class DefaultCrafterTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>DefaultCrafter()</code> method.
     */
    @Test
    public void testConstructor()
    {
        final IngredientRegistry<Ingredient> ingredientRegistry = testData.getIngredientRegistry();
        final RecipeRegistry<Ingredient, Recipe<Ingredient>> recipeRegistry = testData.getRecipeRegistry();
        final ProductRegistry<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> productRegistry = testData
                .getProductRegistry();

        final Crafter<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> result = new DefaultCrafter<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>>(
                ingredientRegistry, recipeRegistry, productRegistry);

        assertThat(result.getIngredientRegistry(), is(ingredientRegistry));
        assertThat(result.getRecipeRegistry(), is(recipeRegistry));
        assertThat(result.getProductRegistry(), is(productRegistry));
    }

    /**
     * Test the <code>DefaultCrafter()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final IngredientRegistry<Ingredient> ingredientRegistry = testData.getIngredientRegistry();
        final RecipeRegistry<Ingredient, Recipe<Ingredient>> recipeRegistry = testData.getRecipeRegistry();
        final ProductRegistry<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> productRegistry = testData
                .getProductRegistry();

        try
        {
            new DefaultCrafter<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>>(null,
                    recipeRegistry, productRegistry);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("ingredientRegistry is null"));
        }

        try
        {
            new DefaultCrafter<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>>(
                    ingredientRegistry, null, productRegistry);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("recipeRegistry is null"));
        }

        try
        {
            new DefaultCrafter<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>>(
                    ingredientRegistry, recipeRegistry, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("productRegistry is null"));
        }
    }
}
