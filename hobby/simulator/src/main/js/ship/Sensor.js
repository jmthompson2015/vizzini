define([ "State", "ship/Device", "ship/SupplyType" ], function(State, Device, SupplyType)
{
    "use strict";
    function Camera(name, environment, parentKey, position, orientation, consumePerTick)
    {
        InputValidator.validateNotNull("consumePerTick", consumePerTick);

        this.consumePerTick = function()
        {
            return consumePerTick;
        };

        var that = this;
        var myOutput = {};

        this.consumeType = function()
        {
            return SupplyType.POWER;
        };

        this.produce = function()
        {
            return myOutput;
        };

        this.produceType = function()
        {
            return SupplyType.DATA;
        };

        this.tick = function(isSilent)
        {
            if (isPowered() && !isSilent)
            {
                update();
            }
            else
            {
                myOutput = {};
            }

            if (!isSilent)
            {
                this.trigger("dataUpdated", myOutput);
            }
        };

        Vizzini.extend(this, new Device(name, environment, parentKey, position, orientation));

        function isPowered()
        {
            return that.isSupplied(SupplyType.POWER, that.consumePerTick());
        }

        function update()
        {
            LOGGER.trace("Camera.update() start");

            myOutput = {};

            var myPosition = that.absolutePosition();
            var myOrientation = that.absoluteOrientation();
            var environment = that.environment();
            var bodyKeys = environment.bodyKeys();

            bodyKeys.forEach(function(bodyKey)
            {
                var state = environment.state(bodyKey);

                if (!state) { throw "Can't find state for bodyKey: " + bodyKey; }

                var date = state.date();
                var position = myOrientation.postMultiply(state.position().subtract(myPosition));
                var orientation = state.orientation().multiply(myOrientation).unit();
                myOutput[bodyKey] = new State.SimpleState(date, position, orientation);
            });

            LOGGER.trace("Camera.update() end");
        }
    }

    Camera.prototype.toString = function()
    {
        return "Camera " + this.name() + " consumePerTick=" + this.consumePerTick();
    };

    MicroEvent.mixin(Camera);

    return (
    {
        Camera: Camera
    });
});
