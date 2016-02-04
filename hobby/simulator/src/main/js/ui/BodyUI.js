define(function()
{
    "use strict";
    function BodyUI(body, isBump, isSpecular, callback)
    {
        InputValidator.validateNotNull("body", body);
        InputValidator.validateNotNull("isBump", isBump);
        InputValidator.validateNotNull("isSpecular", isSpecular);
        InputValidator.validateNotNull("callback", callback);

        // Start loading textures.
        var map, bumpMap, specularMap, ringMap;
        var loader = new THREE.TextureLoader();
        var name = body.name.toLowerCase();
        loader.load(imageBase + name + "map.jpg", onLoadMap);

        if (isBump)
        {
            loader.load(imageBase + name + "bump.jpg", onLoadBump);
        }

        if (isSpecular)
        {
            loader.load(imageBase + name + "spec.jpg", onLoadSpecular);
        }

        var isRing = body.ringInnerRadius && body.ringOuterRadius;

        if (isRing)
        {
            loader.load(imageBase + name + "ringcolor.jpg", onLoadRing);
        }

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

        function createMaterial()
        {
            var materialProps =
            {
                map: map,
            };

            if (isBump)
            {
                materialProps.bumpMap = bumpMap;
                materialProps.bumpScale = 0.05;
            }

            if (isSpecular)
            {
                materialProps.specularMap = specularMap;
                materialProps.specular = new THREE.Color('grey');
            }

            return new THREE.MeshPhongMaterial(materialProps);
        }

        function createRing(body, ringMap)
        {
            var innerRadius = body.ringInnerRadius;
            var outerRadius = body.ringOuterRadius;
            var thetaSegments = 32;
            var phiSegments = 8;
            var thetaStart = 0;
            var thetaLength = 2.0 * Math.PI;
            var geometry = new THREE.RingGeometry2(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart,
                    thetaLength);

            ringMap.wrapS = THREE.RepeatWrapping;
            ringMap.wrapT = THREE.RepeatWrapping;
            ringMap.repeat.set(2, 2);
            var materialProps =
            {
                map: ringMap,
                color: 0xffff00,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.6,
            };

            var material = new THREE.MeshPhongMaterial(materialProps);
            var mesh = new THREE.Mesh(geometry, material);

            return mesh;
        }

        function finishConstruction()
        {
            var geometry = createGeometry(body);
            var material = createMaterial();

            var mesh = new THREE.Mesh(geometry, material);
            mesh.name = body.name;
            mesh.bodyKey = body.value;

            if (isRing)
            {
                // Add ring.
                mesh.add(createRing(body, ringMap));
            }

            // FIXME: temporary.
            mesh.add(new THREE.AxisHelper(1.33 * body.maxRadius));

            callback(mesh);
        }

        function isLoaded()
        {
            return (map !== undefined) && (!isBump || bumpMap !== undefined) &&
                    (!isSpecular || specularMap !== undefined) && (!isRing || ringMap !== undefined);
        }

        function onLoadBump(texture)
        {
            bumpMap = texture;

            if (isLoaded())
            {
                finishConstruction();
            }
        }

        function onLoadMap(texture)
        {
            map = texture;

            if (isLoaded())
            {
                finishConstruction();
            }
        }

        function onLoadRing(texture)
        {
            ringMap = texture;

            if (isLoaded())
            {
                finishConstruction();
            }
        }

        function onLoadSpecular(texture)
        {
            specularMap = texture;

            if (isLoaded())
            {
                finishConstruction();
            }
        }
    }

    return BodyUI;
});
