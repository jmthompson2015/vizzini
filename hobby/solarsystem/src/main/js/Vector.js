/*
 * Provides a mathematical vector.
 */
function Vector(x, y, z)
{
    this.getX = function()
    {
        return x;
    }

    this.getY = function()
    {
        return y;
    }

    this.getZ = function()
    {
        return z;
    }
}

Vector.ZERO = new Vector(0.0, 0.0, 0.0);
Vector.X_AXIS = new Vector(1.0, 0.0, 0.0);
Vector.Y_AXIS = new Vector(0.0, 1.0, 0.0);
Vector.Z_AXIS = new Vector(0.0, 0.0, 1.0);

Vector.prototype.cross = function(another)
{
    InputValidator.validateNotNull("another", another);

    var x0 = this.getX();
    var y0 = this.getY();
    var z0 = this.getZ();

    var x1 = another.getX();
    var y1 = another.getY();
    var z1 = another.getZ();

    var newX = (y0 * z1) - (z0 * y1);
    var newY = (z0 * y1) - (x0 * z1);
    var newZ = (x0 * y1) - (y0 * x1);

    return new Vector(newX, newY, newZ);
}

Vector.prototype.dot = function(another)
{
    InputValidator.validateNotNull("another", another);

    var x0 = this.getX();
    var y0 = this.getY();
    var z0 = this.getZ();

    var x1 = another.getX();
    var y1 = another.getY();
    var z1 = another.getZ();

    return (x0 * x1) + (y0 * y1) + (z0 * z1);
}

Vector.prototype.magnitude = function()
{
    return Math.sqrt(this.magnitudeSquared());
}

Vector.prototype.magnitudeSquared = function()
{
    var x = this.getX();
    var y = this.getY();
    var z = this.getZ();

    return (x * x) + (y * y) + (z * z);
}
