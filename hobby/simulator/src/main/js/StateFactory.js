define([ "Body", "JPLHorizons", "Quaternion", "State", "Vector" ], function(Body, JPLHorizons, Quaternion, State,
        Vector)
{
    "use strict";
    var Reference =
    {
        DATE: moment("2016-Jan-22 00:00:00.0000", "YYYY-MMM-DD HH:mm:ss.SSS"),

        createEarthState: function()
        {
            var body = Body.properties[Body.EARTH];
            var position = new Vector(-7.561357919474147E+07, 1.262069098272267E+08, -2.799566829568148E+04); // km
            var orientation = Quaternion.ZERO;
            var velocity = new Vector(-2.596245358914444E+01, -1.551250076715294E+01, 4.301894898413039E-04); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(this.DATE, position, orientation, velocity, angularVelocity);
        },

        createLunaState: function()
        {
            var position = new Vector(-7.565136822630262E+07, 1.265841740842660E+08, -6.103129894522578E+04); // km
            var orientation = Quaternion.ZERO;
            var velocity = new Vector(-2.699663514092948E+01, -1.557892634656363E+01, 1.780050153023804E-02); // km/sec
            var angularVelocity = Quaternion.ZERO;

            return new State.State(this.DATE, position, orientation, velocity, angularVelocity);
        },

        createMarsState: function()
        {
            var body = Body.properties[Body.MARS];
            var position = new Vector(-2.453488126809445E+08, -1.448257689212526E+07, 5.702725398832533E+06); // km
            var orientation = Reference.computeOrientation(body.northPole);
            var velocity = new Vector(2.351151896390406E+00, -2.210471406998296E+01, -5.211780858316031E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(this.DATE, position, orientation, velocity, angularVelocity);
        },

        createMercuryState: function()
        {
            var body = Body.properties[Body.MERCURY];
            var position = new Vector(-4.655269736772238E+07, 2.340402089738802E+07, 6.191685566492947E+06); // km
            var orientation = Reference.computeOrientation(body.northPole);
            var velocity = new Vector(-3.151563668985122E+01, -4.164038960478674E+01, -5.119994272692079E-01); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(this.DATE, position, orientation, velocity, angularVelocity);
        },

        createSolState: function()
        {
            var position = new Vector(5.615246656543500E+05, 2.315536610010385E+05, -2.420308582415251E+04); // km
            var orientation = Quaternion.ZERO;
            var velocity = new Vector(1.087228969233570E-03, 1.203657799485593E-02, -3.669325133155450E-05); // km/sec
            var angularVelocity = Quaternion.ZERO;

            return new State.State(this.DATE, position, orientation, velocity, angularVelocity);
        },

        createVenusState: function()
        {
            var body = Body.properties[Body.VENUS];
            var position = new Vector(-8.403620927028121E+07, -6.704756289839806E+07, 3.935176501556642E+06); // km
            var orientation = Reference.computeOrientation(body.northPole);
            var velocity = new Vector(2.155331421046835E+01, -2.756300898657247E+01, -1.621810352088923E+00); // km/sec
            var angularVelocity = Quaternion.newInstance(body.rotationRate, body.northPole);

            return new State.State(this.DATE, position, orientation, velocity, angularVelocity);
        },

        createStates: function()
        {
            var answer = {};

            answer[Body.SOL] = this.createSolState();
            answer[Body.MERCURY] = this.createMercuryState();
            answer[Body.VENUS] = this.createVenusState();
            answer[Body.EARTH] = this.createEarthState();
            answer[Body.LUNA] = this.createLunaState();
            answer[Body.MARS] = this.createMarsState();

            return answer;
        },
    };

    function Horizons(bodyKeys, callback)
    {
        InputValidator.validateNotEmpty("bodyKeys", bodyKeys);
        InputValidator.validateNotEmpty("callback", callback);

        var index = -1;
        var bodyToState = {};
        var startTime = moment().format("'YYYY-MM-DD HH:mm'");
        LOGGER.debug("startTime = " + startTime);
        var stopTime = moment().add(1, "days").format("'YYYY-MM-DD HH:mm'");
        LOGGER.debug("stopTime = " + stopTime);

        this.createStates = function()
        {
            LOGGER.trace("Horizons.createStates() start");

            setState();

            LOGGER.trace("Horizons.createStates() end");
        };

        function setState(state)
        {
            LOGGER.trace("Horizons.setState() start");
            var bodyKey;

            if (state)
            {
                bodyKey = bodyKeys[index];
                bodyToState[bodyKey] = state;
            }

            index++;

            if (index < bodyKeys.length)
            {
                bodyKey = bodyKeys[index];
                LOGGER.debug(index + " bodyKey = " + bodyKey);
                var body = Body.properties[bodyKey];
                var horizons = new JPLHorizons(body, startTime, stopTime, setState);
                horizons.fetchData();
            }
            else
            {
                callback(bodyToState);
            }

            LOGGER.trace("Horizons.setState() end");
        }
    }

    Reference.computeOrientation = function(northPole)
    {
        InputValidator.validateNotNull("northPole", northPole);

        var angle = Vector.Z_AXIS.angle(northPole);
        var vector = Vector.Z_AXIS.cross(northPole);

        return Quaternion.newInstance(angle, vector);
    };

    Reference.createRelativeState = function(parentState, radius, speed)
    {
        InputValidator.validateNotEmpty("parentState", parentState);
        InputValidator.validateNotEmpty("radius", radius);
        InputValidator.validateNotEmpty("speed", speed);

        var date = parentState.date();
        var position0 = parentState.position();
        var position = new Vector(position0.x() + radius, position0.y(), position0.z());
        var orientation = Quaternion.ZERO;
        var velocity0 = parentState.velocity();
        var velocity = new Vector(velocity0.x(), velocity0.y() + speed, velocity0.z());
        var angularVelocity = Quaternion.ZERO;

        return new State.State(date, position, orientation, velocity, angularVelocity);
    };

    return (
    {
        createRelativeState: Reference.createRelativeState,
        Reference: Reference,
        Horizons: Horizons,
    });
});
