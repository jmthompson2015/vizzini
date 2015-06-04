/*
 * Provides a user interface to choose a weapon and defender.
 */
var WeaponAndDefenderChooser = React.createClass(
{
    getInitialState: function() 
    {
        return {weapon: undefined, defender: undefined};
    },

    render: function() 
    {
        var attacker = this.props.attacker;
        var message = <div className="attackerLabel">Attacker: {attacker.getName()}</div>;
        var choices = this.props.choices;
        var self = this;

        var myHtml = [];
        
        for (var i = 0; i < choices.length; i++)
        {
            var weaponAndRangeAndTokens = choices[i];
            var weapon = weaponAndRangeAndTokens.weapon;
            var weaponName = weapon.getName();

            myHtml[myHtml.length] = <tr key={myHtml.length}>
                <td className="weaponName">{weaponName}</td>
                </tr>;

            var rangeAndTokensArray = weaponAndRangeAndTokens.rangeAndTokens;

            for (var j = 0; j < rangeAndTokensArray.length; j++)
            {
                var rangeAndTokens = rangeAndTokensArray[j];
                var range = rangeAndTokens.range;
                var rangeName = Range.properties[range].getDisplayName();

                myHtml[myHtml.length] = <tr key={myHtml.length}>
                    <td className="rangeLabel">Range {rangeName}</td>
                    </tr>;

                var tokens = rangeAndTokens.tokens;

                if (tokens)
                {
                    for (var k = 0; k < tokens.length; k++)
                    {
                        var token = tokens[k];

                        myHtml[myHtml.length] = <tr key={myHtml.length}>
                            <td className="defenderChoice">
                            <label>
                            <input type="radio"
                                onClick={self.selectionChanged}
                                name={weaponName}
                                data-weapon-name={weaponName}
                                data-defender-id={token.getId()} />
                            {token.getName()}
                            </label>
                            </td>
                            </tr>;
                    }
                }
            }
        }
        
        return (<OptionPane panelClass="optionPane"
            title="Combat: Select Weapon and Defender" titleClass="optionPaneTitle"
            message={message} messageClass="optionPaneMessage"
            initialInput={<table className="combatTable">{myHtml}</table>}
            buttons={<span><button onClick={self.cancel}>Cancel</button>
                <button onClick={self.ok}>OK</button></span>}
            buttonsClass="optionPaneButtons"
        />);
    },

    selectionChanged: function(event)
    {
        LOGGER.debug("selectionChanged()");
        var weaponName = event.currentTarget.dataset.weaponName;
        var defenderId = event.currentTarget.dataset.defenderId;
        LOGGER.debug("weaponName = "+weaponName+" defenderId = "+defenderId);
        var weapon = this.findWeapon(weaponName);
        LOGGER.debug("weapon = "+weapon);
        var defender = this.findDefender(defenderId);
        LOGGER.debug("defender = "+defender);
        this.setState({weapon: weapon, defender: defender});
    },

    cancel: function()
    {
        LOGGER.debug("cancel()");
        this.props.callback(undefined);
    },

    ok: function()
    {
        LOGGER.debug("ok()");
        this.props.callback(this.state.weapon, this.state.defender);
    },

    findDefender: function(tokenId)
    {
        var answer;
        
        var choices = this.props.choices;

        for (var i = 0; i < choices.length; i++)
        {
            var weaponAndRangeAndTokens = choices[i];

            var rangeAndTokensArray = weaponAndRangeAndTokens.rangeAndTokens;

            for (var j = 0; j < rangeAndTokensArray.length; j++)
            {
                var rangeAndTokens = rangeAndTokensArray[j];

                var tokens = rangeAndTokens.tokens;

                if (tokens)
                {
                    for (var k = 0; k < tokens.length; k++)
                    {
                        var token = tokens[k];

                        if (token.getId() == tokenId)
                        {
                            answer = token;
                            break;
                        }
                    }
                }
            }
        }

        return answer;
    },
    
    findWeapon: function(weaponName)
    {
        var attacker = this.props.attacker;
        
        return attacker.getPrimaryWeapon();
    },
});

/*
 * @param environment Environment. @param attacker Attacker. @param
 * attackerPosition Attacker position. @param weapon Weapon.
 * 
 * @return a new map of range to defenders.
 */
WeaponAndDefenderChooser.createRangeAndTokens = function(environment, attacker,
        attackerPosition, weapon)
{
    var answer = [];

    for (var i = 0; i < Range.values.length; i++)
    {
        var range = Range.values[i];
        LOGGER.trace("WeaponAndDefenderChooser.createRangeAndTokens() range = "
                + range);
        var rangeDefenders = environment.getTargetableDefendersAtRange(
                attacker, attackerPosition, weapon, range);
        LOGGER
                .trace("WeaponAndDefenderChooser.createRangeAndTokens() rangeDefenders.length = "
                        + rangeDefenders.length);

        if (rangeDefenders.length > 0)
        {
            answer[answer.length] =
            {
                range: range,
                tokens: rangeDefenders
            }
        }
    }

    return answer;
}

/*
 * @param environment Environment. @param attacker Attacker.
 * 
 * @return a new map of weapon to range to defenders.
 */
WeaponAndDefenderChooser.createWeaponAndRangeAndTokens = function(environment,
        attacker)
{
    var answer = [];

    var attackerPosition = environment.getPositionFor(attacker);

    if (attackerPosition != null)
    {
        var primaryWeapon = attacker.getPrimaryWeapon();
        var rangeAndTokens = WeaponAndDefenderChooser.createRangeAndTokens(
                environment, attacker, attackerPosition, primaryWeapon);

        if (rangeAndTokens.length > 0)
        {
            answer[answer.length] =
            {
                weapon: primaryWeapon,
                rangeAndTokens: rangeAndTokens
            }
        }

        var weapons = attacker.getSecondaryWeapons();

        for (var i = 0; i < weapons.length; i++)
        {
            var weapon = weapons[i];
            rangeAndTokens = WeaponAndDefenderChooser.createRangeAndTokens(
                    environment, attacker, attackerPosition, weapon);

            if (rangeAndTokens.length > 0)
            {
                answer[answer.length] =
                {
                    weapon: weapon,
                    rangeAndTokens: rangeAndTokens
                }
            }
        }
    }

    return answer;
}
