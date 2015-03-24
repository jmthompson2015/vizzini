package org.vizzini.illyriad;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>ResourceRecipe</code> class.
 */
public final class ResourceRecipeTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final ResourceRecipe recipe0 = testData.getBowRecipe();
        final ResourceRecipe recipe1 = testData.getSwordRecipe();
        final ResourceRecipe recipe2 = new ResourceRecipe(recipe0.getId(), recipe0.getName(),
                testData.getBowComponents());

        assertTrue(recipe0.equals(recipe0));
        assertFalse(recipe0.equals(recipe1));
        assertTrue(recipe0.equals(recipe2));

        assertFalse(recipe1.equals(recipe0));
        assertTrue(recipe1.equals(recipe1));
        assertFalse(recipe1.equals(recipe2));

        assertTrue(recipe2.equals(recipe0));
        assertFalse(recipe2.equals(recipe1));
        assertTrue(recipe2.equals(recipe2));

        assertFalse(recipe0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final ResourceRecipe recipe0 = testData.getBowRecipe();
        final ResourceRecipe recipe1 = testData.getSwordRecipe();
        final ResourceRecipe recipe2 = new ResourceRecipe(recipe0.getId(), recipe0.getName(),
                testData.getBowComponents());

        assertTrue(recipe0.hashCode() == recipe0.hashCode());
        assertFalse(recipe0.hashCode() == recipe1.hashCode());
        assertTrue(recipe0.hashCode() == recipe2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        assertThat(
                testData.getSwordRecipe().toString(),
                is("org.vizzini.illyriad.ResourceRecipe [id=3,name=Sword,components=[org.vizzini.core.crafting.DefaultComponent [quantity=30.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=17,name=Wood,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=15.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=1000,name=Clay,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=40.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=21,name=Iron,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=5.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=1001,name=Stone,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=2.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=183,name=Gold,type=BASIC]]]]"));
        assertThat(
                testData.getBowRecipe().toString(),
                is("org.vizzini.illyriad.ResourceRecipe [id=4,name=Bow,components=[org.vizzini.core.crafting.DefaultComponent [quantity=50.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=17,name=Wood,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=5.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=1000,name=Clay,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=15.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=21,name=Iron,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=2.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=183,name=Gold,type=BASIC]]]]"));
    }
}
