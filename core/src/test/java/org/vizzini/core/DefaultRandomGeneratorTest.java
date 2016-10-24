package org.vizzini.core;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultRandomGenerator</code> class.
 */
public final class DefaultRandomGeneratorTest
{
    /** Flag indicating whether test output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Min-max check loop count. */
    private static final int MIN_MAX_LOOP_COUNT = 10000;

    /** Random generator. */
    private final RandomGenerator generator = new DefaultRandomGenerator();

    /**
     * Test the <code>generateBoolean()</code> method.
     */
    @Test
    public void generateBoolean()
    {
        final boolean result = generator.generateBoolean();

        assertTrue(result || !result);
    }

    /**
     * Test the <code>generateBoolean()</code> method.
     */
    @Test
    public void generateBooleanMinMaxCheck()
    {
        boolean isMinFound = false;
        boolean isMaxFound = false;

        for (int i = 0; (!isMinFound || !isMaxFound) && (i < MIN_MAX_LOOP_COUNT); i++)
        {
            final boolean result = generator.generateBoolean();

            if (!isMinFound && !result)
            {
                if (IS_VERBOSE)
                {
                    System.out.println("boolean min found at " + i);
                }
                isMinFound = !result;
            }

            if (!isMaxFound && result)
            {
                if (IS_VERBOSE)
                {
                    System.out.println("boolean max found at " + i);
                }
                isMaxFound = result;
            }

            if (IS_VERBOSE)
            {
                System.out.println(i + " boolean result ? " + result + " isMinFound ? " + isMinFound + " isMaxFound ? "
                        + isMaxFound);
            }
        }

        assertTrue(isMinFound);
        assertTrue(isMaxFound);
    }

    /**
     * Test the <code>generateDouble()</code> method.
     */
    @Test
    public void generateDouble()
    {
        final double result = generator.generateDouble();

        assertTrue((0.0 <= result) && (result <= 1.0));
    }

    /**
     * Test the <code>generateDouble()</code> method.
     */
    @Test
    public void generateDoubleAccuracy()
    {
        final double min = 1.2;
        final double max = 10.6;
        final double accuracy = 10.0;

        final double result = generator.generateDouble(min, max, accuracy);

        assertTrue(min + " <= " + result + " <= " + max, (min <= result) && (result <= max));
    }

    /**
     * Test the <code>generateDouble()</code> method.
     */
    @Test
    public void generateDoubleAccuracyErrors()
    {
        double min = -Double.MAX_VALUE;
        double max = Double.MAX_VALUE;
        final double accuracy = 10.0;

        try
        {
            generator.generateDouble(min, max, accuracy);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("min <= -Double.MAX_VALUE"));
        }

        min = 10.0;

        try
        {
            generator.generateDouble(min, max, accuracy);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("max >= Double.MAX_VALUE"));
        }

        max = 1.0;

        try
        {
            generator.generateDouble(min, max, accuracy);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Invalid range: [10.0, 1.0]"));
        }

        max = min;

        try
        {
            generator.generateDouble(min, max, accuracy);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Invalid range: [10.0, 10.0]"));
        }
    }

    /**
     * Test the <code>generateDouble()</code> method.
     */
    @Test
    public void generateDoubleAccuracyMinMaxCheck()
    {
        final double min = 1.0;
        final double max = 3.0;
        final double accuracy = 10.0;

        boolean isMinFound = false;
        boolean isMaxFound = false;

        for (int i = 0; (!isMinFound || !isMaxFound) && (i < MIN_MAX_LOOP_COUNT); i++)
        {
            final double result = generator.generateDouble(min, max, accuracy);

            if (!isMinFound && (result == min))
            {
                if (IS_VERBOSE)
                {
                    System.out.println("double min found at " + i);
                }

                isMinFound = (result == min);
            }

            if (!isMaxFound && (result == max))
            {
                if (IS_VERBOSE)
                {
                    System.out.println("double max found at " + i);
                }

                isMaxFound = (result == max);
            }

            if (IS_VERBOSE)
            {
                System.out.println(i + " double result = " + result + " isMinFound ? " + isMinFound + " isMaxFound ? "
                        + isMaxFound);
            }
        }

        if (IS_VERBOSE)
        {
            System.out.println("double isMinFound ? " + isMinFound + " isMaxFound ? " + isMaxFound);
        }

        assertTrue(isMinFound);
        assertTrue(isMaxFound);
    }

    /**
     * Test the <code>generateDouble()</code> method.
     */
    @Test
    public void generateDoubleRange()
    {
        final double min = 1.2;
        final double max = 10.6;

        final double result = generator.generateDouble(min, max);

        assertTrue(min + " <= " + result + " <= " + max, (min <= result) && (result <= max));
    }

    /**
     * Test the <code>generateDouble()</code> method.
     */
    @Test
    public void generateDoubleRangeErrors()
    {
        double min = -Double.MAX_VALUE;
        double max = Double.MAX_VALUE;

        try
        {
            generator.generateDouble(min, max);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("min <= -Double.MAX_VALUE"));
        }

        min = 10.0;

        try
        {
            generator.generateDouble(min, max);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("max >= Double.MAX_VALUE"));
        }

        max = 1.0;

        try
        {
            generator.generateDouble(min, max);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Invalid range: [10.0, 1.0]"));
        }

        max = min;

        try
        {
            generator.generateDouble(min, max);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Invalid range: [10.0, 10.0]"));
        }
    }

    /**
     * Test the <code>generateDouble()</code> method.
     */
    @Test
    public void generateDoubleRangeMinMaxCheck()
    {
        final double min = 1.0;
        final double max = 3.0;

        final double delta = 0.001;

        boolean isMinFound = false;
        boolean isMaxFound = false;

        double minValue = Double.MAX_VALUE;
        double maxValue = -Double.MAX_VALUE;

        for (int i = 0; (!isMinFound || !isMaxFound) && (i < MIN_MAX_LOOP_COUNT); i++)
        {
            final double result = generator.generateDouble(min, max);

            minValue = Math.min(result, minValue);
            maxValue = Math.max(result, maxValue);

            final boolean minTest = ((result / min) - 1.0) < delta;

            if (!isMinFound && minTest)
            {
                if (IS_VERBOSE)
                {
                    System.out.println("double min found at " + i + " ratio = " + (result / min));
                }
                isMinFound = minTest;
            }

            final boolean maxTest = (1.0 - (result / max)) < delta;

            if (!isMaxFound && maxTest)
            {
                if (IS_VERBOSE)
                {
                    System.out.println("double max found at " + i + " ratio = " + (result / max));
                }
                isMaxFound = maxTest;
            }

            if (IS_VERBOSE)
            {
                System.out.println(i + " double result = " + result + " isMinFound ? " + isMinFound + " isMaxFound ? "
                        + isMaxFound);
            }
        }

        if (!isMinFound || !isMaxFound)
        {
            System.out.println("double isMinFound ? " + isMinFound + " isMaxFound ? " + isMaxFound);
            System.out.println("minValue = " + minValue + " maxValue = " + maxValue);
        }

        assertTrue(isMinFound);
        assertTrue(isMaxFound);
    }

    /**
     * Test the <code>generateInt()</code> method.
     */
    @Test
    public void generateInt()
    {
        final int min = Integer.MIN_VALUE;
        final int max = Integer.MAX_VALUE;

        final int result = generator.generateInt();

        assertTrue(min + " <= " + result + " <= " + max, (min <= result) && (result <= max));
    }

    /**
     * Test the <code>generateInt()</code> method.
     */
    @Test
    public void generateIntRange()
    {
        final int min = 1;
        final int max = 10;

        final int result = generator.generateInt(min, max);

        assertTrue(min + " <= " + result + " <= " + max, (min <= result) && (result <= max));
    }

    /**
     * Test the <code>generateInt()</code> method.
     */
    @Test
    public void generateIntRangeErrors()
    {
        int min = Integer.MIN_VALUE;
        int max = Integer.MAX_VALUE;

        try
        {
            generator.generateInt(min, max);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("min <= Integer.MIN_VALUE"));
        }

        min = Integer.MIN_VALUE + 1;

        try
        {
            generator.generateInt(min, max);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("max >= Integer.MAX_VALUE"));
        }

        min = 10;
        max = 1;

        try
        {
            generator.generateInt(min, max);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Invalid range: [10, 1]"));
        }

        max = min;

        try
        {
            generator.generateInt(min, max);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("Invalid range: [10, 10]"));
        }
    }

    /**
     * Test the <code>generateInt()</code> method.
     */
    @Test
    public void generateIntRangeMinMaxCheck()
    {
        final int min = 1;
        final int max = 3;

        boolean isMinFound = false;
        boolean isMaxFound = false;

        for (int i = 0; (!isMinFound || !isMaxFound) && (i < MIN_MAX_LOOP_COUNT); i++)
        {
            final int result = generator.generateInt(min, max);

            if (!isMinFound && (result == min))
            {
                if (IS_VERBOSE)
                {
                    System.out.println("int min found at " + i);
                }
                isMinFound = (result == min);
            }

            if (!isMaxFound && (result == max))
            {
                if (IS_VERBOSE)
                {
                    System.out.println("int max found at " + i);
                }
                isMaxFound = (result == max);
            }

            if (IS_VERBOSE)
            {
                System.out.println(i + " int result = " + result + " isMinFound ? " + isMinFound + " isMaxFound ? "
                        + isMaxFound);
            }
        }

        assertTrue(isMinFound);
        assertTrue(isMaxFound);
    }
}
