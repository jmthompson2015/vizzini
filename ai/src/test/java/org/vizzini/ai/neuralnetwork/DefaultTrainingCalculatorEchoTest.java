package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;
import static org.junit.matchers.JUnitMatchers.everyItem;

import java.util.Arrays;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.vizzini.ai.neuralnetwork.ArrayUtilities;
import org.vizzini.ai.neuralnetwork.BipolarSigmoidFunction;
import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.DefaultTrainingCalculator;
import org.vizzini.ai.neuralnetwork.Example;
import org.vizzini.ai.neuralnetwork.FeedForwardNetwork;
import org.vizzini.ai.neuralnetwork.Layer;
import org.vizzini.ai.neuralnetwork.NeuralNetwork;
import org.vizzini.ai.neuralnetwork.TrainingCalculator;

/**
 * Provides unit tests for the <code>DefaultTrainingCalculator</code> class.
 */
public final class DefaultTrainingCalculatorEchoTest
{
    /** Flag indicating whether training output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Test data. */
    private final TestData testData = new TestData();

    /** Array utilities. */
    private ArrayUtilities arrayUtils;

    /** Training calculator. */
    private TrainingCalculator calculator;

    /**
     * Test the <code>calculateDeltas()</code> method.
     */
    @Test
    public void calculateDeltas()
    {
        final NeuralNetwork neuralNetwork = calculator.getNeuralNetwork();
        final double[][] deltas = createDeltas(neuralNetwork);

        final List<Example> examples = testData.createExamplesEcho();
        final double delta = 0.0001;

        for (int i = 0; i < examples.size(); i++)
        {
            final Example example = examples.get(i);
            neuralNetwork.evaluate(example.getInputs());

            // Test.
            calculator.calculateDeltas(deltas, example);

            if (IS_VERBOSE)
            {
                printDeltas(deltas);
            }

            verifyDeltas2(i, deltas[2], delta);
            verifyDeltas1(i, deltas[1], delta);
            verifyDeltas0(i, deltas[0], delta);
        }
    }

    /**
     * Test the <code>calculateDeltaWeights()</code> method.
     */
    @Test
    public void calculateDeltaWeights()
    {
        final NeuralNetwork neuralNetwork = calculator.getNeuralNetwork();
        final double[][] deltas = createDeltas(neuralNetwork);

        final double[][][] deltaWeights = createDeltaWeights(neuralNetwork);
        final double[][][] previousDeltaWeights = createDeltaWeights(neuralNetwork);

        final List<Example> examples = testData.createExamplesEcho();
        final double delta = 0.0001;

        for (int i = 0; i < examples.size(); i++)
        {
            final Example example = examples.get(i);
            neuralNetwork.evaluate(example.getInputs());
            calculator.calculateDeltas(deltas, example);

            // Test.
            calculator.calculateDeltaWeights(deltaWeights, deltas, previousDeltaWeights);

            if (IS_VERBOSE)
            {
                printDeltaWeights(deltaWeights);
            }

            verifyDeltaWeights1(i, deltaWeights[1], delta);
            verifyDeltaWeights0(i, deltaWeights[0], delta);
        }
    }

    /**
     * Set up the test.
     */
    @Before
    public void setUp()
    {
        final NeuralNetwork neuralNetwork = testData.createNeuralNetworkEcho();
        neuralNetwork.fillWeights(0.1);

        final double alpha = 0.0;
        final double beta = 1.0;

        calculator = new DefaultTrainingCalculator(neuralNetwork, alpha, beta);
    }

    /**
     * Tear down the test.
     */
    @After
    public void tearDown()
    {
        calculator = null;
    }

    /**
     * Test the <code>DefaultTrainingCalculator()</code> method.
     */
    @Test
    public void testConstructor()
    {
        final NeuralNetwork neuralNetwork = testData.createNeuralNetworkEcho();
        neuralNetwork.fillWeights(0.1);

        // Train
        final double alpha = 0.1;
        final double beta = 0.9;

        final TrainingCalculator result = new DefaultTrainingCalculator(neuralNetwork, alpha, beta);

        assertNotNull(result);
        assertThat(result.getNeuralNetwork(), is(neuralNetwork));
        assertThat(result.getAlpha(), is(alpha));
        assertThat(result.getBeta(), is(beta));
    }

    /**
     * Test the <code>NeuralNetworkBatchTrainer()</code> method.
     */
    @Test
    public void testConstructorAlphaOutOfRange()
    {
        final NeuralNetwork neuralNetwork = new FeedForwardNetwork(3, 3, 3, new BipolarSigmoidFunction(), false);
        neuralNetwork.fillWeights(0.1);
        final double beta = 0.9;

        {
            final double alpha = -0.1;

            try
            {
                new DefaultTrainingCalculator(neuralNetwork, alpha, beta);
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
                new DefaultTrainingCalculator(neuralNetwork, alpha, beta);
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
        final NeuralNetwork neuralNetwork = new FeedForwardNetwork(3, 3, 3, new BipolarSigmoidFunction(), false);
        neuralNetwork.fillWeights(0.1);
        final double alpha = 0.1;

        {
            final double beta = -0.1;

            try
            {
                new DefaultTrainingCalculator(neuralNetwork, alpha, beta);
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
                new DefaultTrainingCalculator(neuralNetwork, alpha, beta);
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

        try
        {
            new DefaultTrainingCalculator(null, alpha, beta);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("neuralNetwork is null"));
        }
    }

    /**
     * @param neuralNetwork Neural network.
     * 
     * @return a new array.
     */
    private double[][] createDeltas(final NeuralNetwork neuralNetwork)
    {
        final int layerCount = neuralNetwork.getLayerCount();

        final double[][] answer = new double[layerCount][];

        for (int i = 0; i < layerCount; i++)
        {
            final int nodeCount = neuralNetwork.getLayer(i).getNodeCount();
            answer[i] = new double[nodeCount];
        }

        return answer;
    }

    /**
     * @param neuralNetwork Neural network.
     * 
     * @return a new array.
     */
    private double[][][] createDeltaWeights(final NeuralNetwork neuralNetwork)
    {
        final int connectorCount = neuralNetwork.getConnectorCount();

        final double[][][] answer = new double[connectorCount][][];

        for (int connectorIndex = 0; connectorIndex < connectorCount; connectorIndex++)
        {
            final Connector connector = neuralNetwork.getConnector(connectorIndex);
            final Layer fromLayer = connector.getFromLayer();
            final int fromCount = fromLayer.getNodeCount();

            answer[connectorIndex] = new double[fromCount][];

            final Layer toLayer = connector.getToLayer();
            final int toCount = toLayer.getNodeCount();

            for (int i = 0; i < fromCount; i++)
            {
                answer[connectorIndex][i] = new double[toCount];
            }
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
     * @param deltas Deltas.
     */
    private void printDeltas(final double[][] deltas)
    {
        System.out.println();

        for (int j = deltas.length - 1; j >= 0; j--)
        {
            System.out.println("deltas[" + j + "] = " + Arrays.toString(deltas[j]));
        }
    }

    /**
     * @param deltaWeights Delta weights.
     */
    private void printDeltaWeights(final double[][][] deltaWeights)
    {
        System.out.println();

        for (int j = deltaWeights.length - 1; j >= 0; j--)
        {
            for (int k = 0; k < deltaWeights[j].length; k++)
            {
                System.out.println("deltaWeights[" + j + "][" + k + "] = " + Arrays.toString(deltaWeights[j][k]));
            }
        }
    }

    /**
     * @param i Example index.
     * @param deltas Deltas.
     * @param delta Equals accuracy.
     */
    private void verifyDeltas0(final int i, final double[] deltas, final double delta)
    {
        verifyZeros(deltas);
    }

    /**
     * @param i Example index.
     * @param deltas Deltas.
     * @param delta Equals accuracy.
     */
    private void verifyDeltas1(final int i, final double[] deltas, final double delta)
    {
        switch (i)
        {
        case 0:
            assertEquals(i + " deltas[1][0]", -0.0165, deltas[0], delta);
            assertEquals(i + " deltas[1][1]", -0.0165, deltas[1], delta);
            assertEquals(i + " deltas[1][2]", -0.0165, deltas[2], delta);
            assertEquals(i + " deltas[1][3]", -0.0130, deltas[3], delta);
            break;
        case 1:
            assertEquals(i + " deltas[1][0]", -0.0329, deltas[0], delta);
            assertEquals(i + " deltas[1][1]", -0.0329, deltas[1], delta);
            assertEquals(i + " deltas[1][2]", -0.0329, deltas[2], delta);
            assertEquals(i + " deltas[1][3]", -0.0259, deltas[3], delta);
            break;
        case 2:
            assertEquals(i + " deltas[1][0]", -0.0494, deltas[0], delta);
            assertEquals(i + " deltas[1][1]", -0.0494, deltas[1], delta);
            assertEquals(i + " deltas[1][2]", -0.0494, deltas[2], delta);
            assertEquals(i + " deltas[1][3]", -0.0389, deltas[3], delta);
            break;
        default:
            throw new RuntimeException("Untested example: " + i);
        }
    }

    /**
     * @param i Example index.
     * @param deltas Deltas.
     * @param delta Equals accuracy.
     */
    private void verifyDeltas2(final int i, final double[] deltas, final double delta)
    {
        switch (i)
        {
        case 0:
            assertEquals(i + " deltas[1][0]", -0.2760, deltas[0], delta);
            assertEquals(i + " deltas[1][1]", -0.2760, deltas[1], delta);
            assertEquals(i + " deltas[1][2]", 0.2225, deltas[2], delta);
            break;
        case 1:
            assertEquals(i + " deltas[1][0]", -0.2760, deltas[0], delta);
            assertEquals(i + " deltas[1][1]", 0.2225, deltas[1], delta);
            assertEquals(i + " deltas[1][2]", -0.2760, deltas[2], delta);
            break;
        case 2:
            assertEquals(i + " deltas[1][0]", 0.2225, deltas[0], delta);
            assertEquals(i + " deltas[1][1]", -0.2760, deltas[1], delta);
            assertEquals(i + " deltas[1][2]", -0.2760, deltas[2], delta);
            break;
        default:
            throw new RuntimeException("Untested example: " + i);
        }
    }

    /**
     * @param i Example index.
     * @param deltaWeights Delta weights.
     * @param delta Equals accuracy.
     */
    private void verifyDeltaWeights0(final int i, final double[][] deltaWeights, final double delta)
    {
        switch (i)
        {
        case 0:
            assertEquals(i + " deltaWeights[0][0][0]", 0.0082, deltaWeights[0][0], delta);
            assertEquals(i + " deltaWeights[0][0][1]", 0.0082, deltaWeights[0][1], delta);
            assertEquals(i + " deltaWeights[0][0][2]", 0.0082, deltaWeights[0][2], delta);

            assertEquals(i + " deltaWeights[0][1][0]", 0.0082, deltaWeights[1][0], delta);
            assertEquals(i + " deltaWeights[0][1][1]", 0.0082, deltaWeights[1][1], delta);
            assertEquals(i + " deltaWeights[0][1][2]", 0.0082, deltaWeights[1][2], delta);

            assertEquals(i + " deltaWeights[0][2][0]", -0.0082, deltaWeights[2][0], delta);
            assertEquals(i + " deltaWeights[0][2][1]", -0.0082, deltaWeights[2][1], delta);
            assertEquals(i + " deltaWeights[0][2][2]", -0.0082, deltaWeights[2][2], delta);

            assertEquals(i + " deltaWeights[0][3][0]", -0.0165, deltaWeights[3][0], delta);
            assertEquals(i + " deltaWeights[0][3][1]", -0.0165, deltaWeights[3][1], delta);
            assertEquals(i + " deltaWeights[0][3][2]", -0.0165, deltaWeights[3][2], delta);
            break;
        case 1:
            assertEquals(i + " deltaWeights[0][0][0]", 0.0247, deltaWeights[0][0], delta);
            assertEquals(i + " deltaWeights[0][0][1]", 0.0247, deltaWeights[0][1], delta);
            assertEquals(i + " deltaWeights[0][0][2]", 0.0247, deltaWeights[0][2], delta);

            assertEquals(i + " deltaWeights[0][1][0]", -0.0082, deltaWeights[1][0], delta);
            assertEquals(i + " deltaWeights[0][1][1]", -0.0082, deltaWeights[1][1], delta);
            assertEquals(i + " deltaWeights[0][1][2]", -0.0082, deltaWeights[1][2], delta);

            assertEquals(i + " deltaWeights[0][2][0]", 0.0082, deltaWeights[2][0], delta);
            assertEquals(i + " deltaWeights[0][2][1]", 0.0082, deltaWeights[2][1], delta);
            assertEquals(i + " deltaWeights[0][2][2]", 0.0082, deltaWeights[2][2], delta);

            assertEquals(i + " deltaWeights[0][3][0]", -0.0494, deltaWeights[3][0], delta);
            assertEquals(i + " deltaWeights[0][3][1]", -0.0494, deltaWeights[3][1], delta);
            assertEquals(i + " deltaWeights[0][3][2]", -0.0494, deltaWeights[3][2], delta);
            break;
        case 2:
            assertThat(i + " deltaWeights[0][0][0]", deltaWeights[0][0], is(0.0));
            assertThat(i + " deltaWeights[0][0][1]", deltaWeights[0][1], is(0.0));
            assertThat(i + " deltaWeights[0][0][2]", deltaWeights[0][2], is(0.0));

            assertEquals(i + " deltaWeights[0][1][0]", 0.0165, deltaWeights[1][0], delta);
            assertEquals(i + " deltaWeights[0][1][1]", 0.0165, deltaWeights[1][1], delta);
            assertEquals(i + " deltaWeights[0][1][2]", 0.0165, deltaWeights[1][2], delta);

            assertEquals(i + " deltaWeights[0][2][0]", 0.0330, deltaWeights[2][0], delta);
            assertEquals(i + " deltaWeights[0][2][1]", 0.0330, deltaWeights[2][1], delta);
            assertEquals(i + " deltaWeights[0][2][2]", 0.0330, deltaWeights[2][2], delta);

            assertEquals(i + " deltaWeights[0][3][0]", -0.0988, deltaWeights[3][0], delta);
            assertEquals(i + " deltaWeights[0][3][1]", -0.0988, deltaWeights[3][1], delta);
            assertEquals(i + " deltaWeights[0][3][2]", -0.0988, deltaWeights[3][2], delta);
            break;
        default:
            throw new RuntimeException("Untested example: " + i);
        }
    }

    /**
     * @param i Example index.
     * @param deltaWeights Delta weights.
     * @param delta Equals accuracy.
     */
    private void verifyDeltaWeights1(final int i, final double[][] deltaWeights, final double delta)
    {
        switch (i)
        {
        case 0:
            assertEquals(i + " deltaWeights[1][0][0]", -0.0069, deltaWeights[0][0], delta);
            assertEquals(i + " deltaWeights[1][0][1]", -0.0069, deltaWeights[0][1], delta);
            assertEquals(i + " deltaWeights[1][0][2]", 0.0056, deltaWeights[0][2], delta);

            assertEquals(i + " deltaWeights[1][1][0]", -0.0069, deltaWeights[1][0], delta);
            assertEquals(i + " deltaWeights[1][1][1]", -0.0069, deltaWeights[1][1], delta);
            assertEquals(i + " deltaWeights[1][1][2]", 0.0056, deltaWeights[1][2], delta);

            assertEquals(i + " deltaWeights[1][2][0]", -0.0069, deltaWeights[2][0], delta);
            assertEquals(i + " deltaWeights[1][2][1]", -0.0069, deltaWeights[2][1], delta);
            assertEquals(i + " deltaWeights[1][2][2]", 0.0056, deltaWeights[2][2], delta);

            assertEquals(i + " deltaWeights[1][3][0]", -0.2760, deltaWeights[3][0], delta);
            assertEquals(i + " deltaWeights[1][3][1]", -0.2760, deltaWeights[3][1], delta);
            assertEquals(i + " deltaWeights[1][3][2]", 0.2225, deltaWeights[3][2], delta);
            break;
        case 1:
            assertEquals(i + " deltaWeights[1][0][0]", -0.0138, deltaWeights[0][0], delta);
            assertEquals(i + " deltaWeights[1][0][1]", -0.0013, deltaWeights[0][1], delta);
            assertEquals(i + " deltaWeights[1][0][2]", -0.0013, deltaWeights[0][2], delta);

            assertEquals(i + " deltaWeights[1][1][0]", -0.0138, deltaWeights[1][0], delta);
            assertEquals(i + " deltaWeights[1][1][1]", -0.0013, deltaWeights[1][1], delta);
            assertEquals(i + " deltaWeights[1][1][2]", -0.0013, deltaWeights[1][2], delta);

            assertEquals(i + " deltaWeights[1][2][0]", -0.0138, deltaWeights[2][0], delta);
            assertEquals(i + " deltaWeights[1][2][1]", -0.0013, deltaWeights[2][1], delta);
            assertEquals(i + " deltaWeights[1][2][2]", -0.0013, deltaWeights[2][2], delta);

            assertEquals(i + " deltaWeights[1][3][0]", -0.5521, deltaWeights[3][0], delta);
            assertEquals(i + " deltaWeights[1][3][1]", -0.0535, deltaWeights[3][1], delta);
            assertEquals(i + " deltaWeights[1][3][2]", -0.0535, deltaWeights[3][2], delta);
            break;
        case 2:
            assertEquals(i + " deltaWeights[1][0][0]", -0.0082, deltaWeights[0][0], delta);
            assertEquals(i + " deltaWeights[1][0][1]", -0.0082, deltaWeights[0][1], delta);
            assertEquals(i + " deltaWeights[1][0][2]", -0.0082, deltaWeights[0][2], delta);

            assertEquals(i + " deltaWeights[1][1][0]", -0.0082, deltaWeights[1][0], delta);
            assertEquals(i + " deltaWeights[1][1][1]", -0.0082, deltaWeights[1][1], delta);
            assertEquals(i + " deltaWeights[1][1][2]", -0.0082, deltaWeights[1][2], delta);

            assertEquals(i + " deltaWeights[1][2][0]", -0.0082, deltaWeights[2][0], delta);
            assertEquals(i + " deltaWeights[1][2][1]", -0.0082, deltaWeights[2][1], delta);
            assertEquals(i + " deltaWeights[1][2][2]", -0.0082, deltaWeights[2][2], delta);

            assertEquals(i + " deltaWeights[1][3][0]", -0.3296, deltaWeights[3][0], delta);
            assertEquals(i + " deltaWeights[1][3][1]", -0.3296, deltaWeights[3][1], delta);
            assertEquals(i + " deltaWeights[1][3][2]", -0.3296, deltaWeights[3][2], delta);
            break;
        default:
            throw new RuntimeException("Untested example: " + i);
        }
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
}
