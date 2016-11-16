package org.vizzini.illyriad.robot;

import java.util.Arrays;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.neuralnetwork.MaxOutputValueIndexFilter;
import org.vizzini.ai.neuralnetwork.OutputFilter;

/**
 * Provides a filter to convert the maximum output value index into a numeric (including a decimal point).
 */
public final class AlphaNumericOutputFilter implements OutputFilter<String>
{
    /** Delegate. */
    private final MaxOutputValueIndexFilter delegate = new MaxOutputValueIndexFilter();

    /** Character count. (ten digits + comma + decimal point + 26 uppercase letters + 26 lowercase letters) */
    private static final int COUNT = 64;

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
    public String filter(final double[] input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        if (input.length < COUNT)
        {
            throw new IllegalArgumentException("Not enough inputs: " + input.length + "; need " + COUNT);
        }

        String answer;

        final int index = delegate.filter(input);

        // if (index == 10)
        // {
        // answer = ".";
        // }
        // else if (index == 11)
        // {
        // answer = ",";
        // }
        // else if ((11 < index) && (index < 38))
        // {
        // answer = String.valueOf((char)('A' + (index - 12)));
        // }
        // else if ((37 < index) && (index < COUNT))
        // {
        // answer = String.valueOf((char)('a' + (index - 38)));
        // }
        // else
        // {
        // answer = String.valueOf(index);
        // }

        if ((0 <= index) && (index < COUNT))
        {
            if (index == 10)
            {
                answer = ",";
            }
            else if (index == 11)
            {
                answer = ".";
            }
            else if ((11 < index) && (index < 38))
            {
                answer = String.valueOf((char)('A' + (index - 12)));
            }
            else if ((37 < index) && (index < COUNT))
            {
                answer = String.valueOf((char)('a' + (index - 38)));
            }
            else
            {
                answer = String.valueOf(index);
            }
        }
        else
        {
            throw new IllegalArgumentException("Unrecognized input index: " + index);
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
    public double[] reverseFilter(final String output)
    {
        if (StringUtils.isEmpty(output))
        {
            throw new IllegalArgumentException("output is null or empty");
        }

        double[] answer;

        final char firstChar = output.toCharArray()[0];
        int index;

        if (('0' <= firstChar) && (firstChar <= '9'))
        {
            index = Integer.parseInt(output);
        }
        else if (",".equals(output))
        {
            index = 10;
        }
        else if (".".equals(output))
        {
            index = 11;
        }
        else if (('A' <= firstChar) && (firstChar <= 'Z'))
        {
            index = 12 + (firstChar - 'A');
        }
        else if (('a' <= firstChar) && (firstChar <= 'z'))
        {
            index = 38 + (firstChar - 'a');
        }
        else
        {
            throw new IllegalArgumentException("Unknown output string: [" + output + "]");
        }

        if ((0 <= index) && (index < COUNT))
        {
            answer = new double[COUNT];
            Arrays.fill(answer, 0.0);
            answer[index] = 1.0;
        }
        else
        {
            throw new IllegalArgumentException("Unknown output string: [" + output + "]");
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
