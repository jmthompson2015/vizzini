package org.vizzini.ai.robot;

import java.awt.Adjustable;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.io.FileUtils;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.Test;

/**
 * Provides a trial for a scroll bar robot.
 */
public final class ScrollBarRobotTrial
{
    /** Background color. */
    private static final RobotColor BACKGROUND_COLOR = new DefaultRobotColor(195, 133, 63);

    /** Background color. */
    private static final RobotColor BACKGROUND_COLOR2 = new DefaultRobotColor(236 - 1, 223 - 1, 200 - 1);

    /** Market data output directory. */
    private static final File MARKET_DATA_OUTPUT_DIR = new File("marketData");

    /** Captured images output directory. */
    private static final File CAPTURED_IMAGES_OUTPUT_DIR = new File(MARKET_DATA_OUTPUT_DIR, "captured-images");

    /** Actuator kit. */
    private static MacActuatorKit actuatorKit = new MacActuatorKit();

    /** Sensor suite. */
    private static SensorSuite sensorSuite = new SensorSuite();

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

        // Bring browser to front.
        activateBrowser();
        final DelayActuator delayer = actuatorKit.getDelayer();
        delayer.actuate(2000);
    }

    /**
     * Tear down the class.
     */
    @AfterClass
    public static void tearDownClass()
    {
        Toolkit.getDefaultToolkit().beep();
    }

    /**
     * Activate browser.
     */
    private static void activateBrowser()
    {
        actuatorKit.getActivator().actuate("Firefox.app");
    }

    /** Markets and prices button point. */
    private final Point marketsAndPricesPoint = new Point(484, 210);

    /** Markets show all checkbox point. */
    private final Point marketsShowAllPoint = new Point(27, 894);

    /** Resource item rectangle. */
    private final Rectangle riRectangle = new Rectangle(16, 393, (193 - 16), (883 - 393));

    /** Resource scroll bar rectangle. */
    private final Rectangle rsbRectangle = new Rectangle(193, 393, (208 - 193), (883 - 393));

    /** Trade overview button point. */
    private final Point tradeOverviewPoint = new Point(480, 170);

    /** Map of resource name to Y coordinate. */
    private static final Map<String, Integer> NAME_TO_VALUE_MAP = new LinkedHashMap<String, Integer>();

    static
    {
        NAME_TO_VALUE_MAP.put("Iron", 69);
        NAME_TO_VALUE_MAP.put(">> Horses", 190);
        NAME_TO_VALUE_MAP.put("Riding Horse", 385);
        NAME_TO_VALUE_MAP.put(">> Swords", 640);
        NAME_TO_VALUE_MAP.put("Razor-Edged Sword", 1374);
        NAME_TO_VALUE_MAP.put(">> Herbs", 11818);
        NAME_TO_VALUE_MAP.put("Sharproot", 12672);
    }

    /** Map of resource name to indices. */
    private static final Map<String, Integer[]> NAME_TO_INDICES_MAP = new LinkedHashMap<String, Integer[]>();

    static
    {
        NAME_TO_INDICES_MAP.put("Iron", new Integer[] { 2, 0, 0 });
        NAME_TO_INDICES_MAP.put(">> Horses", new Integer[] { 5, 0, 0 });
        NAME_TO_INDICES_MAP.put("Riding Horse", new Integer[] { 5, 1, 4 });
        NAME_TO_INDICES_MAP.put(">> Swords", new Integer[] { 6, 1, 10 });
        NAME_TO_INDICES_MAP.put("Razor-Edged Sword", new Integer[] { 6, 2, 28 });
        NAME_TO_INDICES_MAP.put(">> Herbs", new Integer[] { 9, 10, 292 });
        NAME_TO_INDICES_MAP.put("Sharproot", new Integer[] { 9, 11, 314 });
    }

    /**
     * Run.
     */
    @Ignore
    @Test
    public void runHorses()
    {
        // Open the >> Horses item.
        openFolder(0, 5, 0);

        // Capture a screen shot of the resource items pane.
        captureScreenShots("Horses", BACKGROUND_COLOR, false);
    }

    /**
     * Run.
     */
    @Ignore
    @Test
    public void runStart()
    {
        final DelayActuator delayer = actuatorKit.getDelayer();

        scrollTo(0, 0, 0);
        delayer.actuate(2000);

        scrollTo(1, 0, 0);
        delayer.actuate(2000);

        scrollTo(2, 0, 0);
        delayer.actuate(2000);

        scrollTo(3, 0, 0);
        delayer.actuate(2000);

        scrollTo(4, 0, 0);
        delayer.actuate(2000);

        // Capture a screen shot of the resource items pane.
        captureScreenShots("Start", BACKGROUND_COLOR, false);
    }

    /**
     * Run.
     */
    @Ignore
    @Test
    public void runSwords()
    {
        runHorses();

        // 6, 10 Livestock

        // Open the >> Swords item.
        openFolder(0, 7, 0);

        // Scroll >> Swords > Swords to the top.
        scrollTo(7, 10, 0);
        actuatorKit.getDelayer().actuate(2000);

        // Capture a screen shot of the resource items pane.
        captureScreenShots("Swords", BACKGROUND_COLOR2, true);

        // Scroll >> Swords > Razor-Edged to the top.
        scrollTo(7, 28, 4);
        actuatorKit.getDelayer().actuate(2000);

        // Capture a screen shot of the resource items pane.
        captureScreenShots("Swords2", BACKGROUND_COLOR2, true);
    }

    /**
     * Run.
     */
    @Ignore
    @Test
    public void scrollToTrial()
    {
        openAllParents();

        final ScrollBarRobot sbRobot = new ScrollBarRobot(Adjustable.VERTICAL, rsbRectangle, actuatorKit, sensorSuite);
        sbRobot.setValueToStart();

        final DelayActuator delayer = actuatorKit.getDelayer();
        final int delay = 2000;
        final String format = "%17s value = %4d  value2 = %4d";

        for (final Entry<String, Integer> entry : NAME_TO_VALUE_MAP.entrySet())
        {
            final String name = entry.getKey();
            final int value = entry.getValue();
            final Integer[] indices = NAME_TO_INDICES_MAP.get(name);
            final int value2 = computeValue(indices[0], indices[1], indices[2]);
            System.out.println(String.format(format, name, value, value2));
            sbRobot.setValue(value);
            delayer.actuate(delay);
        }
    }

    /**
     * Run.
     */
    @Ignore
    @Test
    public void scrollToTrial0()
    {
        final int delay = 3000;

        // Open the >> Horses item.
        openFolder(530);

        // Open the >> Swords item.
        openFolder(860);

        final ScrollBarRobot sbRobot = new ScrollBarRobot(Adjustable.VERTICAL, rsbRectangle, actuatorKit, sensorSuite);
        final DelayActuator delayer = actuatorKit.getDelayer();
        final String format = "value = %3d  value2 = %3d";

        // Scroll to Iron.
        {
            final int value = 62;
            final int value2 = computeValue(2, 0, 0);
            System.out.println(String.format(format, value, value2));
            sbRobot.setValue(value);
            delayer.actuate(delay);
        }

        // Scroll to >> Horses.
        {
            final int value = 157;
            final int value2 = computeValue(4, 0, 0);
            System.out.println(String.format(format, value, value2));
            sbRobot.setValue(value);
            delayer.actuate(delay);
        }

        // Scroll to >> Horses > Riding Horses.
        {
            final int value = 307;
            final int value2 = computeValue(4, 0, 4);
            System.out.println(String.format(format, value, value2));
            sbRobot.setValue(value);
            delayer.actuate(delay);
        }

        // Scroll to >> Swords.
        {
            final int value = 519;
            final int value2 = computeValue(5, 1, 10);
            System.out.println(String.format(format, value, value2));
            sbRobot.setValue(value);
            delayer.actuate(delay);
        }

        // Scroll to >> Swords > Razor-Edged.
        {
            final int value = 1104;
            final int value2 = computeValue(5, 1, 28);
            System.out.println(String.format(format, value, value2));
            sbRobot.setValue(value);
            delayer.actuate(delay);
        }
    }

    /**
     * Run.
     */
    @Ignore
    @Test
    public void scrollToTrial1()
    {
        // Open the >> Horses item.
        openFolder(">> Horses", -30);
        // openFolder(530);

        // Open the >> Swords item.
        openFolder(">> Swords", -62);
        // openFolder(860);

        final ScrollBarRobot sbRobot = new ScrollBarRobot(Adjustable.VERTICAL, rsbRectangle, actuatorKit, sensorSuite);
        final DelayActuator delayer = actuatorKit.getDelayer();
        final int delay = 2000;
        final String format = "%17s value = %4d  value2 = %4d";

        for (final Entry<String, Integer> entry : NAME_TO_VALUE_MAP.entrySet())
        {
            final String name = entry.getKey();
            final int value = entry.getValue();
            final Integer[] indices = NAME_TO_INDICES_MAP.get(name);
            final int value2 = computeValue(indices[0], indices[1], indices[2]);
            System.out.println(String.format(format, name, value, value2));
            sbRobot.setValue(value);
            delayer.actuate(delay);
        }
    }

    /**
     * Set up the test.
     */
    @Before
    public void setUp()
    {
        // Navigate to http://elgea.illyriad.co.uk/#/Trade/Markets
        navigateToMarketsPage();
        final DelayActuator delayer = actuatorKit.getDelayer();
        delayer.actuate(2000);
    }

    /**
     * Run.
     */
    @Test
    public void setValueTrial()
    {
        // openAllParents();

        // Open the >> Horses parent.
        openFolder(530);

        System.out.println("rsbRectangle = " + rsbRectangle);

        final ScrollBarRobot sbRobot = new ScrollBarRobot(Adjustable.VERTICAL, rsbRectangle, actuatorKit, sensorSuite);

        System.out.println("setValueToEnd()");
        sbRobot.setValueToEnd();
        System.out.println("sbRobot.getValue() = " + sbRobot.getValue());

        System.out.println("setValueToStart()");
        sbRobot.setValueToStart();
        System.out.println("sbRobot.getValue() = " + sbRobot.getValue());

        System.out.println("invisibleAmountStart = " + sbRobot.getInvisibleAmountStart() + " visibleAmount = "
                + sbRobot.getVisibleAmount() + " invisibleAmountEnd = " + sbRobot.getInvisibleAmountEnd() + " sum = "
                + (sbRobot.getInvisibleAmountStart() + sbRobot.getVisibleAmount() + sbRobot.getInvisibleAmountEnd()));

        final ScreenImageSensor sensor = sensorSuite.getScreenImageSensor();
        final RobotImage resourcePaneImage = sensor.sense(riRectangle);
        final RobotImageIO writer = new RobotImageIO();
        File file = new File(CAPTURED_IMAGES_OUTPUT_DIR, "resourcePaneImage.png");
        writer.write(file, resourcePaneImage);

        final List<Integer> folderIndices = Arrays.asList(new Integer[] { 5, 17, });

        final RobotColor thresholdColor = resourcePaneImage.getMidrangeColor();
        final List<RobotImage> resourceImages = resourcePaneImage.splitAlongHorizontalLine(thresholdColor);
        System.out.println("resourceImages.size() = " + resourceImages.size());

        for (int i = 0; i < resourceImages.size(); i++)
        {
            System.out.println();
            final RobotImage resourceImage = resourceImages.get(i);
            file = new File(CAPTURED_IMAGES_OUTPUT_DIR, "resourceImage_" + i + ".png");
            writer.write(file, resourceImage);

            if (!folderIndices.contains(i))
            {
                // final int value = riRectangle.y + resourceImage.getOrigin().y;
                final int value = resourceImage.getOrigin().y;
                sbRobot.setValue(value);
                System.out.println(String.format("%2d value = %3d sbRobot.getValue() = %3d", i, value,
                        sbRobot.getValue()));

                final RobotImage myResourcePaneImage = sensor.sense(riRectangle);
                file = new File(CAPTURED_IMAGES_OUTPUT_DIR, "myResourcePaneImage_" + i + ".png");
                writer.write(file, myResourcePaneImage);
            }
        }
    }

    /**
     * Tear down the test.
     */
    @After
    public void tearDown()
    {
        // Click the Back button.
        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        leftClicker.actuate(new Point(23, 92)).delay(1000);
    }

    /**
     * Capture and save screen shots.
     * 
     * @param suffix Filename suffix.
     * @param targetColor Target color.
     * @param ignoreLastImage Flag indicating whether to ignore the last line in height calculations.
     */
    private void captureScreenShots(final String suffix, final RobotColor targetColor, final boolean ignoreLastImage)
    {
        final ScreenImageSensor sensor = sensorSuite.getScreenImageSensor();
        final RobotImage image = sensor.sense(riRectangle);

        final RobotImageIO writer = new RobotImageIO();
        final File file = new File(CAPTURED_IMAGES_OUTPUT_DIR, "resourceItems" + suffix);
        writer.write(file, image);

        final boolean skip = true;

        if (skip)
        {
            return;
        }

        final List<RobotImage> lines = image.splitAlongHorizontalLine(targetColor);

        int size = lines.size();

        if (ignoreLastImage)
        {
            size--;
        }

        int middle = -1;
        int previousMiddle = -1;
        int sum = 0;

        for (int i = 0; i < size; i++)
        {
            final RobotImage line = lines.get(i);
            final int start = line.getAbsoluteOrigin().y;
            final int end = (line.getAbsoluteOrigin().y + line.getHeight()) - 1;

            if (middle < 0)
            {
                middle = (int)Math.round(0.5 * (end - start)) + start;
            }
            else
            {
                previousMiddle = middle;
                middle = (int)Math.round(0.5 * (end - start)) + start;
                sum += (middle - previousMiddle);
            }
        }

        System.out.println(suffix + " average = " + ((1.0 * sum) / (size - 1)) + " sum = " + sum + " size = " + size
                + " lines.size() = " + lines.size());

        for (int i = 0; i < size; i++)
        {
            final RobotImage line = lines.get(i);
            final File file2 = new File(CAPTURED_IMAGES_OUTPUT_DIR, "line" + suffix + i);
            writer.write(file2, line);
        }
    }

    /**
     * @param itemIndex Item index.
     * @param parentIndex Parent index.
     * @param childIndex Child index.
     * 
     * @return value in pixels.
     */
    private int computeValue(final int itemIndex, final int parentIndex, final int childIndex)
    {
        final double a = 30.98;
        final double b = 26.85;
        final double c = 30.82;
        final double d = 0.7000;

        // v = (a * i0) + (b * i1) + (c * i2) + d
        final double itemValue = a * itemIndex;
        final double parentValue = b * parentIndex;
        final double childValue = c * childIndex;

        return (int)Math.round(itemValue + parentValue + childValue + d);
    }

    /**
     * @param itemIndex Item index.
     * @param parentIndex Parent index.
     * @param childIndex Child index.
     * 
     * @return Y coordinate in pixels.
     */
    private int computeY(final int itemIndex, final int parentIndex, final int childIndex)
    {
        return riRectangle.y + computeValue(itemIndex, parentIndex, childIndex);
    }

    /**
     * @param image Image.
     * @param thresholdColor Threshold color.
     * 
     * @return a list of points which are darker than the threshold color.
     */
    private List<Point> findDarkPoints(final RobotImage image, final RobotColor thresholdColor)
    {
        final List<Point> answer = new ArrayList<Point>();

        for (int w = 0; w < image.getWidth(); w++)
        {
            for (int h = 0; h < image.getHeight(); h++)
            {
                if (image.getPixel(w, h).isDarkerThan(thresholdColor))
                {
                    answer.add(new Point(w, h));
                }
            }
        }

        return answer;
    }

    /**
     * @return a flag indicating whether we are in closed-parent scanning mode.
     */
    private boolean isScanning()
    {
        return false;
    }

    /**
     * Navigate to the markets page.
     */
    private void navigateToMarketsPage()
    {
        // Move to trade overview button.
        final MouseMoveActuator mouseMover = actuatorKit.getMouseMover();
        mouseMover.actuate(tradeOverviewPoint).delay(500);

        // Move to markets & prices button.
        mouseMover.actuate(marketsAndPricesPoint).delay(500);

        // Click it.
        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        leftClicker.actuate(null).delay(2000);

        // Move to the show all checkbox, and click it.
        leftClicker.actuate(marketsShowAllPoint);
    }

    /**
     * Open all parents.
     */
    private void openAllParents()
    {
        {
            // System.out.println("scroll to bottom");
            final ScrollBarRobot sbRobot = new ScrollBarRobot(Adjustable.VERTICAL, rsbRectangle, actuatorKit,
                    sensorSuite);
            sbRobot.setValueToEnd();
        }

        // System.out.println("sense resource items");
        final ScreenImageSensor sensor = sensorSuite.getScreenImageSensor();
        // final RobotImage bigImage = sensor.sense(riRectangle);
        final RobotImage bigImage = sensor.sense(new Rectangle(22, riRectangle.y, (42 - 22), riRectangle.height));
        // System.out.println("bigImage.getOrigin() = " + bigImage.getOrigin());
        final RobotColor thresholdColor = bigImage.getMidrangeColor();
        // System.out.println("thresholdColor = " + thresholdColor);
        final List<RobotImage> rows = bigImage.splitAlongHorizontalLine(thresholdColor);
        // System.out.println("rows.size() = " + rows.size());
        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        final int x0 = bigImage.getOrigin().x;
        final int y0 = bigImage.getOrigin().y;

        // Find the dark points in image 17 Elemental.
        final List<Point> darkPoints15 = findDarkPoints(rows.get(15), thresholdColor);
        final List<Point> darkPoints17 = findDarkPoints(rows.get(17), thresholdColor);
        // System.out.println("darkPoints15.size() = " + darkPoints15.size());
        // System.out.println("darkPoints17.size() = " + darkPoints17.size());
        @SuppressWarnings("unchecked")
        final List<Point>[] lightPoints = new List[rows.size()];

        final boolean isScanning = isScanning();
        final List<Integer> nonParentImages = Arrays.asList(new Integer[] { 11, 7, 6, 2, 0, });

        for (int i = rows.size() - 1; i >= 0; i--)
        {
            final RobotImage image = rows.get(i);

            if (isScanning && nonParentImages.contains(i))
            {
                lightPoints[i] = new ArrayList<Point>();

                // Scan for points which aren't the same as image 17.
                System.out.println("\nimage " + i);

                for (int w = 0; w < image.getWidth(); w++)
                {
                    for (int h = 0; h < image.getHeight(); h++)
                    {
                        final Point point = new Point(w, h);

                        if (darkPoints17.contains(point) && image.getPixel(w, h).isLighterThan(thresholdColor))
                        {
                            // System.out.println(w + ", " + h + " " + image.getPixel(w, h));
                            lightPoints[i].add(point);
                        }
                    }
                }
            }

            if (image.getPixel(14, 5).isDarkerThan(thresholdColor))
            {
                // Open parent.
                final int x = x0 + image.getOrigin().x + (image.getWidth() / 2);
                final int y = y0 + image.getOrigin().y + (image.getHeight() / 2);
                // System.out.println(i + " clicking on " + x + ", " + y);

                leftClicker.actuate(new Point(x, y)).delay(750);
            }
        }

        if (isScanning)
        {
            for (final Point point : darkPoints17)
            {
                if (darkPoints15.contains(point))
                {
                    final boolean is0 = lightPoints[0].contains(point);
                    final boolean is2 = lightPoints[2].contains(point);
                    final boolean is6 = lightPoints[6].contains(point);
                    final boolean is7 = lightPoints[7].contains(point);
                    final boolean is11 = lightPoints[11].contains(point);

                    if (is0 && is2 && is6 && is7 && is11)
                    {
                        System.out.println("exclusive dark point = " + point + " (" + is2 + ", " + is6 + ", " + is7
                                + ", " + is11 + ")");
                    }
                }
            }
        }

        actuatorKit.getDelayer().delay(500);
    }

    /**
     * @param y Y coordinate.
     */
    private void openFolder(final int y)
    {
        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        final int x = riRectangle.x + 10;
        leftClicker.actuate(new Point(x, y)).delay(2000);
    }

    /**
     * @param itemIndex Item index.
     * @param parentIndex Parent index.
     * @param childIndex Child index.
     */
    private void openFolder(final int itemIndex, final int parentIndex, final int childIndex)
    {
        final int y = computeY(itemIndex, parentIndex, childIndex) + 10;
        openFolder(y);
    }

    /**
     * @param name Name.
     * @param yOffset Y offset.
     */
    private void openFolder(final String name, final int yOffset)
    {
        final int value = NAME_TO_VALUE_MAP.get(name);
        final int y = riRectangle.y + value + 10 + yOffset;
        System.out.println(name + " y = " + y + " value = " + value + " riRectangle.y = " + riRectangle.y);
        openFolder(y);
    }

    /**
     * @param itemIndex Item index.
     * @param parentIndex Parent index.
     * @param childIndex Child index.
     */
    private void scrollTo(final int itemIndex, final int parentIndex, final int childIndex)
    {
        // Scroll to top.
        final ScrollBarRobot sbRobot = new ScrollBarRobot(Adjustable.VERTICAL, rsbRectangle, actuatorKit, sensorSuite);

        // Scroll to value.
        final int value = computeValue(itemIndex, parentIndex, childIndex);
        sbRobot.setValue(value);
    }
}
