package org.vizzini.ai.robot;

import java.awt.Point;
import java.awt.Robot;

/**
 * Provides a mouse move implementation of an actuator.
 */
public final class MouseMoveActuator implements Actuator<Point, MouseMoveActuator>, Delayable
{
    /** Delegate. */
    private final DefaultActuator<Point, MouseMoveActuator> delegate;

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
    public MouseMoveActuator(final String name, final Robot robot)
    {
        delegate = new DefaultActuator<Point, MouseMoveActuator>(name);

        if (robot == null)
        {
            throw new IllegalArgumentException("robot is null");
        }

        this.robot = robot;
    }

    /**
     * Mouse move.
     * 
     * @param input Input. (required)
     * 
     * @return this object.
     */
    @Override
    public MouseMoveActuator actuate(final Point input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        robot.mouseMove(input.x, input.y);

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
