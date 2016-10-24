package org.vizzini.ai.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.awt.AWTException;
import java.awt.Robot;

import org.junit.Test;
import org.vizzini.ai.robot.DelayActuator;

/**
 * Provides tests for the <code>DelayActuator</code> class.
 */
public final class DelayActuatorTest
{
    /** Sensor. */
    private final DelayActuator actuator0 = create();

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
     * Test the <code>DelayActuator()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new DelayActuator(null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new DelayActuator("actuator", null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("robot is null"));
        }

        try
        {
            new DelayActuator(null, createRobot());
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
    private DelayActuator create()
    {
        final Robot robot = createRobot();

        return new DelayActuator("actuator", robot);
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
