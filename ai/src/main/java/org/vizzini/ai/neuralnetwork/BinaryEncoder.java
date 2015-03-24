package org.vizzini.ai.neuralnetwork;

import java.util.BitSet;

/**
 * Provides an encoder for binary numbers.
 */
public final class BinaryEncoder
{
    /**
     * @param range Range.
     * @param delta Delta.
     * 
     * @return the number of binary digits required to hold the given range.
     */
    public static int computeDigits(final double range, final double delta)
    {
        int answer = -1;

        if ((range / delta) <= 1.0)
        {
            answer = 1;
        }
        else
        {
            answer = (int)Math.ceil(Math.log(range / delta) / Math.log(2.0));
        }

        return answer;
    }

    /** Delta value. */
    private double delta;

    /** Length of the binary number (number of bits). */
    private int length;

    /** Maximum value. */
    private double max;

    /** Minimum value. */
    private double min;

    /**
     * Construct this object with the given parameter.
     * 
     * @param max Maximum value.
     */
    @SuppressWarnings("hiding")
    public BinaryEncoder(final double max)
    {
        this(0.0, max, 1.0);
    }

    /**
     * Construct this object with the given parameters.
     * 
     * @param min Minimum value.
     * @param max Maximum value.
     */
    @SuppressWarnings("hiding")
    public BinaryEncoder(final double min, final double max)
    {
        this(min, max, 1.0);
    }

    /**
     * Construct this object with the given parameters.
     * 
     * @param min Minimum value.
     * @param max Maximum value.
     * @param delta Delta value, or required precision.
     */
    @SuppressWarnings("hiding")
    public BinaryEncoder(final double min, final double max, final double delta)
    {
        if (min > max)
        {
            throw new IllegalArgumentException("min > max");
        }

        setMin(min);
        setMax(max);
        setDelta(delta);
        setLength(computeDigits(getRange(), delta));
    }

    /**
     * @param value Value.
     * 
     * @return the given value as a base-10 number.
     */
    public double decode(final double[] value)
    {
        double answer = min;
        final int myLength = Math.min(length, value.length);

        for (int i = 0; i < myLength; i++)
        {
            final int index = myLength - i - 1;
            answer += Math.pow(2.0, index) * value[i];
        }

        return answer;
    }

    /**
     * @param value Value.
     * 
     * @return the given value as a base-10 number.
     */
    public double decode(final String value)
    {
        double answer = min;
        final int myLength = Math.min(length, value.length());

        for (int i = 0; i < myLength; i++)
        {
            if (value.charAt(i) == '1')
            {
                final int index = myLength - i - 1;
                answer += delta * Math.pow(2.0, index);
            }
        }

        return answer;
    }

    /**
     * @param value Value.
     * 
     * @return the given value as a binary number.
     */
    public BitSet encodeAsBitSet(final double value)
    {
        final double[] doubleArray = encodeAsDoubleArray(value);

        final BitSet answer = new BitSet(length);

        for (int i = 0; i < length; i++)
        {
            final int index = length - i - 1;
            final double element = doubleArray[i];
            answer.set(index, ((element >= 0.5) && (element < 2.0)));
        }

        return answer;
    }

    /**
     * @param value Value.
     * 
     * @return the given value as a binary number.
     */
    public double[] encodeAsDoubleArray(final double value)
    {
        final double[] answer = new double[length];

        double myValue = (value - min) / delta;

        // If myValue is larger than can be encoded, remove excess.
        double power = Math.pow(2.0, length);
        int bit = (int)Math.floor(myValue / power);
        if (bit > 0)
        {
            myValue -= bit * power;
        }

        for (int i = length - 1; i >= 0; i--)
        {
            power = Math.pow(2.0, i);
            bit = (int)Math.floor(myValue / power);

            if (bit > 0)
            {
                myValue -= bit * power;
            }

            final int index = length - i - 1;
            answer[index] = bit;
        }

        return answer;
    }

    /**
     * @param value Value.
     * 
     * @return the given value as a binary number.
     */
    public int[] encodeAsIntArray(final double value)
    {
        final double[] doubleArray = encodeAsDoubleArray(value);

        final int[] answer = new int[getLength()];

        for (int i = 0; i < length; i++)
        {
            answer[i] = (int)doubleArray[i];
        }

        return answer;
    }

    /**
     * @param value Value.
     * 
     * @return the given value as a binary number.
     */
    public String encodeAsString(final double value)
    {
        final double[] doubleArray = encodeAsDoubleArray(value);

        final StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++)
        {
            final double element = doubleArray[i];
            sb.append(((element >= 0.5) && (element < 2.0)) ? "1" : "0");
        }

        return sb.toString();
    }

    /**
     * @return Return delta.
     */
    public double getDelta()
    {
        return delta;
    }

    /**
     * @return Return length.
     */
    public int getLength()
    {
        return length;
    }

    /**
     * @return Return max.
     */
    public double getMax()
    {
        return max;
    }

    /**
     * @return Return min.
     */
    public double getMin()
    {
        return min;
    }

    /**
     * @return Return range.
     */
    public double getRange()
    {
        return max - min;
    }

    /**
     * @param delta the delta to set
     */
    @SuppressWarnings("hiding")
    private void setDelta(final double delta)
    {
        this.delta = delta;
    }

    /**
     * @param length the length to set
     */
    @SuppressWarnings("hiding")
    private void setLength(final int length)
    {
        this.length = length;
    }

    /**
     * @param max the max to set
     */
    @SuppressWarnings("hiding")
    private void setMax(final double max)
    {
        this.max = max;
    }

    /**
     * @param min the min to set
     */
    @SuppressWarnings("hiding")
    private void setMin(final double min)
    {
        this.min = min;
    }
}
