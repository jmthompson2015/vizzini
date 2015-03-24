package org.vizzini.ai.robot;

import java.awt.Color;
import java.awt.Point;
import java.awt.Robot;

/**
 * Provides a screen pixel color implementation of a sensor.
 */
public final class ScreenPixelColorSensor implements Sensor<Point, RobotColor>, Delayable
{
    /** Delegate. */
    private final DefaultSensor<Point, RobotColor> delegate;

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
    public ScreenPixelColorSensor(final String name, final Robot robot)
    {
        delegate = new DefaultSensor<Point, RobotColor>(name);

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
    public RobotColor sense(final Point input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        final Color color = robot.getPixelColor(input.x, input.y);
        final RobotColor answer = new DefaultRobotColor(color);

        return answer;
    }
}
