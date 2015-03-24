package org.vizzini.ai.neuralnetwork;

/**
 * Provides a pass-through activation function for a neural network. This function returns the input value.
 */
public final class PassThroughFunction implements ActivationFunction
{
    @Override
    public double calcDerivative(final double x)
    {
        return 0.0;
    }

    @Override
    public double calculate(final double x)
    {
        return x;
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

            final PassThroughFunction another = (PassThroughFunction)object;

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
