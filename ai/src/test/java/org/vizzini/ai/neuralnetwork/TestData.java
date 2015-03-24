package org.vizzini.ai.neuralnetwork;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.ai.neuralnetwork.ApplianceExample;
import org.vizzini.ai.neuralnetwork.ArrayUtilities;
import org.vizzini.ai.neuralnetwork.BinaryDecodeFilter;
import org.vizzini.ai.neuralnetwork.BinaryEncodeFilter;
import org.vizzini.ai.neuralnetwork.BinaryEncoder;
import org.vizzini.ai.neuralnetwork.BipolarSigmoidFunction;
import org.vizzini.ai.neuralnetwork.BooleanInputFilter;
import org.vizzini.ai.neuralnetwork.BooleanOutputFilter;
import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.DefaultConnector;
import org.vizzini.ai.neuralnetwork.DefaultLayer;
import org.vizzini.ai.neuralnetwork.DefaultNeuralNetwork;
import org.vizzini.ai.neuralnetwork.DefaultNeuralNetworkAppliance;
import org.vizzini.ai.neuralnetwork.Example;
import org.vizzini.ai.neuralnetwork.FeedForwardNetwork;
import org.vizzini.ai.neuralnetwork.InputFilter;
import org.vizzini.ai.neuralnetwork.Layer;
import org.vizzini.ai.neuralnetwork.NeuralNetwork;
import org.vizzini.ai.neuralnetwork.NeuralNetworkAppliance;
import org.vizzini.ai.neuralnetwork.OutputFilter;
import org.vizzini.ai.neuralnetwork.PassThroughFunction;
import org.vizzini.ai.neuralnetwork.SigmoidFunction;
import org.vizzini.ai.neuralnetwork.ThresholdFunction;

/**
 * Provides test data for a neural network appliance.
 */
public final class TestData
{
    /** Array utilities. */
    private ArrayUtilities arrayUtils;

    /**
     * @return a new neural network appliance.
     */
    public NeuralNetworkAppliance<double[], double[]> createApplianceEcho()
    {
        final InputFilter<double[]> inputFilter = null;
        final NeuralNetwork neuralNetwork = createNeuralNetworkEcho();
        final OutputFilter<double[]> outputFilter = null;

        final NeuralNetworkAppliance<double[], double[]> answer = new DefaultNeuralNetworkAppliance<double[], double[]>(
                inputFilter, neuralNetwork, outputFilter);

        return answer;
    }

    /**
     * @return a new list of examples.
     */
    public List<ApplianceExample<double[], double[]>> createApplianceExamplesEcho()
    {
        final double[][] ins = { { -.5, -.5, .5 }, { -.5, .5, -.5 }, { .5, -.5, -.5 }, };

        final List<ApplianceExample<double[], double[]>> answer = new ArrayList<ApplianceExample<double[], double[]>>();

        for (int i = 0; i < ins.length; i++)
        {
            final ApplianceExample<double[], double[]> example = new ApplianceExample<double[], double[]>(ins[i],
                    ins[i]);
            answer.add(example);
        }

        return answer;
    }

    /**
     * @return a new list of examples.
     */
    public List<ApplianceExample<double[], double[]>> createApplianceExamplesSine()
    {
        final int exampleCount = 13;
        final double delta = 360.0 / (exampleCount - 1);

        final List<ApplianceExample<double[], double[]>> answer = new ArrayList<ApplianceExample<double[], double[]>>();

        for (int i = 0; i < exampleCount; i++)
        {
            final double input = delta * i;
            final double output = Math.sin(Math.toRadians(input));

            final ApplianceExample<double[], double[]> example = new ApplianceExample<double[], double[]>(
                    new double[] { input }, new double[] { output });
            answer.add(example);
        }

        return answer;
    }

    /**
     * @return a new list of examples.
     */
    public List<ApplianceExample<double[], boolean[]>> createApplianceExamplesThirds()
    {
        // Classify the input into one of three categories.
        final int exampleCount = 11;

        final List<ApplianceExample<double[], boolean[]>> answer = new ArrayList<ApplianceExample<double[], boolean[]>>(
                exampleCount);

        final double delta = 1.0 / (exampleCount - 1);

        for (int i = 0; i < exampleCount; i++)
        {
            final double input = delta * i;
            final boolean[] output = new boolean[3];
            output[0] = (input < 0.3333);
            output[1] = ((0.3333 <= input) && (input < 0.6667));
            output[2] = (input >= 0.6667);

            final ApplianceExample<double[], boolean[]> example = new ApplianceExample<double[], boolean[]>(
                    new double[] { input }, output);
            answer.add(example);
        }

        return answer;
    }

    /**
     * @return a new list of examples.
     */
    public List<ApplianceExample<boolean[], boolean[]>> createApplianceExamplesXOR()
    {
        final List<ApplianceExample<boolean[], boolean[]>> answer = new ArrayList<ApplianceExample<boolean[], boolean[]>>();

        answer.add(new ApplianceExample<boolean[], boolean[]>(new boolean[] { true, false }, new boolean[] { true }));
        answer.add(new ApplianceExample<boolean[], boolean[]>(new boolean[] { false, false }, new boolean[] { false }));
        answer.add(new ApplianceExample<boolean[], boolean[]>(new boolean[] { false, true }, new boolean[] { true }));
        answer.add(new ApplianceExample<boolean[], boolean[]>(new boolean[] { true, true }, new boolean[] { false }));

        return answer;
    }

    /**
     * @return a new neural network appliance.
     */
    public NeuralNetworkAppliance<double[], double[]> createApplianceSine()
    {
        final BinaryEncoder[] encoders = new BinaryEncoder[1];
        encoders[0] = new BinaryEncoder(0.0, 360.0, 1.0);

        final BinaryEncoder[] decoders = new BinaryEncoder[1];
        decoders[0] = new BinaryEncoder(-1.0, 1.0, 0.0001);

        final InputFilter<double[]> inputFilter = new BinaryEncodeFilter(encoders);
        final NeuralNetwork neuralNetwork = createNeuralNetworkSine(encoders[0].getLength(), encoders[0].getLength(),
                decoders[0].getLength());
        final OutputFilter<double[]> outputFilter = new BinaryDecodeFilter(decoders);

        final NeuralNetworkAppliance<double[], double[]> answer = new DefaultNeuralNetworkAppliance<double[], double[]>(
                inputFilter, neuralNetwork, outputFilter);

        return answer;
    }

    /**
     * @return a new neural network appliance.
     */
    public NeuralNetworkAppliance<double[], boolean[]> createApplianceThirds()
    {
        final InputFilter<double[]> inputFilter = null;
        final NeuralNetwork neuralNetwork = createNeuralNetworkThirds();
        final OutputFilter<boolean[]> outputFilter = new BooleanOutputFilter();

        final NeuralNetworkAppliance<double[], boolean[]> answer = new DefaultNeuralNetworkAppliance<double[], boolean[]>(
                inputFilter, neuralNetwork, outputFilter);

        return answer;
    }

    /**
     * @return a new neural network appliance.
     */
    public NeuralNetworkAppliance<boolean[], boolean[]> createApplianceXOR()
    {
        final InputFilter<boolean[]> inputFilter = new BooleanInputFilter();
        final NeuralNetwork neuralNetwork = createNeuralNetworkXOR();
        final OutputFilter<boolean[]> outputFilter = new BooleanOutputFilter();
        final NeuralNetworkAppliance<boolean[], boolean[]> answer = new DefaultNeuralNetworkAppliance<boolean[], boolean[]>(
                inputFilter, neuralNetwork, outputFilter);

        return answer;
    }

    /**
     * @return a new neural network appliance.
     */
    public NeuralNetworkAppliance<boolean[], boolean[]> createApplianceXOR2()
    {
        final InputFilter<boolean[]> inputFilter = new BooleanInputFilter();
        final NeuralNetwork neuralNetwork = createNeuralNetworkXOR2();
        final OutputFilter<boolean[]> outputFilter = new BooleanOutputFilter();
        final NeuralNetworkAppliance<boolean[], boolean[]> answer = new DefaultNeuralNetworkAppliance<boolean[], boolean[]>(
                inputFilter, neuralNetwork, outputFilter);

        return answer;
    }

    /**
     * @return a new list of examples.
     */
    public List<Example> createExamplesEcho()
    {
        return createExamplesDoubleDouble(createApplianceExamplesEcho());
    }

    /**
     * @return a new list of examples.
     */
    public List<Example> createExamplesSine()
    {
        final int exampleCount = 13;
        final double[][] ins = new double[exampleCount][];
        final double[][] outs = new double[exampleCount][];

        for (int i = 0; i < exampleCount; i++)
        {
            ins[i] = new double[1];
            outs[i] = new double[1];
            ins[i][0] = (double)i / (exampleCount - 1);
            outs[i][0] = Math.sin(Math.toRadians(360.0 * ins[i][0]));
        }

        final List<Example> answer = createExamples(ins, outs);

        return answer;
    }

    /**
     * @return a new list of examples.
     */
    public List<Example> createExamplesThirds()
    {
        return createExamplesDoubleBoolean(createApplianceExamplesThirds());
    }

    /**
     * @return a new list of examples.
     */
    public List<Example> createExamplesXOR()
    {
        return createExamplesBooleanBoolean(createApplianceExamplesXOR());
    }

    /**
     * @return a new neural network.
     */
    public NeuralNetwork createNeuralNetworkEcho()
    {
        final NeuralNetwork answer = new FeedForwardNetwork(3, 3, 3, new BipolarSigmoidFunction(), false);

        return answer;
    }

    /**
     * @param inputCount Input node count.
     * @param hiddenCount Hidden node count.
     * @param outputCount Output node count.
     * 
     * @return a new neural network.
     */
    public NeuralNetwork createNeuralNetworkSine(final int inputCount, final int hiddenCount, final int outputCount)
    {
        final NeuralNetwork answer = new DefaultNeuralNetwork();

        final Layer layer0 = new DefaultLayer("Input", inputCount, new PassThroughFunction(), false);
        answer.addLayer(layer0);

        final Layer layer1 = new DefaultLayer("Hidden", hiddenCount, new SigmoidFunction(), false);
        answer.addLayer(layer1);

        final Layer layer2 = new DefaultLayer("Output", outputCount, new BipolarSigmoidFunction(), false);
        answer.addLayer(layer2);

        final Connector connector01 = new DefaultConnector(layer0, layer1);
        answer.addConnector(connector01);

        final Connector connector02 = new DefaultConnector(layer0, layer2);
        answer.addConnector(connector02);

        final Connector connector12 = new DefaultConnector(layer1, layer2);
        answer.addConnector(connector12);

        return answer;
    }

    /**
     * @return a new neural network.
     */
    public NeuralNetwork createNeuralNetworkThirds()
    {
        // Classify the input into one of three categories.
        final NeuralNetwork answer = new DefaultNeuralNetwork();

        final Layer layer0 = new DefaultLayer("Input", 1, new PassThroughFunction(), false);
        answer.addLayer(layer0);

        final Layer layer1 = new DefaultLayer("Hidden", 6, new SigmoidFunction(), false);
        answer.addLayer(layer1);

        final Layer layer2 = new DefaultLayer("Output", 3, new SigmoidFunction(), false);
        answer.addLayer(layer2);

        final Connector connector01 = new DefaultConnector(layer0, layer1);
        answer.addConnector(connector01);

        final Connector connector02 = new DefaultConnector(layer0, layer2);
        answer.addConnector(connector02);

        final Connector connector12 = new DefaultConnector(layer1, layer2);
        answer.addConnector(connector12);

        return answer;
    }

    /**
     * @return a new neural network.
     */
    public NeuralNetwork createNeuralNetworkXOR()
    {
        final NeuralNetwork answer = new FeedForwardNetwork(2, 1, 1);

        // Add a non-standard connector.
        final Connector connector02 = new DefaultConnector(answer.getLayer(0), answer.getLayer(2));
        answer.addConnector(connector02);

        answer.fillWeights(1.0);

        // Cheat

        // From layer 0 to layer 1.
        final Connector connector01 = answer.getConnector(0, 1);
        connector01.setWeight(0, 0, 6.75);
        connector01.setWeight(1, 0, 6.75);
        connector01.setWeight(2, 0, -2.76); // bias node

        // From layer 0 to layer 2.
        connector02.setWeight(0, 0, -5.30);
        connector02.setWeight(1, 0, -5.30);
        connector02.setWeight(2, 0, 0.00);

        // From layer 1 to layer 2.
        final Connector connector12 = answer.getConnector(1, 2);
        connector12.setWeight(0, 0, 11.41);
        connector12.setWeight(1, 0, -3.29); // bias node

        return answer;
    }

    /**
     * @return a new neural network.
     */
    public NeuralNetwork createNeuralNetworkXOR2()
    {
        // Create neural network.
        final NeuralNetwork answer = new FeedForwardNetwork(2, 2, 1, new ThresholdFunction(), false);

        // FIXME: perfect network does not performing training
        answer.fillWeights(1.0);

        {
            final Connector connector01 = answer.getConnector(0, 1);
            connector01.setWeight(1, 0, -1.0);
            connector01.setWeight(2, 0, 0.0); // bias neurode

            connector01.setWeight(0, 1, -1.0);
            connector01.setWeight(2, 1, 0.0); // bias neurode

            final Connector connector12 = answer.getConnector(1, 2);
            connector12.setWeight(2, 0, 0.0); // bias neurode
        }

        return answer;
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
     * @param applianceExamples Appliance examples.
     * 
     * @return a new array of examples.
     */
    private List<Example> createExamplesBooleanBoolean(
            final List<ApplianceExample<boolean[], boolean[]>> applianceExamples)
    {
        final List<Example> answer = new ArrayList<Example>(applianceExamples.size());

        for (final ApplianceExample<boolean[], boolean[]> applianceExample : applianceExamples)
        {
            final double[] input = getArrayUtils().booleanToDouble(applianceExample.getInput());
            final double[] output = getArrayUtils().booleanToDouble(applianceExample.getOutput());

            final Example example = new Example(input, output);
            answer.add(example);
        }

        return answer;
    }

    /**
     * @param applianceExamples Appliance examples.
     * 
     * @return a new array of examples.
     */
    private List<Example> createExamplesDoubleBoolean(
            final List<ApplianceExample<double[], boolean[]>> applianceExamples)
    {
        final List<Example> answer = new ArrayList<Example>(applianceExamples.size());

        for (final ApplianceExample<double[], boolean[]> applianceExample : applianceExamples)
        {
            final double[] input = applianceExample.getInput();
            final double[] output = getArrayUtils().booleanToDouble(applianceExample.getOutput());

            final Example example = new Example(input, output);
            answer.add(example);
        }

        return answer;
    }

    /**
     * @param applianceExamples Appliance examples.
     * 
     * @return a new array of examples.
     */
    private List<Example> createExamplesDoubleDouble(final List<ApplianceExample<double[], double[]>> applianceExamples)
    {
        final List<Example> answer = new ArrayList<Example>(applianceExamples.size());

        for (final ApplianceExample<double[], double[]> applianceExample : applianceExamples)
        {
            final double[] input = applianceExample.getInput();
            final double[] output = applianceExample.getOutput();

            final Example example = new Example(input, output);
            answer.add(example);
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
}
