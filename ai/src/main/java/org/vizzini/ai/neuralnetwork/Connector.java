package org.vizzini.ai.neuralnetwork;

/**
 * Defines methods required by a neural network layer connector.
 */
public interface Connector
{
    /**
     * Adjust the given layer's weights by adding the given deltas.
     * 
     * @param deltaWeights Weight deltas for the given layer.
     * 
     * @return this object.
     */
    Connector adjustWeights(double[][] deltaWeights);

    /**
     * Assign the given value to all weights of the neural network.
     * 
     * @param value Value.
     * 
     * @return this object.
     */
    Connector fillWeights(double value);

    /**
     * @return the from layer.
     */
    Layer getFromLayer();

    /**
     * @return the to layer.
     */
    Layer getToLayer();

    /**
     * @param i From layer node index.
     * @param j To layer node index.
     * 
     * @return the weight for the given parameters.
     */
    double getWeight(int i, int j);

    /**
     * @return a count of the weights.
     */
    int getWeightCount();

    /**
     * @param i From layer node index.
     * 
     * @return the weights for the given parameters.
     */
    double[] getWeights(int i);

    /**
     * Assign random weights.
     * 
     * @return this object.
     */
    Connector randomizeWeights();

    /**
     * Assign random weights.
     * 
     * @param range +/- Range of random weights around zero.
     * 
     * @return this object.
     */
    Connector randomizeWeights(double range);

    /**
     * Set the weight for the given parameters.
     * 
     * @param i From layer node index.
     * @param j To layer node index.
     * @param weight New weight.
     * 
     * @return this object.
     */
    Connector setWeight(int i, int j, double weight);

    /**
     * Assign zero weights.
     * 
     * @return this object.
     */
    Connector zeroWeights();
}
