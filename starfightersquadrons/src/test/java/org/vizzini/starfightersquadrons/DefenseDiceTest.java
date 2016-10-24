package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.starfightersquadrons.DefenseDice;
import org.vizzini.starfightersquadrons.DefenseDice.Value;

/**
 * Provides tests for the <code>DefenseDice</code> class.
 */
public final class DefenseDiceTest
{
    /**
     * Test the <code>changeAllToValue()</code> method.
     */
    @Test
    public void changeAllToValue()
    {
        // Setup.
        final int size = 3;
        final DefenseDice dice = new DefenseDice(size);
        final int focusCount = dice.getFocusCount();
        final int evadeCount = dice.getEvadeCount();

        // Run.
        dice.changeAllToValue(Value.FOCUS, Value.EVADE);

        // Run / Verify.
        assertThat(dice.getFocusCount(), is(0));
        assertThat(dice.getEvadeCount(), is(focusCount + evadeCount));
    }

    /**
     * Test the <code>changeFirstToValue()</code> method.
     */
    @Test
    public void changeFirstToValue()
    {
        // Setup.
        final int size = 3;
        final DefenseDice dice = new DefenseDice(size);
        final int focusCount = dice.getFocusCount();
        final int evadeCount = dice.getEvadeCount();

        // Run.
        dice.changeFirstToValue(Value.FOCUS, Value.EVADE);

        // Run / Verify.
        assertThat(dice.getFocusCount(), is(Math.max(focusCount - 1, 0)));
        assertThat(dice.getEvadeCount(), is(focusCount == 0 ? evadeCount : evadeCount + 1));
    }

    /**
     * Test the <code>spendEvadeToken()</code> method.
     */
    @Test
    public void spendEvadeToken()
    {
        // Setup.
        final int size = 3;
        final DefenseDice dice = new DefenseDice(size);
        final int evadeCount = dice.getEvadeCount();
        final int focusCount = dice.getFocusCount();
        final int blankCount = dice.getBlankCount();

        // Run.
        dice.spendEvadeToken();

        // Run / Verify.
        assertThat(dice.size(), is(size + 1));
        assertThat(dice.getEvadeCount(), is(evadeCount + 1));
        assertThat(dice.getFocusCount(), is(focusCount));
        assertThat(dice.getBlankCount(), is(blankCount));

        for (int i = 0; i < size; i++)
        {
            assertNotNull(dice.getValue(i));
        }
    }

    /**
     * Test the <code>spendFocusToken()</code> method.
     */
    @Test
    public void spendFocusToken()
    {
        // Setup.
        final int size = 3;
        final DefenseDice dice = new DefenseDice(size);
        final int evadeCount = dice.getEvadeCount();
        final int focusCount = dice.getFocusCount();
        final int blankCount = dice.getBlankCount();

        // Run.
        dice.spendFocusToken();

        // Run / Verify.
        assertThat(dice.getEvadeCount(), is(focusCount + evadeCount));
        assertThat(dice.getFocusCount(), is(0));
        assertThat(dice.getBlankCount(), is(blankCount));

        for (int i = 0; i < size; i++)
        {
            assertNotNull(dice.getValue(i));
        }
    }

    /**
     * Test the <code>DefenseDice()</code> method.
     */
    @Test
    public void testConstructorBadSize()
    {
        try
        {
            new DefenseDice(-1);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("size is less than zero."));
        }

        try
        {
            new DefenseDice(-2);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("size is less than zero."));
        }
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        // Setup.
        final int size = 3;
        final DefenseDice dice = new DefenseDice(size);

        // Run / Verify.
        for (int i = 0; i < size; i++)
        {
            assertNotNull(dice.getValue(i));
        }
    }
}
