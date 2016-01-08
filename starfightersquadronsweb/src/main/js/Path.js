/*
 * Provides a path of points.
 */
define(function()
{
    "use strict";
    function Path()
    {
        var points = [];

        this.points = function()
        {
            return points;
        };

        this.add = function(x, y)
        {
            points.push(x);
            points.push(y);
        };
    }

    Path.prototype.close = function()
    {
        var points = this.points();

        if (points.length >= 2)
        {
            points.push(points[0]);
            points.push(points[1]);
        }
    };

    Path.prototype.boundingBox = function()
    {
        var answer;
        var points = this.points();

        if (points.length > 1)
        {
            var minX = points[0];
            var minY = points[1];
            var maxX = minX;
            var maxY = minY;

            for (var i = 2; i < points.length; i += 2)
            {
                var x = points[i];
                var y = points[i + 1];

                minX = Math.min(x, minX);
                minY = Math.min(y, minY);
                maxX = Math.max(x, maxX);
                maxY = Math.max(y, maxY);
            }

            LOGGER.debug("min = " + minX + " " + minY + " max = " + maxX + " " + maxY);

            answer =
            {
                minX: minX,
                minY: minY,
                maxX: maxX,
                maxY: maxY,
                area: (maxX - minX) * (maxY - minY),
            };
        }

        return answer;
    };

    Path.prototype.paintComponent = function(context, strokeStyle)
    {
        var points = this.points();

        if (points.length >= 2)
        {
            context.beginPath();
            context.moveTo(points[0], points[1]);

            for (var i = 2; i < points.length; i += 2)
            {
                context.lineTo(points[i], points[i + 1]);
            }

            context.strokeStyle = strokeStyle;
            context.stroke();
        }
    };

    /*
     * Rotate about the given point.
     */
    Path.prototype.rotate = function(angle, centerX, centerY)
    {
        var points = this.points();
        var cx = centerX || 0;
        var cy = centerY || 0;
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        for (var i = 0; i < points.length; i += 2)
        {
            var x = points[i] - cx;
            var y = points[i + 1] - cy;

            points[i] = (x * cos - y * sin) + cx;
            points[i + 1] = (x * sin + y * cos) + cy;
        }
    };

    Path.prototype.toString = function()
    {
        var answer = "";
        var points = this.points();

        for (var i = 0; i < points.length; i += 2)
        {
            var x = points[i];
            var y = points[i + 1];

            answer += i + " (" + x + ", " + y + ")\n";
        }

        return answer;
    };

    Path.prototype.translate = function(dx, dy)
    {
        var points = this.points();

        for (var i = 0; i < points.length; i += 2)
        {
            points[i] = points[i] + dx;
            points[i + 1] = points[i + 1] + dy;
        }
    };

    return Path;
});
