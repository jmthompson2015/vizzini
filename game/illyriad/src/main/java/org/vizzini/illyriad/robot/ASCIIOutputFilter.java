package org.vizzini.illyriad.robot;

import java.util.Arrays;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.neuralnetwork.MaxOutputValueIndexFilter;
import org.vizzini.ai.neuralnetwork.OutputFilter;

/**
 * Provides a filter to convert the maximum output value index into an ASCII printable character. There are 95 printable
 * characters, ranging from 32 (" ") to 126 ("~").
 * <p>
 * Some interesting characters:
 * </p>
 * 
 * <ul>
 * <li>space 32 " "</li>
 * <li>comma 44 ","</li>
 * <li>decimal point 46 "."</li>
 * <li>numeric digits 48 "0" - 57 "9"</li>
 * <li>uppercase letters 65 "A" - 90 "Z"</li>
 * <li>lowercase letters 97 "a" = 122 "z"</li>
 * <li>tilde 126 "~"</li>
 * </ul>
 * 
 * @see <a href="http://en.wikipedia.org/wiki/Ascii#ASCII_printable_characters">Wikipedia</a>
 */
public final class ASCIIOutputFilter implements OutputFilter<String>
{
    /** Delegate. */
    private final MaxOutputValueIndexFilter delegate = new MaxOutputValueIndexFilter();

    /** Index offset. */
    private static final int OFFSET = 32;

    /** ASCII printable character count. */
    private static final int COUNT = 95;

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

        if ((0 <= index) && (index < COUNT))
        {
            answer = String.valueOf((char)(index + OFFSET));
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
        final int index = firstChar - OFFSET;

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
