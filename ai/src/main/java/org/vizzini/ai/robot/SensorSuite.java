package org.vizzini.ai.robot;

import java.awt.AWTException;
import java.awt.Robot;

/**
 * Provides a suite of sensors.
 */
public final class SensorSuite
{
    /** Screen pixel color sensor. */
    private ScreenPixelColorSensor screenPixelColorSensor;

    /** Screen image sensor. */
    private ScreenImageSensor screenImageSensor;

    /** Robot. */
    private final Robot robot;

    /**
     * Construct this object.
     */
    public SensorSuite()
    {
        try
        {
            robot = new Robot();
        }
        catch (final AWTException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @return the screenImageSensor
     */
    public ScreenImageSensor getScreenImageSensor()
    {
        if (screenImageSensor == null)
        {
            screenImageSensor = new ScreenImageSensor("screenImageSensor", robot);
        }

        return screenImageSensor;
    }

    /**
     * @return the screenPixelColorSensor
     */
    public ScreenPixelColorSensor getScreenPixelColorSensor()
    {
        if (screenPixelColorSensor == null)
        {
            screenPixelColorSensor = new ScreenPixelColorSensor("screenPixelColorSensor", robot);
        }

        return screenPixelColorSensor;
    }

}
