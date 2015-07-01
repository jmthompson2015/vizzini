/*
 * Provides a user interface to choose an upgrade card.
 * 
 * @param pilot Pilot.
 * @param upgradeType Upgrade type.
 * @param index Index of this chooser.
 * @param onChangeFunction Called for the select onChange event.
 */
var UpgradeChooser = React.createClass(
{
    getInitialState: function()
    {
        return {selected: undefined};
    },
    
    render: function()
    {
        var pilot = this.props.pilot;
        var upgradeType = this.props.upgradeType;
        var upgrades = UpgradeCard.valuesByPilotAndType(pilot, upgradeType);
        var options = [];
        options[options.length] = <option key={0} value="*none*">*none*</option>;
        
        for (var i = 0; i < upgrades.length; i++)
        {
            var upgradeCard = upgrades[i];
            var upgradeProps = UpgradeCard.properties[upgradeCard];
            options[options.length] = <option value={upgradeCard} key={i+1}>{upgradeProps.name}</option>;
        }
        
        var rows = [];

        rows[rows.length] = <tr key={this.createId() + "0"}>
            <td>{UpgradeCardUI.createUpgradeImage(upgradeType)} <select onChange={this.upgradeCardChanged} data-index={this.props.index}>{options}</select></td>
            </tr>;
        
        rows[rows.length] = <tr key={this.createId() + "1"}>
            <td id={this.createId()}></td>
            </tr>;
        
        return <table className="upgradeChooser">
            <tbody>{rows}</tbody>
            </table>;
    },
    
    createId: function()
    {
        var pilot = this.props.pilot;
        var upgradeType = this.props.upgradeType;
        var index = this.props.index;
        
        return pilot + upgradeType + index;
    },
    
    getSelected: function()
    {
        return this.state.selected;
    },
    
    upgradeCardChanged: function(event)
    {
        var upgradeCard = event.currentTarget.value;
        var id = this.createId();
        var element = document.getElementById(id);
        
        if (upgradeCard === "*none*")
        {
            this.setState({selected: undefined});
            element.innerHTML = "";
        }
        else
        {
            this.setState({selected: upgradeCard});
            React.render(<UpgradeCardUI upgradeCard={upgradeCard} />, element);
        }
        
        this.props.onChangeFunction(event);
    },
});
