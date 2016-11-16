package org.vizzini.illyriad;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>ResourceIngredient</code> class.
 */
public final class ResourceIngredientTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final ResourceIngredient ingredient0 = testData.getWoodIngredient();
        final ResourceIngredient ingredient1 = testData.getClayIngredient();
        final ResourceIngredient ingredient2 = new ResourceIngredient(ingredient0.getId(), ingredient0.getName(),
                ingredient0.getType());

        assertTrue(ingredient0.equals(ingredient0));
        assertFalse(ingredient0.equals(ingredient1));
        assertTrue(ingredient0.equals(ingredient2));

        assertFalse(ingredient1.equals(ingredient0));
        assertTrue(ingredient1.equals(ingredient1));
        assertFalse(ingredient1.equals(ingredient2));

        assertTrue(ingredient2.equals(ingredient0));
        assertFalse(ingredient2.equals(ingredient1));
        assertTrue(ingredient2.equals(ingredient2));

        assertFalse(ingredient0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final ResourceIngredient ingredient0 = testData.getWoodIngredient();
        final ResourceIngredient ingredient1 = testData.getClayIngredient();
        final ResourceIngredient ingredient2 = new ResourceIngredient(ingredient0.getId(), ingredient0.getName(),
                ingredient0.getType());

        assertTrue(ingredient0.hashCode() == ingredient0.hashCode());
        assertFalse(ingredient0.hashCode() == ingredient1.hashCode());
        assertTrue(ingredient0.hashCode() == ingredient2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        assertThat(testData.getClayIngredient().toString(),
                is("org.vizzini.illyriad.ResourceIngredient [id=1000,name=Clay,type=BASIC]"));
        assertThat(testData.getWoodIngredient().toString(),
                is("org.vizzini.illyriad.ResourceIngredient [id=17,name=Wood,type=BASIC]"));
    }
}
