package org.vizzini.ai.neuralnetwork;

import java.util.Arrays;
import java.util.List;

/**
 * Provides a default implementation of a neural network trainer.
 */
public final class DefaultNeuralNetworkTrainer implements NeuralNetworkTrainer
{
    /** Examples. */
    private final List<Example> examples;

    /** Flag indicating whether training output is verbose. */
    private final boolean isVerbose;

    /** Training calculator. */
    private final TrainingCalculator trainingCalculator;

    /**
     * Construct this object.
     * 
     * @param trainingCalculator Training calculator.
     * @param examples Examples.
     * @param isVerbose Flag indicating whether training output is verbose.
     */
    @SuppressWarnings("hiding")
    public DefaultNeuralNetworkTrainer(final TrainingCalculator trainingCalculator, final List<Example> examples,
            final boolean isVerbose)
    {
        if (trainingCalculator == null)
        {
            throw new IllegalArgumentException("trainingCalculator is null");
        }

        if (examples == null)
        {
            throw new IllegalArgumentException("examples is null");
        }

        this.trainingCalculator = trainingCalculator;
        this.examples = examples;
        this.isVerbose = isVerbose;
    }

    @Override
    public NeuralNetworkTrainer adjustWeights(final double[][][] deltaWeights)
    {
        final NeuralNetwork neuralNetwork = getNeuralNetwork();
        final int connectorCount = neuralNetwork.getConnectorCount();

        for (int connectorIndex = 0; connectorIndex < connectorCount; connectorIndex++)
        {
            final Connector connector = neuralNetwork.getConnector(connectorIndex);

            connector.adjustWeights(deltaWeights[connectorIndex]);
        }

        return this;
    }

    @Override
    public NeuralNetworkTrainer clearDeltas(final double[][] deltas)
    {
        for (int layerIndex = 0; layerIndex < deltas.length; layerIndex++)
        {
            Arrays.fill(deltas[layerIndex], 0.0);
        }

        return this;
    }

    @Override
    public NeuralNetworkTrainer clearDeltaWeights(final double[][][] deltaWeights)
    {
        final NeuralNetwork neuralNetwork = getNeuralNetwork();
        final int connectorCount = neuralNetwork.getConnectorCount();

        for (int connectorIndex = 0; connectorIndex < connectorCount; connectorIndex++)
        {
            for (int i = 0; i < deltaWeights[connectorIndex].length; i++)
            {
                Arrays.fill(deltaWeights[connectorIndex][i], 0.0);
            }
        }

        return this;
    }

    @Override
    public List<Example> getExamples()
    {
        return examples;
    }

    @Override
    public TrainingCalculator getTrainingCalculator()
    {
        return trainingCalculator;
    }

    @Override
    public boolean isVerbose()
    {
        return isVerbose;
    }

    @Override
    public double runTrainingLoop(final double maxError, final int maxCount, final int printFrequency)
    {
        throw new RuntimeException("Method not implemented");
    }

    @Override
    public double train()
    {
        throw new RuntimeException("Method not implemented");
    }

    /**
     * @return neuralNetwork.
     */
    private NeuralNetwork getNeuralNetwork()
    {
        return trainingCalculator.getNeuralNetwork();
    }
}
