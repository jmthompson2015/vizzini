package org.vizzini.ai.neuralnetwork;

import java.util.Arrays;

/**
 * Provides an example for a neural network appliance.
 * 
 * @param <I> Input type.
 * @param <O> Output type.
 */
public final class ApplianceExample<I, O>
{
    /** Input. */
    private final I input;

    /** Desired output. */
    private final O output;

    /** Array utilities. */
    private ArrayUtilities arrayUtils;

    /**
     * Construct this object.
     * 
     * @param input Input.
     * @param output Desired output.
     */
    @SuppressWarnings("hiding")
    public ApplianceExample(final I input, final O output)
    {
        this.input = input;
        this.output = output;
    }

    /**
     * @return the input
     */
    public I getInput()
    {
        return input;
    }

    /**
     * @return the output
     */
    public O getOutput()
    {
        return output;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder(getClass().getName());

        sb.append(" [");

        sb.append("input=");

        if (input.getClass().isArray())
        {
            sb.append(arrayToString(input));
        }
        else
        {
            sb.append(input);
        }

        sb.append(",output=");

        if (output.getClass().isArray())
        {
            sb.append(arrayToString(output));
        }
        else
        {
            sb.append(output);
        }

        sb.append("]");

        return sb.toString();
    }

    /**
     * Convert the given array to a string.
     * 
     * @param array Array.
     * 
     * @return a formatted string.
     */
    private String arrayToString(final Object array)
    {
        String answer;

        final Class<?> aClass = array.getClass();

        if (aClass.isAssignableFrom(boolean[].class))
        {
            answer = Arrays.toString((boolean[])array);
        }
        else if (aClass.isAssignableFrom(double[].class))
        {
            answer = getArrayUtils().toString((double[])array, "%4.1f");
        }
        else
        {
            throw new RuntimeException("Unknown array type: " + aClass.getName());
        }

        return answer;
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
}
