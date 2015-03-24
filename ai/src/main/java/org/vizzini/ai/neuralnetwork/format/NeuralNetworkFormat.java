package org.vizzini.ai.neuralnetwork.format;

import org.vizzini.ai.neuralnetwork.NeuralNetwork;
import org.vizzini.core.Format;

/**
 * Defines methods required by a neural network formatter.
 */
public interface NeuralNetworkFormat extends Format<NeuralNetwork>
{
    /**
     * @return the connector format provider
     */
    ConnectorFormatProvider getConnectorFormatProvider();

    /**
     * @return the layerFormatter
     */
    LayerFormat getLayerFormatter();
}
