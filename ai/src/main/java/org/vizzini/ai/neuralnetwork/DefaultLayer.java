package org.vizzini.ai.neuralnetwork;

import java.util.Arrays;

import org.apache.commons.lang3.StringUtils;

/**
 * Provides a default layer for a neural network.
 */
public final class DefaultLayer implements Layer
{
    /** Activation function. */
    private final ActivationFunction activationFunction;

    /** Node input values stored by node index. */
    private double[] inputs;

    /** Flag indicating if a bias node is used. */
    private final boolean isBiasNodeUsed;

    /** Name. */
    private final String name;

    /** Nodes output values stored by node index. */
    private double[] outputs;

    /** Array utilities. */
    private ArrayUtilities arrayUtils;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param nodeCount Node count.
     * @param function Activation function.
     * @param isBiasNodeUsed Flag indicating if a bias node is used.
     */
    @SuppressWarnings("hiding")
    public DefaultLayer(final String name, final int nodeCount, final ActivationFunction function,
            final boolean isBiasNodeUsed)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        if (nodeCount <= 0)
        {
            throw new IllegalArgumentException("nodeCount <= 0");
        }

        if (function == null)
        {
            throw new IllegalArgumentException("function is null");
        }

        this.name = name;
        this.activationFunction = function;
        this.isBiasNodeUsed = isBiasNodeUsed;

        setNodeCount(nodeCount);
    }

    @Override
    public Layer clear()
    {
        clearInputs();
        clearOutputs();

        return this;
    }

    @Override
    public Layer clearInputs()
    {
        Arrays.fill(inputs, 0.0);

        return this;
    }

    @Override
    public Layer clearOutputs()
    {
        Arrays.fill(outputs, 0.0);

        return this;
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
            final DefaultLayer another = (DefaultLayer)object;

            answer = name.equals(another.name);

            if (answer)
            {
                answer = getNodeCount() == another.getNodeCount();
            }

            if (answer)
            {
                answer = (activationFunction == another.activationFunction)
                        || activationFunction.equals(another.activationFunction);
            }

            if (answer)
            {
                answer = isBiasNodeUsed() == another.isBiasNodeUsed();
            }
        }

        return answer;
    }

    @SuppressWarnings("hiding")
    @Override
    public double[] evaluate(final double[] inputs)
    {
        if (inputs == null)
        {
            throw new IllegalArgumentException("inputs == null");
        }

        if (activationFunction == null)
        {
            throw new IllegalStateException("activationFunction == null");
        }

        setInputs(inputs);

        final double[] myInputs = getInputs();
        final double[] myOutputs = getOutputs();

        for (int i = 0; i < myInputs.length; i++)
        {
            myOutputs[i] = activationFunction.calculate(myInputs[i]);
        }

        if (isBiasNodeUsed())
        {
            myInputs[myInputs.length - 1] = 1.0;
            myOutputs[myOutputs.length - 1] = 1.0;
        }

        return getOutputs();
    }

    @Override
    public ActivationFunction getActivationFunction()
    {
        return activationFunction;
    }

    @Override
    public double getInput(final int i)
    {
        return inputs[i];
    }

    @Override
    public double[] getInputs()
    {
        return inputs;
    }

    @Override
    public int getMaxValueIndex()
    {
        int answer = -1;
        double max = -1.0 * Double.MAX_VALUE;

        for (int i = 0; i < outputs.length; i++)
        {
            if (outputs[i] > max)
            {
                answer = i;
                max = outputs[i];
            }
        }

        return answer;
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public int getNodeCount()
    {
        return outputs.length;
    }

    @Override
    public int getNodeCountWithoutBias()
    {
        int answer = getNodeCount();

        if (isBiasNodeUsed())
        {
            answer--;
        }

        return answer;
    }

    @Override
    public double getOutput(final int i)
    {
        return outputs[i];
    }

    @Override
    public double[] getOutputs()
    {
        return outputs;
    }

    @Override
    public int hashCode()
    {
        int answer = name.hashCode();

        answer += 3 * getNodeCount();

        if (activationFunction != null)
        {
            answer += 5 * activationFunction.hashCode();
        }

        if (isBiasNodeUsed())
        {
            answer += 7;
        }

        return answer;
    }

    @Override
    public boolean isBiasNodeUsed()
    {
        return isBiasNodeUsed;
    }

    @Override
    public String toDetailString()
    {
        final StringBuilder sb = new StringBuilder(getClass().getName());

        sb.append(" [");
        sb.append("activationFunction=").append(getActivationFunction());
        sb.append(",biasNodeUsed=").append(isBiasNodeUsed());
        sb.append(",inputs=").append(getArrayUtils().toString(getInputs(), "%8.4f"));
        sb.append(",maxValueIndex=").append(getMaxValueIndex());
        sb.append(",name=").append(getName());
        sb.append(",nodeCount=").append(getNodeCount());
        sb.append(",outputs=").append(getArrayUtils().toString(getOutputs(), "%8.4f"));
        sb.append("]");

        return sb.toString();
    }

    @Override
    public String toString()
    {
        return getClass().getName() + " " + getName();
    }

    /**
     * @return the arrayUtils
     */
    private ArrayUtilities getArrayUtils()
    {
        if (arrayUtils == null)
        {
            arrayUtils = new ArrayUtilities();
        }

        return arrayUtils;
    }

    /**
     * @param inputs The inputs to set.
     */
    @SuppressWarnings("hiding")
    private void setInputs(final double[] inputs)
    {
        if (inputs == null)
        {
            throw new IllegalStateException("inputs == null");
        }

        System.arraycopy(inputs, 0, this.inputs, 0, inputs.length);
    }

    /**
     * Set the input count.
     * 
     * @param count Count.
     */
    private void setNodeCount(final int count)
    {
        int myCount = count;

        if (isBiasNodeUsed())
        {
            myCount++;
        }

        inputs = new double[myCount];
        outputs = new double[myCount];
    }
}
