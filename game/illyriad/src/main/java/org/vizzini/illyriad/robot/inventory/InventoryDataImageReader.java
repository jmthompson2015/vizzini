package org.vizzini.illyriad.robot.inventory;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.illyriad.City;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.ResourceIngredient;
import org.vizzini.illyriad.ResourceIngredientCollection;

/**
 * Provides a reader for inventory data images.
 */
public final class InventoryDataImageReader
{
    /** Resource ingredient collection. */
    private final ResourceIngredientCollection ingredients;

    /**
     * Construct this object.
     * 
     * @param ingredients Resource ingredient collection.
     */
    @SuppressWarnings("hiding")
    public InventoryDataImageReader(final ResourceIngredientCollection ingredients)
    {
        if (ingredients == null)
        {
            throw new IllegalArgumentException("ingredients is null");
        }

        this.ingredients = ingredients;
    }

    /**
     * @param directory Source directory.
     * 
     * @return a new list of inventory data images read from files.
     */
    public List<InventoryDataImage> read(final File directory)
    {
        final URL url = createUrl(directory);
        final FileUtilities fileUtils = new FileUtilities();
        final URL[] imageFiles = fileUtils.listFilesSorted(url);
        System.out.println("imageFiles.length = " + imageFiles.length);

        return read(imageFiles);
    }

    /**
     * @return a new inventory data image comparator.
     */
    private Comparator<InventoryDataImage> createComparator()
    {
        return new Comparator<InventoryDataImage>()
        {
            @Override
            public int compare(final InventoryDataImage idi1, final InventoryDataImage idi2)
            {
                final City city1 = idi1.getCity();
                final City city2 = idi2.getCity();

                int answer = city1.compareTo(city2);

                if (answer == 0)
                {
                    final String name1 = idi1.getIngredient().getName();
                    final String name2 = idi2.getIngredient().getName();

                    answer = name1.compareTo(name2);
                }

                return answer;
            }
        };
    }

    /**
     * @param cityToFilenameMap City to Resource to filename map.
     * @param cityToImageMap City to Resource to image map.
     * 
     * @return a new list of inventory data images.
     */
    private List<InventoryDataImage> createList(final Map<City, Map<ResourceIngredient, String>> cityToFilenameMap,
            final Map<City, Map<ResourceIngredient, RobotImage>> cityToImageMap)
    {
        final List<InventoryDataImage> answer = new ArrayList<InventoryDataImage>();

        for (final City city : City.values())
        {
            for (final ResourceIngredient resource : ingredients)
            {
                final Map<ResourceIngredient, String> resourceToFilenameMap = cityToFilenameMap.get(city);

                if (resourceToFilenameMap != null)
                {
                    final Map<ResourceIngredient, RobotImage> resourceToImageMap = cityToImageMap.get(city);
                    final String filename = resourceToFilenameMap.get(resource);
                    final RobotImage image = resourceToImageMap.get(resource);

                    if (image != null)
                    {
                        final InventoryDataImage inventoryDataImage = new InventoryDataImage(city, resource, filename,
                                image);
                        answer.add(inventoryDataImage);
                    }
                }
            }
        }

        Collections.sort(answer, createComparator());

        return answer;
    }

    /**
     * @param directory Source directory.
     * 
     * @return a new URL to the test resources directory.
     */
    private URL createUrl(final File directory)
    {
        if (directory == null)
        {
            throw new IllegalArgumentException("directory is null");
        }

        final String protocol = "file";
        final String host = "";
        final String file = directory.getAbsolutePath();

        URL answer;

        try
        {
            answer = new URL(protocol, host, file);
        }
        catch (final MalformedURLException e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }

    /**
     * @param filename Filename.
     * 
     * @return city.
     */
    private City determineCity(final String filename)
    {
        final int index = filename.indexOf("_");

        if (index < 0)
        {
            throw new RuntimeException("Underscore not found for filename " + filename);
        }

        String cityName = filename.substring(0, index);
        cityName = cityName.replaceAll("[+]", " ");
        final City city = City.valueOfDisplayName(cityName);

        if (city == null)
        {
            throw new RuntimeException("No resource found for cityName = [" + cityName + "] filename = [" + filename
                    + "]");
        }

        return city;
    }

    /**
     * @param filename Filename.
     * 
     * @return resource.
     */
    private ResourceIngredient determineResource(final String filename)
    {
        final String[] parts = filename.split("[_]");
        String resourceName = parts[1];
        resourceName = resourceName.replaceAll("[+]", " ");
        final ResourceIngredient resource = ingredients.findByName(resourceName);

        if (resource == null)
        {
            throw new RuntimeException("No resource found for resourceName = [" + resourceName + "] filename = ["
                    + filename + "]");
        }

        return resource;
    }

    /**
     * @param imageFiles Image file URLs.
     * 
     * @return a new list of inventory data images read from files.
     */
    private List<InventoryDataImage> read(final URL[] imageFiles)
    {
        if (imageFiles == null)
        {
            throw new IllegalArgumentException("imageFiles is null");
        }

        final RobotImageIO imageIo = new RobotImageIO();

        final Map<City, Map<ResourceIngredient, String>> cityToFilenameMap = new LinkedHashMap<City, Map<ResourceIngredient, String>>();
        final Map<City, Map<ResourceIngredient, RobotImage>> cityToImageMap = new LinkedHashMap<City, Map<ResourceIngredient, RobotImage>>();

        for (final URL imageFile : imageFiles)
        {
            final File file = new File(imageFile.getPath());
            final String filename = file.getName();

            if (!(filename.contains("Name") || filename.contains("Icon") || filename.contains("Row")
                    || ".DS_Store".equals(filename) || ".svn".equals(filename)))
            {
                final City city = determineCity(filename);

                Map<ResourceIngredient, String> resourceToFilenameMap = cityToFilenameMap.get(city);

                if (resourceToFilenameMap == null)
                {
                    resourceToFilenameMap = new HashMap<ResourceIngredient, String>();
                    cityToFilenameMap.put(city, resourceToFilenameMap);
                }

                Map<ResourceIngredient, RobotImage> resourceToImageMap = cityToImageMap.get(city);

                if (resourceToImageMap == null)
                {
                    resourceToImageMap = new HashMap<ResourceIngredient, RobotImage>();
                    cityToImageMap.put(city, resourceToImageMap);
                }

                final RobotImage image = imageIo.read(file);

                if (image == null)
                {
                    System.err.println("image == null for " + file);
                }
                else
                {
                    final ResourceIngredient resource = determineResource(filename);

                    resourceToFilenameMap.put(resource, filename);
                    resourceToImageMap.put(resource, image);
                }
            }
        }

        return createList(cityToFilenameMap, cityToImageMap);
    }
}
