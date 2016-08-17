/*
 * Two parallel base trapezoids separated by depth. Side four-polygons join the bases.
 * 
 * A Trapezoid is defined as { xCenter, yCenter, widthTop, widthBottom, height }
 * 
 * @see https://en.wikipedia.org/wiki/Trapezoid
 */
define([ "process/ui/Frustum" ], function(Frustum)
{
    "use strict";
    function IsoscelesTrapezoidFrustum(topTrapezoid, bottomTrapezoid, depth)
    {
        var topVertices = createVertices(topTrapezoid, true);
        var bottomVertices = createVertices(bottomTrapezoid);
        var frustum = new Frustum(topVertices, bottomVertices, depth);

        this.geometry = function()
        {
            return frustum.geometry();
        };

        function createVertices(trapezoid, isTop)
        {
            var x0 = trapezoid.xCenter - trapezoid.widthBottom / 2.0;
            var y0 = trapezoid.yCenter - trapezoid.height / 2.0;
            var x1 = trapezoid.xCenter + trapezoid.widthBottom / 2.0;
            var y1 = y0;
            var x2 = trapezoid.xCenter + trapezoid.widthTop / 2.0;
            var y2 = trapezoid.yCenter + trapezoid.height / 2.0;
            var x3 = trapezoid.xCenter - trapezoid.widthTop / 2.0;
            var y3 = y2;

            var answer = [];

            answer.push(new THREE.Vector2(x0, y0));

            if (isTop)
            {
                answer.push(new THREE.Vector2(x1, y1));
            }
            else
            {
                answer.push(new THREE.Vector2(x3, y3));
            }

            answer.push(new THREE.Vector2(x2, y2));

            if (isTop)
            {
                answer.push(new THREE.Vector2(x3, y3));
            }
            else
            {
                answer.push(new THREE.Vector2(x1, y1));
            }

            return answer;
        }
    }

    if (Object.freeze)
    {
        Object.freeze(IsoscelesTrapezoidFrustum);
    }

    return IsoscelesTrapezoidFrustum;
});
