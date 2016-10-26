define(["Pilot", "ShipTeam", "process/SimpleAgent", "Team", "process/TokenFactory", "UpgradeCard", "process/Action", "process/ui/PilotChooser", "process/ui/SquadUI", "process/ui/UpgradeChooser"],
    function(Pilot, ShipTeam, SimpleAgent, Team, TokenFactory, UpgradeCard, Action, PilotChooser, SquadUI, UpgradeChooser)
    {
        "use strict";
        var SquadBuilderUI = React.createClass(
        {
            getInitialState: function()
            {
                LOGGER.trace("SquadBuilderUI.getInitialState()");

                var team = this.props.team;

                // Default to first ship, first pilot.
                var shipTeam = ShipTeam.valuesByTeam(team)[0];
                var pilot = Pilot.valuesByShipTeam(shipTeam)[0];
                var token = this.createToken(team, pilot);

                return (
                {
                    pilot: pilot,
                    token: token,
                    upgrades: [],
                    squad: []
                });
            },

            componentWillReceiveProps: function(nextProps)
            {
                LOGGER.trace("SquadBuilderUI.componentWillReceiveProps()");

                var oldTeam = this.props.team;
                var newTeam = nextProps.team;

                if (oldTeam != newTeam)
                {
                    // Team changed.
                    LOGGER.debug("oldTeam = " + oldTeam);
                    LOGGER.debug("newTeam = " + newTeam);
                    var shipTeam = ShipTeam.valuesByTeam(newTeam)[0];
                    var pilot = Pilot.valuesByShipTeam(shipTeam)[0];
                    var token = this.createToken(newTeam, pilot);
                    LOGGER.debug("new state = " + pilot + ", " + token);
                    this.setState(
                    {
                        pilot: pilot,
                        token: token,
                        upgrades: [],
                        squad: []
                    });
                }
            },

            pilotChanged: function(event, pilot)
            {
                LOGGER.debug("new pilot = " + pilot);
                var team = this.props.team;
                var token = this.createToken(team, pilot);

                this.setState(
                {
                    pilot: pilot,
                    token: token,
                    upgrades: [],
                });
            },

            render: function()
            {
                LOGGER.trace("SquadBuilderUI.render()");

                var team = this.props.team;
                var rows = [];

                var pilotChooser = React.createElement(PilotChooser,
                {
                    team: team,
                    onChangeFunction: this.pilotChanged,
                });
                var cell0 = React.DOM.td(
                {
                    key: 0,
                    className: "pilotChooserCell",
                }, pilotChooser);
                var token = this.state.token;
                var cell1, cell2;
                if (token.tokenFore && token.tokenAft)
                {
                    var upgradesUI1 = this.createUpgradesUI(token.tokenFore());
                    cell1 = React.DOM.td(
                    {
                        key: 1,
                        className: "upgradesUICell",
                    }, upgradesUI1);
                    var upgradesUI2 = this.createUpgradesUI(token.tokenAft());
                    cell2 = React.DOM.td(
                    {
                        key: 2,
                        className: "upgradesUICell",
                    }, upgradesUI2);
                    rows.push(React.DOM.tr(
                    {
                        key: rows.length,
                    }, cell0, cell1, cell2));

                }
                else
                {
                    var upgradesUI = this.createUpgradesUI(token);
                    cell1 = React.DOM.td(
                    {
                        key: 1,
                        className: "upgradesUICell",
                    }, upgradesUI);
                    rows.push(React.DOM.tr(
                    {
                        key: 0,
                    }, cell0, cell1));
                }

                var addButton = React.DOM.input(
                {
                    type: "button",
                    value: "Add",
                    onClick: this.addActionPerformed
                });
                cell2 = React.DOM.td(
                {
                    className: "squadBuilderAdd",
                    colSpan: 2,
                }, addButton);
                rows.push(React.DOM.tr(
                {
                    key: 2,
                }, cell2));

                var squadPanel = React.createElement(SquadUI,
                {
                    squad: this.state.squad,
                    removeFunction: this.removeActionPerformed,
                    isEditable: true,
                });
                var cell3 = React.DOM.td(
                {
                    id: "squadPanel",
                    colSpan: 2,
                }, squadPanel);
                rows.push(React.DOM.tr(
                {
                    key: 3,
                }, cell3));

                return React.DOM.table(
                {
                    className: "squadBuilderUI"
                }, React.DOM.tbody(
                {}, rows));
            },

            addActionPerformed: function(event)
            {
                LOGGER.trace("add clicked");
                var token = this.createToken(this.props.team, this.state.pilot);

                // Add upgrade cards.
                var myUpgrades = this.state.upgrades;
                var tokenUpgrades = token.upgradeKeys();

                myUpgrades.forEach(function(upgrade)
                {
                    if (upgrade)
                    {
                        this.context.store.dispatch(Action.addTokenUpgrade(token, upgrade));
                    }
                }, this);

                var squad = this.state.squad;
                squad.push(token);
                this.setState(
                {
                    squad: squad
                });

                if (this.props.onChange)
                {
                    this.props.onChange(squad);
                }
            },

            createToken: function(teamKey, pilotKey)
            {
                InputValidator.validateNotNull("teamKey", teamKey);
                InputValidator.validateNotNull("pilotKey", pilotKey);

                var agentName = Team.properties[teamKey].name + " Agent";
                var agent = new SimpleAgent(agentName, teamKey);

                return TokenFactory.create(this.context.store, pilotKey, agent);
            },

            createUpgradesUI: function(token)
            {
                var pilot = this.state.pilot;
                var upgradeTypes = token.upgradeTypeKeys();

                var rows = [];

                var self = this;
                upgradeTypes.forEach(function(upgradeType, i)
                {
                    var element = React.createElement(UpgradeChooser,
                    {
                        pilot: pilot,
                        upgradeType: upgradeType,
                        index: i,
                        onChangeFunction: self.upgradeChanged
                    });
                    rows.push(React.DOM.tr(
                    {
                        key: pilot + upgradeType + rows.length
                    }, React.DOM.td(
                    {
                        className: "squadBuilderUpgradeCell"
                    }, element)));
                });

                return React.DOM.table(
                {
                    className: "squadBuilderUpgradesUI"
                }, React.DOM.tbody(
                {}, rows));
            },

            removeActionPerformed: function(selected, event)
            {
                var squad = this.state.squad;
                var index = squad.indexOf(selected);

                if (index >= 0)
                {
                    squad.splice(index, 1);

                    this.setState(
                    {
                        squad: squad
                    });

                    if (this.props.onChange)
                    {
                        this.props.onChange(squad);
                    }
                }
            },

            upgradeChanged: function(event)
            {
                var upgradeCard = event.currentTarget.value;
                LOGGER.debug("SquadBuilderUI.upgradeChanged() new upgradeCard = " + upgradeCard);
                var index = event.currentTarget.dataset.index;
                var upgrades = this.state.upgrades;

                upgrades[index] = (upgradeCard == "*none*") ? undefined : upgradeCard;
                LOGGER.debug("upgrades.length = " + upgrades.length);

                var token = this.createToken(this.props.team, this.state.pilot);

                // Add upgrade cards.
                var tokenUpgrades = token.upgradeKeys();

                upgrades.forEach(function(upgrade, i)
                {
                    if (upgrade)
                    {
                        var tokenUpgradeTypes = token.upgradeTypeKeys();
                        var tokenUpgradeCount = tokenUpgradeTypes.length;
                        LOGGER.debug(i + " tokenUpgradeCount = " + tokenUpgradeCount);
                        var upgradeType = UpgradeCard.properties[upgrade].type;

                        if (i < tokenUpgradeCount && upgradeType === tokenUpgradeTypes[i])
                        {
                            tokenUpgrades.push(upgrade);
                        }
                        else
                        {
                            upgrades[i] = undefined;
                        }
                    }
                });

                var tokenUpgradeCount = token.upgradeTypeKeys().length;
                LOGGER.debug("tokenUpgradeCount = " + tokenUpgradeCount);

                this.setState(
                {
                    token: token,
                    upgrades: upgrades,
                });
            },
        });

        SquadBuilderUI.contextTypes = {
            store: React.PropTypes.object.isRequired
        };

        SquadBuilderUI.propTypes = {
            team: React.PropTypes.string.isRequired
        };

        return SquadBuilderUI;
    });
