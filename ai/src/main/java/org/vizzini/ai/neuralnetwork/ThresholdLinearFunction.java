package org.vizzini.ai.neuralnetwork;

/**
 * Provides a threshold linear activation function for a neural network. This function returns a value in [0,1].
 */
public final class ThresholdLinearFunction implements ActivationFunction
{
    @Override
    public double calcDerivative(final double x)
    {
        double answer = 0.5;

        if ((x < -1.0) || (x > 1.0))
        {
            answer = 0.0;
        }

        return answer;
    }

    @Override
    public double calculate(final double x)
    {
        double answer;

        if (x < -1.0)
        {
            answer = 0.0;
        }
        else if (x > 1.0)
        {
            answer = 1.0;
        }
        else
        {
            answer = (0.5 * x) + 0.5;
        }

        return answer;
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
            answer = true;

            final ThresholdLinearFunction another = (ThresholdLinearFunction)object;

            answer = getClass() == another.getClass();
        }

        return answer;
    }

    @Override
    public double getMaximum()
    {
        return 1.0;
    }

    @Override
    public double getMinimum()
    {
        return 0.0;
    }

    @Override
    public int hashCode()
    {
        return getClass().hashCode();
    }

    @Override
    public String toString()
    {
        return getClass().getName();
    }
}
