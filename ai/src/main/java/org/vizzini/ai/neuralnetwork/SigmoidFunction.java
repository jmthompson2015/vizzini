package org.vizzini.ai.neuralnetwork;

/**
 * Provides a sigmoid activation function for a neural network. This function returns a value in [0,1].
 */
public final class SigmoidFunction implements ActivationFunction
{
    @Override
    public double calcDerivative(final double x)
    {
        final double z = calculate(x);

        return (z * (1.0 - z));
    }

    @Override
    public double calculate(final double x)
    {
        return (1.0 / (1.0 + Math.exp(-x)));
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

            final SigmoidFunction another = (SigmoidFunction)object;

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
