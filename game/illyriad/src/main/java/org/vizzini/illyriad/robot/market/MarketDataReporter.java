package org.vizzini.illyriad.robot.market;

import java.awt.AWTException;
import java.awt.Toolkit;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
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
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.ProductBuilder;
import org.vizzini.illyriad.ResourceProduct;
import org.vizzini.illyriad.ResourceProductCollection;
import org.vizzini.illyriad.robot.CSVNumericOutputFilterFormat;
import org.vizzini.illyriad.robot.CSVRobotImageInputFilterFormat;
import org.vizzini.illyriad.robot.ImageSplitter;
import org.vizzini.illyriad.robot.NeuralNetworkApplianceBuilder;
import org.vizzini.illyriad.robot.NeuralNetworkOCRProcessor;
import org.vizzini.illyriad.robot.OCRProcessor;

/**
 * Provides a reporter for market data.
 */
public final class MarketDataReporter
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     * @throws AWTException if the robot cannot be constructed.
     */
    public static void main(final String args[]) throws AWTException
    {
        final long start = System.currentTimeMillis();

        final ProductBuilder builder = new ProductBuilder().build(true);
        final File inputDirectory = Locations.MARKET_DATA_DIR;
        final FileUtilities fileUtils = new FileUtilities();
        final File outputFilepath = new File(Locations.MARKET_DATA_DIR, "marketData.txt");
        final Writer outputWriter = fileUtils.createFileWriter(outputFilepath);

        final MarketDataReporter reporter = new MarketDataReporter(builder.getProductCollection(), inputDirectory,
                outputWriter);

        reporter.report();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("MarketDataReporter", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Input directory. */
    private final File inputDirectory;

    /** Output writer. */
    private final Writer outputWriter;

    /** Resource product collection. */
    private final ResourceProductCollection products;

    /**
     * Construct this object.
     * 
     * @param products Resource product collection.
     * @param inputDirectory Input directory.
     * @param outputWriter Output writer.
     */
    @SuppressWarnings("hiding")
    public MarketDataReporter(final ResourceProductCollection products, final File inputDirectory,
            final Writer outputWriter)
    {
        System.out.println("inputDirectory = " + inputDirectory);
        this.products = products;
        this.inputDirectory = inputDirectory;
        this.outputWriter = outputWriter;
    }

    /**
     * @return the inputDirectory
     */
    public File getInputDirectory()
    {
        return inputDirectory;
    }

    /**
     * @return the outputWriter
     */
    public Writer getOutputWriter()
    {
        return outputWriter;
    }

    /**
     * Write the market data report.
     */
    public void report()
    {
        // Read images.
        final File pricesDirectory = new File(inputDirectory, "prices");
        final MarketDataImageReader reader = new MarketDataImageReader(products);
        final List<MarketDataImage> marketDataImages = reader.read(pricesDirectory);

        // Read neural network appliance.
        final NeuralNetworkAppliance<RobotImage, String> appliance = createNeuralNetworkAppliance();

        // Process images.
        final ImageSplitter splitter = new PriceImageSplitter();
        final OCRProcessor ocrProcessor = new NeuralNetworkOCRProcessor(splitter, appliance);
        final List<MarketData> marketDataList = new ArrayList<MarketData>();

        for (final MarketDataImage marketDataImage : marketDataImages)
        {
            final ResourceProduct product = marketDataImage.getProduct();
            String askPrice = ocrProcessor.process(marketDataImage.getAskImage());

            if (askPrice != null)
            {
                askPrice = askPrice.replaceAll("[,]", "");
            }

            String bidPrice = ocrProcessor.process(marketDataImage.getBidImage());

            if (bidPrice != null)
            {
                bidPrice = bidPrice.replaceAll("[,]", "");
            }

            final MarketData marketData = new MarketData(product, askPrice, bidPrice);
            marketDataList.add(marketData);
        }

        // Write data to a file.
        final MarketDataFileWriter writer = new MarketDataFileWriter(products, outputWriter);
        writer.write(marketDataList);
    }

    /**
     * @return a new neural network appliance.
     */
    private NeuralNetworkAppliance<RobotImage, String> createNeuralNetworkAppliance()
    {
        NeuralNetworkAppliance<RobotImage, String> answer;

        final InputFilterFormat<RobotImage> inputFilterFormatter = new CSVRobotImageInputFilterFormat();
        final NeuralNetworkFormat neuralNetworkFormatter = new CSVNeuralNetworkFormat();
        final OutputFilterFormat<String> outputFilterFormatter = new CSVNumericOutputFilterFormat();

        final NeuralNetworkApplianceFormat<RobotImage, String> formatter = new CSVNeuralNetworkApplianceFormat<RobotImage, String>(
                inputFilterFormatter, neuralNetworkFormatter, outputFilterFormatter);

        final NeuralNetworkApplianceBuilder builder = new NeuralNetworkApplianceBuilder();
        final File file = new File(inputDirectory, Locations.NEURAL_NETWORK_FILENAME);
        System.out.println("Reading neural network appliance from " + file);

        try
        {
            final Reader reader = new FileReader(file);
            answer = builder.buildFromReader(reader, formatter);
        }
        catch (final FileNotFoundException e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }
}
