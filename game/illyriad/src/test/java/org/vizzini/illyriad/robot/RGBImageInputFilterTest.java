package org.vizzini.illyriad.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;

/**
 * Provides tests for the <code>RGBImageInputFilter</code> class.
 */
public final class RGBImageInputFilterTest
{
    /** Flag indicating whether test output should be verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Image to input converter. */
    private final RGBImageInputFilter converter = new RGBImageInputFilter(70, 16);

    /** Robot image I/O. */
    private final RobotImageIO imageIo = new RobotImageIO();

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter()
    {
        final RobotImage source = imageIo.read("/captured-images/Wood_Ask_20131107.png");
        final int width = source.getWidth();
        final int height = source.getHeight();
        if (IS_VERBOSE)
        {
            System.out.println("source width, height = " + source.getWidth() + ", " + source.getHeight());
        }

        final double[] result = converter.filter(source);

        assertNotNull(result);
        assertThat(result.length, is(3 * 70 * 16));

        final int maxWidth = converter.getMaxWidth();
        final int maxHeight = converter.getMaxHeight();
        final int xOffset = computeOffset(maxWidth, width);
        final int yOffset = computeOffset(maxHeight, height);
        assertThat(xOffset, is(26));
        assertThat(yOffset, is(4));

        for (int j = 0; j < maxHeight; j++)
        {
            for (int i = 0; i < maxWidth; i++)
            {
                final int index = 3 * ((j * maxWidth) + i);

                if ((xOffset <= i) && (i < (xOffset + width)) && (yOffset <= j) && (j < (yOffset + height)))
                {
                    final RobotColor sourceColor = source.getPixel(i - xOffset, j - yOffset);

                    assertThat("result[" + index + "]", result[index], is(sourceColor.getRed() / 255.0));
                    assertThat("result[" + index + "]", result[index + 1], is(sourceColor.getGreen() / 255.0));
                    assertThat("result[" + index + "]", result[index + 2], is(sourceColor.getBlue() / 255.0));
                }
                else
                {
                    assertThat("result[" + index + "]", result[index], is(1.0));
                    assertThat("result[" + index + "]", result[index + 1], is(1.0));
                    assertThat("result[" + index + "]", result[index + 2], is(1.0));
                }
            }
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
        final RGBImageInputFilter myConverter = new RGBImageInputFilter(12, 16);
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

    /**
     * @param max Maximum value.
     * @param value Value.
     * 
     * @return the offset necessary to center the image.
     */
    private int computeOffset(final int max, final int value)
    {
        return (int)Math.floor((max - value) / 2.0);
    }
}
