/*
 * Provides a user interface for Combat.
 * 
 * @param phase Phase. (required)
 * 
 * @param attacker Attacking token. (required)
 * 
 * @param attackDice Attack dice. (required)
 * 
 * @param defender Defending token. (required)
 * 
 * @param defenseDice Defense dice. (optional)
 * 
 * @param hitCount Hit count. (required for Deal Damage)
 * 
 * @param criticalHitCount Critical hit count. (required for Deal Damage)
 * 
 * @param okFunction Function called for the OK button. (optional)
 */
define([ "AttackDice", "DefenseDice", "ModifyAttackDiceAction", "ModifyDefenseDiceAction", "Phase" ], function(
        AttackDice, DefenseDice, ModifyAttackDiceAction, ModifyDefenseDiceAction, Phase)
{
    var CombatUI = React.createClass(
    {
        getInitialState: function()
        {
            return (
            {
                attackModification: null,
                defenseModification: null,
            });
        },

        render: function()
        {
            var phase = this.props.phase;
            InputValidator.validateNotNull("phase", phase);
            var attacker = this.props.attacker;
            InputValidator.validateNotNull("attacker", attacker);
            var defender = this.props.defender;
            InputValidator.validateNotNull("defender", defender);
            var attackDice = this.props.attackDice;
            InputValidator.validateNotNull("attackDice", attackDice);
            var defenseDice = this.props.defenseDice;

            var rows = [];

            // Attacker label.
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td({}, React.DOM.span({}, "Attacker: " + attacker.getName()))));

            // Attack Dice panel.
            var attackPanel = React.createElement(CombatUI.AttackDiceUI,
            {
                dice: attackDice,
            });
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td(
            {
                className: "combatDicePanel",
            }, attackPanel)));

            if (attackDice.getSize() > 0 && phase === Phase.COMBAT_ROLL_ATTACK_DICE)
            {
                // Modify Attack Dice panel.
                var modifyAttackPanel = React.createElement(CombatUI.ModifyAttackUI,
                {
                    attacker: attacker,
                    modifications: this.props.modifications,
                    onChange: this.attackOnChange,
                });

                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td({}, modifyAttackPanel)));
            }

            // Defender label.
            rows.push(React.DOM.tr(
            {
                key: rows.length,
            }, React.DOM.td({}, React.DOM.span({}, "Defender: " + defender.getName()))));

            if (defenseDice && defenseDice.getSize() > 0)
            {
                // Defense Dice panel.
                var defensePanel = React.createElement(CombatUI.DefenseDiceUI,
                {
                    dice: defenseDice,
                });

                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td(
                {
                    className: "combatDicePanel",
                }, defensePanel)));

                if (phase === Phase.COMBAT_ROLL_DEFENSE_DICE)
                {
                    // Modify Defense Dice panel.
                    var modifyDefensePanel = React.createElement(CombatUI.ModifyDefenseUI,
                    {
                        defender: defender,
                        modifications: this.props.modifications,
                        onChange: this.defenseOnChange,
                    });

                    rows.push(React.DOM.tr(
                    {
                        key: rows.length,
                    }, React.DOM.td({}, modifyDefensePanel)));
                }
            }

            if (phase === Phase.COMBAT_MODIFY_DEFENSE_DICE)
            {
                // Damage panel.
                var damagePanel = React.createElement(CombatUI.DamageUI,
                {
                    hitCount: this.props.hitCount,
                    criticalHitCount: this.props.criticalHitCount,
                });

                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td({}, damagePanel)));
            }

            var message = React.DOM.table(
            {
                className: "combatPanel",
            }, React.DOM.tbody({}, rows));
            var okButton = React.DOM.button(
            {
                key: 0,
                onClick: this.ok,
            }, "OK");
            var buttons = React.DOM.span({}, [ okButton ]);

            return React.createElement(OptionPane,
            {
                panelClass: "optionPane",
                title: this.createTitle(phase),
                titleClass: "optionPaneTitle",
                message: message,
                messageClass: "combatMessage",
                buttons: buttons,
                buttonsClass: "optionPaneButtons",
            });
        },

        attackOnChange: function(modification)
        {
            this.setState(
            {
                attackModification: modification,
            });
        },

        createTitle: function(phase)
        {
            var answer = "Combat";
            if (phase === Phase.COMBAT_ROLL_ATTACK_DICE)
            {
                answer += ": Modify Attack Dice";
            }
            else if (phase === Phase.COMBAT_ROLL_DEFENSE_DICE)
            {
                answer += ": Modify Defense Dice";
            }
            else if (phase === Phase.COMBAT_MODIFY_DEFENSE_DICE)
            {
                answer += ": Deal Damage";
            }

            return answer;
        },

        defenseOnChange: function(modification)
        {
            this.setState(
            {
                defenseModification: modification,
            });
        },

        ok: function()
        {
            LOGGER.debug("CombatUI ok()");

            var value;
            var phase = this.props.phase;

            if (phase === Phase.COMBAT_ROLL_ATTACK_DICE)
            {
                value = this.state.attackModification;
            }
            else if (phase === Phase.COMBAT_ROLL_DEFENSE_DICE)
            {
                value = this.state.defenseModification;
            }

            var okFunction = this.props.okFunction;

            if (okFunction)
            {
                okFunction(value);
            }
        },
    });

    /*
     * Provides a user interface for the attacker during combat.
     * 
     * @param dice Attack dice. (required)
     */
    CombatUI.AttackDiceUI = React.createClass(
    {
        render: function()
        {
            var columns = [];

            var dice = this.props.dice;
            InputValidator.validateNotNull("attack dice", dice);

            var values = dice.getSortedValues();

            values.forEach(function(die)
            {
                columns.push(React.DOM.td(
                {
                    key: columns.length,
                }, this.createImage(die)));
            }, this);

            return React.DOM.table(
            {
                className: "combatDicePanel",
            }, React.DOM.tbody({}, React.DOM.tr({}, columns)));
        },

        createImage: function(die)
        {
            var title = AttackDice.Value.properties[die].name;
            var source = imageBase + "dice/Attack" + title.replace(" ", "") + "32.png";

            return React.DOM.img(
            {
                src: source,
                title: title,
            });
        },
    });

    /*
     * Provides a user interface for the defender during combat.
     * 
     * @param defenseDice Defense dice. (optional)
     */
    CombatUI.DefenseDiceUI = React.createClass(
    {
        render: function()
        {
            var columns = [];

            var dice = this.props.dice;

            if (dice)
            {
                var values = dice.getSortedValues();

                values.forEach(function(die)
                {
                    columns.push(React.DOM.td(
                    {
                        key: columns.length,
                    }, this.createImage(die)));
                }, this);
            }

            return React.DOM.table(
            {
                className: "combatDicePanel",
            }, React.DOM.tbody({}, React.DOM.tr({}, columns)));
        },

        createImage: function(die)
        {
            var title = DefenseDice.Value.properties[die].name;
            var source = imageBase + "dice/Defense" + title.replace(" ", "") + "32.png";

            return React.DOM.img(
            {
                src: source,
                title: title,
            });
        },
    });

    CombatUI.ModifyAttackUI = React.createClass(
    {
        render: function()
        {
            var modifications = this.props.modifications;
            InputValidator.validateNotNull("modifications", modifications);
            var attacker = this.props.attacker;
            InputValidator.validateNotNull("attacker", attacker);
            var labelFunction = function(value)
            {
                var answer = "Pass";
                if (value)
                {
                    answer = ModifyAttackDiceAction.Modification.properties[value].name;
                }
                return answer;
            }
            var initialValue;
            if (modifications.length > 0)
            {
                initialValue = modifications[0];
            }

            return React.createElement(InputPanel,
            {
                type: "radio",
                values: modifications,
                name: "selectModifyAttack",
                labelFunction: labelFunction,
                initialValues: initialValue,
                onChange: this.myOnChange,
                panelClass: "combatChoicePanel",
            });
        },

        myOnChange: function(event)
        {
            LOGGER.info("ModifyAttackUI.myOnChange()");
            var source = event.target;
            var modification = source.id;
            LOGGER.info("ModifyAttackUI.myOnChange() modification = " + modification);
            this.props.onChange(modification);
        },
    });

    CombatUI.ModifyDefenseUI = React.createClass(
    {
        render: function()
        {
            var modifications = this.props.modifications;
            InputValidator.validateNotNull("modifications", modifications);
            var defender = this.props.defender;
            InputValidator.validateNotNull("defender", defender);
            var labelFunction = function(value)
            {
                var answer = "Pass";
                if (value)
                {
                    answer = ModifyDefenseDiceAction.Modification.properties[value].name;
                }
                return answer;
            }
            var initialValue;
            if (modifications.length > 0)
            {
                initialValue = modifications[0];
            }

            return React.createElement(InputPanel,
            {
                type: "radio",
                values: modifications,
                name: "selectModifyDefense",
                labelFunction: labelFunction,
                initialValues: initialValue,
                onChange: this.myOnChange,
                panelClass: "combatChoicePanel",
            });
        },

        myOnChange: function(event)
        {
            LOGGER.info("ModifyDefenseUI.myOnChange()");
            var source = event.target;
            var modification = source.id;
            LOGGER.info("ModifyDefenseUI.myOnChange() modification = " + modification);
            this.props.onChange(modification);
        },
    });

    /*
     * Provides a user interface for damage.
     * 
     * @param hitCount Hit count. (required)
     * 
     * @param criticalHitCount Critical hit count. (required)
     */
    CombatUI.DamageUI = React.createClass(
    {
        render: function()
        {
            var hitCount = this.props.hitCount;
            InputValidator.validateNotNull("hitCount", hitCount);
            var criticalHitCount = this.props.criticalHitCount;
            InputValidator.validateNotNull("criticalHitCount", criticalHitCount);

            var hitFilename = imageBase + "pilotCard/Damage32.jpg";
            var criticalHitFilename = imageBase + "pilotCard/CriticalDamage32.jpg";
            var columns = [];

            columns.push(React.DOM.td(
            {
                key: columns.length,
            }, React.DOM.span({}, "Damage: ")));
            columns.push(React.DOM.td(
            {
                key: columns.length,
            }, React.DOM.img(
            {
                src: hitFilename,
                title: "Damage",
            })));
            columns.push(React.DOM.td(
            {
                key: columns.length,
            }, React.DOM.span({}, hitCount)));
            columns.push(React.DOM.td(
            {
                key: columns.length,
            }, React.DOM.img(
            {
                src: criticalHitFilename,
                title: "Critical Damage",
            })));
            columns.push(React.DOM.td(
            {
                key: columns.length,
            }, React.DOM.span({}, criticalHitCount)));

            return React.DOM.table({}, React.DOM.tbody({}, React.DOM.tr({}, columns)));
        },
    });

    return CombatUI;
});
