package org.vizzini.illyriad;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.List;

import org.junit.BeforeClass;
import org.junit.Test;

/**
 * Provides tests for the <code>ProductBuilder</code> class.
 */
public final class ProductBuilderTest
{
    /** Resource ingredient collection. */
    private static ResourceIngredientCollection ingredients;

    /** Resource recipe collection. */
    private static ResourceRecipeCollection recipes;

    /**
     * Set up the class.
     */
    @BeforeClass
    public static void setUpClass()
    {
        final IngredientRecipeBuilder erBuilder = new IngredientRecipeBuilder();
        erBuilder.build();
        ingredients = erBuilder.getIngredientCollection();
        recipes = erBuilder.getRecipeCollection();
    }

    /**
     * Test the <code>build()</code> method.
     */
    @Test
    public void build()
    {
        final Reader marketDataReader = createReader();
        final ProductBuilder builder = new ProductBuilder(ingredients, recipes, marketDataReader);

        builder.build();

        final ResourceProductCollection result = builder.getProductCollection();

        assertNotNull(result);
        assertThat(result.size(), is(343));

        {
            final ResourceProduct resource = result.get(0);
            assertNotNull(resource);
            assertThat(resource.getName(), is("Adventurer's Sword"));
            assertThat(resource.getAsk(), is(3600.0));
            assertThat(resource.getBid(), is(1000.0));
        }

        {
            final ResourceProduct resource = result.get(342);
            assertNotNull(resource);
            assertThat(resource.getName(), is("Ysanberries"));
            assertThat(resource.getAsk(), is(0.0));
            assertThat(resource.getBid(), is(500000.0));
        }

        {
            final List<ResourceProduct> swords = result.findByType(ResourceType.SWORD);
            assertNotNull(swords);
            assertThat(swords.size(), is(28));
        }
    }

    /**
     * Test the <code>ResourceProductBuilder()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final Reader marketDataReader = createReader();

        try
        {
            new ProductBuilder(null, recipes, marketDataReader);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("ingredients is null"));
        }

        try
        {
            new ProductBuilder(ingredients, null, marketDataReader);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("recipes is null"));
        }

        try
        {
            new ProductBuilder(ingredients, recipes, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("marketDataReader is null"));
        }
    }

    /**
     * @return a new reader.
     */
    private Reader createReader()
    {
        final String filename = "marketData/marketData.txt";
        final InputStream inputStream = IngredientRecipeBuilder.class.getClassLoader().getResourceAsStream(filename);

        return new InputStreamReader(inputStream);
    }
}
