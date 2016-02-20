define([ "Quaternion", "Vector", "ship/Device", "ship/SupplyType" ], function(Quaternion, Vector, Device, SupplyType)
{
    "use strict";
    function AlignmentAutopilot(name, environment, parentKey, position, orientation, consumePerTick)
    {
        var that = this;
        var isActive = false;
        var azimuthGroups = [ "portYaw", "starboardYaw" ];
        var elevationGroups = [ "dorsalPitch", "ventralPitch" ];
        var targetVector = Vector.X_AXIS;
        var b = 0.0;
        var d = 0.0;

        this.isActive = function(newValue)
        {
            if (newValue === false || newValue === true)
            {
                isActive = newValue;
                this.trigger("isActive", isActive);
                LOGGER.trace(this.name() + " isActive() ? " + isActive);

                if (!isActive)
                {
                    propulsionActive(azimuthGroups, false);
                    propulsionActive(elevationGroups, false);
                }
            }

            return isActive;
        };

        this.targetVector = function(newValue)
        {
            if (newValue)
            {
                targetVector = newValue;
                var state = this.state();
                var targetVectorLocal = state.orientation().postMultiply(targetVector);
                var initialAzimuth = Math.abs(Computer.convertAngle(targetVectorLocal.azimuth()));
                var initialElevation = Math.abs(Computer.convertAngle(targetVectorLocal.elevation()));
                // Equation derived from hand optimized data: f(10) = -4, f(90) = -11, f(180) = -16
                b = 0.000188 * initialAzimuth * initialAzimuth - 0.106291 * initialAzimuth - 2.955882;
                d = 0.000188 * initialElevation * initialElevation - 0.106291 * initialElevation - 2.955882;
            }

            return targetVector;
        };

        this.tick = function()
        {
            if (this.isActive())
            {
                if (this.isPowered())
                {
                    update();
                }
                else
                {
                    propulsionActive(azimuthGroups, false);
                    propulsionActive(elevationGroups, false);
                }
            }
        };

        Vizzini.extend(this, new Computer(name, environment, parentKey, position, orientation, consumePerTick));

        function propulsionActive(groupKeys, isActive)
        {
            var ship = that.environment().ship(that.parentKey());

            groupKeys.forEach(function(groupKey)
            {
                var propulsionGroup = ship.propulsionGroup(groupKey);

                if (propulsionGroup)
                {
                    propulsionGroup.forEach(function(engine)
                    {
                        engine.throttle(isActive ? 100 : 0);
                    });
                }
            });
        }

        function update()
        {
            LOGGER.trace("AlignmentAutopilot.update() start");

            // Compute target vector in ship coordinates.
            var state = that.state();
            var orientation = state.orientation();
            var targetVector = that.targetVector();
            LOGGER.debug("targetVector = " + targetVector.toHeadingString());
            var targetVectorLocal = state.orientation().postMultiply(targetVector);

            var error0 = Computer.convertAngle(targetVectorLocal.azimuth()); // azimuth
            var error1 = Computer.convertAngle(state.angularVelocity().azimuth()); // velocity azimuth
            var error2 = Computer.convertAngle(targetVectorLocal.elevation()); // elevation
            var error3 = Computer.convertAngle(state.angularVelocity().elevation()); // velocity elevation
            var ratio01 = (error1 === 0 ? 1.0e+20 * Math.sign(error0) : Math.vizziniRound(error0 / error1, 4));
            var ratio23 = (error3 === 0 ? 1.0e+20 * Math.sign(error2) : Math.vizziniRound(error2 / error3, 4));

            propulsionActive(azimuthGroups, false);
            propulsionActive(elevationGroups, false);

            // output: one of "portYaw", off, "starboardYaw"
            var azimuthGroup = controlProgram(error0, error1, b, azimuthGroups);

            // output: one of "dorsalPitch", off, "ventralPitch"
            var elevationGroup = controlProgram(error2, error3, d, elevationGroups);

            LOGGER.debug("errors = " + Math.vizziniRound(error0, 4) + " " + Math.vizziniRound(error1, 4) + " " +
                    Math.vizziniRound(error2, 4) + " " + Math.vizziniRound(error3, 4) + " ratios = " + ratio01 + " " +
                    ratio23 + " groupKeys = " + azimuthGroup + " " + elevationGroup);

            propulsionActive([ azimuthGroup ], true);
            propulsionActive([ elevationGroup ], true);

            LOGGER.trace("AlignmentAutopilot.update() end");
        }

        function controlProgram(error0, error1, b, groupKeys)
        {
            var answer = "off";
            var sum = error0 + b * error1;
            var threshold = 0.5;

            if (sum > threshold)
            {
                answer = groupKeys[0];
            }
            else if (sum < -threshold)
            {
                answer = groupKeys[1];
            }

            return answer;
        }
    }

    AlignmentAutopilot.prototype.toString = function()
    {
        return "AlignmentAutopilot " + this.name() + " consumePerTick=" + this.consumePerTick();
    };

    MicroEvent.mixin(AlignmentAutopilot);

    function FakeAlignmentAutopilot(name, environment, parentKey, position, orientation, consumePerTick)
    {
        var that = this;
        var isActive = false;
        var targetVector = Vector.X_AXIS;
        var myAngularAcceleration = Quaternion.ZERO;

        this.isActive = function(newValue)
        {
            if (newValue === false || newValue === true)
            {
                isActive = newValue;
                this.trigger("isActive", isActive);
            }

            return isActive;
        };

        this.targetVector = function(newValue)
        {
            if (newValue)
            {
                targetVector = newValue;
                var state = this.state();
                var headingVector = state.orientation().preMultiply(Vector.X_AXIS);
                var angle = headingVector.angle(targetVector);
                var stepCount = (angle < 5.0 ? 2 : 10);
                var vector = headingVector.cross(targetVector).unit();
                LOGGER.debug("angle = " + angle + " vector = " + vector.toHeadingString());
                myAngularAcceleration = Quaternion.newInstance(angle / stepCount, vector);
                LOGGER.debug("myAngularAcceleration = " + myAngularAcceleration.toHeadingString());
                state.addAngularAcceleration(myAngularAcceleration);
            }

            return targetVector;
        };

        this.tick = function()
        {
            if (this.isActive() && this.isPowered())
            {
                update();
            }
        };

        Vizzini.extend(this, new Computer(name, environment, parentKey, position, orientation, consumePerTick));

        function update()
        {
            var state = that.state();
            var targetVectorLocal = state.orientation().postMultiply(targetVector);
            var error0 = Computer.convertAngle(targetVectorLocal.azimuth()); // azimuth
            var error1 = Computer.convertAngle(state.angularVelocity().azimuth()); // velocity azimuth
            var error2 = Computer.convertAngle(targetVectorLocal.elevation()); // elevation
            var error3 = Computer.convertAngle(state.angularVelocity().elevation()); // velocity elevation

            LOGGER.debug("errors = " + Math.vizziniRound(error0, 4) + " " + Math.vizziniRound(error1, 4) + " " +
                    Math.vizziniRound(error2, 4) + " " + Math.vizziniRound(error3, 4));

            var threshold = 0.5;

            if (Math.abs(error0) < threshold && Math.abs(error2) < threshold)
            {
                // Done.
                state.zeroRotation();
                that.isActive(false);
            }
        }
    }

    FakeAlignmentAutopilot.prototype.toString = function()
    {
        return "FakeAlignmentAutopilot " + this.name() + " consumePerTick=" + this.consumePerTick();
    };

    MicroEvent.mixin(FakeAlignmentAutopilot);

    function Computer(name, environment, parentKey, position, orientation, consumePerTick)
    {
        InputValidator.validateNotNull("consumePerTick", consumePerTick);

        this.consumePerTick = function()
        {
            return consumePerTick;
        };

        this.consumeType = function()
        {
            return SupplyType.POWER;
        };

        this.isPowered = function()
        {
            return this.isSupplied(SupplyType.POWER, consumePerTick);
        };

        Vizzini.extend(this, new Device(name, environment, parentKey, position, orientation));
    }

    Computer.convertAngle = function(angle)
    {
        var answer = angle;

        if (180.0 < angle && angle < 360.0)
        {
            answer -= 360.0;
        }

        return answer;
    };

    return (
    {
        AlignmentAutopilot: AlignmentAutopilot,
        FakeAlignmentAutopilot: FakeAlignmentAutopilot,
    });
});
