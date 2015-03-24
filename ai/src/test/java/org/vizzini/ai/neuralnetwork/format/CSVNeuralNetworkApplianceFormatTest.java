package org.vizzini.ai.neuralnetwork.format;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.DefaultConnector;
import org.vizzini.ai.neuralnetwork.DefaultLayer;
import org.vizzini.ai.neuralnetwork.DefaultNeuralNetwork;
import org.vizzini.ai.neuralnetwork.DefaultNeuralNetworkAppliance;
import org.vizzini.ai.neuralnetwork.InputFilter;
import org.vizzini.ai.neuralnetwork.Layer;
import org.vizzini.ai.neuralnetwork.LinearScalerFilter;
import org.vizzini.ai.neuralnetwork.NeuralNetwork;
import org.vizzini.ai.neuralnetwork.NeuralNetworkAppliance;
import org.vizzini.ai.neuralnetwork.OutputFilter;
import org.vizzini.ai.neuralnetwork.SigmoidFunction;

/**
 * Provides tests for the <code>CSVNeuralNetworkApplianceFormat</code> class.
 */
public final class CSVNeuralNetworkApplianceFormatTest
{
    /** Flag indicating whether test output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Layer. */
    private static final Layer LAYER0 = new DefaultLayer("input", 3, new SigmoidFunction(), false);

    /** Layer. */
    private static final Layer LAYER1 = new DefaultLayer("output", 4, new SigmoidFunction(), false);

    /** Connector. */
    private static final Connector CONNECTOR = new DefaultConnector(LAYER0, LAYER1);

    /** Input filter formatter. */
    private final InputFilterFormat<double[]> inputFilterFormatter = new CSVLinearScalerInputFilterFormat();

    /** Neural network formatter. */
    private final NeuralNetworkFormat neuralNetworkFormatter = new CSVNeuralNetworkFormat();

    /** Output filter formatter. */
    private final OutputFilterFormat<double[]> outputFilterFormatter = new CSVLinearScalerOutputFilterFormat();

    /** Formatter. */
    private final NeuralNetworkApplianceFormat<double[], double[]> formatter = new CSVNeuralNetworkApplianceFormat<double[], double[]>(
            inputFilterFormatter, neuralNetworkFormatter, outputFilterFormatter);

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void format()
    {
        final NeuralNetworkAppliance<double[], double[]> filter = create();
        final String result = formatter.format(filter);

        assertNotNull(result);
        final String expected = "org.vizzini.ai.neuralnetwork.DefaultNeuralNetworkAppliance\norg.vizzini.ai.neuralnetwork.LinearScalerFilter, -1.0, 1.0, -0.5, 0.5\norg.vizzini.ai.neuralnetwork.DefaultNeuralNetwork\nlayerCount, 2\norg.vizzini.ai.neuralnetwork.DefaultLayer, input, 3, SigmoidFunction, false\norg.vizzini.ai.neuralnetwork.DefaultLayer, output, 4, SigmoidFunction, false\nconnectorCount, 1\norg.vizzini.ai.neuralnetwork.DefaultConnector, input, output, [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], \nnull";

        if (IS_VERBOSE)
        {
            System.out.println("expected =\n" + expected);
            System.out.println("\nresult =\n" + result);
        }

        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatNull()
    {
        final String result = formatter.format(null);
        assertNull(result);
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parse()
    {
        final NeuralNetworkAppliance<double[], double[]> result = formatter
                .parse("org.vizzini.ai.neuralnetwork.DefaultNeuralNetworkAppliance\norg.vizzini.ai.neuralnetwork.LinearScalerFilter, -1.0, 1.0, -0.5, 0.5\norg.vizzini.ai.neuralnetwork.DefaultNeuralNetwork\nlayerCount, 2\norg.vizzini.ai.neuralnetwork.DefaultLayer, input, 3, SigmoidFunction, false\norg.vizzini.ai.neuralnetwork.DefaultLayer, output, 4, SigmoidFunction, false\nconnectorCount, 1\norg.vizzini.ai.neuralnetwork.DefaultConnector, input, output, [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], \nnull");

        assertNotNull(result);
        assertThat(result.getInputFilter(), is(LinearScalerFilter.class));
        assertNull(result.getOutputFilter());
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseNull()
    {
        final NeuralNetworkAppliance<double[], double[]> result0 = formatter.parse(null);
        assertNull(result0);

        final NeuralNetworkAppliance<double[], double[]> result1 = formatter.parse("");
        assertNull(result1);
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void roundTrip()
    {
        final NeuralNetworkAppliance<double[], double[]> filter = create();
        final String result0 = formatter.format(filter);
        final NeuralNetworkAppliance<double[], double[]> result1 = formatter.parse(result0);
        final String result2 = formatter.format(result1);
        assertTrue(result1.equals(filter));
        assertThat(result2, is(result0));
    }

    /**
     * @return a new neural network appliance.
     */
    private NeuralNetworkAppliance<double[], double[]> create()
    {
        final InputFilter<double[]> inputFilter = new LinearScalerFilter(-1.0, 1.0, -0.5, 0.5);
        final NeuralNetwork neuralNetwork = createNeuralNetwork();
        final OutputFilter<double[]> outputFilter = null;

        final NeuralNetworkAppliance<double[], double[]> answer = new DefaultNeuralNetworkAppliance<double[], double[]>(
                inputFilter, neuralNetwork, outputFilter);

        return answer;
    }

    /**
     * @return a new neural network.
     */
    private NeuralNetwork createNeuralNetwork()
    {
        final NeuralNetwork answer = new DefaultNeuralNetwork();

        answer.addLayer(LAYER0);
        answer.addLayer(LAYER1);

        answer.addConnector(CONNECTOR);

        return answer;
    }
}
