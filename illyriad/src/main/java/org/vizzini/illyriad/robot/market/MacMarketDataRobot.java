package org.vizzini.illyriad.robot.market;

import java.awt.Adjustable;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Toolkit;
import java.io.File;
import java.io.IOException;
import java.util.Calendar;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.vizzini.ai.robot.DelayActuator;
import org.vizzini.ai.robot.MacActuatorKit;
import org.vizzini.ai.robot.MouseLeftClickActuator;
import org.vizzini.ai.robot.MouseMoveActuator;
import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.ai.robot.ScreenImageSensor;
import org.vizzini.ai.robot.ScrollBarRobot;
import org.vizzini.ai.robot.SensorSuite;
import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.ProductBuilder;
import org.vizzini.illyriad.ResourceProductCollection;
import org.vizzini.illyriad.robot.ImageFilter;

/**
 * Provides a robot for collecting Illyriad market data. Commands and screen coordinates in this class are specific to
 * Firefox on Mac OS X.
 * 
 * @see RobotConfiguration
 */
public final class MacMarketDataRobot
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String args[])
    {
        final long start = System.currentTimeMillis();
        deleteOutputDirectory();

        final ProductBuilder builder = new ProductBuilder();
        builder.build();

        final MacMarketDataRobot robot = new MacMarketDataRobot(builder.getProductCollection());

        try
        {
            if (isTesting())
            {
                robot.collectData();
            }
            else
            {
                robot.reportMarketData();
            }
        }
        catch (final RuntimeException e)
        {
            Toolkit.getDefaultToolkit().beep();
            e.printStackTrace();
        }

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("MacMarketDataRobot", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /**
     * Delete the image output directory.
     */
    private static void deleteOutputDirectory()
    {
        try
        {
            FileUtils.deleteDirectory(Locations.CAPTURED_IMAGES_DIR);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @return true if we're testing.
     */
    private static boolean isTesting()
    {
        return false;
    }

    /** Actuator kit. */
    private final MacActuatorKit actuatorKit;

    /** Market data robot configuration. */
    private final RobotConfiguration config;

    /** Date suffix. */
    private String dateSuffix;

    /** Robot image I/O. */
    private final RobotImageIO imageIo = new RobotImageIO();

    /** Resource item tree. */
    private final TreeNode root;

    /** Row image filter. */
    private final ImageFilter rowFilter;

    /** Scroll bar robot. */
    private ScrollBarRobot scrollBarRobot;

    /** Sensor suite. */
    private final SensorSuite sensorSuite;

    /** Current state. */
    private State state;

    /**
     * Construct this object.
     * 
     * @param products Resource product collection.
     */
    public MacMarketDataRobot(final ResourceProductCollection products)
    {
        this(new RobotConfiguration(), products, new MacActuatorKit(), new SensorSuite(), new RowImageFilter());
    }

    /**
     * Construct this object.
     * 
     * @param config Market data robot configuration.
     * @param products Resource product collection.
     * @param actuatorKit Actuator kit.
     * @param sensorSuite Sensor suite.
     * @param rowFilter Row image filter.
     */
    @SuppressWarnings("hiding")
    public MacMarketDataRobot(final RobotConfiguration config, final ResourceProductCollection products,
            final MacActuatorKit actuatorKit, final SensorSuite sensorSuite, final ImageFilter rowFilter)
    {
        this.config = config;
        this.actuatorKit = actuatorKit;
        this.sensorSuite = sensorSuite;
        this.rowFilter = rowFilter;

        final MarketDataTreeBuilder builder = new MarketDataTreeBuilder(products);
        this.root = builder.createTreeNodes();
    }

    /**
     * Collect data.
     * <p>
     * Strategy
     * </p>
     * <ol>
     * <li>scroll to start</li>
     * <li>capture an image and divide into lines</li>
     * <li>walk down each line</li>
     * <ul>
     * <li>if a parent,
     * <ol>
     * <li>expand</li>
     * <li>capture an image and divide into lines</li>
     * <li>walk down each line</li>
     * <li>capture ask/bid price images</li>
     * <li>collapse</li>
     * </ol>
     * </li>
     * <li>if not a parent, capture ask/bid price images</li>
     * </li>
     * </ul>
     * </li>
     * <li>if it goes beyond the bottom of the pane, scroll down (or setValue?)</li>
     * <li>sync the model to the display</li>
     * </ol>
     */
    public void collectData()
    {
        prepareToCollectData();

        final Rectangle riRectangle = config.getResourceItemsRectangle();

        // Start with >> Beverages
        // refreshState(root.getChildAt(15), riRectangle, 15);
        // for (int i = 16; i < root.getChildCount(); i++)

        for (int i = 0; i < root.getChildCount(); i++)
        {
            final TreeNode treeNode = root.getChildAt(i);

            // Move down to the next list item.
            moveDown(treeNode, riRectangle);
            // imageIo.write(new File(Locations.IMAGES_OUTPUT_DIR, "resourceImage_" + i + ".png"), state.getImage());
            // System.out.println(i + " " + treeNode.getName() + " y = " + state.getY());

            if (treeNode.isParent())
            {
                final State parentState = state;
                openParent(treeNode, parentState.getImage());
                collectDataFromChildren(parentState);
                closeParent(parentState);
            }
            else
            {
                captureResourceData(treeNode, riRectangle, state.getImage());
            }

            if (isTesting())
            {
                // if (">> Horses".equals(treeNode.getName()))
                // if (">> Swords".equals(treeNode.getName()))
                // if (">> Bows".equals(treeNode.getName()))
                // if (">> Spears".equals(treeNode.getName()))
                // if (">> Leather Armour".equals(treeNode.getName()))
                if (">> Anatomies".equals(treeNode.getName()))
                {
                    break;
                }
            }
        }

        back(500);
    }

    /**
     * Report market data.
     */
    public void reportMarketData()
    {
        // Launch browser.
        launchBrowser();
        final DelayActuator delayer = actuatorKit.getDelayer();
        delayer.actuate(10000);

        // Login.
        login();
        delayer.actuate(7000);

        // Defaults to my capital city Lockstone.

        collectData();
        delayer.actuate(3000);

        // Logout.
        logout();
        delayer.actuate(7000);

        // Quit browser.
        quitBrowser();
    }

    /**
     * Activate browser.
     */
    private void activateBrowser()
    {
        System.out.println("activateBrowser()");

        actuatorKit.getActivator().actuate(config.getBrowserAppName());
    }

    /**
     * @param value Value.
     * 
     * @return the given parameter as the nearest integer.
     */
    private int asInt(final double value)
    {
        return (int)Math.round(value);
    }

    /**
     * Click the Back button.
     * 
     * @param delayTime Delay time. (ms)
     */
    private void back(final int delayTime)
    {
        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        leftClicker.actuate(config.getBackButtonPoint()).delay(delayTime);
    }

    /**
     * @param name Resource name.
     * @param rectangle Data row rectangle.
     * @param suffix Date suffix.
     */
    private void capturePriceData(final String name, final Rectangle rectangle, final String suffix)
    {
        final ScreenImageSensor sensor = sensorSuite.getScreenImageSensor();

        final RobotImage rowImage = sensor.sense(rectangle);
        imageIo.write(new File(Locations.ROWS_DIR, name + "_Row_" + suffix), rowImage);

        final RobotImage priceImage = rowFilter.filter(rowImage);

        if (priceImage != null)
        {
            imageIo.write(new File(Locations.CAPTURED_IMAGES_DIR, name + "_" + suffix), priceImage);
        }
    }

    /**
     * @param resourceNode Resource tree node.
     * @param rectangle Screen rectangle.
     * @param resourceImage Resource image.
     */
    private void captureResourceData(final TreeNode resourceNode, final Rectangle rectangle,
            final RobotImage resourceImage)
    {
        final ScreenImageSensor sensor = sensorSuite.getScreenImageSensor();
        final String suffix = getDateSuffix() + ".png";

        final int y = resourceImage.getAbsoluteOrigin().y;
        final int height = resourceImage.getHeight();
        final Rectangle rowRectangle = new Rectangle(rectangle.x, y, rectangle.width, height);
        final RobotImage rowImage = sensor.sense(rowRectangle);
        final String name = resourceNode.getNameForFile();
        imageIo.write(new File(Locations.ROWS_DIR, name + "_Row_" + suffix), rowImage);

        if (isTesting())
        {
            select(resourceImage, 1500);
        }
        else
        {
            select(resourceImage, 3000);

            capturePriceData(name + "_Ask", config.getAskPriceRectangle(), suffix);
            capturePriceData(name + "_Bid", config.getBidPriceRectangle(), suffix);
        }
    }

    /**
     * @param rectangle Screen rectangle.
     * 
     * @return a new list of images of the lines in the resource items panel.
     */
    private List<RobotImage> captureResourceItemsImages(final Rectangle rectangle)
    {
        final ScreenImageSensor sensor = sensorSuite.getScreenImageSensor();
        final RobotImage riImage = sensor.sense(rectangle);
        final RobotColor thresholdColor = riImage.getMidrangeColor();

        return riImage.splitAlongHorizontalLine(thresholdColor);
    }

    /**
     * Close a parent.
     * 
     * @param parentState Parent state.
     */
    private void closeParent(final State parentState)
    {
        final TreeNode parentNode = parentState.getTreeNode();
        System.out.println("closeParent(" + parentNode.getName() + ")");

        // Locate the parent node.
        final Rectangle rectangle = config.getResourceItemsRectangle();
        final RobotImage parentImage = parentState.getImage();
        final int index = findLineUpward(parentImage, rectangle);
        refreshState(parentNode, rectangle, index);

        // Close the parent.
        select(state.getImage(), 1500);
        scrollBarRobot = null;

        // Locate the parent node.
        final List<RobotImage> afterImages = captureResourceItemsImages(rectangle);
        final int selectedIndex = findSelected(parentNode, afterImages);
        refreshState(parentNode, rectangle, selectedIndex);
    }

    /**
     * Capture data from children.
     * 
     * @param parentState Parent state.
     */
    private void collectDataFromChildren(final State parentState)
    {
        final TreeNode parentNode = parentState.getTreeNode();
        System.out.println("collectDataFromChildren(" + parentNode.getName() + ")");

        final Rectangle rcRectangle = config.getResourceChildRectangle();

        // Loop over the children and capture data.
        for (int i = 0; i < parentNode.getChildCount(); i++)
        {
            final TreeNode childNode = parentNode.getChildAt(i);

            // Move down to the next list item.
            moveDown(childNode, rcRectangle);
            captureResourceData(childNode, rcRectangle, state.getImage());

            if (isTesting())
            {
                // Stop after the first child.
                break;
            }
        }
    }

    /**
     * @param targetImage Target image.
     * @param images List of images.
     * 
     * @return the index of the given image, or -1 if not found.
     */
    private int findLine(final RobotImage targetImage, final List<RobotImage> images)
    {
        int answer = -1;

        final RobotImage myTargetImage = targetImage.toBlackAndWhite();
        final int maxDeltaWidth = config.getMaxDeltaWidth();
        final int maxDeltaHeight = config.getMaxDeltaHeight();
        final int maxPixelCount = config.getMaxPixelCount();

        // Find the row that corresponds to targetImage.
        for (int i = 0; (answer < 0) && (i < images.size()); i++)
        {
            final RobotImage image = images.get(i);
            final RobotImage myImage = image.toBlackAndWhite();

            if (myImage.nearlyEquals(myTargetImage, maxDeltaWidth, maxDeltaHeight, maxPixelCount))
            {
                answer = i;
                // imageIo.write(new File(Locations.IMAGES_OUTPUT_DIR, "findLine_myImage.png"), myImage);
            }
        }

        return answer;
    }

    /**
     * @param targetImage Target image.
     * @param rectangle Screen rectangle.
     * 
     * @return the index of the given image, or -1 if not found.
     */
    private int findLineUpward(final RobotImage targetImage, final Rectangle rectangle)
    {
        // imageIo.write(new File(Locations.IMAGES_OUTPUT_DIR, "findLineUpward_targetImage.png"), targetImage);
        List<RobotImage> images = captureResourceItemsImages(rectangle);
        int answer = findLine(targetImage, images);
        // System.out.println("0 answer = " + answer);
        // int count = 0;

        while ((answer < 0) && (getScrollBarRobot().getInvisibleAmountStart() > 0))
        {
            getScrollBarRobot().pageUp();
            images = captureResourceItemsImages(rectangle);
            answer = findLine(targetImage, images);
            // count++;
            // System.out.println(count + " answer = " + answer);
        }

        return answer;
    }

    /**
     * @param resourceNode Resource tree node.
     * @param images List of images.
     * 
     * @return the index of the given image, or -1 if not found.
     */
    private int findSelected(final TreeNode resourceNode, final List<RobotImage> images)
    {
        int answer = -1;

        // Find the row that is selected.
        for (int i = 0; (answer < 0) && (i < images.size()); i++)
        {
            final RobotImage image = images.get(i);

            if (isSelected(resourceNode.getNameForFile() + "_" + i, image))
            {
                answer = i;
                // imageIo.write(new File(Locations.IMAGES_OUTPUT_DIR, "findSelected_image.png"), image);
            }
        }

        return answer;
    }

    /**
     * @return the dateSuffix
     */
    private String getDateSuffix()
    {
        if (dateSuffix == null)
        {
            final Calendar calendar = Calendar.getInstance();

            final StringBuilder sb = new StringBuilder();

            sb.append(calendar.get(Calendar.YEAR));
            sb.append(String.format("%02d", calendar.get(Calendar.MONTH) + 1));
            sb.append(String.format("%02d", calendar.get(Calendar.DAY_OF_MONTH)));

            dateSuffix = sb.toString();
        }

        return dateSuffix;
    }

    /**
     * @return the sbRobot
     */
    private ScrollBarRobot getScrollBarRobot()
    {
        if (scrollBarRobot == null)
        {
            final Rectangle rsbRectangle = config.getResourcesScrollBarRectangle();
            scrollBarRobot = new ScrollBarRobot(Adjustable.VERTICAL, rsbRectangle, actuatorKit, sensorSuite);
        }

        return scrollBarRobot;
    }

    /**
     * @param title Title.
     * @param resourceImage Resource image.
     * 
     * @return true if the given image is selected.
     */
    private boolean isSelected(final String title, final RobotImage resourceImage)
    {
        System.out.println("isSelected(" + title + ")");

        // imageIo.write(new File(Locations.IMAGES_OUTPUT_DIR, "isSelected_resourceImage" + title + ".png"),
        // resourceImage);
        final int left = 0;
        final int right = resourceImage.getWidth() - 1;
        final int top = 0;
        final int bottom = resourceImage.getHeight() - 1;

        final boolean isLeftTopBlue = isSelectionColor(resourceImage.getPixel(left, top));
        final boolean isLeftBottomBlue = isSelectionColor(resourceImage.getPixel(left, bottom));

        // System.out.println("isBlue ? " + isLeftTopBlue + " resourceImage.getPixel(" + left + ", " + top + ") = "
        // + resourceImage.getPixel(left, top));
        // System.out.println("isBlue ? " + isLeftBottomBlue + " resourceImage.getPixel(" + left + ", " + bottom +
        // ") = "
        // + resourceImage.getPixel(left, bottom));

        boolean answer = isLeftTopBlue && isLeftBottomBlue;

        if (!answer)
        {
            final boolean isRightTopBlue = isSelectionColor(resourceImage.getPixel(right, top));
            final boolean isRightBottomBlue = isSelectionColor(resourceImage.getPixel(right, bottom));

            // System.out.println("isBlue ? " + isRightTopBlue + " resourceImage.getPixel(" + right + ", " + top +
            // ") = "
            // + resourceImage.getPixel(right, top));
            // System.out.println("isBlue ? " + isRightBottomBlue + " resourceImage.getPixel(" + right + ", " + bottom
            // + ") = " + resourceImage.getPixel(right, bottom));

            answer = isRightTopBlue && isRightBottomBlue;
        }

        // System.out.println("answer ? " + answer);

        return answer;
    }

    /**
     * @param color Robot color.
     * 
     * @return true if the given color represents an item selection.
     */
    private boolean isSelectionColor(final RobotColor color)
    {
        final int red = color.getRed();
        final int green = color.getGreen();
        final int blue = color.getBlue();

        return (red < 231) && (green < 231) && (blue > 250);
    }

    /**
     * Launch browser.
     */
    private void launchBrowser()
    {
        System.out.println("launchBrowser()");

        // My Firefox is set to automatically go to http://elgea.illyriad.co.uk
        actuatorKit.getLauncher().actuate(config.getBrowserAppName());
    }

    /**
     * Login.
     */
    private void login()
    {
        System.out.println("login()");

        // My Firefox is set to automatically supply username and password.
        actuatorKit.getMouseLeftClicker().actuate(config.getLoginButtonPoint());
    }

    /**
     * Logout.
     */
    private void logout()
    {
        System.out.println("logout()");

        actuatorKit.getMouseLeftClicker().actuate(config.getLogoutButtonPoint());
    }

    /**
     * @param resourceNode Resource tree node.
     * @param rectangle Screen rectangle.
     */
    private void moveDown(final TreeNode resourceNode, final Rectangle rectangle)
    {
        System.out.println("moveDown(" + resourceNode.getName() + ")");

        if (state == null)
        {
            refreshState(resourceNode, rectangle, 0);
        }
        else
        {
            final int newIndex = state.getIndex() + 1;

            if ((newIndex >= (state.getImages().size() - 1)) && !">> Elemental".equals(resourceNode.getName()))
            {
                pageDown(rectangle);
            }
            else
            {
                refreshState(resourceNode, rectangle, newIndex);
            }
        }
    }

    /**
     * Navigate to the markets page.
     */
    private void navigateToMarketsPage()
    {
        System.out.println("navigateToMarketsPage()");

        // Move to trade overview button.
        final MouseMoveActuator mouseMover = actuatorKit.getMouseMover();
        mouseMover.actuate(config.getTradeOverviewPoint()).delay(500);

        // Move to markets & prices button.
        mouseMover.actuate(config.getMarketsAndPricesPoint()).delay(500);

        // Click it.
        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        leftClicker.actuate(null).delay(3000);

        // Move to the show all checkbox, and click it.
        leftClicker.actuate(config.getMarketsShowAllPoint());
    }

    /**
     * Open a parent.
     * 
     * @param parentNode Parent tree node.
     * @param parentImage Parent image.
     */
    private void openParent(final TreeNode parentNode, final RobotImage parentImage)
    {
        System.out.println("openParent(" + parentNode.getName() + ")");

        select(parentImage, 1500);
        scrollBarRobot = null;

        // Locate the parent node.
        final List<RobotImage> afterImages = captureResourceItemsImages(config.getResourceItemsRectangle());
        final int selectedIndex = findSelected(parentNode, afterImages);
        refreshState(parentNode, config.getResourceChildRectangle(), selectedIndex);
    }

    /**
     * @param rectangle Screen rectangle.
     */
    private void pageDown(final Rectangle rectangle)
    {
        final TreeNode currentNode = state.getTreeNode();
        System.out.println("pageDown(" + currentNode.getName() + ")");

        final List<RobotImage> images = captureResourceItemsImages(rectangle);
        final RobotImage currentImage = images.get(state.getIndex());
        getScrollBarRobot().pageDown();
        final List<RobotImage> afterImages = captureResourceItemsImages(rectangle);
        final int index = findSelected(currentNode, afterImages);
        // System.out.println("from findSelected() index = " + index);

        if (index >= 0)
        {
            refreshState(currentNode, rectangle, index + 1);
        }
        else
        {
            // System.out.println("getScrollBarRobot().getInvisibleAmountEnd() = "
            // + getScrollBarRobot().getInvisibleAmountEnd());

            if (getScrollBarRobot().getInvisibleAmountEnd() > 7)
            {
                refreshState(currentNode, rectangle, 0);
                RobotImage resourceImage = state.getImage();

                if (isSelected(currentNode.getNameForFile(), resourceImage))
                {
                    refreshState(currentNode, rectangle, 1);
                    resourceImage = state.getImage();
                }

                // imageIo.write(new File(Locations.IMAGES_OUTPUT_DIR, "resourceImage_" + currentNode.getNameForFile()
                // + ".png"), resourceImage);
            }
            else
            {
                refreshState(currentNode, rectangle, currentImage);
                moveDown(currentNode, rectangle);
            }
        }
    }

    /**
     * Prepare to collect data.
     */
    private void prepareToCollectData()
    {
        // Bring browser to front.
        activateBrowser();
        final DelayActuator delayer = actuatorKit.getDelayer();
        delayer.actuate(2000);

        // Navigate to http://elgea.illyriad.co.uk/#/Trade/Markets
        navigateToMarketsPage();
        delayer.actuate(3000);
    }

    /**
     * Quit browser.
     */
    private void quitBrowser()
    {
        System.out.println("quitBrowser()");

        actuatorKit.getQuitter().actuate(config.getBrowserAppName());
    }

    /**
     * @param resourceNode Resource tree node.
     * @param rectangle Screen rectangle.
     * @param index Line index.
     */
    private void refreshState(final TreeNode resourceNode, final Rectangle rectangle, final int index)
    {
        final List<RobotImage> images = captureResourceItemsImages(rectangle);

        try
        {
            state = new State(resourceNode, images, index);
        }
        catch (final IllegalArgumentException e)
        {
            System.err.println("images.size() = " + images.size());

            if (!images.isEmpty())
            {
                imageIo.write(new File(Locations.CAPTURED_IMAGES_DIR, "ERROR_" + resourceNode.getName()
                        + "_firstImage_0.png"), images.get(0));
            }

            final int myIndex = images.size() - 1;

            if ((0 <= myIndex) && (myIndex < images.size()))
            {
                imageIo.write(new File(Locations.CAPTURED_IMAGES_DIR, "ERROR_" + resourceNode.getName() + "_lastImage_"
                        + myIndex + ".png"), images.get(myIndex));
            }

            throw new RuntimeException("couldn't find image for index " + index, e);
        }
    }

    /**
     * @param resourceNode Resource tree node.
     * @param rectangle Screen rectangle.
     * @param resourceImage Resource image.
     */
    private void refreshState(final TreeNode resourceNode, final Rectangle rectangle, final RobotImage resourceImage)
    {
        final List<RobotImage> images = captureResourceItemsImages(rectangle);
        // System.out.println("refreshState() images.size() = " + images.size());
        final int index = findLine(resourceImage, images);
        // System.out.println("refreshState() index = " + index);

        try
        {
            state = new State(resourceNode, images, index);
        }
        catch (final IllegalArgumentException e)
        {
            imageIo.write(new File(Locations.CAPTURED_IMAGES_DIR, "ERROR_" + resourceNode.getName() + ".png"),
                    resourceImage);
            throw new RuntimeException("couldn't find image", e);
        }
    }

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * @param delayTime Delay time. (ms)
     */
    private void select(final int x, final int y, final int delayTime)
    {
        select(new Point(x, y), delayTime);
    }

    /**
     * @param point Point.
     * @param delayTime Delay time. (ms)
     */
    private void select(final Point point, final int delayTime)
    {
        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        leftClicker.actuate(point).delay(delayTime);
    }

    /**
     * @param image Image.
     * @param delayTime Delay time. (ms)
     */
    private void select(final RobotImage image, final int delayTime)
    {
        // Click the middle of the image.
        final Point origin = image.getAbsoluteOrigin();
        final int x = origin.x + 10;
        final int y = origin.y + asInt(image.getHeight() / 2.0);

        select(x, y, delayTime);
    }
}
