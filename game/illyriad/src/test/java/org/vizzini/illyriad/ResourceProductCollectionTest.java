package org.vizzini.illyriad;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>ResourceProductCollection</code> class.
 */
public final class ResourceProductCollectionTest
{
    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void findByTypeAnatomy()
    {
        final ResourceProductCollection products = new ProductBuilder().build().getProductCollection();
        final ResourceProductCollection anatomies = products.findByType(ResourceType.ANATOMY);

        assertThat(anatomies.size(), is(119));

        System.out.println("\nAnatomies (" + anatomies.size() + ")\n");

        for (final ResourceProduct product : anatomies)
        {
            System.out.println(product.getName());
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void findByTypeHerb()
    {
        final ResourceProductCollection products = new ProductBuilder().build().getProductCollection();
        final ResourceProductCollection herbs = products.findByType(ResourceType.HERB);

        assertThat(herbs.size(), is(31));

        System.out.println("\nHerbs (" + herbs.size() + ")\n");

        for (final ResourceProduct product : herbs)
        {
            System.out.println(product.getName());
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void findByTypeMineral()
    {
        final ResourceProductCollection products = new ProductBuilder().build().getProductCollection();
        final ResourceProductCollection minerals = products.findByType(ResourceType.MINERAL);

        assertThat(minerals.size(), is(21));

        System.out.println("\nMinerals (" + minerals.size() + ")\n");

        for (final ResourceProduct product : minerals)
        {
            System.out.println(product.getName());
        }
    }
}
