package org.vizzini.core;

import java.util.Random;

/**
 * Provides a default implementation of a random generator.
 * 
 * @see Random
 */
public final class DefaultRandomGenerator implements RandomGenerator
{
    /** Random number generator. */
    private final Random random = new Random();

    @Override
    public boolean generateBoolean()
    {
        return random.nextBoolean();
    }

    @Override
    public double generateDouble()
    {
        final double min = 0.0;
        final double max = 1.0;

        return generateDouble(min, max);
    }

    @Override
    public double generateDouble(final double min, final double max)
    {
        final double accuracy = 1.0E+20;

        return generateDouble(min, max, accuracy);
    }

    @Override
    public double generateDouble(final double min, final double max, final double accuracy)
    {
        if (min <= -Double.MAX_VALUE)
        {
            throw new IllegalArgumentException("min <= -Double.MAX_VALUE");
        }

        if (max >= Double.MAX_VALUE)
        {
            throw new IllegalArgumentException("max >= Double.MAX_VALUE");
        }

        if (max <= min)
        {
            throw new IllegalArgumentException("Invalid range: [" + min + ", " + max + "]");
        }

        final double range = (max - min) + (1.0 / accuracy);
        double value = random.nextDouble() * range;
        value += min;

        return toAccuracy(value, accuracy);
    }

    @Override
    public int generateInt()
    {
        return random.nextInt();
    }

    @Override
    public int generateInt(final int min, final int max)
    {
        if (min <= Integer.MIN_VALUE)
        {
            throw new IllegalArgumentException("min <= Integer.MIN_VALUE");
        }

        if (max >= Integer.MAX_VALUE)
        {
            throw new IllegalArgumentException("max >= Integer.MAX_VALUE");
        }

        if (max <= min)
        {
            throw new IllegalArgumentException("Invalid range: [" + min + ", " + max + "]");
        }

        final int range = (max - min) + 1;
        int value = random.nextInt(range);
        value += min;

        return value;
    }

    /**
     * @param value Value.
     * @param accuracy Accuracy. (1.0 is zero decimal places, 10.0 is one, 100.0 is two, etc)
     * 
     * @return the value to the given accuracy.
     */
    private double toAccuracy(final double value, final double accuracy)
    {
        return Math.floor(value * accuracy) / accuracy;
    }
}
