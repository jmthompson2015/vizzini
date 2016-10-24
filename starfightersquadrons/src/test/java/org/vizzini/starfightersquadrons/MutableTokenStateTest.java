package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.starfightersquadrons.DamageCard;
import org.vizzini.starfightersquadrons.MutableTokenState;

/**
 * Provides tests for the <code>MutableTokenState</code> class.
 */
public final class MutableTokenStateTest
{
    /**
     * Test the <code>addCriticalDamage()</code> method.
     */
    @Test
    public void addCriticalDamage()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);
        assertThat(tokenState.getDamageCount(), is(0));

        // Run / Verify.
        tokenState.addCriticalDamage(DamageCard.BLINDED_PILOT);
        assertThat(tokenState.getCriticalDamageCount(), is(1));
        tokenState.addCriticalDamage(DamageCard.CONSOLE_FIRE);
        assertThat(tokenState.getCriticalDamageCount(), is(2));
        assertTrue(tokenState.getCriticalDamages().contains(DamageCard.BLINDED_PILOT));
        assertTrue(tokenState.getCriticalDamages().contains(DamageCard.CONSOLE_FIRE));
    }

    /**
     * Test the <code>addDamage()</code> method.
     */
    @Test
    public void addDamage()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);
        assertThat(tokenState.getDamageCount(), is(0));

        // Run / Verify.
        tokenState.addDamage(DamageCard.BLINDED_PILOT);
        assertThat(tokenState.getDamageCount(), is(1));
        tokenState.addDamage(DamageCard.CONSOLE_FIRE);
        assertThat(tokenState.getDamageCount(), is(2));
        assertTrue(tokenState.getDamages().contains(DamageCard.BLINDED_PILOT));
        assertTrue(tokenState.getDamages().contains(DamageCard.CONSOLE_FIRE));
    }

    /**
     * Test the <code>clearCloakCount()</code> method.
     */
    @Test
    public void clearCloakCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);
        tokenState.increaseCloakCount();
        tokenState.increaseCloakCount();
        assertThat(tokenState.getCloakCount(), is(2));

        // Run.
        tokenState.clearCloakCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(0));
    }

    /**
     * Test the <code>clearEvadeCount()</code> method.
     */
    @Test
    public void clearEvadeCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);
        tokenState.increaseEvadeCount();
        tokenState.increaseEvadeCount();
        assertThat(tokenState.getEvadeCount(), is(2));

        // Run.
        tokenState.clearEvadeCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(0));
    }

    /**
     * Test the <code>clearFocusCount()</code> method.
     */
    @Test
    public void clearFocusCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);
        tokenState.increaseFocusCount();
        tokenState.increaseFocusCount();
        assertThat(tokenState.getFocusCount(), is(2));

        // Run.
        tokenState.clearFocusCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(0));
    }

    /**
     * Test the <code>decreaseCloakCount()</code> method.
     */
    @Test
    public void decreaseCloakCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);
        tokenState.increaseCloakCount();
        tokenState.increaseCloakCount();

        // Run.
        tokenState.decreaseCloakCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(1));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(0));
    }

    /**
     * Test the <code>decreaseEvadeCount()</code> method.
     */
    @Test
    public void decreaseEvadeCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);
        tokenState.increaseEvadeCount();
        tokenState.increaseEvadeCount();

        // Run.
        tokenState.decreaseEvadeCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(1));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(0));
    }

    /**
     * Test the <code>decreaseFocusCount()</code> method.
     */
    @Test
    public void decreaseFocusCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);
        tokenState.increaseFocusCount();
        tokenState.increaseFocusCount();

        // Run.
        tokenState.decreaseFocusCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(1));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(0));
    }

    /**
     * Test the <code>decreaseIonCount()</code> method.
     */
    @Test
    public void decreaseIonCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);
        tokenState.increaseIonCount();
        tokenState.increaseIonCount();

        // Run.
        tokenState.decreaseIonCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(1));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(0));
    }

    /**
     * Test the <code>decreaseShieldCount()</code> method.
     */
    @Test
    public void decreaseShieldCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);
        tokenState.increaseShieldCount();
        tokenState.increaseShieldCount();

        // Run.
        tokenState.decreaseShieldCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(4));
        assertThat(tokenState.getStressCount(), is(0));
    }

    /**
     * Test the <code>decreaseStressCount()</code> method.
     */
    @Test
    public void decreaseStressCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);
        tokenState.increaseStressCount();
        tokenState.increaseStressCount();

        // Run.
        tokenState.decreaseStressCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(1));
    }

    /**
     * Test the <code>increaseCloakCount()</code> method.
     */
    @Test
    public void increaseCloakCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);

        // Run.
        tokenState.increaseCloakCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(1));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(0));
    }

    /**
     * Test the <code>increaseEvadeCount()</code> method.
     */
    @Test
    public void increaseEvadeCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);

        // Run.
        tokenState.increaseEvadeCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(1));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(0));
    }

    /**
     * Test the <code>increaseFocusCount()</code> method.
     */
    @Test
    public void increaseFocusCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);

        // Run.
        tokenState.increaseFocusCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(1));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(0));
    }

    /**
     * Test the <code>increaseIonCount()</code> method.
     */
    @Test
    public void increaseIonCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);

        // Run.
        tokenState.increaseIonCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(1));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(0));
    }

    /**
     * Test the <code>increaseShieldCount()</code> method.
     */
    @Test
    public void increaseShieldCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);

        // Run.
        tokenState.increaseShieldCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(4));
        assertThat(tokenState.getStressCount(), is(0));
    }

    /**
     * Test the <code>increaseStressCount()</code> method.
     */
    @Test
    public void increaseStressCount()
    {
        // Setup.
        final int shieldCount = 3;
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);

        // Run.
        tokenState.increaseStressCount();

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(1));
    }

    /**
     * Test the <code>MutableTokenState()</code> method.
     */
    @Test
    public void testConstructor()
    {
        // Setup.
        final int shieldCount = 3;

        // Run.
        final MutableTokenState tokenState = new MutableTokenState(shieldCount);

        // Verify.
        assertThat(tokenState.getCloakCount(), is(0));
        assertThat(tokenState.getCriticalDamageCount(), is(0));
        assertThat(tokenState.getDamageCount(), is(0));
        assertThat(tokenState.getEvadeCount(), is(0));
        assertThat(tokenState.getFocusCount(), is(0));
        assertThat(tokenState.getIonCount(), is(0));
        assertThat(tokenState.getShieldCount(), is(3));
        assertThat(tokenState.getStressCount(), is(0));
    }
}
