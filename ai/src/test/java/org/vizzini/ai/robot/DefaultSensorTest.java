package org.vizzini.ai.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.ai.robot.DefaultSensor;
import org.vizzini.ai.robot.Sensor;

/**
 * Provides tests for the <code>DefaultSensor</code> class.
 */
public final class DefaultSensorTest
{
    /** Sensor. */
    private final Sensor<String, String> sensor0 = create();

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(sensor0.getName(), is("sensor"));
    }

    /**
     * Test the <code>sense()</code> method.
     */
    @Test
    public void sense()
    {
        try
        {
            sensor0.sense(null);
            fail("Should have thrown an exception");
        }
        catch (final RuntimeException e)
        {
            assertThat(e.getMessage(), is("Method not implemented"));
        }
    }

    /**
     * Test the <code>DefaultSensor()</code> method.
     */
    @Test
    public void testConstructor()
    {
        assertNotNull(sensor0);
    }

    /**
     * Test the <code>DefaultSensor()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new DefaultSensor<String, String>(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new DefaultSensor<String, String>("");
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
    private Sensor<String, String> create()
    {
        return new DefaultSensor<String, String>("sensor");
    }
}
