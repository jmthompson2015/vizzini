package org.vizzini.ai.neuralnetwork;

/**
 * Defines methods required by a training calculator.
 */
public interface TrainingCalculator
{
    /**
     * Calculate deltas.
     * 
     * @param deltas Delta values used during weight adjustment. Indices are layer, output. These values are modified by
     *            this method.
     * @param example Example.
     * 
     * @return the sum squared error.
     */
    double calculateDeltas(final double[][] deltas, final Example example);

    /**
     * Calculate delta weights.
     * 
     * @param deltaWeights Delta weights. Indices are from-layer, to-layer, from-layer output, to-layer input. These
     *            values are modified by this method.
     * @param deltas Delta values used during weight adjustment. Indices are layer, output.
     * @param previousDeltaWeights Previous delta weights.
     * 
     * @return this object.
     */
    TrainingCalculator calculateDeltaWeights(final double[][][] deltaWeights, final double[][] deltas,
            final double[][][] previousDeltaWeights);

    /**
     * @return alpha.
     */
    double getAlpha();

    /**
     * @return beta.
     */
    double getBeta();

    /**
     * @return neuralNetwork.
     */
    NeuralNetwork getNeuralNetwork();
}
