define([ "Quaternion", "Vector", "ship/Device", "ship/SupplyType" ], function(Quaternion, Vector, Device, SupplyType)
{
    "use strict";
    function IonEngine(name, environment, parentKey, position, orientation, consumeFuelPerTick, consumePowerPerTick,
            producePerTick)
    {
        InputValidator.validateNotNull("consumeFuelPerTick", consumeFuelPerTick);
        InputValidator.validateNotNull("consumePowerPerTick", consumePowerPerTick);
        InputValidator.validateNotNull("producePerTick", producePerTick);

        this.consumeFuelPerTick = function()
        {
            return consumeFuelPerTick;
        };

        this.consumePowerPerTick = function()
        {
            return consumePowerPerTick;
        };

        this.producePerTick = function()
        {
            return producePerTick;
        };

        var that = this;
        var throttle = 0;
        var myOutput = {};

        this.isActive = function()
        {
            return (throttle > 0);
        };

        this.produce = function()
        {
            return myOutput;
        };

        this.throttle = function(newValue)
        {
            if (newValue !== undefined && 0 <= newValue && newValue <= 100)
            {
                throttle = newValue;
                LOGGER.info(this.name() + " throttle = " + throttle);
            }

            return throttle;
        };

        this.tick = function()
        {
            // Consume fuel and power to produce thrust, which becomes acceleration and angular acceleration.
            if (this.isActive() && isFueled() && isPowered())
            {
                update();

                this.trigger("dataUpdated", myOutput);
            }
            else
            {
                myOutput = {};
            }
        };

        Vizzini.extend(this, new Device(name, environment, parentKey, position, orientation));

        function isFueled()
        {
            return that.isSupplied(SupplyType.FUEL, that.consumeFuelPerTick());
        }

        function isPowered()
        {
            return that.isSupplied(SupplyType.POWER, that.consumePowerPerTick());
        }

        function update()
        {
            LOGGER.trace("IonEngine.update() start");

            myOutput = {};
            myOutput.shipKey = that.parentKey();

            var position = that.position();
            var orientation = that.orientation();
            var environment = that.environment();
            var ship = environment.ship(that.parentKey());
            var shipState = environment.state(that.parentKey());
            var shipOrientation = shipState.orientation();
            var mass = ship.mass();
            var momentOfInertia = ship.momentOfInertia();

            // a = F / m
            var forceLocal = orientation.preMultiply(Vector.X_AXIS).multiply(that.producePerTick() * throttle / 100.0);
            LOGGER.debug("forceLocal = " + forceLocal);
            var force = shipOrientation.preMultiply(forceLocal);
            LOGGER.debug("force = " + force);
            var acceleration = force.multiply(1.0 / mass);
            LOGGER.debug("acceleration = " + acceleration);

            // torque = r x F and aa = torque / I (where aa=angularAcceleration and I=moment of inertia)
            LOGGER.debug("position = " + position);
            var torqueLocal = position.cross(forceLocal);
            LOGGER.debug("torqueLocal = " + torqueLocal);
            var torque = shipOrientation.preMultiply(torqueLocal);
            LOGGER.debug("torque = " + torque);
            var aa = torque.multiply(1.0 / momentOfInertia);
            var angularAcceleration = Quaternion.newInstance(aa.magnitude() * 180.0 / Math.PI, aa.unit());
            LOGGER.debug("angularAcceleration = " + angularAcceleration);

            myOutput.acceleration = acceleration;
            myOutput.angularAcceleration = angularAcceleration;

            LOGGER.trace("IonEngine.update() end");
        }
    }

    IonEngine.prototype.toString = function()
    {
        return "IonEngine " + this.name() + " consumeFuelPerTick=" + this.consumeFuelPerTick() +
                " consumePowerPerTick=" + this.consumePowerPerTick() + " producePerTick=" + this.producePerTick() +
                " throttle=" + this.throttle();
    };

    MicroEvent.mixin(IonEngine);

    return (
    {
        IonEngine: IonEngine,
    });
});
