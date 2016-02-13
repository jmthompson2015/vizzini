define([ "Quaternion", "Vector" ], function(Quaternion, Vector)
{
    "use strict";
    var AutopilotPanel = React.createClass(
    {
        getInitialState: function()
        {
            return (
            {
                azimuth: 0,
                elevation: 0,
                isEngaged: false,
            });
        },

        render: function()
        {
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
            cells.push(React.DOM.td({}, plusV));
            cells.push(React.DOM.td({}, portV));
            cells.push(React.DOM.td({}, minusV));
            cells.push(React.DOM.td({}, starboardV));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));
            var buttonsUI = React.DOM.table({}, rows);

            var engageButton = new React.DOM.button(
            {
                className: (this.state.isEngaged ? "toggleIsOn" : ""),
                onClick: this.toggleEngage,
            }, "Engage");

            rows = [];
            cells = [];
            cells.push(React.DOM.td({}, "Alignment Target"));
            cells.push(React.DOM.td({}, azimuthUI));
            cells.push(React.DOM.td({}, "m"));
            cells.push(React.DOM.td({}, elevationUI));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                colSpan: "4",
            }, buttonsUI));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                colSpan: "4",
            }, engageButton));
            rows.push(React.DOM.tr(
            {
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

        handleElevationChange: function(event)
        {
            this.setState(
            {
                elevation: event.target.value,
            });
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
            InputValidator.validateNotNull("state", this.props.state);
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
