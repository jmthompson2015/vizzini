package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.starfightersquadrons.DamageCard;
import org.vizzini.starfightersquadrons.DamageCardList;
import org.vizzini.starfightersquadrons.DamageCard.Trait;

/**
 * Provides tests for the <code>DamageCardList</code> class.
 */
public final class DamageCardListTest
{
    /**
     * Test the <code>valuesByTrait()</code> method.
     */
    @Test
    public void valuesByTraitPilot()
    {
        // Setup.
        final DamageCardList damages = new DamageCardList();
        damages.add(DamageCard.BLINDED_PILOT);
        damages.add(DamageCard.CONSOLE_FIRE);
        damages.add(DamageCard.DAMAGED_COCKPIT);
        damages.add(DamageCard.DAMAGED_ENGINE);

        // Run.
        final DamageCardList result = damages.valuesByTrait(Trait.PILOT);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));
        assertThat(result.get(0), is(DamageCard.BLINDED_PILOT));
        assertThat(result.get(1), is(DamageCard.DAMAGED_COCKPIT));
    }

    /**
     * Test the <code>valuesByTrait()</code> method.
     */
    @Test
    public void valuesByTraitShip()
    {
        // Setup.
        final DamageCardList damages = new DamageCardList();
        damages.add(DamageCard.BLINDED_PILOT);
        damages.add(DamageCard.CONSOLE_FIRE);
        damages.add(DamageCard.DAMAGED_COCKPIT);
        damages.add(DamageCard.DAMAGED_ENGINE);

        // Run.
        final DamageCardList result = damages.valuesByTrait(Trait.SHIP);

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));
        assertThat(result.get(0), is(DamageCard.CONSOLE_FIRE));
        assertThat(result.get(1), is(DamageCard.DAMAGED_ENGINE));
    }
}
