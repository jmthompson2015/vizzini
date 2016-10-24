package org.vizzini.runescape;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;

import org.apache.commons.lang3.StringUtils;

/**
 * Provides a builder for resource products.
 */
public final class ProductBuilder
{
    /** Resource ingredient collection. */
    private final ItemIngredientCollection ingredients;

    /** Market data reader. */
    private final Reader marketDataReader;

    /** Resource product registry. */
    private final ItemProductRegistry productRegistry = new ItemProductRegistry();

    /** Resource recipe collection. */
    private final ItemRecipeCollection recipes;

    /**
     * Construct this object.
     */
    public ProductBuilder()
    {
        final IngredientBuilder iBuilder = new IngredientBuilder();
        iBuilder.build();
        final RecipeBuilder rBuilder = new RecipeBuilder(iBuilder.getIngredientCollection());
        rBuilder.build();

        this.ingredients = iBuilder.getIngredientCollection();
        this.recipes = rBuilder.getRecipeCollection();
        this.marketDataReader = new InputStreamReader(ProductBuilder.class.getClassLoader().getResourceAsStream(
                "marketData.txt"));
    }

    /**
     * Construct this object.
     * 
     * @param ingredients Resource ingredient collection.
     * @param recipes Resource recipe collection.
     */
    @SuppressWarnings("hiding")
    public ProductBuilder(final ItemIngredientCollection ingredients, final ItemRecipeCollection recipes)
    {
        this(ingredients, recipes, new InputStreamReader(ProductBuilder.class.getClassLoader().getResourceAsStream(
                "marketData.txt")));
    }

    /**
     * Construct this object.
     * 
     * @param ingredients Resource ingredient collection.
     * @param recipes Resource recipe collection.
     * @param marketDataReader Market data reader.
     */
    @SuppressWarnings("hiding")
    public ProductBuilder(final ItemIngredientCollection ingredients, final ItemRecipeCollection recipes,
            final Reader marketDataReader)
    {
        if (ingredients == null)
        {
            throw new IllegalArgumentException("ingredients is null");
        }

        if (recipes == null)
        {
            throw new IllegalArgumentException("recipes is null");
        }

        if (marketDataReader == null)
        {
            throw new IllegalArgumentException("marketDataReader is null");
        }

        this.ingredients = ingredients;
        this.recipes = recipes;
        this.marketDataReader = marketDataReader;
    }

    /**
     * Construct this object.
     * 
     * @param marketDataReader Market data reader.
     */
    @SuppressWarnings("hiding")
    public ProductBuilder(final Reader marketDataReader)
    {
        if (marketDataReader == null)
        {
            throw new IllegalArgumentException("marketDataReader is null");
        }

        final IngredientBuilder iBuilder = new IngredientBuilder();
        iBuilder.build();
        final RecipeBuilder rBuilder = new RecipeBuilder(iBuilder.getIngredientCollection());
        rBuilder.build();

        this.ingredients = iBuilder.getIngredientCollection();
        this.recipes = rBuilder.getRecipeCollection();
        this.marketDataReader = marketDataReader;
    }

    /**
     * Build.
     * 
     * @return this object.
     */
    public ProductBuilder build()
    {
        return build(false);
    }

    /**
     * @param isVerbose Flag indicating whether to provide output.
     * 
     * @return this object.
     */
    public ProductBuilder build(final boolean isVerbose)
    {
        loadMarketData(isVerbose);

        // Add strange ingredients.
        createItemProduct("Gold piece", 1.0);

        // Add missing ingredients.
        final ItemProductCollection products = productRegistry.getCollection();

        for (final ItemIngredient ingredient : ingredients)
        {
            final ItemProduct product = products.findByName(ingredient.getName());

            if (product == null)
            {
                createItemProduct(ingredient, 0.0);
            }
        }

        return this;
    }

    /**
     * @return the products
     */
    public ItemProductCollection getProductCollection()
    {
        return productRegistry.getCollection();
    }

    /**
     * @param ingredient Resource ingredient.
     * @param price Price.
     */
    private void createItemProduct(final ItemIngredient ingredient, final double price)
    {
        productRegistry.getInstance(ingredient, price, price);
    }

    /**
     * @param name Resource display name.
     * @param price New price.
     */
    private void createItemProduct(final String name, final double price)
    {
        final ItemIngredient ingredient = ingredients.findByName(name);
        productRegistry.getInstance(ingredient, price, price);
    }

    /**
     * Load market data.
     * 
     * @param isVerbose Flag indicating whether to provide output.
     */
    private void loadMarketData(final boolean isVerbose)
    {
        final long start = System.currentTimeMillis();

        final BufferedReader reader = new BufferedReader(marketDataReader);
        String line;

        try
        {
            while ((line = reader.readLine()) != null)
            {
                if (StringUtils.isNotEmpty(line) && !line.startsWith("//"))
                {
                    final int index0 = line.indexOf(' ');
                    final int index1 = line.indexOf(' ', index0 + 1);
                    final String bidString = line.substring(0, index0);
                    final String askString = line.substring(index0 + 1, index1);
                    final String name = line.substring(index1 + 1);
                    final ItemIngredient ingredient = ingredients.findByName(name);

                    if (ingredient == null)
                    {
                        System.out.println("line = [" + line + "]");
                        System.out.println(bidString + "|" + askString + "|" + name);
                        throw new RuntimeException("Unknown resource ingredient: " + name);
                    }

                    final double bid = Double.parseDouble(bidString);
                    final double ask = Double.parseDouble(askString);

                    final ItemRecipe recipe = recipes.findByName(ingredient.getName());
                    productRegistry.getInstance(ingredient, ask, bid, recipe);
                }
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }

        final long end = System.currentTimeMillis();

        if (isVerbose)
        {
            System.out.println("Loaded " + productRegistry.getCollection().size() + " resource products in "
                    + (end - start) + " msec.");
        }
    }
}
