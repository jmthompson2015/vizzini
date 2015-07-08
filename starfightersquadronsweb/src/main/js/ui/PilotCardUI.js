/*
 * Provides a token user interface for Starfighter Squadrons.
 * 
 * @param initialToken Initial token. (required)
 * @param isCompact Flag indicating whether to use a compact layout. (optional, default true)
 */
var PilotCardUI = React.createClass(
{
    getInitialState: function() 
    {
        return {token: this.props.initialToken};
    },
    
    componentDidMount: function() 
    {  
        this.state.token.bind("change", this.tokenChanged);
    },
    
    componentWillUnmount: function() 
    {  
        this.state.token.unbind("change", this.tokenChanged);
    },

    render: function() 
    {
        InputValidator.validateNotNull("initialToken property", this.props.initialToken);
        InputValidator.validateNotNull("isCompact property", this.props.isCompact);
        
        if (this.props.isCompact)
        {
            return this.renderCompact();
        }
        else
        {
            return this.renderLarge();
        }
    },

    renderCompact: function() 
    {
        var myToken = this.state.token;
        
        return (
        <table className="pilotCard">
        <tr>
        <td>
        <PilotCardUI.NamePanel pilotSkillValue={myToken.getPilotSkillValue()}
            pilotName={myToken.getPilotName()}
            shipName={myToken.getShipName()}
            team={myToken.getTeam()} />
        </td>
        </tr>
        <tr>
        <td>
        <PilotCardUI.StatsPanel isCompact={true}
            primaryWeaponValue={myToken.getPrimaryWeaponValue()}
            agilityValue={myToken.getAgilityValue()}
            hullValue={myToken.getHullValue()}
            shieldValue={myToken.getShieldValue()} />
        </td>
        </tr>
        <tr>
        <td>
        <PilotCardUI.TokensPanel cloakCount={myToken.getCloakCount()}
            evadeCount={myToken.getEvadeCount()}
            focusCount={myToken.getFocusCount()}
            ionCount={myToken.getIonCount()}
            shieldCount={myToken.getShieldCount()}
            stressCount={myToken.getStressCount()}
            damageCount={myToken.getDamageCount()}
            criticalDamageCount={myToken.getCriticalDamageCount()} />
        </td>
        </tr>
        </table>
        );
    },

    renderLarge: function() 
    {
        var myToken = this.state.token;
        var pilotProps = Pilot.properties[myToken.getPilot()];
        var shipProps = Ship.properties[myToken.getShip()];
        var pilotDescription = pilotProps.description;
        var pilotCost = pilotProps.squadPointCost;
        var prefix = myToken.toString();
        var shipActions = shipProps.shipActions;
        var upgradeTypes = pilotProps.upgradeTypes;
        var rows = [];
        
        rows[rows.length] = <tr key={prefix+"0"}>
            <td>
            <PilotCardUI.NamePanel pilotSkillValue={myToken.getPilotSkillValue()}
                pilotName={myToken.getPilotName()}
                shipName={myToken.getShipName()}
                team={myToken.getTeam()} />
            </td>
            </tr>;

        rows[rows.length] = <tr key={prefix+"1"}>
            <td>
                <table>
                <tr>
                    <td rowSpan="2"><PilotCardUI.StatsPanel isCompact={false}
                        primaryWeaponValue={myToken.getPrimaryWeaponValue()}
                        agilityValue={myToken.getAgilityValue()}
                        hullValue={myToken.getHullValue()}
                        shieldValue={myToken.getShieldValue()} /></td>
                    <td className="pilotCardUIDescription">{pilotDescription}</td>
                </tr>
                <tr>
                <td>
                    <PilotCardUI.ShipActionPanel shipActions={shipActions} />
                </td>
                </tr>
                </table>
            </td>
            </tr>;
 
        rows[rows.length] = <tr key={prefix+"2"}>
            <td>
                <table className="pilotCardUIUpgradeSquadCost">
                <tr>
                    <td className="pilotCardUIUpgradeCell"><PilotCardUI.UpgradePanel upgradeTypes={upgradeTypes} /></td>
                    <td className="pilotCardUISquadPointCost" title="Squad Point cost">{pilotCost}</td>
                </tr>
                </table>
            </td>
            </tr>;

        rows[rows.length] = <tr key={prefix+"3"}>
            <td className="pilotCardUITokensDamage">
                <PilotCardUI.TokensPanel cloakCount={myToken.getCloakCount()}
                    evadeCount={myToken.getEvadeCount()}
                    focusCount={myToken.getFocusCount()}
                    ionCount={myToken.getIonCount()}
                    shieldCount={myToken.getShieldCount()}
                    stressCount={myToken.getStressCount()}
                    damageCount={myToken.getDamageCount()}
                    criticalDamageCount={myToken.getCriticalDamageCount()} />
            </td>
            </tr>;
            
        return <table className="pilotCard">
            <tbody>{rows}</tbody>
            </table>;
    },
    
    tokenChanged: function() 
    {
        LOGGER.info(this.state.token.getName() + " token change event");
        this.setState({token: this.state.token});
    },
});

PilotCardUI.ImagesUrl = "http://rawgit.com/jmthompson2015/vizzini/master/starfightersquadronsweb/src/main/resources/images/"
    
PilotCardUI.WeaponIcon = PilotCardUI.ImagesUrl + "pilotCard/WeaponIcon24.jpg";
PilotCardUI.AgilityIcon = PilotCardUI.ImagesUrl + "pilotCard/AgilityIcon24.jpg";
PilotCardUI.HullIcon = PilotCardUI.ImagesUrl + "pilotCard/HullIcon24.jpg";
PilotCardUI.ShieldIcon = PilotCardUI.ImagesUrl + "pilotCard/ShieldIcon24.jpg";

PilotCardUI.CloakIcon = PilotCardUI.ImagesUrl + "token/CloakToken32.png";
PilotCardUI.EvadeIcon = PilotCardUI.ImagesUrl + "token/EvadeToken32.png";
PilotCardUI.FocusIcon = PilotCardUI.ImagesUrl + "token/FocusToken32.png";
PilotCardUI.IonIcon = PilotCardUI.ImagesUrl + "token/IonToken32.png";
PilotCardUI.ShieldTokenIcon = PilotCardUI.ImagesUrl + "token/ShieldToken32.png";
PilotCardUI.StressIcon = PilotCardUI.ImagesUrl + "token/StressToken32.png";

PilotCardUI.ImagesUrl2 = PilotCardUI.ImagesUrl + "pilotCard/"
    
PilotCardUI.DamageIcon = PilotCardUI.ImagesUrl2 + "Damage32.jpg";
PilotCardUI.CriticalDamageIcon = PilotCardUI.ImagesUrl2 + "CriticalDamage32.jpg";

PilotCardUI.createActionImage = function(shipAction)
{
    var actionName0 = ShipAction.properties[shipAction].displayName;
    var actionName = actionName0.replace(" ", "");
    var fileString = PilotCardUI.ImagesUrl2 + actionName + "24.png";
    
    return <img className="pilotCardUIImage" src={fileString} title={actionName0} />;
}

PilotCardUI.teamIcons = 
{
    "imperial": PilotCardUI.ImagesUrl + "ImperialIcon24.png",
    "rebel": PilotCardUI.ImagesUrl + "RebelIcon24.png",
    "scum": PilotCardUI.ImagesUrl + "ScumIcon24.png",
}

PilotCardUI.NamePanel = React.createClass(
{
    render: function() 
    {
        var titleString = Team.properties[this.props.team].name + " Faction";
        var fileString = PilotCardUI.teamIcons[this.props.team];

        return (
            <table className="nameTable">
            <tr>
            <td title="Pilot Skill" className="namePanel pilotSkillValue" rowSpan="2">{this.props.pilotSkillValue}</td>
            <td title="Name" className="namePanel">{this.props.pilotName}</td>
            <td className="namePanel" rowSpan="2"><img title={titleString} src={fileString}/></td>
            </tr>
            <td title="Ship" className="namePanel">{this.props.shipName}</td>
            <tr>
            </tr>
            </table>
        );
    },
});

PilotCardUI.StatsPanel = React.createClass(
{
    render: function() 
    {
        var isCompact = this.props.isCompact;
        
        if (isCompact)
        {
            return this.renderCompact();
        }
        else
        {
            return this.renderLarge();
        }
    },

    renderCompact: function() 
    {
        return (
            <table className="statsTable">
            <tr>
            <td className='primaryWeaponValue' title='Primary Weapon'><img src={PilotCardUI.WeaponIcon} /></td>
            <td className='primaryWeaponValue' title='Primary Weapon'>{this.props.primaryWeaponValue}</td>
    
            <td className='agilityValue' title='Agility'><img src={PilotCardUI.AgilityIcon} /></td>
            <td className='agilityValue' title='Agility'>{this.props.agilityValue}</td>
    
            <td className='hullValue' title='Hull'><img src={PilotCardUI.HullIcon} /></td>
            <td className='hullValue' title='Hull'>{this.props.hullValue}</td>
    
            <td className='shieldValue' title='Shield'><img src={PilotCardUI.ShieldIcon} /></td>
            <td className='shieldValue' title='Shield'>{this.props.shieldValue}</td>
            </tr>
            </table>
        );
    },
    
    renderLarge: function() 
    {
        return (
            <table className="statsTable">
            <tr>
            <td className='primaryWeaponValue' title='Primary Weapon'><img src={PilotCardUI.WeaponIcon} /></td>
            <td className='primaryWeaponValue' title='Primary Weapon'>{this.props.primaryWeaponValue}</td>
            </tr>
            <tr>
            <td className='agilityValue' title='Agility'><img src={PilotCardUI.AgilityIcon} /></td>
            <td className='agilityValue' title='Agility'>{this.props.agilityValue}</td>
            </tr>
            <tr>
            <td className='hullValue' title='Hull'><img src={PilotCardUI.HullIcon} /></td>
            <td className='hullValue' title='Hull'>{this.props.hullValue}</td>
            </tr>
            <tr>
            <td className='shieldValue' title='Shield'><img src={PilotCardUI.ShieldIcon} /></td>
            <td className='shieldValue' title='Shield'>{this.props.shieldValue}</td>
            </tr>
            </table>
        );
    },
});

PilotCardUI.ShipActionPanel = React.createClass(
{
    render: function() 
    {
        var shipActions = this.props.shipActions;
        var cells = [];
        
        for (var i=0; i<shipActions.length; i++)
        {
            var shipAction = shipActions[i];
            var img = PilotCardUI.createActionImage(shipAction);
            cells[cells.length] = <td key={i} className="pilotCardUIShipActionCell">{img}</td>;
        }
        
        return <table className="pilotCardUIShipActions">
            <tbody>
                <tr className="pilotCardUIShipActions">{cells}</tr>
            </tbody>
            </table>
    },
});

PilotCardUI.UpgradePanel = React.createClass(
{
    render: function() 
    {
        var upgradeTypes = this.props.upgradeTypes;
        var cells = [];
        
        for (var i=0; i<upgradeTypes.length; i++)
        {
            var upgradeType = upgradeTypes[i];
            var img = UpgradeCardUI.createUpgradeImage(upgradeType);
            cells[cells.length] = <td key={i}>{img}</td>;
        }

        return <table className="pilotCardUIUpgrades">
            <tbody>
                <tr>{cells}</tr>
            </tbody>
            </table>
    },
});

PilotCardUI.CountToken = React.createClass(
{
    render: function() 
    {
        var divStyle = {
              backgroundImage: 'url(' + this.props.path + ')',
              width: this.props.width,
              };
      
        var answer
        
        if (this.props.count == 0)
        {
            answer = (<span></span>);
        }
        else if (this.props.count == 1)
        {
            answer = (
                    <div title={this.props.title} className='countTokenBox' style={divStyle} ></div>
                );
        }
        else
        {
            answer = (
                    <div title={this.props.title} className='countTokenBox' style={divStyle} >
                    <p className={this.props.numberClass}>{this.props.count}</p>
                    </div>
                );
        }
    
        return answer;
    },
});

PilotCardUI.TokensPanel = React.createClass(
{
    render: function() 
    {
        return (
            <div className="tokensPanel">
            <table className="tokensTable">
            <tr>
            <td><PilotCardUI.CountToken title="Cloak" width="36" numberClass="countTokenText" path={PilotCardUI.CloakIcon} count={this.props.cloakCount} /></td>
            <td><PilotCardUI.CountToken title="Evade" width="32" numberClass="countTokenText" path={PilotCardUI.EvadeIcon} count={this.props.evadeCount} /></td>
            <td><PilotCardUI.CountToken title="Focus" width="32" numberClass="countTokenText" path={PilotCardUI.FocusIcon} count={this.props.focusCount} /></td>
            <td><PilotCardUI.CountToken title="Ion" width="32" numberClass="countTokenText" path={PilotCardUI.IonIcon} count={this.props.ionCount} /></td>
            <td><PilotCardUI.CountToken title="Shield" width="32" numberClass="countTokenText" path={PilotCardUI.ShieldTokenIcon} count={this.props.shieldCount} /></td>
            <td><PilotCardUI.CountToken title="Stress" width="32" numberClass="countTokenText" path={PilotCardUI.StressIcon} count={this.props.stressCount} /></td>
            <td><PilotCardUI.CountToken title="Damage" width="32" numberClass="damageCount" path={PilotCardUI.DamageIcon} count={this.props.damageCount} /></td>
            <td><PilotCardUI.CountToken title="Critical Damage" width="32" numberClass="damageCount" path={PilotCardUI.CriticalDamageIcon} count={this.props.criticalDamageCount} /></td>
            </tr>
            </table>
            </div>
        );
    },
});
