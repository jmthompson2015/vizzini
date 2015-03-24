package org.vizzini.ai.robot;

import java.awt.Robot;

/**
 * Provides a keyboard key click implementation of an actuator.
 */
public final class KeyboardKeyClickActuator implements Actuator<Integer, KeyboardKeyClickActuator>, Delayable
{
    /** Delegate. */
    private final DefaultActuator<Integer, KeyboardKeyClickActuator> delegate;

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
    public KeyboardKeyClickActuator(final String name, final Robot robot)
    {
        delegate = new DefaultActuator<Integer, KeyboardKeyClickActuator>(name);

        if (robot == null)
        {
            throw new IllegalArgumentException("robot is null");
        }

        this.robot = robot;
    }

    /**
     * Key click.
     * 
     * @param input Input. (required)
     * 
     * @return this object.
     */
    @Override
    public KeyboardKeyClickActuator actuate(final Integer input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        robot.keyPress(input);
        robot.keyRelease(input);

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
