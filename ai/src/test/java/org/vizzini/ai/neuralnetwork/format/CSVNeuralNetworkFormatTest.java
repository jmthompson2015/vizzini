package org.vizzini.ai.neuralnetwork.format;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.DefaultConnector;
import org.vizzini.ai.neuralnetwork.DefaultLayer;
import org.vizzini.ai.neuralnetwork.DefaultNeuralNetwork;
import org.vizzini.ai.neuralnetwork.Layer;
import org.vizzini.ai.neuralnetwork.NeuralNetwork;
import org.vizzini.ai.neuralnetwork.SigmoidFunction;

/**
 * Provides tests for the <code>CSVNeuralNetworkFormat</code> class.
 */
public final class CSVNeuralNetworkFormatTest
{
    /** Flag indicating whether test output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Layer. */
    private static final Layer LAYER0 = new DefaultLayer("input", 3, new SigmoidFunction(), false);

    /** Layer. */
    private static final Layer LAYER1 = new DefaultLayer("output", 4, new SigmoidFunction(), false);

    /** Connector. */
    private static final Connector CONNECTOR = new DefaultConnector(LAYER0, LAYER1);

    /** Neural network formatter. */
    private final NeuralNetworkFormat formatter = new CSVNeuralNetworkFormat();

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void format()
    {
        final NeuralNetwork neuralNetwork = create();
        final String result = formatter.format(neuralNetwork);

        assertNotNull(result);
        final String expected = "org.vizzini.ai.neuralnetwork.DefaultNeuralNetwork\nlayerCount, 2\norg.vizzini.ai.neuralnetwork.DefaultLayer, input, 3, SigmoidFunction, false\norg.vizzini.ai.neuralnetwork.DefaultLayer, output, 4, SigmoidFunction, false\nconnectorCount, 1\norg.vizzini.ai.neuralnetwork.DefaultConnector, input, output, [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], \n";
        if (IS_VERBOSE)
        {
            System.out.println("expected =\n" + expected);
            System.out.println("result   =\n" + result);
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
        final NeuralNetwork result = formatter
                .parse("org.vizzini.ai.neuralnetwork.DefaultNeuralNetwork\nlayerCount, 2\norg.vizzini.ai.neuralnetwork.DefaultLayer, input, 3, SigmoidFunction, false\norg.vizzini.ai.neuralnetwork.DefaultLayer, output, 4, SigmoidFunction, false\nconnectorCount, 1\norg.vizzini.ai.neuralnetwork.DefaultConnector, input, output, [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], [0.0, 0.0, 0.0, 0.0], \n");

        assertNotNull(result);
        assertThat(result.getLayer(0), is(LAYER0));
        assertThat(result.getLayer(1), is(LAYER1));
        assertThat(result.getConnector(0), is(CONNECTOR));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseNull()
    {
        final NeuralNetwork result0 = formatter.parse(null);
        assertNull(result0);

        final NeuralNetwork result1 = formatter.parse("");
        assertNull(result1);
    }

    /**
     * Test the <code>format()</code> and <code>parse()</code> methods.
     */
    @Test
    public void roundTrip()
    {
        final NeuralNetwork neuralNetwork = create();
        final String result0 = formatter.format(neuralNetwork);
        final NeuralNetwork result1 = formatter.parse(result0);
        final String result2 = formatter.format(result1);
        assertTrue(result1.equals(neuralNetwork));
        assertThat(result2, is(result0));
    }

    /**
     * Test the <code>CSVConnectorFormat()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new CSVNeuralNetworkFormat(null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("layerFormatter is null"));
        }

        try
        {
            new CSVNeuralNetworkFormat(formatter.getLayerFormatter(), null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("provider is null"));
        }

        try
        {
            new CSVNeuralNetworkFormat(null, formatter.getConnectorFormatProvider());
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("layerFormatter is null"));
        }
    }

    /**
     * @return a new neural network.
     */
    private NeuralNetwork create()
    {
        final NeuralNetwork answer = new DefaultNeuralNetwork();

        answer.addLayer(LAYER0);
        answer.addLayer(LAYER1);

        answer.addConnector(CONNECTOR);

        return answer;
    }
}
