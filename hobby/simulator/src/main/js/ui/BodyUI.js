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

        // FIXME: temporary.
        var radius = (body.radiusX ? body.radiusX : (body.equatorialRadius ? body.equatorialRadius : body.radius));
        mesh.add(new THREE.AxisHelper(1.50 * radius));

        return mesh;

        function createGeometry(body)
        {
            var answer;

            if (body.radiusX && body.radiusY && body.radiusZ)
            {
                var max = Math.max(body.radiusX, Math.max(body.radiusY, body.radiusZ));
                answer = new THREE.SphereGeometry(max, 32, 32);
                answer.applyMatrix(new THREE.Matrix4().makeScale(body.radiusX / max, body.radiusY / max, body.radiusZ /
                        max));
            }
            else if (body.equatorialRadius && body.polarRadius)
            {
                answer = new THREE.SphereGeometry(body.equatorialRadius, 32, 32);
                answer.applyMatrix(new THREE.Matrix4().makeScale(1.0, 1.0, body.polarRadius / body.equatorialRadius));
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
    }

    return BodyUI;
});
