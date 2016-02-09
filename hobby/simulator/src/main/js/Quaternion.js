define([ "Vector" ], function(Vector)
{
    "use strict";
    function Quaternion(w, x, y, z)
    {
        InputValidator.validateNotNull("w", w);
        InputValidator.validateNotNull("x", x);
        InputValidator.validateNotNull("y", y);
        InputValidator.validateNotNull("z", z);

        // Special case for all zeroes passed in.
        if ((w === 0.0) && (x === 0.0) && (y === 0.0) && (z === 0.0))
        {
            w = 1.0;
        }

        this.w = function()
        {
            return w;
        };

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

    /*
     * This quaternion represents a rotation through the given angle around the given vector.
     */
    Quaternion.newInstance = function(angle, vector)
    {
        InputValidator.validateNotNull("angle", angle);
        InputValidator.validateNotNull("vector", vector);

        var answer;

        if (angle === 0.0 || vector.magnitudeSquared() === 0.0)
        {
            answer = Quaternion.ZERO;
        }
        else
        {
            // Adjust the angle and rotation axis so that it is in the range [-pi,pi].
            var myAngle = angle * Math.PI / 180.0;

            if (Math.abs(myAngle) > Math.PI)
            {
                var sign = ((myAngle > 0.0) ? 1.0 : (-1.0));
                var offset = Math.PI * sign;
                myAngle = ((myAngle + offset) % (2.0 * Math.PI)) - offset;
            }

            var halfAngle = myAngle / 2.0;
            var sinang = Math.sin(halfAngle);
            var myVector = vector.unit();

            var w = Math.cos(halfAngle);
            var x = myVector.x() * sinang;
            var y = myVector.y() * sinang;
            var z = myVector.z() * sinang;

            answer = new Quaternion(w, x, y, z).unit();
        }

        return answer;
    };

    /*
     * This quaternion represents a rotation through the given angles.
     */
    Quaternion.newInstanceAzimuthElevation = function(azimuth, elevation)
    {
        InputValidator.validateIsNumber("azimuth", azimuth);
        InputValidator.validateIsNumber("elevation", elevation);

        var q0 = Quaternion.newInstance(azimuth, Vector.Z_AXIS);
        var q1 = Quaternion.newInstance(-elevation, Vector.Y_AXIS);

        return q0.multiply(q1).unit();
    };

    /*
     * This quaternion represents the rotation required to move the X axis to the given vector.
     */
    Quaternion.newInstanceVector = function(vector)
    {
        InputValidator.validateNotNull("vector", vector);

        var angle = Vector.Z_AXIS.angle(vector);
        var v = Vector.Z_AXIS.cross(vector);

        return Quaternion.newInstance(angle, v);
    };

    Quaternion.ZERO = new Quaternion(1.0, 0.0, 0.0, 0.0);

    /*
     * @return the rotation angle in degrees.
     */
    Quaternion.prototype.angle = function()
    {
        var w = this.w();

        if (w > 1.0)
        {
            w /= this.magnitude();
        }

        var angle = 2.0 * Math.acos(Math.min(1.0, w));

        return angle * 180.0 / Math.PI;
    };

    Quaternion.prototype.azimuth = function()
    {
        var v = this.preMultiply(Vector.X_AXIS);

        return v.azimuth();
    };

    Quaternion.prototype.conjugate = function()
    {
        return new Quaternion(this.w(), -this.x(), -this.y(), -this.z());
    };

    Quaternion.prototype.elevation = function()
    {
        var v = this.preMultiply(Vector.X_AXIS);

        return v.elevation();
    };

    Quaternion.prototype.magnitude = function()
    {
        var w = this.w();
        var x = this.x();
        var y = this.y();
        var z = this.z();

        return Math.sqrt((w * w) + (x * x) + (y * y) + (z * z));
    };

    Quaternion.prototype.multiply = function(q)
    {
        InputValidator.validateNotNull("q", q);

        var newW = (-this.x() * q.x()) - (this.y() * q.y()) - (this.z() * q.z()) + (this.w() * q.w());
        var newX = ((this.x() * q.w()) + (this.y() * q.z())) - (this.z() * q.y()) + (this.w() * q.x());
        var newY = (-this.x() * q.z()) + (this.y() * q.w()) + (this.z() * q.x()) + (this.w() * q.y());
        var newZ = (this.x() * q.y()) - (this.y() * q.x()) + (this.z() * q.w()) + (this.w() * q.z());

        return new Quaternion(newW, newX, newY, newZ);
    };

    Quaternion.prototype.postMultiply = function(vector)
    {
        InputValidator.validateNotNull("vector", vector);

        var vq = new Quaternion(0.0, vector.x(), vector.y(), vector.z());
        var q = this.conjugate().multiply(vq.multiply(this));

        return new Vector(q.x(), q.y(), q.z());
    };

    Quaternion.prototype.preMultiply = function(vector)
    {
        InputValidator.validateNotNull("vector", vector);

        var vq = new Quaternion(0.0, vector.x(), vector.y(), vector.z());
        var q = this.multiply(vq.multiply(this.conjugate()));

        return new Vector(q.x(), q.y(), q.z());
    };

    Quaternion.prototype.toHeadingString = function()
    {
        var vector = this.preMultiply(Vector.X_AXIS);

        return vector.toHeadingString();
    };

    Quaternion.prototype.toString = function()
    {
        return "(" + this.w() + ", " + this.x() + ", " + this.y() + ", " + this.z() + ")";
    };

    Quaternion.prototype.unit = function()
    {
        var mag = this.magnitude();
        var newW = this.w() / mag;
        var newX = this.x() / mag;
        var newY = this.y() / mag;
        var newZ = this.z() / mag;

        return new Quaternion(newW, newX, newY, newZ);
    };

    /*
     * @return the rotation vector.
     */
    Quaternion.prototype.vector = function()
    {
        var answer;
        var angle = this.angle() * Math.PI / 180.0;

        if (angle === 0.0)
        {
            // The rotation angle is zero, so the rotation vector doesn't matter.
            answer = Vector.X_AXIS;
        }
        else
        {
            var sinAngle = Math.sin(angle / 2.0);
            var x = this.x() / sinAngle;
            var y = this.y() / sinAngle;
            var z = this.z() / sinAngle;
            answer = new Vector(x, y, z);
        }

        return answer;
    };

    return Quaternion;
});
