package org.vizzini.ai.neuralnetwork.format;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.DefaultNeuralNetwork;
import org.vizzini.ai.neuralnetwork.Layer;
import org.vizzini.ai.neuralnetwork.NeuralNetwork;

/**
 * Provides a neural network formatter.
 */
public final class CSVNeuralNetworkFormat implements NeuralNetworkFormat
{
    /** Layer formatter. */
    private final LayerFormat layerFormatter;

    /** Connector format provider. */
    private final ConnectorFormatProvider provider;

    /**
     * Construct this object.
     */
    public CSVNeuralNetworkFormat()
    {
        this(new CSVLayerFormat(), new CSVConnectorFormatProvider());
    }

    /**
     * Construct this object.
     * 
     * @param layerFormatter Layer formatter. (required)
     * @param provider Connector format provider. (required)
     */
    @SuppressWarnings("hiding")
    public CSVNeuralNetworkFormat(final LayerFormat layerFormatter, final ConnectorFormatProvider provider)
    {
        if (layerFormatter == null)
        {
            throw new IllegalArgumentException("layerFormatter is null");
        }

        if (provider == null)
        {
            throw new IllegalArgumentException("provider is null");
        }

        this.layerFormatter = layerFormatter;
        this.provider = provider;
    }

    @Override
    public String format(final NeuralNetwork neuralNetwork)
    {
        String answer = null;

        if (neuralNetwork != null)
        {
            final int layerCount = neuralNetwork.getLayerCount();
            final int connectorCount = neuralNetwork.getConnectorCount();
            final List<Layer> layers = new ArrayList<Layer>(layerCount);

            for (int i = 0; i < layerCount; i++)
            {
                layers.add(neuralNetwork.getLayer(i));
            }

            final ConnectorFormat connectorFormatter = provider.create(layers);

            final StringBuilder sb = new StringBuilder();

            sb.append(neuralNetwork.getClass().getName()).append("\n");
            sb.append("layerCount, ").append(layerCount).append("\n");

            for (int i = 0; i < layerCount; i++)
            {
                final Layer layer = neuralNetwork.getLayer(i);
                sb.append(layerFormatter.format(layer)).append("\n");
            }

            sb.append("connectorCount, ").append(connectorCount).append("\n");

            for (int i = 0; i < connectorCount; i++)
            {
                final Connector connector = neuralNetwork.getConnector(i);
                sb.append(connectorFormatter.format(connector)).append("\n");
            }

            answer = sb.toString();
        }

        return answer;
    }

    @Override
    public ConnectorFormatProvider getConnectorFormatProvider()
    {
        return provider;
    }

    @Override
    public LayerFormat getLayerFormatter()
    {
        return layerFormatter;
    }

    @Override
    public NeuralNetwork parse(final String source)
    {
        NeuralNetwork answer = null;

        if (StringUtils.isNotEmpty(source))
        {
            final String[] lines = source.split("[\n]");

            answer = new DefaultNeuralNetwork();

            // First line is the layer count.
            final String[] layerCountParts = lines[1].split("[,]");
            final int layerCount = Integer.parseInt(layerCountParts[1].trim());
            final List<Layer> layers = new ArrayList<Layer>(layerCount);

            for (int i = 0; i < layerCount; i++)
            {
                final Layer layer = layerFormatter.parse(lines[2 + i]);
                layers.add(layer);
                answer.addLayer(layer);
            }

            // The last lineCount - layerCount - 1 lines are the connectors.
            final String[] connectorCountParts = lines[2 + layerCount].split("[,]");
            final int connectorCount = Integer.parseInt(connectorCountParts[1].trim());
            final ConnectorFormat connectorFormatter = provider.create(layers);

            for (int i = 0; i < connectorCount; i++)
            {
                final Connector connector = connectorFormatter.parse(lines[3 + layerCount + i]);
                answer.addConnector(connector);
            }
        }

        return answer;
    }
}
