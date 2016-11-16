package org.vizzini.runescape;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>RecipeBuilder</code> class.
 */
public final class RecipeBuilderTest
{
    /** Item ingredient collection. */
    private final ItemIngredientCollection ingredients = new IngredientBuilder().build().getIngredientCollection();

    /**
     * Test the <code>build()</code> method.
     */
    @Test
    public void build()
    {
        final RecipeBuilder builder = new RecipeBuilder(ingredients);

        builder.build();

        final ItemRecipeCollection recipes = builder.getRecipeCollection();
        assertNotNull(recipes);
        assertThat(recipes.size(), is(42));

        for (int i = 0; i < recipes.size(); i++)
        {
            final ItemRecipe recipe = recipes.get(i);
            System.out.println(i + " " + recipe);
        }

        {
            final ItemRecipe recipe = recipes.get(0);
            assertThat(recipe.getName(), is("Adamant bar"));
            assertThat(recipe.getComponentCount(), is(2));
            assertThat(recipe.getComponent(0).getQuantity(), is(1.0));
            assertThat(recipe.getComponent(0).getIngredient().getName(), is("Adamantite ore"));
            assertThat(recipe.getComponent(1).getQuantity(), is(6.0));
            assertThat(recipe.getComponent(1).getIngredient().getName(), is("Coal"));
        }

        {
            final ItemRecipe recipe = recipes.get(1);
            assertThat(recipe.getName(), is("Bronze bar"));
            assertThat(recipe.getComponentCount(), is(2));
            assertThat(recipe.getComponent(0).getQuantity(), is(1.0));
            assertThat(recipe.getComponent(0).getIngredient().getName(), is("Copper ore"));
            assertThat(recipe.getComponent(1).getQuantity(), is(1.0));
            assertThat(recipe.getComponent(1).getIngredient().getName(), is("Tin ore"));
        }

        {
            final ItemRecipe recipe = recipes.get(41);
            assertThat(recipe.getName(), is("Steel bar"));
            assertThat(recipe.getComponentCount(), is(2));
            assertThat(recipe.getComponent(0).getQuantity(), is(1.0));
            assertThat(recipe.getComponent(0).getIngredient().getName(), is("Iron ore"));
            assertThat(recipe.getComponent(1).getQuantity(), is(2.0));
            assertThat(recipe.getComponent(1).getIngredient().getName(), is("Coal"));
        }
    }
}
