define([ "Vector", "ship/Device", "ship/SupplyType" ], function(Vector, Device, SupplyType)
{
    "use strict";
    function AlignmentAutopilot(name, environment, parentKey, position, orientation, consumePerTick)
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
            }

            return isActive;
        };

        this.targetVector = function(newValue)
        {
            if (newValue)
            {
                targetVector = newValue;
                var state = this.environment().state(this.parentKey());
                var initialAzimuth = Math.abs(convertAngle(state.orientation().postMultiply(targetVector).azimuth()));
                var initialElevation = Math
                        .abs(convertAngle(state.orientation().postMultiply(targetVector).elevation()));
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
                if (isPowered())
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

        Vizzini.extend(this, new Device(name, environment, parentKey, position, orientation));

        function convertAngle(angle)
        {
            var answer = angle;

            if (180.0 < angle && angle < 360.0)
            {
                answer -= 360.0;
            }

            return answer;
        }

        function isPowered()
        {
            return that.isSupplied(SupplyType.POWER, that.consumePerTick());
        }

        function propulsionActive(groupKeys, isActive)
        {
            var ship = that.environment().ship(that.parentKey());

            groupKeys.forEach(function(groupKey)
            {
                var propulsionGroup = ship.propulsionGroup(groupKey);

                propulsionGroup.forEach(function(engine)
                {
                    engine.isActive(isActive);
                });
            });
        }

        function update()
        {
            LOGGER.trace("AlignmentAutopilot.update() start");

            // Compute target vector in ship coordinates.
            var state = that.environment().state(that.parentKey());
            var orientation = state.orientation();
            var targetVector = that.targetVector();
            LOGGER.debug("targetVector = " + targetVector.toHeadingString());
            var targetVectorLocal = state.orientation().postMultiply(targetVector);

            var error0 = convertAngle(targetVectorLocal.azimuth()); // azimuth
            var error1 = convertAngle(state.angularVelocity().azimuth()); // velocity azimuth
            var error2 = convertAngle(targetVectorLocal.elevation()); // elevation
            var error3 = convertAngle(state.angularVelocity().elevation()); // velocity elevation

            propulsionActive(azimuthGroups, false);
            propulsionActive(elevationGroups, false);

            // output: one of "portYaw", off, "starboardYaw"
            var azimuthGroup = controlProgram(error0, error1, b, azimuthGroups);
            LOGGER.debug("error0 = " + Math.vizziniRound(error0, 4) + " error1 = " + Math.vizziniRound(error1, 4) +
                    " azimuthGroup = " + azimuthGroup);

            // output: one of "dorsalPitch", off, "ventralPitch"
            var elevationGroup = controlProgram(error2, error3, d, elevationGroups);
            LOGGER.debug("error2 = " + Math.vizziniRound(error2, 4) + " error3 = " + Math.vizziniRound(error3, 4) +
                    " elevationGroup = " + elevationGroup);

            if (azimuthGroup !== "off")
            {
                propulsionActive([ azimuthGroup ], true);
            }

            if (elevationGroup !== "off")
            {
                propulsionActive([ elevationGroup ], true);
            }

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

    return (
    {
        AlignmentAutopilot: AlignmentAutopilot,
    });
});
