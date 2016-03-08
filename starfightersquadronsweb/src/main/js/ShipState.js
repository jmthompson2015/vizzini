define(function()
{
    "use strict";
    function ShipState(pilotSkillValue, primaryWeaponValue, agilityValue, hullValue, shieldValue, energyValue)
    {
        this.agilityValue = function()
        {
            return agilityValue;
        };

        this.energyValue = function()
        {
            return energyValue;
        };

        this.hullValue = function()
        {
            return hullValue;
        };

        this.pilotSkillValue = function()
        {
            return pilotSkillValue;
        };

        this.primaryWeaponValue = function()
        {
            return primaryWeaponValue;
        };

        this.shieldValue = function()
        {
            return shieldValue;
        };
    }

    ShipState.ZERO = new ShipState(0, 0, 0, 0, 0, 0);

    return ShipState;
});
