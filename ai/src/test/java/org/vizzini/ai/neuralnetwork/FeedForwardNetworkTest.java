package org.vizzini.ai.neuralnetwork;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import java.text.DecimalFormat;
import java.text.NumberFormat;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * Provides unit tests for the <code>FeedForwardNetwork</code> class.
 */
public final class FeedForwardNetworkTest
{
    /** Flag indicating whether test output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** First counts. */
    private static final int[] COUNTS0 = { 3, 2, 1 };

    /** First neural network. */
    private NeuralNetwork neuralNetwork0;

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate3()
    {
        final NeuralNetwork network0 = new FeedForwardNetwork(4, 2, 1);
        final Connector connector01 = network0.getConnector(0, 1);
        connector01.setWeight(0, 0, 0.0);
        connector01.setWeight(0, 1, 0.0);
        connector01.setWeight(1, 0, -0.3);
        connector01.setWeight(1, 1, 0.1);
        connector01.setWeight(2, 0, -0.2);
        connector01.setWeight(2, 1, 0.2);
        connector01.setWeight(3, 0, -0.1);
        connector01.setWeight(3, 1, 0.3);
        connector01.setWeight(4, 0, 0.0);
        connector01.setWeight(4, 1, 0.0);

        final Connector connector12 = network0.getConnector(1, 2);
        connector12.setWeight(0, 0, -0.1);
        connector12.setWeight(1, 0, 0.1);
        connector12.setWeight(2, 0, 0.0);

        final double[] inputs = new double[4];
        inputs[0] = -0.1;
        inputs[1] = 0.1;
        inputs[2] = 0.2;
        inputs[3] = 0.1;
        final double[] outputs = network0.evaluate(inputs);
        assertEquals(0.5010, outputs[0], 0.0001);
    }

    /**
     * Test the <code>fillWeights()</code> method.
     */
    @Test
    public void fillWeights()
    {
        final double value = 0.123;
        neuralNetwork0.fillWeights(value);

        final int layerCount = COUNTS0.length;

        for (int fromLayer = 0; fromLayer < (layerCount - 1); fromLayer++)
        {
            final int nodeCount0 = COUNTS0[fromLayer] + 1;

            for (int i = 0; i < nodeCount0; i++)
            {
                for (int toLayer = 0; toLayer < layerCount; toLayer++)
                {
                    if (neuralNetwork0.getConnector(fromLayer, toLayer) != null)
                    {
                        final int nodeCount1 = COUNTS0[toLayer];

                        for (int j = 0; j < nodeCount1; j++)
                        {
                            assertEquals(value, neuralNetwork0.getWeight(fromLayer, i, toLayer, j), 0.0);
                        }
                    }
                }
            }
        }
    }

    /**
     * Test the <code>getLayerCount()</code> method.
     */
    @Test
    public void getLayerCount()
    {
        assertEquals(COUNTS0.length, neuralNetwork0.getLayerCount());
    }

    /**
     * Test the <code>randomizeWeights()</code> method.
     */
    @Test
    public void randomizeWeights()
    {
        neuralNetwork0.fillWeights(10.0);

        neuralNetwork0.randomizeWeights();

        final int layerCount = COUNTS0.length;

        for (int fromLayer = 0; fromLayer < (layerCount - 1); fromLayer++)
        {
            final int nodeCount0 = COUNTS0[fromLayer] + 1;

            for (int i = 0; i < nodeCount0; i++)
            {
                for (int toLayer = 0; toLayer < layerCount; toLayer++)
                {
                    if (neuralNetwork0.getConnector(fromLayer, toLayer) != null)
                    {
                        final int nodeCount1 = COUNTS0[toLayer];

                        for (int j = 0; j < nodeCount1; j++)
                        {
                            final double weight = neuralNetwork0.getWeight(fromLayer, i, toLayer, j);

                            assertTrue((-0.1 <= weight) && (weight <= 0.1));
                        }
                    }
                }
            }
        }
    }

    /**
     * Set up the test.
     */
    @Before
    public void setUp()
    {
        neuralNetwork0 = new FeedForwardNetwork(3, 2, 1, new SigmoidFunction(), false);
    }

    /**
     * Tear down the test.
     */
    @After
    public void tearDown()
    {
        neuralNetwork0 = null;
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void testConstructor()
    {
        assertEquals(3, neuralNetwork0.getLayerCount());
        assertEquals(2, neuralNetwork0.getConnectorCount());
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        assertTrue(neuralNetwork0.equals(neuralNetwork0));

        final NeuralNetwork network1 = createNeuralNetwork(3, 2, 1);
        network1.getConnector(0).setWeight(0, 0, 100.0);
        assertFalse(neuralNetwork0.equals(network1));

        final NeuralNetwork network2 = new FeedForwardNetwork(3, 2, 1, new SigmoidFunction(), false);
        assertTrue(neuralNetwork0.equals(network2));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        assertTrue(neuralNetwork0.hashCode() == neuralNetwork0.hashCode());

        final NeuralNetwork network1 = createNeuralNetwork(3, 2, 1);
        network1.getConnector(0).setWeight(0, 0, 100.0);
        assertFalse(neuralNetwork0.hashCode() == network1.hashCode());

        final NeuralNetwork network2 = new FeedForwardNetwork(3, 2, 1, new SigmoidFunction(), false);
        assertTrue(neuralNetwork0.hashCode() == network2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final String expected = "org.vizzini.ai.neuralnetwork.FeedForwardNetwork [\n"
                + "org.vizzini.ai.neuralnetwork.DefaultLayer [activationFunction=org.vizzini.ai.neuralnetwork.PassThroughFunction,biasNodeUsed=true,inputs=[  0.0000,   0.0000,   0.0000,   0.0000],maxValueIndex=0,name=Input,nodeCount=4,outputs=[  0.0000,   0.0000,   0.0000,   0.0000]]\n"
                + "org.vizzini.ai.neuralnetwork.DefaultConnector[fromLayer=org.vizzini.ai.neuralnetwork.DefaultLayer Input,\n"
                + "weights=[[0.0, 0.0, 0.0][0.0, 0.0, 0.0][0.0, 0.0, 0.0][0.0, 0.0, 0.0]],\n"
                + "toLayer=org.vizzini.ai.neuralnetwork.DefaultLayer Hidden]\n"
                + "org.vizzini.ai.neuralnetwork.DefaultLayer [activationFunction=org.vizzini.ai.neuralnetwork.SigmoidFunction,biasNodeUsed=true,inputs=[  0.0000,   0.0000,   0.0000],maxValueIndex=0,name=Hidden,nodeCount=3,outputs=[  0.0000,   0.0000,   0.0000]]\n"
                + "org.vizzini.ai.neuralnetwork.DefaultConnector[fromLayer=org.vizzini.ai.neuralnetwork.DefaultLayer Hidden,\n"
                + "weights=[[0.0][0.0][0.0]],\n"
                + "toLayer=org.vizzini.ai.neuralnetwork.DefaultLayer Output]\n"
                + "org.vizzini.ai.neuralnetwork.DefaultLayer [activationFunction=org.vizzini.ai.neuralnetwork.SigmoidFunction,biasNodeUsed=false,inputs=[  0.0000],maxValueIndex=0,name=Output,nodeCount=1,outputs=[  0.0000]]\n"
                + "]";
        final String result = neuralNetwork0.toString();

        if (IS_VERBOSE)
        {
            System.out.println(expected);
            System.out.println();
            System.out.println(result);
        }

        assertNotNull(result);
        assertEquals(expected, result);
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void testXOR()
    {
        // Network from _The Pattern Recognition Basis of Artificial Intelligence_, Donald R. Tveter.
        final NeuralNetwork network = new FeedForwardNetwork(2, 1, 1);

        // Add a non-standard connector.
        final Connector connector = new DefaultConnector(network.getLayer(0), network.getLayer(2));
        network.addConnector(connector);

        assertEquals(3, network.getLayer(0).getNodeCount()); // includes bias node
        assertEquals(2, network.getLayer(1).getNodeCount()); // includes bias node
        assertEquals(1, network.getLayer(2).getNodeCount());

        // From layer 0 to layer 1.
        final Connector connector01 = network.getConnector(0, 1);
        connector01.setWeight(0, 0, 7.1);
        connector01.setWeight(1, 0, 7.1);
        connector01.setWeight(2, 0, -2.76); // bias node

        // From layer 0 to layer 2.
        final Connector connector02 = network.getConnector(0, 2);
        connector02.setWeight(0, 0, -4.95);
        connector02.setWeight(1, 0, -4.95);

        // From layer 1 to layer 2.
        final Connector connector12 = network.getConnector(1, 2);
        connector12.setWeight(0, 0, 10.9);
        connector12.setWeight(1, 0, -3.29); // bias node

        if (IS_VERBOSE)
        {
            System.out.println("XOR network = " + network);
        }

        final double[][] ins = { { 1.0, 0.0 }, { 0.0, 0.0 }, { 0.0, 1.0 }, { 1.0, 1.0 }, };

        final double[][] outs = { { 1.0 }, { 0.0 }, { 1.0 }, { 0.0 }, };

        if (IS_VERBOSE)
        {
            System.out.println("XOR");

            for (int example = 0; example < ins.length; example++)
            {
                final double[] output = network.evaluate(ins[example]);
                System.out.println(format(output[0]) + " wanted " + outs[example][0]);
            }
        }

        network.evaluate(ins[0]);
        assertEquals(1.0, network.getNodeOutput(0, 0), 0.0);
        assertEquals(0.0, network.getNodeOutput(0, 1), 0.0);
        assertEquals(0.98, network.getNodeOutput(1, 0), 0.01);
        assertEquals(0.91, network.getNodeOutput(2, 0), 0.05);

        for (int example = 0; example < ins.length; example++)
        {
            network.evaluate(ins[example]);

            final double expected = outs[example][0];
            final double result = network.getOutputs()[0];
            assertEquals("" + example, expected, result, 0.10);
        }
    }

    /**
     * Test the <code>zeroWeights()</code> method.
     */
    @Test
    public void zeroWeights()
    {
        neuralNetwork0.zeroWeights();

        final int layerCount = COUNTS0.length;

        for (int fromLayer = 0; fromLayer < (layerCount - 1); fromLayer++)
        {
            final int nodeCount0 = COUNTS0[fromLayer] + 1;

            for (int i = 0; i < nodeCount0; i++)
            {
                for (int toLayer = 0; toLayer < layerCount; toLayer++)
                {
                    final int nodeCount1 = COUNTS0[toLayer];

                    for (int j = 0; j < nodeCount1; j++)
                    {
                        assertEquals(0.0, neuralNetwork0.getWeight(fromLayer, i, toLayer, j), 0.0);
                    }
                }
            }
        }
    }

    /**
     * @param inputCount Input node count.
     * @param hiddenCount Hidden node count.
     * @param outputCount Output node count.
     * 
     * @return a new neural network.
     */
    private NeuralNetwork createNeuralNetwork(final int inputCount, final int hiddenCount, final int outputCount)
    {
        final NeuralNetwork answer = new FeedForwardNetwork(inputCount, hiddenCount, outputCount);

        return answer;
    }

    /**
     * Format the given double value to four decimal places.
     * 
     * @param value Value.
     * 
     * @return the formatted string.
     */
    private String format(final double value)
    {
        final DecimalFormat formatter = (DecimalFormat)NumberFormat.getInstance();
        formatter.applyPattern("0.0000");

        return formatter.format(value);
    }
}
