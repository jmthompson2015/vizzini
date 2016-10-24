define(function()
{
    "use strict";
    function ShipUI(ship, callback)
    {
        InputValidator.validateNotNull("ship", ship);
        InputValidator.validateNotNull("callback", callback);

        var radii = ship.radii();
        var max = Math.max(radii.x(), Math.max(radii.y(), radii.z()));

        var geometry = createGeometry();
        var material = createMaterial();

        var mesh = new THREE.Mesh(geometry, material);
        mesh.name = ship.name();
        mesh.shipKey = ship.name();

        // FIXME: temporary.
        mesh.add(new THREE.AxisHelper(1.33 * max));

        callback(mesh);

        function createGeometry()
        {
            var answer = new THREE.SphereGeometry(max, 32, 32);
            answer.applyMatrix(new THREE.Matrix4().makeScale(radii.x() / max, radii.y() / max, radii.z() / max));

            // Rotate sphere axis to Z.
            answer.rotateX(0.5 * Math.PI);

            return answer;
        }

        function createMaterial()
        {
            var materialProps =
            {
                color: 0xffffff
            };

            return new THREE.MeshPhongMaterial(materialProps);
        }
    }

    return ShipUI;
});
