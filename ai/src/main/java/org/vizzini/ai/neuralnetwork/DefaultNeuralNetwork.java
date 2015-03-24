package org.vizzini.ai.neuralnetwork;

import java.util.ArrayList;
import java.util.List;

/**
 * Provides a default neural network. Instances of this class must be configured by adding layers, and connectors
 * between those layers.
 */
public final class DefaultNeuralNetwork implements NeuralNetwork
{
    /** Connectors. */
    private List<Connector> connectors = new ArrayList<Connector>();

    /** Layers. */
    private List<Layer> layers = new ArrayList<Layer>();

    @Override
    public NeuralNetwork addConnector(final Connector connector)
    {
        connectors.add(connector);

        return this;
    }

    @Override
    public NeuralNetwork addLayer(final Layer layer)
    {
        layers.add(layer);

        return this;
    }

    @Override
    public List<Connector> connectorsFromLayer(final Layer fromLayer)
    {
        final List<Connector> list = new ArrayList<Connector>();

        for (int i = 0; i < getLayerCount(); i++)
        {
            final Layer layer = getLayer(i);

            if (layer.equals(fromLayer))
            {
                for (int j = 0; j < getLayerCount(); j++)
                {
                    final Connector connector = getConnector(i, j);

                    if (connector != null)
                    {
                        list.add(connector);
                    }
                }
                break;
            }
        }

        return list;
    }

    @Override
    public List<Connector> connectorsToLayer(final Layer toLayer)
    {
        final List<Connector> list = new ArrayList<Connector>();

        for (int i = 0; i < getLayerCount(); i++)
        {
            final Layer layer = getLayer(i);

            if (layer.equals(toLayer))
            {
                for (int j = 0; j < getLayerCount(); j++)
                {
                    final Connector connector = getConnector(j, i);

                    if (connector != null)
                    {
                        list.add(connector);
                    }
                }
                break;
            }
        }

        return list;
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }
        else
        {
            final DefaultNeuralNetwork another = (DefaultNeuralNetwork)object;

            answer = getLayerCount() == another.getLayerCount();

            if (answer)
            {
                answer = layers.equals(another.layers);
            }

            if (answer)
            {
                answer = getConnectorCount() == another.getConnectorCount();
            }

            if (answer)
            {
                answer = connectors.equals(another.connectors);
            }
        }

        return answer;
    }

    @Override
    public double[] evaluate(final double[] inputs)
    {
        if (layers.isEmpty())
        {
            throw new IllegalStateException("layers not initialized");
        }

        if (connectors.isEmpty())
        {
            throw new IllegalStateException("connectors not initialized");
        }

        if (inputs.length != getLayer(0).getNodeCountWithoutBias())
        {
            throw new IllegalArgumentException("number of inputs doesn't match input layer node count.");
        }

        getLayer(0).evaluate(inputs);

        final int layerCount = getLayerCount();

        for (int toIndex = 1; toIndex < layerCount; toIndex++)
        {
            final Layer toLayer = getLayer(toIndex);
            toLayer.clear();

            final double[] ins = new double[toLayer.getNodeCount()];

            for (int fromIndex = 0; fromIndex < layerCount; fromIndex++)
            {
                final Layer fromLayer = getLayer(fromIndex);
                final Connector connector = getConnector(fromLayer, toLayer);

                if (connector != null)
                {
                    // Calculate the inputs to the to layer.
                    for (int i = 0; i < fromLayer.getNodeCount(); i++)
                    {
                        for (int j = 0; j < toLayer.getNodeCount(); j++)
                        {
                            ins[j] += connector.getWeight(i, j) * fromLayer.getOutput(i);
                        }
                    }
                }
            }

            // Evaluate the to layer.
            toLayer.evaluate(ins);
        }

        final int outputLayerIndex = getOutputLayerIndex();

        return getLayer(outputLayerIndex).getOutputs();
    }

    @Override
    public NeuralNetwork fillWeights(final double value)
    {
        final int connectorCount = getConnectorCount();

        for (int connectorIndex = 0; connectorIndex < connectorCount; connectorIndex++)
        {
            final Connector connector = getConnector(connectorIndex);

            connector.fillWeights(value);
        }

        return this;
    }

    @Override
    public Connector getConnector(final int index)
    {
        return connectors.get(index);
    }

    @Override
    public Connector getConnector(final int fromLayerIndex, final int toLayerIndex)
    {
        final Layer fromLayer = getLayer(fromLayerIndex);
        final Layer toLayer = getLayer(toLayerIndex);

        return getConnector(fromLayer, toLayer);
    }

    @Override
    public int getConnectorCount()
    {
        return connectors.size();
    }

    @Override
    public Layer getLayer(final int index)
    {
        return layers.get(index);
    }

    @Override
    public int getLayerCount()
    {
        return layers.size();
    }

    @Override
    public int getMaxOutputValueIndex()
    {
        final int outputLayerIndex = getOutputLayerIndex();
        final int answer = getLayer(outputLayerIndex).getMaxValueIndex();

        return answer;
    }

    @Override
    public double getNodeInput(final int layerIndex, final int i)
    {
        return getLayer(layerIndex).getInput(i);
    }

    @Override
    public double getNodeOutput(final int layerIndex, final int i)
    {
        return getLayer(layerIndex).getOutput(i);
    }

    @Override
    public int getOutputLayerIndex()
    {
        return getLayerCount() - 1;
    }

    @Override
    public double[] getOutputs()
    {
        return getLayer(getOutputLayerIndex()).getOutputs();
    }

    @Override
    public double getWeight(final int fromLayer, final int i, final int toLayer, final int j)
    {
        final Layer from = getLayer(fromLayer);
        final Layer to = getLayer(toLayer);
        final Connector connector = getConnector(from, to);
        double answer = 0.0;

        if (connector != null)
        {
            answer = connector.getWeight(i, j);
        }

        return answer;
    }

    @Override
    public double[] getWeights(final int fromLayer, final int i, final int toLayer)
    {
        double[] answer = null;
        final Connector connector = getConnector(fromLayer, toLayer);

        if (connector != null)
        {
            answer = connector.getWeights(i);
        }

        return answer;
    }

    @Override
    public int hashCode()
    {
        int answer = getLayerCount();

        final int[] primes = { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, };
        int i = 0;

        for (final Layer layer : getLayers())
        {
            answer += primes[i++] * layer.hashCode();
        }

        answer += primes[i++] * getConnectorCount();

        for (final Connector connector : getConnectors())
        {
            answer += primes[i++] * connector.hashCode();
        }

        return answer;
    }

    @Override
    public int indexOf(final Connector connector)
    {
        int answer = -1;
        final int connectorCount = getConnectorCount();

        for (int i = 0; (answer < 0) && (i < connectorCount); i++)
        {
            if (getConnector(i).equals(connector))
            {
                answer = i;
            }
        }

        return answer;
    }

    @Override
    public int indexOf(final Layer layer)
    {
        int answer = -1;
        final int layerCount = getLayerCount();

        for (int i = 0; (answer < 0) && (i < layerCount); i++)
        {
            if (getLayer(i).equals(layer))
            {
                answer = i;
            }
        }

        return answer;
    }

    @Override
    public NeuralNetwork randomizeWeights()
    {
        final double range = 0.1;
        randomizeWeights(range);

        return this;
    }

    @Override
    public NeuralNetwork randomizeWeights(final double range)
    {
        final int connectorCount = getConnectorCount();

        for (int connectorIndex = 0; connectorIndex < connectorCount; connectorIndex++)
        {
            final Connector connector = getConnector(connectorIndex);

            connector.randomizeWeights(range);
        }

        return this;
    }

    @Override
    public String toString()
    {
        final String lineSeparator = System.getProperty("line.separator");

        final StringBuilder sb = new StringBuilder(getClass().getName());

        sb.append(" [").append(lineSeparator);

        final int layerCount = getLayerCount();

        for (int fromLayer = 0; fromLayer < layerCount; fromLayer++)
        {
            sb.append(getLayer(fromLayer).toDetailString());
            sb.append(lineSeparator);

            for (int toLayer = 0; toLayer < layerCount; toLayer++)
            {
                final Connector connector = getConnector(fromLayer, toLayer);

                if (connector != null)
                {
                    sb.append(connector);
                    sb.append(lineSeparator);
                }
            }
        }

        sb.append("]");

        return sb.toString();
    }

    @Override
    public NeuralNetwork zeroWeights()
    {
        fillWeights(0.0);

        return this;
    }

    /**
     * @param fromLayer From layer.
     * @param toLayer To layer.
     * 
     * @return the connector for the given parameters.
     */
    private Connector getConnector(final Layer fromLayer, final Layer toLayer)
    {
        Connector answer = null;

        for (final Connector connector : connectors)
        {
            if (connector.getFromLayer().equals(fromLayer) && connector.getToLayer().equals(toLayer))
            {
                answer = connector;
                break;
            }
        }

        return answer;
    }

    /**
     * @return connectors.
     */
    private List<Connector> getConnectors()
    {
        return connectors;
    }

    /**
     * @return layers.
     */
    private List<Layer> getLayers()
    {
        return layers;
    }
}
