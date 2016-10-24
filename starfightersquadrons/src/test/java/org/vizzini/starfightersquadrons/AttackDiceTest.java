package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.starfightersquadrons.AttackDice;
import org.vizzini.starfightersquadrons.AttackDice.Value;

/**
 * Provides tests for the <code>AttackDice</code> class.
 */
public final class AttackDiceTest
{
    /**
     * Test the <code>changeAllToValue()</code> method.
     */
    @Test
    public void changeAllToValue()
    {
        // Setup.
        final int size = 3;
        final AttackDice dice = new AttackDice(size);
        final int focusCount = dice.getFocusCount();
        final int criticalHitCount = dice.getCriticalHitCount();

        // Run.
        dice.changeAllToValue(Value.FOCUS, Value.CRITICAL_HIT);

        // Run / Verify.
        assertThat(dice.getFocusCount(), is(0));
        assertThat(dice.getCriticalHitCount(), is(focusCount + criticalHitCount));
    }

    /**
     * Test the <code>changeFirstToValue()</code> method.
     */
    @Test
    public void changeFirstToValue()
    {
        // Setup.
        final int size = 3;
        final AttackDice dice = new AttackDice(size);
        final int focusCount = dice.getFocusCount();
        final int criticalHitCount = dice.getCriticalHitCount();

        // Run.
        dice.changeFirstToValue(Value.FOCUS, Value.CRITICAL_HIT);

        // Run / Verify.
        assertThat(dice.getFocusCount(), is(Math.max(focusCount - 1, 0)));
        assertThat(dice.getCriticalHitCount(), is(focusCount == 0 ? criticalHitCount : criticalHitCount + 1));
    }

    /**
     * Test the <code>rollAdditionalDie()</code> method.
     */
    @Test
    public void rollAdditionalDie()
    {
        // Setup.
        final int size = 3;
        final AttackDice dice = new AttackDice(size);

        // Run.
        dice.rollAdditionalDie();

        // Run / Verify.
        assertThat(dice.size(), is(size + 1));
    }

    /**
     * Test the <code>spendFocusToken()</code> method.
     */
    @Test
    public void spendFocusToken()
    {
        // Setup.
        final int size = 3;
        final AttackDice dice = new AttackDice(size);
        final int hitCount = dice.getHitCount();
        final int criticalCount = dice.getCriticalHitCount();
        final int focusCount = dice.getFocusCount();
        final int blankCount = dice.getBlankCount();

        // Run.
        dice.spendFocusToken();

        // Run / Verify.
        assertThat(dice.getHitCount(), is(focusCount + hitCount));
        assertThat(dice.getCriticalHitCount(), is(criticalCount));
        assertThat(dice.getFocusCount(), is(0));
        assertThat(dice.getBlankCount(), is(blankCount));

        for (int i = 0; i < size; i++)
        {
            assertNotNull(dice.getValue(i));
        }
    }

    /**
     * Test the <code>AttackDice()</code> method.
     */
    @Test
    public void testConstructorBadSize()
    {
        try
        {
            new AttackDice(-1);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("size is less than zero."));
        }

        try
        {
            new AttackDice(-2);
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
        final AttackDice dice = new AttackDice(size);

        // Run / Verify.
        for (int i = 0; i < size; i++)
        {
            assertNotNull(dice.getValue(i));
        }
    }
}
