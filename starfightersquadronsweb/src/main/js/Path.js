/*
 * Provides a rectangular path of points.
 */
function RectanglePath(widthIn, heightIn)
{
    var width = widthIn;
    var height = heightIn;
    var x = -width / 2;
    var y = -height / 2;
    var path = new Path();

    path.add(x + width, y); // forward port
    path.add(x + width, y + height); // forward starboard
    path.add(x, y + height); // aft starboard
    path.add(x, y); // aft port
    path.close();

    this.getPoints = function()
    {
        return path.getPoints();
    }

    this.getPointsLength = function()
    {
        return path.getPointsLength();
    }

    this.paintComponent = function(context, strokeStyle)
    {
        path.paintComponent(context, strokeStyle);
    }

    this.rotate = function(angle, centerX, centerY)
    {
        path.rotate(angle, centerX, centerY);
    }

    this.toString = function()
    {
        return path.toString();
    }

    this.translate = function(dx, dy)
    {
        path.translate(dx, dy);
    }
}

/*
 * Provides a path of points.
 */
function Path()
{
    var points = [];

    this.add = function(x, y)
    {
        points[points.length] = x;
        points[points.length] = y;
    }

    this.close = function()
    {
        if (points.length >= 2)
        {
            points[points.length] = points[0];
            points[points.length] = points[1];
        }
    }

    this.getPoints = function()
    {
        return points;
    }

    this.getPointsLength = function()
    {
        return points.length;
    }

    this.paintComponent = function(context, strokeStyle)
    {
        if (points.length >= 2)
        {
            context.beginPath();
            context.moveTo(points[0], points[1]);

            for ( var i = 2; i < points.length; i += 2)
            {
                context.lineTo(points[i], points[i + 1]);
            }

            context.strokeStyle = strokeStyle;
            context.stroke();
        }
    }

    /*
     * Rotate about the given point.
     */
    this.rotate = function(angle, centerX, centerY)
    {
        var cx = centerX || 0;
        var cy = centerY || 0;
        var sin = Math.sin(angle);
        var cos = Math.cos(angle);

        for ( var i = 0; i < points.length; i += 2)
        {
            var x = points[i] - cx;
            var y = points[i + 1] - cy;

            points[i] = (x * cos - y * sin) + cx;
            points[i + 1] = (x * sin + y * cos) + cy;
        }
    }

    this.toString = function()
    {
        var answer = "";

        for ( var i = 0; i < points.length; i += 2)
        {
            var x = points[i];
            var y = points[i + 1];

            answer += i + " (" + x + ", " + y + ")\n";
        }

        return answer;
    }

    this.translate = function(dx, dy)
    {
        for ( var i = 0; i < points.length; i += 2)
        {
            points[i] = points[i] + dx;
            points[i + 1] = points[i + 1] + dy;
        }
    }
}
