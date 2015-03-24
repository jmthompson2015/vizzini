package org.vizzini.core.crafting;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultRecipeCollection</code> class.
 */
public final class DefaultRecipeCollectionTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>add()</code> method.
     */
    @Test
    public void add()
    {
        // Setup.
        final Recipe<Ingredient> bow = testData.getBowRecipe();
        final Recipe<Ingredient> sword = testData.getSwordRecipe();
        final RecipeCollection<Ingredient, Recipe<Ingredient>> recipes = new DefaultRecipeCollection<Ingredient, Recipe<Ingredient>>();
        assertThat(recipes.size(), is(0));

        // Run.
        recipes.add(bow);

        // Verify.
        assertThat(recipes.size(), is(1));
        assertNotNull(recipes.findByName(TestData.BOW_NAME));

        // Run.
        recipes.add(sword);

        // Verify.
        assertThat(recipes.size(), is(2));
        assertNotNull(recipes.findByName(TestData.BOW_NAME));
        assertNotNull(recipes.findByName(TestData.SWORD_NAME));
    }

    /**
     * Test the <code>addAll()</code> method.
     */
    @Test
    public void addAll()
    {
        // Setup.
        final List<Recipe<Ingredient>> list = new ArrayList<Recipe<Ingredient>>();
        list.add(testData.getBowRecipe());
        list.add(testData.getSwordRecipe());
        final RecipeCollection<Ingredient, Recipe<Ingredient>> recipes = new DefaultRecipeCollection<Ingredient, Recipe<Ingredient>>();
        assertThat(recipes.size(), is(0));

        // Run.
        recipes.addAll(list);

        // Verify.
        assertThat(recipes.size(), is(2));
        assertNotNull(recipes.findByName(TestData.BOW_NAME));
        assertNotNull(recipes.findByName(TestData.SWORD_NAME));
    }

    /**
     * Test the <code>clear()</code> method.
     */
    @Test
    public void clear()
    {
        // Setup.
        final RecipeCollection<Ingredient, Recipe<Ingredient>> recipes = testData.getRecipeCollectionPopulated();

        try
        {
            // Run.
            recipes.clear();
            fail("Should have thrown an exception");
        }
        catch (final RuntimeException e)
        {
            // Verify.
            assertThat(e.getMessage(), is("method not supported"));
        }
    }

    /**
     * Test the <code>findByName()</code> method.
     */
    @Test
    public void findByName()
    {
        // Setup.
        final RecipeCollection<Ingredient, Recipe<Ingredient>> recipes = testData.getRecipeCollectionPopulated();

        // Run.
        final Recipe<Ingredient> result0 = recipes.findByName(TestData.BOW_NAME);

        // Verify.
        assertNotNull(result0);
        assertThat(result0.getName(), is(TestData.BOW_NAME));

        // Run.
        final Recipe<Ingredient> result1 = recipes.findByName(TestData.SWORD_NAME);

        // Verify.
        assertNotNull(result1);
        assertThat(result1.getName(), is(TestData.SWORD_NAME));
    }

    /**
     * Test the <code>isUseful()</code> method.
     */
    @Test
    public void isUseful()
    {
        // Setup.
        final RecipeCollection<Ingredient, Recipe<Ingredient>> recipes = testData.getRecipeCollectionPopulated();

        // Run / Verify.
        assertTrue(recipes.isUseful(testData.getWoodIngredient()));
        assertFalse(recipes.isUseful(testData.getBowIngredient()));
    }

    /**
     * Test the <code>isUseless()</code> method.
     */
    @Test
    public void isUseless()
    {
        // Setup.
        final RecipeCollection<Ingredient, Recipe<Ingredient>> recipes = testData.getRecipeCollectionPopulated();

        // Run / Verify.
        assertFalse(recipes.isUseless(testData.getWoodIngredient()));
        assertTrue(recipes.isUseless(testData.getBowIngredient()));
    }

    /**
     * Test the <code>remove()</code> method.
     */
    @Test
    public void remove()
    {
        // Setup.
        final RecipeCollection<Ingredient, Recipe<Ingredient>> recipes = testData.getRecipeCollectionPopulated();
        final Recipe<Ingredient> bow = testData.getBowRecipe();

        try
        {
            // Run.
            assertTrue(recipes.remove(bow));
            fail("Should have thrown an exception");
        }
        catch (final RuntimeException e)
        {
            // Verify.
            assertThat(e.getMessage(), is("method not supported"));
        }
    }

    /**
     * Test the <code>removeAll()</code> method.
     */
    @Test
    public void removeAll()
    {
        // Setup.
        final RecipeCollection<Ingredient, Recipe<Ingredient>> recipes = testData.getRecipeCollectionPopulated();
        final List<Recipe<Ingredient>> list = new ArrayList<Recipe<Ingredient>>();
        list.add(testData.getBowRecipe());
        list.add(testData.getSwordRecipe());

        try
        {
            // Run.
            recipes.removeAll(list);
            fail("Should have thrown an exception");
        }
        catch (final RuntimeException e)
        {
            // Verify.
            assertThat(e.getMessage(), is("method not supported"));
        }
    }

    /**
     * Test the <code>size()</code> method.
     */
    @Test
    public void size()
    {
        // Setup.
        final RecipeCollection<Ingredient, Recipe<Ingredient>> recipes = testData.getRecipeCollection();

        // Run / Verify.
        assertThat(recipes.size(), is(0));

        // Setup.
        recipes.add(testData.getBowRecipe());

        // Run / Verify.
        assertThat(recipes.size(), is(1));
    }

    /**
     * Test the <code>whichUse()</code> method.
     */
    @Test
    public void whichUse()
    {
        // Setup.
        final RecipeCollection<Ingredient, Recipe<Ingredient>> recipes = testData.getRecipeCollectionPopulated();

        // Run.
        final List<Recipe<Ingredient>> result = recipes.whichUse(testData.getWoodIngredient());

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));
        assertThat(result.get(0).getName(), is(TestData.BOW_NAME));
        assertThat(result.get(1).getName(), is(TestData.SWORD_NAME));
    }
}
