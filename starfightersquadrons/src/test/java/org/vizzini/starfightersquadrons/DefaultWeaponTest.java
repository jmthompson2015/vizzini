package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.starfightersquadrons.DefaultWeapon;
import org.vizzini.starfightersquadrons.RangeRuler.Range;

/**
 * Provides tests for the <code>DefaultWeapon</code> class.
 */
public final class DefaultWeaponTest
{
    /**
     * Test the <code>phaseEffect()</code> method.
     */
    @Test
    public void testConstructor()
    {
        // Setup.
        final String name = "primary";
        final boolean isPrimary = true;
        final int weaponValue = 3;

        // Run.
        final DefaultWeapon result = new DefaultWeapon(name, isPrimary, weaponValue, Range.ONE, Range.THREE);

        // Verify.
        assertThat(result.getName(), is(name));
        assertThat(result.getWeaponValue(), is(weaponValue));
        assertThat(result.getRanges().size(), is(2));
    }

    /**
     * Test the <code>phaseEffect()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        // Setup.
        final String name = "primary";
        final boolean isPrimary = true;
        final int weaponValue = 3;

        // Run / Verify.
        try
        {
            new DefaultWeapon(null, isPrimary, weaponValue, Range.ONE, Range.THREE);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty."));
        }

        // Run / Verify.
        try
        {
            new DefaultWeapon("", isPrimary, weaponValue, Range.ONE, Range.THREE);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty."));
        }

        // Run / Verify.
        try
        {
            new DefaultWeapon(name, isPrimary, 0, Range.ONE, Range.THREE);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("weaponValue is zero or less."));
        }

        // Run / Verify.
        try
        {
            new DefaultWeapon(name, isPrimary, weaponValue, (Range[])null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("ranges is null or empty."));
        }

        // Run / Verify.
        try
        {
            new DefaultWeapon(name, isPrimary, weaponValue, new Range[0]);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("ranges is null or empty."));
        }
    }
}
