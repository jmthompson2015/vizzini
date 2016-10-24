package org.vizzini.ai.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.awt.AWTException;
import java.awt.Point;
import java.awt.Robot;

import org.junit.Test;
import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.ScreenPixelColorSensor;

/**
 * Provides tests for the <code>ScreenPixelColorSensor</code> class.
 */
public final class ScreenPixelColorSensorTest
{
    /** Sensor. */
    private final ScreenPixelColorSensor sensor0 = create();

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
    public void sensePoint()
    {
        final RobotColor result = sensor0.sense(new Point(1, 2));

        assertNotNull(result);
        assertTrue(result.getRed() > 128);
        assertTrue(result.getGreen() > 128);
        assertTrue(result.getBlue() > 128);
    }

    /**
     * Test the <code>ScreenPixelColorSensor()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new ScreenPixelColorSensor(null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new ScreenPixelColorSensor("sensor", null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("robot is null"));
        }

        try
        {
            new ScreenPixelColorSensor(null, createRobot());
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
    private ScreenPixelColorSensor create()
    {
        final Robot robot = createRobot();

        return new ScreenPixelColorSensor("sensor", robot);
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
