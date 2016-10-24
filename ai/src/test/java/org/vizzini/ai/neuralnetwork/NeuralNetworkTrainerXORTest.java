package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThat;
import static org.junit.matchers.JUnitMatchers.everyItem;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.ai.neuralnetwork.ArrayUtilities;
import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.DefaultConnector;
import org.vizzini.ai.neuralnetwork.DefaultLayer;
import org.vizzini.ai.neuralnetwork.DefaultNeuralNetwork;
import org.vizzini.ai.neuralnetwork.Example;
import org.vizzini.ai.neuralnetwork.Layer;
import org.vizzini.ai.neuralnetwork.NeuralNetwork;
import org.vizzini.ai.neuralnetwork.NeuralNetworkBatchTrainer;
import org.vizzini.ai.neuralnetwork.NeuralNetworkContinuousTrainer;
import org.vizzini.ai.neuralnetwork.PassThroughFunction;
import org.vizzini.ai.neuralnetwork.SigmoidFunction;

/**
 * Provides unit tests for the <code>NeuralNetworkBatchTrainer</code> and <code>NeuralNetworkContinuousTrainer</code>
 * classes.
 * <p>
 * XOR network from _The Pattern Recognition Basis of Artificial Intelligence_, Donald R. Tveter, page 75.
 * </p>
 */
public final class NeuralNetworkTrainerXORTest
{
    /** Flag indicating whether training output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Momentum constant. */
    private static final double ALPHA = 0.0;

    /** Learning constant. */
    private static final double BETA = 0.1;

    /** Array utilities. */
    private ArrayUtilities arrayUtils;

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate()
    {
        final NeuralNetwork neuralNetwork = createNeuralNetwork();

        final List<Example> examples = createExamples();

        assertEquals(examples.get(0).toString(), 0.9255, neuralNetwork.evaluate(examples.get(0).getInputs())[0], 0.0001);
        assertEquals(examples.get(1).toString(), 0.0665, neuralNetwork.evaluate(examples.get(1).getInputs())[0], 0.0001);
        assertEquals(examples.get(2).toString(), 0.9255, neuralNetwork.evaluate(examples.get(2).getInputs())[0], 0.0001);
        assertEquals(examples.get(3).toString(), 0.0919, neuralNetwork.evaluate(examples.get(3).getInputs())[0], 0.0001);
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluateDetail()
    {
        final NeuralNetwork neuralNetwork = createNeuralNetwork();

        neuralNetwork.evaluate(new double[] { 1.0, 0.0 });

        // Input layer.
        {
            final Layer layer = neuralNetwork.getLayer(0);
            assertThat(layer.getNodeCount(), is(3));
            assertThat(layer.getNodeCountWithoutBias(), is(2));

            // Input nodes.
            assertThat(layer.getInput(0), is(1.0));
            assertThat(layer.getInput(1), is(0.0));
            assertThat(layer.getInput(2), is(1.0)); // bias node

            // Output nodes.
            assertThat(layer.getOutput(0), is(1.0));
            assertThat(layer.getOutput(1), is(0.0));
            assertThat(layer.getOutput(2), is(1.0)); // bias node
        }

        // Hidden layer.
        {
            final Layer layer = neuralNetwork.getLayer(1);
            assertThat(layer.getNodeCount(), is(2));
            assertThat(layer.getNodeCountWithoutBias(), is(1));

            // Input nodes.
            assertThat(layer.getInput(0), is(4.34));
            assertThat(layer.getInput(1), is(1.0)); // bias node

            // Output nodes.
            assertEquals(0.98, layer.getOutput(0), 0.01);
            assertThat(layer.getOutput(1), is(1.0)); // bias node
        }

        // Output layer.
        {
            final Layer layer = neuralNetwork.getLayer(2);
            assertThat(layer.getNodeCount(), is(1));
            assertThat(layer.getNodeCountWithoutBias(), is(1));

            // Input nodes.
            assertEquals(2.52, layer.getInput(0), 0.01);

            // Output nodes.
            assertEquals(0.91, layer.getOutput(0), 0.02);
        }
    }

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void trainBatch()
    {
        // Pages 77-79.
        final NeuralNetwork neuralNetwork = createNeuralNetwork();
        neuralNetwork.fillWeights(0.0);

        final double[] inputs = new double[] { 1.0, 0.0 };

        verifyPassZero(neuralNetwork, inputs);

        final List<Example> examples = createFirstExample();

        final NeuralNetworkBatchTrainer trainer = new NeuralNetworkBatchTrainer(neuralNetwork, examples, IS_VERBOSE,
                ALPHA, BETA);

        trainer.train();

        verifyPassOne(trainer.getDeltas(), trainer.getDeltaWeights(), neuralNetwork, inputs);

        trainer.train();

        verifyPassTwo(trainer.getDeltas(), trainer.getDeltaWeights(), neuralNetwork, inputs);
    }

    /**
     * Test the <code>train()</code> method.
     */
    @Test
    public void trainContinuous()
    {
        // Pages 77-79.
        final NeuralNetwork neuralNetwork = createNeuralNetwork();
        neuralNetwork.fillWeights(0.0);

        final double[] inputs = new double[] { 1.0, 0.0 };

        verifyPassZero(neuralNetwork, inputs);

        final List<Example> examples = createFirstExample();

        final NeuralNetworkContinuousTrainer trainer = new NeuralNetworkContinuousTrainer(neuralNetwork, examples,
                IS_VERBOSE, ALPHA, BETA);

        trainer.train();

        final int exampleIndex = 0;

        verifyPassOne(trainer.getDeltas(exampleIndex), trainer.getDeltaWeights(exampleIndex), neuralNetwork, inputs);

        trainer.train();

        verifyPassTwo(trainer.getDeltas(exampleIndex), trainer.getDeltaWeights(exampleIndex), neuralNetwork, inputs);
    }

    /**
     * @return a new list of examples.
     */
    private List<Example> createExamples()
    {
        final List<Example> answer = createFirstExample();

        answer.add(new Example(new double[] { 0.0, 0.0 }, new double[] { 0.0 }));
        answer.add(new Example(new double[] { 0.0, 1.0 }, new double[] { 1.0 }));
        answer.add(new Example(new double[] { 1.0, 1.0 }, new double[] { 0.0 }));

        return answer;
    }

    /**
     * @return a new list of connector exceptions.
     */
    private List<Integer> createExceptionsPassOne()
    {
        final List<Integer> answer = new ArrayList<Integer>();

        answer.add(1);
        answer.add(2);

        return answer;
    }

    /**
     * @return a new list of connector exceptions.
     */
    private List<Integer> createExceptionsPassTwo()
    {
        final List<Integer> answer = new ArrayList<Integer>();

        answer.add(0);
        answer.add(1);
        answer.add(2);

        return answer;
    }

    /**
     * @return a new list of examples.
     */
    private List<Example> createFirstExample()
    {
        final List<Example> answer = new ArrayList<Example>();

        answer.add(new Example(new double[] { 1.0, 0.0 }, new double[] { 1.0 }));

        return answer;
    }

    /**
     * @return a new neural network.
     */
    private NeuralNetwork createNeuralNetwork()
    {
        final Layer layer0 = new DefaultLayer("input", 2, new PassThroughFunction(), true);

        final Layer layer1 = new DefaultLayer("hidden", 1, new SigmoidFunction(), true);

        final Layer layer2 = new DefaultLayer("output", 1, new SigmoidFunction(), false);

        final Connector connector01 = new DefaultConnector(layer0, layer1);

        connector01.setWeight(0, 0, 7.1); // n1 to n3
        connector01.setWeight(1, 0, 7.1); // n2 to n3
        connector01.setWeight(2, 0, -2.76); // b3 (bias unit) to n3

        final Connector connector02 = new DefaultConnector(layer0, layer2);

        connector02.setWeight(0, 0, -4.95); // n1 to n4
        connector02.setWeight(1, 0, -4.95); // n2 to n4

        final Connector connector12 = new DefaultConnector(layer1, layer2);

        connector12.setWeight(0, 0, 10.9); // n3 to n4
        connector12.setWeight(1, 0, -3.29); // b4 (bias unit) to n4

        final NeuralNetwork answer = new DefaultNeuralNetwork();

        answer.addLayer(layer0);
        answer.addLayer(layer1);
        answer.addLayer(layer2);

        answer.addConnector(connector01);
        answer.addConnector(connector02);
        answer.addConnector(connector12);

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
     * @param deltas Training deltas.
     * @param deltaWeights Training delta weights.
     * @param neuralNetwork Neural network.
     * @param inputs Inputs.
     */
    private void verifyPassOne(final double[][] deltas, final double[][][] deltaWeights,
            final NeuralNetwork neuralNetwork, final double[] inputs)
    {
        // Output layer.
        assertThat(deltas[2][0], is(0.125)); // n4

        assertThat(deltaWeights[2][1][0], is(0.0125)); // b4 to n4
        assertThat(deltaWeights[2][0][0], is(0.00625)); // n3 to n4
        assertThat(deltaWeights[1][0][0], is(0.0125)); // n1 to n4
        assertThat(deltaWeights[1][1][0], is(0.0)); // n2 to n4

        // Hidden layer.
        verifyZeros(deltas[1]);// n3 and b4

        assertThat(deltaWeights[0][0][0], is(0.0)); // n1 to n3
        assertThat(deltaWeights[0][1][0], is(0.0)); // n2 to n3
        assertThat(deltaWeights[0][2][0], is(0.0)); // b3 to n3

        // Input layer.
        verifyZeros(deltas[0]); // n1, n2, and b3

        // Verify all other delta weights are zero.
        verifyZeros(deltaWeights, createExceptionsPassOne());

        // Test the altered neural network.
        neuralNetwork.evaluate(inputs);

        assertEquals(0.507, neuralNetwork.getLayer(2).getOutput(0), 0.01);

        assertThat(neuralNetwork.getLayer(1).getOutput(0), is(0.5));
        assertThat(neuralNetwork.getLayer(1).getOutput(1), is(1.0));

        assertThat(neuralNetwork.getLayer(0).getOutput(0), is(1.0));
        assertThat(neuralNetwork.getLayer(0).getOutput(1), is(0.0));
        assertThat(neuralNetwork.getLayer(0).getOutput(2), is(1.0));
    }

    /**
     * @param deltas Training deltas.
     * @param deltaWeights Training delta weights.
     * @param neuralNetwork Neural network.
     * @param inputs Inputs.
     */
    private void verifyPassTwo(final double[][] deltas, final double[][][] deltaWeights,
            final NeuralNetwork neuralNetwork, final double[] inputs)
    {
        // Output layer.
        assertEquals(0.1224, deltas[2][0], 0.0001); // n4

        assertEquals(0.01224, deltaWeights[1][0][0], 0.0001); // n1 to n4
        assertEquals(0.01224, deltaWeights[2][1][0], 0.0001); // b4 to n4
        assertEquals(0.006120, deltaWeights[2][0][0], 0.0001); // n3 to n4
        assertThat(deltaWeights[1][1][0], is(0.0)); // n2 to n4

        // Hidden layer.
        assertEquals(0.0001913, deltas[1][0], 0.0001); // n3
        assertEquals(0.0003008, deltas[1][1], 0.0001); // b4

        assertEquals(0.00001913, deltaWeights[0][0][0], 0.0001); // n1 to n3
        assertEquals(0.00001913, deltaWeights[0][2][0], 0.0001); // b3 to n3
        assertThat(deltaWeights[0][1][0], is(0.0)); // n2 to n3

        // Input layer.
        verifyZeros(deltas[0]);

        // Verify all other delta weights are zero.
        verifyZeros(deltaWeights, createExceptionsPassTwo());

        // Test the altered neural network.
        neuralNetwork.evaluate(inputs);

        assertEquals(0.5201, neuralNetwork.getLayer(2).getOutput(0), 0.0001);

        assertEquals(0.5000, neuralNetwork.getLayer(1).getOutput(0), 0.0001);
        assertThat(neuralNetwork.getLayer(1).getOutput(1), is(1.0));

        assertThat(neuralNetwork.getLayer(0).getOutput(0), is(1.0));
        assertThat(neuralNetwork.getLayer(0).getOutput(1), is(0.0));
        assertThat(neuralNetwork.getLayer(0).getOutput(2), is(1.0));
    }

    /**
     * @param neuralNetwork Neural network.
     * @param inputs Inputs.
     */
    private void verifyPassZero(final NeuralNetwork neuralNetwork, final double[] inputs)
    {
        neuralNetwork.evaluate(inputs);

        assertThat(neuralNetwork.getLayer(2).getOutput(0), is(0.5));

        assertThat(neuralNetwork.getLayer(1).getOutput(0), is(0.5));
        assertThat(neuralNetwork.getLayer(1).getOutput(1), is(1.0));

        assertThat(neuralNetwork.getLayer(0).getOutput(0), is(1.0));
        assertThat(neuralNetwork.getLayer(0).getOutput(1), is(0.0));
        assertThat(neuralNetwork.getLayer(0).getOutput(2), is(1.0));
    }

    /**
     * Verify the given parameter contains only zeros.
     * 
     * @param deltas Deltas.
     */
    private void verifyZeros(final double[] deltas)
    {
        assertThat(getArrayUtils().asList(deltas), everyItem(is(0.0)));
    }

    /**
     * Verify the given parameter contains only zeros.
     * 
     * @param deltaWeights Delta weights.
     * @param exceptions (fromIndex, toIndex) pairs to exclude.
     */
    private void verifyZeros(final double[][][] deltaWeights, final List<Integer> exceptions)
    {
        for (int i = 0; i < deltaWeights.length; i++)
        {
            if (!exceptions.contains(i))
            {
                for (int k = 0; k < deltaWeights[i].length; k++)
                {
                    assertThat("deltaWeights[" + i + "][" + k + "]", getArrayUtils().asList(deltaWeights[i][k]),
                            everyItem(is(0.0)));
                }
            }
        }
    }
}
