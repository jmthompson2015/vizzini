package org.vizzini.runescape;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.crafting.DefaultIngredientRegistry;
import org.vizzini.core.crafting.IngredientRegistry;

/**
 * Provides an implementation of an item ingredient registry.
 */
public final class ItemIngredientRegistry implements IngredientRegistry<ItemIngredient>
{
    /** Delegate. */
    private final IngredientRegistry<ItemIngredient> delegate;

    /**
     * Construct this object.
     */
    public ItemIngredientRegistry()
    {
        this(new ItemIngredientCollection());
    }

    /**
     * Construct this object.
     * 
     * @param ingredientCollection Ingredient collection.
     */
    public ItemIngredientRegistry(final ItemIngredientCollection ingredientCollection)
    {
        delegate = new DefaultIngredientRegistry<ItemIngredient>(ingredientCollection);
    }

    @Override
    public ItemIngredientCollection getCollection()
    {
        return (ItemIngredientCollection)delegate.getCollection();
    }

    /**
     * @param name Name.
     * 
     * @return an ingredient.
     */
    public ItemIngredient getInstance(final String name)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        ItemIngredient answer = getCollection().findByName(name);

        if (answer == null)
        {
            final ItemIngredient ingredient = new ItemIngredient(name);
            answer = ingredient;

            getCollection().add(answer);
        }

        return answer;
    }
}
