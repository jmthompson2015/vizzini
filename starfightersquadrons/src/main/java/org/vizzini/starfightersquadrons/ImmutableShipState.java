package org.vizzini.starfightersquadrons;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * Provides an immutable ship state.
 */
public final class ImmutableShipState implements ShipState
{
    /** Ship state with zero values. */
    public static final ImmutableShipState ZERO = new ImmutableShipState(0, 0, 0, 0, 0);

    /** Agility value. */
    private final int agilityValue;

    /** Hull value. */
    private final int hullValue;

    /** Pilot skill value. */
    private final int pilotSkillValue;

    /** Primary weapon value. */
    private final int primaryWeaponValue;

    /** Shield value. */
    private final int shieldValue;

    /**
     * Construct this object.
     * 
     * @param pilotSkillValue Pilot skill value.
     * @param primaryWeaponValue Primary weapon value.
     * @param agilityValue Agility value.
     * @param hullValue Hull value.
     * @param shieldValue Shield value.
     */
    @SuppressWarnings("hiding")
    public ImmutableShipState(final int pilotSkillValue, final int primaryWeaponValue, final int agilityValue,
            final int hullValue, final int shieldValue)
    {
        this.pilotSkillValue = pilotSkillValue;
        this.primaryWeaponValue = primaryWeaponValue;
        this.agilityValue = agilityValue;
        this.hullValue = hullValue;
        this.shieldValue = shieldValue;
    }

    /**
     * Construct this object.
     * 
     * @param shipState Ship state.
     */
    public ImmutableShipState(final ShipState shipState)
    {
        this(shipState.getPilotSkillValue(), shipState.getPrimaryWeaponValue(), shipState.getAgilityValue(), shipState
                .getHullValue(), shipState.getShieldValue());
    }

    @Override
    public int getAgilityValue()
    {
        return agilityValue;
    }

    @Override
    public int getHullValue()
    {
        return hullValue;
    }

    @Override
    public int getPilotSkillValue()
    {
        return pilotSkillValue;
    }

    @Override
    public int getPrimaryWeaponValue()
    {
        return primaryWeaponValue;
    }

    @Override
    public int getShieldValue()
    {
        return shieldValue;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
