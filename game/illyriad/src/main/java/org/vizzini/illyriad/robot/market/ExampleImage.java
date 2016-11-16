package org.vizzini.illyriad.robot.market;

import java.io.File;
import java.util.List;

import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;

/**
 * Provides an example image.
 */
public final class ExampleImage
{
    /** Input directory. */
    private static final File INPUT_DIR = new File(Locations.USER_DIR,
            "illyriad/src/test/resources/marketData/capturedImages");

    /** Expected digit widths. */
    private final List<Integer> expectedDigitWidths;

    /** Expected image height. */
    private final int expectedHeight;

    /** Flag indicating whether the image should exist. */
    private final boolean isImageExpected;

    /** Name. */
    private final String name;

    /** Price image. */
    private final RobotImage priceImage;

    /**
     * @param rowName Row name.
     * @param expectedHeight Expected image height.
     * @param expectedDigitWidths Expected digit widths.
     */
    @SuppressWarnings("hiding")
    public ExampleImage(final String rowName, final List<Integer> expectedDigitWidths, final int expectedHeight)
    {
        this(rowName, expectedDigitWidths, expectedHeight, true);
    }

    /**
     * @param name Name.
     * @param expectedDigitWidths Expected digit widths.
     * @param expectedHeight Expected image height.
     * @param isImageExpected Flag indicating whether the image should exist.
     */
    @SuppressWarnings("hiding")
    private ExampleImage(final String name, final List<Integer> expectedDigitWidths, final int expectedHeight,
            final boolean isImageExpected)
    {
        this.name = name;
        this.expectedHeight = expectedHeight;
        this.expectedDigitWidths = expectedDigitWidths;
        this.isImageExpected = isImageExpected;

        priceImage = readImage();
    }

    /**
     * @return the expectedDigitWidths
     */
    public List<Integer> getExpectedDigitWidths()
    {
        return expectedDigitWidths;
    }

    /**
     * @return the expectedHeight
     */
    public int getExpectedHeight()
    {
        return expectedHeight;
    }

    /**
     * @return the name
     */
    public String getName()
    {
        return name;
    }

    /**
     * @return the priceImage
     */
    public RobotImage getPriceImage()
    {
        return priceImage;
    }

    /**
     * @return the isImageExpected
     */
    public boolean isImageExpected()
    {
        return isImageExpected;
    }

    /**
     * @return a new image.
     */
    private RobotImage readImage()
    {
        final RobotImageIO imageIo = new RobotImageIO();
        final String suffix = ".png";
        final RobotImage answer = imageIo.read(new File(INPUT_DIR, name + suffix));

        return answer;
    }
}
