define(["Pilot", "ShipTeam", "UpgradeCard", "UpgradeType", "process/Action", "process/SimpleAgent", "process/TokenFactory", "process/ui/PilotChooser", "process/ui/SquadUI", "process/ui/UpgradeChooser"],
    function(Pilot, ShipTeam, UpgradeCard, UpgradeType, Action, SimpleAgent, TokenFactory, PilotChooser, SquadUI, UpgradeChooser)
    {
        "use strict";
        var SquadBuilderUI = React.createClass(
        {
            contextTypes:
            {
                store: React.PropTypes.object.isRequired
            },

            propTypes:
            {
                iconBase: React.PropTypes.string.isRequired,
                imageBase: React.PropTypes.string.isRequired,
                team: React.PropTypes.object.isRequired,

                onChange: React.PropTypes.func,
            },

            getInitialState: function()
            {
                LOGGER.trace("SquadBuilderUI.getInitialState()");

                var team = this.props.team;

                // Default to first ship, first pilot.
                var shipTeamKey = ShipTeam.valuesByTeam(team.value)[0];
                var pilotKey = Pilot.valuesByShipTeam(shipTeamKey)[0];
                var token = this.createToken(team, pilotKey);

                return (
                {
                    pilotKey: pilotKey,
                    token: token,
                    upgrades: [],
                    squad: []
                });
            },

            componentWillReceiveProps: function(nextProps)
            {
                LOGGER.trace("SquadBuilderUI.componentWillReceiveProps()");

                var oldTeamKey = this.props.team.value;
                var newTeamKey = nextProps.team.value;

                if (oldTeam != newTeam)
                {
                    // Team changed.
                    LOGGER.debug("oldTeamKey = " + oldTeamKey);
                    LOGGER.debug("newTeamKey = " + newTeamKey);
                    var shipTeamKey = ShipTeam.valuesByTeam(newTeamKey)[0];
                    var pilotKey = Pilot.valuesByShipTeam(shipTeamKey)[0];
                    var token = this.createToken(newTeamKey, pilotKey);
                    LOGGER.debug("new state = " + pilotKey + ", " + token);
                    this.setState(
                    {
                        pilotKey: pilotKey,
                        token: token,
                        upgrades: [],
                        squad: []
                    });
                }
            },

            pilotChanged: function(event, pilotKey)
            {
                LOGGER.debug("new pilotKey = " + pilotKey);
                var team = this.props.team;
                var token = this.createToken(team, pilotKey);

                this.setState(
                {
                    pilotKey: pilotKey,
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
                    imageBase: this.props.imageBase,
                    team: team,
                    onChange: this.pilotChanged,
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
                    iconBase: this.props.iconBase,
                    imageBase: this.props.imageBase,
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
                var token = this.createToken(this.props.team, this.state.pilotKey);

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

            createToken: function(team, pilotKey)
            {
                InputValidator.validateNotNull("team", team);
                InputValidator.validateNotNull("pilotKey", pilotKey);

                var agentName = team.name + " Agent";
                var agent = new SimpleAgent(agentName, team.value);

                return TokenFactory.create(this.context.store, pilotKey, agent);
            },

            createUpgradesUI: function(token)
            {
                var pilotKey = this.state.pilotKey;
                var upgradeTypeKeys = token.upgradeTypeKeys();

                var rows = [];

                var self = this;
                upgradeTypeKeys.forEach(function(upgradeTypeKey, i)
                {
                    var element = React.createElement(UpgradeChooser,
                    {
                        imageBase: this.props.imageBase,
                        pilot: Pilot.properties[pilotKey],
                        upgradeType: UpgradeType.properties[upgradeTypeKey],
                        index: i,
                        onChange: self.upgradeChanged
                    });
                    rows.push(React.DOM.tr(
                    {
                        key: pilotKey + upgradeTypeKey + rows.length
                    }, React.DOM.td(
                    {
                        className: "squadBuilderUpgradeCell"
                    }, element)));
                }, this);

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

                var token = this.createToken(this.props.team, this.state.pilotKey);

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

        return SquadBuilderUI;
    });
