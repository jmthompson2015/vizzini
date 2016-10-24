package org.vizzini.illyriad.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.awt.Dimension;
import java.io.InputStream;

import org.junit.Test;
import org.vizzini.ai.neuralnetwork.DefaultNeuralNetwork;
import org.vizzini.ai.neuralnetwork.NeuralNetwork;
import org.vizzini.ai.neuralnetwork.NeuralNetworkAppliance;
import org.vizzini.ai.neuralnetwork.format.CSVNeuralNetworkApplianceFormat;
import org.vizzini.ai.neuralnetwork.format.CSVNeuralNetworkFormat;
import org.vizzini.ai.neuralnetwork.format.InputFilterFormat;
import org.vizzini.ai.neuralnetwork.format.NeuralNetworkApplianceFormat;
import org.vizzini.ai.neuralnetwork.format.NeuralNetworkFormat;
import org.vizzini.ai.neuralnetwork.format.OutputFilterFormat;
import org.vizzini.ai.robot.RobotImage;

/**
 * Provides tests for the <code>NeuralNetworkApplianceBuilder</code> class.
 */
public final class NeuralNetworkApplianceBuilderTest
{
    /** Builder. */
    private final NeuralNetworkApplianceBuilder builder0 = new NeuralNetworkApplianceBuilder();

    /**
     * Test the <code>buildAlphaNumericOcrNetwork()</code> method.
     */
    @Test
    public void buildAlphaNumericOcrNetwork()
    {
        final Dimension maxDimension = new Dimension(5, 12);

        final NeuralNetworkAppliance<RobotImage, String> result = builder0.buildAlphaNumericOcrNetwork(maxDimension);

        assertNotNull(result);
        assertNotNull(result.getInputFilter());
        assertNotNull(result.getNeuralNetwork());
        assertNotNull(result.getOutputFilter());

        assertThat(result.getInputFilter(), is(RobotImageInputFilter.class));
        assertThat(result.getNeuralNetwork(), is(DefaultNeuralNetwork.class));
        assertThat(result.getOutputFilter(), is(NumericOutputFilter.class));

        final NeuralNetwork neuralNetwork = result.getNeuralNetwork();

        assertThat(neuralNetwork.getLayerCount(), is(3));
        assertThat(neuralNetwork.getConnectorCount(), is(3));
        assertThat(neuralNetwork.getLayer(0).getNodeCount(), is((5 * 12) + 1));
        assertThat(neuralNetwork.getLayer(1).getNodeCount(), is(63));
        assertThat(neuralNetwork.getLayer(2).getNodeCount(), is(64));
    }

    /**
     * Test the <code>buildFromInputStream()</code> method.
     */
    @Test
    public void buildFromInputStream()
    {
        final InputStream inputStream = getClass().getResourceAsStream("/numericNeuralNetworkAppliance.txt");
        assertNotNull(inputStream);
        final NeuralNetworkApplianceFormat<RobotImage, String> formatter = createNeuralNetworkApplianceFormat();

        final NeuralNetworkAppliance<RobotImage, String> result = builder0.buildFromInputStream(inputStream, formatter);

        assertNotNull(result);
        assertNotNull(result.getInputFilter());
        assertNotNull(result.getNeuralNetwork());
        assertNotNull(result.getOutputFilter());

        assertThat(result.getInputFilter(), is(RobotImageInputFilter.class));
        assertThat(result.getNeuralNetwork(), is(DefaultNeuralNetwork.class));
        assertThat(result.getOutputFilter(), is(NumericOutputFilter.class));

        final NeuralNetwork neuralNetwork = result.getNeuralNetwork();

        assertThat(neuralNetwork.getLayerCount(), is(3));
        assertThat(neuralNetwork.getConnectorCount(), is(3));
        assertThat(neuralNetwork.getLayer(0).getNodeCount(), is((5 * 12) + 1));
        assertThat(neuralNetwork.getLayer(1).getNodeCount(), is(61));
        assertThat(neuralNetwork.getLayer(2).getNodeCount(), is(12));
    }

    /**
     * Test the <code>buildNumericOcrNetwork()</code> method.
     */
    @Test
    public void buildNumericOcrNetwork()
    {
        final Dimension maxDimension = new Dimension(5, 12);

        final NeuralNetworkAppliance<RobotImage, String> result = builder0.buildNumericOcrNetwork(maxDimension);

        assertNotNull(result);
        assertNotNull(result.getInputFilter());
        assertNotNull(result.getNeuralNetwork());
        assertNotNull(result.getOutputFilter());

        assertThat(result.getInputFilter(), is(RobotImageInputFilter.class));
        assertThat(result.getNeuralNetwork(), is(DefaultNeuralNetwork.class));
        assertThat(result.getOutputFilter(), is(NumericOutputFilter.class));

        final NeuralNetwork neuralNetwork = result.getNeuralNetwork();

        assertThat(neuralNetwork.getLayerCount(), is(3));
        assertThat(neuralNetwork.getConnectorCount(), is(3));
        assertThat(neuralNetwork.getLayer(0).getNodeCount(), is((5 * 12) + 1));
        assertThat(neuralNetwork.getLayer(1).getNodeCount(), is(61));
        assertThat(neuralNetwork.getLayer(2).getNodeCount(), is(12));
    }

    /**
     * @return a new appliance formatter.
     */
    private NeuralNetworkApplianceFormat<RobotImage, String> createNeuralNetworkApplianceFormat()
    {
        final InputFilterFormat<RobotImage> inputFilterFormatter = new CSVRobotImageInputFilterFormat();
        final NeuralNetworkFormat neuralNetworkFormatter = new CSVNeuralNetworkFormat();
        final OutputFilterFormat<String> outputFilterFormatter = new CSVNumericOutputFilterFormat();

        return new CSVNeuralNetworkApplianceFormat<RobotImage, String>(inputFilterFormatter, neuralNetworkFormatter,
                outputFilterFormatter);
    }
}
