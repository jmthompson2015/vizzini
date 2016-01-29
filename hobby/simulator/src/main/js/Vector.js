define(function()
{
    "use strict";
    function Vector(x, y, z)
    {
        this.x = function()
        {
            return x;
        };

        this.y = function()
        {
            return y;
        };

        this.z = function()
        {
            return z;
        };
    }

    Vector.ZERO = new Vector(0.0, 0.0, 0.0);
    Vector.X_AXIS = new Vector(1.0, 0.0, 0.0);
    Vector.Y_AXIS = new Vector(0.0, 1.0, 0.0);
    Vector.Z_AXIS = new Vector(0.0, 0.0, 1.0);

    Vector.prototype.add = function(another)
    {
        InputValidator.validateNotNull("another", another);

        var newX = this.x() + another.x();
        var newY = this.y() + another.y();
        var newZ = this.z() + another.z();

        return new Vector(newX, newY, newZ);
    };

    /*
     * @return the angle between this vector and the given vector, in degrees. The returned angle is always positive.
     */
    Vector.prototype.angle = function(another)
    {
        // Find the angle between two Vectors
        var answer = 90.0;

        var dot = this.dot(another);

        if (dot !== 0.0)
        {
            var mags = this.magnitude() * another.magnitude();

            if (mags === 0.0)
            {
                answer = 0.0;
            }
            else
            {
                // C is the rotation vector. Then the angle would be positive about this vector.
                var c = this.cross(another);
                var cosAngle = dot / mags;
                var sinAngle = c.magnitude() / mags; // Note this is always positive.
                var angle0 = Math.atan2(sinAngle, cosAngle);
                answer = ((angle0 >= 0.0) ? angle0 : Math.atan2(-sinAngle, cosAngle));
                answer *= 180.0/Math.PI;
            }
        }

        return answer;
    };

    Vector.prototype.cross = function(another)
    {
        InputValidator.validateNotNull("another", another);

        var x0 = this.x();
        var y0 = this.y();
        var z0 = this.z();

        var x1 = another.x();
        var y1 = another.y();
        var z1 = another.z();

        var newX = (y0 * z1) - (z0 * y1);
        var newY = (z0 * y1) - (x0 * z1);
        var newZ = (x0 * y1) - (y0 * x1);

        return new Vector(newX, newY, newZ);
    };

    Vector.prototype.dot = function(another)
    {
        InputValidator.validateNotNull("another", another);

        var x0 = this.x();
        var y0 = this.y();
        var z0 = this.z();

        var x1 = another.x();
        var y1 = another.y();
        var z1 = another.z();

        return (x0 * x1) + (y0 * y1) + (z0 * z1);
    };

    Vector.prototype.magnitude = function()
    {
        return Math.sqrt(this.magnitudeSquared());
    };

    Vector.prototype.magnitudeSquared = function()
    {
        var x = this.x();
        var y = this.y();
        var z = this.z();

        return (x * x) + (y * y) + (z * z);
    };

    Vector.prototype.subtract = function(another)
    {
        InputValidator.validateNotNull("another", another);

        var newX = this.x() - another.x();
        var newY = this.y() - another.y();
        var newZ = this.z() - another.z();

        return new Vector(newX, newY, newZ);
    };

    Vector.prototype.toString = function()
    {
        return "(" + this.x() + ", " + this.y() + ", " + this.z() + ")";
    };

    Vector.prototype.unit = function()
    {
        var mag = this.magnitude();
        var newX = this.x() / mag;
        var newY = this.y() / mag;
        var newZ = this.z() / mag;

        return new Vector(newX, newY, newZ);
    };

    return Vector;
});
