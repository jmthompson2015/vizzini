package org.vizzini.illyriad.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.ai.robot.DefaultRobotColor;
import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;

/**
 * Provides tests for the <code>BlackAndWhiteImageInputFilter</code> class.
 */
public final class BlackAndWhiteImageInputFilterTest
{
    /** Flag indicating whether test output should be verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Image to input converter. */
    private final BlackAndWhiteImageInputFilter converter = new BlackAndWhiteImageInputFilter(70, 16);

    /** Robot image I/O. */
    private final RobotImageIO imageIo = new RobotImageIO();

    /**
     * Test the <code>convertToBlackAndWhite()</code> method.
     */
    @Test
    public void convertToBlackAndWhiteTooLarge()
    {
        final BlackAndWhiteImageInputFilter myConverter = new BlackAndWhiteImageInputFilter(12, 16);
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
        assertThat(result.length, is(70 * 16));

        final int maxWidth = converter.getMaxWidth();
        final int maxHeight = converter.getMaxHeight();
        final RobotColor gray = DefaultRobotColor.GRAY;
        final int xOffset = computeOffset(maxWidth, width);
        final int yOffset = computeOffset(maxHeight, height);
        assertThat(xOffset, is(26));
        assertThat(yOffset, is(4));

        for (int j = 0; j < maxHeight; j++)
        {
            for (int i = 0; i < maxWidth; i++)
            {
                final int index = (j * maxWidth) + i;

                if ((xOffset <= i) && (i < (xOffset + width)) && (yOffset <= j) && (j < (yOffset + height)))
                {
                    final RobotColor sourceColor = source.getPixel(i - xOffset, j - yOffset);

                    if (sourceColor.isDarkerThan(gray))
                    {
                        assertThat("result[" + index + "]", result[index], is(0.0));
                    }
                    else
                    {
                        assertThat("result[" + index + "]", result[index], is(1.0));
                    }
                }
                else
                {
                    assertThat("result[" + index + "]", result[index], is(1.0));
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
            assertThat(e.getMessage(), is("input is null"));
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
