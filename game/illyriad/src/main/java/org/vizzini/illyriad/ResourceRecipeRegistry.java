package org.vizzini.illyriad;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.crafting.Component;
import org.vizzini.core.crafting.DefaultRecipeRegistry;
import org.vizzini.core.crafting.RecipeRegistry;

/**
 * Provides an implementation of a resource recipe registry.
 */
public final class ResourceRecipeRegistry implements RecipeRegistry<ResourceIngredient, ResourceRecipe>
{
    /** Delegate. */
    private final RecipeRegistry<ResourceIngredient, ResourceRecipe> delegate;

    /**
     * Construct this object.
     */
    public ResourceRecipeRegistry()
    {
        this(new ResourceRecipeCollection());
    }

    /**
     * Construct this object.
     * 
     * @param recipeCollection Recipe collection.
     */
    public ResourceRecipeRegistry(final ResourceRecipeCollection recipeCollection)
    {
        delegate = new DefaultRecipeRegistry<ResourceIngredient, ResourceRecipe>(recipeCollection);
    }

    @Override
    public ResourceRecipeCollection getCollection()
    {
        return (ResourceRecipeCollection)delegate.getCollection();
    }

    /**
     * @param id ID.
     * @param name Name. (required)
     * @param components Components. (required)
     * 
     * @return a recipe.
     */
    public ResourceRecipe getInstance(final long id, final String name,
            final List<Component<ResourceIngredient>> components)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        ResourceRecipe answer = getCollection().findByName(name);

        if (answer == null)
        {
            final ResourceRecipe recipe = new ResourceRecipe(id, name, components);
            answer = recipe;

            getCollection().add(answer);
        }

        return answer;
    }
}
