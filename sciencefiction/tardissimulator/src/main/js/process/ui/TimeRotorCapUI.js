define(function()
{
    "use strict";
    function TimeRotorCapUI(tubePositionRadius, tubeRadius, capHeight)
    {
        InputValidator.validateNotNull("tubePositionRadius", tubePositionRadius);
        InputValidator.validateNotNull("tubeRadius", tubeRadius);
        InputValidator.validateNotNull("capHeight", capHeight);

        this.createGeometry = function()
        {
            var topCorners = [];
            var i, j, x, y, z;

            for (i = 0; i < 3; i++)
            {
                x = tubePositionRadius * Math.sin(d2r(i * 120.0));
                y = capHeight / 2.0;
                z = tubePositionRadius * Math.cos(d2r(i * 120.0));
                topCorners.push(new THREE.Vector3(x, y, z));
            }

            var geometry = new THREE.Geometry();
            var s;

            for (j = 0; j < 3; j++)
            {
                geometry.vertices.push(topCorners[j]);

                for (i = 0; i < 9; i++)
                {
                    var startAngle = 300 + (120 * j);
                    var angle = startAngle + (i * 15);
                    x = topCorners[j].x + tubeRadius * Math.sin(d2r(angle));
                    y = topCorners[j].y;
                    z = topCorners[j].z + tubeRadius * Math.cos(d2r(angle));
                    geometry.vertices.push(new THREE.Vector3(x, y, z));
                }

                s = 10 * j;
                geometry.faces.push(new THREE.Face3(s, s + 1, s + 2));
                geometry.faces.push(new THREE.Face3(s, s + 2, s + 3));
                geometry.faces.push(new THREE.Face3(s, s + 3, s + 4));
                geometry.faces.push(new THREE.Face3(s, s + 4, s + 5));
                geometry.faces.push(new THREE.Face3(s, s + 5, s + 6));
                geometry.faces.push(new THREE.Face3(s, s + 6, s + 7));
                geometry.faces.push(new THREE.Face3(s, s + 7, s + 8));
                geometry.faces.push(new THREE.Face3(s, s + 8, s + 9));
            }

            geometry.faces.push(new THREE.Face3(0, 10, 20));
            geometry.faces.push(new THREE.Face3(0, 20, 29));
            geometry.faces.push(new THREE.Face3(0, 29, 1));

            geometry.faces.push(new THREE.Face3(10, 0, 9));
            geometry.faces.push(new THREE.Face3(10, 9, 11));

            geometry.faces.push(new THREE.Face3(20, 10, 19));
            geometry.faces.push(new THREE.Face3(20, 19, 21));

            // Bottom.
            for (i = 0; i < 30; i++)
            {
                var v = geometry.vertices[i];
                geometry.vertices.push(new THREE.Vector3(v.x, -v.y, v.z));
            }

            for (j = 0; j < 3; j++)
            {
                s = 30 + 10 * j;
                geometry.faces.push(new THREE.Face3(s, s + 2, s + 1));
                geometry.faces.push(new THREE.Face3(s, s + 3, s + 2));
                geometry.faces.push(new THREE.Face3(s, s + 4, s + 3));
                geometry.faces.push(new THREE.Face3(s, s + 5, s + 4));
                geometry.faces.push(new THREE.Face3(s, s + 6, s + 5));
                geometry.faces.push(new THREE.Face3(s, s + 7, s + 6));
                geometry.faces.push(new THREE.Face3(s, s + 8, s + 7));
                geometry.faces.push(new THREE.Face3(s, s + 9, s + 8));
            }

            var v2, v3;

            for (i = 1; i < 10; i++)
            {
                v2 = (i + 31 > 39 ? 41 : i + 31);
                v3 = (i + 1 > 9 ? 11 : i + 1);
                geometry.faces.push(new THREE.Face3(i, i + 30, v2));
                geometry.faces.push(new THREE.Face3(i, v2, v3));
            }

            for (i = 11; i < 20; i++)
            {
                v2 = (i + 31 > 49 ? 51 : i + 31);
                v3 = (i + 1 > 19 ? 21 : i + 1);
                geometry.faces.push(new THREE.Face3(i, i + 30, v2));
                geometry.faces.push(new THREE.Face3(i, v2, v3));
            }

            for (i = 21; i < 30; i++)
            {
                v2 = (i + 31 > 59 ? 31 : i + 31);
                v3 = (i + 1 > 29 ? 1 : i + 1);
                geometry.faces.push(new THREE.Face3(i, i + 30, v2));
                geometry.faces.push(new THREE.Face3(i, v2, v3));
            }

            geometry.faces.push(new THREE.Face3(30, 50, 40));
            geometry.faces.push(new THREE.Face3(30, 59, 50));
            geometry.faces.push(new THREE.Face3(30, 31, 59));

            geometry.faces.push(new THREE.Face3(40, 39, 30));
            geometry.faces.push(new THREE.Face3(40, 41, 39));

            geometry.faces.push(new THREE.Face3(50, 49, 40));
            geometry.faces.push(new THREE.Face3(50, 51, 49));

            geometry.computeFaceNormals();
            geometry.computeVertexNormals();

            return geometry;
        };

        this.createMaterial = function()
        {
            return new THREE.MeshStandardMaterial(
            {
                color: 0xFFFF88,
                metalness: 0,
                opacity: 0.5,
            });
        };

        function d2r(d)
        {
            return d * Math.PI / 180.0;
        }

        var geometry = this.createGeometry();
        var material = this.createMaterial();
        var mesh = new THREE.Mesh(geometry, material);

        this.geometry = function()
        {
            return geometry;
        };

        this.material = function()
        {
            return material;
        };

        this.mesh = function()
        {
            return mesh;
        };
    }

    if (Object.freeze)
    {
        Object.freeze(TimeRotorCapUI);
    }

    return TimeRotorCapUI;
});
