package org.vizzini.ai.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.awt.AWTException;
import java.awt.Adjustable;
import java.awt.Rectangle;

import org.junit.Test;
import org.vizzini.ai.robot.MacActuatorKit;
import org.vizzini.ai.robot.ScrollBarRobot;
import org.vizzini.ai.robot.SensorSuite;

/**
 * Provides tests for the <code>ScrollBarRobot</code> class.
 */
public final class ScrollBarRobotTest
{
    /**
     * Test the <code>evaluate()</code> method.
     * 
     * @throws AWTException if a robot cannot be constructed.
     */
    @Test
    public void testConstructor() throws AWTException
    {
        final int orientation = Adjustable.VERTICAL;
        final Rectangle extent = new Rectangle(0, 1, 2, 3);
        final MacActuatorKit actuatorKit = new MacActuatorKit();
        final SensorSuite sensorSuite = new SensorSuite();
        final int minimum = 0;
        final int maximum = 100;

        final ScrollBarRobot robot = new ScrollBarRobot(orientation, extent, actuatorKit, sensorSuite, minimum, maximum);

        assertThat(robot.getOrientation(), is(orientation));
        assertThat(robot.getExtent(), is(extent));
        assertThat(robot.getMinimum(), is(minimum));
        assertThat(robot.getMaximum(), is(maximum));
    }

    /**
     * Test the <code>evaluate()</code> method.
     * 
     * @throws AWTException if a robot cannot be constructed.
     */
    @Test
    public void testConstructorBadOrientation() throws AWTException
    {
        final int orientation = 123;
        final Rectangle extent = new Rectangle(0, 1, 2, 3);
        final MacActuatorKit actuatorKit = new MacActuatorKit();
        final SensorSuite sensorSuite = new SensorSuite();
        final int minimum = 0;
        final int maximum = 100;

        try
        {
            new ScrollBarRobot(orientation, extent, actuatorKit, sensorSuite, minimum, maximum);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("orientation must be Adjustable.HORIZONTAL or Adjustable.VERTICAL: 123"));
        }
    }

    /**
     * Test the <code>evaluate()</code> method.
     * 
     * @throws AWTException if a robot cannot be constructed.
     */
    @Test
    public void testConstructorNull() throws AWTException
    {
        final int orientation = Adjustable.VERTICAL;
        final Rectangle extent = new Rectangle(0, 1, 2, 3);
        final MacActuatorKit actuatorKit = new MacActuatorKit();
        final SensorSuite sensorSuite = new SensorSuite();
        final int minimum = 0;
        final int maximum = 100;

        try
        {
            new ScrollBarRobot(orientation, null, actuatorKit, sensorSuite, minimum, maximum);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("extent is null"));
        }

        try
        {
            new ScrollBarRobot(orientation, extent, null, sensorSuite, minimum, maximum);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("actuatorKit is null"));
        }

        try
        {
            new ScrollBarRobot(orientation, extent, actuatorKit, null, minimum, maximum);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("sensorSuite is null"));
        }
    }
}
