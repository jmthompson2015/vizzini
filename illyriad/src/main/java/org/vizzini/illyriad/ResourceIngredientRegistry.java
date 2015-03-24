package org.vizzini.illyriad;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.crafting.DefaultIngredientRegistry;
import org.vizzini.core.crafting.IngredientRegistry;

/**
 * Provides an implementation of a resource ingredient registry.
 */
public final class ResourceIngredientRegistry implements IngredientRegistry<ResourceIngredient>
{
    /** Delegate. */
    private final IngredientRegistry<ResourceIngredient> delegate;

    /**
     * Construct this object.
     */
    public ResourceIngredientRegistry()
    {
        this(new ResourceIngredientCollection());
    }

    /**
     * Construct this object.
     * 
     * @param ingredientCollection Ingredient collection.
     */
    public ResourceIngredientRegistry(final ResourceIngredientCollection ingredientCollection)
    {
        delegate = new DefaultIngredientRegistry<ResourceIngredient>(ingredientCollection);
    }

    @Override
    public ResourceIngredientCollection getCollection()
    {
        return (ResourceIngredientCollection)delegate.getCollection();
    }

    /**
     * @param id ID.
     * @param name Name. (required)
     * @param type Type. (required)
     * 
     * @return an ingredient.
     */
    public ResourceIngredient getInstance(final long id, final String name, final ResourceType type)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        ResourceIngredient answer = getCollection().findByName(name);

        if (answer == null)
        {
            final ResourceIngredient ingredient = new ResourceIngredient(id, name, type);
            answer = ingredient;

            getCollection().add(answer);
        }

        return answer;
    }
}
