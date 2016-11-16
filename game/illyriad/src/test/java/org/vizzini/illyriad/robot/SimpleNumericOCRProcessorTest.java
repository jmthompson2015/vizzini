package org.vizzini.illyriad.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Ignore;
import org.junit.Test;
import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;

/**
 * Provides tests for the <code>SimpleNumericOCRProcessor</code> class.
 */
public final class SimpleNumericOCRProcessorTest
{
    /** Flag indicating whether test output should be verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Robot image I/O. */
    private final RobotImageIO imageIo = new RobotImageIO();

    /**
     * Test the <code>process()</code> method.
     */
    @Ignore
    @Test
    public void processClayAsk()
    {
        final OCRProcessor ocrProcessor = createOcrProcessor();
        final RobotImage image = imageIo.read("/captured-images/Clay_Ask_20131107.png");

        final String result = ocrProcessor.process(image);

        assertNotNull(result);
        assertThat(result, is("0.64"));
    }

    /**
     * Test the <code>process()</code> method.
     */
    @Ignore
    @Test
    public void processClayBid()
    {
        final OCRProcessor ocrProcessor = createOcrProcessor();
        final RobotImage image = imageIo.read("/captured-images/Clay_Bid_20131107.png");

        final String result = ocrProcessor.process(image);

        assertNotNull(result);
        assertThat(result, is("0.65"));
    }

    /**
     * Test the <code>process()</code> method.
     */
    @Ignore
    @Test
    public void processFoodAsk()
    {
        final OCRProcessor ocrProcessor = createOcrProcessor();
        final RobotImage image = imageIo.read("/captured-images/Food_Ask_20131107.png");

        final String result = ocrProcessor.process(image);

        assertNotNull(result);
        assertThat(result, is("1.99"));
    }

    /**
     * Test the <code>process()</code> method.
     */
    @Ignore
    @Test
    public void processFoodBid()
    {
        final OCRProcessor ocrProcessor = createOcrProcessor();
        final RobotImage image = imageIo.read("/captured-images/Food_Bid_20131107.png");

        final String result = ocrProcessor.process(image);

        assertNotNull(result);
        assertThat(result, is("1.751"));
    }

    /**
     * Test the <code>process()</code> method.
     */
    @Ignore
    @Test
    public void processIronAsk()
    {
        final OCRProcessor ocrProcessor = createOcrProcessor();
        final RobotImage image = imageIo.read("/captured-images/Iron_Ask_20131107.png");

        final String result = ocrProcessor.process(image);

        assertNotNull(result);
        assertThat(result, is("0.42"));
    }

    /**
     * Test the <code>process()</code> method.
     */
    @Ignore
    @Test
    public void processIronBid()
    {
        final OCRProcessor ocrProcessor = createOcrProcessor();
        final RobotImage image = imageIo.read("/captured-images/Iron_Bid_20131107.png");

        final String result = ocrProcessor.process(image);

        assertNotNull(result);
        assertThat(result, is("0.7"));
    }

    /**
     * Test the <code>process()</code> method.
     */
    @Ignore
    @Test
    public void processStoneAsk()
    {
        final OCRProcessor ocrProcessor = createOcrProcessor();
        final RobotImage image = imageIo.read("/captured-images/Stone_Ask_20131107.png");

        final String result = ocrProcessor.process(image);

        assertNotNull(result);
        assertThat(result, is("0.4"));
    }

    /**
     * Test the <code>process()</code> method.
     */
    @Ignore
    @Test
    public void processStoneBid()
    {
        final OCRProcessor ocrProcessor = createOcrProcessor();
        final RobotImage image = imageIo.read("/captured-images/Stone_Bid_20131107.png");

        final String result = ocrProcessor.process(image);

        assertNotNull(result);
        assertThat(result, is("1.15"));
    }

    /**
     * Test the <code>process()</code> method.
     */
    @Ignore
    @Test
    public void processWoodAsk()
    {
        final OCRProcessor ocrProcessor = createOcrProcessor();
        final RobotImage image = imageIo.read("/captured-images/Wood_Ask_20131107.png");

        if (IS_VERBOSE)
        {
            for (int j = 0; j < image.getHeight(); j++)
            {
                final RobotColor color = image.getPixel(54, j);
                System.out.println("test image rgb (54, " + j + ") = " + color.getRGB() + " " + color);
            }
        }

        final String result = ocrProcessor.process(image);

        assertNotNull(result);
        assertThat(result, is("0.87"));
    }

    /**
     * Test the <code>process()</code> method.
     */
    @Ignore
    @Test
    public void processWoodBid()
    {
        final OCRProcessor ocrProcessor = createOcrProcessor();
        final RobotImage image = imageIo.read("/captured-images/Wood_Bid_20131107.png");

        final String result = ocrProcessor.process(image);

        assertNotNull(result);
        assertThat(result, is("0.65"));
    }

    /**
     * @return a new OCR processor.
     */
    private OCRProcessor createOcrProcessor()
    {
        return new SimpleNumericOCRProcessor();
    }
}
