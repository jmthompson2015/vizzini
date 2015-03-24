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
 * Provides tests for the <code>DefaultNamedObjectCollection</code> class.
 */
public final class DefaultNamedObjectCollectionTest
{
    /**
     * Test the <code>add()</code> method.
     */
    @Test
    public void add()
    {
        // Setup.
        final Ingredient wood = new DefaultIngredient(TestData.WOOD_NAME);
        final Ingredient clay = new DefaultIngredient(TestData.CLAY_NAME);
        final NamedObjectCollection<Ingredient> elements = new DefaultNamedObjectCollection<Ingredient>();
        assertThat(elements.size(), is(0));

        // Run.
        elements.add(wood);

        // Verify.
        assertThat(elements.size(), is(1));
        assertNotNull(elements.findByName(TestData.WOOD_NAME));

        // Run.
        elements.add(clay);

        // Verify.
        assertThat(elements.size(), is(2));
        assertNotNull(elements.findByName(TestData.WOOD_NAME));
        assertNotNull(elements.findByName(TestData.CLAY_NAME));
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
        final NamedObjectCollection<Ingredient> elements = new DefaultNamedObjectCollection<Ingredient>();
        assertThat(elements.size(), is(0));

        // Run.
        elements.addAll(list);

        // Verify.
        assertThat(elements.size(), is(2));
        assertNotNull(elements.findByName(TestData.WOOD_NAME));
        assertNotNull(elements.findByName(TestData.CLAY_NAME));
    }

    /**
     * Test the <code>clear()</code> method.
     */
    @Test
    public void clear()
    {
        // Setup.
        final List<Ingredient> list = Arrays.asList(new Ingredient[] { new DefaultIngredient(TestData.WOOD_NAME),
                new DefaultIngredient(TestData.CLAY_NAME), });
        final NamedObjectCollection<Ingredient> elements = new DefaultNamedObjectCollection<Ingredient>();
        assertThat(elements.size(), is(0));
        elements.addAll(list);
        assertThat(elements.size(), is(2));

        try
        {
            // Run.
            elements.clear();
            fail("Should have thrown an exception");
        }
        catch (final RuntimeException e)
        {
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
        final NamedObjectCollection<Ingredient> elements = new DefaultNamedObjectCollection<Ingredient>();
        final Ingredient wood = new DefaultIngredient(TestData.WOOD_NAME);
        elements.add(wood);
        assertThat(elements.size(), is(1));

        // Run.
        final Ingredient result0 = elements.findByName(TestData.WOOD_NAME);

        // Verify.
        assertNotNull(result0);
        assertThat(result0.getName(), is(TestData.WOOD_NAME));

        // Setup.
        final Ingredient element = new DefaultIngredient(TestData.CLAY_NAME);
        elements.add(element);
        assertThat(elements.size(), is(2));

        // Run.
        final Ingredient result1 = elements.findByName(TestData.CLAY_NAME);

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
        final NamedObjectCollection<Ingredient> elements = new DefaultNamedObjectCollection<Ingredient>();
        final Ingredient wood = new DefaultIngredient(TestData.WOOD_NAME);
        elements.add(wood);
        final Ingredient clay = new DefaultIngredient(TestData.CLAY_NAME);
        elements.add(clay);
        assertThat(elements.size(), is(2));

        try
        {
            // Run.
            assertTrue(elements.remove(wood));
            fail("Should have thrown an exception");
        }
        catch (final RuntimeException e)
        {
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
        final List<Ingredient> list = Arrays.asList(new Ingredient[] { new DefaultIngredient(TestData.WOOD_NAME),
                new DefaultIngredient(TestData.CLAY_NAME), });
        final NamedObjectCollection<Ingredient> elements = new DefaultNamedObjectCollection<Ingredient>();
        elements.addAll(list);
        assertThat(elements.size(), is(2));

        try
        {
            // Run.
            elements.removeAll(list);
            fail("Should have thrown an exception");
        }
        catch (final RuntimeException e)
        {
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
        final NamedObjectCollection<Ingredient> elements = new DefaultNamedObjectCollection<Ingredient>();

        // Run / Verify.
        assertThat(elements.size(), is(0));

        // Setup.
        elements.add(new DefaultIngredient(TestData.WOOD_NAME));

        // Run / Verify.
        assertThat(elements.size(), is(1));
    }
}
