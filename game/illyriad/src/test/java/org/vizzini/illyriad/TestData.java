package org.vizzini.illyriad;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.vizzini.core.crafting.Component;

/**
 * Provides test data.
 */
public final class TestData
{
    /** Resource crafter. */
    private final ResourceCrafter crafter = new ResourceCrafter();

    /**
     * @return a new map of city to map of resource to amount.
     */
    public Map<City, ResourceMap> createCityResourceMap()
    {
        final Map<City, ResourceMap> answer = new HashMap<City, ResourceMap>();

        final ResourceIngredientCollection ingredients = crafter.getIngredientCollection();

        final ResourceIngredient herb = ingredients.findByName("Herb");
        final ResourceIngredient hides = ingredients.findByName("Hides");
        final ResourceIngredient mineral = ingredients.findByName("Mineral");

        {
            final ResourceMap map = new ResourceMap();
            map.put(herb, 50);
            map.put(hides, 500);
            map.put(mineral, 5000);

            answer.put(City.LOCKSTONE, map);
        }

        {
            final ResourceMap map = new ResourceMap();
            map.put(herb, 40);
            map.put(hides, 400);
            map.put(mineral, 4000);

            answer.put(City.LOCK_DOWNS, map);
        }

        {
            final ResourceMap map = new ResourceMap();
            map.put(herb, 30);
            map.put(hides, 300);
            map.put(mineral, 3000);

            answer.put(City.LOCK_HAVEN, map);
        }

        {
            final ResourceMap map = new ResourceMap();
            map.put(herb, 20);
            map.put(hides, 200);
            map.put(mineral, 2000);

            answer.put(City.LOCK_STEPPE, map);
        }

        return answer;
    }

    /**
     * @return a recipe's components.
     */
    public List<Component<ResourceIngredient>> getBowComponents()
    {
        final List<Component<ResourceIngredient>> answer = new ArrayList<Component<ResourceIngredient>>();

        final ResourceRecipe recipe = getBowRecipe();

        for (int i = 0; i < recipe.getComponentCount(); i++)
        {
            answer.add(recipe.getComponent(i));
        }

        return answer;
    }

    /**
     * @return a resource product.
     */
    public ResourceProduct getBowProduct()
    {
        return getProductCollectionPopulated().findByName("Bow");
    }

    /**
     * @return a resource recipe.
     */
    public ResourceRecipe getBowRecipe()
    {
        return getRecipeCollectionPopulated().findByName("Bow");
    }

    /**
     * @return a resource ingredient.
     */
    public ResourceIngredient getClayIngredient()
    {
        return getIngredientCollectionPopulated().findByName("Clay");
    }

    /**
     * @return the crafter
     */
    public ResourceCrafter getCrafter()
    {
        return crafter;
    }

    /**
     * @return a populated ingredientCollection
     */
    public ResourceIngredientCollection getIngredientCollectionPopulated()
    {
        return crafter.getIngredientCollection();
    }

    /**
     * @return a populated productCollection
     */
    public ResourceProductCollection getProductCollectionPopulated()
    {
        return crafter.getProductCollection();
    }

    /**
     * @return a populated recipeCollection
     */
    public ResourceRecipeCollection getRecipeCollectionPopulated()
    {
        return crafter.getRecipeCollection();
    }

    /**
     * @return a resource product.
     */
    public ResourceProduct getSwordProduct()
    {
        return getProductCollectionPopulated().findByName("Sword");
    }

    /**
     * @return a resource recipe.
     */
    public ResourceRecipe getSwordRecipe()
    {
        return getRecipeCollectionPopulated().findByName("Sword");
    }

    /**
     * @return a resource ingredient.
     */
    public ResourceIngredient getWoodIngredient()
    {
        return getIngredientCollectionPopulated().findByName("Wood");
    }
}
