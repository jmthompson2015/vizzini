package org.vizzini.ai.neuralnetwork;

import java.util.Arrays;

/**
 * Provides a filter which uses binary encoding.
 */
public final class BinaryDecodeFilter implements InputFilter<double[]>, OutputFilter<double[]>
{
    /** Binary encoder for each node. */
    private final BinaryEncoder[] encoders;

    /** Input count. */
    private final int inputCount;

    /** Output count. */
    private final int outputCount;

    /**
     * Construct this object with the given parameters.
     * 
     * @param encoders Encoders.
     */
    @SuppressWarnings("hiding")
    public BinaryDecodeFilter(final BinaryEncoder[] encoders)
    {
        this.encoders = encoders;

        this.inputCount = encoders.length;
        this.outputCount = computeOutputCount(encoders);
    }

    @Override
    public double[] filter(final double[] input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        final double[] answer = new double[inputCount];
        int from = 0;

        for (int i = 0; i < encoders.length; i++)
        {
            final int to = from + encoders[i].getLength();
            final double[] subInputs = Arrays.copyOfRange(input, from, to);
            answer[i] = encoders[i].decode(subInputs);

            from = to;
        }

        return answer;
    }

    /**
     * @return the inputCount
     */
    public int getInputCount()
    {
        return inputCount;
    }

    /**
     * @return the outputCount
     */
    public int getOutputCount()
    {
        return outputCount;
    }

    @Override
    public double[] reverseFilter(final double[] output)
    {
        if (output == null)
        {
            throw new IllegalArgumentException("output is null");
        }

        if (output.length != encoders.length)
        {
            throw new IllegalArgumentException("Expected " + encoders.length + " outputs; received " + output.length);
        }

        final double[] answer = new double[outputCount];

        int count = 0;

        for (int i = 0; i < output.length; i++)
        {
            final double[] encoding = encoders[i].encodeAsDoubleArray(output[i]);

            for (int j = 0; j < encoding.length; j++)
            {
                answer[count + j] = encoding[j];
            }

            count += encoding.length;
        }

        return answer;
    }

    /**
     * @return a string representation of this object.
     */
    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder(getClass().getName());

        sb.append(" [");
        sb.append("inputCount=").append(inputCount);
        sb.append(",outputCount=").append(outputCount);
        sb.append("]");

        return sb.toString();
    }

    /**
     * @param encoders Encoders.
     * 
     * @return the input count.
     */
    @SuppressWarnings("hiding")
    private int computeOutputCount(final BinaryEncoder[] encoders)
    {
        // The output node count depends on the binary encoding.
        int answer = 0;

        for (int i = 0; i < encoders.length; i++)
        {
            answer += encoders[i].getLength();
        }

        return answer;
    }

}
