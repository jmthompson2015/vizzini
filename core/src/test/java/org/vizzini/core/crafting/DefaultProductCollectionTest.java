package org.vizzini.core.crafting;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultProductCollection</code> class.
 */
public final class DefaultProductCollectionTest
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
        final Product<Ingredient, Recipe<Ingredient>> bow = testData.getBowProduct();
        final Product<Ingredient, Recipe<Ingredient>> sword = testData.getSwordProduct();
        final ProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> products = new DefaultProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>>();
        assertThat(products.size(), is(0));

        // Run.
        products.add(bow);

        // Verify.
        assertThat(products.size(), is(1));
        assertNotNull(products.findByName(TestData.BOW_NAME));

        // Run.
        products.add(sword);

        // Verify.
        assertThat(products.size(), is(2));
        assertNotNull(products.findByName(TestData.BOW_NAME));
        assertNotNull(products.findByName(TestData.SWORD_NAME));
    }

    /**
     * Test the <code>addAll()</code> method.
     */
    @Test
    public void addAll()
    {
        // Setup.
        final List<Product<Ingredient, Recipe<Ingredient>>> list = new ArrayList<Product<Ingredient, Recipe<Ingredient>>>();
        list.add(testData.getBowProduct());
        list.add(testData.getSwordProduct());
        final ProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> products = new DefaultProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>>();
        assertThat(products.size(), is(0));

        // Run.
        products.addAll(list);

        // Verify.
        assertThat(products.size(), is(2));
        assertNotNull(products.findByName(TestData.BOW_NAME));
        assertNotNull(products.findByName(TestData.SWORD_NAME));
    }

    /**
     * Test the <code>clear()</code> method.
     */
    @Test
    public void clear()
    {
        // Setup.
        final ProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> products = testData
                .getProductCollectionPopulated();

        try
        {
            // Run.
            products.clear();
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
        final ProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> products = testData
                .getProductCollectionPopulated();

        // Run.
        final Product<Ingredient, Recipe<Ingredient>> result0 = products.findByName(TestData.BOW_NAME);

        // Verify.
        assertNotNull(result0);
        assertThat(result0.getName(), is(TestData.BOW_NAME));

        // Run.
        final Product<Ingredient, Recipe<Ingredient>> result1 = products.findByName(TestData.SWORD_NAME);

        // Verify.
        assertNotNull(result1);
        assertThat(result1.getName(), is(TestData.SWORD_NAME));
    }

    /**
     * Test the <code>getCost()</code> method.
     */
    @Test
    public void getCost()
    {
        final ProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> products = testData
                .getProductCollectionPopulated();

        assertThat(products.getCost(testData.getWoodProduct()), is(0.0));
        assertThat(products.getCost(testData.getBowProduct()), is(68.5));
    }

    /**
     * Test the <code>getValue()</code> method.
     */
    @Test
    public void getValue()
    {
        final ProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> products = testData
                .getProductCollectionPopulated();

        assertThat(products.getValue(testData.getWoodProduct()), is(0.95));
        assertThat(products.getValue(testData.getBowProduct()), is(10.0));
    }

    /**
     * Test the <code>remove()</code> method.
     */
    @Test
    public void remove()
    {
        // Setup.
        final ProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> products = testData
                .getProductCollectionPopulated();
        final Product<Ingredient, Recipe<Ingredient>> bow = testData.getBowProduct();

        try
        {
            // Run.
            assertTrue(products.remove(bow));
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
        final ProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> products = testData
                .getProductCollectionPopulated();
        final List<Product<Ingredient, Recipe<Ingredient>>> list = new ArrayList<Product<Ingredient, Recipe<Ingredient>>>();
        list.add(testData.getBowProduct());
        list.add(testData.getSwordProduct());

        try
        {
            // Run.
            products.removeAll(list);
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
        final ProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> products = testData
                .getProductCollection();

        // Run / Verify.
        assertThat(products.size(), is(0));

        // Setup.
        products.add(testData.getBowProduct());

        // Run / Verify.
        assertThat(products.size(), is(1));
    }
}
