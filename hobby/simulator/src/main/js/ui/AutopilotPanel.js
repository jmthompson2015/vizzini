define([ "Quaternion", "Vector", "ui/ObjectSelect" ], function(Quaternion, Vector, ObjectSelect)
{
    "use strict";
    var AutopilotPanel = React.createClass(
    {
        getInitialState: function()
        {
            InputValidator.validateNotNull("state", this.props.state);
            InputValidator.validateNotNull("environment", this.props.environment);

            var bodyKeys = this.props.environment.bodyKeys();
            var shipKeys = this.props.environment.shipKeys();

            return (
            {
                azimuth: 0,
                bodyKey: bodyKeys[0],
                elevation: 0,
                isEngaged: false,
                shipKey: shipKeys[0],
            });
        },

        componentDidMount: function()
        {
            InputValidator.validateNotNull("computer", this.props.computer);

            this.props.computer.bind("isActive", this.handleIsEngagedChange);
        },

        render: function()
        {
            InputValidator.validateNotNull("environment", this.props.environment);

            var bodyPositionVector = this.computeRelativePositionVector(this.state.bodyKey);
            var bodyVelocityVector = this.computeRelativeVelocityVector(this.state.bodyKey);
            var shipPositionVector = this.computeRelativePositionVector(this.state.shipKey);
            var shipVelocityVector = this.computeRelativeVelocityVector(this.state.shipKey);

            var azimuthUI = React.DOM.input(
            {
                className: "numberInput",
                type: "number",
                max: 359,
                value: this.state.azimuth,
                onChange: this.handleAzimuthChange,
            });
            var elevationUI = React.DOM.input(
            {
                className: "numberInput",
                type: "number",
                max: 359,
                value: this.state.elevation,
                onChange: this.handleElevationChange,
            });
            var engageButton = new React.DOM.button(
            {
                className: (this.state.isEngaged ? "toggleIsOn" : ""),
                onClick: this.toggleEngage,
            }, "Engage");
            var dorsalV = React.DOM.button(
            {
                onClick: this.setDorsalV,
            }, "Dorsal \u27C2 V");
            var plusV = React.DOM.button(
            {
                onClick: this.setPlusV,
            }, "+V");
            var portV = React.DOM.button(
            {
                onClick: this.setPortV,
            }, "Port \u27C2 V");
            var minusV = React.DOM.button(
            {
                onClick: this.setMinusV,
            }, "-V");
            var starboardV = React.DOM.button(
            {
                onClick: this.setStarboardV,
            }, "Starboard \u27C2 V");
            var ventralV = React.DOM.button(
            {
                onClick: this.setVentralV,
            }, "Ventral \u27C2 V");

            var rows = [];
            var cells = [];
            cells.push(React.DOM.td({}, "Alignment Target"));
            cells.push(React.DOM.td({}, azimuthUI));
            cells.push(React.DOM.td({}, "m"));
            cells.push(React.DOM.td({}, elevationUI));
            cells.push(React.DOM.td({}, engageButton));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));
            var targetUI = React.DOM.table(
            {
                className: "alignCenter",
            }, rows);

            rows = [];
            cells = [];
            cells.push(React.DOM.td(
            {
                colSpan: "3",
            }, dorsalV));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td({}, portV));
            cells.push(React.DOM.td({}, plusV));
            cells.push(React.DOM.td({}, starboardV));
            cells.push(React.DOM.td({}, minusV));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                colSpan: "3",
            }, ventralV));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));
            var buttonsUI = React.DOM.table(
            {
                className: "alignCenter",
            }, rows);

            var bodyKeys = this.props.environment.bodyKeys();
            var bodySelect = React.createElement(ObjectSelect.BodySelect,
            {
                bodyKeys: bodyKeys,
                callback: this.handleBodyChange,
            });
            var bodyPositionSetButton = React.DOM.button(
            {
                onClick: this.bodyPositionSet,
            }, "Set");
            var bodyPositionDeltaVButton = React.DOM.button(
            {
                onClick: this.bodyPositionDeltaVSet,
            }, "\u0394V");
            var bodyVelocitySetButton = React.DOM.button(
            {
                onClick: this.bodyVelocitySet,
            }, "Set");

            var shipKeys = this.props.environment.shipKeys();
            var shipSelect = React.createElement(ObjectSelect.ShipSelect,
            {
                shipKeys: shipKeys,
                environment: this.props.environment,
                callback: this.handleShipChange,
            });
            var shipPositionSetButton = React.DOM.button(
            {
                onClick: this.shipPositionSet,
            }, "Set");
            var shipPositionDeltaVButton = React.DOM.button(
            {
                onClick: this.shipPositionDeltaVSet,
            }, "\u0394V");
            var shipVelocitySetButton = React.DOM.button(
            {
                onClick: this.shipVelocitySet,
            }, "Set");

            rows = [];
            cells = [];
            cells.push(React.DOM.td(
            {
                className: "alignCenter",
                colSpan: "4",
            }, targetUI));
            rows.push(React.DOM.tr(
            {
                className: "autopilotRow",
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                className: "alignCenter",
                colSpan: "4",
            }, buttonsUI));
            rows.push(React.DOM.tr(
            {
                className: "autopilotRow",
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                className: "autopilotLabel",
                rowSpan: "2",
            }, bodySelect));
            cells.push(React.DOM.td(
            {
                className: "autopilotValue",
            }, Math.round(bodyPositionVector.magnitude()) + " km " + bodyPositionVector.toHeadingString()));
            cells.push(React.DOM.td({}, bodyPositionSetButton));
            cells.push(React.DOM.td({}, bodyPositionDeltaVButton));
            rows.push(React.DOM.tr(
            {
                className: "autopilotRow",
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                className: "autopilotValue",
            }, Math.round(bodyVelocityVector.magnitude()) + " km/s " + bodyVelocityVector.toHeadingString()));
            cells.push(React.DOM.td({}, bodyVelocitySetButton));
            rows.push(React.DOM.tr(
            {
                className: "autopilotRow",
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                className: "autopilotLabel",
                rowSpan: "2",
            }, shipSelect));
            cells.push(React.DOM.td(
            {
                className: "autopilotValue",
            }, Math.round(shipPositionVector.magnitude()) + " km " + shipPositionVector.toHeadingString()));
            cells.push(React.DOM.td({}, shipPositionSetButton));
            cells.push(React.DOM.td({}, shipPositionDeltaVButton));
            rows.push(React.DOM.tr(
            {
                className: "autopilotRow",
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                className: "autopilotValue",
            }, Math.round(shipVelocityVector.magnitude()) + " km/s " + shipVelocityVector.toHeadingString()));
            cells.push(React.DOM.td({}, shipVelocitySetButton));
            rows.push(React.DOM.tr(
            {
                className: "autopilotRow",
                key: rows.length,
            }, cells));

            return React.DOM.table(
            {
                className: "autopilotPanel",
            }, rows);
        },

        bodyPositionSet: function()
        {
            this.setVector(this.computeRelativePositionVector(this.state.bodyKey));
        },

        bodyPositionDeltaVSet: function()
        {
            InputValidator.validateNotNull("state", this.props.state);

            var vDesired = this.computeRelativePositionVector(this.state.bodyKey).unit();
            var v = this.props.state.velocity().unit();
            var vector = vDesired.subtract(v).unit();
            this.setVector(vector);
        },

        bodyVelocitySet: function()
        {
            this.setVector(this.computeRelativeVelocityVector(this.state.bodyKey));
        },

        computeRelativePositionVector: function(objectKey)
        {
            InputValidator.validateNotNull("state", this.props.state);
            InputValidator.validateNotNull("environment", this.props.environment);

            var r0 = this.props.state.position();
            var r1 = this.props.environment.state(objectKey).position();

            return r1.subtract(r0);
        },

        computeRelativeVelocityVector: function(objectKey)
        {
            InputValidator.validateNotNull("state", this.props.state);
            InputValidator.validateNotNull("environment", this.props.environment);

            var v0 = this.props.state.velocity();
            var v1 = this.props.environment.state(objectKey).velocity();

            return v1.subtract(v0);
        },

        handleAzimuthChange: function(event)
        {
            this.setState(
            {
                azimuth: event.target.value,
            });
        },

        handleBodyChange: function(newBodyKey)
        {
            InputValidator.validateNotNull("state", this.props.state);
            InputValidator.validateNotNull("environment", this.props.environment);

            LOGGER.trace("handleBodyChange() newBodyKey = " + newBodyKey);
            this.setState(
            {
                bodyKey: newBodyKey,
            }, this.bodyPositionSet);
        },

        handleElevationChange: function(event)
        {
            this.setState(
            {
                elevation: event.target.value,
            });
        },

        handleIsEngagedChange: function(newIsEngaged)
        {
            this.setState(
            {
                isEngaged: newIsEngaged,
            });
        },

        handleShipChange: function(newShipKey)
        {
            InputValidator.validateNotNull("state", this.props.state);
            InputValidator.validateNotNull("environment", this.props.environment);

            LOGGER.trace("handleShipChange() newShipKey = " + newShipKey);
            this.setState(
            {
                shipKey: newShipKey,
            }, this.shipPositionSet);
        },

        setDorsalV: function()
        {
            InputValidator.validateNotNull("state", this.props.state);

            var v = this.props.state.velocity().unit();
            var z = this.props.state.orientation().postMultiply(Vector.Z_AXIS).unit();
            var vector = v.cross(z).cross(v).unit();
            this.setVector(vector);
        },

        setMinusV: function()
        {
            InputValidator.validateNotNull("state", this.props.state);

            var v = this.props.state.velocity().unit().multiply(-1.0);
            this.setVector(v);
        },

        setPlusV: function()
        {
            InputValidator.validateNotNull("state", this.props.state);

            var v = this.props.state.velocity().unit();
            this.setVector(v);
        },

        setPortV: function()
        {
            InputValidator.validateNotNull("state", this.props.state);

            var v = this.props.state.velocity().unit();
            var y = this.props.state.orientation().postMultiply(Vector.Y_AXIS).unit();
            var vector = y.cross(v).cross(v).unit();
            this.setVector(vector);
        },

        setStarboardV: function()
        {
            InputValidator.validateNotNull("state", this.props.state);

            var v = this.props.state.velocity().unit();
            var y = this.props.state.orientation().postMultiply(Vector.Y_AXIS).unit();
            var vector = v.cross(y).cross(v).unit();
            this.setVector(vector);
        },

        setVector: function(v)
        {
            InputValidator.validateNotNull("v", v);

            this.setState(
            {
                azimuth: Vector.normalizeAngle(Math.round(v.azimuth())),
                elevation: Vector.normalizeAngle(Math.round(v.elevation())),
            });
        },

        setVentralV: function()
        {
            InputValidator.validateNotNull("state", this.props.state);

            var v = this.props.state.velocity().unit();
            var z = this.props.state.orientation().postMultiply(Vector.Z_AXIS).unit();
            var vector = z.cross(v).cross(v).unit();
            this.setVector(vector);
        },

        shipPositionSet: function()
        {
            this.setVector(this.computeRelativePositionVector(this.state.shipKey));
        },

        shipPositionDeltaVSet: function()
        {
            InputValidator.validateNotNull("state", this.props.state);

            var vDesired = this.computeRelativePositionVector(this.state.shipKey).unit();
            var v = this.props.state.velocity().unit();
            var vector = vDesired.subtract(v).unit();
            this.setVector(vector);
        },

        shipVelocitySet: function()
        {
            this.setVector(this.computeRelativeVelocityVector(this.state.shipKey));
        },

        toggleEngage: function()
        {
            InputValidator.validateNotNull("computer", this.props.computer);

            var isEngaged = !this.state.isEngaged;
            LOGGER.info("isEngaged ? " + isEngaged);
            var azimuth = parseInt(this.state.azimuth);
            var elevation = parseInt(this.state.elevation);
            var targetVector = Quaternion.newInstanceAzimuthElevation(azimuth, elevation).preMultiply(Vector.X_AXIS);

            if (isEngaged)
            {
                this.props.computer.targetVector(targetVector);
            }

            this.props.computer.isActive(isEngaged);

            this.setState(
            {
                isEngaged: isEngaged,
            });
        },
    });

    return AutopilotPanel;
});
