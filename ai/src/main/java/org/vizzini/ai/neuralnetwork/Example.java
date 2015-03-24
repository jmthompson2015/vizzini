package org.vizzini.ai.neuralnetwork;

import java.util.Arrays;

/**
 * Provides a neural network training example.
 */
public final class Example
{
    /** Inputs. */
    private final double[] inputs;

    /** Outputs. */
    private final double[] outputs;

    /**
     * Construct this object.
     * 
     * @param inputs Inputs.
     * @param outputs Outputs.
     */
    @SuppressWarnings("hiding")
    public Example(final double[] inputs, final double[] outputs)
    {
        this.inputs = inputs;
        this.outputs = outputs;
    }

    /**
     * @return the inputs
     */
    public double[] getInputs()
    {
        return inputs;
    }

    /**
     * @return the outputs
     */
    public double[] getOutputs()
    {
        return outputs;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder(getClass().getName());

        sb.append(" [");
        sb.append("inputs=").append(Arrays.toString(inputs));
        sb.append(",outputs=").append(Arrays.toString(outputs));
        sb.append("]");

        return sb.toString();
    }
}
