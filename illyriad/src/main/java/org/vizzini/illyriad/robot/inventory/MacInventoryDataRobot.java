package org.vizzini.illyriad.robot.inventory;

import java.awt.Rectangle;
import java.awt.Toolkit;
import java.io.File;
import java.io.IOException;
import java.util.Calendar;

import org.apache.commons.io.FileUtils;
import org.vizzini.ai.robot.DelayActuator;
import org.vizzini.ai.robot.MacActuatorKit;
import org.vizzini.ai.robot.MouseLeftClickActuator;
import org.vizzini.ai.robot.MouseMoveActuator;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.ai.robot.ScreenImageSensor;
import org.vizzini.ai.robot.SensorSuite;
import org.vizzini.illyriad.City;
import org.vizzini.illyriad.robot.ImageFilter;

/**
 * Provides a robot for collecting Illyriad inventory data. Commands and screen coordinates in this class are specific
 * to Firefox on Mac OS X.
 * 
 * @see RobotConfiguration
 */
public final class MacInventoryDataRobot
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String args[])
    {
        final File outputDirectory = Locations.CAPTURED_IMAGES_DIR;
        deleteOutputDirectory(outputDirectory);

        final MacInventoryDataRobot robot = new MacInventoryDataRobot();

        robot.reportInventoryData();
        // robot.collectData();

        Toolkit.getDefaultToolkit().beep();
    }

    /**
     * Delete the image output directory.
     * 
     * @param outputDirectory Output directory.
     */
    private static void deleteOutputDirectory(final File outputDirectory)
    {
        try
        {
            FileUtils.deleteDirectory(outputDirectory);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /** Actuator kit. */
    private final MacActuatorKit actuatorKit;

    /** Inventory data robot configuration. */
    private final RobotConfiguration config;

    /** Date suffix. */
    private String dateSuffix;

    /** Sensor suite. */
    private final SensorSuite sensorSuite;

    /** Row image filter. */
    private final ImageFilter rowFilter;

    /**
     * Construct this object.
     */
    public MacInventoryDataRobot()
    {
        this(new RobotConfiguration(), new MacActuatorKit(), new SensorSuite(), new RowImageFilter());
    }

    /**
     * Construct this object.
     * 
     * @param config Inventory data robot configuration.
     * @param actuatorKit Actuator kit.
     * @param sensorSuite Sensor suite.
     * @param rowFilter Row image filter.
     */
    @SuppressWarnings("hiding")
    public MacInventoryDataRobot(final RobotConfiguration config, final MacActuatorKit actuatorKit,
            final SensorSuite sensorSuite, final ImageFilter rowFilter)
    {
        this.config = config;
        this.actuatorKit = actuatorKit;
        this.sensorSuite = sensorSuite;
        this.rowFilter = rowFilter;
    }

    /**
     * Collect data.
     */
    public void collectData()
    {
        prepareToCollectData();

        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        final String suffix = getDateSuffix() + ".png";
        final RobotImageIO imageIo = new RobotImageIO();

        for (final City city : City.values())
        {
            captureCityData(city, imageIo, suffix);

            // Back to Anatomies.
            for (int i = 0; i < 3; i++)
            {
                back(1000);
            }

            leftClicker.actuate(config.getCityForwardPoint()).delay(2000);
        }

        // Back to city map.
        for (int i = 0; i < 2; i++)
        {
            back(500);
        }
    }

    /**
     * Report inventory data.
     */
    public void reportInventoryData()
    {
        // Launch browser.
        launchBrowser();
        final DelayActuator delayer = actuatorKit.getDelayer();
        delayer.actuate(10000);

        // Login.
        login();
        delayer.actuate(5000);

        // Defaults to my capital city Lockstone.

        collectData();
        delayer.actuate(2000);

        // Logout.
        logout();
        delayer.actuate(5000);

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
     * @param city City.
     * @param imageIo Robot image I/O.
     * @param suffix Date suffix.
     */
    private void captureCityData(final City city, final RobotImageIO imageIo, final String suffix)
    {
        final String cityName = getNameForFile(city.getDisplayName());
        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        final int delayTime = 1500;

        // Capture data image from Resources tab.
        leftClicker.actuate(config.getResourcesPoint()).delay(delayTime);
        captureCountData(cityName + "_Horse_", imageIo, suffix);

        // Capture data image from Anatomies tab.
        leftClicker.actuate(config.getAnatomiesPoint()).delay(delayTime);
        captureCountData(cityName + "_Hides_", imageIo, suffix);

        // Capture data image from Minerals tab.
        leftClicker.actuate(config.getMineralsPoint()).delay(delayTime);
        captureCountData(cityName + "_Mineral_", imageIo, suffix);

        // Capture data image from Herbs tab.
        leftClicker.actuate(config.getHerbsPoint()).delay(delayTime);
        captureCountData(cityName + "_Herb_", imageIo, suffix);
    }

    /**
     * @param name Resource name.
     * @param imageIo Robot image I/O.
     * @param suffix Date suffix.
     */
    private void captureCountData(final String name, final RobotImageIO imageIo, final String suffix)
    {
        final ScreenImageSensor sensor = sensorSuite.getScreenImageSensor();
        final Rectangle rectangle = config.getDataCountRectangle();
        final RobotImage rowImage = sensor.sense(rectangle);
        imageIo.write(new File(Locations.ROWS_DIR, name + "Row_" + suffix), rowImage);

        // FIXME What if there isn't any of the wanted resource? Match icon? Match name?

        final RobotImage countImage = rowFilter.filter(rowImage);

        if (countImage != null)
        {
            imageIo.write(new File(Locations.CAPTURED_IMAGES_DIR, name + "_" + suffix), countImage);
        }
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
     * @param name Name.
     * 
     * @return the name modified to use as a filename
     */
    private String getNameForFile(final String name)
    {
        final String answer = name.replaceAll("[ ]", "+");

        return answer;
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
     * Navigate to the inventory page.
     */
    private void navigateToInventoryPage()
    {
        System.out.println("navigateToInventoryPage()");

        // Move to city map button.
        final MouseMoveActuator mouseMover = actuatorKit.getMouseMover();
        mouseMover.actuate(config.getCityMapPoint()).delay(500);

        // Move to inventory button.
        mouseMover.actuate(config.getInventoryPoint()).delay(500);

        // Click it.
        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        leftClicker.actuate(null).delay(2000);
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

        // Navigate to http://elgea.illyriad.co.uk/#/Town/Inventory
        navigateToInventoryPage();
        delayer.actuate(2000);
    }

    /**
     * Quit browser.
     */
    private void quitBrowser()
    {
        System.out.println("quitBrowser()");

        actuatorKit.getQuitter().actuate(config.getBrowserAppName());
    }
}
