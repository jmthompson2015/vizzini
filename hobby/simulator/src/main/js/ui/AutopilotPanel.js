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

            var bodyVector = this.computeRelativeVector(this.state.bodyKey);
            var shipVector = this.computeRelativeVector(this.state.shipKey);

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
            var bodySetButton = React.DOM.button(
            {
                onClick: this.bodySet,
            }, "Set");

            var shipKeys = this.props.environment.shipKeys();
            var shipSelect = React.createElement(ObjectSelect.ShipSelect,
            {
                shipKeys: shipKeys,
                environment: this.props.environment,
                callback: this.handleShipChange,
            });
            var shipSetButton = React.DOM.button(
            {
                onClick: this.shipSet,
            }, "Set");

            rows = [];
            cells = [];
            cells.push(React.DOM.td(
            {
                className: "alignCenter",
                colSpan: "3",
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
                colSpan: "3",
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
            }, Math.round(bodyVector.magnitude()) + " km " + bodyVector.toHeadingString()));
            cells.push(React.DOM.td({}, bodySetButton));
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
            }, Math.round(shipVector.magnitude()) + " km " + shipVector.toHeadingString()));
            cells.push(React.DOM.td({}, shipSetButton));
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

        bodySet: function()
        {
            this.setVector(this.computeRelativeVector(this.state.bodyKey));
        },

        computeRelativeVector: function(objectKey)
        {
            InputValidator.validateNotNull("state", this.props.state);
            InputValidator.validateNotNull("environment", this.props.environment);

            var r0 = this.props.state.position();
            var r1 = this.props.environment.state(objectKey).position();

            return r1.subtract(r0);
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
            }, this.bodySet);
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
            }, this.shipSet);
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
            var h = this.props.state.angularMomentum().unit();
            var portV = h.cross(v).unit();
            this.setVector(portV);
        },

        setStarboardV: function()
        {
            InputValidator.validateNotNull("state", this.props.state);

            var r = this.props.state.position().unit();
            var v = this.props.state.velocity().unit();
            var h = this.props.state.angularMomentum().unit();
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

        shipSet: function()
        {
            this.setVector(this.computeRelativeVector(this.state.shipKey));
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
