package org.vizzini.ai.neuralnetwork.format.io;

import static org.hamcrest.CoreMatchers.is;
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
import org.vizzini.ai.neuralnetwork.BooleanInputFilter;
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
import org.vizzini.ai.neuralnetwork.format.CSVBooleanInputFilterFormat;
import org.vizzini.ai.neuralnetwork.format.CSVLinearScalerOutputFilterFormat;
import org.vizzini.ai.neuralnetwork.format.CSVNeuralNetworkApplianceFormat;
import org.vizzini.ai.neuralnetwork.format.CSVNeuralNetworkFormat;
import org.vizzini.ai.neuralnetwork.format.InputFilterFormat;
import org.vizzini.ai.neuralnetwork.format.NeuralNetworkApplianceFormat;
import org.vizzini.ai.neuralnetwork.format.NeuralNetworkFormat;
import org.vizzini.ai.neuralnetwork.format.OutputFilterFormat;

/**
 * Provides tests for the <code>NeuralNetworkIO</code> class.
 */
public final class NeuralNetworkApplianceIOTest
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

    /** Input filter formatter. */
    private final InputFilterFormat<boolean[]> inputFilterFormatter = new CSVBooleanInputFilterFormat();

    /** Neural network formatter. */
    private final NeuralNetworkFormat neuralNetworkFormatter = new CSVNeuralNetworkFormat();

    /** Output filter formatter. */
    private final OutputFilterFormat<double[]> outputFilterFormatter = new CSVLinearScalerOutputFilterFormat();

    /** Formatter. */
    private final NeuralNetworkApplianceFormat<boolean[], double[]> formatter;

    /** Neural network appliance IO. */
    private final NeuralNetworkApplianceIO<boolean[], double[]> nnio;

    /** Neural network appliance as a string. */
    private static final String APPLIANCE_STRING = "org.vizzini.ai.neuralnetwork.DefaultNeuralNetworkAppliance\norg.vizzini.ai.neuralnetwork.BooleanInputFilter\norg.vizzini.ai.neuralnetwork.DefaultNeuralNetwork\nlayerCount, 2\norg.vizzini.ai.neuralnetwork.DefaultLayer, input, 3, SigmoidFunction, false\norg.vizzini.ai.neuralnetwork.DefaultLayer, output, 4, SigmoidFunction, false\nconnectorCount, 1\norg.vizzini.ai.neuralnetwork.DefaultConnector, input, output, [0.0, 1.0, 2.0, 3.0], [4.0, 5.0, 6.0, 7.0], [8.0, 9.0, 10.0, 11.0], \norg.vizzini.ai.neuralnetwork.LinearScalerFilter, -10.0, 10.0, -1.0, 1.0";

    /**
     * Construct this object.
     */
    public NeuralNetworkApplianceIOTest()
    {
        this.formatter = new CSVNeuralNetworkApplianceFormat<boolean[], double[]>(inputFilterFormatter,
                neuralNetworkFormatter, outputFilterFormatter);
        this.nnio = new NeuralNetworkApplianceIO<boolean[], double[]>(formatter);
    }

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readInputStream()
    {
        final InputStream inputStream = getClass().getResourceAsStream("/neuralNetworkAppliance.txt");
        assertNotNull(inputStream);

        final NeuralNetworkAppliance<boolean[], double[]> result = nnio.read(inputStream);

        assertNotNull(result);
        assertThat(result.getInputFilter(), is(BooleanInputFilter.class));
        assertNotNull(result.getNeuralNetwork());
        assertThat(result.getOutputFilter(), is(LinearScalerFilter.class));
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
        final Reader reader = createReader(APPLIANCE_STRING);
        final NeuralNetworkAppliance<boolean[], double[]> result = nnio.read(reader);

        assertNotNull(result);
        assertThat(result, is(createNeuralNetworkAppliance()));
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
        final NeuralNetworkAppliance<boolean[], double[]> appliance = createNeuralNetworkAppliance();
        final Writer writer = createWriter();
        nnio.write(appliance, writer);

        final InputStream inputStream = createInputStream(writer.toString());
        final NeuralNetworkAppliance<boolean[], double[]> result = nnio.read(inputStream);

        assertNotNull(result);
        assertThat(result, is(appliance));
    }

    /**
     * Test the <code>read()</code> and <code>write</code> methods.
     */
    @Test
    public void roundTripReader()
    {
        final NeuralNetworkAppliance<boolean[], double[]> appliance = createNeuralNetworkAppliance();
        final Writer writer = createWriter();
        nnio.write(appliance, writer);

        final Reader reader = createReader(writer.toString());
        final NeuralNetworkAppliance<boolean[], double[]> result = nnio.read(reader);

        assertNotNull(result);
        assertThat(result, is(appliance));
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
        final NeuralNetworkAppliance<boolean[], double[]> appliance = createNeuralNetworkAppliance();
        final Writer writer = createWriter();

        nnio.write(appliance, writer);

        final String result = writer.toString();
        assertThat(result, is(APPLIANCE_STRING));
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
            final NeuralNetworkAppliance<boolean[], double[]> appliance = createNeuralNetworkAppliance();
            nnio.write(appliance, null);
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
     * @return a new neural network.
     */
    private NeuralNetworkAppliance<boolean[], double[]> createNeuralNetworkAppliance()
    {
        final InputFilter<boolean[]> inputFilter = new BooleanInputFilter();
        final NeuralNetwork neuralNetwork = createNeuralNetwork();
        final OutputFilter<double[]> outputFilter = new LinearScalerFilter(-10.0, 10.0, -1.0, 1.0);

        final NeuralNetworkAppliance<boolean[], double[]> answer = new DefaultNeuralNetworkAppliance<boolean[], double[]>(
                inputFilter, neuralNetwork, outputFilter);

        // answer.addLayer(LAYER0);
        // answer.addLayer(LAYER1);
        //
        // answer.addConnector(CONNECTOR);

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
