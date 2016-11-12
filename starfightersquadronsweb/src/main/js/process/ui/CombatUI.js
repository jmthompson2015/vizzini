define(["AttackDice", "DefenseDice", "Phase", "process/ModifyAttackDiceAction", "process/ModifyDefenseDiceAction"],
    function(AttackDice, DefenseDice, Phase, ModifyAttackDiceAction, ModifyDefenseDiceAction)
    {
        "use strict";
        var CombatUI = React.createClass(
        {
            propTypes:
            {
                attacker: React.PropTypes.object.isRequired,
                attackDice: React.PropTypes.object.isRequired,
                defender: React.PropTypes.object.isRequired,
                imageBase: React.PropTypes.string.isRequired,
                phase: React.PropTypes.object.isRequired,

                criticalHitCount: React.PropTypes.number,
                defenseDice: React.PropTypes.object,
                hitCount: React.PropTypes.number,
                modificationKeys: React.PropTypes.array,
                okFunction: React.PropTypes.func,
            },

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
                var attacker = this.props.attacker;
                var defender = this.props.defender;
                var attackDice = this.props.attackDice;
                var defenseDice = this.props.defenseDice;
                var modificationKeys = this.props.modificationKeys;

                var rows = [];

                // Attacker label.
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td(
                {}, React.DOM.span(
                {}, "Attacker: " + attacker.name()))));

                // Weapon label.
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td(
                {}, React.DOM.span(
                {}, "Weapon: " + attacker.combatState().combatAction().weapon()))));

                // Attack Dice panel.
                var attackPanel = React.createElement(CombatUI.AttackDiceUI,
                {
                    dice: attackDice,
                    imageBase: this.props.imageBase,
                });
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td(
                {
                    className: "combatDicePanel",
                }, attackPanel)));

                if (attackDice.size() > 0 && phase.value === Phase.COMBAT_MODIFY_ATTACK_DICE && modificationKeys !== undefined)
                {
                    // Modify Attack Dice panel.
                    var modifyAttackPanel = React.createElement(CombatUI.ModifyAttackUI,
                    {
                        attacker: attacker,
                        modificationKeys: this.props.modificationKeys,
                        onChange: this.attackOnChange,
                    });

                    rows.push(React.DOM.tr(
                    {
                        key: rows.length,
                    }, React.DOM.td(
                    {}, modifyAttackPanel)));
                }

                // Defender label.
                rows.push(React.DOM.tr(
                {
                    key: rows.length,
                }, React.DOM.td(
                {}, React.DOM.span(
                {}, "Defender: " + defender.name()))));

                if (defenseDice && defenseDice.size() > 0)
                {
                    // Defense Dice panel.
                    var defensePanel = React.createElement(CombatUI.DefenseDiceUI,
                    {
                        dice: defenseDice,
                        imageBase: this.props.imageBase,
                    });

                    rows.push(React.DOM.tr(
                    {
                        key: rows.length,
                    }, React.DOM.td(
                    {
                        className: "combatDicePanel",
                    }, defensePanel)));

                    if (defenseDice.size() > 0 && phase.value === Phase.COMBAT_MODIFY_DEFENSE_DICE && modificationKeys !== undefined)
                    {
                        // Modify Defense Dice panel.
                        var modifyDefensePanel = React.createElement(CombatUI.ModifyDefenseUI,
                        {
                            defender: defender,
                            modificationKeys: this.props.modificationKeys,
                            onChange: this.defenseOnChange,
                        });

                        rows.push(React.DOM.tr(
                        {
                            key: rows.length,
                        }, React.DOM.td(
                        {}, modifyDefensePanel)));
                    }
                }

                if (phase.value === Phase.COMBAT_NOTIFY_DAMAGE)
                {
                    // Damage panel.
                    var damagePanel = React.createElement(CombatUI.DamageUI,
                    {
                        criticalHitCount: this.props.criticalHitCount,
                        hitCount: this.props.hitCount,
                        imageBase: this.props.imageBase,
                    });

                    rows.push(React.DOM.tr(
                    {
                        key: rows.length,
                    }, React.DOM.td(
                    {}, damagePanel)));
                }

                var message = React.DOM.table(
                {
                    className: "combatPanel",
                }, React.DOM.tbody(
                {}, rows));
                var okButton = React.DOM.button(
                {
                    key: 0,
                    onClick: this.ok,
                }, "OK");
                var buttons = React.DOM.span(
                {}, [okButton]);

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

                if (phase.value === Phase.COMBAT_MODIFY_ATTACK_DICE)
                {
                    answer += ": Modify Attack Dice";
                }
                else if (phase.value === Phase.COMBAT_MODIFY_DEFENSE_DICE)
                {
                    answer += ": Modify Defense Dice";
                }
                else if (phase.value === Phase.COMBAT_NOTIFY_DAMAGE)
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

                if (phase.value === Phase.COMBAT_MODIFY_ATTACK_DICE)
                {
                    value = this.state.attackModification;
                }
                else if (phase.value === Phase.COMBAT_MODIFY_DEFENSE_DICE)
                {
                    value = this.state.defenseModification;
                }

                if (value === "null")
                {
                    value = null;
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
            propTypes:
            {
                dice: React.PropTypes.object.isRequired,
                imageBase: React.PropTypes.string.isRequired,
            },

            render: function()
            {
                var columns = [];

                var dice = this.props.dice;
                InputValidator.validateNotNull("attack dice", dice);

                var values = dice.sortedValues();

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
                }, React.DOM.tbody(
                {}, React.DOM.tr(
                {}, columns)));
            },

            createImage: function(die)
            {
                var title = AttackDice.Value.properties[die].name;
                var source = this.props.imageBase + "dice/Attack" + title.replace(" ", "") + "32.png";

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
            propTypes:
            {
                dice: React.PropTypes.object.isRequired,
                imageBase: React.PropTypes.string.isRequired,
            },

            render: function()
            {
                var columns = [];

                var dice = this.props.dice;

                if (dice)
                {
                    var values = dice.sortedValues();

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
                }, React.DOM.tbody(
                {}, React.DOM.tr(
                {}, columns)));
            },

            createImage: function(die)
            {
                var title = DefenseDice.Value.properties[die].name;
                var source = this.props.imageBase + "dice/Defense" + title.replace(" ", "") + "32.png";

                return React.DOM.img(
                {
                    src: source,
                    title: title,
                });
            },
        });

        CombatUI.ModifyAttackUI = React.createClass(
        {
            propTypes:
            {
                attacker: React.PropTypes.object.isRequired,
                onChange: React.PropTypes.func.isRequired,

                modificationKeys: React.PropTypes.array,
            },

            render: function()
            {
                var modificationKeys = this.props.modificationKeys;
                var attacker = this.props.attacker;
                var labelFunction = function(value)
                {
                    var answer = "Pass";
                    if (value)
                    {
                        answer = ModifyAttackDiceAction.Modification.properties[value].name;
                    }
                    return answer;
                };
                var initialValue;
                if (modificationKeys !== undefined && modificationKeys.length > 0)
                {
                    initialValue = modificationKeys[0];
                }

                return React.createElement(InputPanel,
                {
                    type: "radio",
                    values: modificationKeys,
                    name: "selectModifyAttack",
                    labelFunction: labelFunction,
                    initialValues: initialValue,
                    onChange: this.myOnChange,
                    panelClass: "combatChoicePanel",
                });
            },

            myOnChange: function(event)
            {
                LOGGER.trace("ModifyAttackUI.myOnChange()");
                var source = event.target;
                var modification = source.id;
                LOGGER.debug("ModifyAttackUI.myOnChange() modification = " + modification);
                this.props.onChange(modification);
            },
        });

        CombatUI.ModifyDefenseUI = React.createClass(
        {
            propTypes:
            {
                defender: React.PropTypes.object.isRequired,
                onChange: React.PropTypes.func.isRequired,

                modificationKeys: React.PropTypes.array,
            },

            render: function()
            {
                var modificationKeys = this.props.modificationKeys;
                var defender = this.props.defender;
                var labelFunction = function(value)
                {
                    var answer = "Pass";
                    if (value)
                    {
                        answer = ModifyDefenseDiceAction.Modification.properties[value].name;
                    }
                    return answer;
                };
                var initialValue;
                if (modificationKeys !== undefined && modificationKeys.length > 0)
                {
                    initialValue = modificationKeys[0];
                }

                return React.createElement(InputPanel,
                {
                    type: "radio",
                    values: modificationKeys,
                    name: "selectModifyDefense",
                    labelFunction: labelFunction,
                    initialValues: initialValue,
                    onChange: this.myOnChange,
                    panelClass: "combatChoicePanel",
                });
            },

            myOnChange: function(event)
            {
                LOGGER.trace("ModifyDefenseUI.myOnChange()");
                var source = event.target;
                var modification = source.id;
                LOGGER.debug("ModifyDefenseUI.myOnChange() modification = " + modification);
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
            propTypes:
            {
                criticalHitCount: React.PropTypes.number.isRequired,
                hitCount: React.PropTypes.number.isRequired,
                imageBase: React.PropTypes.string.isRequired,
            },

            render: function()
            {
                var hitCount = this.props.hitCount;
                InputValidator.validateNotNull("hitCount", hitCount);
                var criticalHitCount = this.props.criticalHitCount;
                InputValidator.validateNotNull("criticalHitCount", criticalHitCount);

                var hitFilename = this.props.imageBase + "pilotCard/Damage32.jpg";
                var criticalHitFilename = this.props.imageBase + "pilotCard/CriticalDamage32.jpg";
                var columns = [];

                columns.push(React.DOM.td(
                {
                    key: columns.length,
                }, React.DOM.span(
                {}, "Damage: ")));
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
                }, React.DOM.span(
                {}, hitCount)));
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
                }, React.DOM.span(
                {}, criticalHitCount)));

                return React.DOM.table(
                {}, React.DOM.tbody(
                {}, React.DOM.tr(
                {}, columns)));
            },
        });

        return CombatUI;
    });
