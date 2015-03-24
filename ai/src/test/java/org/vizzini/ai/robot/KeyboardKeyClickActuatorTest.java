package org.vizzini.ai.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.awt.AWTException;
import java.awt.Robot;
import java.awt.event.KeyEvent;

import org.junit.Test;
import org.vizzini.ai.robot.KeyboardKeyClickActuator;

/**
 * Provides tests for the <code>KeyboardKeyClickActuator</code> class.
 */
public final class KeyboardKeyClickActuatorTest
{
    /** Actuator. */
    private final KeyboardKeyClickActuator actuator0 = create();

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
        final KeyboardKeyClickActuator result = actuator0.actuate(KeyEvent.VK_A);

        assertNotNull(result);
        assertThat(result, is(actuator0));
    }

    /**
     * Test the <code>KeyboardKeyClickActuator()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new KeyboardKeyClickActuator(null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new KeyboardKeyClickActuator("actuator", null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("robot is null"));
        }

        try
        {
            new KeyboardKeyClickActuator(null, createRobot());
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
    private KeyboardKeyClickActuator create()
    {
        final Robot robot = createRobot();

        return new KeyboardKeyClickActuator("actuator", robot);
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
