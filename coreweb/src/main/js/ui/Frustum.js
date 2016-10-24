/*
 * Two parallel bases separated by depth. Side four-polygons join the bases. Vertices are defined as THREE.Vector2[].
 * 
 * @see https://en.wikipedia.org/wiki/Frustum
 */
define(function()
{
    "use strict";
    function Frustum(topVertices, bottomVertices, depth)
    {
        InputValidator.validateNotNull("topVertices", topVertices);
        InputValidator.validateNotNull("bottomVertices", bottomVertices);
        InputValidator.validateNotNull("depth", depth);
        if (topVertices.length !== bottomVertices.length) { throw "Vertex arrays not the same length; top: " +
                topVertices.length + " bottom: " + bottomVertices.length; }

        var geometry = new THREE.Geometry();

        this.geometry = function()
        {
            return geometry;
        };

        var halfDepth = depth / 2.0;

        // Top.
        var topVertices3 = [];

        topVertices.forEach(function(v)
        {
            topVertices3.push(new THREE.Vector3(v.x, v.y, halfDepth));
        });

        Array.prototype.push.apply(geometry.vertices, topVertices3);
        var i;

        for (i = 1; i < topVertices3.length - 1; i++)
        {
            geometry.faces.push(new THREE.Face3(0, i, i + 1));
        }

        // Bottom.
        var bottomVertices3 = [];

        bottomVertices.forEach(function(v)
        {
            bottomVertices3.push(new THREE.Vector3(v.x, v.y, -halfDepth));
        });

        Array.prototype.push.apply(geometry.vertices, bottomVertices3);
        var start = topVertices.length;
        var end = start + bottomVertices3.length - 1;

        for (i = end - 1; i > start; i--)
        {
            geometry.faces.push(new THREE.Face3(end, i, i - 1));
        }

        // Create sides by joining the top and bottom.
        var s = topVertices.length;

        for (i = 0; i < s; i++)
        {
            geometry.faces.push(new THREE.Face3(i, (i === 0 ? s : (s + i)), (i === s - 1 ? s : (s + i + 1))));
            geometry.faces.push(new THREE.Face3(i, (i === s - 1 ? s : (s + i + 1)), (i + 1 === s ? 0 : i + 1)));
        }

        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
    }

    Frustum.IsoscelesTrapezoid = function(topTrapezoid, bottomTrapezoid, depth)
    {
        InputValidator.validateNotNull("topTrapezoid", topTrapezoid);
        InputValidator.validateNotNull("bottomTrapezoid", bottomTrapezoid);
        InputValidator.validateNotNull("depth", depth);

        var topVertices = createVertices(topTrapezoid);
        var bottomVertices = createVertices(bottomTrapezoid);
        var frustum = new Frustum(topVertices, bottomVertices, depth);

        this.geometry = function()
        {
            return frustum.geometry();
        };

        function createVertices(trapezoid)
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
            answer.push(new THREE.Vector2(x1, y1));
            answer.push(new THREE.Vector2(x2, y2));
            answer.push(new THREE.Vector2(x3, y3));

            return answer;
        }
    }

    if (Object.freeze)
    {
        Object.freeze(Frustum);
    }

    return Frustum;
});
