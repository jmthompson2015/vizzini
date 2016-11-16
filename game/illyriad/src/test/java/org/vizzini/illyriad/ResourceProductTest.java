package org.vizzini.illyriad;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>ResourceProduct</code> class.
 */
public final class ResourceProductTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final ResourceProduct product0 = testData.getBowProduct();
        final ResourceProduct product1 = testData.getSwordProduct();
        final ResourceProduct product2 = new ResourceProduct(product0.getIngredient(), product0.getAsk(),
                product0.getBid(), product0.getRecipe());

        assertTrue(product0.equals(product0));
        assertFalse(product0.equals(product1));
        assertTrue(product0.equals(product2));

        assertFalse(product1.equals(product0));
        assertTrue(product1.equals(product1));
        assertFalse(product1.equals(product2));

        assertTrue(product2.equals(product0));
        assertFalse(product2.equals(product1));
        assertTrue(product2.equals(product2));

        assertFalse(product0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final ResourceProduct product0 = testData.getBowProduct();
        final ResourceProduct product1 = testData.getSwordProduct();
        final ResourceProduct product2 = new ResourceProduct(product0.getIngredient(), product0.getAsk(),
                product0.getBid(), product0.getRecipe());

        assertTrue(product0.hashCode() == product0.hashCode());
        assertFalse(product0.hashCode() == product1.hashCode());
        assertTrue(product0.hashCode() == product2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        assertThat(
                testData.getSwordProduct().toString(),
                is("org.vizzini.illyriad.ResourceProduct [ingredient=org.vizzini.illyriad.ResourceIngredient [id=3,name=Sword,type=SWORD],ask=484.0,bid=402.0,recipe=org.vizzini.illyriad.ResourceRecipe [id=3,name=Sword,components=[org.vizzini.core.crafting.DefaultComponent [quantity=30.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=17,name=Wood,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=15.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=1000,name=Clay,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=40.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=21,name=Iron,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=5.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=1001,name=Stone,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=2.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=183,name=Gold,type=BASIC]]]]]"));
        assertThat(
                testData.getBowProduct().toString(),
                is("org.vizzini.illyriad.ResourceProduct [ingredient=org.vizzini.illyriad.ResourceIngredient [id=4,name=Bow,type=BOW],ask=270.0,bid=232.0,recipe=org.vizzini.illyriad.ResourceRecipe [id=4,name=Bow,components=[org.vizzini.core.crafting.DefaultComponent [quantity=50.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=17,name=Wood,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=5.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=1000,name=Clay,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=15.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=21,name=Iron,type=BASIC]],org.vizzini.core.crafting.DefaultComponent [quantity=2.0,ingredient=org.vizzini.illyriad.ResourceIngredient [id=183,name=Gold,type=BASIC]]]]]"));
    }
}
