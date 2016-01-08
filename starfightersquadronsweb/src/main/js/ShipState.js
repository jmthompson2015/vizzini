define(function()
{
    "use strict";
    function ShipState(pilotSkillValue, primaryWeaponValue, agilityValue, hullValue, shieldValue)
    {
        this.agilityValue = function()
        {
            return agilityValue;
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

    ShipState.ZERO = new ShipState(0, 0, 0, 0, 0);

    return ShipState;
});
