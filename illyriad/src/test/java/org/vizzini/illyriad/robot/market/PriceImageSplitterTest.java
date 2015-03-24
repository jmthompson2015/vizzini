package org.vizzini.illyriad.robot.market;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.io.InputStream;
import java.util.List;

import org.junit.Test;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.illyriad.robot.ImageSplitter;

/**
 * Provides tests for the <code>PriceImageSplitter</code> class.
 */
public final class PriceImageSplitterTest
{
    /**
     * Test the <code>getDigitWidth()</code> method.
     */
    @Test
    public void getDigitWidth()
    {
        final PriceImageSplitter splitter = new PriceImageSplitter();

        final int result = splitter.getDigitWidth();

        assertThat(result, is(5));
    }

    /**
     * Test the <code>split()</code> method.
     */
    @Test
    public void split()
    {
        final RobotImage image = getImage();
        final ImageSplitter splitter = new PriceImageSplitter();

        final List<RobotImage> result = splitter.split(image);

        assertNotNull(result);
        assertThat(result.size(), is(5));
        assertThat(result.get(0).getWidth(), is(5));
        assertThat(result.get(1).getWidth(), is(2));
        assertThat(result.get(2).getWidth(), is(4));
        assertThat(result.get(3).getWidth(), is(5));
        assertThat(result.get(4).getWidth(), is(4));
    }

    /**
     * Test the <code>split()</code> method.
     */
    @Test
    public void splitNull()
    {
        final ImageSplitter splitter = new PriceImageSplitter();

        final List<RobotImage> result = splitter.split(null);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    /**
     * Test the <code>PriceImageSplitter()</code> method.
     */
    @Test
    public void testConstructorDigitWidth()
    {
        final PriceImageSplitter splitter = new PriceImageSplitter(78);

        final int result = splitter.getDigitWidth();

        assertThat(result, is(78));
    }

    /**
     * @return a new image.
     */
    private RobotImage getImage()
    {
        final InputStream inputStream = getClass().getResourceAsStream("/Adventurer's+Sword_Ask.png");
        final RobotImageIO imageIo = new RobotImageIO();

        return imageIo.read(inputStream);
    }
}
