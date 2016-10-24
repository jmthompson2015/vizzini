package org.vizzini.illyriad;

import java.io.InputStreamReader;
import java.io.Reader;

import org.vizzini.core.crafting.Crafter;
import org.vizzini.core.crafting.DefaultCrafter;

/**
 * Provides an implementation of a resource crafter.
 */
public final class ResourceCrafter implements Crafter<ResourceIngredient, ResourceRecipe, ResourceProduct>
{
    /** Delegate. */
    private final Crafter<ResourceIngredient, ResourceRecipe, ResourceProduct> delegate;

    /**
     * Construct this object.
     */
    public ResourceCrafter()
    {
        this(new InputStreamReader(ResourceCrafter.class.getClassLoader().getResourceAsStream(
                "marketData/marketData.txt")));
    }

    /**
     * Construct this object.
     * 
     * @param marketDataReader Market data reader. (required)
     */
    public ResourceCrafter(final Reader marketDataReader)
    {
        if (marketDataReader == null)
        {
            throw new IllegalArgumentException("marketDataReader is null");
        }

        // Build ingredients and recipes.
        final IngredientRecipeBuilder irBuilder = new IngredientRecipeBuilder();
        irBuilder.build();

        // Build products.
        final ProductBuilder pBuilder = new ProductBuilder(irBuilder.getIngredientCollection(),
                irBuilder.getRecipeCollection(), marketDataReader);
        pBuilder.build();

        // Create registries.
        final ResourceIngredientRegistry ingredientRegistry = new ResourceIngredientRegistry(
                irBuilder.getIngredientCollection());
        final ResourceRecipeRegistry recipeRegistry = new ResourceRecipeRegistry(irBuilder.getRecipeCollection());
        final ResourceProductRegistry productRegistry = new ResourceProductRegistry(pBuilder.getProductCollection());

        delegate = new DefaultCrafter<ResourceIngredient, ResourceRecipe, ResourceProduct>(ingredientRegistry,
                recipeRegistry, productRegistry);
    }

    /**
     * Construct this object.
     * 
     * @param ingredientRegistry Ingredient registry. (required)
     * @param recipeRegistry Recipe registry. (required)
     * @param productRegistry Product registry. (required)
     */
    public ResourceCrafter(final ResourceIngredientRegistry ingredientRegistry,
            final ResourceRecipeRegistry recipeRegistry, final ResourceProductRegistry productRegistry)
    {
        delegate = new DefaultCrafter<ResourceIngredient, ResourceRecipe, ResourceProduct>(ingredientRegistry,
                recipeRegistry, productRegistry);
    }

    @Override
    public ResourceIngredientCollection getIngredientCollection()
    {
        return (ResourceIngredientCollection)delegate.getIngredientCollection();
    }

    @Override
    public ResourceIngredientRegistry getIngredientRegistry()
    {
        return (ResourceIngredientRegistry)delegate.getIngredientRegistry();
    }

    @Override
    public ResourceProductCollection getProductCollection()
    {
        return (ResourceProductCollection)delegate.getProductCollection();
    }

    @Override
    public ResourceProductRegistry getProductRegistry()
    {
        return (ResourceProductRegistry)delegate.getProductRegistry();
    }

    @Override
    public ResourceRecipeCollection getRecipeCollection()
    {
        return (ResourceRecipeCollection)delegate.getRecipeCollection();
    }

    @Override
    public ResourceRecipeRegistry getRecipeRegistry()
    {
        return (ResourceRecipeRegistry)delegate.getRecipeRegistry();
    }
}
