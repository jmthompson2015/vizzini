package org.vizzini.illyriad.robot;

import java.awt.Dimension;
import java.io.InputStream;
import java.io.Reader;

import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.DefaultConnector;
import org.vizzini.ai.neuralnetwork.DefaultLayer;
import org.vizzini.ai.neuralnetwork.DefaultNeuralNetwork;
import org.vizzini.ai.neuralnetwork.DefaultNeuralNetworkAppliance;
import org.vizzini.ai.neuralnetwork.Layer;
import org.vizzini.ai.neuralnetwork.NeuralNetwork;
import org.vizzini.ai.neuralnetwork.NeuralNetworkAppliance;
import org.vizzini.ai.neuralnetwork.OutputFilter;
import org.vizzini.ai.neuralnetwork.PassThroughFunction;
import org.vizzini.ai.neuralnetwork.SigmoidFunction;
import org.vizzini.ai.neuralnetwork.format.NeuralNetworkApplianceFormat;
import org.vizzini.ai.neuralnetwork.format.io.NeuralNetworkApplianceIO;
import org.vizzini.ai.robot.RobotImage;

/**
 * Provides a builder for a neural network appliance.
 */
public final class NeuralNetworkApplianceBuilder
{
    /** Flag indicating whether test output should be verbose. */
    private static final boolean IS_VERBOSE = false;

    /**
     * Build.
     * 
     * @param maxDimension Maximum image dimension.
     * 
     * @return a new neural network appliance.
     */
    public NeuralNetworkAppliance<RobotImage, String> buildAlphaNumericOcrNetwork(final Dimension maxDimension)
    {
        final RobotImageInputFilter inputFilter = new BlackAndWhiteImageInputFilter(maxDimension);

        // Create neural network.
        final int inputCount = inputFilter.computeInputLength();
        // 10 digits + comma + decimal point + 26 uppercase letters + 26 lowercase letters
        final int outputCount = 10 + 1 + 1 + 26 + 26;
        final int hiddenCount = computeHiddenCount(inputCount, outputCount);

        if (IS_VERBOSE)
        {
            System.out.println(" inputCount = " + inputCount + " hiddenCount = " + hiddenCount + " outputCount = "
                    + outputCount);
        }

        final NeuralNetwork neuralNetwork = createNeuralNetwork(inputCount, hiddenCount, outputCount);

        final OutputFilter<String> outputFilter = new NumericOutputFilter();

        return new DefaultNeuralNetworkAppliance<RobotImage, String>(inputFilter, neuralNetwork, outputFilter);
    }

    /**
     * Build.
     * 
     * @param maxDimension Maximum image dimension.
     * 
     * @return a new neural network appliance.
     */
    public NeuralNetworkAppliance<RobotImage, String> buildAsciiOcrNetwork(final Dimension maxDimension)
    {
        final RobotImageInputFilter inputFilter = new BlackAndWhiteImageInputFilter(maxDimension);

        // Create neural network.
        final int inputCount = inputFilter.computeInputLength();
        // ASCII has 95 printable characters.
        final int outputCount = 95;
        final int hiddenCount = computeHiddenCount(inputCount, outputCount);

        if (IS_VERBOSE)
        {
            System.out.println(" inputCount = " + inputCount + " hiddenCount = " + hiddenCount + " outputCount = "
                    + outputCount);
        }

        final NeuralNetwork neuralNetwork = createNeuralNetwork(inputCount, hiddenCount, outputCount);

        final OutputFilter<String> outputFilter = new ASCIIOutputFilter();

        return new DefaultNeuralNetworkAppliance<RobotImage, String>(inputFilter, neuralNetwork, outputFilter);
    }

    /**
     * @param inputStream Input stream.
     * @param formatter Appliance formatter.
     * 
     * @return a new neural network appliance.
     */
    public <I, O> NeuralNetworkAppliance<I, O> buildFromInputStream(final InputStream inputStream,
            final NeuralNetworkApplianceFormat<I, O> formatter)
    {
        final NeuralNetworkApplianceIO<I, O> applianceIO = new NeuralNetworkApplianceIO<I, O>(formatter);

        return applianceIO.read(inputStream);
    }

    /**
     * @param reader Reader.
     * @param formatter Appliance formatter.
     * 
     * @return a new neural network appliance.
     */
    public <I, O> NeuralNetworkAppliance<I, O> buildFromReader(final Reader reader,
            final NeuralNetworkApplianceFormat<I, O> formatter)
    {
        final NeuralNetworkApplianceIO<I, O> applianceIO = new NeuralNetworkApplianceIO<I, O>(formatter);

        return applianceIO.read(reader);
    }

    /**
     * Build.
     * 
     * @param maxDimension Maximum image dimension.
     * 
     * @return a new neural network appliance.
     */
    public NeuralNetworkAppliance<RobotImage, String> buildNumericOcrNetwork(final Dimension maxDimension)
    {
        final RobotImageInputFilter inputFilter = new BlackAndWhiteImageInputFilter(maxDimension);

        // Create neural network.
        final int inputCount = inputFilter.computeInputLength();
        // 10 digits + comma + decimal point
        final int outputCount = 10 + 1 + 1;
        final int hiddenCount = computeHiddenCount(inputCount, outputCount);

        if (IS_VERBOSE)
        {
            System.out.println(" inputCount = " + inputCount + " hiddenCount = " + hiddenCount + " outputCount = "
                    + outputCount);
        }

        final NeuralNetwork neuralNetwork = createNeuralNetwork(inputCount, hiddenCount, outputCount);

        final OutputFilter<String> outputFilter = new NumericOutputFilter();

        return new DefaultNeuralNetworkAppliance<RobotImage, String>(inputFilter, neuralNetwork, outputFilter);
    }

    /**
     * @param inputCount Input count.
     * @param outputCount Output count.
     * 
     * @return the hidden count computed from the given parameters.
     */
    private int computeHiddenCount(final int inputCount, final int outputCount)
    {
        final int average = (int)Math.ceil((inputCount + outputCount) / 2.0);

        return Math.max(inputCount, average);
    }

    /**
     * @param inputCount Input layer node count.
     * @param hiddenCount Hidden layer node count.
     * @param outputCount Output layer node count.
     * 
     * @return a new neural network.
     */
    private NeuralNetwork createNeuralNetwork(final int inputCount, final int hiddenCount, final int outputCount)
    {
        final NeuralNetwork answer = new DefaultNeuralNetwork();

        // Create and add layers.
        final Layer layer0 = new DefaultLayer("Input", inputCount, new PassThroughFunction(), true);
        answer.addLayer(layer0);

        final Layer layer1 = new DefaultLayer("Hidden", hiddenCount, new SigmoidFunction(), true);
        answer.addLayer(layer1);

        final Layer layer2 = new DefaultLayer("Output", outputCount, new SigmoidFunction(), false);
        answer.addLayer(layer2);

        // Create and add connectors.
        final Connector connector01 = new DefaultConnector(layer0, layer1);
        answer.addConnector(connector01);

        final Connector connector02 = new DefaultConnector(layer0, layer2);
        answer.addConnector(connector02);

        final Connector connector12 = new DefaultConnector(layer1, layer2);
        answer.addConnector(connector12);

        return answer;
    }
}
