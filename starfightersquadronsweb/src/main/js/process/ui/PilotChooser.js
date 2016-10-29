define(["Pilot", "Ship", "ShipTeam", "process/SimpleAgent", "process/TokenFactory", "process/ui/PilotCardUI"],
    function(Pilot, Ship, ShipTeam, SimpleAgent, TokenFactory, PilotCardUI)
    {
        "use strict";
        var PilotChooser = React.createClass(
        {
            contextTypes:
            {
                store: React.PropTypes.object.isRequired,
            },

            propTypes:
            {
                imageBase: React.PropTypes.string.isRequired,
                onChange: React.PropTypes.func.isRequired,
                team: React.PropTypes.object.isRequired,
            },

            getInitialState: function()
            {
                LOGGER.trace("PilotChooser.getInitialState()");

                // Default to first ship, first pilot.
                var team = this.props.team;
                var shipTeamKey = ShipTeam.valuesByTeam(team.value)[0];
                var shipKey = ShipTeam.properties[shipTeamKey].shipKey;
                var pilotKey = Pilot.valuesByShipTeam(shipTeamKey)[0];
                var token = this.createToken(pilotKey);

                return (
                {
                    shipKey: shipKey,
                    pilotKey: pilotKey,
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

                var oldTeamKey = this.props.team.value;
                var newTeamKey = nextProps.team.value;

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
                        shipKey: shipKey,
                        pilotKey: pilotKey,
                        token: token
                    });
                }
            },

            render: function()
            {
                LOGGER.trace("PilotChooser.render()");

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
                }, React.DOM.tbody(
                {}, innerRows));
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
                }, React.DOM.tbody(
                {}, rows));
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
                var shipTeamValues = ShipTeam.valuesByShipAndTeam(shipKey, this.props.team.value);
                var pilotKey = Pilot.valuesByShipTeam(shipTeamValues[0])[0];
                var token = this.createToken(pilotKey);
                LOGGER.debug("new shipKey = " + shipKey);
                this.setState(
                {
                    shipKey: shipKey,
                    pilotKey: pilotKey,
                    token: token
                });

                this.props.onChange(event, pilotKey);
            },

            pilotChanged: function(event)
            {
                var pilot = event.currentTarget.value;
                var token = this.createToken(pilot);
                LOGGER.debug("new pilot = " + pilot);
                this.setState(
                {
                    pilotKey: pilot,
                    token: token
                });

                this.props.onChange(event, pilot);
            },

            renderPilotCardUI: function()
            {
                var token = this.state.token;

                if (this.pilotCardUI === undefined)
                {
                    var element = React.createElement(PilotCardUI,
                    {
                        imageBase: this.props.imageBase,
                        initialToken: token,
                    });
                    this.pilotCardUI = ReactDOM.render(element, document.getElementById("pilotCardPanel"));
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
                var values = Pilot.valuesByShipAndTeam(this.state.shipKey, this.props.team.value);
                var labelFunction = function(value)
                {
                    var properties = Pilot.properties[value];
                    return properties.name + " [" + properties.squadPointCost + "]";
                };

                return React.createElement(Select,
                {
                    values: values,
                    labelFunction: labelFunction,
                    initialSelectedValue: this.state.pilotKey,
                    onChange: this.pilotChanged,
                });
            },

            createShipSelect: function()
            {
                var values = ShipTeam.shipValuesByTeam(this.props.team.value);
                var labelFunction = function(value)
                {
                    return Ship.properties[value].name;
                };

                return React.createElement(Select,
                {
                    values: values,
                    labelFunction: labelFunction,
                    initialSelectedValue: this.state.shipKey,
                    onChange: this.shipChanged,
                });
            },

            createToken: function(pilotKey)
            {
                var team = this.props.team;
                var agentName = team.name + " Agent";
                var agent = new SimpleAgent(agentName, team.value);

                return TokenFactory.create(this.context.store, pilotKey, agent);
            },
        });

        return PilotChooser;
    });
