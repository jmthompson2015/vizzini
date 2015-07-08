/*
 * Provides a user interface to choose a pilot.
 * 
 * @param team Team.
 * @param onChangeFunction Called for the select onChange event.
 */
var PilotChooser = React.createClass(
{
    getInitialState: function()
    {
        // Default to Imperial, first ship, first pilot.
        var team = this.props.team;
        var shipTeam = ShipTeam.valuesByTeam(team)[0];
        var pilot = Pilot.valuesByShipTeam(shipTeam)[0];
        var token = this.createToken(pilot);

        return {shipTeam: shipTeam, pilot: pilot, token: token};
    },
    
    componentDidMount: function() 
    {  
        this.renderPilotCardUI();
    },
    
    render: function()
    {
        InputValidator.validateNotNull("team property", this.props.team);
        InputValidator.validateNotNull("onChangeFunction property", this.props.onChangeFunction);
        
        var shipSelect = this.createShipTeamSelect();
        var pilotSelect = this.createPilotSelect();
        var token = this.state.token;
        
        var rows = [];

        rows[rows.length] = <tr key={0}>
            <td>
            <table className="pilotChooserFilter">
            <tbody>
                <tr>
                <td className="pilotChooserLabel">Ship: </td>
                <td className="pilotChooserValue">{shipSelect}</td>
                </tr>
                <tr>
                <td className="pilotChooserLabel">Pilot: </td>
                <td className="pilotChooserValue">{pilotSelect}</td>
                </tr>
            </tbody>
            </table>
            </td>
            </tr>;

        rows[rows.length] = <tr key={1}>
            <td id="pilotCardPanel" colSpan="2"></td>
            </tr>;
        
        return <table className="pilotChooser">
            <tbody>{rows}</tbody>
            </table>;
    },
    
    componentDidUpdate: function()
    {
        this.renderPilotCardUI();
    },
    
    pilotCardUI: undefined,
    
    shipTeamChanged: function(event)
    {
        var shipTeam = event.currentTarget.value;
        var pilot = Pilot.valuesByShipTeam(shipTeam)[0];
        var token = this.createToken(pilot);
        LOGGER.debug("new shipTeam = " + shipTeam);
        this.setState({shipTeam: shipTeam, pilot: pilot, token: token});
        
        this.props.onChangeFunction(event, pilot);
    },
    
    pilotChanged: function(event)
    {
        var pilot = event.currentTarget.value;
        var token = this.createToken(pilot);
        LOGGER.debug("new pilot = " + pilot);
        this.setState({pilot: pilot, token: token});
        
        this.props.onChangeFunction(event, pilot);
    },
    
    renderPilotCardUI: function(token)
    {
        var token = this.state.token;
        
        if (this.pilotCardUI === undefined)
        {
            this.pilotCardUI = React.render(<PilotCardUI isCompact={false} initialToken={token} />,
                    document.getElementById("pilotCardPanel"));
        }
        else
        {
            this.pilotCardUI.setState({token: token});
        }
    },
    
    createPilotSelect: function()
    {
        var values = Pilot.valuesByShipTeam(this.state.shipTeam);
        return this.createSelect(values, Pilot.properties, this.state.pilot, this.pilotChanged);
    },
    
    createShipTeamSelect: function()
    {
        var values = ShipTeam.valuesByTeam(this.props.team);
        return this.createSelect(values, ShipTeam.properties, this.state.shipTeam, this.shipTeamChanged);
    },
    
    createSelect: function(values, properties, selectedValue, onChangeFunction)
    {
        var options = [];

        for(var i=0; i<values.length; i++)
        {
            var value = values[i];
            var label = properties[value].name;
            options[i] = <option key={i} value={value}>{label}</option>
        }
        
        return <select value={selectedValue} onChange={onChangeFunction}>{options}</select>
    },
    
    createToken: function(pilot)
    {
        var team = this.props.team;
        var agentName = (team === Team.IMPERIAL) ? "Imperial Agent" : "Rebel Agent";
        var squadBuilder = (team === Team.IMPERIAL) ? CoreSetImperialSquadBuilder : CoreSetRebelSquadBuilder;
        var agent = new SimpleAgent(agentName, team, squadBuilder);
        
        return new Token(pilot, agent);
    },
});
