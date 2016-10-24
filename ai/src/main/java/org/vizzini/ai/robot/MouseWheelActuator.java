package org.vizzini.ai.robot;

import java.awt.Robot;

/**
 * Provides a mouse wheel implementation of an actuator.
 */
public final class MouseWheelActuator implements Actuator<Integer, MouseWheelActuator>, Delayable
{
    /** Delegate. */
    private final DefaultActuator<Integer, MouseWheelActuator> delegate;

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
    public MouseWheelActuator(final String name, final Robot robot)
    {
        delegate = new DefaultActuator<Integer, MouseWheelActuator>(name);

        if (robot == null)
        {
            throw new IllegalArgumentException("robot is null");
        }

        this.robot = robot;
    }

    /**
     * Rotates the scroll wheel on wheel-equipped mice.
     * 
     * @param input Number of "notches" to move the mouse wheel. Negative values indicate movement up/away from the
     *            user, positive values indicate movement down/towards the user. (required)
     * 
     * @return this object.
     */
    @Override
    public MouseWheelActuator actuate(final Integer input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        robot.mouseWheel(input);

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
