package org.vizzini.core;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Test;

/**
 * Provides tests for the <code>InputValidator</code> class.
 */
public class InputValidatorTest
{
    /**
     * Test the <code>validateNotEmpty()</code> method.
     */
    @Test
    public void validateNotEmptyArray()
    {
        // Setup.
        final String[] array = new String[2];
        array[0] = "one";
        array[1] = "two";

        // Run / Verify.
        InputValidator.validateNotEmpty("array", array);
    }

    /**
     * Test the <code>validateNotEmpty()</code> method.
     */
    @Test
    public void validateNotEmptyArrayEmpty()
    {
        // Setup.
        final String[] array = new String[0];

        // Run / Verify.
        try
        {
            InputValidator.validateNotEmpty("array", array);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("array is null or empty."));
        }
    }

    /**
     * Test the <code>validateNotEmpty()</code> method.
     */
    @Test
    public void validateNotEmptyArrayNull()
    {
        // Setup.
        final String[] array = null;

        // Run / Verify.
        try
        {
            InputValidator.validateNotEmpty("array", array);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("array is null or empty."));
        }
    }

    /**
     * Test the <code>validateNotEmpty()</code> method.
     */
    @Test
    public void validateNotEmptyList()
    {
        // Setup.
        final List<String> list = new ArrayList<String>();
        list.add("one");

        // Run / Verify.
        InputValidator.validateNotEmpty("list", list);
    }

    /**
     * Test the <code>validateNotEmpty()</code> method.
     */
    @Test
    public void validateNotEmptyListEmpty()
    {
        // Setup.
        final List<String> list = new ArrayList<String>();

        // Run / Verify.
        try
        {
            InputValidator.validateNotEmpty("list", list);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("list is null or empty."));
        }
    }

    /**
     * Test the <code>validateNotEmpty()</code> method.
     */
    @Test
    public void validateNotEmptyListNull()
    {
        // Setup.
        final List<String> list = null;

        // Run / Verify.
        try
        {
            InputValidator.validateNotEmpty("list", list);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("list is null or empty."));
        }
    }

    /**
     * Test the <code>validateNotEmpty()</code> method.
     */
    @Test
    public void validateNotEmptyMap()
    {
        // Setup.
        final Map<String, String> map = new HashMap<String, String>();
        map.put("one", "two");

        // Run / Verify.
        InputValidator.validateNotEmpty("map", map);
    }

    /**
     * Test the <code>validateNotEmpty()</code> method.
     */
    @Test
    public void validateNotEmptyMapEmpty()
    {
        // Setup.
        final Map<String, String> map = new HashMap<String, String>();

        // Run / Verify.
        try
        {
            InputValidator.validateNotEmpty("map", map);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("map is null or empty."));
        }
    }

    /**
     * Test the <code>validateNotEmpty()</code> method.
     */
    @Test
    public void validateNotEmptyMapNull()
    {
        // Setup.
        final Map<String, String> map = null;

        // Run / Verify.
        try
        {
            InputValidator.validateNotEmpty("map", map);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("map is null or empty."));
        }
    }

    /**
     * Test the <code>validateNotEmpty()</code> method.
     */
    @Test
    public void validateNotEmptyString()
    {
        // Setup.
        final String string = "one";

        // Run / Verify.
        InputValidator.validateNotEmpty("string", string);
    }

    /**
     * Test the <code>validateNotEmpty()</code> method.
     */
    @Test
    public void validateNotEmptyStringEmpty()
    {
        // Setup.
        final String string = "";

        // Run / Verify.
        try
        {
            InputValidator.validateNotEmpty("string", string);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("string is null or empty."));
        }
    }

    /**
     * Test the <code>validateNotEmpty()</code> method.
     */
    @Test
    public void validateNotEmptyStringNull()
    {
        // Setup.
        final String string = null;

        // Run / Verify.
        try
        {
            InputValidator.validateNotEmpty("string", string);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("string is null or empty."));
        }
    }

    /**
     * Test the <code>validateNotNegative()</code> method.
     */
    @Test
    public void validateNotNegativeMinusOne()
    {
        // Setup.
        final int value = -1;

        // Run / Verify.
        try
        {
            InputValidator.validateNotNegative("value", value);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("value is less than zero."));
        }
    }

    /**
     * Test the <code>validateNotNegative()</code> method.
     */
    @Test
    public void validateNotNegativeZero()
    {
        // Setup.
        final int value = 0;

        // Run / Verify.
        InputValidator.validateNotNegative("value", value);
    }

    /**
     * Test the <code>validateNotNull()</code> method.
     */
    @Test
    public void validateNotNullString()
    {
        // Setup.
        final String string = "";

        // Run / Verify.
        InputValidator.validateNotNull("string", string);
    }

    /**
     * Test the <code>validateNotNull()</code> method.
     */
    @Test
    public void validateNotNullStringNull()
    {
        // Setup.
        final String string = null;

        // Run / Verify.
        try
        {
            InputValidator.validateNotNull("string", string);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("string is null."));
        }
    }

    /**
     * Test the <code>validatePositive()</code> method.
     */
    @Test
    public void validatePositiveOne()
    {
        // Setup.
        final int value = 1;

        // Run / Verify.
        InputValidator.validatePositive("value", value);
    }

    /**
     * Test the <code>validatePositive()</code> method.
     */
    @Test
    public void validatePositiveZero()
    {
        // Setup.
        final int value = 0;

        // Run / Verify.
        try
        {
            InputValidator.validatePositive("value", value);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("value is zero or less."));
        }
    }
}
