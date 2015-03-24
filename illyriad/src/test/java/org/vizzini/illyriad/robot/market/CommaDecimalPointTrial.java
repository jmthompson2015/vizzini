package org.vizzini.illyriad.robot.market;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertThat;

import java.awt.RenderingHints;
import java.awt.color.ColorSpace;
import java.awt.image.BufferedImage;
import java.awt.image.ColorConvertOp;
import java.awt.image.RescaleOp;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.vizzini.ai.robot.DefaultRobotColor;
import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;

/**
 * Provides a trial of splitting digits.
 */
public final class CommaDecimalPointTrial
{
    /** Resources directory. */
    private static final File RESOURCES_DIR = new File(Locations.USER_DIR, "illyriad/src/test/resources");

    /** Market data input directory. */
    private static final File MARKET_DATA_INPUT_DIR = new File(RESOURCES_DIR, "marketData");

    /** Input directory. */
    private static final File INPUT_DIR = new File(MARKET_DATA_INPUT_DIR, "capturedImages");

    /** Output directory. */
    private static final File OUTPUT_DIR = new File(Locations.MARKET_DATA_DIR, "temp");

    /** List of image names which have no comma. */
    private static final List<String> NO_COMMA_IMAGE_NAMES = Arrays.asList(new String[] {
            "Bone+Handled+Sword_Bid_20131130", "Bows_Bid_20131204", "Clay_Ask_20131130", "Clay_Bid_20131130", });

    /**
     * Set up the class.
     */
    @BeforeClass
    public static void setUpClass()
    {
        deleteOutputDirectory();
        OUTPUT_DIR.mkdirs();
    }

    /**
     * Delete the image output directory.
     */
    private static void deleteOutputDirectory()
    {
        try
        {
            FileUtils.deleteDirectory(OUTPUT_DIR);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /** Robot image I/O. */
    private final RobotImageIO imageIo = new RobotImageIO();

    /** Trial. */
    private CommaDecimalPointTrial trial;

    /**
     * Analyze an image.
     */
    public void analyzeDraughtHorseAsk()
    {
        final String rowName = "Draught+Horse_Ask_Row_20131130";

        // Read row image.
        final RobotImage priceImage = readPriceImage(rowName);

        System.out.println("priceImage.getMeanColor()     = " + toString(priceImage.getMeanColor()));
        System.out.println("priceImage.getMedianColor()   = " + toString(priceImage.getMedianColor()));
        System.out.println("priceImage.getMidrangeColor() = " + toString(priceImage.getMidrangeColor()));
        System.out.println("priceImage.getModeColor()     = " + toString(priceImage.getModeColor()));

        final RobotImage normalized = priceImage.normalize();

        System.out.println("normalized.getMeanColor()     = " + toString(normalized.getMeanColor()));
        System.out.println("normalized.getMedianColor()   = " + toString(normalized.getMedianColor()));
        System.out.println("normalized.getMidrangeColor() = " + toString(normalized.getMidrangeColor()));
        System.out.println("normalized.getModeColor()     = " + toString(normalized.getModeColor()));

        final RobotImage myImage = normalized;

        final Map<RobotColor, Integer> counts = myImage.countColorOccurrences();
        System.out.println("counts.size() = " + counts.size());

        for (final Entry<RobotColor, Integer> entry : counts.entrySet())
        {
            final RobotColor color = entry.getKey();
            final Integer count = entry.getValue();

            System.out.println(String.format("%23s %2d %s", toString(color), count, createBar(count)));
        }

        final Map<Integer, Integer> buckets = new TreeMap<Integer, Integer>();
        final int bucketCount = 25;

        for (final Entry<RobotColor, Integer> entry : counts.entrySet())
        {
            final RobotColor color = entry.getKey();
            final Integer count = entry.getValue();
            final int gray = color.getGray();
            final int bucket = (bucketCount * gray) / 255;
            Integer myCount = buckets.get(bucket);
            if (myCount == null)
            {
                myCount = 0;
            }
            buckets.put(bucket, myCount + count);
        }

        for (int bucket = 0; bucket < bucketCount; bucket++)
        {
            Integer count = buckets.get(bucket);

            if (count == null)
            {
                count = 0;
            }

            final int start = bucket * (255 / bucketCount);
            final int end = ((bucket + 1) * (255 / bucketCount)) - 1;

            System.out.println(String.format("%2d (%3d-%3d) %3d %s", bucket, start, end, count, createBar(count)));
        }
    }

    /**
     * Try a color convert operation.
     * 
     * @throws IOException if there is a problem with I/O.
     */
    public void colorConvertOp() throws IOException
    {
        final String name = "Bows_Bid_20131204";
        final String suffix = ".png";
        final BufferedImage image = ImageIO.read(new File(INPUT_DIR, name + suffix));
        ImageIO.write(image, "png", new File(OUTPUT_DIR, name + "_original" + suffix));

        assertThat(image.getWidth(), is(15));
        assertThat(image.getHeight(), is(30));

        final ColorSpace colorSpace = ColorSpace.getInstance(ColorSpace.CS_GRAY);

        final RenderingHints hints = new RenderingHints(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_OFF);
        hints.put(RenderingHints.KEY_DITHERING, RenderingHints.VALUE_DITHER_DISABLE);
        hints.put(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        hints.put(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_OFF);

        final ColorConvertOp convertOp = new ColorConvertOp(colorSpace, hints);
        final BufferedImage dest = convertOp.filter(image, null);
        ImageIO.write(dest, "png", new File(OUTPUT_DIR, name + "_grayscale" + suffix));
    }

    /**
     * Try a rescale operation.
     * 
     * @throws IOException if there is a problem with I/O.
     */
    public void rescaleOp() throws IOException
    {
        final String name = "Bows_Bid_20131204";
        final String suffix = ".png";
        final BufferedImage image = ImageIO.read(new File(INPUT_DIR, name + suffix));
        ImageIO.write(image, "png", new File(OUTPUT_DIR, name + "_original" + suffix));

        assertThat(image.getWidth(), is(15));
        assertThat(image.getHeight(), is(30));

        final RenderingHints hints = new RenderingHints(RenderingHints.KEY_ANTIALIASING,
                RenderingHints.VALUE_ANTIALIAS_OFF);
        hints.put(RenderingHints.KEY_DITHERING, RenderingHints.VALUE_DITHER_DISABLE);
        hints.put(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        hints.put(RenderingHints.KEY_TEXT_ANTIALIASING, RenderingHints.VALUE_TEXT_ANTIALIAS_OFF);

        final RescaleOp rescaleOp = new RescaleOp(3.0f, -160.0f, hints);
        final BufferedImage dest = rescaleOp.filter(image, null);
        ImageIO.write(dest, "png", new File(OUTPUT_DIR, name + "_rescaled" + suffix));
    }

    /**
     * Run.
     */
    @Test
    public void runArcticBowAsk()
    {
        final String rowName = "Arctic+Bow_Ask_Row_20131204";
        final String name = "Arctic+Bow_Ask_20131204";

        trial.run(rowName, name, 5);
    }

    /**
     * Run.
     */
    @Test
    public void runBattleSwordBid()
    {
        final String rowName = "Battle+Sword_Bid_Row_20131130";
        final String name = "Battle+Sword_Bid_20131130";

        trial.run(rowName, name, 5);
    }

    /**
     * Run.
     */
    @Test
    public void runBoneHandledSwordBid()
    {
        final String rowName = "Bone+Handled+Sword_Bid_Row_20131130";
        final String name = "Bone+Handled+Sword_Bid_20131130";

        trial.run(rowName, name, 3);
    }

    /**
     * Run.
     */
    @Test
    public void runBowsBid()
    {
        final String rowName = "Bows_Bid_Row_20131204";
        final String name = "Bows_Bid_20131204";

        trial.run(rowName, name, 3);
    }

    /**
     * Run.
     */
    @Test
    public void runClayAsk()
    {
        final String rowName = "Clay_Ask_Row_20131130";
        final String name = "Clay_Ask_20131130";

        trial.run(rowName, name, 3);
    }

    /**
     * Run.
     */
    @Test
    public void runClayBid()
    {
        final String rowName = "Clay_Bid_Row_20131130";
        final String name = "Clay_Bid_20131130";

        trial.run(rowName, name, 4);
    }

    /**
     * Run.
     */
    @Test
    public void runCyclopsEntrailAsk()
    {
        final String rowName = "Cyclops-Entrail_Ask_Row_20131127";
        final String name = "Cyclops-Entrail_Ask_20131127";

        trial.run(rowName, name, -1);
    }

    /**
     * Run.
     */
    @Test
    public void runCyclopsEntrailBid()
    {
        final String rowName = "Cyclops-Entrail_Bid_Row_20131127";
        final String name = "Cyclops-Entrail_Bid_20131127";

        trial.run(rowName, name, 9);
    }

    /**
     * Run.
     */
    @Test
    public void runCyclopsHeartAsk()
    {
        final String rowName = "Cyclops-Heart_Ask_Row_20131127";
        final String name = "Cyclops-Heart_Ask_20131127";

        trial.run(rowName, name, 6);
    }

    /**
     * Run.
     */
    @Test
    public void runDraughtHorseAsk()
    {
        final String rowName = "Draught+Horse_Ask_Row_20131130";
        final String name = "Draught+Horse_Ask_20131130";

        trial.run(rowName, name, 6);
    }

    /**
     * Run.
     */
    @Test
    public void runSilversteelSwordBid()
    {
        final String rowName = "Silversteel+Sword_Bid_Row_20131205";
        final String name = "Silversteel+Sword_Bid_20131205";

        trial.run(rowName, name, 7);
    }

    /**
     * Run.
     */
    @Test
    public void runSteadyWarhorseAsk()
    {
        final String rowName = "Steady+Warhorse_Ask_Row_20131130";
        final String name = "Steady+Warhorse_Ask_20131130";

        trial.run(rowName, name, 5);
    }

    /**
     * Run.
     */
    @Test
    public void runWarWolfBid()
    {
        final String rowName = "War+Wolf_Bid_Row_20131205";
        final String name = "War+Wolf_Bid_20131205";

        trial.run(rowName, name, 6);
    }

    /**
     * Set up the test.
     */
    @Before
    public void setUp()
    {
        trial = new CommaDecimalPointTrial();
    }

    /**
     * @param count Count.
     * 
     * @return a string representing a bar for a chart.
     */
    private String createBar(final int count)
    {
        final StringBuilder sb = new StringBuilder();

        for (int i = 0; i < count; i++)
        {
            sb.append("*");
        }

        return sb.toString();
    }

    /**
     * @param title Title.
     * @param image Image.
     */
    // private void printColors(final String title, final RobotImage image)
    // {
    // System.out.println("\n" + title);
    // System.out.println("image.getMeanColor()     = " + toString(image.getMeanColor()));
    // System.out.println("image.getMedianColor()   = " + toString(image.getMedianColor()));
    // System.out.println("image.getMidrangeColor() = " + toString(image.getMidrangeColor()));
    // System.out.println("image.getModeColor()     = " + toString(image.getModeColor()));
    // System.out.println("image.getMinimumColor()  = " + toString(image.getMinimumColor()));
    // System.out.println("image.getMaximumColor()  = " + toString(image.getMaximumColor()));
    // }

    /**
     * @param image Image.
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param thresholdColor Threshold color.
     * @param titleSuffix Title suffix.
     */
    // private void printPixelMsg(final RobotImage image, final int x, final int y, final RobotColor thresholdColor,
    // final String titleSuffix)
    // {
    // final RobotColor pixel = image.getPixel(x, y);
    //
    // final String format = "image.getPixel(%2d, %2d)   = %s isDarker ? %5s %s";
    // System.out
    // .println(String.format(format, x, y, toString(pixel), pixel.isDarkerThan(thresholdColor), titleSuffix));
    // }

    /**
     * @param name File name.
     * @param suffix File suffix.
     * @param image Image.
     * @param expectedDigitsSize Expected digits size.
     */
    private void processImage(final String name, final String suffix, final RobotImage image,
            final int expectedDigitsSize)
    {
        RobotImage myImage = image;
        imageIo.write(new File(OUTPUT_DIR, name + "_Acolor" + suffix), myImage);

        // Rescale colors to increase contrast.
        myImage = myImage.rescale(3.0f, -192.0f, null); // failed 5; mostly digits count
        imageIo.write(new File(OUTPUT_DIR, name + "_Brescaled" + suffix), myImage);

        // Normalize.
        myImage = myImage.normalize();
        imageIo.write(new File(OUTPUT_DIR, name + "_Cnormalized" + suffix), myImage);

        // Trim.
        final double thresholdColorScale0 = 0.90;
        final RobotColor thresholdColor0 = DefaultRobotColor.WHITE.scale(thresholdColorScale0);
        myImage = myImage.trim(thresholdColor0);
        imageIo.write(new File(OUTPUT_DIR, name + "_Dtrimmed" + suffix), myImage);

        if (NO_COMMA_IMAGE_NAMES.contains(name))
        {
            assertThat("failed trim", myImage.getHeight(), is(7));
        }
        else
        {
            assertThat("failed trim", myImage.getHeight(), is(8));
        }

        // Convert to black and white.
        // This is the darkest inter-character color you want to be background.
        final double thresholdColorScale1 = 1.41;
        final RobotColor thresholdColor1 = myImage.getMidrangeColor().scale(thresholdColorScale1);
        myImage = myImage.toBlackAndWhite(thresholdColor1);

        // Split into digits.
        final int maxCount = 0;
        final List<RobotImage> digits = splitImage(myImage, name, maxCount, expectedDigitsSize);
        assertFalse(digits.isEmpty());

        if ("Arctic+Bow_Ask_20131204".equals(name) || "Battle+Sword_Bid_20131130".equals(name)
                || "Cyclops-Entrail_Bid_20131127".equals(name))
        {
            final RobotImage comma = digits.get(1);
            assertThat("comma width", comma.getWidth(), is(2));
        }
    }

    /**
     * @param rowName Row name.
     * 
     * @return a new image.
     */
    private RobotImage readPriceImage(final String rowName)
    {
        RobotImage answer = null;

        // Read row image.
        final String suffix = ".png";
        final RobotImage row = imageIo.read(new File(INPUT_DIR, rowName + suffix));

        // Split out price.
        final RobotColor thresholdColor = row.getMidrangeColor();
        final List<RobotImage> rowImages = row.splitAlongVerticalRegion(thresholdColor, 5);

        if (rowImages.size() > 5)
        {
            final int index = rowImages.size() - 4;
            answer = rowImages.get(index);
        }

        return answer;
    }

    /**
     * @param rowName Row name.
     * @param name File name.
     * @param expectedDigitsSize Expected digits size.
     */
    private void run(final String rowName, final String name, final int expectedDigitsSize)
    {
        final RobotImage priceImage = readPriceImage(rowName);

        if (priceImage != null)
        {
            final String suffix = ".png";
            processImage(name, suffix, priceImage, expectedDigitsSize);
        }
    }

    /**
     * @param image Image.
     * @param filename Filename.
     * @param maxCount Split maximum pixel count.
     * @param expectedDigitsSize Expected digits size.
     * 
     * @return a new list of digits.
     */
    private List<RobotImage> splitImage(final RobotImage image, final String filename, final int maxCount,
            final int expectedDigitsSize)
    {
        final RobotColor thresholdColor = image.getMidrangeColor();
        final List<RobotImage> digits = image.splitAlongVerticalLine(thresholdColor, maxCount);

        final List<RobotImage> digits2 = new ArrayList<RobotImage>();

        for (int i = 0; i < digits.size(); i++)
        {
            final RobotImage digit = digits.get(i);

            // If a digit is wider than expected, try to split it again.
            // System.out.println("digit.getWidth() = " + digit.getWidth());
            if (digit.getWidth() > 5)
            {
                final List<RobotImage> myDigits = digit.splitAlongVerticalLine(thresholdColor, maxCount + 1);
                System.out.println("auxiliary split myDigits.size() = " + myDigits.size() + " for " + filename);
                digits2.addAll(myDigits);
            }
            else
            {
                digits2.add(digit);
            }
        }

        // Save digits.
        for (int i = 0; i < digits2.size(); i++)
        {
            final RobotImage digit = digits2.get(i);
            final File file2 = new File(OUTPUT_DIR, filename + "_" + i + ".png");

            imageIo.write(file2, digit);
        }

        assertThat("failed digits count", digits2.size(), is(expectedDigitsSize));

        return digits2;
    }

    /**
     * @param color Color.
     * 
     * @return a string representation of the given parameter.
     */
    private String toString(final RobotColor color)
    {
        final StringBuilder sb = new StringBuilder();

        final String format = "%3d";
        sb.append(String.format(format, color.getGray()));
        sb.append(" r=").append(String.format(format, color.getRed()));
        sb.append(",g=").append(String.format(format, color.getGreen()));
        sb.append(",b=").append(String.format(format, color.getBlue()));
        // sb.append(",a=").append(String.format(format, color.getAlpha()));

        return sb.toString();
    }
}
