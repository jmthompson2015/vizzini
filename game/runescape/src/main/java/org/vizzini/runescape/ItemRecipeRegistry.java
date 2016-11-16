package org.vizzini.runescape;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.crafting.DefaultRecipeRegistry;
import org.vizzini.core.crafting.RecipeRegistry;

/**
 * Provides an implementation of an item recipe registry.
 */
public final class ItemRecipeRegistry implements RecipeRegistry<ItemIngredient, ItemRecipe>
{
    /** Delegate. */
    private final RecipeRegistry<ItemIngredient, ItemRecipe> delegate;

    /**
     * Construct this object.
     */
    public ItemRecipeRegistry()
    {
        this(new ItemRecipeCollection());
    }

    /**
     * Construct this object.
     * 
     * @param recipeCollection Recipe collection.
     */
    public ItemRecipeRegistry(final ItemRecipeCollection recipeCollection)
    {
        delegate = new DefaultRecipeRegistry<ItemIngredient, ItemRecipe>(recipeCollection);
    }

    @Override
    public ItemRecipeCollection getCollection()
    {
        return (ItemRecipeCollection)delegate.getCollection();
    }

    /**
     * @param name Name. (required)
     * @param components Components. (required)
     * 
     * @return a recipe.
     */
    @Deprecated
    public ItemRecipe getInstance(final String name, final ItemComponent... components)
    {
        return getInstance(name, Skill.AGILITY, 0, 0, components);
    }

    /**
     * @param name Name. (required)
     * @param components Components. (required)
     * 
     * @return a recipe.
     */
    @Deprecated
    public ItemRecipe getInstance(final String name, final List<ItemComponent> components)
    {
        return getInstance(name, Skill.AGILITY, 0, 0, components);
    }

    /**
     * @param name Name. (required)
     * @param components Components. (required)
     * @param skill Skill.
     * @param level Minimum skill level.
     * @param xp Experience.
     * 
     * @return a recipe.
     */
    public ItemRecipe getInstance(final String name, final Skill skill, final int level, final double xp,
            final ItemComponent... components)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        ItemRecipe answer = getCollection().findByName(name);

        if (answer == null)
        {
            final ItemRecipe recipe = new ItemRecipe(name, skill, level, xp, components);
            answer = recipe;

            getCollection().add(answer);
        }

        return answer;
    }

    /**
     * @param name Name. (required)
     * @param components Components. (required)
     * @param skill Skill.
     * @param level Minimum skill level.
     * @param xp Experience.
     * 
     * @return a recipe.
     */
    @Deprecated
    public ItemRecipe getInstance(final String name, final Skill skill, final int level, final double xp,
            final List<ItemComponent> components)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        ItemRecipe answer = getCollection().findByName(name);

        if (answer == null)
        {
            final ItemRecipe recipe = new ItemRecipe(name, skill, level, xp, components);
            answer = recipe;

            getCollection().add(answer);
        }

        return answer;
    }
}
