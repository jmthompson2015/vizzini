package org.vizzini.ai.neuralnetwork.format;

import java.util.List;

import org.vizzini.ai.neuralnetwork.Layer;

/**
 * Defines methods required by a connector format provider.
 */
public interface ConnectorFormatProvider
{
    /**
     * @param layers Layers.
     * 
     * @return a new connector format.
     */
    ConnectorFormat create(List<Layer> layers);
}
