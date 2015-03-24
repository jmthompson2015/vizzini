package org.vizzini.ai.neuralnetwork;

/**
 * Provides a default implementation of a neural network appliance.
 * 
 * @param <I> Input type.
 * @param <O> Output type.
 */
public final class DefaultNeuralNetworkAppliance<I, O> implements NeuralNetworkAppliance<I, O>
{
    /** Input filter. */
    private final InputFilter<I> inputFilter;

    /** Neural network. */
    private final NeuralNetwork neuralNetwork;

    /** Output filter. */
    private final OutputFilter<O> outputFilter;

    /** Last input. */
    private I input;

    /** Last output. */
    private O output;

    /**
     * Construct this object.
     * 
     * @param inputFilter Input filter. (optional)
     * @param neuralNetwork Neural network. (required)
     * @param outputFilter Output filter. (optional)
     */
    @SuppressWarnings("hiding")
    public DefaultNeuralNetworkAppliance(final InputFilter<I> inputFilter, final NeuralNetwork neuralNetwork,
            final OutputFilter<O> outputFilter)
    {
        if (neuralNetwork == null)
        {
            throw new IllegalArgumentException("neuralNetwork is null");
        }

        this.inputFilter = inputFilter;
        this.neuralNetwork = neuralNetwork;
        this.outputFilter = outputFilter;
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
            @SuppressWarnings("unchecked")
            final DefaultNeuralNetworkAppliance<I, O> another = (DefaultNeuralNetworkAppliance<I, O>)object;

            if (getInputFilter() != null)
            {
                answer = getInputFilter().equals(another.getInputFilter());
            }

            if (answer && (getOutputFilter() != null))
            {
                answer = getOutputFilter().equals(another.getOutputFilter());
            }

            if (answer)
            {
                answer = getNeuralNetwork().equals(another.getNeuralNetwork());
            }
        }

        return answer;
    }

    @SuppressWarnings("hiding")
    @Override
    public O evaluate(final I input)
    {
        this.input = input;

        // Filter the input.
        double[] myInput;

        if (inputFilter != null)
        {
            myInput = inputFilter.filter(input);
        }
        else
        {
            myInput = (double[])input;
        }

        // Evaluate.
        final double[] myOutput = neuralNetwork.evaluate(myInput);

        // Filter the output.
        if (outputFilter != null)
        {
            output = outputFilter.filter(myOutput);
        }
        else
        {
            @SuppressWarnings("unchecked")
            final O tempOutput = (O)myOutput;
            output = tempOutput;
        }

        return output;
    }

    @Override
    public I getInput()
    {
        return input;
    }

    @Override
    public InputFilter<I> getInputFilter()
    {
        return inputFilter;
    }

    @Override
    public NeuralNetwork getNeuralNetwork()
    {
        return neuralNetwork;
    }

    @Override
    public O getOutput()
    {
        return output;
    }

    @Override
    public OutputFilter<O> getOutputFilter()
    {
        return outputFilter;
    }

    @Override
    public int hashCode()
    {
        int answer = 0;

        if (getInputFilter() != null)
        {
            answer += 2 * getInputFilter().hashCode();
        }

        if (getOutputFilter() != null)
        {
            answer += 3 * getOutputFilter().hashCode();
        }

        answer += 5 * getNeuralNetwork().hashCode();

        return answer;
    }

    /**
     * @return a string representation of this object.
     */
    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder(getClass().getName());

        sb.append(" [").append("\n");
        sb.append("inputFilter=").append(inputFilter).append("\n");
        sb.append("neuralNetwork=").append(neuralNetwork).append("\n");
        sb.append("outputFilter=").append(outputFilter).append("\n");
        sb.append("]");

        return sb.toString();
    }
}
