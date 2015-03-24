package org.vizzini.ai.neuralnetwork;

/**
 * Provides a filter which converts double into boolean.
 */
public final class BooleanOutputFilter implements OutputFilter<boolean[]>
{
    @Override
    public boolean[] filter(final double[] input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        boolean[] answer = null;

        answer = new boolean[input.length];

        for (int i = 0; i < input.length; i++)
        {
            answer[i] = (input[i] > 0.5);
        }

        return answer;
    }

    @Override
    public double[] reverseFilter(final boolean[] output)
    {
        if (output == null)
        {
            throw new IllegalArgumentException("output is null");
        }

        final double[] answer = new double[output.length];

        for (int i = 0; i < output.length; i++)
        {
            answer[i] = (output[i] ? 1.0 : 0.0);
        }

        return answer;
    }
}
