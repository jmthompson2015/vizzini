define([ "Pilot", "ShipTeam", "SimpleAgent", "Team", "Token", "ui/PilotCardUI" ], function(Pilot, ShipTeam,
        SimpleAgent, Team, Token, PilotCardUI)
{
    "use strict";
    var PilotChooser = React.createClass(
    {
        getInitialState: function()
        {
            LOGGER.trace("PilotChooser.getInitialState()");

            // Default to first ship, first pilot.
            var team = this.props.team;
            var shipTeam = ShipTeam.valuesByTeam(team)[0];
            var pilot = Pilot.valuesByShipTeam(shipTeam)[0];
            var token = this.createToken(pilot);

            return (
            {
                shipTeam: shipTeam,
                pilot: pilot,
                token: token
            });
        },

        componentDidMount: function()
        {
            LOGGER.trace("PilotChooser.componentDidMount()");

            this.renderPilotCardUI();
        },

        componentWillReceiveProps: function(nextProps)
        {
            LOGGER.trace("PilotChooser.componentWillReceiveProps()");

            var oldTeam = this.props.team;
            var newTeam = nextProps.team;

            if (oldTeam != newTeam)
            {
                // Team changed.
                LOGGER.debug("oldTeam = " + oldTeam);
                LOGGER.debug("newTeam = " + newTeam);
                var shipTeam = ShipTeam.valuesByTeam(newTeam)[0];
                var pilot = Pilot.valuesByShipTeam(shipTeam)[0];
                var token = this.createToken(pilot);
                LOGGER.debug("new state = " + shipTeam + ", " + pilot + ", " + token);
                this.setState(
                {
                    shipTeam: shipTeam,
                    pilot: pilot,
                    token: token
                });
            }
        },

        render: function()
        {
            LOGGER.trace("PilotChooser.render()");

            InputValidator.validateNotNull("team property", this.props.team);
            InputValidator.validateNotNull("onChangeFunction property", this.props.onChangeFunction);

            var shipSelect = this.createShipTeamSelect();
            var pilotSelect = this.createPilotSelect();

            var innerCells0 = [];
            innerCells0.push(React.DOM.td(
            {
                key: 0,
                className: "pilotChooserLabel"
            }, "Ship: "));
            innerCells0.push(React.DOM.td(
            {
                key: 1,
                className: "pilotChooserValue"
            }, shipSelect));

            var innerCells1 = [];
            innerCells1.push(React.DOM.td(
            {
                key: 0,
                className: "pilotChooserLabel"
            }, "Pilot: "));
            innerCells1.push(React.DOM.td(
            {
                key: 1,
                className: "pilotChooserValue"
            }, pilotSelect));

            var innerRows = [];
            innerRows.push(React.DOM.tr(
            {
                key: 0
            }, innerCells0));
            innerRows.push(React.DOM.tr(
            {
                key: 1
            }, innerCells1));

            var innerTable = React.DOM.table(
            {
                className: "pilotChooserFilter"
            }, innerRows);
            var cell0 = React.DOM.td(
            {
                key: 0
            }, innerTable);
            var cell1 = React.DOM.td(
            {
                key: 1,
                id: "pilotCardPanel",
                colSpan: 2
            }, "");

            var rows = [];
            rows.push(React.DOM.tr(
            {
                key: 0
            }, cell0));
            rows.push(React.DOM.tr(
            {
                key: 1
            }, cell1));

            return React.DOM.table(
            {
                className: "pilotChooser"
            }, rows);
        },

        componentDidUpdate: function()
        {
            LOGGER.trace("PilotChooser.componentDidUpdate()");

            this.renderPilotCardUI();
        },

        pilotCardUI: undefined,

        shipTeamChanged: function(event)
        {
            var shipTeam = event.currentTarget.value;
            var pilot = Pilot.valuesByShipTeam(shipTeam)[0];
            var token = this.createToken(pilot);
            LOGGER.debug("new shipTeam = " + shipTeam);
            this.setState(
            {
                shipTeam: shipTeam,
                pilot: pilot,
                token: token
            });

            this.props.onChangeFunction(event, pilot);
        },

        pilotChanged: function(event)
        {
            var pilot = event.currentTarget.value;
            var token = this.createToken(pilot);
            LOGGER.debug("new pilot = " + pilot);
            this.setState(
            {
                pilot: pilot,
                token: token
            });

            this.props.onChangeFunction(event, pilot);
        },

        renderPilotCardUI: function()
        {
            var token = this.state.token;

            if (this.pilotCardUI === undefined)
            {
                var element = React.createElement(PilotCardUI,
                {
                    isCompact: false,
                    initialToken: token
                });
                this.pilotCardUI = React.render(element, document.getElementById("pilotCardPanel"));
            }
            else
            {
                this.pilotCardUI.setState(
                {
                    token: token
                });
            }
        },

        createPilotSelect: function()
        {
            var values = Pilot.valuesByShipTeam(this.state.shipTeam);
            var labelFunction = function(value)
            {
                var properties = Pilot.properties[value];
                return properties.name + " [" + properties.squadPointCost + "]";
            };

            return React.createElement(Select,
            {
                values: values,
                labelFunction: labelFunction,
                initialSelectedValue: this.state.pilot,
                onChange: this.pilotChanged,
            });
        },

        createShipTeamSelect: function()
        {
            var values = ShipTeam.valuesByTeam(this.props.team);
            var labelFunction = function(value)
            {
                return ShipTeam.properties[value].name;
            };

            return React.createElement(Select,
            {
                values: values,
                labelFunction: labelFunction,
                initialSelectedValue: this.state.shipTeam,
                onChange: this.shipTeamChanged,
            });
        },

        createToken: function(pilot)
        {
            var team = this.props.team;
            var agentName = Team.properties[team].name + " Agent";
            var agent = new SimpleAgent(agentName, team);

            return new Token(pilot, agent);
        },
    });

    return PilotChooser;
});
