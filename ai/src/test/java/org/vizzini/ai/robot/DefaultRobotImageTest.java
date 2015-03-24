package org.vizzini.ai.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.awt.Point;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.io.FileUtils;
import org.junit.BeforeClass;
import org.junit.Test;

/**
 * Provides tests for the <code>DefaultRobotImage</code> class.
 */
public final class DefaultRobotImageTest
{
    /** Flag indicating whether test output is verbose. */
    private static final boolean IS_VERBOSE = false;

    /** Image directory. */
    private static final String IMAGE_DIR = "/captured-images/";

    /** Image. */
    private static final RobotImage CLAY_ASK;

    /** Image. */
    private static final RobotImage CLAY_BID;

    /** Image. */
    private static final RobotImage WOOD_ASK;

    /** Image. */
    private static final RobotImage WOOD_ASK_ROW;

    /** Image. */
    private static final RobotImage WOOD_BID;

    static
    {
        final RobotImageIO imageIo = new RobotImageIO();

        CLAY_ASK = imageIo.read(IMAGE_DIR + "Clay_Ask_20131107.png");
        CLAY_BID = imageIo.read(IMAGE_DIR + "Clay_Bid_20131107.png");

        WOOD_ASK = imageIo.read(IMAGE_DIR + "Wood_Ask_20131107.png");
        WOOD_ASK_ROW = imageIo.read(IMAGE_DIR + "Wood_Ask_Row_20131130.png");
        WOOD_BID = imageIo.read(IMAGE_DIR + "Wood_Bid_20131107.png");
    }

    /**
     * Set up the class.
     */
    @BeforeClass
    public static void setUpClass()
    {
        // Delete output directory.
        final File file = new File("ai/target/captured-images/");

        try
        {
            FileUtils.deleteDirectory(file);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /** Robot image I/O. */
    private final RobotImageIO imageIo = new RobotImageIO();

    /** Minimum gap between regions. */
    private final int minGap = 5;

    /**
     * Test the <code>countColorOccurrences()</code> method.
     */
    @Test
    public void countColorOccurrencesWoodAsk()
    {
        final Map<RobotColor, Integer> result = WOOD_ASK.countColorOccurrences();

        assertNotNull(result);

        final Iterator<RobotColor> keyIter = result.keySet().iterator();
        RobotColor color = keyIter.next();

        assertThat(result.get(color), is(7));
        assertThat("red", color.getRed(), is(25));
        assertThat("green", color.getGreen(), is(16));
        assertThat("blue", color.getBlue(), is(4));
        assertThat("alpha", color.getAlpha(), is(255));

        // Second color.
        color = keyIter.next();

        assertThat(result.get(color), is(1));
        assertThat("red", color.getRed(), is(25));
        assertThat("green", color.getGreen(), is(15));
        assertThat("blue", color.getBlue(), is(27));
        assertThat("alpha", color.getAlpha(), is(255));

        // Last color.
        while (keyIter.hasNext())
        {
            color = keyIter.next();
        }

        assertThat(result.get(color), is(1));
        assertThat("red", color.getRed(), is(240));
        assertThat("green", color.getGreen(), is(231));
        assertThat("blue", color.getBlue(), is(191));
        assertThat("alpha", color.getAlpha(), is(255));
    }

    /**
     * Test the <code>dilate()</code> method.
     */
    @Test
    public void dilateBowsBid()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Bows_Bid_20131204.png");
        final double thresholdColorScale = 1.37;
        final RobotColor thresholdColor = image.getMidrangeColor().scale(thresholdColorScale);

        final RobotImage result = image.dilate(thresholdColor);

        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/dilate_bowsBid", result);
        }
    }

    /**
     * Test the <code>dilate()</code> method.
     */
    @Test
    public void dilateBowsBidUntrimmed()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Bows_Bid_20131204_untrimmed.png");
        final double thresholdColorScale = 1.37;
        final RobotColor thresholdColor = image.getMidrangeColor().scale(thresholdColorScale);

        final RobotImage result = image.dilate(thresholdColor);

        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/dilate_bowsBidUntrimmed", result);
        }
    }

    /**
     * Test the <code>dilate()</code> method.
     */
    @Test
    public void dilateErodeBowsBid()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Bows_Bid_20131204.png");
        final double thresholdColorScale = 1.37;
        final RobotColor thresholdColor = image.getMidrangeColor().scale(thresholdColorScale);

        final RobotImage dilated = image.dilate(thresholdColor);
        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/dilated_bowsBid", dilated);
        }

        final RobotImage result = dilated.erode(thresholdColor);
        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/dilated_eroded_bowsBid", result);
        }
    }

    /**
     * Test the <code>dilate()</code> method.
     */
    @Test
    public void dilateErodeBowsBidUntrimmed()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Bows_Bid_20131204_untrimmed.png");
        final double thresholdColorScale = 1.37;
        final RobotColor thresholdColor = image.getMidrangeColor().scale(thresholdColorScale);

        final RobotImage dilated = image.dilate(thresholdColor);
        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/dilated_bowsBid", dilated);
        }

        final RobotImage result = dilated.erode(thresholdColor);
        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/dilated_eroded_bowsBidUntrimmed", result);
        }
    }

    /**
     * Test the <code>erode()</code> method.
     */
    @Test
    public void erodeBowsBid()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Bows_Bid_20131204.png");
        final double thresholdColorScale = 1.37;
        final RobotColor thresholdColor = image.getMidrangeColor().scale(thresholdColorScale);

        final RobotImage result = image.erode(thresholdColor);

        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/erode_bowsBid", result);
        }
    }

    /**
     * Test the <code>erode()</code> method.
     */
    @Test
    public void erodeBowsBidUntrimmed()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Bows_Bid_20131204_untrimmed.png");
        final double thresholdColorScale = 1.37;
        final RobotColor thresholdColor = image.getMidrangeColor().scale(thresholdColorScale);

        final RobotImage result = image.erode(thresholdColor);

        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/erode_bowsBidUntrimmed", result);
        }
    }

    /**
     * Test the <code>dilate()</code> method.
     */
    @Test
    public void erodeDilateBowsBid()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Bows_Bid_20131204.png");
        final double thresholdColorScale = 1.37;
        final RobotColor thresholdColor = image.getMidrangeColor().scale(thresholdColorScale);

        final RobotImage eroded = image.erode(thresholdColor);
        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/eroded_bowsBid", eroded);
        }

        final RobotImage result = eroded.dilate(thresholdColor);
        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/eroded_dilated_bowsBid", result);
        }
    }

    /**
     * Test the <code>dilate()</code> method.
     */
    @Test
    public void erodeDilateBowsBidUntrimmed()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Bows_Bid_20131204_untrimmed.png");
        final double thresholdColorScale = 1.37;
        final RobotColor thresholdColor = image.getMidrangeColor().scale(thresholdColorScale);

        final RobotImage eroded = image.erode(thresholdColor);
        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/eroded_bowsBid", eroded);
        }

        final RobotImage result = eroded.dilate(thresholdColor);
        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/eroded_dilated_bowsBidUntrimmed", result);
        }
    }

    /**
     * Test the <code>getAbsoluteOrigin()</code> method.
     */
    @Test
    public void getAbsoluteOrigin()
    {
        final Point result = WOOD_ASK.getAbsoluteOrigin();

        assertNotNull(result);
        assertThat(result.x, is(0));
        assertThat(result.y, is(0));
    }

    /**
     * Test the <code>getAbsoluteOrigin()</code> method.
     */
    @Test
    public void getAbsoluteOriginSubImage()
    {
        final RobotImage image = (RobotImage)WOOD_ASK.getSubimage(10, 3, 5, 4);
        final Point result = image.getAbsoluteOrigin();

        assertNotNull(result);
        assertThat(result.x, is(10));
        assertThat(result.y, is(3));
    }

    /**
     * Test the <code>getAbsoluteOrigin()</code> method.
     */
    @Test
    public void getAbsoluteOriginSubSubImage()
    {
        final RobotImage image1 = (RobotImage)WOOD_ASK.getSubimage(10, 2, 8, 5);
        final RobotImage image2 = (RobotImage)image1.getSubimage(2, 3, image1.getWidth() - 2, image1.getHeight() - 3);

        if (IS_VERBOSE)
        {
            System.out.println("0 bounds = " + WOOD_ASK.getAbsoluteOrigin().x + " " + WOOD_ASK.getAbsoluteOrigin().y
                    + " " + WOOD_ASK.getWidth() + " " + WOOD_ASK.getHeight());
            System.out.println("1 bounds = " + image1.getAbsoluteOrigin().x + " " + image1.getAbsoluteOrigin().y + " "
                    + image1.getWidth() + " " + image1.getHeight());
            System.out.println("2 bounds = " + image2.getAbsoluteOrigin().x + " " + image2.getAbsoluteOrigin().y + " "
                    + image2.getWidth() + " " + image2.getHeight());
        }

        final Point result = image2.getAbsoluteOrigin();

        assertNotNull(result);
        assertThat(result.x, is(12));
        assertThat(result.y, is(5));
    }

    /**
     * Test the <code>getMaximumColor()</code> method.
     */
    @Test
    public void getMaximumColor()
    {
        final RobotColor result = WOOD_ASK.getMaximumColor();

        assertNotNull(result);
        assertThat("red", result.getRed(), is(240));
        assertThat("green", result.getGreen(), is(232));
        assertThat("blue", result.getBlue(), is(191));
        assertThat("alpha", result.getAlpha(), is(255));
    }

    /**
     * Test the <code>getMeanColor()</code> method.
     */
    @Test
    public void getMeanColor()
    {
        final RobotColor result = WOOD_ASK.getMeanColor();

        assertNotNull(result);
        assertThat("red", result.getRed(), is(155));
        assertThat("green", result.getGreen(), is(145));
        assertThat("blue", result.getBlue(), is(120));
        assertThat("alpha", result.getAlpha(), is(255));
    }

    /**
     * Test the <code>getMedianColor()</code> method.
     */
    @Test
    public void getMedianColorWoodAsk()
    {
        final RobotColor result = WOOD_ASK.getMedianColor();

        assertNotNull(result);
        assertThat("red", result.getRed(), is(224));
        assertThat("green", result.getGreen(), is(175));
        assertThat("blue", result.getBlue(), is(90));
        assertThat("alpha", result.getAlpha(), is(255));
    }

    /**
     * Test the <code>getMedianColor()</code> method.
     */
    @Test
    public void getMedianColorWoodAskRow()
    {
        final RobotColor result = WOOD_ASK_ROW.getMedianColor();

        assertNotNull(result);
        assertThat("red", result.getRed(), is(238));
        assertThat("green", result.getGreen(), is(230));
        assertThat("blue", result.getBlue(), is(188));
        assertThat("alpha", result.getAlpha(), is(255));
    }

    /**
     * Test the <code>getMidrangeColor()</code> method.
     */
    @Test
    public void getMidrangeColor()
    {
        final RobotColor result = WOOD_ASK.getMidrangeColor();

        assertNotNull(result);
        assertThat("red", result.getRed(), is(133));
        assertThat("green", result.getGreen(), is(119));
        assertThat("blue", result.getBlue(), is(98));
        assertThat("alpha", result.getAlpha(), is(255));
    }

    /**
     * Test the <code>getMinimumColor()</code> method.
     */
    @Test
    public void getMinimumColor()
    {
        final RobotColor result = WOOD_ASK.getMinimumColor();

        assertNotNull(result);
        assertThat("red", result.getRed(), is(25));
        assertThat("green", result.getGreen(), is(6));
        assertThat("blue", result.getBlue(), is(4));
        assertThat("alpha", result.getAlpha(), is(255));
    }

    /**
     * Test the <code>getModeColor()</code> method.
     */
    @Test
    public void getModeColorWoodAsk()
    {
        final RobotColor result = WOOD_ASK.getModeColor();

        assertNotNull(result);
        assertThat("red", result.getRed(), is(25));
        assertThat("green", result.getGreen(), is(16));
        assertThat("blue", result.getBlue(), is(4));
        assertThat("alpha", result.getAlpha(), is(255));
    }

    /**
     * Test the <code>getModeColor()</code> method.
     */
    @Test
    public void getModeColorWoodAskRow()
    {
        final RobotColor result = WOOD_ASK_ROW.getModeColor();

        assertNotNull(result);
        assertThat("red", result.getRed(), is(240));
        assertThat("green", result.getGreen(), is(231));
        assertThat("blue", result.getBlue(), is(188));
        assertThat("alpha", result.getAlpha(), is(255));
    }

    /**
     * Test the <code>getOrigin()</code> method.
     */
    @Test
    public void getOrigin()
    {
        final Point result = WOOD_ASK.getOrigin();

        assertNotNull(result);
        assertThat(result.x, is(0));
        assertThat(result.y, is(0));
    }

    /**
     * Test the <code>getOrigin()</code> method.
     */
    @Test
    public void getOriginSubImage()
    {
        final RobotImage image = (RobotImage)WOOD_ASK.getSubimage(10, 3, 5, 4);
        final Point result = image.getOrigin();

        assertNotNull(result);
        assertThat(result.x, is(10));
        assertThat(result.y, is(3));
    }

    /**
     * Test the <code>normalize()</code> method.
     */
    @Test
    public void normalizeWoodAsk()
    {
        final RobotImage source = WOOD_ASK;
        final RobotImage result = source.normalize();

        assertNotNull(result);

        final RobotColor minColor = result.getMinimumColor();
        assertNotNull(minColor);
        assertThat("red", minColor.getRed(), is(0));
        assertThat("green", minColor.getGreen(), is(0));
        assertThat("blue", minColor.getBlue(), is(0));
        assertThat("alpha", minColor.getAlpha(), is(255));

        final RobotColor maxColor = result.getMaximumColor();
        assertNotNull(maxColor);
        assertThat("red", maxColor.getRed(), is(255));
        assertThat("green", maxColor.getGreen(), is(255));
        assertThat("blue", maxColor.getBlue(), is(255));
        assertThat("alpha", maxColor.getAlpha(), is(255));
    }

    /**
     * Test the <code>normalize()</code> method.
     */
    @Test
    public void normalizeWoodBid()
    {
        final RobotImage source = WOOD_BID;
        final RobotImage result = source.normalize();

        assertNotNull(result);

        final RobotColor minColor = result.getMinimumColor();
        assertNotNull(minColor);
        assertThat("red", minColor.getRed(), is(0));
        assertThat("green", minColor.getGreen(), is(0));
        assertThat("blue", minColor.getBlue(), is(0));
        assertThat("alpha", minColor.getAlpha(), is(255));

        final RobotColor maxColor = result.getMaximumColor();
        assertNotNull(maxColor);
        assertThat("red", maxColor.getRed(), is(255));
        assertThat("green", maxColor.getGreen(), is(255));
        assertThat("blue", maxColor.getBlue(), is(255));
        assertThat("alpha", maxColor.getAlpha(), is(255));
    }

    /**
     * Test the <code>replaceAllDarkerThan()</code> method.
     */
    @Test
    public void replaceAllDarkerThan()
    {
        final RobotImage source = WOOD_ASK;
        assertNotNull(source);
        assertThat(source.getRGB(1, 1), is(-10118752));
        final RobotColor thresholdColor = new DefaultRobotColor(180, 180, 180);
        final RobotColor replacementColor = DefaultRobotColor.BLACK;

        final RobotImage result = source.replaceAllDarkerThan(thresholdColor, replacementColor);

        assertNotNull(result);
        assertThat(result.getRGB(1, 1), is(replacementColor.getRGB()));
    }

    /**
     * Test the <code>replaceAllDarkerThan()</code> method.
     */
    @Test
    public void replaceAllDarkerThanNull()
    {
        final RobotImage source = WOOD_ASK;
        final RobotColor thresholdColor = DefaultRobotColor.GRAY;
        final RobotColor replacementColor = DefaultRobotColor.BLACK;

        try
        {
            source.replaceAllDarkerThan(null, replacementColor);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("thresholdColor is null"));
        }

        try
        {
            source.replaceAllDarkerThan(thresholdColor, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("replacementColor is null"));
        }
    }

    /**
     * Test the <code>replaceAllLighterThan()</code> method.
     */
    @Test
    public void replaceAllLighterThan()
    {
        final RobotImage source = WOOD_ASK;
        assertNotNull(source);
        assertThat(source.getRGB(0, 0), is(-1785216));
        final RobotColor thresholdColor = new DefaultRobotColor(180, 180, 180);
        final RobotColor replacementColor = DefaultRobotColor.WHITE;

        final RobotImage result = source.replaceAllLighterThan(thresholdColor, replacementColor);

        assertNotNull(result);
        assertThat(result.getRGB(0, 0), is(replacementColor.getRGB()));
    }

    /**
     * Test the <code>replaceAllLighterThan()</code> method.
     */
    @Test
    public void replaceAllLighterThanNull()
    {
        final RobotImage source = WOOD_ASK;
        final RobotColor thresholdColor = DefaultRobotColor.GRAY;
        final RobotColor replacementColor = DefaultRobotColor.BLACK;

        try
        {
            source.replaceAllLighterThan(null, replacementColor);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("thresholdColor is null"));
        }

        try
        {
            source.replaceAllLighterThan(thresholdColor, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("replacementColor is null"));
        }
    }

    /**
     * Test the <code>replaceAllUsingThreshold()</code> method.
     */
    @Test
    public void replaceAllUsingThreshold()
    {
        final RobotImage source = WOOD_ASK;
        final RobotColor thresholdColor = DefaultRobotColor.GRAY;
        final RobotColor darkerReplacementColor = DefaultRobotColor.RED;
        final RobotColor lighterReplacementColor = DefaultRobotColor.YELLOW;
        final RobotImage result = source.replaceAllUsingThreshold(thresholdColor, darkerReplacementColor,
                lighterReplacementColor);

        assertNotNull(result);

        final int width = result.getWidth();
        final int height = result.getHeight();

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = result.getPixel(i, j);
                assertTrue(DefaultRobotColor.RED.equals(color) || DefaultRobotColor.YELLOW.equals(color));
            }
        }
    }

    /**
     * Test the <code>replaceAllUsingThreshold()</code> method.
     */
    @Test
    public void replaceAllUsingThresholdNull()
    {
        final RobotImage source = WOOD_ASK;
        final RobotColor thresholdColor = DefaultRobotColor.GRAY;
        final RobotColor darkerReplacementColor = DefaultRobotColor.RED;
        final RobotColor lighterReplacementColor = DefaultRobotColor.YELLOW;

        try
        {
            source.replaceAllUsingThreshold(null, darkerReplacementColor, lighterReplacementColor);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("thresholdColor is null"));
        }

        try
        {
            source.replaceAllUsingThreshold(thresholdColor, null, lighterReplacementColor);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("darkerReplacementColor is null"));
        }

        try
        {
            source.replaceAllUsingThreshold(thresholdColor, darkerReplacementColor, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("lighterReplacementColor is null"));
        }
    }

    /**
     * Test the <code>splitAlongHorizontalLine()</code> method.
     */
    @Test
    public void splitAlongHorizontalLineHorses()
    {
        final RobotImage image = imageIo.read("/resourceItemsHorses.png");
        final RobotColor thresholdColor = image.getMidrangeColor();

        final List<RobotImage> result = image.splitAlongHorizontalLine(thresholdColor);

        writeImages("ai/target/captured-images/horsesTest_", result);

        verifyHorizontalSplit(result, 18, thresholdColor);
    }

    /**
     * Test the <code>splitAlongHorizontalLine()</code> method.
     */
    @Test
    public void splitAlongHorizontalLineNull()
    {
        final RobotImage image = WOOD_ASK;

        try
        {
            image.splitAlongHorizontalLine(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("thresholdColor is null"));
        }
    }

    /**
     * Test the <code>splitAlongHorizontalLine()</code> method.
     */
    @Test
    public void splitAlongHorizontalLineStart()
    {
        final RobotImage image = imageIo.read("/resourceItemsStart.png");
        final RobotColor thresholdColor = image.getMidrangeColor();

        final List<RobotImage> result = image.splitAlongHorizontalLine(thresholdColor);

        verifyHorizontalSplit(result, 18, thresholdColor);
    }

    /**
     * Test the <code>splitAlongHorizontalLine()</code> method.
     */
    @Test
    public void splitAlongHorizontalLineSwords()
    {
        final RobotImage image = imageIo.read("/resourceItemsSwords.png");
        final RobotColor thresholdColor = image.getMidrangeColor().scale(1.46);

        if (IS_VERBOSE)
        {
            System.out.println("getMeanColor()     = " + image.getMeanColor());
            System.out.println("getMedianColor()   = " + image.getMedianColor());
            System.out.println("getMidrangeColor() = " + image.getMidrangeColor());
            System.out.println("getModeColor()     = " + image.getModeColor());
            System.out.println("thresholdColor     = " + thresholdColor);
        }

        final List<RobotImage> result = image.splitAlongHorizontalLine(thresholdColor);

        writeImages("ai/target/captured-images/swordsTest_", result);

        // Last one is a partial.
        verifyHorizontalSplit(result, 19, thresholdColor);
    }

    /**
     * Test the <code>splitAlongVerticalLine()</code> method.
     */
    @Test
    public void splitAlongVerticalLineBattlebredBid()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Battlebred_Bid_20131107.png");
        final RobotColor thresholdColor = image.getMidrangeColor();
        if (IS_VERBOSE)
        {
            System.out.println("thresholdColor = " + thresholdColor);
        }

        final List<RobotImage> result = image.splitAlongVerticalLine(thresholdColor);

        writeImages("ai/target/captured-images/battlebredBid_", result);

        verifyVerticalSplit(result, 3, thresholdColor, 0);
    }

    /**
     * Test the <code>splitAlongVerticalLine()</code> method.
     */
    @Test
    public void splitAlongVerticalLineBowsBid()
    {
        RobotImage image = imageIo.read(IMAGE_DIR + "Bows_Bid_20131204.png");
        final float[] scaleFactors = new float[] { 3.0f, 3.0f, 3.0f, };
        final float[] offsets = new float[] { -200.0f, -158.0f, -200.0f, };
        image = image.rescale(scaleFactors, offsets, null);
        final double thresholdColorScale = 1.37;
        final RobotColor thresholdColor = image.getMidrangeColor().scale(thresholdColorScale);

        final List<RobotImage> result = image.splitAlongVerticalLine(thresholdColor);

        writeImages("ai/target/captured-images/bowsBid_", result);

        verifyVerticalSplit(result, 3, thresholdColor, 0);
    }

    /**
     * Test the <code>splitAlongVerticalLine()</code> method.
     */
    @Test
    public void splitAlongVerticalLineClayAsk()
    {
        final RobotImage image = CLAY_ASK;
        final RobotColor thresholdColor = image.getMidrangeColor();

        final List<RobotImage> result = image.splitAlongVerticalLine(thresholdColor);

        writeImages("ai/target/captured-images/clayAsk_", result);

        verifyVerticalSplit(result, 4, thresholdColor, 0);
    }

    /**
     * Test the <code>splitAlongVerticalLine()</code> method.
     */
    @Test
    public void splitAlongVerticalLineClayBid()
    {
        final RobotImage image = CLAY_BID;
        final RobotColor thresholdColor = image.getMidrangeColor();

        final List<RobotImage> result = image.splitAlongVerticalLine(thresholdColor);

        writeImages("ai/target/captured-images/clayBid_", result);

        verifyVerticalSplit(result, 4, thresholdColor, 0);
    }

    /**
     * Test the <code>splitAlongVerticalLine()</code> method.
     */
    @Test
    public void splitAlongVerticalLineMaxCountWoodAsk()
    {
        final RobotImage image = WOOD_ASK;
        final int maxCount = 1;
        final RobotColor thresholdColor = image.getMidrangeColor();

        final List<RobotImage> result = image.splitAlongVerticalLine(thresholdColor, maxCount);

        verifyVerticalSplit(result, 3, thresholdColor, 0);
    }

    /**
     * Test the <code>splitAlongVerticalLine()</code> method.
     */
    @Test
    public void splitAlongVerticalLineMaxCountWoodBid()
    {
        final RobotImage image = WOOD_BID;
        final int maxCount = 1;
        final RobotColor thresholdColor = image.getMidrangeColor();

        final List<RobotImage> result = image.splitAlongVerticalLine(thresholdColor, maxCount);

        verifyVerticalSplit(result, 3, thresholdColor, maxCount);
    }

    /**
     * Test the <code>splitAlongVerticalLine()</code> method.
     */
    @Test
    public void splitAlongVerticalLineNull()
    {
        final RobotImage image = WOOD_ASK;

        try
        {
            image.splitAlongVerticalLine(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("thresholdColor is null"));
        }
    }

    /**
     * Test the <code>splitAlongVerticalLine()</code> method.
     */
    @Test
    public void splitAlongVerticalLineWoodAsk()
    {
        final RobotImage image = WOOD_ASK;
        final RobotColor thresholdColor = image.getMidrangeColor();

        final List<RobotImage> result = image.splitAlongVerticalLine(thresholdColor);

        verifyVerticalSplit(result, 4, thresholdColor, 0);
    }

    /**
     * Test the <code>splitAlongVerticalLine()</code> method.
     */
    @Test
    public void splitAlongVerticalLineWoodBid()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Wood_Bid_20131107.png");
        final RobotColor thresholdColor = image.getMidrangeColor();

        final List<RobotImage> result = image.splitAlongVerticalLine(thresholdColor);

        verifyVerticalSplit(result, 4, thresholdColor, 0);
    }

    /**
     * Test the <code>splitAlongVerticalRegion()</code> method.
     */
    @Test
    public void splitAlongVerticalRegionClayAskRow()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Clay_Ask_Row_20131130.png");
        final RobotColor thresholdColor = image.getMidrangeColor();
        if (IS_VERBOSE)
        {
            System.out.println("thresholdColor = " + thresholdColor);
        }

        final List<RobotImage> result = image.splitAlongVerticalRegion(thresholdColor, minGap);

        writeImages("ai/target/captured-images/clayAskTest_", result);

        verifyRegionSplit(result, 6);
    }

    /**
     * Test the <code>splitAlongVerticalRegion()</code> method.
     */
    @Test
    public void splitAlongVerticalRegionClayBidRow()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Clay_Bid_Row_20131130.png");
        final RobotColor thresholdColor = image.getMidrangeColor();
        if (IS_VERBOSE)
        {
            System.out.println("thresholdColor        = " + thresholdColor);
        }

        final List<RobotImage> result = image.splitAlongVerticalRegion(thresholdColor, minGap);

        writeImages("ai/target/captured-images/clayBidTest_", result);

        verifyRegionSplit(result, 7);
    }

    /**
     * Test the <code>splitAlongVerticalRegion()</code> method.
     */
    @Test
    public void splitAlongVerticalRegionDraughtHorseAskRow()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Draught+Horse_Ask_Row_20131130.png");
        final RobotColor thresholdColor = image.getMidrangeColor();
        if (IS_VERBOSE)
        {
            System.out.println("thresholdColor = " + thresholdColor);
        }

        final List<RobotImage> result = image.splitAlongVerticalRegion(thresholdColor, minGap);

        writeImages("ai/target/captured-images/draughtHorseAskTest_", result);

        verifyRegionSplit(result, 7);
    }

    /**
     * Test the <code>splitAlongVerticalRegion()</code> method.
     */
    @Test
    public void splitAlongVerticalRegionNull()
    {
        final RobotImage image = WOOD_ASK;

        try
        {
            image.splitAlongVerticalRegion(null, 4);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("thresholdColor is null"));
        }
    }

    /**
     * Test the <code>splitAlongVerticalRegion()</code> method.
     */
    @Test
    public void splitAlongVerticalRegionWithOriginWoodAskRow()
    {
        final RobotImage parent = null;
        final Point origin = new Point(12, 24);
        final RobotImage image = new DefaultRobotImage(WOOD_ASK_ROW, parent, origin);
        final RobotColor thresholdColor = image.getMidrangeColor();

        final List<RobotImage> result = image.splitAlongVerticalRegion(thresholdColor, minGap);

        writeImages("ai/target/captured-images/woodAskTest_", result);

        verifyRegionSplit(result, 7);
    }

    /**
     * Test the <code>splitAlongVerticalRegion()</code> method.
     */
    @Test
    public void splitAlongVerticalRegionWoodAskRow()
    {
        final RobotImage image = WOOD_ASK_ROW;
        final RobotColor thresholdColor = image.getMidrangeColor();

        final List<RobotImage> result = image.splitAlongVerticalRegion(thresholdColor, minGap);

        writeImages("ai/target/captured-images/woodAskTest_", result);

        verifyRegionSplit(result, 7);
    }

    /**
     * Test the <code>splitAlongVerticalRegion()</code> method.
     */
    @Test
    public void splitAlongVerticalRegionWoodBidRow()
    {
        final RobotImage image = imageIo.read(IMAGE_DIR + "Wood_Bid_Row_20131130.png");
        final RobotColor thresholdColor = image.getMidrangeColor();
        if (IS_VERBOSE)
        {
            System.out.println("thresholdColor        = " + thresholdColor);
        }

        final List<RobotImage> result = image.splitAlongVerticalRegion(thresholdColor, minGap);

        writeImages("ai/target/captured-images/woodBidTest_", result);

        verifyRegionSplit(result, 7);
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final RobotImage image0 = WOOD_ASK;
        final RobotImage image1 = CLAY_ASK;
        final RobotImageIO reader = new RobotImageIO();
        final RobotImage image2 = reader.read(IMAGE_DIR + "Wood_Ask_20131107.png");

        assertTrue(image0.equals(image0));
        assertFalse(image0.equals(image1));
        assertTrue(image0.equals(image2));

        assertFalse(image1.equals(image0));
        assertTrue(image1.equals(image1));
        assertFalse(image1.equals(image2));

        assertTrue(image2.equals(image0));
        assertFalse(image2.equals(image1));
        assertTrue(image2.equals(image2));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final RobotImage image0 = WOOD_ASK;
        final RobotImage image1 = CLAY_ASK;
        final RobotImageIO reader = new RobotImageIO();
        final RobotImage image2 = reader.read(IMAGE_DIR + "Wood_Ask_20131107.png");

        assertTrue(image0.hashCode() == image0.hashCode());
        assertFalse(image0.hashCode() == image1.hashCode());
        assertTrue(image0.hashCode() == image2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final RobotImage image = WOOD_ASK;

        final String expected = "org.vizzini.ai.robot.DefaultRobotImage [width=18,height=7]";
        final String result = image.toString();

        assertNotNull(result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toBlackAndWhite()</code> method.
     */
    @Test
    public void toBlackAndWhite()
    {
        final RobotImage result = WOOD_ASK.toBlackAndWhite();

        assertNotNull(result);

        final int width = result.getWidth();
        final int height = result.getHeight();

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = result.getPixel(i, j);
                assertTrue(DefaultRobotColor.BLACK.equals(color) || DefaultRobotColor.WHITE.equals(color));
            }
        }
    }

    /**
     * Test the <code>toGrayScale()</code> method.
     */
    @Test
    public void toGrayScale()
    {
        final RobotImage source = WOOD_ASK;
        final RobotImage result = source.toGrayScale();

        assertNotNull(result);

        final int width = result.getWidth();
        final int height = result.getHeight();

        for (int i = 0; i < width; i++)
        {
            for (int j = 0; j < height; j++)
            {
                final RobotColor color = result.getPixel(i, j);
                final int red = color.getRed();
                final int green = color.getGreen();
                final int blue = color.getBlue();

                assertTrue("red = " + red + ", green = " + green + ", blue = " + blue, (red == green)
                        && (green == blue));
            }
        }
    }

    /**
     * Test the <code>trim()</code> method.
     */
    @Test
    public void trimClayBid()
    {
        // Get an untrimmed image.
        final RobotImage image0 = imageIo.read(IMAGE_DIR + "Clay_Bid_Row_20131130.png");
        final RobotColor thresholdColor0 = image0.getMidrangeColor();
        final List<RobotImage> images = image0.splitAlongVerticalRegion(thresholdColor0, 4);

        final RobotImage image = images.get(images.size() - 4);
        final RobotColor thresholdColor = image.getMidrangeColor();

        final RobotImage result = image.trim(thresholdColor);

        assertNotNull(result);

        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/clayBidTrim", result);
        }

        assertThat(result.getWidth(), is(16));
        assertThat(result.getHeight(), is(7));
    }

    /**
     * Test the <code>trim()</code> method.
     */
    @Test
    public void trimNull()
    {
        final RobotImage image = CLAY_BID;

        try
        {
            image.trim(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("thresholdColor is null"));
        }
    }

    /**
     * Test the <code>trim()</code> method.
     */
    @Test
    public void trimWoodAsk()
    {
        // Get an untrimmed image.
        final RobotImage image0 = imageIo.read(IMAGE_DIR + "Wood_Ask_Row_20131130.png");
        final RobotColor thresholdColor0 = image0.getMidrangeColor();
        final List<RobotImage> images = image0.splitAlongVerticalRegion(thresholdColor0, 4);

        final RobotImage image = images.get(images.size() - 4);
        final RobotColor thresholdColor = image.getMidrangeColor();

        final RobotImage result = image.trim(thresholdColor);

        assertNotNull(result);

        if (IS_VERBOSE)
        {
            imageIo.write("ai/target/captured-images/woodAskTrim", result);
        }

        assertThat(result.getWidth(), is(18));
        assertThat(result.getHeight(), is(7));
    }

    /**
     * @param result Result.
     * @param expectedImageCount Expected image count.
     * @param backgroundColor Background color.
     */
    private void verifyHorizontalSplit(final List<RobotImage> result, final int expectedImageCount,
            final RobotColor backgroundColor)
    {
        assertNotNull(result);
        assertThat(result.size(), is(expectedImageCount));

        for (int n = 0; n < expectedImageCount; n++)
        {
            final RobotImage image = result.get(n);
            final int height = image.getHeight();
            final int width = image.getWidth();

            for (int j = 0; j < height; j++)
            {
                boolean isLighter = true;

                for (int i = 0; isLighter && (i < width); i++)
                {
                    final RobotColor color = image.getPixel(i, j);
                    isLighter &= color.isLighterThan(backgroundColor);
                }

                assertFalse("n = " + n, isLighter);
            }
        }
    }

    /**
     * @param result Result.
     * @param expectedImageCount Expected image count.
     */
    private void verifyRegionSplit(final List<RobotImage> result, final int expectedImageCount)
    {
        assertNotNull(result);
        assertThat(result.size(), is(expectedImageCount));
    }

    /**
     * @param result Result.
     * @param expectedImageCount Expected image count.
     * @param thresholdColor Target color.
     * @param maxCount Maximum darker count allowed (typically 0).
     */
    private void verifyVerticalSplit(final List<RobotImage> result, final int expectedImageCount,
            final RobotColor thresholdColor, final int maxCount)
    {
        assertNotNull(result);
        assertThat(result.size(), is(expectedImageCount));

        for (int n = 0; n < expectedImageCount; n++)
        {
            final RobotImage image = result.get(n);
            final int height = image.getHeight();
            final int width = image.getWidth();

            for (int i = 0; i < width; i++)
            {
                int count = 0;

                for (int j = 0; j < height; j++)
                {
                    final RobotColor color = image.getPixel(i, j);

                    if (color.isDarkerThan(thresholdColor))
                    {
                        count++;
                    }
                }

                if (IS_VERBOSE)
                {
                    System.out.println(n + " " + i + " count = " + count + " maxCount = " + maxCount);
                }

                assertTrue(count >= (maxCount - 1));
            }
        }
    }

    /**
     * @param filePrefix File prefix.
     * @param images Images.
     */
    private void writeImages(final String filePrefix, final List<RobotImage> images)
    {
        if (IS_VERBOSE)
        {
            for (int i = 0; i < images.size(); i++)
            {
                final RobotImage robotImage = images.get(i);
                imageIo.write(filePrefix + i, robotImage);
            }
        }
    }
}
