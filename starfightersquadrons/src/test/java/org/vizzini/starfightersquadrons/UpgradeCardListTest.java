package org.vizzini.starfightersquadrons;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.starfightersquadrons.UpgradeCard;
import org.vizzini.starfightersquadrons.UpgradeCardList;
import org.vizzini.starfightersquadrons.UpgradeType;
import org.vizzini.starfightersquadrons.UpgradeCard.SecondaryWeaponUpgradeCard;

/**
 * Provides tests for the <code>UpgradeCardList</code> class.
 */
public final class UpgradeCardListTest
{
    /**
     * Test the <code>getSecondaryWeaponUpgrades()</code> method.
     */
    @Test
    public void getSecondaryWeaponUpgrades()
    {
        // Setup.
        final UpgradeCardList upgrades = new UpgradeCardList();
        upgrades.add(SecondaryWeaponUpgradeCard.ADVANCED_PROTON_TORPEDOES);
        upgrades.add(SecondaryWeaponUpgradeCard.ASSAULT_MISSILES);
        upgrades.add(SecondaryWeaponUpgradeCard.AUTOBLASTER);
        upgrades.add(SecondaryWeaponUpgradeCard.BLASTER_TURRET);
        upgrades.add(UpgradeCard.R2_ASTROMECH);
        upgrades.add(UpgradeCard.ADRENALINE_RUSH);

        // Run.
        final UpgradeCardList result = upgrades.getSecondaryWeaponUpgrades();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(4));
        assertThat(result.get(0), is(SecondaryWeaponUpgradeCard.ADVANCED_PROTON_TORPEDOES));
        assertThat(result.get(3), is(SecondaryWeaponUpgradeCard.BLASTER_TURRET));
    }

    /**
     * Test the <code>UpgradeCardList()</code> method.
     */
    @Test
    public void testCopyConstructor()
    {
        // Setup.
        final UpgradeCardList upgrades = new UpgradeCardList();
        upgrades.add(UpgradeCard.R2_ASTROMECH);
        upgrades.add(UpgradeCard.R2_D2);
        upgrades.add(UpgradeCard.R2_D6);
        upgrades.add(UpgradeCard.R2_F2);
        upgrades.add(UpgradeCard.ADRENALINE_RUSH);
        upgrades.add(UpgradeCard.DAREDEVIL);
        upgrades.add(UpgradeCard.DECOY);

        // Run.
        final UpgradeCardList result = new UpgradeCardList(upgrades);

        // Verify.
        assertThat(result.size(), is(upgrades.size()));
    }

    /**
     * Test the <code>valuesByType()</code> method.
     */
    @Test
    public void valuesByType()
    {
        // Setup.
        final UpgradeCardList upgrades = new UpgradeCardList();
        upgrades.add(UpgradeCard.R2_ASTROMECH);
        upgrades.add(UpgradeCard.R2_D2);
        upgrades.add(UpgradeCard.R2_D6);
        upgrades.add(UpgradeCard.R2_F2);
        upgrades.add(UpgradeCard.ADRENALINE_RUSH);
        upgrades.add(UpgradeCard.DAREDEVIL);
        upgrades.add(UpgradeCard.DECOY);

        {
            // Run.
            final UpgradeCardList result = upgrades.valuesByType(UpgradeType.ASTROMECH);

            // Verify.
            assertNotNull(result);
            assertThat(result.size(), is(4));
            assertThat(result.get(0), is(UpgradeCard.R2_ASTROMECH));
            assertThat(result.get(3), is(UpgradeCard.R2_F2));
        }

        {
            // Run.
            final UpgradeCardList result = upgrades.valuesByType(UpgradeType.ELITE);

            // Verify.
            assertNotNull(result);
            assertThat(result.size(), is(3));
            assertThat(result.get(0), is(UpgradeCard.ADRENALINE_RUSH));
            assertThat(result.get(2), is(UpgradeCard.DECOY));
        }

        {
            // Run.
            final UpgradeCardList result = upgrades.valuesByType(UpgradeType.CREW);

            // Verify.
            assertNotNull(result);
            assertTrue(result.isEmpty());
        }
    }
}
