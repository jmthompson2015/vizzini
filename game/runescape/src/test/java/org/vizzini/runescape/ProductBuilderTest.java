package org.vizzini.runescape;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>ProductBuilder</code> class.
 */
public final class ProductBuilderTest
{
    /** Item ingredient collection. */
    // private final ItemIngredientCollection ingredients = new IngredientBuilder().build().getIngredientCollection();

    /**
     * Test the <code>build()</code> method.
     */
    @Test
    public void build()
    {
        final ProductBuilder builder = new ProductBuilder();

        builder.build();

        final ItemProductCollection products = builder.getProductCollection();
        assertNotNull(products);
        assertThat(products.size(), is(62));

        for (int i = 0; i < products.size(); i++)
        {
            final ItemProduct product = products.get(i);
            System.out.println(i + " " + product);
        }

        {
            final ItemProduct product = products.get(0);
            assertThat(product.getName(), is("Adamant bar"));
            assertNotNull(product.getRecipe());
        }

        {
            final ItemProduct product = products.get(4);
            assertThat(product.getName(), is("Bronze bar"));
            assertNotNull(product.getRecipe());
        }

        {
            final ItemProduct product = products.get(54);
            assertThat(product.getName(), is("Steel bar"));
            assertNotNull(product.getRecipe());
        }

        {
            final ItemProduct product = products.get(61);
            assertThat(product.getName(), is("Uncut sapphire"));
            assertNull(product.getRecipe());
        }
    }
}
