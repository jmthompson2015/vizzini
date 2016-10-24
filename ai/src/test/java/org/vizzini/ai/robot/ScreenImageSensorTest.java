package org.vizzini.ai.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.awt.AWTException;
import java.awt.Rectangle;
import java.awt.Robot;

import org.junit.Test;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.ScreenImageSensor;

/**
 * Provides tests for the <code>ScreenImageSensor</code> class.
 */
public final class ScreenImageSensorTest
{
    /** Sensor. */
    private final ScreenImageSensor sensor0 = create();

    /**
     * Test the <code>sense()</code> method.
     */
    @Test
    public void senseNull()
    {
        try
        {
            sensor0.sense(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("input is null"));
        }
    }

    /**
     * Test the <code>sense()</code> method.
     */
    @Test
    public void senseRectangle()
    {
        final RobotImage result = sensor0.sense(new Rectangle(5, 8, 6, 9));

        assertNotNull(result);
        assertThat(result.getWidth(), is(6));
        assertThat(result.getHeight(), is(9));
    }

    /**
     * Test the <code>ScreenSensor()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new ScreenImageSensor(null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new ScreenImageSensor("sensor", null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("robot is null"));
        }

        try
        {
            new ScreenImageSensor(null, createRobot());
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }
    }

    /**
     * @return a new sensor.
     */
    private ScreenImageSensor create()
    {
        final Robot robot = createRobot();

        return new ScreenImageSensor("sensor", robot);
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
