package org.vizzini.ai.robot;

import java.awt.Robot;

/**
 * Provides a delay implementation of a actuator.
 */
public final class DelayActuator implements Actuator<Integer, DelayActuator>, Delayable
{
    /** Delegate. */
    private final DefaultActuator<Integer, DelayActuator> delegate;

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
    public DelayActuator(final String name, final Robot robot)
    {
        delegate = new DefaultActuator<Integer, DelayActuator>(name);

        if (robot == null)
        {
            throw new IllegalArgumentException("robot is null");
        }

        this.robot = robot;
    }

    @Override
    public DelayActuator actuate(final Integer input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        robot.delay(input);

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
