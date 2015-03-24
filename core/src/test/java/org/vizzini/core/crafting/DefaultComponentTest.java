package org.vizzini.core.crafting;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultComponent</code> class.
 */
public final class DefaultComponentTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>DefaultComponent()</code> method.
     */
    @Test
    public void testConstructor()
    {
        final Component<Ingredient> result = new DefaultComponent<Ingredient>(TestData.QUANTITY50,
                testData.getWoodIngredient());

        assertThat(result.getQuantity(), is(TestData.QUANTITY50));
        assertThat(result.getIngredient(), is(testData.getWoodIngredient()));
    }

    /**
     * Test the <code>DefaultIngredient()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new DefaultComponent<Ingredient>(TestData.QUANTITY50, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("ingredient is null"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final Component<Ingredient> ingredient0 = testData.createWoodComponent50();
        final Component<Ingredient> ingredient1 = testData.createClayComponent05();
        final Component<Ingredient> ingredient2 = testData.createWoodComponent50();

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
        final Component<Ingredient> ingredient0 = testData.createWoodComponent50();
        final Component<Ingredient> ingredient1 = testData.createClayComponent05();
        final Component<Ingredient> ingredient2 = testData.createWoodComponent50();

        assertTrue(ingredient0.hashCode() == ingredient0.hashCode());
        assertFalse(ingredient0.hashCode() == ingredient1.hashCode());
        assertTrue(ingredient0.hashCode() == ingredient2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToStringWood()
    {
        final Component<Ingredient> ingredient = testData.createWoodComponent50();

        final String expected = "org.vizzini.core.crafting.DefaultComponent [quantity=50.0,ingredient=org.vizzini.core.crafting.DefaultIngredient [name=Wood]]";
        final String result = ingredient.toString();

        assertNotNull(result);
        assertThat(result, is(expected));
    }
}
