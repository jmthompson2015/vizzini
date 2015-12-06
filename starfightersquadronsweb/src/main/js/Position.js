/*
 * Construct this object.
 * 
 * @param x X coordinate.
 * @param y Y coordinate.
 * @param heading Heading.
 */
function Position(xIn, yIn, headingIn)
{
    var x = Math.round(xIn);
    var y = Math.round(yIn);

    if (!Position.isPointInPlayArea(x, y))
    {
        var message = "Coordinates are not in the play area: (" + x + ", " + y + ")";
        throw new Error(message);
    }

    var heading = Position.normalizeAngle(headingIn);

    this.getX = function()
    {
        return x;
    }

    this.getY = function()
    {
        return y;
    }

    this.getHeading = function()
    {
        return heading;
    }
}

/*
 * Order positions by x, or y if the xs are equal. Throws an error if passed a non-Position value.
 * 
 * @return 0 if and only if this.equals(that).
 */
Position.prototype.compareTo = function(that)
{
    if (!(that instanceof Position))
    {
        var message = "Can't compare a Position with " + that;
        throw new Error(message);
    }

    // Compare x.
    var answer = this.getX() - that.getX();

    if (answer === 0)
    {
        // If equal, compare y.
        answer = this.getY() - that.getY();
    }

    if (answer === 0)
    {
        // If equal, compare heading.
        answer = this.getHeading() - that.getHeading();
    }

    return answer;
}

/*
 * @param x2 X coordinate.
 * 
 * @param y2 Y coordinate.
 * 
 * @return the bearing to the given position.
 */
Position.prototype.computeBearing = function(x2, y2)
{
    var answer = Position.computeHeading(this.getX(), this.getY(), x2, y2);
    answer -= this.getHeading();
    answer = Position.normalizeAngle(answer);

    return answer;
}

/*
 * @param position Position.
 * 
 * @return the distance from this to the given position.
 */
Position.prototype.computeDistance = function(position)
{
    var dx = position.getX() - this.getX();
    var dy = position.getY() - this.getY();

    return Math.round(Math.sqrt((dx * dx) + (dy * dy)));
}

Position.prototype.equals = function(other)
{
    return this.getX() == other.getX() && this.getY() == other.getY() && this.getHeading() == other.getHeading();
}

Position.prototype.toString = function()
{
    return "(" + this.getX() + ", " + this.getY() + ", " + this.getHeading() + ")";
}

/* Maximum X coordinate value. (3 feet in mm) */
Position.MAX_X = 915;

/* Maximum Y coordinate value. (3 feet in mm) */
Position.MAX_Y = Position.MAX_X;

/*
 * @param x1 X coordinate.
 * 
 * @param y1 Y coordinate.
 * 
 * @param x2 X coordinate.
 * 
 * @param y2 Y coordinate.
 * 
 * @return the heading.
 */
Position.computeHeading = function(x1, y1, x2, y2)
{
    var dx = x2 - x1;
    var dy = y2 - y1;

    var answer = Math.round(Math.atan2(dy, dx) * 180.0 / Math.PI);
    answer = Position.normalizeAngle(answer);

    return answer;
}

/*
 * @param path Path.
 * 
 * @return true if the path is in the play area.
 */
Position.isPathInPlayArea = function(path)
{
    var answer = true;
    var points = path.getPoints();

    for (var i = 0; i < points.length; i += 2)
    {
        if (!Position.isPointInPlayArea(points[i], points[i + 1]))
        {
            answer = false;
            break;
        }
    }

    return answer;
}

/*
 * @param x X coordinate.
 * 
 * @param y Y coordinate.
 * 
 * @return true if the point is in the play area.
 */
Position.isPointInPlayArea = function(x, y)
{
    return ((0 <= x) && (x < Position.MAX_X)) && ((0 <= y) && (y < Position.MAX_Y));
}

/*
 * @param angle Angle. (degrees)
 * 
 * @return the angle in [0, 360)
 */
Position.normalizeAngle = function(angle)
{
    var answer = angle;

    while (answer < 0)
    {
        answer += 360;
    }

    answer = answer % 360;

    return answer;
};

/* Zero position. */
Position.ZERO = new Position(0, 0, 0);
