define([ "Body", "State", "ship/Device", "ship/SupplyType" ], function(Body, State, Device, SupplyType)
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

        this.tick = function()
        {
            if (isPowered())
            {
                update();
            }
            else
            {
                myOutput = {};
            }

            this.trigger("dataUpdated", myOutput);
        };

        Vizzini.extend(this, new Device(name, environment, parentKey, position, orientation));

        function isPowered()
        {
            var answer = false;

            // Consume power to produce data.
            var conduits = that.consumeConduitsByType(that.consumeType());
            var need = that.consumePerTick();

            if (conduits)
            {
                for (var i = 0; need > 0 && i < conduits.length; i++)
                {
                    var conduit = conduits[i];
                    var got = conduit.producer().request(need);

                    need -= got;
                }

                answer = (need === 0);
            }
            else
            {
                throw "No power conduit for " + that;
            }

            return answer;
        }

        function update()
        {
            LOGGER.trace("Sensor.update() start");

            var myPosition = that.absolutePosition();
            var myOrientation = that.absoluteOrientation();
            var environment = that.environment();
            var bodyKeys = environment.bodyKeys();

            myOutput = {};

            bodyKeys.forEach(function(bodyKey)
            {
                var state = environment.state(bodyKey);

                if (!state) { throw "Can't find state for bodyKey: " + bodyKey; }

                var date = state.date();
                var position = myOrientation.postMultiply(state.position().subtract(myPosition));
                var orientation = state.orientation().multiply(myOrientation).unit();
                myOutput[bodyKey] = new State.SimpleState(date, position, orientation);
            });

            LOGGER.trace("Sensor.update() end");
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
