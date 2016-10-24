package org.vizzini.core.crafting;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.Arrays;
import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultIngredientCollection</code> class.
 */
public final class DefaultIngredientCollectionTest
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
        final Ingredient wood = new DefaultIngredient(TestData.WOOD_NAME);
        final Ingredient clay = new DefaultIngredient(TestData.CLAY_NAME);
        final IngredientCollection<Ingredient> ingredients = new DefaultIngredientCollection<Ingredient>();
        assertThat(ingredients.size(), is(0));

        // Run.
        ingredients.add(wood);

        // Verify.
        assertThat(ingredients.size(), is(1));
        assertNotNull(ingredients.findByName(TestData.WOOD_NAME));

        // Run.
        ingredients.add(clay);

        // Verify.
        assertThat(ingredients.size(), is(2));
        assertNotNull(ingredients.findByName(TestData.WOOD_NAME));
        assertNotNull(ingredients.findByName(TestData.CLAY_NAME));
    }

    /**
     * Test the <code>addAll()</code> method.
     */
    @Test
    public void addAll()
    {
        // Setup.
        final List<Ingredient> list = Arrays.asList(new Ingredient[] { new DefaultIngredient(TestData.WOOD_NAME),
                new DefaultIngredient(TestData.CLAY_NAME), });
        final IngredientCollection<Ingredient> ingredients = new DefaultIngredientCollection<Ingredient>();
        assertThat(ingredients.size(), is(0));

        // Run.
        ingredients.addAll(list);

        // Verify.
        assertThat(ingredients.size(), is(2));
        assertNotNull(ingredients.findByName(TestData.WOOD_NAME));
        assertNotNull(ingredients.findByName(TestData.CLAY_NAME));
    }

    /**
     * Test the <code>clear()</code> method.
     */
    @Test
    public void clear()
    {
        // Setup.
        final IngredientCollection<Ingredient> ingredients = testData.getIngredientCollectionPopulated();

        try
        {
            // Run.
            ingredients.clear();
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
        final IngredientCollection<Ingredient> ingredients = testData.getIngredientCollectionPopulated();

        // Run.
        final Ingredient result0 = ingredients.findByName(TestData.WOOD_NAME);

        // Verify.
        assertNotNull(result0);
        assertThat(result0.getName(), is(TestData.WOOD_NAME));

        // Run.
        final Ingredient result1 = ingredients.findByName(TestData.CLAY_NAME);

        // Verify.
        assertNotNull(result1);
        assertThat(result1.getName(), is(TestData.CLAY_NAME));
    }

    /**
     * Test the <code>remove()</code> method.
     */
    @Test
    public void remove()
    {
        // Setup.
        final IngredientCollection<Ingredient> ingredients = testData.getIngredientCollectionPopulated();
        final Ingredient wood = testData.getWoodIngredient();

        try
        {
            // Run.
            assertTrue(ingredients.remove(wood));
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
        final IngredientCollection<Ingredient> ingredients = testData.getIngredientCollectionPopulated();
        final List<Ingredient> list = Arrays.asList(new Ingredient[] { new DefaultIngredient(TestData.WOOD_NAME),
                new DefaultIngredient(TestData.CLAY_NAME), });

        try
        {
            // Run.
            ingredients.removeAll(list);
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
        final IngredientCollection<Ingredient> elements = new DefaultIngredientCollection<Ingredient>();

        // Run / Verify.
        assertThat(elements.size(), is(0));

        // Setup.
        elements.add(new DefaultIngredient(TestData.WOOD_NAME));

        // Run / Verify.
        assertThat(elements.size(), is(1));
    }
}
