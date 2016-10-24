package org.vizzini.ai.neuralnetwork;

import java.util.List;

/**
 * Provides a default implementation of a training calculator.
 */
public final class DefaultTrainingCalculator implements TrainingCalculator
{
    /** The momentum constant, alpha, should be in [0.0, 1.0]. */
    private final double alpha;

    /** The learning constant, beta, should be in [0.0, 1.0]. */
    private final double beta;

    /** Neural network to train. */
    private final NeuralNetwork neuralNetwork;

    /**
     * Construct this object.
     * 
     * @param neuralNetwork Neural network. (required)
     * @param alpha Momentum constant. (required to be in [0.0, 1.0])
     * @param beta Learning constant. (required to be in [0.0, 1.0])
     */
    @SuppressWarnings("hiding")
    public DefaultTrainingCalculator(final NeuralNetwork neuralNetwork, final double alpha, final double beta)
    {
        if (neuralNetwork == null)
        {
            throw new IllegalArgumentException("neuralNetwork is null");
        }

        if ((alpha < 0.0) || (1.0 < alpha))
        {
            throw new IllegalArgumentException("alpha is out of range [0.0, 1.0]: " + alpha);
        }

        if ((beta < 0.0) || (1.0 < beta))
        {
            throw new IllegalArgumentException("beta is out of range [0.0, 1.0]: " + beta);
        }

        this.neuralNetwork = neuralNetwork;
        this.alpha = alpha;
        this.beta = beta;
    }

    @Override
    public double calculateDeltas(final double[][] deltas, final Example example)
    {
        double sumSquaredError = 0.0;

        // Calculate the output deltas.
        final int outputLayerIndex = neuralNetwork.getOutputLayerIndex();
        final Layer outputLayer = neuralNetwork.getLayer(outputLayerIndex);
        ActivationFunction function = outputLayer.getActivationFunction();

        for (int i = 0; i < outputLayer.getNodeCount(); i++)
        {
            // Desired output minus actual output.
            final double diff = example.getOutputs()[i] - outputLayer.getOutput(i);
            sumSquaredError += (diff * diff);

            deltas[outputLayerIndex][i] = function.calcDerivative(outputLayer.getInput(i)) * diff;
        }

        // Backpropagate the deltas to the other layers.
        for (int l = outputLayerIndex - 1; l >= 0; l--)
        {
            final Layer layer = neuralNetwork.getLayer(l);
            final List<Connector> connectors = neuralNetwork.connectorsFromLayer(layer);

            for (final Connector connector : connectors)
            {
                function = layer.getActivationFunction();
                final Layer toLayer = connector.getToLayer();
                final int toIndex = neuralNetwork.indexOf(toLayer);

                for (int j = 0; j < layer.getNodeCount(); j++)
                {
                    double sum = 0.0;

                    for (int i = 0; i < toLayer.getNodeCount(); i++)
                    {
                        sum += connector.getWeight(j, i) * deltas[toIndex][i];
                    }

                    deltas[l][j] += function.calcDerivative(layer.getInput(j)) * sum;
                }
            }
        }

        return sumSquaredError;
    }

    @Override
    public TrainingCalculator calculateDeltaWeights(final double[][][] deltaWeights, final double[][] deltas,
            final double[][][] previousDeltaWeights)
    {
        final int connectorCount = neuralNetwork.getConnectorCount();

        for (int connectorIndex = 0; connectorIndex < connectorCount; connectorIndex++)
        {
            final Connector connector = neuralNetwork.getConnector(connectorIndex);
            final Layer fromLayer = connector.getFromLayer();
            final Layer toLayer = connector.getToLayer();
            final int toIndex = neuralNetwork.indexOf(toLayer);

            for (int j = 0; j < fromLayer.getNodeCount(); j++)
            {
                for (int i = 0; i < toLayer.getNodeCount(); i++)
                {
                    // Learning term.
                    deltaWeights[connectorIndex][j][i] += getBeta() * fromLayer.getOutput(j) * deltas[toIndex][i];

                    // Momentum term.
                    deltaWeights[connectorIndex][j][i] += getAlpha() * previousDeltaWeights[connectorIndex][j][i];
                }
            }
        }

        return this;
    }

    @Override
    public double getAlpha()
    {
        return alpha;
    }

    @Override
    public double getBeta()
    {
        return beta;
    }

    @Override
    public NeuralNetwork getNeuralNetwork()
    {
        return neuralNetwork;
    }
}
