package org.vizzini.ai.robot;

import java.awt.Robot;
import java.awt.event.InputEvent;

/**
 * Provides a mouse drag and drop implementation of an actuator.
 */
public final class DragAndDropActuator implements Actuator<DragAndDropData, DragAndDropActuator>, Delayable
{
    /** Delegate. */
    private final DefaultActuator<DragAndDropData, DragAndDropActuator> delegate;

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
    public DragAndDropActuator(final String name, final Robot robot)
    {
        delegate = new DefaultActuator<DragAndDropData, DragAndDropActuator>(name);

        if (robot == null)
        {
            throw new IllegalArgumentException("robot is null");
        }

        this.robot = robot;
    }

    /**
     * Mouse drag and drop.
     * 
     * @param input Input. (required)
     * 
     * @return this object.
     */
    @Override
    public DragAndDropActuator actuate(final DragAndDropData input)
    {
        if (input == null)
        {
            throw new IllegalArgumentException("input is null");
        }

        robot.mouseMove(input.getStartPoint().x, input.getStartPoint().y);
        robot.delay(input.getDelayTime());
        robot.mousePress(InputEvent.BUTTON1_MASK);
        robot.mouseMove(input.getEndPoint().x, input.getEndPoint().y);
        robot.delay(input.getDelayTime());
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
