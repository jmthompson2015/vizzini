define(function()
{
    "use strict";
    function BodyUI(body, isBump, isSpecular)
    {
        InputValidator.validateNotNull("body", body);

        var geometry = createGeometry(body);
        var material = createMaterial(body, isBump, isSpecular);
        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = body.name;

        if (body.ringInnerRadius && body.ringOuterRadius)
        {
            // Add rings.
            mesh.add(createRings(body));
        }

        // FIXME: temporary.
        mesh.add(new THREE.AxisHelper(1.33 * body.maxRadius));

        return mesh;

        function createGeometry(body)
        {
            var answer;
            var max;

            if (body.radiusX && body.radiusY && body.radiusZ)
            {
                max = body.maxRadius;
                answer = new THREE.SphereGeometry(max, 32, 32);
                answer.applyMatrix(new THREE.Matrix4().makeScale(body.radiusX / max, body.radiusY / max, body.radiusZ /
                        max));
            }
            else if (body.equatorialRadius && body.polarRadius)
            {
                max = body.maxRadius;
                answer = new THREE.SphereGeometry(max, 32, 32);
                answer.applyMatrix(new THREE.Matrix4().makeScale(body.equatorialRadius / max, body.polarRadius / max,
                        body.equatorialRadius / max));
            }
            else if (body.radius)
            {
                answer = new THREE.SphereGeometry(body.radius, 32, 32);
            }
            else
            {
                throw "Unknown radius for body: " + body.value;
            }

            // Rotate sphere axis to Z.
            answer.rotateX(90.0 * Math.PI / 180.0);

            return answer;
        }

        function createMaterial(body, isBump, isSpecular)
        {
            var loader = new THREE.TextureLoader();
            var name = body.name.toLowerCase();
            var materialProps =
            {
                map: loader.load(imageBase + name + "map.jpg"),
            };

            if (isBump)
            {
                materialProps.bumpMap = loader.load(imageBase + name + "bump.jpg");
                materialProps.bumpScale = 0.05;
            }

            if (isSpecular)
            {
                materialProps.specularMap = loader.load(imageBase + name + "spec.jpg");
                materialProps.specular = new THREE.Color('grey');
            }

            return new THREE.MeshPhongMaterial(materialProps);
        }

        function createRings(body)
        {
            var innerRadius = body.ringInnerRadius;
            var outerRadius = body.ringOuterRadius;
            var thetaSegments = 32;
            var phiSegments = 8;
            var thetaStart = 0;
            var thetaLength = 2.0 * Math.PI;
            var geometry = new THREE.RingGeometry2(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart,
                    thetaLength);

            var loader = new THREE.TextureLoader();
            var name = body.name.toLowerCase();
            var texture = loader.load(imageBase + name + "ringcolor.jpg");
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2);
            var materialProps =
            {
                map: texture,
                color: 0xffff00,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.6,
            };

            // var material = new THREE.MeshBasicMaterial(materialProps);
            var material = new THREE.MeshPhongMaterial(materialProps);
            var mesh = new THREE.Mesh(geometry, material);

            return mesh;
        }
    }

    return BodyUI;
});
