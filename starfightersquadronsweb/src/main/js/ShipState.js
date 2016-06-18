define([ "Value" ], function(Value)
{
    "use strict";
    function ShipState(pilotSkillValueIn, primaryWeaponValue, agilityValue, hullValue, shieldValue, energyValueIn)
    {
        var pilotSkillValue = (pilotSkillValueIn !== undefined ? pilotSkillValueIn : null);
        var energyValue = (energyValueIn !== undefined ? energyValueIn : null);

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

        this.value = function(property)
        {
            var answer;

            switch (property)
            {
            case Value.AGILITY:
                answer = agilityValue;
                break;
            case Value.ENERGY:
                answer = energyValue;
                break;
            case Value.HULL:
                answer = hullValue;
                break;
            case Value.PILOT_SKILL:
                answer = pilotSkillValue;
                break;
            case Value.PRIMARY_WEAPON:
                answer = primaryWeaponValue;
                break;
            case Value.SHIELD:
                answer = shieldValue;
                break;
            default:
                throw "Unknown value property: " + property;
            }

            return answer;
        };
    }

    ShipState.ZERO = new ShipState(0, 0, 0, 0, 0, 0);

    return ShipState;
});
