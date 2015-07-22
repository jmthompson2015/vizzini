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

        return {pilot: pilot, token: token, upgrades: [], squad: []};
    },
    
    componentDidMount: function() 
    {  
        LOGGER.trace("SquadBuilderUI.componentDidMount()");
        
        this.renderSquadUI();
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
            this.setState({pilot: pilot, token: token, upgrades: [], squad: []});
        }
    },
    
    render: function() 
    {
        LOGGER.trace("SquadBuilderUI.render()");
        
        var team = this.props.team;
        var upgradesUI = this.createUpgradesUI();
        var addButton = <input type="button" value="Add" onClick={this.addActionPerformed} />
        
        var rows = [];
        var rowCount = 0;
        
        rows[rows.length] = <tr key={rowCount}><td><PilotChooser team={team} onChangeFunction={this.pilotChanged} /></td></tr>;
        rowCount++;
        rows[rows.length] = <tr key={rowCount}><td>{upgradesUI}</td></tr>;
        rowCount++;
        rows[rows.length] = <tr key={rowCount}><td>{addButton}</td></tr>;
        rowCount++;
        rows[rows.length] = <tr key={rowCount}><td id="squadPanel"></td></tr>;
        rowCount++;
        
        return <table className="squadBuilderUI">{rows}</table>;
    },
    
    componentDidUpdate: function()
    {
        LOGGER.trace("SquadBuilderUI.componentDidUpdate()");
        
        this.renderSquadUI();
    },

    pilotChanged: function(event, pilot)
    {
        LOGGER.debug("new pilot = " + pilot);
        var team = this.props.team;
        var token = this.createToken(team, pilot);
        this.setState({pilot: pilot, token: token, upgrades: []});
    },
    
    upgradeChanged: function(event)
    {
        var upgradeCard = event.currentTarget.value;
        LOGGER.debug("new upgradeCard = " + upgradeCard);
        var index = event.currentTarget.dataset.index;
        var upgrades = this.state.upgrades;
        
        upgrades[index] = (upgradeCard === "*none*") ? undefined : upgradeCard;
        this.setState({upgrades: upgrades});
    },
    
    addActionPerformed: function(event)
    {
        LOGGER.trace("add clicked");
        var token = this.createToken(this.props.team, this.state.pilot);
        
        // Add upgrade cards.
        var myUgrades = this.state.upgrades;
        var tokenUpgrades = token.getUpgrades();
        
        for (var i=0; i<myUgrades.length; i++)
        {
            var upgrade = myUgrades[i];
            
            if (upgrade)
            {
                tokenUpgrades[tokenUpgrades.length] = upgrade;
            }
        }
        
        var squad = this.state.squad;
        squad[squad.length] = token;
        this.setState({squad: squad});
    },

    removeActionPerformed: function(selected, event)
    {
        LOGGER.trace("remove clicked");
        var squad = this.state.squad;

        for (var i=0; i<selected.length; i++)
        {
            var token = selected[i];
            var index = squad.indexOf(token);

            if (index >= 0)
            {
                squad.splice(index, 1);
            }
        }

        this.renderSquadUI();
    },

    renderSquadUI: function()
    {
        var squad = this.state.squad;
        
        React.render(<SquadUI squad={squad} removeFunction={this.removeActionPerformed} />, 
            document.getElementById("squadPanel"));
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
        var upgradeTypes = Pilot.properties[pilot].upgradeTypes;
        var columns = [];
        
        for (var i=0; i<upgradeTypes.length; i++)
        {
            var upgradeType = upgradeTypes[i];
            columns[columns.length] = <td key={i}><UpgradeChooser pilot={pilot} upgradeType={upgradeType} index={i} onChangeFunction={this.upgradeChanged}/></td>;
        }
        
        return <table className="squadBuilderUpgradesUI">
            <tbody><tr>{columns}</tr></tbody>
            </table>;
    },
});
