package org.vizzini.ai.neuralnetwork;

import java.util.List;

/**
 * Provides a neural network trainer. This trainer applies network weight changes after all of the examples have been
 * processed.
 */
public final class NeuralNetworkBatchTrainer implements NeuralNetworkTrainer
{
    /** Delta values used during weight adjustment. Indices are layer, output. */
    private double[][] deltas;

    /** Delta weights. Indices are connector, from layer output, to layer input. */
    private double[][][] deltaWeights;

    /** Previous delta weights. */
    private double[][][] previousDeltaWeights;

    /** Delegate. */
    private final DefaultNeuralNetworkTrainer delegate;

    /**
     * Construct this object.
     * 
     * @param neuralNetwork Neural network.
     * @param examples Examples.
     */
    public NeuralNetworkBatchTrainer(final NeuralNetwork neuralNetwork, final List<Example> examples)
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
    public NeuralNetworkBatchTrainer(final NeuralNetwork neuralNetwork, final List<Example> examples,
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
    public NeuralNetworkBatchTrainer(final NeuralNetwork neuralNetwork, final List<Example> examples,
            final boolean isVerbose, final double alpha, final double beta)
    {
        final TrainingCalculator trainingCalculator = new DefaultTrainingCalculator(neuralNetwork, alpha, beta);
        delegate = new DefaultNeuralNetworkTrainer(trainingCalculator, examples, isVerbose);

        init();
    }

    @SuppressWarnings("hiding")
    @Override
    public NeuralNetworkTrainer adjustWeights(final double[][][] deltaWeights)
    {
        delegate.adjustWeights(deltaWeights);

        return this;
    }

    @SuppressWarnings("hiding")
    @Override
    public NeuralNetworkTrainer clearDeltas(final double[][] deltas)
    {
        delegate.clearDeltas(deltas);

        return this;
    }

    @SuppressWarnings("hiding")
    @Override
    public NeuralNetworkTrainer clearDeltaWeights(final double[][][] deltaWeights)
    {
        delegate.clearDeltaWeights(deltaWeights);

        return this;
    }

    /**
     * @return the deltas
     */
    public double[][] getDeltas()
    {
        return deltas;
    }

    /**
     * @return the deltaWeights
     */
    public double[][][] getDeltaWeights()
    {
        return deltaWeights;
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
            clearDeltas(deltas);

            sumSquaredError += trainExample(exampleIndex);
        }

        // Adjust weights.
        adjustWeights(deltaWeights);

        return sumSquaredError;
    }

    /**
     * @return a new array.
     */
    private double[][] createDeltas()
    {
        final NeuralNetwork neuralNetwork = getNeuralNetwork();
        final int layerCount = neuralNetwork.getLayerCount();

        final double[][] answer = new double[layerCount][];

        for (int i = 0; i < layerCount; i++)
        {
            final Layer layer = neuralNetwork.getLayer(i);
            final int nodeCount = layer.getNodeCount();
            answer[i] = new double[nodeCount];
        }

        return answer;
    }

    /**
     * @return a new array.
     */
    private double[][][] createDeltaWeights()
    {
        final NeuralNetwork neuralNetwork = getNeuralNetwork();
        final int connectorCount = neuralNetwork.getConnectorCount();

        final double[][][] answer = new double[connectorCount][][];

        for (int connectorIndex = 0; connectorIndex < connectorCount; connectorIndex++)
        {
            final Connector connector = neuralNetwork.getConnector(connectorIndex);
            final Layer fromLayer = connector.getFromLayer();
            final int fromCount = fromLayer.getNodeCount();

            answer[connectorIndex] = new double[fromCount][];

            final Layer toLayer = connector.getToLayer();
            final int toCount = toLayer.getNodeCount();

            for (int i = 0; i < fromCount; i++)
            {
                answer[connectorIndex][i] = new double[toCount];
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
        final double[][][] temp = previousDeltaWeights;
        previousDeltaWeights = deltaWeights;
        deltaWeights = temp;

        // Clear the delta weights.
        clearDeltas(deltas);
        clearDeltaWeights(deltaWeights);
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
        final double sumSquaredError = trainingCalculator.calculateDeltas(deltas, example);

        // Calculate the delta weights.
        trainingCalculator.calculateDeltaWeights(deltaWeights, deltas, previousDeltaWeights);

        return sumSquaredError;
    }
}
