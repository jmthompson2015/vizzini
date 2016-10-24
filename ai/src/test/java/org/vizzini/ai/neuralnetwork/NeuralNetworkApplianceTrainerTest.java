package org.vizzini.ai.neuralnetwork;

import static org.junit.Assert.assertTrue;

import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.vizzini.ai.neuralnetwork.ApplianceExample;
import org.vizzini.ai.neuralnetwork.ArrayUtilities;
import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.NeuralNetworkAppliance;
import org.vizzini.ai.neuralnetwork.NeuralNetworkApplianceTrainer;
import org.vizzini.ai.neuralnetwork.format.CSVNeuralNetworkFormat;
import org.vizzini.ai.neuralnetwork.format.NeuralNetworkFormat;

/**
 * Provides unit tests for the <code>NeuralNetworkTrainer</code> class.
 */
public final class NeuralNetworkApplianceTrainerTest
{
    /** Flag indicating whether test output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Test data. */
    private final TestData testData = new TestData();

    /** Array utilities. */
    private ArrayUtilities arrayUtils;

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void trainEcho()
    {
        final NeuralNetworkAppliance<double[], double[]> appliance = testData.createApplianceEcho();

        final List<ApplianceExample<double[], double[]>> examples = testData.createApplianceExamplesEcho();

        // Train
        final double initialWeight = 0.1;
        final boolean isBatchUsed = true;
        final double beta = 1.0;
        final double alpha = 0.3;
        appliance.getNeuralNetwork().randomizeWeights(initialWeight);

        final NeuralNetworkApplianceTrainer<double[], double[]> trainer = new NeuralNetworkApplianceTrainer<double[], double[]>(
                appliance, examples, isBatchUsed, IS_VERBOSE, alpha, beta);

        final double maxError = 0.01;
        final int maxCount = 100;
        final int printFrequency = maxCount / 100;

        final double error = trainer.runTrainingLoop(maxError, maxCount, printFrequency);

        if (IS_VERBOSE)
        {
            System.out.println();
            testApplianceDoubleDouble(appliance, examples);
        }

        assertTrue(String.valueOf(error), error < maxError);
    }

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void trainSine()
    {
        final NeuralNetworkAppliance<double[], double[]> appliance = testData.createApplianceSine();

        final List<ApplianceExample<double[], double[]>> examples = testData.createApplianceExamplesSine();

        // Train
        final double initialWeight = 0.01;
        final boolean isBatchUsed = true;
        final double beta = 0.1;
        final double alpha = 0.07;
        appliance.getNeuralNetwork().randomizeWeights(initialWeight);

        final NeuralNetworkApplianceTrainer<double[], double[]> trainer = new NeuralNetworkApplianceTrainer<double[], double[]>(
                appliance, examples, isBatchUsed, IS_VERBOSE, alpha, beta);

        final double maxError = 0.01;
        final int maxCount = 5000;
        final int printFrequency = maxCount / 100;

        final double error = trainer.runTrainingLoop(maxError, maxCount, printFrequency);

        if (IS_VERBOSE)
        {
            System.out.println();
            testApplianceDoubleDouble(appliance, examples);
        }

        assertTrue(String.valueOf(error), error < maxError);
    }

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void trainThirds()
    {
        final NeuralNetworkAppliance<double[], boolean[]> appliance = testData.createApplianceThirds();

        final List<ApplianceExample<double[], boolean[]>> examples = testData.createApplianceExamplesThirds();

        // Train
        final double initialWeight = 0.1;
        final boolean isBatchUsed = true;
        final double beta = 0.95;
        final double alpha = 0.08;
        appliance.getNeuralNetwork().randomizeWeights(initialWeight);

        final NeuralNetworkApplianceTrainer<double[], boolean[]> trainer = new NeuralNetworkApplianceTrainer<double[], boolean[]>(
                appliance, examples, isBatchUsed, IS_VERBOSE, alpha, beta);

        final double maxError = 0.23;
        final int maxCount = 2000;
        final int printFrequency = maxCount / 100;

        final double error = trainer.runTrainingLoop(maxError, maxCount, printFrequency);

        if (IS_VERBOSE)
        {
            System.out.println();
            testApplianceDoubleBoolean(appliance, examples);
        }

        assertTrue(String.valueOf(error), error < maxError);
    }

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void trainXOR()
    {
        final NeuralNetworkAppliance<boolean[], boolean[]> appliance = testData.createApplianceXOR();

        final List<ApplianceExample<boolean[], boolean[]>> examples = testData.createApplianceExamplesXOR();

        // Train
        final boolean isBatchUsed = true;
        final double beta = 0.95;
        final double alpha = 0.1;

        final NeuralNetworkApplianceTrainer<boolean[], boolean[]> trainer = new NeuralNetworkApplianceTrainer<boolean[], boolean[]>(
                appliance, examples, isBatchUsed, IS_VERBOSE, alpha, beta);

        final double maxError = 0.01;
        final int maxCount = 500;
        final int printFrequency = 10;

        final double error = trainer.runTrainingLoop(maxError, maxCount, printFrequency);

        if (IS_VERBOSE)
        {
            System.out.println();
            testApplianceBooleanBoolean(appliance, examples);
        }

        assertTrue(String.valueOf(error), error < maxError);

        if (IS_VERBOSE)
        {
            final NeuralNetworkFormat formatter = new CSVNeuralNetworkFormat();
            System.out.println(formatter.format(appliance.getNeuralNetwork()));
        }
    }

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void trainXOR2()
    {
        // FIXME: perfect network does not performing training
        final NeuralNetworkAppliance<boolean[], boolean[]> appliance = testData.createApplianceXOR2();

        final List<ApplianceExample<boolean[], boolean[]>> examples = testData.createApplianceExamplesXOR();

        // Train
        final boolean isBatchUsed = true;
        final double beta = 0.0;
        final double alpha = 0.1;
        final NeuralNetworkApplianceTrainer<boolean[], boolean[]> trainer = new NeuralNetworkApplianceTrainer<boolean[], boolean[]>(
                appliance, examples, isBatchUsed, IS_VERBOSE, alpha, beta);

        final double maxError = 0.02;
        final int maxCount = 200;
        final int printFrequency = 2;

        final double error = trainer.runTrainingLoop(maxError, maxCount, printFrequency);

        if (IS_VERBOSE)
        {
            System.out.println();
            final Connector connector01 = appliance.getNeuralNetwork().getConnector(0, 1);
            printMinMaxWeights("connector01", connector01);
            final Connector connector12 = appliance.getNeuralNetwork().getConnector(1, 2);
            printMinMaxWeights("connector12", connector12);

            System.out.println();
            testApplianceBooleanBoolean(appliance, examples);
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
        double min = 1.0 * Double.MAX_VALUE;
        double max = -1.0 * Double.MAX_VALUE;

        for (int i = 0; i < connector.getFromLayer().getNodeCount(); i++)
        {
            final double[] weights = connector.getWeights(i);

            for (int j = 0; j < weights.length; j++)
            {
                final double weight = Math.abs(weights[j]);
                min = Math.min(weight, min);
                max = Math.max(weight, max);
            }
        }

        System.out.println("min, max weights " + title + " = " + min + " " + max);
    }

    /**
     * @param appliance Neural network appliance.
     * @param examples Examples.
     */
    private void testApplianceBooleanBoolean(final NeuralNetworkAppliance<boolean[], boolean[]> appliance,
            final List<ApplianceExample<boolean[], boolean[]>> examples)
    {
        // Test the appliance.
        final int size = 15;
        final char padChar = '-';
        final String format0 = "%" + size + "s %" + size + "s %" + size + "s";
        System.out.println(String.format(format0, StringUtils.center("Inputs", size, padChar),
                StringUtils.center("Desired", size, padChar), StringUtils.center("Output", size, padChar)));

        for (final ApplianceExample<boolean[], boolean[]> example : examples)
        {
            final String inputsString = Arrays.toString(example.getInput());
            final String outputsString = Arrays.toString(example.getOutput());

            final boolean[] tOutputs = appliance.evaluate(example.getInput());
            final String tOutputsString = Arrays.toString(tOutputs);

            System.out.println(String.format(format0, inputsString, outputsString, tOutputsString));
        }
    }

    /**
     * @param appliance Neural network appliance.
     * @param examples Examples.
     */
    private void testApplianceDoubleBoolean(final NeuralNetworkAppliance<double[], boolean[]> appliance,
            final List<ApplianceExample<double[], boolean[]>> examples)
    {
        // Test the appliance.
        final int size = 15;
        final char padChar = '-';
        final String format0 = "%" + size + "s %" + size + "s %" + size + "s";
        System.out.println(String.format(format0, StringUtils.center("Inputs", size, padChar),
                StringUtils.center("Desired", size, padChar), StringUtils.center("Output", size, padChar)));
        final String format1 = "%8.4f";

        for (final ApplianceExample<double[], boolean[]> example : examples)
        {
            final String inputsString = getArrayUtils().toString(example.getInput(), format1);
            final String outputsString = Arrays.toString(example.getOutput());

            final boolean[] tOutputs = appliance.evaluate(example.getInput());
            final String tOutputsString = Arrays.toString(tOutputs);

            System.out.println(String.format(format0, inputsString, outputsString, tOutputsString));
        }
    }

    /**
     * @param appliance Neural network appliance.
     * @param examples Examples.
     */
    private void testApplianceDoubleDouble(final NeuralNetworkAppliance<double[], double[]> appliance,
            final List<ApplianceExample<double[], double[]>> examples)
    {
        // Test the appliance.
        final int size = 30;
        final char padChar = '-';
        final String format0 = "%" + size + "s %" + size + "s %" + size + "s";
        System.out.println(String.format(format0, StringUtils.center("Inputs", size, padChar),
                StringUtils.center("Desired", size, padChar), StringUtils.center("Output", size, padChar)));
        final String format1 = "%8.4f";

        for (final ApplianceExample<double[], double[]> example : examples)
        {
            final String inputsString = getArrayUtils().toString(example.getInput(), format1);
            final String outputsString = getArrayUtils().toString(example.getOutput(), format1);

            final double[] tOutputs = appliance.evaluate(example.getInput());
            final String tOutputsString = getArrayUtils().toString(tOutputs, format1);

            System.out.println(String.format(format0, inputsString, outputsString, tOutputsString));
        }
    }
}
