package org.vizzini.ai.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.ai.robot.Actuator;
import org.vizzini.ai.robot.DefaultActuator;

/**
 * Provides tests for the <code>DefaultActuator</code> class.
 */
public final class DefaultActuatorTest
{
    /** Actuator. */
    private final Actuator<String, String> actuator0 = create();

    /**
     * Test the <code>actuate()</code> method.
     */
    @Test
    public void actuate()
    {
        try
        {
            actuator0.actuate(null);
            fail("Should have thrown an exception");
        }
        catch (final RuntimeException e)
        {
            assertThat(e.getMessage(), is("Method not implemented"));
        }
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        assertThat(actuator0.getName(), is("actuator"));
    }

    /**
     * Test the <code>DefaultActuator()</code> method.
     */
    @Test
    public void testConstructor()
    {
        assertNotNull(actuator0);
    }

    /**
     * Test the <code>DefaultActuator()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new DefaultActuator<String, String>(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new DefaultActuator<String, String>("");
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
    private Actuator<String, String> create()
    {
        return new DefaultActuator<String, String>("actuator");
    }
}
