package org.vizzini.ai.neuralnetwork;

import java.util.List;

/**
 * Provides a standard feed-forward neural network, consisting of an input layer, a hidden layer, and an output layer.
 * The input layer is connected to the hidden layer, and the hidden layer is connected to the output layer.
 */
public final class FeedForwardNetwork implements NeuralNetwork
{
    /** Delegate. */
    private NeuralNetwork delegate;

    /**
     * Construct this object using the given parameters.
     * 
     * @param inputCount Input node count.
     * @param hiddenCount Hidden node count.
     * @param outputCount Output node count.
     */
    public FeedForwardNetwork(final int inputCount, final int hiddenCount, final int outputCount)
    {
        this(inputCount, hiddenCount, outputCount, new SigmoidFunction(), false);
    }

    /**
     * Construct this object using the given parameters.
     * 
     * @param inputCount Input node count.
     * @param hiddenCount Hidden node count.
     * @param outputCount Output node count.
     * @param function Activation function.
     * @param isBiasNodeUsed Flag indicating if a bias node is used.
     */
    public FeedForwardNetwork(final int inputCount, final int hiddenCount, final int outputCount,
            final ActivationFunction function, final boolean isBiasNodeUsed)
    {
        delegate = new DefaultNeuralNetwork();

        // Create and add layers.
        final Layer layer0 = new DefaultLayer("Input", inputCount, new PassThroughFunction(), true);
        addLayer(layer0);

        final Layer layer1 = new DefaultLayer("Hidden", hiddenCount, function, true);
        addLayer(layer1);

        final Layer layer2 = new DefaultLayer("Output", outputCount, function, isBiasNodeUsed);
        addLayer(layer2);

        // Create and add connectors.
        Connector connector = new DefaultConnector(layer0, layer1);
        addConnector(connector);
        connector = new DefaultConnector(layer1, layer2);
        addConnector(connector);
    }

    @Override
    public NeuralNetwork addConnector(final Connector connector)
    {
        return delegate.addConnector(connector);
    }

    @Override
    public NeuralNetwork addLayer(final Layer layer)
    {
        return delegate.addLayer(layer);
    }

    @Override
    public List<Connector> connectorsFromLayer(final Layer fromLayer)
    {
        return delegate.connectorsFromLayer(fromLayer);
    }

    @Override
    public List<Connector> connectorsToLayer(final Layer toLayer)
    {
        return delegate.connectorsToLayer(toLayer);
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
            answer = true;

            final FeedForwardNetwork another = (FeedForwardNetwork)object;

            answer = delegate.equals(another.delegate);
        }

        return answer;
    }

    @Override
    public double[] evaluate(final double[] inputs)
    {
        return delegate.evaluate(inputs);
    }

    @Override
    public NeuralNetwork fillWeights(final double value)
    {
        return delegate.fillWeights(value);
    }

    @Override
    public Connector getConnector(final int index)
    {
        return delegate.getConnector(index);
    }

    @Override
    public Connector getConnector(final int fromLayerIndex, final int toLayerIndex)
    {
        return delegate.getConnector(fromLayerIndex, toLayerIndex);
    }

    @Override
    public int getConnectorCount()
    {
        return delegate.getConnectorCount();
    }

    @Override
    public Layer getLayer(final int index)
    {
        return delegate.getLayer(index);
    }

    @Override
    public int getLayerCount()
    {
        return delegate.getLayerCount();
    }

    @Override
    public int getMaxOutputValueIndex()
    {
        return delegate.getMaxOutputValueIndex();
    }

    @Override
    public double getNodeInput(final int layer, final int i)
    {
        return delegate.getNodeInput(layer, i);
    }

    @Override
    public double getNodeOutput(final int layer, final int i)
    {
        return delegate.getNodeOutput(layer, i);
    }

    @Override
    public int getOutputLayerIndex()
    {
        return delegate.getOutputLayerIndex();
    }

    @Override
    public double[] getOutputs()
    {
        return delegate.getOutputs();
    }

    @Override
    public double getWeight(final int fromLayer, final int i, final int toLayer, final int j)
    {
        return delegate.getWeight(fromLayer, i, toLayer, j);
    }

    @Override
    public double[] getWeights(final int fromLayer, final int i, final int toLayer)
    {
        return delegate.getWeights(fromLayer, i, toLayer);
    }

    @Override
    public int hashCode()
    {
        return delegate.hashCode();
    }

    @Override
    public int indexOf(final Connector connector)
    {
        return delegate.indexOf(connector);
    }

    @Override
    public int indexOf(final Layer layer)
    {
        return delegate.indexOf(layer);
    }

    @Override
    public NeuralNetwork randomizeWeights()
    {
        return delegate.randomizeWeights();
    }

    @Override
    public NeuralNetwork randomizeWeights(final double range)
    {
        return delegate.randomizeWeights(range);
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
        return delegate.zeroWeights();
    }
}
