package org.vizzini.illyriad.robot.inventory;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.illyriad.City;
import org.vizzini.illyriad.ResourceIngredient;

/**
 * Provides an inventory data image.
 */
public final class InventoryDataImage
{
    /** City. */
    private final City city;

    /** Filename. */
    private final String filename;

    /** Image. */
    private final RobotImage image;

    /** Resource ingredient. */
    private final ResourceIngredient ingredient;

    /**
     * Construct this object.
     * 
     * @param city City.
     * @param resource Resource.
     * @param filename Filename.
     * @param image Image.
     */
    @SuppressWarnings("hiding")
    public InventoryDataImage(final City city, final ResourceIngredient resource, final String filename,
            final RobotImage image)
    {
        if (city == null)
        {
            throw new IllegalArgumentException("city is null");
        }

        if (resource == null)
        {
            throw new IllegalArgumentException("resource is null");
        }

        if (StringUtils.isEmpty(filename))
        {
            throw new IllegalArgumentException("filename is null or empty");
        }

        if (image == null)
        {
            throw new IllegalArgumentException("image is null");
        }

        this.city = city;
        this.ingredient = resource;
        this.filename = filename;
        this.image = image;
    }

    /**
     * @return the city
     */
    public City getCity()
    {
        return city;
    }

    /**
     * @return the filename
     */
    public String getFilename()
    {
        return filename;
    }

    /**
     * @return the image
     */
    public RobotImage getImage()
    {
        return image;
    }

    /**
     * @return the ingredient
     */
    public ResourceIngredient getIngredient()
    {
        return ingredient;
    }
}
