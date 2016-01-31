define([ "ship/Device", "ship/SupplyType" ], function(Device, SupplyType)
{
    "use strict";
    function FusionReactor(name, environment, parentKey, position, orientation, consumePerTick, producePerTick)
    {
        InputValidator.validateNotNull("consumePerTick", consumePerTick);
        InputValidator.validateNotNull("producePerTick", producePerTick);

        this.consumePerTick = function()
        {
            return consumePerTick;
        };

        this.producePerTick = function()
        {
            return producePerTick;
        };

        this.consumeType = function()
        {
            return SupplyType.FUEL;
        };

        this.produceType = function()
        {
            return SupplyType.POWER;
        };

        var level = producePerTick;

        this.level = function()
        {
            return level;
        };

        this.request = function(amount)
        {
            var answer = 0;

            // Consume fuel to produce power.
            var conduits = this.consumeConduitsByType(SupplyType.FUEL);

            if (conduits)
            {
                var need = consumePerTick;

                for (var i = 0; need > 0 && i < conduits.length; i++)
                {
                    var conduit = conduits[i];
                    var got = conduit.producer().request(need);

                    need -= got;
                    level -= got;
                    answer += got;
                }
            }
            else
            {
                throw "No fuel conduit for " + this;
            }

            return answer;
        };

        this.tick = function()
        {
            level = producePerTick;
        };

        Vizzini.extend(this, new Device(name, environment, parentKey, position, orientation));
    }

    FusionReactor.prototype.toString = function()
    {
        return "FusionReactor " + this.name() + " consumePerTick=" + this.consumePerTick() + " producePerTick=" +
                this.producePerTick();
    };

    return (
    {
        FusionReactor: FusionReactor
    });
});
