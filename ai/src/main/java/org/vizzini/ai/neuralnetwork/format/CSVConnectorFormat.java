package org.vizzini.ai.neuralnetwork.format;

import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.neuralnetwork.Connector;
import org.vizzini.ai.neuralnetwork.DefaultConnector;
import org.vizzini.ai.neuralnetwork.Layer;

/**
 * Provides a connector formatter.
 */
public final class CSVConnectorFormat implements ConnectorFormat
{
    /** Layers. */
    private final List<Layer> layers;

    /**
     * Construct this object.
     * 
     * @param layers Layers. (required)
     */
    @SuppressWarnings("hiding")
    public CSVConnectorFormat(final List<Layer> layers)
    {
        if (layers == null)
        {
            throw new IllegalArgumentException("layers is null");
        }

        if (layers.isEmpty())
        {
            throw new IllegalArgumentException("layers is empty");
        }

        this.layers = layers;
    }

    @Override
    public String format(final Connector connector)
    {
        String answer = null;

        if (connector != null)
        {
            final Layer fromLayer = connector.getFromLayer();
            final Layer toLayer = connector.getToLayer();
            final int fromNodeCount = fromLayer.getNodeCount();

            final StringBuilder sb = new StringBuilder();

            sb.append(connector.getClass().getName()).append(", ");
            sb.append(fromLayer.getName()).append(", ");
            sb.append(toLayer.getName()).append(", ");

            for (int i = 0; i < fromNodeCount; i++)
            {
                final double[] weights = connector.getWeights(i);
                sb.append(Arrays.toString(weights)).append(", ");
            }

            answer = sb.toString();
        }

        return answer;
    }

    @Override
    public Connector parse(final String source)
    {
        Connector answer = null;

        if (StringUtils.isNotEmpty(source))
        {
            final String[] parts = source.split("[,]");

            int k = 0;

            k++;
            final Layer fromLayer = findLayerByName(parts[k++].trim());
            final Layer toLayer = findLayerByName(parts[k++].trim());

            answer = new DefaultConnector(fromLayer, toLayer);

            final int fromCount = fromLayer.getNodeCount();
            final int toCount = toLayer.getNodeCount();

            for (int i = 0; i < fromCount; i++)
            {
                for (int j = 0; j < toCount; j++)
                {
                    String valueString = parts[k++].trim();

                    if (valueString.startsWith("["))
                    {
                        valueString = valueString.substring(1);
                    }

                    if (valueString.endsWith("]"))
                    {
                        valueString = valueString.substring(0, valueString.length() - 1);
                    }

                    final double weight = Double.parseDouble(valueString);
                    answer.setWeight(i, j, weight);
                }
            }
        }

        return answer;
    }

    /**
     * @param name Layer name.
     * 
     * @return the first layer with the given name.
     */
    private Layer findLayerByName(final String name)
    {
        Layer answer = null;

        for (final Layer layer : layers)
        {
            if (layer.getName().equals(name))
            {
                answer = layer;
                break;
            }
        }

        return answer;
    }
}
