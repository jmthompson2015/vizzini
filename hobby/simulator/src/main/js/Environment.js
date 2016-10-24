define([ "Body", "Constants", "Quaternion", "State", "StateFactory", "Vector", "ship/Ship" ], function(Body, Constants,
        Quaternion, State, StateFactory, Vector, Ship)
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

            var state0 = this.state(this.bodyKeys()[0]);
            var date = (state0 ? state0.date() : moment());
            var myVelocity = (velocity ? velocity : Vector.ZERO);
            var myAngularVelocity = (angularVelocity ? angularVelocity : Quaternion.ZERO);

            var shipKey = ship.name();
            nameToShip[shipKey] = ship;
            shipToState[shipKey] = new State.State(date, position, orientation, myVelocity, myAngularVelocity);

            var devices = ship.devices();
            devices.forEach(function(device)
            {
                if (device.bind)
                {
                    device.bind("dataUpdated", updateDevice);
                }
            });
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

        this.shipKeys = function()
        {
            return Object.getOwnPropertyNames(shipToState);
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

        this.tick = function(isSilent)
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

            var ship;

            for (shipKey in shipToState)
            {
                ship = nameToShip[shipKey];
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

            // Update ship devices.
            for (shipKey in shipToState)
            {
                ship = nameToShip[shipKey];
                ship.tick(isSilent);
            }

            // Integrate states.
            for ( var bodyKey in bodyToState)
            {
                bodyToState[bodyKey].tick(isSilent);
            }

            for (shipKey in shipToState)
            {
                shipToState[shipKey].tick(isSilent);
            }

            if (!isSilent)
            {
                this.trigger("tick", this);
            }

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

            return runit.multiply(amag);
        }

        function updateDevice(myOutput)
        {
            if (myOutput.acceleration && myOutput.angularAcceleration)
            {
                var state = that.state(myOutput.shipKey);
                state.addAcceleration(myOutput.acceleration);
                state.addAngularAcceleration(myOutput.angularAcceleration);
            }
        }
    }

    MicroEvent.mixin(Environment);

    function Reference()
    {
        var stateFactory = StateFactory.Reference;
        var bodyToState = stateFactory.createStates();
        var environment = new Environment(bodyToState);

        // Add observer satellites.
        var solState = bodyToState[Body.SOL];

        for ( var bodyKey in bodyToState)
        {
            var body = Body.properties[bodyKey];
            var name = body.name + " Observer";
            var parentState = bodyToState[bodyKey];
            var distance = 3.0 * body.maxRadius;
            var satellite = new Ship.ObserverSatellite(name, environment);
            var state = StateFactory.createCircularOrbit(solState, bodyKey, parentState, distance);
            environment.addShip(satellite, state.position(), state.orientation(), state.velocity(), state
                    .angularVelocity());
        }

        // Add a ship.
        var ship = new Ship.ReferenceShip("ReferenceShip", environment);
        var state0 = bodyToState[Body.EARTH];
        var position0 = state0.position();
        var position = new Vector(position0.x() - 5.0e+04, position0.y(), position0.z());
        var orientation = Quaternion.ZERO;
        var velocity = state0.velocity();
        environment.addShip(ship, position, orientation, velocity);

        return environment;
    }

    return (
    {
        Environment: Environment,
        Reference: Reference,
    });
});
