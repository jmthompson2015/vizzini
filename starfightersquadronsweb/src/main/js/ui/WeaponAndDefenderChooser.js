/*
 * Provides a user interface to choose a weapon and defender.
 */
define([ "RangeRuler" ], function(RangeRuler)
{
    var WeaponAndDefenderChooser = React.createClass(
    {
        getInitialState: function()
        {
            var weapon;
            var defender;

            var choices = this.props.choices;

            if (choices.length > 0)
            {
                weapon = choices[0].weapon;
                var rangeAndTokens = choices[0].rangeAndTokens;
                defender = rangeAndTokens[0].tokens[0];
            }

            return (
            {
                weapon: weapon,
                defender: defender
            });
        },

        render: function()
        {
            var attacker = this.props.attacker;
            var message = React.DOM.div(
            {
                className: "attackerLabel"
            }, "Attacker: " + attacker.name());
            var selectedWeapon = this.state.weapon;
            var selectedDefender = this.state.defender;
            var choices = this.props.choices;
            var self = this;

            var rows = [];

            for (var i = 0; i < choices.length; i++)
            {
                var weaponAndRangeAndTokens = choices[i];
                var weapon = weaponAndRangeAndTokens.weapon;
                var weaponName = weapon.name();

                rows.push(React.DOM.tr(
                {
                    key: rows.length
                }, React.DOM.td(
                {
                    className: "weaponName"
                }, weaponName)));

                var rangeAndTokensArray = weaponAndRangeAndTokens.rangeAndTokens;

                for (var j = 0; j < rangeAndTokensArray.length; j++)
                {
                    var rangeAndTokens = rangeAndTokensArray[j];
                    var range = rangeAndTokens.range;
                    var rangeName = RangeRuler.properties[range].displayName;

                    rows.push(React.DOM.tr(
                    {
                        key: rows.length
                    }, React.DOM.td(
                    {
                        className: "rangeLabel"
                    }, "Range " + rangeName)));

                    var tokens = rangeAndTokens.tokens;

                    if (tokens)
                    {
                        for (var k = 0; k < tokens.length; k++)
                        {
                            var token = tokens[k];

                            var input = React.DOM.input(
                            {
                                key: 0,
                                type: "radio",
                                defaultChecked: (weapon === selectedWeapon && token === selectedDefender),
                                onClick: self.selectionChanged,
                                name: "weaponChooserRadioButtons",
                                "data-weapon-name": weaponName,
                                "data-defender-id": token.id()
                            });
                            var span = React.DOM.span(
                            {
                                key: 1
                            }, token.name());
                            var label = React.DOM.label({}, [ input, span ]);
                            var cell = React.DOM.td(
                            {
                                className: "defenderChoice"
                            }, label);
                            rows.push(React.DOM.tr(
                            {
                                key: rows.length
                            }, cell));
                        }
                    }
                }
            }

            var initialInput = React.DOM.table(
            {
                className: "combatTable"
            }, rows);
            var cancelButton = React.DOM.button(
            {
                key: 0,
                onClick: self.cancel
            }, "Cancel");
            var okButton = React.DOM.button(
            {
                key: 1,
                onClick: self.ok
            }, "OK");
            var buttons = React.DOM.span({}, [ cancelButton, okButton ]);
            return React.createElement(OptionPane,
            {
                panelClass: "optionPane",
                title: "Combat: Select Weapon and Defender",
                titleClass: "optionPaneTitle",
                message: message,
                messageClass: "optionPaneMessage",
                initialInput: initialInput,
                buttons: buttons,
                buttonsClass: "optionPaneButtons"
            });
        },

        selectionChanged: function(event)
        {
            LOGGER.debug("selectionChanged()");
            var weaponName = event.currentTarget.dataset.weaponName;
            var defenderId = event.currentTarget.dataset.defenderId;
            LOGGER.debug("weaponName = " + weaponName + " defenderId = " + defenderId);
            var weapon = this.findWeapon(weaponName);
            LOGGER.debug("weapon = " + weapon);
            var defender = this.findDefender(defenderId);
            LOGGER.debug("defender = " + defender);
            this.setState(
            {
                weapon: weapon,
                defender: defender
            });
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

                            if (token.id() == tokenId)
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
            var answer = attacker.primaryWeapon();

            if (weaponName !== "Primary Weapon")
            {
                var secondaryWeapons = attacker.secondaryWeapons();

                for (var i = 0; i < secondaryWeapons.length; i++)
                {
                    var weapon = secondaryWeapons[i];

                    if (weapon.name() === weaponName)
                    {
                        answer = weapon;
                        break;
                    }
                }
            }

            return answer;
        },
    });

    /*
     * @param environment Environment.
     * 
     * @param attacker Attacker.
     * 
     * @param attackerPosition Attacker position.
     * 
     * @param weapon Weapon.
     * 
     * @return a new map of range to defenders.
     */
    WeaponAndDefenderChooser.createRangeAndTokens = function(environment, attacker, attackerPosition, weapon)
    {
        var answer = [];

        var values = RangeRuler.values();

        for (var i = 0; i < values.length; i++)
        {
            var range = values[i];
            LOGGER.trace("WeaponAndDefenderChooser.createRangeAndTokens() range = " + range);
            var rangeDefenders = environment.getTargetableDefendersAtRange(attacker, attackerPosition, weapon, range);
            LOGGER.trace("WeaponAndDefenderChooser.createRangeAndTokens() rangeDefenders.length = "
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
    WeaponAndDefenderChooser.createWeaponAndRangeAndTokens = function(environment, attacker)
    {
        var answer = [];

        var attackerPosition = environment.getPositionFor(attacker);

        if (attackerPosition != null)
        {
            var primaryWeapon = attacker.primaryWeapon();
            var rangeAndTokens = WeaponAndDefenderChooser.createRangeAndTokens(environment, attacker, attackerPosition,
                    primaryWeapon);

            if (rangeAndTokens.length > 0)
            {
                answer[answer.length] =
                {
                    weapon: primaryWeapon,
                    rangeAndTokens: rangeAndTokens
                }
            }

            var weapons = attacker.secondaryWeapons();

            for (var i = 0; i < weapons.length; i++)
            {
                var weapon = weapons[i];
                rangeAndTokens = WeaponAndDefenderChooser.createRangeAndTokens(environment, attacker, attackerPosition,
                        weapon);

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

    return WeaponAndDefenderChooser;
});
