define([ "Body", "ui/SceneUI" ], function(Body, SceneUI)
{
    "use strict";
    var CameraUI = React.createClass(
    {
        getInitialState: function()
        {
            this.createSceneUI();

            return (
            {
                camera: this.createCamera(),
            });
        },

        componentDidMount: function()
        {
            this.setState(
            {
                renderer: this.createRenderer(),
            });
        },

        componentWillUnmount: function()
        {
            var sensor = this.props.sensor;

            if (sensor)
            {
                sensor.unbind("dataUpdated", this.updateScene);
            }
        },

        render: function()
        {
            InputValidator.validateNotNull("canvasId", this.props.canvasId);
            var canvasId = this.props.canvasId;

            return React.DOM.canvas(
            {
                id: canvasId,
            });
        },

        createCamera: function()
        {
            InputValidator.validateNotNull("width", this.props.width);
            InputValidator.validateNotNull("height", this.props.height);

            var answer = new THREE.PerspectiveCamera(45, this.props.width / this.props.height, 1.0, 1.0E+12);
            answer.position.set(0.0, 0.0, 0.0);
            answer.up.set(0.0, 0.0, 1.0);
            answer.lookAt(new THREE.Vector3(1.2E+04, 0.0, 0.0));
            answer.updateProjectionMatrix();

            return answer;
        },

        createRenderer: function()
        {
            InputValidator.validateNotNull("canvasId", this.props.canvasId);
            InputValidator.validateNotNull("width", this.props.width);
            InputValidator.validateNotNull("height", this.props.height);

            var canvasId = this.props.canvasId;
            var canvas = document.getElementById(canvasId);
            InputValidator.validateNotNull("canvas", canvas);

            var answer = new THREE.WebGLRenderer(
            {
                antialias: true,
                canvas: canvas,
                logarithmicDepthBuffer: true,
            });

            answer.setClearColor(0x000000, 1);
            answer.setSize(this.props.width, this.props.height);

            return answer;
        },

        createSceneUI: function()
        {
            InputValidator.validateNotNull("sensor", this.props.sensor);

            var sensor = this.props.sensor;
            var answer = new SceneUI(sensor.environment(), this.finishSceneUI);

            return answer;
        },

        finishSceneUI: function(sceneUI)
        {
            this.setState(
            {
                sceneUI: sceneUI,
            }, function()
            {
                var sensor = this.props.sensor;
                sensor.bind("dataUpdated", this.updateScene);

                this.startRenderLoop();
            });
        },

        render3D: function()
        {
            var renderer = this.state.renderer;
            var sceneUI = this.state.sceneUI;
            var camera = this.state.camera;

            renderer.render(sceneUI.scene(), camera);
        },

        startRenderLoop: function()
        {
            this.THREErender();
        },

        THREErender: function()
        {
            requestAnimationFrame(this.THREErender);

            this.render3D();
        },

        updateScene: function(bodyToState)
        {
            var sceneUI = this.state.sceneUI;

            for ( var bodyKey in bodyToState)
            {
                var bodyUI = sceneUI.bodyToUI()[bodyKey];
                var state = bodyToState[bodyKey];
                var position = state.position();
                bodyUI.position.set(position.x(), position.y(), position.z());
                var orientation = state.orientation();
                bodyUI.quaternion.set(orientation.x(), orientation.y(), orientation.z(), orientation.w());
            }

            // Move the point light.
            var pointLight = sceneUI.pointLight();
            var solState = bodyToState[Body.SOL];
            if (solState)
            {
                var solPosition = solState.position();
                pointLight.position.set(solPosition.x(), solPosition.y(), solPosition.z());
            }
        }
    });

    return CameraUI;
});
