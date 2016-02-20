define([ "Body", "Vector" ], function(Body, Vector)
{
    "use strict";
    var SpacecraftStatus = React.createClass(
    {
        getInitialState: function()
        {
            return (
            {
                fuelLevel: 0,
                powerLevel: 0,
                targetBodyKey: Body.SOL,
            });
        },

        componentDidMount: function()
        {
            InputValidator.validateNotNull("ship", this.props.ship);

            var ship = this.props.ship;
            var fuelTank = ship.device("FuelTank");
            fuelTank.bind("dataUpdated", this.updateFuelLevel);
            var fusionReactor = ship.device("FusionReactor");
            fusionReactor.bind("dataUpdated", this.updatePowerLevel);
        },

        render: function()
        {
            InputValidator.validateNotNull("ship", this.props.ship);
            InputValidator.validateNotNull("state", this.props.state);

            var ship = this.props.ship;
            var state = this.props.state;
            var timestamp = state.date().format("YYYY-MM-DD HH:mm:ss");
            var heading = state.orientation().preMultiply(Vector.X_AXIS).toHeadingString();
            var environment = ship.devices()[0].environment();
            var bodyKeys = environment.bodyKeys();
            var targetBodyKey = this.state.targetBodyKey;
            var targetState = environment.state(targetBodyKey);
            var targetVector = targetState.position().subtract(state.position());

            var rows = [];

            var cells = [];
            cells.push(React.DOM.td(
            {
                className: "spacecraftLabel",
            }, "Time"));
            cells.push(React.DOM.td(
            {
                className: "spacecraftValue",
            }, timestamp));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                className: "spacecraftLabel",
            }, "Heading"));
            cells.push(React.DOM.td(
            {
                className: "spacecraftValue",
            }, heading));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {
                className: "spacecraftLabel",
            }, "Position"), React.DOM.td(
            {
                className: "spacecraftValue",
            }, Math.round(state.position().magnitude()) + " km " + state.position().toHeadingString())));

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {
                className: "spacecraftLabel",
            }, "Velocity"), React.DOM.td(
            {
                className: "spacecraftValue",
            }, Math.vizziniRound(state.velocity().magnitude(), 2) + " km/s " + state.velocity().toHeadingString())));

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {
                className: "spacecraftLabel",
            }, "Angular Velocity"), React.DOM.td(
            {
                className: "spacecraftValue",
            }, state.angularVelocity().toHeadingString())));

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {
                className: "spacecraftLabel",
            }, "Power Level"), React.DOM.td(
            {
                className: "spacecraftValue",
            }, this.state.powerLevel + "/" + ship.device("FusionReactor").producePerTick())));

            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {
                className: "spacecraftLabel",
            }, "Fuel Level"), React.DOM.td(
            {
                className: "spacecraftValue",
            }, this.state.fuelLevel + "/" + ship.device("FuelTank").capacity().toExponential())));

            var maneuverPanel = React.createElement(ManeuverPanel,
            {
                ship: ship,
                state: state,
                callback: ship.maneuverChanged,
            });
            rows.push(React.DOM.tr(
            {
                key: rows.length,
                className: "maneuverContainer",
            }, React.DOM.td(
            {
                className: "maneuverContainer",
                colSpan: "3"
            }, maneuverPanel)));

            return React.DOM.table(
            {
                className: "spacecraftPanel",
            }, rows);
        },

        targetBodyChanged: function(newBodyKey)
        {
            LOGGER.trace("targetBodyChanged() newBodyKey = " + newBodyKey);

            this.setState(
            {
                targetBodyKey: newBodyKey,
            });
        },

        updateFuelLevel: function(newFuelLevel)
        {
            this.setState(
            {
                fuelLevel: newFuelLevel,
            });
        },

        updatePowerLevel: function(newPowerLevel)
        {
            this.setState(
            {
                powerLevel: newPowerLevel,
            });
        },
    });

    var ManeuverPanel = React.createClass(
    {
        render: function()
        {
            InputValidator.validateNotNull("ship", this.props.ship);
            InputValidator.validateNotNull("state", this.props.state);
            InputValidator.validateNotNull("callback", this.props.callback);

            var portYaw = React.createElement(ToggleButton,
            {
                name: "portYaw",
                text: "\u21E6",
                callback: this.props.callback,
            });
            var starboardYaw = React.createElement(ToggleButton,
            {
                name: "starboardYaw",
                text: "\u21E8",
                callback: this.props.callback,
            });
            var dorsalPitch = React.createElement(ToggleButton,
            {
                name: "dorsalPitch",
                text: "\u21E7",
                callback: this.props.callback,
            });
            var ventralPitch = React.createElement(ToggleButton,
            {
                name: "ventralPitch",
                text: "\u21E9",
                callback: this.props.callback,
            });
            var ventralRoll = React.createElement(ToggleButton,
            {
                name: "ventralRoll",
                text: "\u21E6",
                callback: this.props.callback,
            });
            var dorsalRoll = React.createElement(ToggleButton,
            {
                name: "dorsalRoll",
                text: "\u21E8",
                callback: this.props.callback,
            });
            var forwardThrust = React.createElement(ToggleButton,
            {
                name: "forwardThrust",
                text: "\u21E7",
                callback: this.props.callback,
            });

            var rows = [];

            var cells = [];
            cells.push(React.DOM.td({}, ""));
            cells.push(React.DOM.td({}, dorsalPitch));
            cells.push(React.DOM.td({}, ""));
            cells.push(React.DOM.td(
            {
                rowSpan: "2",
            }, forwardThrust));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                rowSpan: "2",
            }, portYaw));
            cells.push(React.DOM.td({}, "Yaw"));
            cells.push(React.DOM.td(
            {
                rowSpan: "2",
            }, starboardYaw));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td({}, "Pitch"));
            cells.push(React.DOM.td({}, "Thrust"));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td({}, ""));
            cells.push(React.DOM.td({}, ventralPitch));
            cells.push(React.DOM.td({}, ""));
            cells.push(React.DOM.td({}, ""));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td({}, ventralRoll));
            cells.push(React.DOM.td({}, "Roll"));
            cells.push(React.DOM.td({}, dorsalRoll));
            cells.push(React.DOM.td({}, ""));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            cells = [];
            cells.push(React.DOM.td(
            {
                colSpan: "3",
            }, React.DOM.button(
            {
                onClick: this.props.state.zeroRotation,
            }, "Zero Rotation")));
            cells.push(React.DOM.td({}, ""));
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, cells));

            return React.DOM.table(
            {
                className: "manueverPanel",
            }, rows);
        },
    });

    var ToggleButton = React.createClass(
    {
        getInitialState: function()
        {
            return (
            {
                isOn: false,
            });
        },

        render: function()
        {
            InputValidator.validateNotNull("name", this.props.name);
            InputValidator.validateNotNull("text", this.props.text);
            InputValidator.validateNotNull("callback", this.props.callback);

            var isOn = this.state.isOn;
            var background = "toggle " + (isOn ? "toggleIsOn" : "toggleIsOff");

            return React.DOM.span(
            {
                className: background,
                onClick: this.toggleButton,
            }, this.props.text);
        },

        toggleButton: function(event)
        {
            var isOn = !this.state.isOn;
            LOGGER.info("ToggleButton.toggleButton() " + this.props.name + " isOn ? " + isOn);

            this.setState(
            {
                isOn: isOn,
            }, this.props.callback(this.props.name, isOn));
        },
    });

    return SpacecraftStatus;
});
