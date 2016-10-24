package org.vizzini.illyriad.robot.inventory;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.illyriad.City;
import org.vizzini.illyriad.ResourceIngredient;

/**
 * Provides inventory data.
 */
public final class InventoryData
{
    /** City. */
    private final City city;

    /** Count. */
    private final String count;

    /** Resource ingredient. */
    private final ResourceIngredient ingredient;

    /**
     * Construct this object.
     * 
     * @param city City.
     * @param ingredient Resource ingredient.
     * @param count Count.
     */
    @SuppressWarnings("hiding")
    public InventoryData(final City city, final ResourceIngredient ingredient, final String count)
    {
        if (city == null)
        {
            throw new IllegalArgumentException("city is null");
        }

        if (ingredient == null)
        {
            throw new IllegalArgumentException("resource is null");
        }

        if (StringUtils.isEmpty(count))
        {
            throw new IllegalArgumentException("count is null or empty");
        }

        this.city = city;
        this.ingredient = ingredient;
        this.count = count;
    }

    /**
     * @return the city
     */
    public City getCity()
    {
        return city;
    }

    /**
     * @return the count
     */
    public String getCount()
    {
        return count;
    }

    /**
     * @return the ingredient
     */
    public ResourceIngredient getIngredient()
    {
        return ingredient;
    }
}
