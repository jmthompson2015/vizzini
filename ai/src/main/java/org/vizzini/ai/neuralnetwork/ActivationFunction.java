package org.vizzini.ai.neuralnetwork;

import java.io.Serializable;

/**
 * Defines methods required by activation functions for a neural network.
 */
public interface ActivationFunction extends Serializable
{
    /**
     * Calculate the derivative of this function at the given input.
     * 
     * @param x Input.
     * 
     * @return the derivative.
     */
    double calcDerivative(double x);

    /**
     * Calculate the value of this function at the given input.
     * 
     * @param x Input.
     * 
     * @return the value.
     */
    double calculate(double x);

    /**
     * @return the maximum value this function can produce.
     */
    double getMaximum();

    /**
     * @return the minimum value this function can produce.
     */
    double getMinimum();
}
