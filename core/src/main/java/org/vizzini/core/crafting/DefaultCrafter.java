package org.vizzini.core.crafting;

/**
 * Provides a default implementation of a crafter.
 * 
 * @param <I> Ingredient type.
 * @param <R> Recipe type.
 * @param <P> Product type.
 */
public final class DefaultCrafter<I extends Ingredient, R extends Recipe<I>, P extends Product<I, R>> implements
        Crafter<I, R, P>
{
    /** Ingredient registry. */
    private final IngredientRegistry<I> ingredientRegistry;

    /** Recipe registry. */
    private final RecipeRegistry<I, R> recipeRegistry;

    /** Product registry. */
    private final ProductRegistry<I, R, P> productRegistry;

    /**
     * Construct this object.
     * 
     * @param ingredientRegistry Ingredient registry. (required)
     * @param recipeRegistry Recipe registry. (required)
     * @param productRegistry Product registry. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultCrafter(final IngredientRegistry<I> ingredientRegistry, final RecipeRegistry<I, R> recipeRegistry,
            final ProductRegistry<I, R, P> productRegistry)
    {
        if (ingredientRegistry == null)
        {
            throw new IllegalArgumentException("ingredientRegistry is null");
        }

        if (recipeRegistry == null)
        {
            throw new IllegalArgumentException("recipeRegistry is null");
        }

        if (productRegistry == null)
        {
            throw new IllegalArgumentException("productRegistry is null");
        }

        this.ingredientRegistry = ingredientRegistry;
        this.recipeRegistry = recipeRegistry;
        this.productRegistry = productRegistry;
    }

    @Override
    public IngredientCollection<I> getIngredientCollection()
    {
        return (IngredientCollection<I>)getIngredientRegistry().getCollection();
    }

    @Override
    public IngredientRegistry<I> getIngredientRegistry()
    {
        return ingredientRegistry;
    }

    @Override
    public ProductCollection<I, R, P> getProductCollection()
    {
        @SuppressWarnings("unchecked")
        final ProductCollection<I, R, P> answer = (ProductCollection<I, R, P>)getProductRegistry().getCollection();

        return answer;
    }

    @Override
    public ProductRegistry<I, R, P> getProductRegistry()
    {
        return productRegistry;
    }

    @Override
    public RecipeCollection<I, R> getRecipeCollection()
    {
        @SuppressWarnings("unchecked")
        final RecipeCollection<I, R> answer = (RecipeCollection<I, R>)getRecipeRegistry().getCollection();

        return answer;
    }

    @Override
    public RecipeRegistry<I, R> getRecipeRegistry()
    {
        return recipeRegistry;
    }
}
