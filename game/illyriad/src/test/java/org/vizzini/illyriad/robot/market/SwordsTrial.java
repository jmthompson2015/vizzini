package org.vizzini.illyriad.robot.market;

import java.awt.Adjustable;
import java.awt.Point;
import java.awt.Toolkit;
import java.io.File;
import java.io.IOException;
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

/**
 * Provides a trial of collecting data for swords.
 */
public final class SwordsTrial
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String args[])
    {
        deleteOutputDirectory();

        final SwordsTrial trial = new SwordsTrial();

        trial.setUp();

        try
        {
            trial.run();
        }
        catch (final RuntimeException e)
        {
            Toolkit.getDefaultToolkit().beep();
            e.printStackTrace();
        }

        trial.tearDown();
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

    /** Actuator kit. */
    private final MacActuatorKit actuatorKit = new MacActuatorKit();

    /** Sensor suite. */
    private final SensorSuite sensorSuite = new SensorSuite();

    /** Market data robot configuration. */
    private final RobotConfiguration config = new RobotConfiguration();

    /**
     * Run.
     */
    public void run()
    {
        // Open >> Swords.
        final ScreenImageSensor sensor = sensorSuite.getScreenImageSensor();
        final RobotImage resourceImage = sensor.sense(config.getResourceItemsRectangle());
        final RobotImageIO imageIo = new RobotImageIO();
        imageIo.write(new File(Locations.CAPTURED_IMAGES_DIR, "0_resourceImage.png"), resourceImage);
        final RobotColor thresholdColor0 = resourceImage.getMidrangeColor();
        System.out.println("resourceImage.getMidrangeColor() = " + resourceImage.getMidrangeColor());
        System.out.println("thresholdColor0                  = " + thresholdColor0);
        final List<RobotImage> resourceImages = resourceImage.splitAlongHorizontalLine(thresholdColor0);
        final RobotImage swordsImage = resourceImages.get(7);
        imageIo.write(new File(Locations.CAPTURED_IMAGES_DIR, "1_swordsImage.png"), swordsImage);
        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        final Point origin = swordsImage.getAbsoluteOrigin();
        leftClicker.actuate(new Point(origin.x + 10, origin.y + 10)).delay(2000);

        // Scroll >> Swords to top.
        ScrollBarRobot sbRobot = new ScrollBarRobot(Adjustable.VERTICAL, config.getResourcesScrollBarRectangle(),
                actuatorKit, sensorSuite);
        System.out.println("swordsImage.getOrigin().y = " + swordsImage.getOrigin().y);
        System.out.println("swordsImage y + height    = " + (swordsImage.getOrigin().y + swordsImage.getHeight()));
        sbRobot.setValue(swordsImage.getOrigin().y + swordsImage.getHeight());

        // Capture snapshot.
        final RobotImage openSwordsImage1 = sensor.sense(config.getResourceChildRectangle());
        imageIo.write(new File(Locations.CAPTURED_IMAGES_DIR, "2_openSwordsImage1.png"), openSwordsImage1);

        // Divide into lines.
        final RobotColor thresholdColor1 = openSwordsImage1.getMidrangeColor();
        System.out.println("openSwordsImage1.getMidrangeColor() = " + openSwordsImage1.getMidrangeColor());
        System.out.println("thresholdColor1                     = " + thresholdColor1);
        final List<RobotImage> swordImages1 = openSwordsImage1.splitAlongHorizontalLine(thresholdColor1);

        for (int i = 0; i < swordImages1.size(); i++)
        {
            final RobotImage sword = swordImages1.get(i);
            imageIo.write(new File(Locations.CAPTURED_IMAGES_DIR, "3_sword_" + i + ".png"), sword);
        }

        // Should be 18 lines.
        if (swordImages1.size() != 18)
        {
            throw new RuntimeException("expected 18 but was " + swordImages1.size());
        }

        // Page down.
        sbRobot = new ScrollBarRobot(Adjustable.VERTICAL, config.getResourcesScrollBarRectangle(), actuatorKit,
                sensorSuite);
        sbRobot.pageDown();
        actuatorKit.getDelayer().actuate(2000);

        // Capture snapshot.
        final RobotImage openSwordsImage2 = sensor.sense(config.getResourceChildRectangle());
        imageIo.write(new File(Locations.CAPTURED_IMAGES_DIR, "4_openSwordsImage.png"), openSwordsImage2);

        // Divide into lines.
        final RobotColor thresholdColor2 = openSwordsImage2.getMidrangeColor();
        System.out.println("openSwordsImage2.getMidrangeColor() = " + openSwordsImage2.getMidrangeColor());
        System.out.println("thresholdColor2                     = " + thresholdColor2);
        final List<RobotImage> swordImages2 = openSwordsImage2.splitAlongHorizontalLine(thresholdColor2);

        for (int i = 0; i < swordImages2.size(); i++)
        {
            final RobotImage sword = swordImages2.get(i);
            imageIo.write(new File(Locations.CAPTURED_IMAGES_DIR, "5_sword_" + i + ".png"), sword);
        }

        // Should be 17 lines.
        if (swordImages2.size() != 17)
        {
            throw new RuntimeException("expected 17 but was " + swordImages2.size());
        }
    }

    /**
     * Set up the test.
     */
    public void setUp()
    {
        // Bring browser to front.
        activateBrowser();
        final DelayActuator delayer = actuatorKit.getDelayer();
        delayer.actuate(2000);

        // Navigate to http://elgea.illyriad.co.uk/#/Trade/Markets
        navigateToMarketsPage();
        delayer.actuate(2000);
    }

    /**
     * Tear down the test.
     */
    public void tearDown()
    {
        // Click the Back button.
        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        leftClicker.actuate(config.getBackButtonPoint()).delay(1000);
    }

    /**
     * Activate browser.
     */
    private void activateBrowser()
    {
        actuatorKit.getActivator().actuate("Firefox.app");
    }

    /**
     * Navigate to the markets page.
     */
    private void navigateToMarketsPage()
    {
        // Move to trade overview button.
        final MouseMoveActuator mouseMover = actuatorKit.getMouseMover();
        mouseMover.actuate(config.getTradeOverviewPoint()).delay(500);

        // Move to markets & prices button.
        mouseMover.actuate(config.getMarketsAndPricesPoint()).delay(500);

        // Click it.
        final MouseLeftClickActuator leftClicker = actuatorKit.getMouseLeftClicker();
        leftClicker.actuate(null).delay(2000);

        // Move to the show all checkbox, and click it.
        leftClicker.actuate(config.getMarketsShowAllPoint());
    }
}
