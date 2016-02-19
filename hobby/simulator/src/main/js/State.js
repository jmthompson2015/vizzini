define([ "Quaternion", "Vector" ], function(Quaternion, Vector)
{
    "use strict";
    /*
     * @param date Date value of type moment.
     */
    function SimpleState(date, position, orientation)
    {
        InputValidator.validateNotNull("date", date);
        InputValidator.validateNotNull("position", position);
        InputValidator.validateNotNull("orientation", orientation);

        date = moment(date);

        this.date = function()
        {
            return date;
        };

        this.position = function()
        {
            return position;
        };

        this.orientation = function()
        {
            return orientation;
        };
    }

    SimpleState.prototype.toString = function()
    {
        return "SimpleState date=" + this.date().format("YYYY-MM-DD HH:mm:ss.SSS") + " position=" + this.position() +
                " orientation=" + this.orientation();
    };

    function State(initialDate, initialPosition, initialOrientation, initialVelocity, initialAngularVelocity)
    {
        InputValidator.validateNotNull("initialDate", initialDate);
        InputValidator.validateNotNull("initialPosition", initialPosition);
        InputValidator.validateNotNull("initialOrientation", initialOrientation);
        InputValidator.validateNotNull("initialVelocity", initialVelocity);
        InputValidator.validateNotNull("initialAngularVelocity", initialAngularVelocity);

        var date = moment(initialDate);
        var position = initialPosition;
        var orientation = initialOrientation;
        var velocity = initialVelocity;
        var angularVelocity = initialAngularVelocity;
        var acceleration = Vector.ZERO;
        var angularAcceleration = Quaternion.ZERO;

        this.date = function()
        {
            return date;
        };

        this.position = function()
        {
            return position;
        };

        this.orientation = function()
        {
            return orientation;
        };

        this.velocity = function()
        {
            return velocity;
        };

        this.angularVelocity = function()
        {
            return angularVelocity;
        };

        this.acceleration = function()
        {
            return acceleration;
        };

        this.angularAcceleration = function()
        {
            return angularAcceleration;
        };

        this.addAcceleration = function(newAcceleration)
        {
            InputValidator.validateNotNull("newAcceleration", newAcceleration);

            acceleration = acceleration.add(newAcceleration);
        };

        this.addAngularAcceleration = function(newAngularAcceleration)
        {
            InputValidator.validateNotNull("newAngularAcceleration", newAngularAcceleration);

            angularAcceleration = angularAcceleration.multiply(newAngularAcceleration).unit();
        };

        this.angularMomentum = function()
        {
            var r = this.position();
            var v = this.velocity();

            return r.cross(v);
        }

        this.tick = function()
        {
            // TODO: numerical integration
            date = date.add(1, "seconds");
            position = position.add(velocity);
            orientation = angularVelocity.multiply(orientation).unit();
            velocity = velocity.add(acceleration);
            angularVelocity = angularAcceleration.multiply(angularVelocity).unit();

            // Clean up.
            acceleration = Vector.ZERO;
            angularAcceleration = Quaternion.ZERO;
        };

        this.zeroRotation = function()
        {
            angularVelocity = Quaternion.ZERO;
            angularAcceleration = Quaternion.ZERO;
        };
    }

    State.prototype.toString = function()
    {
        return "State date=" + this.date().format("YYYY-MM-DD HH:mm:ss.SSS") + " position=" + this.position() +
                " orientation=" + this.orientation();
    };

    return (
    {
        SimpleState: SimpleState,
        State: State
    });
});
