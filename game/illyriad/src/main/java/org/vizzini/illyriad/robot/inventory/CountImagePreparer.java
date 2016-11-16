package org.vizzini.illyriad.robot.inventory;

import java.awt.Toolkit;
import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.IngredientRecipeBuilder;
import org.vizzini.illyriad.ResourceIngredientCollection;
import org.vizzini.illyriad.robot.ImageFilter;
import org.vizzini.illyriad.robot.ImageSplitter;

/**
 * Provides a class to prepare captured images for a neural network.
 */
public final class CountImagePreparer
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

        final IngredientRecipeBuilder builder = new IngredientRecipeBuilder();
        builder.build();

        final File inputDirectory = Locations.CAPTURED_IMAGES_DIR;
        final File outputDirectory = Locations.INVENTORY_DATA_DIR;

        final CountImagePreparer preparer = new CountImagePreparer(builder.getIngredientCollection(), inputDirectory,
                outputDirectory);

        preparer.prepare();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("CountImagePreparer", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Count image filter. */
    private final ImageFilter countFilter;

    /** Counts output directory. */
    private final File countsDirectory;

    /** Count image splitter. */
    private final ImageSplitter countSplitter;

    /** Digits output directory. */
    private final File digitsDirectory;

    /** Robot image I/O. */
    private final RobotImageIO imageIo = new RobotImageIO();

    /** Resource ingredient collection. */
    private final ResourceIngredientCollection ingredients;

    /** Input directory. */
    private final File inputDirectory;

    /** Unsorted digits output directory. */
    private final File unsortedDigitsDirectory;

    /**
     * Construct this object.
     * 
     * @param ingredients Resource ingredient collection.
     * @param inputDirectory Input directory. (required)
     * @param outputDirectory Output directory. (required)
     */
    @SuppressWarnings("hiding")
    public CountImagePreparer(final ResourceIngredientCollection ingredients, final File inputDirectory,
            final File outputDirectory)
    {
        this(ingredients, inputDirectory, new CountImageFilter(), new CountImageSplitter(), outputDirectory);
    }

    /**
     * Construct this object.
     * 
     * @param ingredients Resource ingredient collection.
     * @param inputDirectory Input directory. (required)
     * @param countFilter Count image filter. (required)
     * @param countSplitter Count image splitter. (required)
     * @param outputDirectory Output directory. (required)
     */
    @SuppressWarnings("hiding")
    public CountImagePreparer(final ResourceIngredientCollection ingredients, final File inputDirectory,
            final ImageFilter countFilter, final ImageSplitter countSplitter, final File outputDirectory)
    {
        if (ingredients == null)
        {
            throw new IllegalArgumentException("ingredients is null");
        }

        if (inputDirectory == null)
        {
            throw new IllegalArgumentException("inputDirectory is null");
        }

        if (countFilter == null)
        {
            throw new IllegalArgumentException("countFilter is null");
        }

        if (countSplitter == null)
        {
            throw new IllegalArgumentException("countSplitter is null");
        }

        if (outputDirectory == null)
        {
            throw new IllegalArgumentException("outputDirectory is null");
        }

        this.ingredients = ingredients;
        this.inputDirectory = inputDirectory;
        this.countFilter = countFilter;
        this.countSplitter = countSplitter;

        this.digitsDirectory = new File(outputDirectory, "digits");
        this.countsDirectory = new File(outputDirectory, "counts");
        this.unsortedDigitsDirectory = new File(digitsDirectory, "unsorted");
    }

    /**
     * @return the countFilter
     */
    public ImageFilter getCountFilter()
    {
        return countFilter;
    }

    /**
     * @return the countSplitter
     */
    public ImageSplitter getCountSplitter()
    {
        return countSplitter;
    }

    /**
     * @return the inputDirectory
     */
    public File getInputDirectory()
    {
        return inputDirectory;
    }

    /**
     * Prepare the images for input to the neural network.
     */
    public void prepare()
    {
        // Delete the output directories.
        deleteDirectory(digitsDirectory);
        deleteDirectory(countsDirectory);

        // Read images.
        final InventoryDataImageReader reader = new InventoryDataImageReader(ingredients);
        final List<InventoryDataImage> inventoryDataImages = reader.read(inputDirectory);

        // Create the directories.
        createDigitsDirectories();
        countsDirectory.mkdirs();

        // Process the Ask and Bid images.
        for (final InventoryDataImage inventoryDataImage : inventoryDataImages)
        {
            process(inventoryDataImage.getFilename(), inventoryDataImage.getImage());
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
        final RobotImage countImage = countFilter.filter(image);
        imageIo.write(new File(countsDirectory, filename), countImage);

        return countImage;
    }

    /**
     * @param filename Filename.
     * @param image Image.
     */
    private void process(final String filename, final RobotImage image)
    {
        if (image != null)
        {
            final RobotImage countImage = filter(filename, image);
            final String shortName = filename.substring(0, filename.length() - SUFFIX.length());
            split(shortName, countImage);
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
        final List<RobotImage> digits = countSplitter.split(image);

        for (int i = 0; i < digits.size(); i++)
        {
            final RobotImage digit = digits.get(i);
            imageIo.write(new File(unsortedDigitsDirectory, name + "_" + i + ".png"), digit);
        }

        return digits;
    }
}
