package org.vizzini.illyriad;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>ResourceType</code> class.
 */
public final class ResourceTypeTest
{
    /**
     * Test the <code>isArmour()</code> method.
     */
    @Test
    public void isArmour()
    {
        assertFalse(ResourceType.BOW.isArmour());
        assertTrue(ResourceType.CHAINMAIL_ARMOUR.isArmour());
        assertTrue(ResourceType.LEATHER_ARMOUR.isArmour());
        assertFalse(ResourceType.MOUNT.isArmour());
        assertTrue(ResourceType.PLATE_ARMOUR.isArmour());
        assertFalse(ResourceType.SPEAR.isArmour());
        assertFalse(ResourceType.SWORD.isArmour());
    }

    /**
     * Test the <code>isWeapon()</code> method.
     */
    @Test
    public void isWeapon()
    {
        assertTrue(ResourceType.BOW.isWeapon());
        assertFalse(ResourceType.CHAINMAIL_ARMOUR.isWeapon());
        assertFalse(ResourceType.LEATHER_ARMOUR.isWeapon());
        assertFalse(ResourceType.MOUNT.isWeapon());
        assertFalse(ResourceType.PLATE_ARMOUR.isWeapon());
        assertTrue(ResourceType.SPEAR.isWeapon());
        assertTrue(ResourceType.SWORD.isWeapon());
    }
}
