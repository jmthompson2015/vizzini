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
            var r0 = this.props.state.position();
            var r1 = this.props.environment.state(bodyKeys[0]).position();
            var bodyVector = r1.subtract(r0);

            var shipKeys = this.props.environment.shipKeys();
            var r2 = this.props.environment.state(shipKeys[0]).position();
            var shipVector = r2.subtract(r0);

            return (
            {
                azimuth: 0,
                elevation: 0,
                isEngaged: false,
                bodyVector: bodyVector,
                shipVector: shipVector,
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
            cells.push(React.DOM.td({}, plusV));
            cells.push(React.DOM.td({}, portV));
            cells.push(React.DOM.td({}, minusV));
            cells.push(React.DOM.td({}, starboardV));
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

            var shipKeys = this.props.environment.shipKeys();
            var shipSelect = React.createElement(ObjectSelect.ShipSelect,
            {
                shipKeys: shipKeys,
                environment: this.props.environment,
                callback: this.handleShipChange,
            });

            rows = [];
            cells = [];
            cells.push(React.DOM.td(
            {
                className: "alignCenter",
                colSpan: "2",
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
                colSpan: "2",
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
            }, bodySelect));
            cells.push(React.DOM.td(
            {
                className: "autopilotValue",
            }, Math.round(this.state.bodyVector.magnitude()) + " km " + this.state.bodyVector.toHeadingString()));
            rows.push(React.DOM.tr(
            {
                className: "autopilotRow",
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                className: "autopilotLabel",
            }, shipSelect));
            cells.push(React.DOM.td(
            {
                className: "autopilotValue",
            }, Math.round(this.state.shipVector.magnitude()) + " km " + this.state.shipVector.toHeadingString()));
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
            var r0 = this.props.state.position();
            var r1 = this.props.environment.state(newBodyKey).position();
            var r10 = r1.subtract(r0);

            this.setState(
            {
                bodyVector: r10,
            });
            this.setVector(r10);
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
            var r0 = this.props.state.position();
            var r1 = this.props.environment.state(newShipKey).position();
            var r10 = r1.subtract(r0);

            this.setState(
            {
                shipVector: r10,
            });
            this.setVector(r10);
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

            var r = this.props.state.position().unit();
            var v = this.props.state.velocity().unit();
            var h = r.cross(v).unit();
            var portV = h.cross(v).unit();
            this.setVector(portV);
        },

        setStarboardV: function()
        {
            InputValidator.validateNotNull("state", this.props.state);

            var r = this.props.state.position().unit();
            var v = this.props.state.velocity().unit();
            var h = r.cross(v).unit();
            var starboardV = v.cross(h).unit();
            this.setVector(starboardV);
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
