package org.vizzini.ai.neuralnetwork;

import java.util.List;

/**
 * Defines methods required by a neural network trainer.
 */
public interface NeuralNetworkTrainer
{
    /**
     * Adjust the network weights.
     * 
     * @param deltaWeights Delta weights. Indices are from layer, to layer, from layer output, to layer input.
     * 
     * @return this object.
     */
    NeuralNetworkTrainer adjustWeights(final double[][][] deltaWeights);

    /**
     * Clear the deltas.
     * 
     * @param deltas Delta values used during weight adjustment. Indices are layer, output.
     * 
     * @return this object.
     */
    NeuralNetworkTrainer clearDeltas(final double[][] deltas);

    /**
     * Clear the delta weights.
     * 
     * @param deltaWeights Delta weights. Indices are from layer, to layer, from layer output, to layer input.
     * 
     * @return this object.
     */
    NeuralNetworkTrainer clearDeltaWeights(final double[][][] deltaWeights);

    /**
     * @return the examples
     */
    List<Example> getExamples();

    /**
     * @return the trainingCalculator
     */
    TrainingCalculator getTrainingCalculator();

    /**
     * @return the isVerbose
     */
    boolean isVerbose();

    /**
     * Train the network by looping over the examples until stopping criteria is reached.
     * 
     * @param maxError Maximum error for a stopping condition.
     * @param maxCount Maximum loop count for a stopping condition.
     * @param printFrequency Loop count frequency when error is printed.
     * 
     * @return the sum squared error.
     */
    double runTrainingLoop(final double maxError, final int maxCount, final int printFrequency);

    /**
     * Train the network once over the set of examples.
     * 
     * @return the sum squared error.
     */
    double train();
}
