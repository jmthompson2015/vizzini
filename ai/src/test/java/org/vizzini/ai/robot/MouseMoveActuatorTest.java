package org.vizzini.ai.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.awt.AWTException;
import java.awt.Point;
import java.awt.Robot;

import org.junit.Test;
import org.vizzini.ai.robot.MouseMoveActuator;

/**
 * Provides tests for the <code>MouseMoveActuator</code> class.
 */
public final class MouseMoveActuatorTest
{
    /** Actuator. */
    private final MouseMoveActuator actuator0 = create();

    /**
     * Test the <code>actuate()</code> method.
     */
    @Test
    public void actuateNull()
    {
        try
        {
            actuator0.actuate(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("input is null"));
        }
    }

    /**
     * Test the <code>actuate()</code> method.
     */
    @Test
    public void actuatePoint()
    {
        final MouseMoveActuator result = actuator0.actuate(new Point(5, 8));

        assertNotNull(result);
        assertThat(result, is(actuator0));
    }

    /**
     * Test the <code>MouseMoveActuator()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new MouseMoveActuator(null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new MouseMoveActuator("actuator", null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("robot is null"));
        }

        try
        {
            new MouseMoveActuator(null, createRobot());
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }
    }

    /**
     * @return a new actuator.
     */
    private MouseMoveActuator create()
    {
        final Robot robot = createRobot();

        return new MouseMoveActuator("actuator", robot);
    }

    /**
     * @return a new robot.
     */
    private Robot createRobot()
    {
        Robot answer = null;

        try
        {
            answer = new Robot();
        }
        catch (final AWTException e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }
}
