package org.vizzini.illyriad.robot.inventory;

import java.awt.AWTException;
import java.awt.Toolkit;
import java.io.File;
import java.io.Reader;
import java.io.Writer;

import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.IngredientRecipeBuilder;
import org.vizzini.illyriad.ResourceIngredientCollection;

/**
 * Provides a Phase Three agent.
 * <ul>
 * <li>Phase Three: Process data images.
 * <ol>
 * <li>Perform OCR on inventory data images.</li>
 * <li>Write inventory report.</li>
 * </ol>
 * </li>
 * </ul>
 */
public final class PhaseThreeAgent
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

        final PhaseThreeAgent agent = new PhaseThreeAgent(builder.getIngredientCollection());

        agent.run();

        Toolkit.getDefaultToolkit().beep();
    }

    /** Resource ingredient collection. */
    private final ResourceIngredientCollection ingredients;

    /**
     * Construct this object.
     * 
     * @param ingredients Resource ingredient collection.
     */
    @SuppressWarnings("hiding")
    public PhaseThreeAgent(final ResourceIngredientCollection ingredients)
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
        final FileUtilities fileUtils = new FileUtilities();
        final File inputDirectory = Locations.COUNTS_DIR;

        final File neuralNetworkFile = new File(Locations.USER_DIR,
                "illyriad/src/main/resources/inventoryData/neuralNetworkAppliance.txt");
        final Reader neuralNetworkReader = fileUtils.createFileReader(neuralNetworkFile);

        final Writer outputWriter = createOutputWriter();

        try
        {
            final InventoryDataReporter idReporter = new InventoryDataReporter(ingredients, inputDirectory,
                    neuralNetworkReader, outputWriter);
            idReporter.report();
        }
        finally
        {
            fileUtils.close(neuralNetworkReader);
            fileUtils.close(outputWriter);
        }
    }

    /**
     * @return a new output writer.
     */
    private Writer createOutputWriter()
    {
        final File outputFilepath = new File(Locations.INVENTORY_DATA_DIR, "inventory.txt");
        outputFilepath.delete();
        Locations.INVENTORY_DATA_DIR.mkdirs();
        final FileUtilities fileUtils = new FileUtilities();
        final Writer outputWriter = fileUtils.createFileWriter(outputFilepath);

        return outputWriter;
    }
}
