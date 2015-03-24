package org.vizzini.ai.neuralnetwork;

import java.util.List;

/**
 * Provides a neural network trainer. This trainer applies network weight changes after each of the examples has been
 * processed.
 */
public final class NeuralNetworkContinuousTrainer implements NeuralNetworkTrainer
{
    /** Delta values used during weight adjustment. Indices are example, layer, output. */
    private double[][][] deltas;

    /** Delta weights. Indices are example, connector, from layer output, to layer input. */
    private double[][][][] deltaWeights;

    /** Previous delta weights. */
    private double[][][][] previousDeltaWeights;

    /** Delegate. */
    private final DefaultNeuralNetworkTrainer delegate;

    /**
     * Construct this object.
     * 
     * @param neuralNetwork Neural network.
     * @param examples Examples.
     */
    public NeuralNetworkContinuousTrainer(final NeuralNetwork neuralNetwork, final List<Example> examples)
    {
        this(neuralNetwork, examples, false);
    }

    /**
     * Construct this object.
     * 
     * @param neuralNetwork Neural network.
     * @param examples Examples.
     * @param isVerbose Flag indicating whether test output is verbose.
     */
    public NeuralNetworkContinuousTrainer(final NeuralNetwork neuralNetwork, final List<Example> examples,
            final boolean isVerbose)
    {
        this(neuralNetwork, examples, isVerbose, 0.9, 0.5);
    }

    /**
     * Construct this object.
     * 
     * @param neuralNetwork Neural network.
     * @param examples Examples.
     * @param isVerbose Flag indicating whether training output is verbose.
     * @param alpha Momentum constant.
     * @param beta Learning constant.
     */
    public NeuralNetworkContinuousTrainer(final NeuralNetwork neuralNetwork, final List<Example> examples,
            final boolean isVerbose, final double alpha, final double beta)
    {
        final TrainingCalculator trainingCalculator = new DefaultTrainingCalculator(neuralNetwork, alpha, beta);
        delegate = new DefaultNeuralNetworkTrainer(trainingCalculator, examples, isVerbose);

        init();
    }

    @Override
    public NeuralNetworkTrainer adjustWeights(final double[][][] ignored)
    {
        for (int exampleIndex = 0; exampleIndex < getExamples().size(); exampleIndex++)
        {
            delegate.adjustWeights(deltaWeights[exampleIndex]);
        }

        return this;
    }

    @Override
    public NeuralNetworkTrainer clearDeltas(final double[][] ignored)
    {
        for (int exampleIndex = 0; exampleIndex < getExamples().size(); exampleIndex++)
        {
            delegate.clearDeltas(deltas[exampleIndex]);
        }

        return this;
    }

    @Override
    public NeuralNetworkTrainer clearDeltaWeights(final double[][][] ignored)
    {
        for (int exampleIndex = 0; exampleIndex < getExamples().size(); exampleIndex++)
        {
            delegate.clearDeltaWeights(deltaWeights[exampleIndex]);
        }

        return this;
    }

    /**
     * @param exampleIndex Example index.
     * 
     * @return the deltas
     */
    public double[][] getDeltas(final int exampleIndex)
    {
        return deltas[exampleIndex];
    }

    /**
     * @param exampleIndex Example index.
     * 
     * @return the deltaWeights
     */
    public double[][][] getDeltaWeights(final int exampleIndex)
    {
        return deltaWeights[exampleIndex];
    }

    @Override
    public List<Example> getExamples()
    {
        return delegate.getExamples();
    }

    @Override
    public TrainingCalculator getTrainingCalculator()
    {
        return delegate.getTrainingCalculator();
    }

    @Override
    public boolean isVerbose()
    {
        return delegate.isVerbose();
    }

    @Override
    public double runTrainingLoop(final double maxError, final int maxCount, final int printFrequency)
    {
        double sumSquaredError = Double.MAX_VALUE;
        Double lastError = sumSquaredError;
        int count = 0;

        while ((sumSquaredError > maxError) && (count < maxCount))
        {
            lastError = sumSquaredError;
            sumSquaredError = train();

            if (isVerbose())
            {
                if ((count % printFrequency) == 0)
                {
                    System.out.println(String.format("%5d sumSquaredError = %9.4f", count, sumSquaredError));
                }
            }

            count++;
        }

        if (isVerbose())
        {
            System.out.println();
            System.out.println(count + " sumSquaredError = " + sumSquaredError + " (lastError = " + lastError + ")");
        }

        return sumSquaredError;
    }

    @Override
    public double train()
    {
        double sumSquaredError = 0.0;

        swapAndClearWeights();

        // Train.
        final int exampleCount = getExamples().size();

        for (int exampleIndex = 0; exampleIndex < exampleCount; exampleIndex++)
        {
            clearDeltas(null);

            sumSquaredError += trainExample(exampleIndex);

            // Adjust weights.
            adjustWeights(null);
        }

        return sumSquaredError;
    }

    /**
     * @return a new array.
     */
    private double[][][] createDeltas()
    {
        final int exampleCount = getExamples().size();
        final NeuralNetwork neuralNetwork = getNeuralNetwork();
        final int layerCount = neuralNetwork.getLayerCount();

        final double[][][] answer = new double[exampleCount][][];

        for (int exampleIndex = 0; exampleIndex < exampleCount; exampleIndex++)
        {
            answer[exampleIndex] = new double[layerCount][];

            for (int i = 0; i < layerCount; i++)
            {
                final Layer layer = neuralNetwork.getLayer(i);
                final int nodeCount = layer.getNodeCount();
                answer[exampleIndex][i] = new double[nodeCount];
            }
        }

        return answer;
    }

    /**
     * @return a new array.
     */
    private double[][][][] createDeltaWeights()
    {
        final int exampleCount = getExamples().size();
        final NeuralNetwork neuralNetwork = getNeuralNetwork();
        final int connectorCount = neuralNetwork.getConnectorCount();

        final double[][][][] answer = new double[exampleCount][][][];

        for (int exampleIndex = 0; exampleIndex < exampleCount; exampleIndex++)
        {
            answer[exampleIndex] = new double[connectorCount][][];

            for (int connectorIndex = 0; connectorIndex < connectorCount; connectorIndex++)
            {
                final Connector connector = neuralNetwork.getConnector(connectorIndex);
                final Layer fromLayer = connector.getFromLayer();
                final int fromCount = fromLayer.getNodeCount();

                answer[exampleIndex][connectorIndex] = new double[fromCount][];

                final Layer toLayer = connector.getToLayer();
                final int toCount = toLayer.getNodeCount();

                for (int i = 0; i < fromCount; i++)
                {
                    answer[exampleIndex][connectorIndex][i] = new double[toCount];
                }
            }
        }

        return answer;
    }

    /**
     * @return neuralNetwork.
     */
    private NeuralNetwork getNeuralNetwork()
    {
        return delegate.getTrainingCalculator().getNeuralNetwork();
    }

    /**
     * Initialize.
     */
    private void init()
    {
        // Create the deltas array.
        deltas = createDeltas();

        // Create the weights arrays.
        deltaWeights = createDeltaWeights();
        previousDeltaWeights = createDeltaWeights();
    }

    /**
     * Swap and clear the delta weights.
     */
    private void swapAndClearWeights()
    {
        // Save the weight changes from last time.
        final double[][][][] temp = previousDeltaWeights;
        previousDeltaWeights = deltaWeights;
        deltaWeights = temp;

        // Clear the delta weights.
        clearDeltas(null);
        clearDeltaWeights(null);
    }

    /**
     * Train the neural network with the given training set.
     * 
     * @param exampleIndex Example index.
     * 
     * @return the sum squared error.
     */
    private double trainExample(final int exampleIndex)
    {
        // Perform a forward pass through the network.
        final Example example = getExamples().get(exampleIndex);
        getNeuralNetwork().evaluate(example.getInputs());

        // Calculate the output deltas, and backpropagate deltas to other layers.
        final TrainingCalculator trainingCalculator = delegate.getTrainingCalculator();
        final double sumSquaredError = trainingCalculator.calculateDeltas(deltas[exampleIndex], example);

        // Calculate the delta weights.
        trainingCalculator.calculateDeltaWeights(deltaWeights[exampleIndex], deltas[exampleIndex],
                previousDeltaWeights[exampleIndex]);

        return sumSquaredError;
    }
}
