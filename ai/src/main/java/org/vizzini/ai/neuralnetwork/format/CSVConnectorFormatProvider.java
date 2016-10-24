package org.vizzini.ai.neuralnetwork.format;

import java.util.List;

import org.vizzini.ai.neuralnetwork.Layer;

/**
 * Provides a comma separated value connector format provider.
 */
public final class CSVConnectorFormatProvider implements ConnectorFormatProvider
{
    @Override
    public ConnectorFormat create(final List<Layer> layers)
    {
        return new CSVConnectorFormat(layers);
    }
}
