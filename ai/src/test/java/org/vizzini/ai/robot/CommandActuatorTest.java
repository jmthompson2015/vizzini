package org.vizzini.ai.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.commons.lang3.StringUtils;
import org.junit.Test;
import org.vizzini.ai.robot.CommandActuator;

/**
 * Provides tests for the <code>CommandActuator</code> class.
 */
public final class CommandActuatorTest
{
    /** Actuator. */
    private final CommandActuator actuator0 = create();

    /**
     * Test the <code>actuate()</code> method.
     */
    @Test
    public void actuateDate()
    {
        final String[] command = { "date", };

        final String result = actuator0.actuate(command);

        assertNotNull(result);

        final Calendar calendar = Calendar.getInstance();

        final StringBuilder sb = new StringBuilder();

        final String dayOfWeekAndMonth = new SimpleDateFormat("EEE MMM").format(calendar.getTime());
        sb.append(dayOfWeekAndMonth).append(" ");

        // Handle single digit dayOfMonth.
        final String dayOfMonth = new SimpleDateFormat("d").format(calendar.getTime());
        sb.append(StringUtils.leftPad(dayOfMonth, 2)).append(" ");

        final String hourOfDay = new SimpleDateFormat("HH").format(calendar.getTime());
        sb.append(hourOfDay);

        final String expected = sb.toString();
        System.out.println("expected = [" + expected + "]");

        assertTrue(result + "\n" + expected, result.startsWith(expected));
    }

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
     * Test the <code>CommandActuator()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new CommandActuator(null);
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
    private CommandActuator create()
    {
        return new CommandActuator("actuator");
    }
}
