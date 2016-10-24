package org.vizzini.ai.neuralnetwork;

/**
 * Defines methods required by a layer of a neural network.
 */
public interface Layer
{
    /**
     * Clear the node input and output values.
     * 
     * @return this object.
     */
    Layer clear();

    /**
     * Clear the node input values.
     * 
     * @return this object.
     */
    Layer clearInputs();

    /**
     * Clear the node output values.
     * 
     * @return this object.
     */
    Layer clearOutputs();

    /**
     * Apply the given inputs and return the output of the layer.
     * 
     * @param inputs Node input values.
     * 
     * @return the output of the layer.
     */
    double[] evaluate(double[] inputs);

    /**
     * @return the activation function.
     */
    ActivationFunction getActivationFunction();

    /**
     * @param i Index.
     * 
     * @return the node input value at the given index.
     */
    double getInput(int i);

    /**
     * @return the node input values.
     */
    double[] getInputs();

    /**
     * @return the index of the node with the maximum value.
     */
    int getMaxValueIndex();

    /**
     * @return the name.
     */
    String getName();

    /**
     * @return the node count.
     */
    int getNodeCount();

    /**
     * @return the node count without a bias node, if any.
     */
    int getNodeCountWithoutBias();

    /**
     * @param i Index.
     * 
     * @return the node output value at the given index.
     */
    double getOutput(int i);

    /**
     * @return the node output values.
     */
    double[] getOutputs();

    /**
     * @return isBiasNodeUsed.
     */
    boolean isBiasNodeUsed();

    /**
     * @return a string representation of the details of this object.
     */
    String toDetailString();
}
