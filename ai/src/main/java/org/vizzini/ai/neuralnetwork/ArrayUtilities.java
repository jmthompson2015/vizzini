package org.vizzini.ai.neuralnetwork;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.StringUtils;

/**
 * Provides convenience methods for arrays.
 */
public final class ArrayUtilities
{
    /**
     * @param array Array.
     * 
     * @return the given parameter as a list.
     */
    public List<Double> asList(final double[] array)
    {
        final List<Double> answer = new ArrayList<Double>();

        if (array != null)
        {
            for (int i = 0; i < array.length; i++)
            {
                answer.add(array[i]);
            }
        }

        return answer;
    }

    /**
     * @param value Values array.
     * 
     * @return values as a double array.
     */
    public double[] booleanToDouble(final boolean[] value)
    {
        if (value == null)
        {
            throw new IllegalArgumentException("value is null");
        }

        final double[] answer = new double[value.length];

        for (int i = 0; i < value.length; i++)
        {
            answer[i] = booleanToDouble(value[i]);
        }

        return answer;
    }

    /**
     * @param array Array.
     * @param format Format.
     * 
     * @return a formatted string.
     */
    public String toString(final double[] array, final String format)
    {
        String answer;

        if (array == null)
        {
            answer = "null";
        }
        else if (StringUtils.isEmpty(format))
        {
            answer = Arrays.toString(array);
        }
        else
        {
            final StringBuilder sb = new StringBuilder();

            sb.append("[");

            for (int i = 0; i < array.length; i++)
            {
                sb.append(String.format(format, array[i]));

                if (i < (array.length - 1))
                {
                    sb.append(", ");
                }
            }

            sb.append("]");

            answer = sb.toString();
        }

        return answer;
    }

    /**
     * @param array Array.
     * @param format Format.
     * 
     * @return a formatted string.
     */
    public String toString(final double[][] array, final String format)
    {
        String answer;

        if (array == null)
        {
            answer = "null";
        }
        else
        {
            final StringBuilder sb = new StringBuilder();

            sb.append("[\n");

            for (int i = 0; i < array.length; i++)
            {
                if (StringUtils.isEmpty(format))
                {
                    sb.append(Arrays.toString(array[i]));
                }
                else
                {
                    sb.append(toString(array[i], format));
                }

                if (i < (array.length - 1))
                {
                    sb.append("\n");
                }
            }

            sb.append("\n]");

            answer = sb.toString();
        }

        return answer;
    }

    /**
     * @param value Value.
     * 
     * @return value as a double.
     */
    private double booleanToDouble(final boolean value)
    {
        return (value ? 1.0 : 0.0);
    }
}
