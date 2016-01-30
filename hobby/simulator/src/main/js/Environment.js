define([ "Body", "Constants", "Quaternion", "State", "Vector" ], function(Body, Constants, Quaternion, State, Vector)
{
    "use strict";
    function Environment(bodyToState)
    {
        InputValidator.validateNotNull("bodyToState", bodyToState);

        var that = this;
        var nameToShip = {};
        var shipToState = {};

        this.addShip = function(ship, position, orientation, velocity, angularVelocity)
        {
            InputValidator.validateNotNull("ship", ship);
            InputValidator.validateNotNull("position", position);
            InputValidator.validateNotNull("orientation", orientation);

            var julianDate = 0.0;
            var myVelocity = (velocity ? velocity : Vector.ZERO);
            var myAngularVelocity = (angularVelocity ? angularVelocity : Quaternion.ZERO);

            var shipKey = ship.name();
            nameToShip[shipKey] = ship;
            shipToState[shipKey] = new State.State(julianDate, position, orientation, myVelocity, myAngularVelocity);
        };

        this.bodyKeys = function()
        {
            return Object.getOwnPropertyNames(bodyToState);
        };

        this.ship = function(shipKey)
        {
            InputValidator.validateNotNull("shipKey", shipKey);

            return nameToShip[shipKey];
        };

        this.state = function(bodyKey)
        {
            InputValidator.validateNotNull("bodyKey", bodyKey);

            var answer = bodyToState[bodyKey];

            if (!answer)
            {
                answer = shipToState[bodyKey];
            }

            return answer;
        };

        this.tick = function()
        {
            LOGGER.trace("Environment.tick() start");

            // Assign acceleration due to gravity.
            var state0, mass0, position0;
            var bodyKey1, mass1, position1;
            var shipKey;

            for ( var bodyKey0 in bodyToState)
            {
                state0 = this.state(bodyKey0);
                mass0 = Body.properties[bodyKey0].mass;
                position0 = state0.position();

                for (bodyKey1 in bodyToState)
                {
                    if (bodyKey0 !== bodyKey1)
                    {
                        mass1 = Body.properties[bodyKey1].mass;
                        position1 = that.state(bodyKey1).position();
                        state0.addAcceleration(computeGravityAcceleration(mass1, position1, mass0, position0));
                    }
                }
            }

            for (shipKey in shipToState)
            {
                var ship = nameToShip[shipKey];
                state0 = shipToState[shipKey];
                mass0 = ship.mass();
                position0 = state0.position();

                for (bodyKey1 in bodyToState)
                {
                    if (bodyKey0 !== bodyKey1)
                    {
                        mass1 = Body.properties[bodyKey1].mass;
                        position1 = that.state(bodyKey1).position();
                        state0.addAcceleration(computeGravityAcceleration(mass1, position1, mass0, position0));
                    }
                }
            }

            // Integrate states.
            for ( var bodyKey in bodyToState)
            {
                bodyToState[bodyKey].tick();
            }

            for (shipKey in shipToState)
            {
                shipToState[shipKey].tick();
            }

            this.trigger("dataUpdated", this);

            LOGGER.trace("Environment.tick() end");
        };

        function computeGravityAcceleration(mass1, position1, mass2, position2)
        {
            // F = G * m1 * m2 / r^2
            var r = position2.subtract(position1);
            var rmag2 = r.magnitudeSquared();

            // the force applied on object 2 due to object 1
            var fmag = -Constants.G * mass1 * mass2 / rmag2;

            // a = F / m
            var amag = fmag / mass2;
            var runit = r.unit();

            return new Vector(amag * runit.x(), amag * runit.y(), amag * runit.z());
        }
    }

    MicroEvent.mixin(Environment);

    return Environment;
});
