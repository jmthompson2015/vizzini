package org.vizzini.illyriad.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;

/**
 * Provides tests for the <code>GrayScaleImageInputFilter</code> class.
 */
public final class GrayScaleImageInputFilterTest
{
    /** Flag indicating whether test output should be verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Image to input converter. */
    private final GrayScaleImageInputFilter converter = new GrayScaleImageInputFilter(70, 16);

    /** Robot image I/O. */
    private final RobotImageIO imageIo = new RobotImageIO();

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter()
    {
        final RobotImage source = imageIo.read("/captured-images/Wood_Ask_20131107.png");
        if (IS_VERBOSE)
        {
            System.out.println("source width, height = " + source.getWidth() + ", " + source.getHeight());
        }

        final double[] result = converter.filter(source);

        assertNotNull(result);
        assertThat(result.length, is(70 * 16));

        final int maxWidth = converter.getMaxWidth();
        final int maxHeight = converter.getMaxHeight();

        for (int j = 0; j < maxHeight; j++)
        {
            for (int i = 0; i < maxWidth; i++)
            {
                final int index = (j * maxWidth) + i;

                assertTrue((0.0 <= result[index]) && (result[index] <= 1.0));
            }
        }

        {
            final int index = (0 * maxWidth) + 0;
            assertEquals("result[" + index + "]", 1.0, result[index], 0.0001);
        }

        {
            final int index = (8 * maxWidth) + 0;
            assertEquals("result[" + index + "]", 1.0, result[index], 0.0001);
        }

        {
            final int index = (0 * maxWidth) + 35;
            assertEquals("result[" + index + "]", 1.0, result[index], 0.0001);
        }

        {
            final int index = (3 * maxWidth) + 3;
            assertEquals("result[" + index + "]", 1.0, result[index], 0.0001);
        }

        {
            final int index = (8 * maxWidth) + 35;
            assertEquals("result[" + index + "]", 0.6078, result[index], 0.0001);
        }
    }

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filterNull()
    {
        try
        {
            converter.filter(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("source is null"));
        }
    }

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filterTooLarge()
    {
        final GrayScaleImageInputFilter myConverter = new GrayScaleImageInputFilter(12, 16);
        final RobotImage source = imageIo.read("/captured-images/Wood_Ask_20131107.png");

        try
        {
            myConverter.filter(source);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("source dimensions exceed maximums: 18, 7 > 12, 16"));
        }
    }
}
