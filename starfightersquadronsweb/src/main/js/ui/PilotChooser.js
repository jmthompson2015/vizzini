define([ "Pilot", "Ship", "ShipTeam", "SimpleAgent", "Team", "Token", "ui/PilotCardUI" ], function(Pilot, Ship,
        ShipTeam, SimpleAgent, Team, Token, PilotCardUI)
{
    "use strict";
    var PilotChooser = React.createClass(
    {
        getInitialState: function()
        {
            LOGGER.trace("PilotChooser.getInitialState()");

            // Default to first ship, first pilot.
            var teamKey = this.props.team;
            var shipTeamKey = ShipTeam.valuesByTeam(teamKey)[0];
            var shipKey = ShipTeam.properties[shipTeamKey].shipKey;
            var pilotKey = Pilot.valuesByShipTeam(shipTeamKey)[0];
            var token = this.createToken(pilotKey);

            return (
            {
                ship: shipKey,
                pilot: pilotKey,
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

            var oldTeamKey = this.props.team;
            var newTeamKey = nextProps.team;

            if (oldTeamKey != newTeamKey)
            {
                // Team changed.
                LOGGER.debug("oldTeamKey = " + oldTeamKey);
                LOGGER.debug("newTeamKey = " + newTeamKey);
                var shipTeamKey = ShipTeam.valuesByTeam(newTeamKey)[0];
                var shipKey = ShipTeam.properties[shipTeamKey].shipKey;
                var pilotKey = Pilot.valuesByShipTeam(shipTeamKey)[0];
                var token = this.createToken(pilotKey);
                LOGGER.debug("new state = " + shipKey + ", " + pilotKey + ", " + token);
                this.setState(
                {
                    ship: shipKey,
                    pilot: pilotKey,
                    token: token
                });
            }
        },

        render: function()
        {
            LOGGER.trace("PilotChooser.render()");

            InputValidator.validateNotNull("team property", this.props.team);
            InputValidator.validateNotNull("onChangeFunction property", this.props.onChangeFunction);

            var shipSelect = this.createShipSelect();
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

        shipChanged: function(event)
        {
            var shipKey = event.currentTarget.value;
            var shipTeamValues = ShipTeam.valuesByShipAndTeam(shipKey, this.props.team);
            var pilotKey = Pilot.valuesByShipTeam(shipTeamValues[0])[0];
            var token = this.createToken(pilotKey);
            LOGGER.debug("new shipKey = " + shipKey);
            this.setState(
            {
                ship: shipKey,
                pilot: pilotKey,
                token: token
            });

            this.props.onChangeFunction(event, pilotKey);
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
            var values = Pilot.valuesByShipAndTeam(this.state.ship, this.props.team);
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

        createShipSelect: function()
        {
            var values = ShipTeam.shipValuesByTeam(this.props.team);
            var labelFunction = function(value)
            {
                return Ship.properties[value].name;
            };

            return React.createElement(Select,
            {
                values: values,
                labelFunction: labelFunction,
                initialSelectedValue: this.state.ship,
                onChange: this.shipChanged,
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
