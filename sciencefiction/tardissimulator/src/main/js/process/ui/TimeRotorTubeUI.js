define(function()
{
    "use strict";
    function TimeRotorTubeUI(tubeRadius, tubeHeight)
    {
        InputValidator.validateNotNull("tubeRadius", tubeRadius);
        InputValidator.validateNotNull("tubeHeight", tubeHeight);

        this.createCapGeometry = function(heightRatio)
        {
            var answer = new THREE.CylinderGeometry(tubeRadius, tubeRadius, heightRatio * tubeHeight, 16);

            answer.computeFaceNormals();
            answer.computeVertexNormals();

            return answer;
        };

        this.createCapMaterial = function()
        {
            return new THREE.MeshStandardMaterial(
            {
                color: 0xFF2211,
                metalness: 0,
                opacity: 0.75,
            });
        };

        this.createLightGeometry = function()
        {
            var answer = new THREE.CylinderGeometry(tubeRadius, tubeRadius, 0.39 * tubeHeight, 16);

            answer.computeFaceNormals();
            answer.computeVertexNormals();

            return answer;
        };

        this.createLightMaterial = function()
        {
            return new THREE.MeshStandardMaterial(
            {
                color: 0xFF2211,
                emissive: 0xFFFF88,
                emissiveIntensity: 0,
                metalness: 0,
                opacity: 0.75,
            });
        };

        this.root = function()
        {
            return root;
        };

        this.setActive = function(isActive)
        {
            var intensity = (isActive ? 0.5 : 0);

            topLight.material.emissiveIntensity = intensity;
            bottomLight.material.emissiveIntensity = intensity;
        };

        var top = new THREE.Mesh(this.createCapGeometry(0.055), this.createCapMaterial());
        var topLight = new THREE.Mesh(this.createLightGeometry(), this.createLightMaterial());
        var root = new THREE.Mesh(this.createCapGeometry(0.11), this.createCapMaterial());
        var bottomLight = new THREE.Mesh(this.createLightGeometry(), this.createLightMaterial());
        var bottom = new THREE.Mesh(this.createCapGeometry(0.055), this.createCapMaterial());

        top.position.set(0, (0.11 / 2.0 + 0.39 + 0.055 / 2.0) * tubeHeight, 0);
        topLight.position.set(0, (0.11 / 2.0 + 0.39 / 2.0) * tubeHeight, 0);
        bottomLight.position.set(0, -(0.11 / 2.0 + 0.39 / 2.0) * tubeHeight, 0);
        bottom.position.set(0, -(0.11 / 2.0 + 0.39 + 0.055 / 2.0) * tubeHeight, 0);

        root.add(top);
        root.add(topLight);
        root.add(bottomLight);
        root.add(bottom);
    }

    if (Object.freeze)
    {
        Object.freeze(TimeRotorTubeUI);
    }

    return TimeRotorTubeUI;
});
