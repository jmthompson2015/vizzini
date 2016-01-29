define([ "ui/SceneUI" ], function(SceneUI)
{
    "use strict";
    function SensorUI(sensor, canvasId, width, height)
    {
        InputValidator.validateNotNull("sensor", sensor);
        InputValidator.validateNotNull("canvasId", canvasId);
        InputValidator.validateNotNull("width", width);
        InputValidator.validateNotNull("height", height);

        sensor.bind("dataUpdated", update);

        var myCanvas = document.getElementById(canvasId);
        var renderer = new THREE.WebGLRenderer(
        {
            antialias: true,
            canvas: myCanvas
        });

        renderer.setSize(width, height);

        var sceneUI = new SceneUI(sensor.environment());

        var camera = new THREE.PerspectiveCamera(90, width / height, 1.0, 1.0E+12);
        camera.position.set(0.0, 0.0, 0.0);
        camera.up.set(0.0, 0.0, 1.0);
        camera.lookAt(new THREE.Vector3(1.2E+04, 0.0, 0.0));

        this.render = function()
        {
            renderer.render(sceneUI.scene(), camera);
        };

        function update(bodyToState)
        {
            LOGGER.trace("SensorUI.update() start");

            for ( var bodyKey in bodyToState)
            {
                var bodyUI = sceneUI.bodyToUI()[bodyKey];
                var state = bodyToState[bodyKey];
                var position = state.position();
                bodyUI.position.set(position.x(), position.y(), position.z());
                var orientation = state.orientation();
                bodyUI.quaternion.set(orientation.x(), orientation.y(), orientation.z(), orientation.w());
            }

            LOGGER.trace("SensorUI.update() end");
        }
    }

    return SensorUI;
});
