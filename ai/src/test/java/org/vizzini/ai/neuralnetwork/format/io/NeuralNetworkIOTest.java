package org.vizzini.ai.neuralnetwork.format.io;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;
import java.io.Writer;

import org.apache.commons.io.IOUtils;
import org.junit.Test;
import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.DefaultConnector;
import org.vizzini.ai.neuralnetwork.DefaultLayer;
import org.vizzini.ai.neuralnetwork.DefaultNeuralNetwork;
import org.vizzini.ai.neuralnetwork.Layer;
import org.vizzini.ai.neuralnetwork.NeuralNetwork;
import org.vizzini.ai.neuralnetwork.SigmoidFunction;
import org.vizzini.ai.neuralnetwork.format.CSVNeuralNetworkFormat;
import org.vizzini.ai.neuralnetwork.format.NeuralNetworkFormat;

/**
 * Provides tests for the <code>NeuralNetworkIO</code> class.
 */
public final class NeuralNetworkIOTest
{
    /** Layer. */
    private static final Layer LAYER0 = new DefaultLayer("input", 3, new SigmoidFunction(), false);

    /** Layer. */
    private static final Layer LAYER1 = new DefaultLayer("output", 4, new SigmoidFunction(), false);

    /** Connector. */
    private static final Connector CONNECTOR = new DefaultConnector(LAYER0, LAYER1);

    static
    {
        final int fromCount = LAYER0.getNodeCount();
        final int toCount = LAYER1.getNodeCount();

        for (int i = 0; i < fromCount; i++)
        {
            for (int j = 0; j < toCount; j++)
            {
                final double weight = j + (i * toCount);
                CONNECTOR.setWeight(i, j, weight);
            }
        }
    }

    /** Neural network IO. */
    private final NeuralNetworkIO nnio;

    /** Formatter. */
    private final NeuralNetworkFormat formatter = new CSVNeuralNetworkFormat();

    /** Neural network as a string. */
    private static final String NETWORK_STRING = "org.vizzini.ai.neuralnetwork.DefaultNeuralNetwork\nlayerCount, 2\norg.vizzini.ai.neuralnetwork.DefaultLayer, input, 3, SigmoidFunction, false\norg.vizzini.ai.neuralnetwork.DefaultLayer, output, 4, SigmoidFunction, false\nconnectorCount, 1\norg.vizzini.ai.neuralnetwork.DefaultConnector, input, output, [0.0, 1.0, 2.0, 3.0], [4.0, 5.0, 6.0, 7.0], [8.0, 9.0, 10.0, 11.0], \n";

    /**
     * Construct this object.
     */
    public NeuralNetworkIOTest()
    {
        nnio = new NeuralNetworkIO(formatter);
    }

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readInputStream()
    {
        final InputStream inputStream = getClass().getResourceAsStream("/neuralNetwork.txt");
        assertNotNull(inputStream);

        final NeuralNetwork result = nnio.read(inputStream);

        assertNotNull(result);
        assertThat(result.getLayerCount(), is(2));
        assertThat(result.getConnectorCount(), is(1));
        final Connector connector01 = result.getConnector(0);
        assertNotNull(connector01);
        assertEquals(0.0, connector01.getWeight(0, 0), 0.0001);
    }

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readInputStreamNull()
    {
        try
        {
            nnio.read((InputStream)null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("inputStream is null"));
        }
    }

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readReader()
    {
        final Reader reader = createReader(NETWORK_STRING);
        final NeuralNetwork result = nnio.read(reader);

        assertNotNull(result);
        assertThat(result, is(createNeuralNetwork()));
    }

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readReaderNull()
    {
        try
        {
            nnio.read((Reader)null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("reader is null"));
        }
    }

    /**
     * Test the <code>read()</code> and <code>write</code> methods.
     */
    @Test
    public void roundTripInputStream()
    {
        final NeuralNetwork neuralNetwork = createNeuralNetwork();
        final Writer writer = createWriter();
        nnio.write(neuralNetwork, writer);

        final InputStream inputStream = createInputStream(writer.toString());
        final NeuralNetwork result = nnio.read(inputStream);

        assertNotNull(result);
        assertThat(result, is(neuralNetwork));
    }

    /**
     * Test the <code>read()</code> and <code>write</code> methods.
     */
    @Test
    public void roundTripReader()
    {
        final NeuralNetwork neuralNetwork = createNeuralNetwork();
        final Writer writer = createWriter();
        nnio.write(neuralNetwork, writer);

        final Reader reader = createReader(writer.toString());
        final NeuralNetwork result = nnio.read(reader);

        assertNotNull(result);
        assertThat(result, is(neuralNetwork));
    }

    /**
     * Test the <code>NeuralNetworkIO()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new NeuralNetworkIO(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("formatter is null"));
        }
    }

    /**
     * Test the <code>write()</code> method.
     */
    @Test
    public void write()
    {
        final NeuralNetwork neuralNetwork = createNeuralNetwork();
        final Writer writer = createWriter();

        nnio.write(neuralNetwork, writer);

        final String result = writer.toString();
        assertThat(result, is(NETWORK_STRING));
    }

    /**
     * Test the <code>write()</code> method.
     */
    @Test
    public void writeNull()
    {
        try
        {
            nnio.write(null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("neuralNetwork is null"));
        }

        try
        {
            final NeuralNetwork neuralNetwork = createNeuralNetwork();
            nnio.write(neuralNetwork, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("writer is null"));
        }

        try
        {
            final Writer writer = createWriter();
            nnio.write(null, writer);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("neuralNetwork is null"));
        }
    }

    /**
     * @param content Content.
     * 
     * @return a new input stream.
     */
    private InputStream createInputStream(final String content)
    {
        InputStream answer;

        try
        {
            answer = IOUtils.toInputStream(content, "UTF-8");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }

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

    /**
     * @param content Content.
     * 
     * @return a new reader.
     */
    private Reader createReader(final String content)
    {
        return new StringReader(content);
    }

    /**
     * @return a new writer.
     */
    private Writer createWriter()
    {
        return new StringWriter();
    }
}
