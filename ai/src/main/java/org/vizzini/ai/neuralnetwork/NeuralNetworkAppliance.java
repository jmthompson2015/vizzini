package org.vizzini.ai.neuralnetwork;

/**
 * Defines methods required by an appliance which uses a neural network.
 * 
 * @param <I> Input type.
 * @param <O> Output type.
 */
public interface NeuralNetworkAppliance<I, O>
{
    /**
     * @param input Input.
     * 
     * @return the filtered output of the neural network.
     */
    O evaluate(I input);

    /**
     * @return the last input to evaluate.
     */
    I getInput();

    /**
     * @return the inputFilter
     */
    InputFilter<I> getInputFilter();

    /**
     * @return the neuralNetwork
     */
    NeuralNetwork getNeuralNetwork();

    /**
     * @return the last output from evaluate.
     */
    O getOutput();

    /**
     * @return the outputFilter
     */
    OutputFilter<O> getOutputFilter();
}
