package org.vizzini.ai.robot;

import java.awt.Point;
import java.awt.Rectangle;
import java.awt.Robot;
import java.awt.image.BufferedImage;

/**
 * Provides a screen implementation of a sensor.
 */
public final class ScreenImageSensor implements Sensor<Rectangle, RobotImage>, Delayable
{
    /** Delegate. */
    private final DefaultSensor<Rectangle, RobotImage> delegate;

    /** Robot. */
    private final Robot robot;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param robot Robot. (required)
     * 
     * @throws IllegalArgumentException if robot is null.
     */
    @SuppressWarnings("hiding")
    public ScreenImageSensor(final String name, final Robot robot)
    {
        delegate = new DefaultSensor<Rectangle, RobotImage>(name);

        if (robot == null)
        {
            throw new IllegalArgumentException("robot is null");
        }

        this.robot = robot;
    }

    @Override
    public Delayable delay(final int ms)
    {
        robot.delay(ms);

        return this;
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public RobotImage sense(final Rectangle input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        final BufferedImage image = robot.createScreenCapture(input);
        final RobotImage parent = null;
        final Point origin = new Point(input.x, input.y);
        final RobotImage answer = new DefaultRobotImage(image, parent, origin);

        return answer;
    }
}
