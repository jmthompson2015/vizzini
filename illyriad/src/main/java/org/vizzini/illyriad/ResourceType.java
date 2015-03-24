package org.vizzini.illyriad;

/**
 * Provides an enumeration of resource types.
 */
public enum ResourceType
{
    /** Basic. */
    BASIC("Basic"),
    /** Mount. */
    MOUNT("Mounts"),
    /** Spear. */
    SPEAR("Spear"),
    /** Sword. */
    SWORD("Sword"),
    /** Bow. */
    BOW("Bow"),
    /** Leather armour. */
    LEATHER_ARMOUR("Leather Armour"),
    /** Chainmail armour. */
    CHAINMAIL_ARMOUR("Chainmail Armour"),
    /** Plate armour. */
    PLATE_ARMOUR("Plate Armour"),
    /** Beverage. */
    BEVERAGE("Beverage"),
    /** Anatomy. */
    ANATOMY("Anatomies"),
    /** Mineral. */
    MINERAL("Minerals"),
    /** Herb. */
    HERB("Herbs"),
    /** Exotic. */
    EXOTIC("Exotic"),
    /** Elemental. */
    ELEMENTAL("Elemental");

    /** Display name. */
    private final String displayName;

    /**
     * Construct this object with the given parameter.
     * 
     * @param displayName Display name.
     */
    @SuppressWarnings("hiding")
    private ResourceType(final String displayName)
    {
        this.displayName = displayName;
    }

    /**
     * @return the displayName
     */
    public String getDisplayName()
    {
        return displayName;
    }

    /**
     * @return true if this is an armour.
     */
    public boolean isArmour()
    {
        return (this == LEATHER_ARMOUR) || (this == CHAINMAIL_ARMOUR) || (this == PLATE_ARMOUR);
    }

    /**
     * @return true if this is a weapon.
     */
    public boolean isWeapon()
    {
        return (this == SPEAR) || (this == SWORD) || (this == BOW);
    }
}
