define(function()
{
    "use strict";
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

        this.x = function()
        {
            return x;
        };

        this.y = function()
        {
            return y;
        };

        this.heading = function()
        {
            return heading;
        };
    }

    Position.prototype.compareTo = function(that)
    {
        if (!(that instanceof Position))
        {
            var message = "Can't compare a Position with " + that;
            throw new Error(message);
        }

        var answer = this.x() - that.x();

        if (answer === 0)
        {
            answer = this.y() - that.y();
        }

        if (answer === 0)
        {
            answer = this.heading() - that.heading();
        }

        return answer;
    };

    Position.prototype.computeBearing = function(x2, y2)
    {
        var answer = Position.computeHeading(this.x(), this.y(), x2, y2);
        answer -= this.heading();
        answer = Position.normalizeAngle(answer);

        return answer;
    };

    Position.prototype.computeDistance = function(position)
    {
        var dx = position.x() - this.x();
        var dy = position.y() - this.y();

        return Math.round(Math.sqrt((dx * dx) + (dy * dy)));
    };

    Position.prototype.equals = function(other)
    {
        return this.x() == other.x() && this.y() == other.y() && this.heading() == other.heading();
    };

    Position.prototype.toString = function()
    {
        return "(" + this.x() + ", " + this.y() + ", " + this.heading() + ")";
    };

    /* Maximum X coordinate value. (3 feet in mm) */
    Position.MAX_X = 915;

    /* Maximum Y coordinate value. (3 feet in mm) */
    Position.MAX_Y = Position.MAX_X;

    Position.computeHeading = function(x1, y1, x2, y2)
    {
        var dx = x2 - x1;
        var dy = y2 - y1;

        var answer = Math.round(Math.atan2(dy, dx) * 180.0 / Math.PI);
        answer = Position.normalizeAngle(answer);

        return answer;
    };

    Position.isPathInPlayArea = function(path)
    {
        var answer = true;
        var points = path.points();

        for (var i = 0; i < points.length; i += 2)
        {
            if (!Position.isPointInPlayArea(points[i], points[i + 1]))
            {
                answer = false;
                break;
            }
        }

        return answer;
    };

    Position.isPointInPlayArea = function(x, y)
    {
        return ((0 <= x) && (x < Position.MAX_X)) && ((0 <= y) && (y < Position.MAX_Y));
    };

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

    Position.ZERO = new Position(0, 0, 0);

    return Position;
});
