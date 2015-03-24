package org.vizzini.ai.neuralnetwork;

/**
 * Provides a filter which returns the index of the maximum output value.
 */
public final class MaxOutputValueIndexFilter implements OutputFilter<Integer>
{
    @Override
    public Integer filter(final double[] input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        Integer answer = null;

        double max = -1.0 * Double.MAX_VALUE;

        for (int i = 0; i < input.length; i++)
        {
            if (input[i] > max)
            {
                answer = i;
                max = input[i];
            }
        }

        return answer;
    }

    @Override
    public double[] reverseFilter(final Integer output)
    {
        if (output == null)
        {
            throw new IllegalArgumentException("output is null");
        }

        throw new RuntimeException("Error: reverse filter data not available");
    }
}
