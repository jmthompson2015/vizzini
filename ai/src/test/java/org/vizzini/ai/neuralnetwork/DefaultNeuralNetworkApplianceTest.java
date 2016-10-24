package org.vizzini.ai.neuralnetwork;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

/**
 * Provides tests for the <code>DefaultNeuralNetwork</code> class.
 */
public final class DefaultNeuralNetworkApplianceTest
{
    /** Flag indicating whether test output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** First minimum input. */
    private static final double MIN_INPUT0 = -1.0;

    /** First maximum input. */
    private static final double MAX_INPUT0 = 1.0;

    /** First minimum output. */
    private static final double MIN_OUTPUT0 = -0.5;

    /** First maximum output. */
    private static final double MAX_OUTPUT0 = 0.5;

    /** Input filter. */
    private static final InputFilter<double[]> INPUT_FILTER = new LinearScalerFilter(MIN_INPUT0, MAX_INPUT0, 0.0, 1.0);

    /** Output filter. */
    private static final OutputFilter<double[]> OUTPUT_FILTER = new LinearScalerFilter(0.0, 1.0, MIN_OUTPUT0,
            MAX_OUTPUT0);

    /** Appliance. */
    private NeuralNetworkAppliance<double[], double[]> appliance0;

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate0()
    {
        final NeuralNetwork network0 = new DefaultNeuralNetwork();
        final Layer layer0 = new DefaultLayer("Input", 1, new PassThroughFunction(), true);
        network0.addLayer(layer0);

        final Layer layer1 = new DefaultLayer("Output", 1, new SigmoidFunction(), false);
        network0.addLayer(layer1);

        final Connector connector = new DefaultConnector(layer0, layer1);
        network0.addConnector(connector);

        connector.setWeight(0, 0, 0.1);

        final NeuralNetworkAppliance<double[], double[]> appliance = new DefaultNeuralNetworkAppliance<double[], double[]>(
                null, network0, null);

        final double[] inputs = new double[1];
        inputs[0] = 0.2;
        final double[] outputs = appliance.evaluate(inputs);
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

        final NeuralNetworkAppliance<double[], double[]> appliance = new DefaultNeuralNetworkAppliance<double[], double[]>(
                null, network0, null);

        final double[] inputs = new double[2];
        inputs[0] = 0.2;
        inputs[1] = 0.5;
        final double[] outputs = appliance.evaluate(inputs);
        assertEquals(0.5130, outputs[0], 0.0001);
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate2()
    {
        final InputFilter<double[]> inputScaler = new LinearScalerFilter(-1.0, 1.0, -0.5, 0.5);
        final NeuralNetwork neuralNetwork = new DefaultNeuralNetwork();
        final Layer layer0 = new DefaultLayer("Input", 2, new PassThroughFunction(), true);
        neuralNetwork.addLayer(layer0);
        final Layer layer1 = new DefaultLayer("Output", 1, new SigmoidFunction(), false);
        neuralNetwork.addLayer(layer1);
        final Connector connector = new DefaultConnector(layer0, layer1);
        neuralNetwork.addConnector(connector);

        connector.setWeight(0, 0, 0.01);
        connector.setWeight(1, 0, 0.1);

        final NeuralNetworkAppliance<double[], double[]> appliance = new DefaultNeuralNetworkAppliance<double[], double[]>(
                inputScaler, neuralNetwork, null);

        final double[] inputs = new double[2];
        inputs[0] = 0.2;
        inputs[1] = 0.5;
        final double[] outputs = appliance.evaluate(inputs);
        assertEquals(0.5065, outputs[0], 0.0001);
    }

    /**
     * Test the <code>getInputFilter()</code> method.
     */
    @Test
    public void getInputFilter()
    {
        assertEquals(INPUT_FILTER, appliance0.getInputFilter());
    }

    /**
     * Test the <code>getOutputFilter()</code> method.
     */
    @Test
    public void getOutputFilter()
    {
        assertEquals(OUTPUT_FILTER, appliance0.getOutputFilter());
    }

    /**
     * Set up the test.
     */
    @Before
    public void setUp()
    {
        appliance0 = createNeuralNetworkAppliance(3, 2, 1, INPUT_FILTER, OUTPUT_FILTER);
    }

    /**
     * Tear down the test.
     */
    @After
    public void tearDown()
    {
        appliance0 = null;
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

        final InputFilter<boolean[]> inputFilter = new BooleanInputFilter();
        final OutputFilter<boolean[]> outputFilter = new BooleanOutputFilter();
        final NeuralNetworkAppliance<boolean[], boolean[]> appliance = new DefaultNeuralNetworkAppliance<boolean[], boolean[]>(
                inputFilter, network, outputFilter);

        final boolean[][] ins = { { false, false }, { false, true }, { true, false }, { true, true }, };
        final boolean[][] outs = { { false }, { false }, { false }, { true }, };

        if (IS_VERBOSE)
        {
            System.out.println("AND");

            for (int example = 0; example < ins.length; example++)
            {
                final boolean[] output = appliance.evaluate(ins[example]);
                System.out.println(String.format("%6b wanted %6b", output[0], outs[example][0]));
            }
        }

        assertFalse(appliance.evaluate(ins[0])[0]);
        assertFalse(appliance.evaluate(ins[1])[0]);
        assertFalse(appliance.evaluate(ins[2])[0]);
        assertTrue(appliance.evaluate(ins[3])[0]);

        for (int example = 0; example < ins.length; example++)
        {
            appliance.evaluate(ins[example]);

            final boolean expected = outs[example][0];
            final boolean result = appliance.getOutput()[0];
            assertThat("" + example, result, is(expected));
        }
    }

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void testConstructor()
    {
        assertThat(appliance0.getInputFilter(), is(INPUT_FILTER));
        // assertThat(appliance0.getNeuralNetwork(),is());
        assertThat(appliance0.getOutputFilter(), is(OUTPUT_FILTER));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        assertTrue(appliance0.equals(appliance0));

        final NeuralNetworkAppliance<double[], double[]> appliance1 = createNeuralNetworkAppliance(3, 2, 1, null, null);
        assertFalse(appliance0.equals(appliance1));

        final NeuralNetworkAppliance<double[], double[]> appliance2 = createNeuralNetworkAppliance(3, 2, 1,
                INPUT_FILTER, OUTPUT_FILTER);
        assertTrue(appliance0.equals(appliance2));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        assertTrue(appliance0.hashCode() == appliance0.hashCode());

        final NeuralNetworkAppliance<double[], double[]> appliance1 = createNeuralNetworkAppliance(3, 2, 1, null, null);
        assertFalse(appliance0.hashCode() == appliance1.hashCode());

        final NeuralNetworkAppliance<double[], double[]> appliance2 = createNeuralNetworkAppliance(3, 2, 1,
                INPUT_FILTER, OUTPUT_FILTER);
        assertTrue(appliance0.hashCode() == appliance2.hashCode());
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

        assertEquals(2, network.getLayer(0).getNodeCount()); // includes bias node
        assertEquals(1, network.getLayer(1).getNodeCount());

        connector.setWeight(0, 0, -1.0);
        connector.setWeight(1, 0, 0.5); // bias node

        final InputFilter<boolean[]> inputFilter = new BooleanInputFilter();
        final OutputFilter<boolean[]> outputFilter = new BooleanOutputFilter();
        final NeuralNetworkAppliance<boolean[], boolean[]> appliance = new DefaultNeuralNetworkAppliance<boolean[], boolean[]>(
                inputFilter, network, outputFilter);

        final boolean[][] ins = { { false }, { true }, };
        final boolean[][] outs = { { true }, { false }, };

        if (IS_VERBOSE)
        {
            System.out.println("NOT");

            for (int example = 0; example < ins.length; example++)
            {
                final boolean[] output = appliance.evaluate(ins[example]);
                System.out.println(String.format("%6b wanted %6b", output[0], outs[example][0]));
            }
        }

        assertThat(appliance.evaluate(ins[0])[0], is(true));
        assertThat(appliance.evaluate(ins[1])[0], is(false));

        for (int example = 0; example < ins.length; example++)
        {
            appliance.evaluate(ins[example]);

            final boolean expected = outs[example][0];
            final boolean result = appliance.getOutput()[0];
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

        assertEquals(3, network.getLayer(0).getNodeCount()); // includes bias node
        assertEquals(1, network.getLayer(1).getNodeCount());

        connector.setWeight(0, 0, 1.0);
        connector.setWeight(1, 0, 1.0);
        connector.setWeight(2, 0, -0.5); // bias node

        final InputFilter<boolean[]> inputFilter = new BooleanInputFilter();
        final OutputFilter<boolean[]> outputFilter = new BooleanOutputFilter();
        final NeuralNetworkAppliance<boolean[], boolean[]> appliance = new DefaultNeuralNetworkAppliance<boolean[], boolean[]>(
                inputFilter, network, outputFilter);

        final boolean[][] ins = { { false, false }, { false, true }, { true, false }, { true, true }, };
        final boolean[][] outs = { { false }, { true }, { true }, { true }, };

        if (IS_VERBOSE)
        {
            System.out.println("OR");

            for (int example = 0; example < ins.length; example++)
            {
                final boolean[] output = appliance.evaluate(ins[example]);
                System.out.println(String.format("%6b wanted %6b", output[0], outs[example][0]));
            }
        }

        assertFalse(appliance.evaluate(ins[0])[0]);
        assertTrue(appliance.evaluate(ins[1])[0]);
        assertTrue(appliance.evaluate(ins[2])[0]);
        assertTrue(appliance.evaluate(ins[3])[0]);

        for (int example = 0; example < ins.length; example++)
        {
            appliance.evaluate(ins[example]);

            final boolean expected = outs[example][0];
            final boolean result = appliance.getOutput()[0];
            assertThat("" + example, result, is(expected));
        }
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final String expected = "org.vizzini.ai.neuralnetwork.DefaultNeuralNetworkAppliance [\n"
                + "inputFilter=org.vizzini.ai.neuralnetwork.LinearScalerFilter [minInput=-1.0, maxInput=1.0, minOutput=0.0, maxOutput=1.0]\n"
                + "neuralNetwork=org.vizzini.ai.neuralnetwork.DefaultNeuralNetwork [\n"
                + "org.vizzini.ai.neuralnetwork.DefaultLayer [activationFunction=org.vizzini.ai.neuralnetwork.PassThroughFunction,biasNodeUsed=true,inputs=[  0.0000,   0.0000,   0.0000,   0.0000],maxValueIndex=0,name=Input,nodeCount=4,outputs=[  0.0000,   0.0000,   0.0000,   0.0000]]\n"
                + "org.vizzini.ai.neuralnetwork.DefaultConnector[fromLayer=org.vizzini.ai.neuralnetwork.DefaultLayer Input,\n"
                + "weights=[[0.0, 0.0, 0.0][0.0, 0.0, 0.0][0.0, 0.0, 0.0][0.0, 0.0, 0.0]],\n"
                + "toLayer=org.vizzini.ai.neuralnetwork.DefaultLayer Hidden]\n"
                + "org.vizzini.ai.neuralnetwork.DefaultLayer [activationFunction=org.vizzini.ai.neuralnetwork.SigmoidFunction,biasNodeUsed=true,inputs=[  0.0000,   0.0000,   0.0000],maxValueIndex=0,name=Hidden,nodeCount=3,outputs=[  0.0000,   0.0000,   0.0000]]\n"
                + "org.vizzini.ai.neuralnetwork.DefaultConnector[fromLayer=org.vizzini.ai.neuralnetwork.DefaultLayer Hidden,\n"
                + "weights=[[0.0][0.0][0.0]],\n"
                + "toLayer=org.vizzini.ai.neuralnetwork.DefaultLayer Output]\n"
                + "org.vizzini.ai.neuralnetwork.DefaultLayer [activationFunction=org.vizzini.ai.neuralnetwork.SigmoidFunction,biasNodeUsed=false,inputs=[  0.0000],maxValueIndex=0,name=Output,nodeCount=1,outputs=[  0.0000]]\n"
                + "]\n"
                + "outputFilter=org.vizzini.ai.neuralnetwork.LinearScalerFilter [minInput=0.0, maxInput=1.0, minOutput=-0.5, maxOutput=0.5]\n"
                + "]";
        final String result = appliance0.toString();

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

        assertEquals(3, network.getLayer(0).getNodeCount()); // includes bias node
        assertEquals(2, network.getLayer(1).getNodeCount()); // includes bias node
        assertEquals(1, network.getLayer(2).getNodeCount());

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

        final InputFilter<boolean[]> inputFilter = new BooleanInputFilter();
        final OutputFilter<boolean[]> outputFilter = new BooleanOutputFilter();
        final NeuralNetworkAppliance<boolean[], boolean[]> appliance = new DefaultNeuralNetworkAppliance<boolean[], boolean[]>(
                inputFilter, network, outputFilter);

        final boolean[][] ins = { { true, false }, { false, false }, { false, true }, { true, true }, };
        final boolean[][] outs = { { true }, { false }, { true }, { false }, };

        if (IS_VERBOSE)
        {
            System.out.println("XOR");

            for (int example = 0; example < ins.length; example++)
            {
                final boolean[] output = appliance.evaluate(ins[example]);
                System.out.println(String.format("%6b wanted %6b", output[0], outs[example][0]));
            }
        }

        appliance.evaluate(ins[0]);
        assertEquals(1.0, network.getNodeOutput(0, 0), 0.0);
        assertEquals(0.0, network.getNodeOutput(0, 1), 0.0);
        assertEquals(0.98, network.getNodeOutput(1, 0), 0.01);
        assertEquals(0.91, network.getNodeOutput(2, 0), 0.05);

        for (int example = 0; example < ins.length; example++)
        {
            appliance.evaluate(ins[example]);

            final boolean expected = outs[example][0];
            final boolean result = appliance.getOutput()[0];
            assertThat("" + example, result, is(expected));
        }
    }

    /**
     * @param inputCount Input node count.
     * @param hiddenCount Hidden node count.
     * @param outputCount Output node count.
     * @param inputFilter Input filter. (optional)
     * @param outputFilter Output filter. (optional)
     * 
     * @return a new neural network.
     */
    private <I, O> NeuralNetworkAppliance<I, O> createNeuralNetworkAppliance(final int inputCount,
            final int hiddenCount, final int outputCount, final InputFilter<I> inputFilter,
            final OutputFilter<O> outputFilter)
    {
        final NeuralNetwork neuralNetwork = new DefaultNeuralNetwork();

        // Create and add layers.
        final Layer layer0 = new DefaultLayer("Input", inputCount, new PassThroughFunction(), true);
        neuralNetwork.addLayer(layer0);

        final Layer layer1 = new DefaultLayer("Hidden", hiddenCount, new SigmoidFunction(), true);
        neuralNetwork.addLayer(layer1);

        final Layer layer2 = new DefaultLayer("Output", outputCount, new SigmoidFunction(), false);
        neuralNetwork.addLayer(layer2);

        // Create and add connectors.
        final Connector connector01 = new DefaultConnector(layer0, layer1);
        neuralNetwork.addConnector(connector01);

        final Connector connector12 = new DefaultConnector(layer1, layer2);
        neuralNetwork.addConnector(connector12);

        final NeuralNetworkAppliance<I, O> answer = new DefaultNeuralNetworkAppliance<I, O>(inputFilter, neuralNetwork,
                outputFilter);

        return answer;
    }
}
