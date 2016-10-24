package org.vizzini.core.crafting;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultIngredient</code> class.
 */
public final class DefaultIngredientTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>DefaultIngredient()</code> method.
     */
    @Test
    public void testConstructorBow()
    {
        final Ingredient result = testData.getBowIngredient();

        assertThat(result.getName(), is(TestData.BOW_NAME));
    }

    /**
     * Test the <code>DefaultIngredient()</code> method.
     */
    @Test
    public void testConstructorWood()
    {
        final Ingredient result = testData.getWoodIngredient();

        assertThat(result.getName(), is(TestData.WOOD_NAME));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final Ingredient element0 = testData.getWoodIngredient();
        final Ingredient element1 = testData.getClayIngredient();
        final Ingredient element2 = testData.getWoodIngredient();

        assertTrue(element0.equals(element0));
        assertFalse(element0.equals(element1));
        assertTrue(element0.equals(element2));

        assertFalse(element1.equals(element0));
        assertTrue(element1.equals(element1));
        assertFalse(element1.equals(element2));

        assertTrue(element2.equals(element0));
        assertFalse(element2.equals(element1));
        assertTrue(element2.equals(element2));

        assertFalse(element0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final Ingredient element0 = testData.getWoodIngredient();
        final Ingredient element1 = testData.getClayIngredient();
        final Ingredient element2 = testData.getWoodIngredient();

        assertTrue(element0.hashCode() == element0.hashCode());
        assertFalse(element0.hashCode() == element1.hashCode());
        assertTrue(element0.hashCode() == element2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToStringBow()
    {
        final Ingredient element = testData.getBowIngredient();

        final String expected = "org.vizzini.core.crafting.DefaultIngredient [name=Bow]";
        final String result = element.toString();

        assertNotNull(result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToStringWood()
    {
        final Ingredient element = testData.getWoodIngredient();

        final String expected = "org.vizzini.core.crafting.DefaultIngredient [name=Wood]";
        final String result = element.toString();

        assertNotNull(result);
        assertThat(result, is(expected));
    }
}
