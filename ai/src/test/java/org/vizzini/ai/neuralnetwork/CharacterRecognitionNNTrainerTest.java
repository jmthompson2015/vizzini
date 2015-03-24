package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.vizzini.ai.neuralnetwork.ArrayUtilities;
import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.Example;
import org.vizzini.ai.neuralnetwork.FeedForwardNetwork;
import org.vizzini.ai.neuralnetwork.NeuralNetwork;
import org.vizzini.ai.neuralnetwork.NeuralNetworkBatchTrainer;
import org.vizzini.ai.neuralnetwork.NeuralNetworkTrainer;

/**
 * Provides unit tests for the <code>CharacterRecognitionNNTrainer</code> class.
 */
public final class CharacterRecognitionNNTrainerTest
{
    /** Flag indicating whether test output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Array utilities. */
    private ArrayUtilities arrayUtils;

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void train()
    {
        final NeuralNetwork network = new FeedForwardNetwork(35, 10, 7);
        network.randomizeWeights(0.1);

        final double[][] ins = CharacterRecognitionTestData.LETTERS;
        assertThat(ins.length, is(7));
        assertThat(ins[0].length, is(35));

        final double[][] outs = { { 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, }, { 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, },
                { 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, }, { 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, },
                { 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, }, { 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, },
                { 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, }, };
        assertThat(outs.length, is(7));
        assertThat(outs[0].length, is(7));
        final List<Example> examples = createExamples(ins, outs);

        // Train
        final double alpha = 0.1;
        final double beta = 0.9;

        final NeuralNetworkTrainer trainer = new NeuralNetworkBatchTrainer(network, examples, IS_VERBOSE, alpha, beta);

        final double maxError = 0.05;
        final int maxCount = 300;
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
     * @param ins Inputs.
     * @param outs Outputs.
     * 
     * @return a new array of examples.
     */
    private List<Example> createExamples(final double[][] ins, final double[][] outs)
    {
        final List<Example> answer = new ArrayList<Example>(ins.length);

        for (int i = 0; i < ins.length; i++)
        {
            answer.add(new Example(ins[i], outs[i]));
        }

        return answer;
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
        final int size0 = 11;
        final int size = 57;
        final char padChar = '-';
        final String format0 = "%" + size0 + "s %" + size + "s %" + size + "s";
        System.out.println(String.format(format0 + " %s", StringUtils.center("Inputs", size0, padChar),
                StringUtils.center("Desired", size, padChar), StringUtils.center("Output", size, padChar), "Max Node"));
        final String format1 = "%6.3f";

        for (final Example example : examples)
        {
            final String inputsString = "<too long>";
            final String outputsString = getArrayUtils().toString(example.getOutputs(), format1);

            final double[] tOutputs = neuralNetwork.evaluate(example.getInputs());
            final String tOutputsString = getArrayUtils().toString(tOutputs, format1);
            final int tMaxNode = neuralNetwork.getMaxOutputValueIndex();

            System.out.println(String.format(format0 + " %d", inputsString, outputsString, tOutputsString, tMaxNode));
        }
    }
}
