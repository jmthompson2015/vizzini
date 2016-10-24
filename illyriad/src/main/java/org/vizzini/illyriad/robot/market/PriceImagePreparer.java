package org.vizzini.illyriad.robot.market;

import java.awt.Toolkit;
import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.ProductBuilder;
import org.vizzini.illyriad.ResourceProductCollection;
import org.vizzini.illyriad.robot.ImageFilter;
import org.vizzini.illyriad.robot.ImageSplitter;

/**
 * Provides a class to prepare captured images for a neural network.
 */
public final class PriceImagePreparer
{
    /** Image file suffix. */
    private static final String SUFFIX = ".png";

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String args[])
    {
        final long start = System.currentTimeMillis();

        final ProductBuilder builder = new ProductBuilder();
        builder.build();

        final File inputDirectory = Locations.CAPTURED_IMAGES_DIR;
        final File outputDirectory = Locations.MARKET_DATA_DIR;

        final PriceImagePreparer preparer = new PriceImagePreparer(builder.getProductCollection(), inputDirectory,
                outputDirectory);

        preparer.prepare();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("PriceImagePreparer", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Digits output directory. */
    private final File digitsDirectory;

    /** Robot image I/O. */
    private final RobotImageIO imageIo = new RobotImageIO();

    /** Input directory. */
    private final File inputDirectory;

    /** Price image filter. */
    private final ImageFilter priceFilter;

    /** Prices output directory. */
    private final File pricesDirectory;

    /** Price image splitter. */
    private final ImageSplitter priceSplitter;

    /** Unsorted digits output directory. */
    private final File unsortedDigitsDirectory;

    /** Resource product collection. */
    private final ResourceProductCollection products;

    /**
     * Construct this object.
     * 
     * @param products Resource product collection.
     * @param inputDirectory Input directory. (required)
     * @param outputDirectory Output directory. (required)
     */
    @SuppressWarnings("hiding")
    public PriceImagePreparer(final ResourceProductCollection products, final File inputDirectory,
            final File outputDirectory)
    {
        this(products, inputDirectory, new PriceImageFilter(), new PriceImageSplitter(), outputDirectory);
    }

    /**
     * Construct this object.
     * 
     * @param products Resource product collection.
     * @param inputDirectory Input directory. (required)
     * @param priceFilter Price image filter. (required)
     * @param priceSplitter Price image splitter. (required)
     * @param outputDirectory Output directory. (required)
     */
    @SuppressWarnings("hiding")
    public PriceImagePreparer(final ResourceProductCollection products, final File inputDirectory,
            final ImageFilter priceFilter, final ImageSplitter priceSplitter, final File outputDirectory)
    {
        if (products == null)
        {
            throw new IllegalArgumentException("products is null");
        }

        if (inputDirectory == null)
        {
            throw new IllegalArgumentException("inputDirectory is null");
        }

        if (priceFilter == null)
        {
            throw new IllegalArgumentException("priceFilter is null");
        }

        if (priceSplitter == null)
        {
            throw new IllegalArgumentException("priceSplitter is null");
        }

        if (outputDirectory == null)
        {
            throw new IllegalArgumentException("outputDirectory is null");
        }

        this.products = products;
        this.inputDirectory = inputDirectory;
        this.priceFilter = priceFilter;
        this.priceSplitter = priceSplitter;

        this.digitsDirectory = new File(outputDirectory, "digits");
        this.pricesDirectory = new File(outputDirectory, "prices");
        this.unsortedDigitsDirectory = new File(digitsDirectory, "unsorted");
    }

    /**
     * @return the inputDirectory
     */
    public File getInputDirectory()
    {
        return inputDirectory;
    }

    /**
     * @return the priceFilter
     */
    public ImageFilter getPriceFilter()
    {
        return priceFilter;
    }

    /**
     * @return the priceSplitter
     */
    public ImageSplitter getPriceSplitter()
    {
        return priceSplitter;
    }

    /**
     * Prepare the images for input to the neural network.
     */
    public void prepare()
    {
        // Delete the output directories.
        deleteDirectory(digitsDirectory);
        deleteDirectory(pricesDirectory);

        // Read images.
        final MarketDataImageReader reader = new MarketDataImageReader(products);
        final List<MarketDataImage> marketDataImages = reader.read(inputDirectory);

        // Create the directories.
        createDigitsDirectories();
        pricesDirectory.mkdirs();

        // Process the Ask and Bid images.
        for (final MarketDataImage marketDataImage : marketDataImages)
        {
            process(marketDataImage.getAskFilename(), marketDataImage.getAskImage());
            process(marketDataImage.getBidFilename(), marketDataImage.getBidImage());
        }
    }

    /**
     * Create the digit directories.
     */
    private void createDigitsDirectories()
    {
        {
            final File file = new File(digitsDirectory, "comma");
            file.mkdirs();
        }

        {
            final File file = new File(digitsDirectory, "decimalPoint");
            file.mkdirs();
        }

        for (int i = 0; i < 10; i++)
        {
            final File file = new File(digitsDirectory, "digit" + i);
            file.mkdirs();
        }

        {
            final File file = new File(digitsDirectory, "unsorted");
            file.mkdirs();
        }
    }

    /**
     * @param directory Directory.
     */
    private void deleteDirectory(final File directory)
    {
        try
        {
            System.out.println("deleting directory " + directory);
            FileUtils.deleteDirectory(directory);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param filename Filename.
     * @param image Image.
     * 
     * @return a new filtered image.
     */
    private RobotImage filter(final String filename, final RobotImage image)
    {
        final RobotImage priceImage = priceFilter.filter(image);
        imageIo.write(new File(pricesDirectory, filename), priceImage);

        return priceImage;
    }

    /**
     * @param filename Filename.
     * @param image Image.
     */
    private void process(final String filename, final RobotImage image)
    {
        if (image != null)
        {
            final RobotImage priceImage = filter(filename, image);
            final String shortName = filename.substring(0, filename.length() - SUFFIX.length());
            split(shortName, priceImage);
        }
    }

    /**
     * @param name Name.
     * @param image Image.
     * 
     * @return a new list of digits.
     */
    private List<RobotImage> split(final String name, final RobotImage image)
    {
        final List<RobotImage> digits = priceSplitter.split(image);

        for (int i = 0; i < digits.size(); i++)
        {
            final RobotImage digit = digits.get(i);
            imageIo.write(new File(unsortedDigitsDirectory, name + "_" + i + ".png"), digit);
        }

        return digits;
    }
}
