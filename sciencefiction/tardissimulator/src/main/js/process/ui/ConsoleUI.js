define(
        [ "ConsolePanel", "process/ui/IsoscelesTrapezoidFrustum" ],
        function(ConsolePanel, IsoscelesTrapezoidFrustum)
        {
            "use strict";
            function ConsoleUI(callback)
            {
                InputValidator.validateNotNull("callback", callback);

                var that = this;

                this.createRoot = function()
                {
                    var geometry = new THREE.BoxGeometry(1, 1, 1);
                    var material = new THREE.MeshBasicMaterial(
                    {
                        color: 0xFF0000,
                    });

                    return new THREE.Mesh(geometry, material);
                };

                var root = this.createRoot();

                this.root = function()
                {
                    return root;
                };

                var whiteMaterial = new THREE.MeshStandardMaterial(
                {
                    color: 0xFFFFFF,
                    metalness: 0.2,
                    shading: THREE.FlatShading,
                });

                var loader = new THREE.TextureLoader();
                loader.crossOrigin = 'anonymous';
                var panels = {};
                var timeoutId;

                this.createBaseInsert = function(rotation)
                {
                    var widthTop = 17.5;
                    var widthBottom = widthTop + (7.0 / Math.cos(d2r(30.0)));
                    var height = Math.sqrt(2.0 * 7.0 * 7.0);

                    var topTrapezoid = this.createTrapezoid(widthTop, widthBottom, height);
                    var bottomTrapezoid = this.createTrapezoid(widthTop, widthBottom, height);
                    var depth = 0.5;
                    var geometry = new IsoscelesTrapezoidFrustum(topTrapezoid, bottomTrapezoid, depth).geometry();

                    var innerRadius = (30.31 / 2.0) + (7.0 / 2.0);

                    var answer = new THREE.Mesh(geometry, whiteMaterial);
                    var x = innerRadius * Math.sin(rotation);
                    var y = -innerRadius * Math.cos(rotation);
                    var z = -30.0 + (7.0 / 2.0);

                    answer.position.set(x, y, z);
                    answer.rotation.x = d2r(45.0);
                    answer.rotation.z = rotation;
                    answer.rotation.order = "ZYX";

                    return answer;
                };

                this.createCollar = function(rotationZ)
                {
                    var widthTop = 15.0;
                    var widthBottom = 17.5 + 0.5;
                    var depth = 2.5 / Math.cos(d2r(45.0));
                    var offset = (0.5 / 2.0) / Math.cos(d2r(30.0));

                    var topTrapezoid = this.createTrapezoid(widthTop - offset, widthBottom - offset, depth);
                    var bottomTrapezoid = this.createTrapezoid(widthTop + offset, widthBottom + offset, depth);
                    var geometry = new IsoscelesTrapezoidFrustum(topTrapezoid, bottomTrapezoid, 0.5).geometry();

                    var heightSkirt = 3.5;
                    var heightPanel = 9.0;
                    var innerRadius = (30.31 / 2.0) - 2.5 / 2.0;

                    var answer = new THREE.Mesh(geometry, whiteMaterial);
                    var x = innerRadius * Math.sin(rotationZ);
                    var y = -innerRadius * Math.cos(rotationZ);
                    var z = heightSkirt + heightPanel + 2.5 / 2.0;

                    answer.position.set(x, y, z);
                    answer.rotation.x = d2r(45.0);
                    answer.rotation.z = rotationZ;
                    answer.rotation.order = "ZYX";

                    return answer;
                };

                this.createInnerHex = function(rotationZ)
                {
                    var width = 17.5;
                    var height = 0.5;
                    var depth = 42.5;

                    var geometry = new THREE.BoxGeometry(width, height, depth);
                    var material = new THREE.MeshBasicMaterial(
                    {
                        color: 0x000000,
                    });

                    var innerRadius = 30.31 / 2.0;

                    var answer = new THREE.Mesh(geometry, material);
                    var x = innerRadius * Math.sin(rotationZ);
                    var y = (-innerRadius - height / 2.0) * Math.cos(rotationZ);
                    var z = -depth / 2.0 + 9 + 3.5;

                    answer.position.set(x, y, z);
                    answer.rotation.z = rotationZ;

                    return answer;
                };

                this.createPanel = function(consolePanelKey, rotationZ, index)
                {
                    LOGGER.trace("createPanel(" + consolePanelKey + ", " + index + ")");

                    // Panel dimensions.
                    var widthTop = 17.5;
                    var widthBottom = 46.0;
                    var height = 26.292;
                    var heightSkirt = 3.5;
                    var heightPanel = 9.0;

                    var topTrapezoid = this.createTrapezoid(widthTop, widthBottom, height);
                    var bottomTrapezoid = this.createTrapezoid(widthTop, widthBottom, height);
                    var depth = 0.5;
                    var geometry = new IsoscelesTrapezoidFrustum(topTrapezoid, bottomTrapezoid, depth).geometry();

                    // Add UVs for texture.
                    geometry.computeBoundingBox();

                    var max = geometry.boundingBox.max, min = geometry.boundingBox.min;
                    var offset = new THREE.Vector2(0 - min.x, 0 - min.y);
                    var range = new THREE.Vector2(max.x - min.x, max.y - min.y);
                    var faces = geometry.faces;

                    geometry.faceVertexUvs[0] = [];

                    for (var i = 0; i < faces.length; i++)
                    {

                        var v1 = geometry.vertices[faces[i].a], v2 = geometry.vertices[faces[i].b], v3 = geometry.vertices[faces[i].c];

                        geometry.faceVertexUvs[0].push([
                                new THREE.Vector2((v1.x + offset.x) / range.x, (v1.y + offset.y) / range.y),
                                new THREE.Vector2((v2.x + offset.x) / range.x, (v2.y + offset.y) / range.y),
                                new THREE.Vector2((v3.x + offset.x) / range.x, (v3.y + offset.y) / range.y) ]);
                    }
                    geometry.uvsNeedUpdate = true;

                    geometry.computeFaceNormals();
                    geometry.computeVertexNormals();

                    // Console measurements.
                    var widthInner = 30.31 / 2.0;
                    var widthOuter = 79.672 / 2.0;

                    var material = whiteMaterial.clone();
                    var panel = new THREE.Mesh(geometry, material);
                    panels[consolePanelKey] = panel;

                    var radius = (widthOuter - widthInner) / 2.0 + widthInner;
                    var x = radius * Math.sin(rotationZ);
                    var y = -radius * Math.cos(rotationZ);
                    var z = heightSkirt + heightPanel / 2.0;

                    panel.position.set(x, y, z);
                    panel.rotation.x = Math.asin(heightPanel / height);
                    panel.rotation.z = rotationZ;
                    panel.rotation.order = "ZYX";
                    root.add(panel);

                    function onLoad(texture)
                    {
                        material.map = texture;

                        if (isDone())
                        {
                            clearTimeout(timeoutId);
                            callback(that);
                        }
                    }

                    loader.load(ConsolePanel.properties[consolePanelKey].image, onLoad.bind(this));
                };

                this.createSkirt = function(rotationZ)
                {
                    var width = 46.0;
                    var height = 1.0;
                    var depth = 3.5;
                    var offset = (height / 2.0) / Math.cos(d2r(30.0));

                    var topTrapezoid = this.createTrapezoid(width - offset, width + offset, height);
                    var bottomTrapezoid = this.createTrapezoid(width - offset, width + offset, height);
                    var geometry = new IsoscelesTrapezoidFrustum(topTrapezoid, bottomTrapezoid, depth).geometry();

                    geometry.computeFaceNormals();
                    geometry.computeVertexNormals();

                    var material = new THREE.MeshStandardMaterial(
                    {
                        color: 0xFFFFFF,
                        metalness: 0.4,
                        shading: THREE.FlatShading,
                    });

                    var outerRadius = 79.672 / 2.0;

                    var answer = new THREE.Mesh(geometry, material);
                    var x = outerRadius * Math.sin(rotationZ);
                    var y = -outerRadius * Math.cos(rotationZ);
                    var z = depth / 2.0;

                    answer.position.set(x, y, z);
                    answer.rotation.z = rotationZ;

                    return answer;
                };

                this.createRib = function(index)
                {
                    var innerWidth = 7.0 / Math.cos(d2r(30.0));
                    var outerWidth = 28.5;
                    var height = 30.0;
                    var height2 = 5.5;
                    var depth = 1.0;

                    var geometry = new THREE.Geometry();
                    geometry.vertices.push(new THREE.Vector3(0, -height, depth / 2.0));
                    geometry.vertices.push(new THREE.Vector3(innerWidth, -height, depth / 2.0));
                    geometry.vertices.push(new THREE.Vector3(innerWidth, -height2, depth / 2.0));
                    geometry.vertices.push(new THREE.Vector3(outerWidth, 0, depth / 2.0));
                    geometry.vertices.push(new THREE.Vector3(0, 0, depth / 2.0));

                    geometry.vertices.push(new THREE.Vector3(0, -height, -depth / 2.0));
                    geometry.vertices.push(new THREE.Vector3(innerWidth, -height, -depth / 2.0));
                    geometry.vertices.push(new THREE.Vector3(innerWidth, -height2, -depth / 2.0));
                    geometry.vertices.push(new THREE.Vector3(outerWidth, 0, -depth / 2.0));
                    geometry.vertices.push(new THREE.Vector3(0, 0, -depth / 2.0));

                    geometry.faces.push(new THREE.Face3(0, 1, 2));
                    geometry.faces.push(new THREE.Face3(0, 2, 4));
                    geometry.faces.push(new THREE.Face3(2, 3, 4));

                    geometry.faces.push(new THREE.Face3(5, 7, 6));
                    geometry.faces.push(new THREE.Face3(5, 9, 7));
                    geometry.faces.push(new THREE.Face3(7, 9, 8));

                    geometry.faces.push(new THREE.Face3(1, 6, 7));
                    geometry.faces.push(new THREE.Face3(1, 7, 2));

                    geometry.faces.push(new THREE.Face3(2, 7, 8));
                    geometry.faces.push(new THREE.Face3(2, 8, 3));

                    var innerRadius = (30.31 / 2.0) / Math.cos(d2r(30.0));

                    var rib = new THREE.Mesh(geometry, whiteMaterial);
                    var rotation5 = d2r(30.0 + index * 60.0);
                    var x = innerRadius * Math.sin(rotation5);
                    var y = -innerRadius * Math.cos(rotation5);
                    var z = 0;

                    rib.position.set(x, y, z);
                    rib.rotation.x = d2r(90.0);
                    rib.rotation.y = d2r(-60.0 + index * 60.0);

                    return rib;
                };

                this.createTrapezoid = function(widthTop, widthBottom, height)
                {
                    return (
                    {
                        xCenter: 0,
                        yCenter: 0,
                        widthTop: widthTop,
                        widthBottom: widthBottom,
                        height: height,
                    });
                };

                function d2r(d)
                {
                    return d * Math.PI / 180.0;
                }

                function isDone()
                {
                    var count = 0;

                    Object.keys(panels).forEach(function(consolePanelKey)
                    {
                        var panel = panels[consolePanelKey];

                        if (panel.material.map !== null)
                        {
                            count++;
                        }
                    });

                    return (count === 6);
                }

                // Create panels.
                ConsolePanel.values().forEach(function(consolePanelKey, i)
                {
                    var rotationZ = i * d2r(60.0);
                    this.createPanel(consolePanelKey, rotationZ, i);

                    root.add(that.createInnerHex(rotationZ));
                    root.add(that.createRib(i));
                    root.add(that.createBaseInsert(rotationZ));
                    root.add(that.createCollar(rotationZ));
                    root.add(that.createSkirt(rotationZ));
                }, this);

                // Backup call to callback in case texture load fails.
                timeoutId = setTimeout(function()
                {
                    LOGGER.error("Texture loads failed.");
                    callback(that);
                }, 5000);
            }

            if (Object.freeze)
            {
                Object.freeze(ConsoleUI);
            }

            return ConsoleUI;
        });
