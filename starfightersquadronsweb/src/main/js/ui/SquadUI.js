/*
 * Provides a user interface for a starfighter squadron.
 * 
 * @param squad Squad.
 * @param removeFunction Called after an item is removed.
 */
var SquadUI = React.createClass(
{
    getInitialState: function()
    {
        return {selected: []};
    },
    
    render: function() 
    {
        var that = this;
        var checkAll = <input type="checkbox" onChange={this.selectAllActionPerformed} />;
        
        var rows = [];
        
        var header = <tr key={-1}>
            <th>{checkAll}</th>
            <th>Pilot</th>
            <th>Ship</th>
            <th>Pilot Skill</th>
            <th>Primary Weapon</th>
            <th>Agility</th>
            <th>Hull</th>
            <th>Shield</th>
            <th>Squad Points</th>
            </tr>;
            
        var squad = this.props.squad;
        var pilotSkillSum = 0;
        var primaryWeaponSum = 0;
        var agilitySum = 0;
        var hullSum = 0;
        var shieldSum = 0;
        var squadPointsSum = 0;

        for (var i=0; i<squad.length; i++)
        {
            var token = squad[i];
            var isChecked = this.state.selected.vizziniContains(token);
            var pilot = token.getPilot();
            var pilotProps = Pilot.properties[pilot];
            var shipState = pilotProps.shipState;

            pilotSkillSum += shipState.getPilotSkillValue();
            primaryWeaponSum += shipState.getPrimaryWeaponValue();
            agilitySum += shipState.getAgilityValue();
            hullSum += shipState.getHullValue();
            shieldSum += shipState.getShieldValue();
            squadPointsSum += pilotProps.squadPointCost;
            
            rows[rows.length] = <tr key={token.getId()}>
                <td><input type="checkbox" checked={isChecked} onChange={that.setSelected.bind(this, token)} /></td>
                <td className="squadUIPilotName">{pilotProps.name}</td>
                <td className="squadUIPilotName">{ShipTeam.properties[pilotProps.shipTeam].name}</td>
                <td>{shipState.getPilotSkillValue()}</td>
                <td>{shipState.getPrimaryWeaponValue()}</td>
                <td>{shipState.getAgilityValue()}</td>
                <td>{shipState.getHullValue()}</td>
                <td>{shipState.getShieldValue()}</td>
                <td>{pilotProps.squadPointCost}</td>
                </tr>;
                
            var upgrades = token.getUpgrades();
            
            if (upgrades.length > 0)
            {
                for (var j=0; j<upgrades.length; j++)
                {
                    var upgrade = upgrades[j];
                    var upgradeProps = UpgradeCard.properties[upgrade];
                    
                    squadPointsSum += upgradeProps.squadPointCost;

                    rows[rows.length] = <tr key={(100 * token.getId()) + j}>
                        <td>&nbsp;</td>
                        <td className="squadUIPilotName">
                            {UpgradeCardUI.createUpgradeImage(upgradeProps.type)} {upgradeProps.name}</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>{upgradeProps.squadPointCost}</td>
                        </tr>;
                }
            }
        }
        
        rows[rows.length] = <tr key={2000}>
            <td className="squadUISum">&nbsp;</td>
            <td className="squadUISum">Totals</td>
            <td className="squadUISum">&nbsp;</td>
            <td className="squadUISum">{pilotSkillSum}</td>
            <td className="squadUISum">{primaryWeaponSum}</td>
            <td className="squadUISum">{agilitySum}</td>
            <td className="squadUISum">{hullSum}</td>
            <td className="squadUISum">{shieldSum}</td>
            <td className="squadUISum">{squadPointsSum}</td>
            </tr>;
            
        var removeButton = <input type="button" value="Remove" onClick={this.removeFunction.bind(this, this.state.selected)} />;

        return <table>
            <tbody>
            <tr>
            <td>
                <table className="squadUI"><thead>{header}</thead><tbody>{rows}</tbody></table>
            </td>
            </tr>
            <tr>
                <td className="squadUIRemove">{removeButton}</td>
            </tr>
            </tbody>
            </table>;
    },

    selectAllActionPerformed: function(event)
    {
        var selected = [];
        var squad = this.props.squad;
        
        if (event.target.checked)
        {
            selected = squad.slice();
        }
        
        this.setState({selected: selected});
    },
    
    setSelected: function(token, event)
    {
        var selected = this.state.selected;

        if (event.target.checked)
        {
            if (!selected.vizziniContains(token))
            {
                selected[selected.length] = token;
            }
        }
        else
        {
            var index = selected.indexOf(token);
            selected.splice(index, 1);
        }
        
        this.setState({selected: selected});
    },
    
    removeFunction: function(selected, event)
    {
        this.props.removeFunction(selected, event);
        this.setState({selected: []});
    },
});
