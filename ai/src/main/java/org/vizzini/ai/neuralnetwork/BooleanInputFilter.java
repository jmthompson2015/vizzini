package org.vizzini.ai.neuralnetwork;

/**
 * Provides a filter which converts boolean into double.
 */
public final class BooleanInputFilter implements InputFilter<boolean[]>
{
    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }
        else
        {
            answer = true;
        }

        return answer;
    }

    @Override
    public double[] filter(final boolean[] input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        double[] answer = null;

        answer = new double[input.length];

        for (int i = 0; i < input.length; i++)
        {
            answer[i] = (input[i] ? 1.0 : 0.0);
        }

        return answer;
    }

    @Override
    public int hashCode()
    {
        final int answer = getClass().getName().hashCode();

        return answer;
    }

    @Override
    public boolean[] reverseFilter(final double[] output)
    {
        if (output == null)
        {
            throw new IllegalArgumentException("output is null");
        }

        final boolean[] answer = new boolean[output.length];

        for (int i = 0; i < output.length; i++)
        {
            answer[i] = (output[i] > 0.5);
        }

        return answer;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder(getClass().getName());
        sb.append(" [");
        sb.append("]");

        return sb.toString();
    }
}
