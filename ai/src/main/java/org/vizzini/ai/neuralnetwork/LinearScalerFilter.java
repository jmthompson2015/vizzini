package org.vizzini.ai.neuralnetwork;

/**
 * Provides a filter which uses linear scaling.
 */
public final class LinearScalerFilter implements InputFilter<double[]>, OutputFilter<double[]>
{
    /** Input value range. */
    private final double rangeInput;

    /** Output value range. */
    private final double rangeOutput;

    /** Maximum expected input value. */
    private final double maxInput;

    /** Maximum expected output value. */
    private final double maxOutput;

    /** Minimum expected input value. */
    private final double minInput;

    /** Minimum expected output value. */
    private final double minOutput;

    /**
     * Construct this object with the given parameters.
     * 
     * @param minInput Minimum expected input.
     * @param maxInput Maximum expected input.
     * @param minOutput Minimum expected output.
     * @param maxOutput Maximum expected output.
     */
    @SuppressWarnings("hiding")
    public LinearScalerFilter(final double minInput, final double maxInput, final double minOutput,
            final double maxOutput)
    {
        this.minInput = minInput;
        this.maxInput = maxInput;
        this.minOutput = minOutput;
        this.maxOutput = maxOutput;

        rangeInput = getMaxInput() - getMinInput();
        rangeOutput = getMaxOutput() - getMinOutput();
    }

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
            final LinearScalerFilter another = (LinearScalerFilter)object;

            answer = minInput == another.minInput;

            if (answer)
            {
                answer = maxInput == another.maxInput;
            }

            if (answer)
            {
                answer = minOutput == another.minOutput;
            }

            if (answer)
            {
                answer = maxOutput == another.maxOutput;
            }
        }

        return answer;
    }

    @Override
    public double[] filter(final double[] input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        final double[] answer = new double[input.length];

        for (int i = 0; i < answer.length; i++)
        {
            final double ratio = rangeOutput / rangeInput;

            answer[i] = ((input[i] - getMinInput()) * ratio) + getMinOutput();
        }

        return answer;
    }

    /**
     * @return the maximum expected input value.
     */
    public double getMaxInput()
    {
        return maxInput;
    }

    /**
     * @return the maximum expected output value.
     */
    public double getMaxOutput()
    {
        return maxOutput;
    }

    /**
     * @return the minimum expected input value.
     */
    public double getMinInput()
    {
        return minInput;
    }

    /**
     * @return the minimum expected output value.
     */
    public double getMinOutput()
    {
        return minOutput;
    }

    @Override
    public int hashCode()
    {
        int answer = (int)(2 * minInput);
        answer += 3 * maxInput;
        answer += 5 * minOutput;
        answer += 7 * maxOutput;

        return answer;
    }

    @Override
    public double[] reverseFilter(final double[] output)
    {
        if (output == null)
        {
            throw new IllegalArgumentException("output is null");
        }

        final double[] answer = new double[output.length];

        for (int i = 0; i < answer.length; i++)
        {
            final double ratio = rangeInput / rangeOutput;

            answer[i] = ((output[i] - getMinOutput()) * ratio) + getMinInput();
        }

        return answer;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder(getClass().getName());
        sb.append(" [");
        sb.append("minInput=").append(getMinInput());
        sb.append(", maxInput=").append(getMaxInput());
        sb.append(", minOutput=").append(getMinOutput());
        sb.append(", maxOutput=").append(getMaxOutput());
        sb.append("]");

        return sb.toString();
    }
}
