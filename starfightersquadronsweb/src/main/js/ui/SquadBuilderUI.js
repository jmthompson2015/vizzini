/*
 * Provides a user interface to build a squad.
 * 
 * @param initialTeam Initial team.
 */
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

    render: function()
    {
        LOGGER.trace("SquadBuilderUI.render()");

        var team = this.props.team;
        var rows = [];

        var pilotChooser = React.createElement(PilotChooser,
        {
            team: team,
            onChangeFunction: this.pilotChanged
        });
        var cell0 = React.DOM.td(
        {
            key: 0,
            className: "pilotChooserCell",
        }, pilotChooser);
        var upgradesUI = this.createUpgradesUI();
        var cell1 = React.DOM.td(
        {
            key: 1,
            className: "upgradesUICell",
        }, upgradesUI);
        rows.push(React.DOM.tr(
        {
            key: 0,
        }, cell0, cell1));

        var addButton = React.DOM.input(
        {
            type: "button",
            value: "Add",
            onClick: this.addActionPerformed
        });
        var cell2 = React.DOM.td(
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
            removeFunction: this.removeActionPerformed
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
        }, React.DOM.tbody({}, rows));
    },

    addActionPerformed: function(event)
    {
        LOGGER.trace("add clicked");
        var token = this.createToken(this.props.team, this.state.pilot);

        // Add upgrade cards.
        var myUpgrades = this.state.upgrades;
        var tokenUpgrades = token.getUpgrades();

        myUpgrades.forEach(function(upgrade)
        {
            if (upgrade)
            {
                tokenUpgrades.push(upgrade);
            }
        });

        var squad = this.state.squad;
        squad.push(token);
        this.setState(
        {
            squad: squad
        });
    },

    createToken: function(team, pilot)
    {
        InputValidator.validateNotNull("team", team);
        InputValidator.validateNotNull("pilot", pilot);

        var agentName = Team.properties[team].name + " Agent";
        var squadBuilder = (team === Team.IMPERIAL) ? CoreSetImperialSquadBuilder : CoreSetRebelSquadBuilder;
        var agent = new SimpleAgent(agentName, team, squadBuilder);

        return new Token(pilot, agent);
    },

    createUpgradesUI: function()
    {
        var pilot = this.state.pilot;
        var upgradeTypes = Pilot.properties[pilot].upgradeTypes.slice();

        if (UpgradeCard.valuesByPilotAndType(pilot, UpgradeType.TITLE).length > 0)
        {
            upgradeTypes.unshift(UpgradeType.TITLE);
        }

        if (UpgradeCard.valuesByPilotAndType(pilot, UpgradeType.MODIFICATION).length > 0)
        {
            upgradeTypes.push(UpgradeType.MODIFICATION);
        }

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
        }, React.DOM.tbody({}, rows));
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
            upgrades: []
        });
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
        }
    },

    upgradeChanged: function(event)
    {
        var upgradeCard = event.currentTarget.value;
        LOGGER.debug("new upgradeCard = " + upgradeCard);
        var index = event.currentTarget.dataset.index;
        var upgrades = this.state.upgrades;

        upgrades[index] = (upgradeCard == "*none*") ? undefined : upgradeCard;
        this.setState(
        {
            upgrades: upgrades
        });
    },
});
