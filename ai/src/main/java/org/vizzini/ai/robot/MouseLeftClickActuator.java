package org.vizzini.ai.robot;

import java.awt.Point;
import java.awt.Robot;
import java.awt.event.InputEvent;

/**
 * Provides a mouse left click implementation of an actuator.
 */
public final class MouseLeftClickActuator implements Actuator<Point, MouseLeftClickActuator>, Delayable
{
    /** Delegate. */
    private final DefaultActuator<Point, MouseLeftClickActuator> delegate;

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
    public MouseLeftClickActuator(final String name, final Robot robot)
    {
        delegate = new DefaultActuator<Point, MouseLeftClickActuator>(name);

        if (robot == null)
        {
            throw new IllegalArgumentException("robot is null");
        }

        this.robot = robot;
    }

    /**
     * Mouse left click.
     * 
     * @param input Input. (optional)
     * 
     * @return this object.
     */
    @Override
    public MouseLeftClickActuator actuate(final Point input)
    {
        if (input != null)
        {
            robot.mouseMove(input.x, input.y);
        }

        robot.mousePress(InputEvent.BUTTON1_MASK);
        robot.mouseRelease(InputEvent.BUTTON1_MASK);

        return this;
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
}
