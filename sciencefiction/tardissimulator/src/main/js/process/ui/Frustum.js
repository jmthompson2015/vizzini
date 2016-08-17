/*
 * Two parallel bases separated by depth. Side four-polygons join the bases. Vertices are defined as Vector2[].
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

        for (i = start + 1; i < start + bottomVertices3.length - 1; i++)
        {
            geometry.faces.push(new THREE.Face3(start, i, i + 1));
        }

        // Create sides by joining the top and bottom.
        var s = topVertices.length;

        for (i = 0; i < s; i++)
        {
            geometry.faces.push(new THREE.Face3(i, (i === 0 ? s : (2 * s - i)), (2 * s - (i + 1))));
            geometry.faces.push(new THREE.Face3(i, (2 * s - (i + 1)), ((i + 1) === s ? 0 : (i + 1))));
        }

        geometry.computeFaceNormals();
        geometry.computeVertexNormals();
    }

    if (Object.freeze)
    {
        Object.freeze(Frustum);
    }

    return Frustum;
});
