package org.vizzini.core.crafting;

import java.util.ArrayList;
import java.util.List;

/**
 * Provides test data.
 */
public final class TestData
{
    /** Name. */
    public static final String BOW_NAME = "Bow";

    /** Name. */
    public static final String CLAY_NAME = "Clay";

    /** Name. */
    public static final String GOLD_NAME = "Gold";

    /** Name. */
    public static final String IRON_NAME = "Iron";

    /** Component quantity. */
    public static final double QUANTITY02 = 2;

    /** Component quantity. */
    public static final double QUANTITY05 = 5;

    /** Component quantity. */
    public static final double QUANTITY15 = 15;

    /** Component quantity. */
    public static final double QUANTITY50 = 50;

    /** Name. */
    public static final String STONE_NAME = "Stone";

    /** Name. */
    public static final String SWORD_NAME = "Sword";

    /** Name. */
    public static final String WOOD_NAME = "Wood";

    /** Ingredient collection. */
    private final IngredientCollection<Ingredient> ingredientCollection = new DefaultIngredientCollection<Ingredient>();

    /** Ingredient registry. */
    private final DefaultIngredientRegistry<Ingredient> ingredientRegistry = new DefaultIngredientRegistry<Ingredient>(
            ingredientCollection);

    /** Product collection. */
    private final DefaultProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> productCollection = new DefaultProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>>();

    /** Product registry. */
    private final DefaultProductRegistry<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> productRegistry = new DefaultProductRegistry<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>>(
            productCollection);

    /** Recipe collection. */
    private final RecipeCollection<Ingredient, Recipe<Ingredient>> recipeCollection = new DefaultRecipeCollection<Ingredient, Recipe<Ingredient>>();

    /** Recipe registry. */
    private final DefaultRecipeRegistry<Ingredient, Recipe<Ingredient>> recipeRegistry = new DefaultRecipeRegistry<Ingredient, Recipe<Ingredient>>(
            recipeCollection);

    /**
     * @return a new list of components.
     */
    public List<Component<Ingredient>> createBowComponents()
    {
        final List<Component<Ingredient>> components = new ArrayList<Component<Ingredient>>();

        components.add(createWoodComponent50());
        components.add(createClayComponent05());
        components.add(createIronComponent15());
        components.add(createGoldComponent02());

        return components;
    }

    /**
     * @return a new component.
     */
    public Component<Ingredient> createClayComponent05()
    {
        return new DefaultComponent<Ingredient>(QUANTITY05, getClayIngredient());
    }

    /**
     * @return a new component.
     */
    public Component<Ingredient> createGoldComponent02()
    {
        return new DefaultComponent<Ingredient>(QUANTITY02, getGoldIngredient());
    }

    /**
     * @return a new component.
     */
    public Component<Ingredient> createIronComponent15()
    {
        return new DefaultComponent<Ingredient>(QUANTITY15, getIronIngredient());
    }

    /**
     * @return a new list of components.
     */
    public List<Component<Ingredient>> createSwordComponents()
    {
        final List<Component<Ingredient>> components = new ArrayList<Component<Ingredient>>();

        components.add(new DefaultComponent<Ingredient>(40, getWoodIngredient()));
        components.add(new DefaultComponent<Ingredient>(15, getClayIngredient()));
        components.add(new DefaultComponent<Ingredient>(40, getIronIngredient()));
        components.add(new DefaultComponent<Ingredient>(5, getStoneIngredient()));
        components.add(createGoldComponent02());

        return components;
    }

    /**
     * @return a new component.
     */
    public Component<Ingredient> createWoodComponent50()
    {
        return new DefaultComponent<Ingredient>(QUANTITY50, getWoodIngredient());
    }

    /**
     * @return a new ingredient.
     */
    public Ingredient getBowIngredient()
    {
        return ingredientRegistry.getInstance(BOW_NAME);
    }

    /**
     * @return a new product.
     */
    public Product<Ingredient, Recipe<Ingredient>> getBowProduct()
    {
        return productRegistry.getInstance(getBowIngredient(), 12.0, 8.0, getBowRecipe());
    }

    /**
     * @return a new recipe.
     */
    public Recipe<Ingredient> getBowRecipe()
    {
        return recipeRegistry.getInstance(BOW_NAME, createBowComponents());
    }

    /**
     * @return a new ingredient.
     */
    public Ingredient getClayIngredient()
    {
        return ingredientRegistry.getInstance(CLAY_NAME);
    }

    /**
     * @return a new product.
     */
    public Product<Ingredient, Recipe<Ingredient>> getClayProduct()
    {
        return productRegistry.getInstance(getClayIngredient(), 1.0, 0.9);
    }

    /**
     * @return a new ingredient.
     */
    public Ingredient getGoldIngredient()
    {
        return ingredientRegistry.getInstance(GOLD_NAME);
    }

    /**
     * @return a new product.
     */
    public Product<Ingredient, Recipe<Ingredient>> getGoldProduct()
    {
        return productRegistry.getInstance(getGoldIngredient(), 1.0, 1.0);
    }

    /**
     * @return an ingredientCollection
     */
    public IngredientCollection<Ingredient> getIngredientCollection()
    {
        return ingredientCollection;
    }

    /**
     * @return a populated ingredientCollection
     */
    public IngredientCollection<Ingredient> getIngredientCollectionPopulated()
    {
        final IngredientCollection<Ingredient> answer = getIngredientCollection();

        answer.add(getBowIngredient());
        answer.add(getClayIngredient());
        answer.add(getGoldIngredient());
        answer.add(getIronIngredient());
        answer.add(getStoneIngredient());
        answer.add(getSwordIngredient());
        answer.add(getWoodIngredient());

        return answer;
    }

    /**
     * @return a ingredientRegistry
     */
    public DefaultIngredientRegistry<Ingredient> getIngredientRegistry()
    {
        return ingredientRegistry;
    }

    /**
     * @return a new ingredient.
     */
    public Ingredient getIronIngredient()
    {
        return ingredientRegistry.getInstance(IRON_NAME);
    }

    /**
     * @return a new product.
     */
    public Product<Ingredient, Recipe<Ingredient>> getIronProduct()
    {
        return productRegistry.getInstance(getIronIngredient(), 1.0, 0.9);
    }

    /**
     * @return an ingredientCollection
     */
    public ProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> getProductCollection()
    {
        return productCollection;
    }

    /**
     * @return a populated ingredientCollection
     */
    public ProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> getProductCollectionPopulated()
    {
        final ProductCollection<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> answer = getProductCollection();

        answer.add(getBowProduct());
        answer.add(getClayProduct());
        answer.add(getGoldProduct());
        answer.add(getIronProduct());
        answer.add(getStoneProduct());
        answer.add(getSwordProduct());
        answer.add(getWoodProduct());

        return answer;
    }

    /**
     * @return the productRegistry
     */
    public DefaultProductRegistry<Ingredient, Recipe<Ingredient>, Product<Ingredient, Recipe<Ingredient>>> getProductRegistry()
    {
        return productRegistry;
    }

    /**
     * @return a recipeCollection
     */
    public RecipeCollection<Ingredient, Recipe<Ingredient>> getRecipeCollection()
    {
        return recipeCollection;
    }

    /**
     * @return a populated recipe collection.
     */
    public RecipeCollection<Ingredient, Recipe<Ingredient>> getRecipeCollectionPopulated()
    {
        final RecipeCollection<Ingredient, Recipe<Ingredient>> answer = getRecipeCollection();

        answer.add(getBowRecipe());
        answer.add(getSwordRecipe());

        return answer;
    }

    /**
     * @return a recipeRegistry
     */
    public DefaultRecipeRegistry<Ingredient, Recipe<Ingredient>> getRecipeRegistry()
    {
        return recipeRegistry;
    }

    /**
     * @return a new ingredient.
     */
    public Ingredient getStoneIngredient()
    {
        return ingredientRegistry.getInstance(STONE_NAME);
    }

    /**
     * @return a new product.
     */
    public Product<Ingredient, Recipe<Ingredient>> getStoneProduct()
    {
        return productRegistry.getInstance(getStoneIngredient(), 1.1, 0.8);
    }

    /**
     * @return a new ingredient.
     */
    public Ingredient getSwordIngredient()
    {
        return ingredientRegistry.getInstance(SWORD_NAME);
    }

    /**
     * @return a new product.
     */
    public Product<Ingredient, Recipe<Ingredient>> getSwordProduct()
    {
        return productRegistry.getInstance(getSwordIngredient(), 14.0, 10.0, getSwordRecipe());
    }

    /**
     * @return a new recipe.
     */
    public Recipe<Ingredient> getSwordRecipe()
    {
        return recipeRegistry.getInstance(SWORD_NAME, createSwordComponents());
    }

    /**
     * @return a new ingredient.
     */
    public Ingredient getWoodIngredient()
    {
        return ingredientRegistry.getInstance(WOOD_NAME);
    }

    /**
     * @return a new product.
     */
    public Product<Ingredient, Recipe<Ingredient>> getWoodProduct()
    {
        return productRegistry.getInstance(getWoodIngredient(), 1.0, 0.9);
    }
}
