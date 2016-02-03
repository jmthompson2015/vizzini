define([ "Body", "ui/CameraUI" ], function(Body, CameraUI)
{
    "use strict";
    var ObserverCameraUI = React.createClass(
    {
        getInitialState: function()
        {
            InputValidator.validateNotNull("environment", this.props.environment);

            var environment = this.props.environment;
            var bodyKey = (this.props.initialSelectedValue ? this.props.initialSelectedValue : Body.SOL);
            var body = Body.properties[bodyKey];
            var observer = environment.ship(body.name + " Observer");
            var sensor = observer.device("Camera");

            return (
            {
                bodyKey: bodyKey,
                sensor: sensor,
            });
        },

        render: function()
        {
            InputValidator.validateNotNull("environment", this.props.environment);

            var environment = this.props.environment;
            var bodyKeys = environment.bodyKeys();
            var labelFunction = function(bodyKey)
            {
                return Body.properties[bodyKey].name;
            };
            var initialSelectedValue = this.props.initialSelectedValue;

            var select = React.createElement(Select,
            {
                values: bodyKeys,
                labelFunction: labelFunction,
                initialSelectedValue: initialSelectedValue,
                onChange: this.bodyChanged,
            });

            InputValidator.validateNotNull("canvasId", this.props.canvasId);
            InputValidator.validateNotNull("width", this.props.width);
            InputValidator.validateNotNull("height", this.props.height);
            var bodyKey = this.state.bodyKey;
            var sensor = this.state.sensor;

            var cameraUI = React.createElement(CameraUI,
            {
                key: bodyKey,
                canvasId: this.props.canvasId,
                sensor: sensor,
                width: this.props.width,
                height: this.props.height,
            });

            var rows = [];
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td({}, React.DOM.span({}, "Observer Satellite "), select)));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td({}, cameraUI)));

            return React.DOM.table({}, rows);
        },

        bodyChanged: function(event)
        {
            var bodyKey = event.target.value;
            LOGGER.trace("bodyChanged() bodyKey = " + bodyKey);
            var body = Body.properties[bodyKey];
            var environment = this.props.environment;
            var observer = environment.ship(body.name + " Observer");
            var sensor = observer.device("Camera");

            this.setState(
            {
                bodyKey: bodyKey,
                sensor: sensor,
            });
        }
    });

    return ObserverCameraUI;
});
