define([ "ship/Device", "ship/SupplyType" ], function(Device, SupplyType)
{
    "use strict";
    function FuelTank(name, environment, parentKey, position, orientation, capacity)
    {
        InputValidator.validateNotNull("capacity", capacity);

        this.capacity = function()
        {
            return capacity;
        };

        var level = capacity;

        this.level = function()
        {
            return level;
        };

        this.produceType = function()
        {
            return SupplyType.FUEL;
        };

        this.request = function(amount)
        {
            var answer = Math.min(level, amount);

            level -= answer;

            return answer;
        };

        Vizzini.extend(this, new Device(name, environment, parentKey, position, orientation));
    }

    FuelTank.prototype.toString = function()
    {
        return "FuelTank " + this.name() + " capacity=" + this.capacity() + " level=" + this.level();
    };

    FuelTank.prototype.tick = function()
    {
    // Nothing to do.
    };

    return (
    {
        FuelTank: FuelTank
    });
});
