package org.vizzini.illyriad.robot.market;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.io.InputStream;

import org.junit.Test;
import org.vizzini.ai.robot.DefaultRobotColor;
import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.illyriad.robot.ImageFilter;

/**
 * Provides tests for the <code>PriceImageFilter</code> class.
 */
public final class PriceImageFilterTest
{
    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filter()
    {
        final RobotImage rowImage = getImage();
        final ImageFilter filter = new PriceImageFilter();

        final RobotImage result = filter.filter(rowImage);

        assertNotNull(result);

        final int width = result.getWidth();
        final int height = result.getHeight();

        assertThat(width, is(15));
        assertThat(height, is(7));

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = result.getPixel(i, j);
                assertTrue(color.equals(DefaultRobotColor.BLACK) || color.equals(DefaultRobotColor.WHITE));
            }
        }
    }

    /**
     * Test the <code>filter()</code> method.
     */
    @Test
    public void filterNull()
    {
        final ImageFilter filter = new PriceImageFilter();

        // Null rowImage.
        final RobotImage result = filter.filter(null);
        assertNull(result);
    }

    /**
     * Test the <code>getConfiguration()</code> method.
     */
    @Test
    public void getConfiguration()
    {
        final PriceImageFilter filter = new PriceImageFilter();

        final PriceImageFilterConfiguration config = filter.getConfiguration();

        assertNotNull(config);
        assertThat(config, is(PriceImageFilterConfiguration.class));
    }

    /**
     * @return a new row image.
     */
    private RobotImage getImage()
    {
        final InputStream inputStream = getClass().getResourceAsStream(
                "/marketData/capturedImages/Bow_Bid_20131204.png");
        final RobotImageIO imageIo = new RobotImageIO();

        return imageIo.read(inputStream);
    }
}
