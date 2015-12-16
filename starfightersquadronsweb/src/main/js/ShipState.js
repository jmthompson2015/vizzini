/*
 * Provides a ship state for Starfighter Squadrons.
 */
define(function()
{
    function ShipState(pilotSkillValue, primaryWeaponValue, agilityValue, hullValue, shieldValue)
    {
        this.getAgilityValue = function()
        {
            return agilityValue;
        }

        this.getHullValue = function()
        {
            return hullValue;
        }

        this.getPilotSkillValue = function()
        {
            return pilotSkillValue;
        }

        this.getPrimaryWeaponValue = function()
        {
            return primaryWeaponValue;
        }

        this.getShieldValue = function()
        {
            return shieldValue;
        }
    };

    ShipState.ZERO = new ShipState(0, 0, 0, 0, 0);

    return ShipState;
});
