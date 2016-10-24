package org.vizzini.illyriad.robot.inventory;

import java.awt.AWTException;
import java.awt.Toolkit;
import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.vizzini.illyriad.IngredientRecipeBuilder;
import org.vizzini.illyriad.ResourceIngredientCollection;

/**
 * Provides a Phase One agent.
 * <ul>
 * <li>Phase One: Capture data images.
 * <ol>
 * <li>Capture inventory data images from Illyriad.</li>
 * <li>Split images into digits. (needed for Phase Two)</li>
 * </ol>
 * </li>
 * </ul>
 */
public final class PhaseOneAgent
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     * @throws AWTException if the robot cannot be constructed.
     */
    public static void main(final String args[]) throws AWTException
    {
        final IngredientRecipeBuilder builder = new IngredientRecipeBuilder();
        builder.build();

        final PhaseOneAgent agent = new PhaseOneAgent(builder.getIngredientCollection());

        agent.run();

        Toolkit.getDefaultToolkit().beep();
    }

    /**
     * @return true if we're testing.
     */
    private static boolean isTesting()
    {
        return true;
    }

    /** Resource ingredient collection. */
    private final ResourceIngredientCollection ingredients;

    /**
     * Construct this object.
     * 
     * @param ingredients Resource ingredient collection.
     */
    @SuppressWarnings("hiding")
    public PhaseOneAgent(final ResourceIngredientCollection ingredients)
    {
        if (ingredients == null)
        {
            throw new IllegalArgumentException("ingredients is null");
        }

        this.ingredients = ingredients;
    }

    /**
     * Run.
     */
    public void run()
    {
        // Delete the output directory.
        deleteOutputDirectory(Locations.INVENTORY_DATA_DIR);

        // Capture inventory data images.
        final File imagesDirectory = Locations.CAPTURED_IMAGES_DIR;
        final MacInventoryDataRobot robot = new MacInventoryDataRobot();

        if (isTesting())
        {
            robot.collectData();
        }
        else
        {
            robot.reportInventoryData();
        }

        final File outputDirectory = Locations.INVENTORY_DATA_DIR;
        final CountImagePreparer preparer = new CountImagePreparer(ingredients, imagesDirectory, outputDirectory);
        preparer.prepare();
    }

    /**
     * Delete the image output directory.
     * 
     * @param outputDirectory Output directory.
     */
    private void deleteOutputDirectory(final File outputDirectory)
    {
        try
        {
            FileUtils.deleteDirectory(outputDirectory);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}
