package org.vizzini.illyriad.robot.market;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import java.io.InputStream;

import org.junit.Test;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.illyriad.robot.ImageFilter;

/**
 * Provides tests for the <code>RowImageFilter</code> class.
 */
public final class RowImageFilterTest
{
    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter0()
    {
        final RobotImage rowImage = getRowImage0();
        final ImageFilter processor = new RowImageFilter();

        final RobotImage result = processor.filter(rowImage);

        assertNotNull(result);
        assertThat(result.getWidth(), is(24));
        assertThat(result.getHeight(), is(29));
    }

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter1()
    {
        final RobotImage rowImage = getRowImage1();
        final ImageFilter processor = new RowImageFilter();

        final RobotImage result = processor.filter(rowImage);

        assertNotNull(result);
        assertThat(result.getWidth(), is(3));
        assertThat(result.getHeight(), is(29));
    }

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filterNull()
    {
        final ImageFilter processor = new RowImageFilter();

        // Null rowImage.
        final RobotImage result = processor.filter(null);
        assertNull(result);
    }

    /**
     * Test the <code>getMinGap()</code> method.
     */
    @Test
    public void getMinGap()
    {
        final RowImageFilter processor = new RowImageFilter();

        final int result = processor.getMinGap();

        assertThat(result, is(4));
    }

    /**
     * @return a new row image.
     */
    private RobotImage getRowImage0()
    {
        final InputStream inputStream = getClass().getResourceAsStream(
                "/marketData/rows/Arctic+Bow_Ask_Row_20131204.png");
        final RobotImageIO imageIo = new RobotImageIO();

        return imageIo.read(inputStream);
    }

    /**
     * @return a new row image.
     */
    private RobotImage getRowImage1()
    {
        final InputStream inputStream = getClass().getResourceAsStream("/marketData/rows/Wood_Ask_Row_20131220.png");
        final RobotImageIO imageIo = new RobotImageIO();

        return imageIo.read(inputStream);
    }
}
