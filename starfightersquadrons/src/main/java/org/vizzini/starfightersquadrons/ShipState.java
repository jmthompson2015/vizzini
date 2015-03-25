package org.vizzini.starfightersquadrons;

/**
 * Defines methods required by a ship state.
 */
public interface ShipState
{
    /**
     * @return the agilityValue
     */
    int getAgilityValue();

    /**
     * @return the hullValue
     */
    int getHullValue();

    /**
     * @return the pilotSkillValue
     */
    int getPilotSkillValue();

    /**
     * @return the primaryWeaponValue
     */
    int getPrimaryWeaponValue();

    /**
     * @return the shieldValue
     */
    int getShieldValue();
}
