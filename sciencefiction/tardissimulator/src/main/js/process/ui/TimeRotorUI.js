define(function()
{
    "use strict";
    function TimeRotorUI()
    {
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

        // From Scarfwearer.
        var coverDiameter = 23.5; // inches
        var coverRadius = coverDiameter / 2.0;
        var coverHeight = 29.0;
        var coverRatio1 = coverDiameter / 5.5;
        var coverRatio2 = coverHeight / 4.6;

        // Ratios of various parts to clear cylinder cover from Technical Manual.
        var baseRadius = (4.0 / 2.0) * coverRatio1;
        var tubeRadius = (0.9 / 2.0) * coverRatio1;
        var domeRadius = (0.45 / 2.0) * coverRatio1;
        var tubePositionRadius = 1.0 * coverRatio1;

        var baseHeight = 0.46 * coverRatio2;
        var tubeHeight = 3.4 * coverRatio2;

        var tubeColor = 0xFF2211;
        var tubeMaterial = new THREE.MeshStandardMaterial(
        {
            color: tubeColor,
            metalness: 0.4,
            opacity: 0.75,
            shading: THREE.FlatShading,
        });

        this.createBase = function()
        {
            var geometry = new THREE.CylinderGeometry(baseRadius, baseRadius, baseHeight, 32);
            var material = new THREE.MeshStandardMaterial(
            {
                color: 0x000000,
                shading: THREE.FlatShading,
            });

            geometry.computeFaceNormals();
            geometry.computeVertexNormals();

            var answer = new THREE.Mesh(geometry, material);
            var y = baseHeight / 2.0;
            answer.position.set(0, y, 0);

            return answer;
        };

        this.createCover = function()
        {
            var geometry = new THREE.CylinderGeometry(coverRadius, coverRadius, coverHeight, 32);
            var material = new THREE.MeshPhongMaterial(
            {
                color: 0xFFFFFF,
                transparent: true,
                opacity: 0.35,
            });

            geometry.computeFaceNormals();
            geometry.computeVertexNormals();

            var answer = new THREE.Mesh(geometry, material);
            var y = coverHeight / 2.0;
            answer.position.set(0, y, 0);

            return answer;
        };

        this.createSidePiece = function()
        {
            var geometry = new THREE.BoxGeometry(1.4 * tubePositionRadius, tubeHeight, 2.0);

            geometry.computeFaceNormals();
            geometry.computeVertexNormals();

            return new THREE.Mesh(geometry, tubeMaterial);
        };

        this.createTube = function()
        {
            var tubeGeometry = new THREE.CylinderGeometry(tubeRadius, tubeRadius, tubeHeight, 16);

            tubeGeometry.computeFaceNormals();
            tubeGeometry.computeVertexNormals();

            var domeGeometry = new THREE.SphereGeometry(domeRadius, 8, 6, 0, Math.PI);
            var domeMaterial = new THREE.MeshStandardMaterial(
            {
                color: 0xFFFFFF,
                metalness: 0.4,
            });

            domeGeometry.computeFaceNormals();
            domeGeometry.computeVertexNormals();

            var tube = new THREE.Mesh(tubeGeometry, tubeMaterial);
            var dome = new THREE.Mesh(domeGeometry, domeMaterial);
            var y = tubeHeight / 2.0;
            dome.position.set(0, y, 0);
            dome.rotation.x = d2r(-90.0);

            tube.add(dome);

            return tube;
        };

        function d2r(d)
        {
            return d * Math.PI / 180.0;
        }

        root.add(this.createCover());
        root.add(this.createBase());

        var i, x, y, z;

        for (i = 0; i < 3; i++)
        {
            var tube = this.createTube();
            x = tubePositionRadius * Math.sin(d2r(i * 120.0));
            y = baseHeight + (tubeHeight / 2.0);
            z = tubePositionRadius * Math.cos(d2r(i * 120.0));
            tube.position.set(x, y, z);
            root.add(tube);
        }

        var factor = 0.7;

        for (i = 0; i < 3; i++)
        {
            var sidePiece = this.createSidePiece();
            x = factor * tubePositionRadius * Math.sin(d2r((i * 120.0) + 60.0));
            y = baseHeight + (tubeHeight / 2.0);
            z = factor * tubePositionRadius * Math.cos(d2r((i * 120.0) + 60.0));
            sidePiece.position.set(x, y, z);
            sidePiece.rotation.y = d2r(60.0 * (1 - i));
            root.add(sidePiece);
        }
    }

    if (Object.freeze)
    {
        Object.freeze(TimeRotorUI);
    }

    return TimeRotorUI;
});
