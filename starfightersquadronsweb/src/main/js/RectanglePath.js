/*
 * Provides a rectangular path of points.
 * 
 * @see <a href="http://geomalgorithms.com/a03-_inclusion.html">Inclusion of a Point in a Polygon</a>
 */
define([ "Path" ], function(Path)
{
    "use strict";
    function RectanglePath(width, height)
    {
        InputValidator.validateNotNull("width", width);
        InputValidator.validateNotNull("height", height);
        if (width < 0) { throw "width must be positive: " + width; }
        if (height < 0) { throw "height must be positive: " + height; }

        var x = -width / 2;
        var y = -height / 2;
        var path = new Path();

        path.add(x + width, y); // forward port
        path.add(x + width, y + height); // forward starboard
        path.add(x, y + height); // aft starboard
        path.add(x, y); // aft port
        path.close();

        return path;
    }

    /*
     * winding number test for a point in a polygon
     * 
     * Input: P = a point,
     * 
     * V[] = vertex points of a polygon V[n+1] with V[n]=V[0]
     * 
     * Return: wn = the winding number (=0 only when P is outside)
     */
    RectanglePath.determineWindingNumber = function(x, y, polygon)
    {
        InputValidator.validateNotNull("x", x);
        InputValidator.validateNotNull("y", y);
        InputValidator.validateNotNull("polygon", polygon);

        var wn = 0; // the winding number counter
        var points = polygon.points();
        var n = points.length - 2;

        // loop through all edges of the polygon
        for (var i = 0; i < n; i += 2)
        {
            // edge from V[i] to V[i+1]
            if (points[i + 1] <= y)
            {
                // start y <= P.y
                if (points[i + 3] > y) // an upward crossing
                {
                    if (RectanglePath.isLeft(points[i], points[i + 1], points[i + 2], points[i + 3], x, y) > 0) // P
                    // left of edge
                    {
                        ++wn; // have a valid up intersect
                    }
                }
            }
            else
            {
                // start y > P.y (no test needed)
                if (points[i + 3] <= y) // a downward crossing
                {
                    if (RectanglePath.isLeft(points[i], points[i + 1], points[i + 2], points[i + 3], x, y) < 0) // P
                    // right of edge
                    {
                        --wn; // have a valid down intersect
                    }
                }
            }
        }

        return wn;
    };

    RectanglePath.doPolygonsCollide = function(polygon0, polygon1)
    {
        InputValidator.validateNotNull("polygon0", polygon0);
        InputValidator.validateNotNull("polygon1", polygon1);

        LOGGER.trace("polygon0 = " + polygon0);
        LOGGER.trace("polygon1 = " + polygon1);

        var answer;
        var b0 = polygon0.boundingBox();
        LOGGER.trace("b0 = " + JSON.stringify(b0));
        var b1 = polygon1.boundingBox();
        LOGGER.trace("b1 = " + JSON.stringify(b1));

        if ((b1.maxX < b0.minX || b0.maxX < b1.minX) && // b1 is left or right of b0
        (b1.maxY < b0.minY || b0.maxY < b1.minY) // b1 is below or above b0
        )
        {
            LOGGER.trace("bounding boxes do not overlap");
            answer = false;
        }
        else
        {
            answer = false;
            LOGGER.trace("b0.area = " + b0.area + " b1.area = " + b1.area);
            var bb = (b0.area < b1.area ? b0 : b1);

            // Check if any point in bb is in both polygon0 and polygon1.
            var startX = Math.vizziniRound(bb.minX, 0);
            var startY = Math.vizziniRound(bb.minY, 0);
            var endX = Math.vizziniRound(bb.maxX, 0);
            var endY = Math.vizziniRound(bb.maxY, 0);
            LOGGER.trace("start = " + startX + ", " + startY + " end = " + endX + ", " + endY);

            for (var y = startY; !answer && y <= endY; y++)
            {
                for (var x = startX; !answer && x <= endX; x++)
                {
                    // LOGGER.trace(x + "," + y + " isPointInPolygon ? " + RectanglePath.isPointInPolygon(x, y,
                    // polygon0)
                    // + " " + RectanglePath.isPointInPolygon(x, y, polygon1))
                    answer = RectanglePath.isPointInPolygon(x, y, polygon0) &&
                            RectanglePath.isPointInPolygon(x, y, polygon1);
                }
            }
        }

        LOGGER.trace("RectanglePath.doPolygonsCollide() answer ? " + answer);

        return answer;
    };

    /*
     * Tests if a point is Left|On|Right of an infinite line.
     * 
     * Input: three points P0, P1, and P2
     * 
     * Return:
     * 
     * >0 for P2 left of the line through P0 and P1
     * 
     * =0 for P2 on the line
     * 
     * <0 for P2 right of the line
     * 
     * See: Algorithm 1 <a href="http://geomalgorithms.com/a01-_area.html">"Area of Triangles and Polygons"</a>
     */
    RectanglePath.isLeft = function(x0, y0, x1, y1, x2, y2)
    {
        return ((x1 - x0) * (y2 - y0) - (x2 - x0) * (y1 - y0));
    };

    RectanglePath.isPointInPolygon = function(x, y, polygon)
    {
        var wn = RectanglePath.determineWindingNumber(x, y, polygon);

        return (wn % 2) !== 0;
    };

    return RectanglePath;
});
