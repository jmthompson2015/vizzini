package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * Provides unit tests for the <code>DefaultNeuralNetwork</code> class.
 */
public final class DefaultNeuralNetworkTest
{
    /** Flag indicating whether test output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** First counts. */
    private static final int[] COUNTS0 = { 3, 2, 1 };

    /** First neural network. */
    private NeuralNetwork neuralNetwork0;

    /**
     * Test the <code>connectorsFromLayer()</code> method.
     */
    @Test
    public void connectorsFromLayer0()
    {
        final Layer layer0 = neuralNetwork0.getLayer(0);
        final List<Connector> result = neuralNetwork0.connectorsFromLayer(layer0);
        assertNotNull(result);
        assertThat(result.size(), is(1));
        final Connector connector = result.get(0);
        assertThat(connector.getFromLayer().getName(), is("Input"));
        assertThat(connector.getToLayer().getName(), is("Hidden"));
    }

    /**
     * Test the <code>connectorsFromLayer()</code> method.
     */
    @Test
    public void connectorsFromLayer1()
    {
        final Layer layer1 = neuralNetwork0.getLayer(1);
        final List<Connector> result = neuralNetwork0.connectorsFromLayer(layer1);
        assertNotNull(result);
        assertThat(result.size(), is(1));
        final Connector connector = result.get(0);
        assertThat(connector.getFromLayer().getName(), is("Hidden"));
        assertThat(connector.getToLayer().getName(), is("Output"));
    }

    /**
     * Test the <code>connectorsFromLayer()</code> method.
     */
    @Test
    public void connectorsFromLayer2()
    {
        final Layer layer2 = neuralNetwork0.getLayer(2);
        final List<Connector> result = neuralNetwork0.connectorsFromLayer(layer2);
        assertNotNull(result);
        assertThat(result.size(), is(0));
    }

    /**
     * Test the <code>connectorsToLayer()</code> method.
     */
    @Test
    public void connectorsToLayer0()
    {
        final Layer layer0 = neuralNetwork0.getLayer(0);
        final List<Connector> result = neuralNetwork0.connectorsToLayer(layer0);
        assertNotNull(result);
        assertThat(result.size(), is(0));
    }

    /**
     * Test the <code>connectorsToLayer()</code> method.
     */
    @Test
    public void connectorsToLayer1()
    {
        final Layer layer1 = neuralNetwork0.getLayer(1);
        final List<Connector> result = neuralNetwork0.connectorsToLayer(layer1);
        assertNotNull(result);
        assertThat(result.size(), is(1));
        final Connector connector = result.get(0);
        assertThat(connector.getFromLayer().getName(), is("Input"));
        assertThat(connector.getToLayer().getName(), is("Hidden"));
    }

    /**
     * Test the <code>connectorsToLayer()</code> method.
     */
    @Test
    public void connectorsToLayer2()
    {
        final Layer layer2 = neuralNetwork0.getLayer(2);
        final List<Connector> result = neuralNetwork0.connectorsToLayer(layer2);
        assertNotNull(result);
        assertThat(result.size(), is(1));
        final Connector connector = result.get(0);
        assertThat(connector.getFromLayer().getName(), is("Hidden"));
        assertThat(connector.getToLayer().getName(), is("Output"));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate0()
    {
        double[] inputs = null;
        double[] outputs = null;

        final NeuralNetwork network0 = new DefaultNeuralNetwork();
        final Layer layer0 = new DefaultLayer("Input", 1, new PassThroughFunction(), true);
        network0.addLayer(layer0);

        final Layer layer1 = new DefaultLayer("Output", 1, new SigmoidFunction(), false);
        network0.addLayer(layer1);

        final Connector connector = new DefaultConnector(layer0, layer1);
        network0.addConnector(connector);

        connector.setWeight(0, 0, 0.1);

        inputs = new double[1];
        inputs[0] = 0.2;
        outputs = network0.evaluate(inputs);
        assertEquals(0.5050, outputs[0], 0.0001);
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate1()
    {
        final NeuralNetwork network0 = new DefaultNeuralNetwork();
        final Layer layer0 = new DefaultLayer("Input", 2, new PassThroughFunction(), true);
        network0.addLayer(layer0);
        final Layer layer1 = new DefaultLayer("Output", 1, new SigmoidFunction(), false);
        network0.addLayer(layer1);
        final Connector connector = new DefaultConnector(layer0, layer1);
        network0.addConnector(connector);

        connector.setWeight(0, 0, 0.01);
        connector.setWeight(1, 0, 0.1);

        final double[] inputs = new double[2];
        inputs[0] = 0.2;
        inputs[1] = 0.5;
        final double[] outputs = network0.evaluate(inputs);
        assertEquals(0.5130, outputs[0], 0.0001);
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate2()
    {
        final NeuralNetwork network0 = new DefaultNeuralNetwork();
        final Layer layer0 = new DefaultLayer("Input", 2, new PassThroughFunction(), true);
        network0.addLayer(layer0);
        final Layer layer1 = new DefaultLayer("Output", 1, new SigmoidFunction(), false);
        network0.addLayer(layer1);
        final Connector connector = new DefaultConnector(layer0, layer1);
        network0.addConnector(connector);

        connector.setWeight(0, 0, 0.01);
        connector.setWeight(1, 0, 0.1);

        final double[] inputs = new double[2];
        inputs[0] = 0.2;
        inputs[1] = 0.5;
        final double[] outputs = network0.evaluate(inputs);
        assertEquals(0.5130, outputs[0], 0.0001);
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
                            assertThat(neuralNetwork0.getWeight(fromLayer, i, toLayer, j), is(value));
                        }
                    }
                }
            }
        }
    }

    /**
     * Test the <code>getConnector()</code> method.
     */
    @Test
    public void getConnector0()
    {
        final Connector result = neuralNetwork0.getConnector(0);
        assertNotNull(result);
        assertThat(result.getFromLayer().getName(), is("Input"));
        assertThat(result.getToLayer().getName(), is("Hidden"));
    }

    /**
     * Test the <code>getConnector()</code> method.
     */
    @Test
    public void getConnector1()
    {
        final Connector result = neuralNetwork0.getConnector(1);
        assertNotNull(result);
        assertThat(result.getFromLayer().getName(), is("Hidden"));
        assertThat(result.getToLayer().getName(), is("Output"));
    }

    /**
     * Test the <code>getConnectorCount()</code> method.
     */
    @Test
    public void getConnectorCount()
    {
        assertThat(neuralNetwork0.getConnectorCount(), is(2));
    }

    /**
     * Test the <code>getLayerCount()</code> method.
     */
    @Test
    public void getLayerCount()
    {
        assertThat(neuralNetwork0.getLayerCount(), is(COUNTS0.length));
    }

    /**
     * Test the <code>indexOf()</code> method.
     */
    @Test
    public void indexOfConnector()
    {
        for (int i = 0; i < neuralNetwork0.getConnectorCount(); i++)
        {
            final Connector connector = neuralNetwork0.getConnector(i);
            assertThat(neuralNetwork0.indexOf(connector), is(i));
        }
    }

    /**
     * Test the <code>indexOf()</code> method.
     */
    @Test
    public void indexOfLayer()
    {
        for (int i = 0; i < neuralNetwork0.getLayerCount(); i++)
        {
            final Layer layer = neuralNetwork0.getLayer(i);
            assertThat(neuralNetwork0.indexOf(layer), is(i));
        }
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
        neuralNetwork0 = createNeuralNetwork(3, 2, 1);
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
    public void testAND()
    {
        final NeuralNetwork network = new DefaultNeuralNetwork();
        final Layer layer0 = new DefaultLayer("Input", 2, new PassThroughFunction(), true);
        network.addLayer(layer0);

        final Layer layer1 = new DefaultLayer("Output", 1, new ThresholdFunction(), false);
        network.addLayer(layer1);

        final Connector connector = new DefaultConnector(layer0, layer1);
        network.addConnector(connector);

        assertEquals(3, network.getLayer(0).getNodeCount()); // includes bias node
        assertEquals(1, network.getLayer(1).getNodeCount());

        connector.setWeight(0, 0, 1.0);
        connector.setWeight(1, 0, 1.0);
        connector.setWeight(2, 0, -1.5); // bias node

        final double[][] ins = { { 0.0, 0.0 }, { 0.0, 1.0 }, { 1.0, 0.0 }, { 1.0, 1.0 }, };

        final double[][] outs = { { 0.0 }, { 0.0 }, { 0.0 }, { 1.0 }, };

        if (IS_VERBOSE)
        {
            System.out.println("AND");

            for (int example = 0; example < ins.length; example++)
            {
                final double[] output = network.evaluate(ins[example]);
                System.out.println(format(output[0]) + " wanted " + outs[example][0]);
            }
        }

        assertThat(network.evaluate(ins[0])[0], is(0.0));
        assertThat(network.evaluate(ins[1])[0], is(0.0));
        assertThat(network.evaluate(ins[2])[0], is(0.0));
        assertThat(network.evaluate(ins[3])[0], is(1.0));

        for (int example = 0; example < ins.length; example++)
        {
            network.evaluate(ins[example]);

            final double expected = outs[example][0];
            final double result = network.getOutputs()[0];
            assertThat("" + example, result, is(expected));
        }
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

        final NeuralNetwork network2 = createNeuralNetwork(3, 2, 1);
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

        final NeuralNetwork network2 = createNeuralNetwork(3, 2, 1);
        assertTrue(neuralNetwork0.hashCode() == network2.hashCode());
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void testNOT()
    {
        final NeuralNetwork network = new DefaultNeuralNetwork();
        final Layer layer0 = new DefaultLayer("Input", 1, new PassThroughFunction(), true);
        network.addLayer(layer0);

        final Layer layer1 = new DefaultLayer("Output", 1, new ThresholdFunction(), false);
        network.addLayer(layer1);

        final Connector connector = new DefaultConnector(layer0, layer1);
        network.addConnector(connector);

        assertThat(network.getLayer(0).getNodeCount(), is(2)); // includes bias node
        assertThat(network.getLayer(1).getNodeCount(), is(1));

        connector.setWeight(0, 0, -1.0);
        connector.setWeight(1, 0, 0.5); // bias node

        final double[][] ins = { { 0.0 }, { 1.0 }, };

        final double[][] outs = { { 1.0 }, { 0.0 }, };

        if (IS_VERBOSE)
        {
            System.out.println("NOT");

            for (int example = 0; example < ins.length; example++)
            {
                final double[] output = network.evaluate(ins[example]);
                System.out.println(format(output[0]) + " wanted " + outs[example][0]);
            }
        }

        assertThat(network.evaluate(ins[0])[0], is(1.0));
        assertThat(network.evaluate(ins[1])[0], is(0.0));

        for (int example = 0; example < ins.length; example++)
        {
            network.evaluate(ins[example]);

            final double expected = outs[example][0];
            final double result = network.getOutputs()[0];
            assertThat("" + example, result, is(expected));
        }
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void testOR()
    {
        final NeuralNetwork network = new DefaultNeuralNetwork();
        final Layer layer0 = new DefaultLayer("Input", 2, new PassThroughFunction(), true);
        network.addLayer(layer0);

        final Layer layer1 = new DefaultLayer("Output", 1, new ThresholdFunction(), false);
        network.addLayer(layer1);

        final Connector connector = new DefaultConnector(layer0, layer1);
        network.addConnector(connector);

        assertThat(network.getLayer(0).getNodeCount(), is(3)); // includes bias node
        assertThat(network.getLayer(1).getNodeCount(), is(1));

        connector.setWeight(0, 0, 1.0);
        connector.setWeight(1, 0, 1.0);
        connector.setWeight(2, 0, -0.5); // bias node

        final double[][] ins = { { 0.0, 0.0 }, { 0.0, 1.0 }, { 1.0, 0.0 }, { 1.0, 1.0 }, };

        final double[][] outs = { { 0.0 }, { 1.0 }, { 1.0 }, { 1.0 }, };

        if (IS_VERBOSE)
        {
            System.out.println("OR");

            for (int example = 0; example < ins.length; example++)
            {
                final double[] output = network.evaluate(ins[example]);
                System.out.println(format(output[0]) + " wanted " + outs[example][0]);
            }
        }

        assertThat(network.evaluate(ins[0])[0], is(0.0));
        assertThat(network.evaluate(ins[1])[0], is(1.0));
        assertThat(network.evaluate(ins[2])[0], is(1.0));
        assertThat(network.evaluate(ins[3])[0], is(1.0));

        for (int example = 0; example < ins.length; example++)
        {
            network.evaluate(ins[example]);

            final double expected = outs[example][0];
            final double result = network.getOutputs()[0];
            assertThat("" + example, result, is(expected));
        }
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final String expected = "org.vizzini.ai.neuralnetwork.DefaultNeuralNetwork [\n"
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
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void testXOR()
    {
        // Network from _The Pattern Recognition Basis of Artificial Intelligence_, Donald R. Tveter.
        final Layer layer0 = new DefaultLayer("input", 2, new PassThroughFunction(), true);
        final Layer layer1 = new DefaultLayer("hidden", 1, new SigmoidFunction(), true);
        final Layer layer2 = new DefaultLayer("output", 1, new SigmoidFunction(), false);

        final Connector connector01 = new DefaultConnector(layer0, layer1);
        final Connector connector12 = new DefaultConnector(layer1, layer2);

        final NeuralNetwork network = new DefaultNeuralNetwork();

        network.addLayer(layer0);
        network.addLayer(layer1);
        network.addLayer(layer2);

        network.addConnector(connector01);
        network.addConnector(connector12);

        // Add a non-standard connector.
        final Connector connector02 = new DefaultConnector(network.getLayer(0), network.getLayer(2));
        network.addConnector(connector02);

        assertThat(network.getLayer(0).getNodeCount(), is(3)); // includes bias node
        assertThat(network.getLayer(1).getNodeCount(), is(2)); // includes bias node
        assertThat(network.getLayer(2).getNodeCount(), is(1));

        // From layer 0 to layer 1.
        connector01.setWeight(0, 0, 7.1);
        connector01.setWeight(1, 0, 7.1);
        connector01.setWeight(2, 0, -2.76); // bias node

        // From layer 0 to layer 2.
        connector02.setWeight(0, 0, -4.95);
        connector02.setWeight(1, 0, -4.95);

        // From layer 1 to layer 2.
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
                        assertThat(neuralNetwork0.getWeight(fromLayer, i, toLayer, j), is(0.0));
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

        final Connector connector12 = new DefaultConnector(layer1, layer2);
        answer.addConnector(connector12);

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
