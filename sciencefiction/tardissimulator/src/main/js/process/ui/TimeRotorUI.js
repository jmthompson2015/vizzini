define([ "process/ui/TimeRotorCapUI", "process/ui/TimeRotorTubeUI" ], function(TimeRotorCapUI, TimeRotorTubeUI)
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

        var baseHeight = 0.44 * coverRatio2;
        var baseHeight2 = 0.02 * coverRatio2;
        var tubeHeight = 3.25 * coverRatio2;
        var capHeight = 0.15 * coverRatio2;

        var tubes = [];

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

            var base2 = this.createBase2();
            base2.position.set(0, baseHeight / 2.0 + baseHeight2 / 2.0, 0);

            var answer = new THREE.Mesh(geometry, material);
            answer.add(base2);

            var y = baseHeight / 2.0;
            answer.position.set(0, y, 0);

            return answer;
        };

        this.createBase2 = function()
        {
            var geometry = new THREE.CylinderGeometry(baseRadius, baseRadius, baseHeight2, 32);
            var material = new THREE.MeshStandardMaterial(
            {
                color: 0xFFFFFF,
                metalness: 0.2,
            });

            geometry.computeFaceNormals();
            geometry.computeVertexNormals();

            return new THREE.Mesh(geometry, material);
        };

        this.createCap = function()
        {
            var answer = new TimeRotorCapUI(tubePositionRadius, tubeRadius, capHeight).mesh();
            var y = baseHeight + baseHeight2 + tubeHeight + capHeight / 2.0;
            answer.position.set(0, y, 0);

            return answer;
        };

        this.createCover = function()
        {
            var geometry = new THREE.CylinderGeometry(coverRadius, coverRadius, coverHeight, 32);
            var material = new THREE.MeshPhongMaterial(
            {
                color: 0xFFFFFF,
                opacity: 0.35,
                transparent: true,
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
            var geometry = new THREE.BoxGeometry(0.8 * tubePositionRadius, tubeHeight, 0.25);

            geometry.computeFaceNormals();
            geometry.computeVertexNormals();

            var material = new THREE.MeshStandardMaterial(
            {
                color: 0xFF8888,
                metalness: 0,
                opacity: 0.5,
            });

            return new THREE.Mesh(geometry, material);
        };

        this.createTube = function()
        {
            return new TimeRotorTubeUI(tubeRadius, tubeHeight);
        };

        this.setActive = function(isActive)
        {
            tubes.forEach(function(tube)
            {
                tube.setActive(isActive);
            });
        };

        function d2r(d)
        {
            return d * Math.PI / 180.0;
        }

        root.add(this.createCover());
        root.add(this.createBase());
        root.add(this.createCap());

        var i, x, y, z;

        for (i = 0; i < 3; i++)
        {
            var tube = this.createTube();
            x = tubePositionRadius * Math.sin(d2r(i * 120.0));
            y = baseHeight + baseHeight2 + (tubeHeight / 2.0);
            z = tubePositionRadius * Math.cos(d2r(i * 120.0));
            tube.root().position.set(x, y, z);
            root.add(tube.root());
            tubes.push(tube);
        }

        var factor = 0.85;

        for (i = 0; i < 3; i++)
        {
            var sidePiece = this.createSidePiece();
            x = factor * tubePositionRadius * Math.sin(d2r((i * 120.0) + 60.0));
            y = baseHeight + baseHeight2 + (tubeHeight / 2.0);
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
