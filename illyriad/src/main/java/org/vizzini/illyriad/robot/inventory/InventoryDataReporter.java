package org.vizzini.illyriad.robot.inventory;

import java.awt.Toolkit;
import java.io.File;
import java.io.Reader;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;

import org.vizzini.ai.neuralnetwork.NeuralNetworkAppliance;
import org.vizzini.ai.neuralnetwork.format.CSVNeuralNetworkApplianceFormat;
import org.vizzini.ai.neuralnetwork.format.CSVNeuralNetworkFormat;
import org.vizzini.ai.neuralnetwork.format.InputFilterFormat;
import org.vizzini.ai.neuralnetwork.format.NeuralNetworkApplianceFormat;
import org.vizzini.ai.neuralnetwork.format.NeuralNetworkFormat;
import org.vizzini.ai.neuralnetwork.format.OutputFilterFormat;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.City;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.IngredientRecipeBuilder;
import org.vizzini.illyriad.ResourceIngredient;
import org.vizzini.illyriad.ResourceIngredientCollection;
import org.vizzini.illyriad.robot.CSVNumericOutputFilterFormat;
import org.vizzini.illyriad.robot.CSVRobotImageInputFilterFormat;
import org.vizzini.illyriad.robot.ImageSplitter;
import org.vizzini.illyriad.robot.NeuralNetworkOCRProcessor;
import org.vizzini.illyriad.robot.OCRProcessor;

/**
 * Provides a reporter for inventory data.
 */
public final class InventoryDataReporter
{
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

        final FileUtilities fileUtils = new FileUtilities();
        final File inputDirectory = Locations.CAPTURED_IMAGES_DIR;
        final Reader neuralNetworkReader = fileUtils.createFileReader(Locations.NEURAL_NETWORK_INPUT_FILEPATH);
        final Writer outputWriter = fileUtils.createFileWriter(Locations.INVENTORY_DATA_FILEPATH);

        try
        {
            final InventoryDataReporter reporter = new InventoryDataReporter(builder.getIngredientCollection(),
                    inputDirectory, neuralNetworkReader, outputWriter);

            reporter.report();
        }
        finally
        {
            fileUtils.close(neuralNetworkReader);
            fileUtils.close(outputWriter);
        }

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("InventoryDataReporter", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Resource ingredient collection. */
    private final ResourceIngredientCollection ingredients;

    /** Input directory. */
    private final File inputDirectory;

    /** Neural network reader. */
    private final Reader neuralNetworkReader;

    /** Output writer. */
    private final Writer outputWriter;

    /**
     * Construct this object.
     * 
     * @param ingredients Resource ingredient collection.
     * @param inputDirectory Input directory.
     * @param neuralNetworkReader Neural network reader.
     * @param outputWriter Output writer.
     */
    @SuppressWarnings("hiding")
    public InventoryDataReporter(final ResourceIngredientCollection ingredients, final File inputDirectory,
            final Reader neuralNetworkReader, final Writer outputWriter)
    {
        if (ingredients == null)
        {
            throw new IllegalArgumentException("ingredients is null");
        }

        if (inputDirectory == null)
        {
            throw new IllegalArgumentException("inputDirectory is null");
        }

        if (neuralNetworkReader == null)
        {
            throw new IllegalArgumentException("neuralNetworkReader is null");
        }

        if (outputWriter == null)
        {
            throw new IllegalArgumentException("outputWriter is null");
        }

        this.ingredients = ingredients;
        this.inputDirectory = inputDirectory;
        this.neuralNetworkReader = neuralNetworkReader;
        this.outputWriter = outputWriter;
    }

    /**
     * Write the inventory data report.
     */
    public void report()
    {
        // Read images.
        final InventoryDataImageReader reader = new InventoryDataImageReader(ingredients);
        final List<InventoryDataImage> inventoryDataImages = reader.read(inputDirectory);

        // Read neural network appliance.
        final NeuralNetworkAppliance<RobotImage, String> appliance = createNeuralNetworkAppliance();

        // Process images.
        final ImageSplitter splitter = new QuantityImageSplitter();
        final OCRProcessor ocrProcessor = new NeuralNetworkOCRProcessor(splitter, appliance);
        final List<InventoryData> inventoryDataList = new ArrayList<InventoryData>();

        for (final InventoryDataImage inventoryDataImage : inventoryDataImages)
        {
            final City city = inventoryDataImage.getCity();
            final ResourceIngredient resource = inventoryDataImage.getIngredient();
            try
            {
                final String count = ocrProcessor.process(inventoryDataImage.getImage());
                final InventoryData inventoryData = new InventoryData(city, resource, count);
                inventoryDataList.add(inventoryData);
            }
            catch (final IllegalArgumentException e)
            {
                throw new RuntimeException("Failed to process image " + inventoryDataImage.getFilename(), e);
            }
        }

        // Write data to a file.
        final InventoryDataFileWriter writer = new InventoryDataFileWriter(ingredients, outputWriter);
        writer.write(inventoryDataList);
    }

    /**
     * @return a new neural network appliance.
     */
    private NeuralNetworkAppliance<RobotImage, String> createNeuralNetworkAppliance()
    {
        NeuralNetworkAppliance<RobotImage, String> answer;

        final NeuralNetworkApplianceBuilder builder = new NeuralNetworkApplianceBuilder();

        final InputFilterFormat<RobotImage> inputFilterFormatter = new CSVRobotImageInputFilterFormat();
        final NeuralNetworkFormat neuralNetworkFormatter = new CSVNeuralNetworkFormat();
        final OutputFilterFormat<String> outputFilterFormatter = new CSVNumericOutputFilterFormat();

        final NeuralNetworkApplianceFormat<RobotImage, String> formatter = new CSVNeuralNetworkApplianceFormat<RobotImage, String>(
                inputFilterFormatter, neuralNetworkFormatter, outputFilterFormatter);

        answer = builder.buildFromReader(neuralNetworkReader, formatter);

        return answer;
    }
}
