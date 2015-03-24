package org.vizzini.illyriad.robot.market;

import java.awt.AWTException;
import java.awt.Dimension;
import java.awt.Toolkit;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.Writer;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.vizzini.ai.neuralnetwork.ApplianceExample;
import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.NeuralNetworkAppliance;
import org.vizzini.ai.neuralnetwork.NeuralNetworkApplianceTrainer;
import org.vizzini.ai.neuralnetwork.format.CSVNeuralNetworkApplianceFormat;
import org.vizzini.ai.neuralnetwork.format.CSVNeuralNetworkFormat;
import org.vizzini.ai.neuralnetwork.format.InputFilterFormat;
import org.vizzini.ai.neuralnetwork.format.NeuralNetworkApplianceFormat;
import org.vizzini.ai.neuralnetwork.format.NeuralNetworkFormat;
import org.vizzini.ai.neuralnetwork.format.OutputFilterFormat;
import org.vizzini.ai.neuralnetwork.format.io.NeuralNetworkApplianceIO;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.robot.CSVNumericOutputFilterFormat;
import org.vizzini.illyriad.robot.CSVRobotImageInputFilterFormat;
import org.vizzini.illyriad.robot.Example;
import org.vizzini.illyriad.robot.NeuralNetworkApplianceBuilder;

/**
 * Provides a neural network trainer for market data.
 */
public final class NeuralNetworkTrainer
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

        final File inputDirectory = Locations.DIGITS_DIR;
        final File outputFilepath = new File(Locations.MARKET_DATA_DIR, Locations.NEURAL_NETWORK_FILENAME);
        Writer outputWriter;

        try
        {
            outputWriter = new FileWriter(outputFilepath);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }

        final NeuralNetworkTrainer trainer = new NeuralNetworkTrainer(inputDirectory, outputWriter);

        trainer.train();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("NeuralNetworkTrainer", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Neural network. */
    private NeuralNetworkAppliance<RobotImage, String> appliance;

    /** Training examples. */
    private final List<Example> examples = new ArrayList<Example>();

    /** File utilities. */
    private final FileUtilities fileUtils = new FileUtilities();

    /** Input directory. */
    private final File inputDirectory;

    /** Output writer. */
    private final Writer outputWriter;

    /**
     * Construct this object.
     * 
     * @param inputDirectory Input directory. (required)
     * @param outputWriter Output writer. (required)
     */
    @SuppressWarnings("hiding")
    public NeuralNetworkTrainer(final File inputDirectory, final Writer outputWriter)
    {
        if (inputDirectory == null)
        {
            throw new IllegalArgumentException("inputDirectory is null");
        }

        if (outputWriter == null)
        {
            throw new IllegalArgumentException("outputWriter is null");
        }

        this.inputDirectory = inputDirectory;
        this.outputWriter = outputWriter;

        // Load digit images.
        final Map<URL, RobotImage> urlToImageMap = loadImages();

        // Determine maxWidth, maxHeight
        final Dimension maxDimension = determineMaxDimensions(urlToImageMap);

        // Create the examples.
        createExamples(urlToImageMap);

        // Create neural network.
        appliance = createNeuralNetworkAppliance(maxDimension);
    }

    /**
     * Train the neural network.
     */
    public void train()
    {
        System.out.println("train()");

        final List<ApplianceExample<RobotImage, String>> aExamples = createExamples();

        // Train it.
        final boolean isVerbose = true;
        final boolean isBatchUsed = true;
        final int exampleCount = aExamples.size();
        final double beta = 0.95 / exampleCount;
        final double alpha = 0.50 / exampleCount;

        System.out.println("beta = " + beta + " (" + (beta * exampleCount) + ") alpha = " + alpha + " ("
                + (alpha * exampleCount) + ") exampleCount = " + exampleCount);

        final NeuralNetworkApplianceTrainer<RobotImage, String> trainer = new NeuralNetworkApplianceTrainer<RobotImage, String>(
                appliance, aExamples, isBatchUsed, isVerbose, alpha, beta);

        final double maxError = 0.001;
        final int maxCount = 2000;
        final int printFrequency = maxCount / 50;

        trainer.runTrainingLoop(maxError, maxCount, printFrequency);

        // Save resulting neural network appliance.
        saveNeuralNetworkAppliance();

        testNetwork(appliance);
        System.out.println();
        printMinMaxWeights("connector01", appliance.getNeuralNetwork().getConnector(0, 1));
        printMinMaxWeights("connector12", appliance.getNeuralNetwork().getConnector(1, 2));
    }

    /**
     * @return a new URL to the test resources directory.
     */
    private URL createDirectoryUrl()
    {
        final String protocol = "file";
        final String host = "";
        final String file = inputDirectory.getAbsolutePath();

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
     * @return a new list of appliance examples.
     */
    private List<ApplianceExample<RobotImage, String>> createExamples()
    {
        final List<ApplianceExample<RobotImage, String>> answer = new ArrayList<ApplianceExample<RobotImage, String>>(
                examples.size());

        for (int i = 0; i < examples.size(); i++)
        {
            final Example example = examples.get(i);
            final RobotImage input = example.getImage();
            final String output = example.getOutput();

            answer.add(new ApplianceExample<RobotImage, String>(input, output));
        }

        return answer;
    }

    /**
     * @param urlToImageMap Map of file URL to image.
     */
    private void createExamples(final Map<URL, RobotImage> urlToImageMap)
    {
        System.out.println("createExamples()");

        for (final Entry<URL, RobotImage> entry : urlToImageMap.entrySet())
        {
            final URL url = entry.getKey();
            final RobotImage image = entry.getValue();
            final String output = createOutputFromUrl(url);

            final Example example = new Example(url, image, output);
            examples.add(example);
        }

        System.out.println(" examples.size() = " + examples.size());
    }

    /**
     * @param maxDimension Maximum image dimension.
     * 
     * @return a new neural network appliance.
     */
    private NeuralNetworkAppliance<RobotImage, String> createNeuralNetworkAppliance(final Dimension maxDimension)
    {
        final NeuralNetworkApplianceBuilder builder = new NeuralNetworkApplianceBuilder();
        NeuralNetworkAppliance<RobotImage, String> answer;

        final boolean isNew = true;

        if (isNew)
        {
            answer = builder.buildNumericOcrNetwork(maxDimension);

            answer.getNeuralNetwork().randomizeWeights(0.1);
        }
        else
        {
            InputStream inputStream;
            try
            {
                inputStream = new FileInputStream(Locations.NEURAL_NETWORK_INPUT_FILEPATH);
            }
            catch (final FileNotFoundException e)
            {
                throw new RuntimeException(e);
            }

            final InputFilterFormat<RobotImage> inputFilterFormatter = new CSVRobotImageInputFilterFormat();
            final NeuralNetworkFormat neuralNetworkFormatter = new CSVNeuralNetworkFormat();
            final OutputFilterFormat<String> outputFilterFormatter = new CSVNumericOutputFilterFormat();

            final NeuralNetworkApplianceFormat<RobotImage, String> formatter = new CSVNeuralNetworkApplianceFormat<RobotImage, String>(
                    inputFilterFormatter, neuralNetworkFormatter, outputFilterFormatter);

            answer = builder.buildFromInputStream(inputStream, formatter);
        }

        return answer;
    }

    /**
     * @param url Image file URL.
     * 
     * @return neural network outputs.
     */
    private String createOutputFromUrl(final URL url)
    {
        final String filename = getDirectoryName(url);

        String key;

        if (filename.startsWith("digit"))
        {
            key = filename.substring(filename.length() - 1, filename.length());
        }
        else if ("comma".equals(filename))
        {
            key = ",";
        }
        else if ("decimalPoint".equals(filename))
        {
            key = ".";
        }
        else
        {
            return null;
        }

        return key;
    }

    /**
     * @param urlToImageMap Map of file URL to image.
     * 
     * @return the maximum image dimensions.
     */
    private Dimension determineMaxDimensions(final Map<URL, RobotImage> urlToImageMap)
    {
        System.out.println("determineMaxDimensions()");

        int maxWidth = -1;
        int maxHeight = -1;

        for (final RobotImage image : urlToImageMap.values())
        {
            maxWidth = Math.max(image.getWidth(), maxWidth);
            maxHeight = Math.max(image.getHeight(), maxHeight);
        }

        final Dimension answer = new Dimension(maxWidth, maxHeight);
        System.out.println(" maxWidth = " + maxWidth + " maxHeight = " + maxHeight);

        return answer;
    }

    /**
     * @param url URL.
     * 
     * @return the parent directory of the given file parameter.
     */
    private String getDirectoryName(final URL url)
    {
        final File file = new File(url.toExternalForm());
        String answer = file.getAbsolutePath();

        final int index2 = answer.lastIndexOf("/");
        final int index = answer.lastIndexOf("/", index2 - 1);
        answer = answer.substring(index + 1, index2);

        return answer;
    }

    /**
     * @param directory Directory.
     * 
     * @return map of file URL to image.
     */
    private Map<URL, RobotImage> loadCommaImages(final URL directory)
    {
        final Map<URL, RobotImage> answer = new HashMap<URL, RobotImage>();
        final URL[] imageFiles = fileUtils.listFiles(directory);
        final RobotImageIO imageIo = new RobotImageIO();

        for (final URL imageFile : imageFiles)
        {
            final File imageFile2 = new File(imageFile.getFile());

            if (".svn".equals(imageFile2.getName()))
            {
                continue;
            }

            final File imageFile3 = new File(inputDirectory, "comma/" + imageFile2.getName());
            final RobotImage image = imageIo.read(imageFile3);
            answer.put(imageFile, image);
        }

        return answer;
    }

    /**
     * @param directory Directory.
     * 
     * @return map of file URL to image.
     */
    private Map<URL, RobotImage> loadDecimalPointImages(final URL directory)
    {
        final Map<URL, RobotImage> answer = new HashMap<URL, RobotImage>();
        final URL[] imageFiles = fileUtils.listFiles(directory);
        final RobotImageIO imageIo = new RobotImageIO();

        for (final URL imageFile : imageFiles)
        {
            final File imageFile2 = new File(imageFile.getFile());

            if (".svn".equals(imageFile2.getName()))
            {
                continue;
            }

            final File imageFile3 = new File(inputDirectory, "decimalPoint/" + imageFile2.getName());
            final RobotImage image = imageIo.read(imageFile3);
            answer.put(imageFile, image);
        }

        return answer;
    }

    /**
     * @param directory Directory.
     * @param key Map key.
     * 
     * @return map of file URL to image.
     */
    private Map<URL, RobotImage> loadDigitImages(final URL directory, final String key)
    {
        final Map<URL, RobotImage> answer = new HashMap<URL, RobotImage>();
        final URL[] imageFiles = fileUtils.listFiles(directory);
        final RobotImageIO imageIo = new RobotImageIO();

        for (final URL imageFile : imageFiles)
        {
            final File imageFile2 = new File(imageFile.getFile());

            if (".svn".equals(imageFile2.getName()))
            {
                continue;
            }

            final File file = new File(directory.getFile());
            final String filename = file.getName();
            final File imageFile3 = new File(inputDirectory, filename + "/" + imageFile2.getName());
            final RobotImage image = imageIo.read(imageFile3);
            answer.put(imageFile, image);
        }

        return answer;
    }

    /**
     * Load images.
     * 
     * @return map of file URL to image.
     */
    private Map<URL, RobotImage> loadImages()
    {
        System.out.println("loadImages()");

        final Map<URL, RobotImage> answer = new HashMap<URL, RobotImage>();

        final URL url = createDirectoryUrl();
        System.out.println("url = " + url.toExternalForm());
        final URL[] directories = fileUtils.listFilesSorted(url);

        for (final URL directory : directories)
        {
            final File file = new File(directory.getFile());
            final String filename = file.getName();

            if (filename.startsWith("digit"))
            {
                final String key = filename.substring(filename.length() - 1, filename.length());
                final Map<URL, RobotImage> nameToImageMap = loadDigitImages(directory, key);
                answer.putAll(nameToImageMap);
            }
            else if ("comma".equals(filename))
            {
                final Map<URL, RobotImage> nameToImageMap = loadCommaImages(directory);
                answer.putAll(nameToImageMap);
            }
            else if ("decimalPoint".equals(filename))
            {
                final Map<URL, RobotImage> nameToImageMap = loadDecimalPointImages(directory);
                answer.putAll(nameToImageMap);
            }
        }

        if (answer.isEmpty())
        {
            throw new RuntimeException("Failed to load images");
        }

        return answer;
    }

    /**
     * @param title Title.
     * @param connector Connector.
     */
    private void printMinMaxWeights(final String title, final Connector connector)
    {
        double min = 1.0 * Double.MAX_VALUE;
        int minI = -1;
        int minJ = -1;
        double max = -1.0 * Double.MAX_VALUE;
        int maxI = -1;
        int maxJ = -1;

        for (int i = 0; i < connector.getFromLayer().getNodeCount(); i++)
        {
            final double[] weights = connector.getWeights(i);

            for (int j = 0; j < weights.length; j++)
            {
                final double weight = Math.abs(weights[j]);

                if (weight < min)
                {
                    min = weight;
                    minI = i;
                    minJ = j;
                }

                if (weight > max)
                {
                    max = weight;
                    maxI = i;
                    maxJ = j;
                }
            }
        }

        System.out.println("min, max weights " + title + " = " + minI + "," + minJ + " " + min + " " + maxI + ","
                + maxJ + " " + max);
    }

    /**
     * Save the neural network to a file.
     */
    private void saveNeuralNetworkAppliance()
    {
        final InputFilterFormat<RobotImage> inputFilterFormatter = new CSVRobotImageInputFilterFormat();
        final NeuralNetworkFormat neuralNetworkFormatter = new CSVNeuralNetworkFormat();
        final OutputFilterFormat<String> outputFilterFormatter = new CSVNumericOutputFilterFormat();

        final NeuralNetworkApplianceFormat<RobotImage, String> formatter = new CSVNeuralNetworkApplianceFormat<RobotImage, String>(
                inputFilterFormatter, neuralNetworkFormatter, outputFilterFormatter);
        final NeuralNetworkApplianceIO<RobotImage, String> nnio = new NeuralNetworkApplianceIO<RobotImage, String>(
                formatter);

        nnio.write(appliance, outputWriter);
    }

    /**
     * Test the network.
     * 
     * @param appliance Neural network appliance.
     */
    @SuppressWarnings("hiding")
    private void testNetwork(final NeuralNetworkAppliance<RobotImage, String> appliance)
    {
        // Test the network.
        final int exampleCount = examples.size();
        int failCount = 0;

        System.out.println(String.format("%3s %10s %7s %8s %7s", "Ex", "Inputs", "Output", "Desired", "Error?"));

        for (int i = 0; i < exampleCount; i++)
        {
            final Example example = examples.get(i);
            final String tOutputs = appliance.evaluate(example.getImage());

            final String inputsString = "[too long]";
            final String outputsString = example.getOutput();
            String errorString = "";

            if (!tOutputs.equals(outputsString))
            {
                failCount++;
                errorString = "error: " + example.getFilename();

                System.out.println(String.format("%3d %10s %7s %8s %7s", i, inputsString, tOutputs, outputsString,
                        errorString));
            }
        }

        System.out.println("\nfailures: " + failCount + " of " + exampleCount + " ("
                + Math.round((100.0 * failCount) / exampleCount) + "%)");
    }
}
