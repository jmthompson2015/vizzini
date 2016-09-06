define(function()
{
    var ObjectViewer = React.createClass(
    {
        getInitialState: function()
        {
            LOGGER.trace("ObjectViewer.getInitialState()");

            return (
            {
                camera: this.createCamera(),
                renderLoopStarted: false,
            });
        },

        componentDidMount: function()
        {
            LOGGER.trace("ObjectViewer.componentDidMount()");

            this.setState(
            {
                renderer: this.createRenderer(),
            }, function()
            {
                LOGGER.debug("setState completed function 1");
                this.buildScene();
            });
        },

        render: function()
        {
            LOGGER.trace("ObjectViewer.render()");

            var canvasId = this.props.canvasId;

            var canvas = React.DOM.canvas(
            {
                id: canvasId,
            });

            var rows = [];
            var cell0 = React.DOM.td({}, canvas);
            this.addRow(rows, cell0);

            var cell1 = React.DOM.td({}, this.createButtonPanel());
            this.addRow(rows, cell1);

            return React.DOM.table(
            {
                style:
                {
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                },
            }, React.DOM.tbody({}, rows));
        },

        addCell: function(cells, child)
        {
            cells.push(React.DOM.td(
            {
                key: cells.length,
            }, child));
        },

        addRow: function(rows, child)
        {
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, child));
        },

        buildScene: function()
        {
            LOGGER.trace("ObjectViewer.buildScene()");

            var scene = new THREE.Scene();
            var background = (this.props.background ? this.props.background : 0x000000);
            scene.background = new THREE.Color(background);

            var ambientLightColor = (this.props.ambientLightColor ? this.props.ambientLightColor : 0xFFFFFF);
            var ambientLightIntensity = (this.props.ambientLightIntensity ? this.props.ambientLightIntensity : 0.7);
            var ambientLight = new THREE.AmbientLight(ambientLightColor, ambientLightIntensity);
            scene.add(ambientLight);

            var pointLightColor = (this.props.pointLightColor ? this.props.pointLightColor : 0xFFFFFF);
            var pointLightIntensity = (this.props.pointLightIntensity ? this.props.pointLightIntensity : 0.6);
            var pointLightPosition = (this.props.pointLightPosition ? this.props.pointLightPosition
                    : new THREE.Vector3(0, 20, 20));
            var pointLight = new THREE.PointLight(pointLightColor, pointLightIntensity, 0);
            pointLight.position.copy(pointLightPosition);
            scene.add(pointLight);

            scene.add(this.props.root);

            this.setState(
            {
                scene: scene,
            }, function()
            {
                LOGGER.debug("setState completed function 2");

                if (!this.state.renderLoopStarted && this.state.renderer && this.state.scene && this.state.camera)
                {
                    this.setState(
                    {
                        renderLoopStarted: true
                    });
                    this.startRenderLoop();
                }
            });
        },

        createButton: function(title, onClick, child)
        {
            return React.DOM.button(
            {
                onClick: onClick,
                title: title,
            }, child);
        },

        createButtonPanel: function()
        {
            var arrowPlus = "\u21BA";
            var arrowMinus = "\u21BB";

            var right = this.createButton("Right", this.rotateRight, arrowPlus);
            var down = this.createButton("Down", this.rotateDown, arrowPlus);
            var anticlockwise = this.createButton("Anticlockwise", this.rotateAnticlockwise, arrowPlus);

            var left = this.createButton("Left", this.rotateLeft, arrowMinus);
            var up = this.createButton("Up", this.rotateUp, arrowMinus);
            var clockwise = this.createButton("Clockwise", this.rotateClockwise, arrowMinus);

            var zero = this.createButton("Zero", this.rotateZero, "\u25FC");

            var rows = [];
            var cells = [];
            this.addCell(cells, "");
            this.addCell(cells, up);
            this.addCell(cells, "");
            this.addRow(rows, cells);

            cells = [];
            this.addCell(cells, left);
            this.addCell(cells, zero);
            this.addCell(cells, right);
            this.addRow(rows, cells);

            cells = [];
            this.addCell(cells, anticlockwise);
            this.addCell(cells, down);
            this.addCell(cells, clockwise);
            this.addRow(rows, cells);

            return React.DOM.table(
            {
                style:
                {
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                },
            }, React.DOM.tbody({}, rows));
        },

        createCamera: function()
        {
            LOGGER.trace("ObjectViewer.createCamera()");

            var cameraFOV = (this.props.cameraFOV ? this.props.cameraFOV : 75);
            var answer = new THREE.PerspectiveCamera(cameraFOV, this.props.width / this.props.height, 0.1, 1000);

            var cameraPosition = (this.props.cameraPosition ? this.props.cameraPosition : new THREE.Vector3(0, 0, 10));
            answer.position.copy(cameraPosition);
            answer.lookAt(new THREE.Vector3(0, 0, 0));

            return answer;
        },

        createRenderer: function()
        {
            LOGGER.trace("ObjectViewer.createRenderer()");

            var canvasId = this.props.canvasId;
            var canvas = document.getElementById(canvasId);
            InputValidator.validateNotNull("canvas", canvas);

            var answer = new THREE.WebGLRenderer(
            {
                alpha: true,
                antialias: true,
                canvas: canvas,
            });

            answer.setSize(this.props.width, this.props.height);

            return answer;
        },

        d2r: function(d)
        {
            return d * Math.PI / 180.0;
        },

        deltaAngle: function()
        {
            return (this.props.deltaAngle ? this.props.deltaAngle : 90);
        },

        render3D: function()
        {
            var renderer = this.state.renderer;
            var scene = this.state.scene;
            var camera = this.state.camera;

            renderer.render(scene, camera);
        },

        rotateAnticlockwise: function()
        {
            this.props.root.rotation.z += this.d2r(this.deltaAngle());
        },

        rotateClockwise: function()
        {
            this.props.root.rotation.z += this.d2r(-this.deltaAngle());
        },

        rotateDown: function()
        {
            this.props.root.rotation.x += this.d2r(this.deltaAngle());
        },

        rotateLeft: function()
        {
            this.props.root.rotation.y += this.d2r(-this.deltaAngle());
        },

        rotateRight: function()
        {
            this.props.root.rotation.y += this.d2r(this.deltaAngle());
        },

        rotateUp: function()
        {
            this.props.root.rotation.x += this.d2r(-this.deltaAngle());
        },

        rotateZero: function()
        {
            this.props.root.rotation.set(0, 0, 0);
        },

        startRenderLoop: function()
        {
            LOGGER.debug("ObjectViewer.startRenderLoop()");

            this.THREErender();
        },

        THREErender: function()
        {
            requestAnimationFrame(this.THREErender);

            this.render3D();
        },
    });

    ObjectViewer.propTypes =
    {
        canvasId: React.PropTypes.string.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        root: React.PropTypes.object.isRequired,

        cameraFOV: React.PropTypes.number,
        cameraPosition: React.PropTypes.object,
        background: React.PropTypes.number,
        ambientLightColor: React.PropTypes.number,
        ambientLightIntensity: React.PropTypes.number,
        pointLightColor: React.PropTypes.number,
        pointLightIntensity: React.PropTypes.number,
        pointLightPosition: React.PropTypes.object,
        deltaAngle: React.PropTypes.number,
    };

    if (Object.freeze)
    {
        Object.freeze(ObjectViewer);
    }

    return ObjectViewer;
});
