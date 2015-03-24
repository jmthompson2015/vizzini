package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.vizzini.ai.neuralnetwork.ArrayUtilities;
import org.vizzini.ai.neuralnetwork.BipolarSigmoidFunction;
import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.Example;
import org.vizzini.ai.neuralnetwork.FeedForwardNetwork;
import org.vizzini.ai.neuralnetwork.NeuralNetwork;
import org.vizzini.ai.neuralnetwork.NeuralNetworkBatchTrainer;
import org.vizzini.ai.neuralnetwork.NeuralNetworkTrainer;
import org.vizzini.ai.neuralnetwork.TrainingCalculator;
import org.vizzini.ai.neuralnetwork.format.CSVNeuralNetworkFormat;
import org.vizzini.ai.neuralnetwork.format.NeuralNetworkFormat;

/**
 * Provides unit tests for the <code>NeuralNetworkBatchTrainer</code> class.
 */
public final class NeuralNetworkBatchTrainerTest
{
    /** Flag indicating whether test output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Test data. */
    private final TestData testData = new TestData();

    /** Array utilities. */
    private ArrayUtilities arrayUtils;

    /**
     * Test the <code>NeuralNetworkBatchTrainer()</code> method.
     */
    @Test
    public void testConstructor()
    {
        final NeuralNetwork network = new FeedForwardNetwork(3, 3, 3, new BipolarSigmoidFunction(), false);
        network.fillWeights(0.1);
        final double alpha = 0.1;
        final double beta = 0.9;
        final List<Example> examples = new ArrayList<Example>();

        final NeuralNetworkTrainer result = new NeuralNetworkBatchTrainer(network, examples, IS_VERBOSE, alpha, beta);

        assertThat(result.isVerbose(), is(IS_VERBOSE));

        final TrainingCalculator trainingCalculator = result.getTrainingCalculator();

        assertNotNull(trainingCalculator);
        assertThat(trainingCalculator.getNeuralNetwork(), is(network));
        assertThat(trainingCalculator.getAlpha(), is(alpha));
        assertThat(trainingCalculator.getBeta(), is(beta));
    }

    /**
     * Test the <code>NeuralNetworkBatchTrainer()</code> method.
     */
    @Test
    public void testConstructorAlphaOutOfRange()
    {
        final NeuralNetwork network = new FeedForwardNetwork(3, 3, 3, new BipolarSigmoidFunction(), false);
        network.fillWeights(0.1);
        final double beta = 0.9;
        final List<Example> examples = new ArrayList<Example>();

        {
            final double alpha = -0.1;

            try
            {
                new NeuralNetworkBatchTrainer(network, examples, IS_VERBOSE, alpha, beta);
                fail("Should have thrown an exception");
            }
            catch (final IllegalArgumentException e)
            {
                assertThat(e.getMessage(), is("alpha is out of range [0.0, 1.0]: -0.1"));
            }
        }

        {
            final double alpha = 1.1;

            try
            {
                new NeuralNetworkBatchTrainer(network, examples, IS_VERBOSE, alpha, beta);
                fail("Should have thrown an exception");
            }
            catch (final IllegalArgumentException e)
            {
                assertThat(e.getMessage(), is("alpha is out of range [0.0, 1.0]: 1.1"));
            }
        }
    }

    /**
     * Test the <code>NeuralNetworkBatchTrainer()</code> method.
     */
    @Test
    public void testConstructorBetaOutOfRange()
    {
        final NeuralNetwork network = new FeedForwardNetwork(3, 3, 3, new BipolarSigmoidFunction(), false);
        network.fillWeights(0.1);
        final double alpha = 0.1;
        final List<Example> examples = new ArrayList<Example>();

        {
            final double beta = -0.1;

            try
            {
                new NeuralNetworkBatchTrainer(network, examples, IS_VERBOSE, alpha, beta);
                fail("Should have thrown an exception");
            }
            catch (final IllegalArgumentException e)
            {
                assertThat(e.getMessage(), is("beta is out of range [0.0, 1.0]: -0.1"));
            }
        }

        {
            final double beta = 1.1;

            try
            {
                new NeuralNetworkBatchTrainer(network, examples, IS_VERBOSE, alpha, beta);
                fail("Should have thrown an exception");
            }
            catch (final IllegalArgumentException e)
            {
                assertThat(e.getMessage(), is("beta is out of range [0.0, 1.0]: 1.1"));
            }
        }
    }

    /**
     * Test the <code>NeuralNetworkBatchTrainer()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final double alpha = 0.1;
        final double beta = 0.9;
        final List<Example> examples = new ArrayList<Example>();

        try
        {
            new NeuralNetworkBatchTrainer(null, examples, IS_VERBOSE, alpha, beta);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("neuralNetwork is null"));
        }

        try
        {
            final NeuralNetwork network = new FeedForwardNetwork(3, 3, 3, new BipolarSigmoidFunction(), false);
            network.fillWeights(0.1);
            new NeuralNetworkBatchTrainer(network, null, IS_VERBOSE, alpha, beta);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("examples is null"));
        }
    }

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void trainEcho()
    {
        final NeuralNetwork network = testData.createNeuralNetworkEcho();
        network.randomizeWeights(0.1);

        final List<Example> examples = testData.createExamplesEcho();

        // Train
        final double beta = 1.0;
        final double alpha = 0.3;
        final NeuralNetworkTrainer trainer = new NeuralNetworkBatchTrainer(network, examples, IS_VERBOSE, alpha, beta);

        final double maxError = 0.01;
        final int maxCount = 100;
        final int printFrequency = maxCount / 100;

        final double error = trainer.runTrainingLoop(maxError, maxCount, printFrequency);

        if (IS_VERBOSE)
        {
            System.out.println();
            testNetwork(network, examples);
            System.out.println();
            printMinMaxWeights("connector01", network.getConnector(0, 1));
            printMinMaxWeights("connector12", network.getConnector(1, 2));
        }

        assertTrue(String.valueOf(error), error < maxError);
    }

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void trainSine()
    {
        final NeuralNetwork network = testData.createNeuralNetworkSine(1, 7, 1);
        network.fillWeights(0.1);

        final List<Example> examples = testData.createExamplesSine();

        // Train
        final double beta = 1.0;
        final double alpha = 0.07;

        final NeuralNetworkTrainer trainer = new NeuralNetworkBatchTrainer(network, examples, IS_VERBOSE, alpha, beta);

        final double maxError = 2.22;
        final int maxCount = 10000;
        final int printFrequency = maxCount / 100;

        final double error = trainer.runTrainingLoop(maxError, maxCount, printFrequency);

        if (IS_VERBOSE)
        {
            System.out.println();
            testNetwork(network, examples);
            System.out.println();
            printMinMaxWeights("connector01", network.getConnector(0, 1));
            printMinMaxWeights("connector02", network.getConnector(0, 2));
            printMinMaxWeights("connector12", network.getConnector(1, 2));
        }

        assertTrue(String.valueOf(error), error < maxError);
    }

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void trainThirds()
    {
        final NeuralNetwork network = testData.createNeuralNetworkThirds();
        network.randomizeWeights(0.1);

        final List<Example> examples = testData.createExamplesThirds();

        // Train
        final double beta = 1.0;
        final double alpha = 0.08;

        final NeuralNetworkTrainer trainer = new NeuralNetworkBatchTrainer(network, examples, IS_VERBOSE, alpha, beta);

        final double maxError = 0.25;
        final int maxCount = 2000;
        final int printFrequency = maxCount / 100;

        final double error = trainer.runTrainingLoop(maxError, maxCount, printFrequency);

        if (IS_VERBOSE)
        {
            System.out.println();
            testNetwork(network, examples);
            System.out.println();
            printMinMaxWeights("connector01", network.getConnector(0, 1));
            printMinMaxWeights("connector02", network.getConnector(0, 2));
            printMinMaxWeights("connector12", network.getConnector(1, 2));
        }

        assertTrue(String.valueOf(error), error < maxError);
    }

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void trainXOR()
    {
        final NeuralNetwork network = testData.createNeuralNetworkXOR();

        final List<Example> examples = testData.createExamplesXOR();

        // Train
        final double beta = 0.95;
        final double alpha = 0.1;
        final NeuralNetworkTrainer trainer = new NeuralNetworkBatchTrainer(network, examples, IS_VERBOSE, alpha, beta);

        final double maxError = 0.01;
        final int maxCount = 500;
        final int printFrequency = maxCount / 100;

        final double error = trainer.runTrainingLoop(maxError, maxCount, printFrequency);

        if (IS_VERBOSE)
        {
            System.out.println();
            testNetwork(network, examples);
        }

        assertTrue(String.valueOf(error), error < maxError);

        if (IS_VERBOSE)
        {
            final NeuralNetworkFormat formatter = new CSVNeuralNetworkFormat();
            System.out.println(formatter.format(network));
        }
    }

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void trainXOR0()
    {
        final NeuralNetwork network = testData.createNeuralNetworkXOR();
        network.fillWeights(1.0);

        final List<Example> examples = testData.createExamplesXOR();

        // Train
        final double beta = 1.0;
        final double alpha = 0.2;
        final NeuralNetworkTrainer trainer = new NeuralNetworkBatchTrainer(network, examples, IS_VERBOSE, alpha, beta);

        final double maxError = 0.01;
        final int maxCount = 500;
        final int printFrequency = maxCount / 100;

        final double error = trainer.runTrainingLoop(maxError, maxCount, printFrequency);

        if (IS_VERBOSE)
        {
            System.out.println();
            testNetwork(network, examples);
        }

        assertTrue(String.valueOf(error), error < maxError);

        if (IS_VERBOSE)
        {
            final NeuralNetworkFormat formatter = new CSVNeuralNetworkFormat();
            System.out.println(formatter.format(network));
        }
    }

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void trainXOR2()
    {
        // FIXME: perfect network does not performing training
        final NeuralNetwork network = testData.createNeuralNetworkXOR2();

        final List<Example> examples = testData.createExamplesXOR();

        // Train
        final double beta = 0.0;
        final double alpha = 0.1;
        final NeuralNetworkTrainer trainer = new NeuralNetworkBatchTrainer(network, examples, IS_VERBOSE, alpha, beta);

        final double maxError = 0.02;
        final int maxCount = 200;
        final int printFrequency = maxCount / 100;

        final double error = trainer.runTrainingLoop(maxError, maxCount, printFrequency);

        if (IS_VERBOSE)
        {
            System.out.println();
            final Connector connector01 = network.getConnector(0, 1);
            printMinMaxWeights("connector01", connector01);
            final Connector connector12 = network.getConnector(1, 2);
            printMinMaxWeights("connector12", connector12);

            System.out.println();
            testNetwork(network, examples);
        }

        assertTrue(String.valueOf(error), error < maxError);
    }

    /**
     * @return the arrayUtils
     */
    private ArrayUtilities getArrayUtils()
    {
        if (arrayUtils == null)
        {
            arrayUtils = new ArrayUtilities();
        }

        return arrayUtils;
    }

    /**
     * @param title Title.
     * @param connector Connector.
     */
    private void printMinMaxWeights(final String title, final Connector connector)
    {
        double sum = 0.0;
        int count = 0;
        double min = 1.0 * Double.MAX_VALUE;
        double max = -1.0 * Double.MAX_VALUE;

        for (int i = 0; i < connector.getFromLayer().getNodeCount(); i++)
        {
            final double[] weights = connector.getWeights(i);
            count += weights.length;

            for (int j = 0; j < weights.length; j++)
            {
                final double weight = Math.abs(weights[j]);
                sum += weight;
                min = Math.min(weight, min);
                max = Math.max(weight, max);
            }
        }

        final double average = sum / count;

        System.out.println("min, max, average weights " + title + " = " + min + " " + max + " " + average);
    }

    /**
     * Test the network.
     * 
     * @param neuralNetwork Neural network.
     * @param examples Examples.
     */
    private void testNetwork(final NeuralNetwork neuralNetwork, final List<Example> examples)
    {
        // Test the network.
        final int size = 30;
        final char padChar = '-';
        final String format0 = "%" + size + "s %" + size + "s %" + size + "s";
        System.out.println(String.format(format0 + " %s", StringUtils.center("Inputs", size, padChar),
                StringUtils.center("Desired", size, padChar), StringUtils.center("Output", size, padChar), "Max Node"));
        final String format1 = "%8.4f";

        for (final Example example : examples)
        {
            final String inputsString = getArrayUtils().toString(example.getInputs(), format1);
            final String outputsString = getArrayUtils().toString(example.getOutputs(), format1);

            final double[] tOutputs = neuralNetwork.evaluate(example.getInputs());
            final String tOutputsString = getArrayUtils().toString(tOutputs, format1);
            final int tMaxNode = neuralNetwork.getMaxOutputValueIndex();

            System.out.println(String.format(format0 + " %d", inputsString, outputsString, tOutputsString, tMaxNode));
        }
    }
}
