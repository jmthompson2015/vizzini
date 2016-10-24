package org.vizzini.illyriad.robot.market;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.ResourceProduct;
import org.vizzini.illyriad.ResourceProductCollection;

/**
 * Provides a reader for market data images.
 */
public final class MarketDataImageReader
{
    /** Flag indicating whether output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Resource product collection. */
    private final ResourceProductCollection products;

    /**
     * Construct this object.
     * 
     * @param products Resource product collection.
     */
    @SuppressWarnings("hiding")
    public MarketDataImageReader(final ResourceProductCollection products)
    {
        if (products == null)
        {
            throw new IllegalArgumentException("products is null");
        }

        this.products = products;
    }

    /**
     * @param directory Source directory.
     * 
     * @return a new list of market data images read from files.
     */
    public List<MarketDataImage> read(final File directory)
    {
        final URL url = createUrl(directory);

        if (IS_VERBOSE)
        {
            System.out.println("url = " + url.toExternalForm());
        }

        final FileUtilities fileUtils = new FileUtilities();
        final URL[] imageFiles = fileUtils.listFilesSorted(url);

        return read(imageFiles);
    }

    /**
     * @param directory Source directory.
     * 
     * @return a new list of market data images read from files.
     */
    public List<MarketDataImage> read(final String directory)
    {
        final URL url = createUrl(directory);

        if (IS_VERBOSE)
        {
            System.out.println("url = " + url.toExternalForm());
        }

        final FileUtilities fileUtils = new FileUtilities();
        final URL[] imageFiles = fileUtils.listFilesSorted(url);

        return read(imageFiles);
    }

    /**
     * @param imageFiles Image file URLs.
     * 
     * @return a new list of market data images read from files.
     */
    public List<MarketDataImage> read(final URL[] imageFiles)
    {
        if (imageFiles == null)
        {
            throw new IllegalArgumentException("imageFiles is null");
        }

        final RobotImageIO imageIo = new RobotImageIO();

        final Map<ResourceProduct, String> resourceToAskFilenameMap = new HashMap<ResourceProduct, String>();
        final Map<ResourceProduct, RobotImage> resourceToAskImageMap = new HashMap<ResourceProduct, RobotImage>();
        final Map<ResourceProduct, String> resourceToBidFilenameMap = new HashMap<ResourceProduct, String>();
        final Map<ResourceProduct, RobotImage> resourceToBidImageMap = new HashMap<ResourceProduct, RobotImage>();

        for (final URL imageFile : imageFiles)
        {
            final File file = new File(imageFile.getPath());
            final String filename = file.getName();

            if ((filename.contains("Ask") || filename.contains("Bid")) && !filename.contains("Row"))
            {
                if (IS_VERBOSE)
                {
                    System.out.println("reading " + file);
                }

                final RobotImage image = imageIo.read(file);

                if (image == null)
                {
                    System.err.println("image == null for " + file);
                }
                else
                {
                    final String name = getResourceName(filename);
                    final ResourceProduct resource = products.findByName(name);

                    if (IS_VERBOSE)
                    {
                        System.out.println("resourceName = [" + name + "]");
                        System.out.println("resource = " + resource);
                    }

                    if (resource == null)
                    {
                        throw new RuntimeException("No resource found for resourceName = [" + name
                                + "] file = [" + file + "]");
                    }

                    final boolean isAsk = filename.contains("Ask");

                    final Map<ResourceProduct, String> filenameMap = (isAsk ? resourceToAskFilenameMap
                            : resourceToBidFilenameMap);
                    filenameMap.put(resource, filename);

                    final Map<ResourceProduct, RobotImage> imageMap = (isAsk ? resourceToAskImageMap
                            : resourceToBidImageMap);
                    imageMap.put(resource, image);
                }
            }
        }

        return createList(resourceToAskFilenameMap, resourceToAskImageMap, resourceToBidFilenameMap,
                resourceToBidImageMap);
    }

    /**
     * @param directory Source directory.
     * 
     * @return a new list of market data images read from files.
     */
    public List<RobotImage> readRows(final File directory)
    {
        final URL url = createUrl(directory);

        if (IS_VERBOSE)
        {
            System.out.println("url = " + url.toExternalForm());
        }

        final FileUtilities fileUtils = new FileUtilities();
        final URL[] imageFiles = fileUtils.listFilesSorted(url);

        return readRows(imageFiles);
    }

    /**
     * @param directory Source directory.
     * 
     * @return a new list of market data images read from files.
     */
    public List<RobotImage> readRows(final String directory)
    {
        final URL url = createUrl(directory);

        if (IS_VERBOSE)
        {
            System.out.println("url = " + url.toExternalForm());
        }

        final FileUtilities fileUtils = new FileUtilities();
        final URL[] imageFiles = fileUtils.listFilesSorted(url);

        return readRows(imageFiles);
    }

    /**
     * @param imageFiles Image file URLs.
     * 
     * @return a new list of market data images read from files.
     */
    public List<RobotImage> readRows(final URL[] imageFiles)
    {
        if (imageFiles == null)
        {
            throw new IllegalArgumentException("imageFiles is null");
        }

        final RobotImageIO imageIo = new RobotImageIO();

        final List<RobotImage> answer = new ArrayList<RobotImage>();

        for (final URL imageFile : imageFiles)
        {
            final File file = new File(imageFile.getPath());
            final String filename = file.getName();

            if (filename.contains("Row"))
            {
                if (IS_VERBOSE)
                {
                    System.out.println("reading " + file);
                }

                final RobotImage image = imageIo.read(file);

                if (image == null)
                {
                    System.err.println("image == null for " + file);
                }
                else
                {
                    answer.add(image);
                }
            }
        }

        return answer;
    }

    /**
     * @return a new market data image comparator.
     */
    private Comparator<MarketDataImage> createComparator()
    {
        return new Comparator<MarketDataImage>()
        {
            @Override
            public int compare(final MarketDataImage mdi1, final MarketDataImage mdi2)
            {
                final String name1 = mdi1.getProduct().getName();
                final String name2 = mdi2.getProduct().getName();

                return name1.compareTo(name2);
            }
        };
    }

    /**
     * @param resourceToAskFilenameMap Resource to ask filename map.
     * @param resourceToAskImageMap Resource to ask image map.
     * @param resourceToBidFilenameMap Resource to bid filename map.
     * @param resourceToBidImageMap Resource to bid image map.
     * 
     * @return a new list of market data images read from files.
     */
    private List<MarketDataImage> createList(final Map<ResourceProduct, String> resourceToAskFilenameMap,
            final Map<ResourceProduct, RobotImage> resourceToAskImageMap,
            final Map<ResourceProduct, String> resourceToBidFilenameMap,
            final Map<ResourceProduct, RobotImage> resourceToBidImageMap)
    {
        final List<MarketDataImage> answer = new ArrayList<MarketDataImage>();

        for (final ResourceProduct resource : products)
        {
            final String askFilename = resourceToAskFilenameMap.get(resource);
            final RobotImage askImage = resourceToAskImageMap.get(resource);
            final String bidFilename = resourceToBidFilenameMap.get(resource);
            final RobotImage bidImage = resourceToBidImageMap.get(resource);

            if ((askImage != null) || (bidImage != null))
            {
                final MarketDataImage marketDataImage = new MarketDataImage(resource, askFilename, askImage,
                        bidFilename, bidImage);
                answer.add(marketDataImage);
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
     * @param directory Source directory.
     * 
     * @return a new URL to the test resources directory.
     */
    private URL createUrl(final String directory)
    {
        if (StringUtils.isEmpty(directory))
        {
            throw new IllegalArgumentException("directory is null or empty");
        }

        final String protocol = "file";
        final String host = "";

        URL answer;

        try
        {
            answer = new URL(protocol, host, directory);
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
     * @return resource name.
     */
    private String getResourceName(final String filename)
    {
        final String[] parts = filename.split("[_]");
        String answer = parts[0];

        // Replace "-" with space.
        answer = answer.replaceAll("[+]", " ");

        return answer;
    }
}
