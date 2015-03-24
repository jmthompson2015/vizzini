package org.vizzini.ai.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.awt.AWTException;
import java.awt.Robot;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.ai.robot.Actuator;
import org.vizzini.ai.robot.Agent;
import org.vizzini.ai.robot.DefaultAgent;
import org.vizzini.ai.robot.MouseLeftClickActuator;
import org.vizzini.ai.robot.ScreenImageSensor;
import org.vizzini.ai.robot.ScreenPixelColorSensor;
import org.vizzini.ai.robot.Sensor;

/**
 * Provides tests for the <code>DefaultAgent</code> class.
 */
public final class DefaultAgentTest
{
    /**
     * Test the <code>DefaultAgent()</code> method.
     */
    @Test
    public void testConstructor()
    {
        final List<Actuator<?, ?>> actuators = new ArrayList<Actuator<?, ?>>();
        actuators.add(new MouseLeftClickActuator("leftClicker", createRobot()));

        final List<Sensor<?, ?>> sensors = new ArrayList<Sensor<?, ?>>();
        sensors.add(new ScreenImageSensor("screenImager", createRobot()));
        sensors.add(new ScreenPixelColorSensor("pixelColor", createRobot()));

        final Agent agent = new DefaultAgent("agent", actuators, sensors);

        assertNotNull(agent);
        assertNotNull(agent.getActuators());
        assertThat(agent.getActuators().size(), is(actuators.size()));
        assertNotNull(agent.getSensors());
        assertThat(agent.getSensors().size(), is(sensors.size()));
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
