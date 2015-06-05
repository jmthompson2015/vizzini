/*
 * Provides a token user interface for Starfighter Squadrons.
 */
var PilotCardUI = React.createClass({
    
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
        var myToken = this.state.token;
        
        return (
        <table className="pilotCard">
        <tr>
        <td>
        <PilotCardUI.NamePanel pilotSkillValue={myToken.getPilotSkillValue()}
            pilotName={myToken.getPilotName()}
            shipName={myToken.getShipName()}
            teamName={myToken.getTeamName()} />
        </td>
        </tr>
        <tr>
        <td>
        <PilotCardUI.StatsPanel primaryWeaponValue={myToken.getPrimaryWeaponValue()}
            agilityValue={myToken.getAgilityValue()}
            hullValue={myToken.getHullValue()}
            shieldValue={myToken.getShieldValue()} />
        </td>
        </tr>
        <tr>
        <td>
        <PilotCardUI.DamagePanel damageCount={myToken.getDamageCount()}
            criticalDamageCount={myToken.getCriticalDamageCount()} />
        </td>
        </tr>
        <tr>
        <td>
        <PilotCardUI.TokensPanel cloakCount={myToken.getCloakCount()}
            evadeCount={myToken.getEvadeCount()}
            focusCount={myToken.getFocusCount()}
            ionCount={myToken.getIonCount()}
            shieldCount={myToken.getShieldCount()}
            stressCount={myToken.getStressCount()} />
        </td>
        </tr>
        </table>
        );
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

PilotCardUI.HitIcon = PilotCardUI.ImagesUrl + "pilotCard/Hit24.jpg";
PilotCardUI.CriticalHitIcon = PilotCardUI.ImagesUrl + "pilotCard/CriticalHit24.jpg";

PilotCardUI.CloakIcon = PilotCardUI.ImagesUrl + "token/CloakToken32.png";
PilotCardUI.EvadeIcon = PilotCardUI.ImagesUrl + "token/EvadeToken32.png";
PilotCardUI.FocusIcon = PilotCardUI.ImagesUrl + "token/FocusToken32.png";
PilotCardUI.IonIcon = PilotCardUI.ImagesUrl + "token/IonToken32.png";
PilotCardUI.ShieldTokenIcon = PilotCardUI.ImagesUrl + "token/ShieldToken32.png";
PilotCardUI.StressIcon = PilotCardUI.ImagesUrl + "token/StressToken32.png";

PilotCardUI.NamePanel = React.createClass({
    render: function() {
        var titleString = this.props.teamName + " Faction";
        var fileString = PilotCardUI.ImagesUrl + this.props.teamName + "Icon24.png";

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
    }
});

PilotCardUI.StatsPanel = React.createClass({
    render: function() {
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
    }
});

PilotCardUI.DamagePanel = React.createClass({
    render: function() {
        var answer;
        
        if (this.props.damageCount == 0 && this.props.criticalDamageCount == 0)
        {
            answer = (<span></span>);
        }
        else
        {
            answer = (
                <div className="damagePanel">
                <table className="damageTable">
                <tr>
                <td title='Damage'><img src={PilotCardUI.HitIcon} /></td>
                <td title='Damage'>{this.props.damageCount}</td>
                <td title='Critical Damage'><img src={PilotCardUI.CriticalHitIcon} /></td>
                <td title='Critical Damage'>{this.props.criticalDamageCount}</td>
                </tr>
                </table>
                </div>
            );
        }
        
        return answer;
    }
});

PilotCardUI.CountToken = React.createClass({
    render: function() {
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
                    <p className='countTokenText'>{this.props.count}</p>
                    </div>
                );
        }
    
        return answer;
    }
});

PilotCardUI.TokensPanel = React.createClass({
    render: function() {
        return (
            <div className="tokensPanel">
            <table className="tokensTable">
            <tr>
            <td><PilotCardUI.CountToken title="Cloak" width="36" path={PilotCardUI.CloakIcon} count={this.props.cloakCount} /></td>
            <td><PilotCardUI.CountToken title="Evade" width="32" path={PilotCardUI.EvadeIcon} count={this.props.evadeCount} /></td>
            <td><PilotCardUI.CountToken title="Focus" width="32" path={PilotCardUI.FocusIcon} count={this.props.focusCount} /></td>
            <td><PilotCardUI.CountToken title="Ion" width="32" path={PilotCardUI.IonIcon} count={this.props.ionCount} /></td>
            <td><PilotCardUI.CountToken title="Shield" width="32" path={PilotCardUI.ShieldTokenIcon} count={this.props.shieldCount} /></td>
            <td><PilotCardUI.CountToken title="Stress" width="32" path={PilotCardUI.StressIcon} count={this.props.stressCount} /></td>
            </tr>
            </table>
            </div>
        );
    }
});
