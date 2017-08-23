define(["DiceModification", "Phase", "Pilot", "UpgradeCard",
  "process/AttackDice", "process/DefenseDice", "process/ModifyDiceAbility",
  "process/ui/AbilityUI", "../../../../../../../coreweb/src/main/js/ui/InputPanel2"],
   function(DiceModification, Phase, Pilot, UpgradeCard,
      AttackDice, DefenseDice, ModifyDiceAbility,
      AbilityUI, InputPanel)
   {
      "use strict";
      var CombatUI = React.createClass(
      {
         propTypes:
         {
            attacker: PropTypes.object.isRequired,
            attackDice: PropTypes.object.isRequired,
            defender: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,
            phase: PropTypes.object.isRequired,

            criticalHitCount: PropTypes.number,
            defenseDice: PropTypes.object,
            hitCount: PropTypes.number,
            modifications: PropTypes.array,
            okFunction: PropTypes.func,
         },

         render: function()
         {
            var phase = this.props.phase;
            var attacker = this.props.attacker;
            var defender = this.props.defender;
            var attackDice = this.props.attackDice;
            var defenseDice = this.props.defenseDice;
            var modifications = this.props.modifications;

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
            {}, "Weapon: " + attacker.combatAction().weapon()))));

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

            if (attackDice.size() > 0 && phase.value === Phase.COMBAT_MODIFY_ATTACK_DICE && modifications !== undefined)
            {
               // Modify Attack Dice panel.
               var modifyAttackPanel = React.createElement(CombatUI.ModifyAttackUI,
               {
                  attacker: attacker,
                  imageBase: this.props.imageBase,
                  modifications: modifications,
                  onChange: this.ok,
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

               if (defenseDice.size() > 0 && phase.value === Phase.COMBAT_MODIFY_DEFENSE_DICE && modifications !== undefined)
               {
                  // Modify Defense Dice panel.
                  var modifyDefensePanel = React.createElement(CombatUI.ModifyDefenseUI,
                  {
                     defender: defender,
                     imageBase: this.props.imageBase,
                     modifications: modifications,
                     onChange: this.ok,
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

         createTitle: function(phase)
         {
            var answer = "Combat";

            switch (phase.value)
            {
               case Phase.COMBAT_MODIFY_ATTACK_DICE:
                  answer += ": Modify Attack Dice";
                  break;
               case Phase.COMBAT_MODIFY_DEFENSE_DICE:
                  answer += ": Modify Defense Dice";
                  break;
               case Phase.COMBAT_NOTIFY_DAMAGE:
                  answer += ": Deal Damage";
                  break;
            }

            return answer;
         },

         ok: function(modification)
         {
            LOGGER.debug("CombatUI ok()");
            var answer;

            if (modification && modification.consequent)
            {
               answer = modification;
            }

            LOGGER.debug("CombatUI.ok() modification = " + modification + " " + (typeof modification));

            var okFunction = this.props.okFunction;

            if (okFunction)
            {
               okFunction(answer);
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
            dice: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,
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
            dice: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,
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
            attacker: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,
            modifications: PropTypes.array.isRequired,
            onChange: PropTypes.func.isRequired,
         },

         render: function()
         {
            var modifications = this.props.modifications;
            var attacker = this.props.attacker;
            var imageBase = this.props.imageBase;
            var labelFunction = function(value)
            {
               var answer;

               switch (value.source())
               {
                  case Pilot:
                     var pilot = Pilot.properties[value.sourceKey()];
                     answer = createPilotLabel(pilot, imageBase);
                     break;
                  case UpgradeCard:
                     var upgrade = UpgradeCard.properties[value.sourceKey()];
                     answer = createUpgradeLabel(upgrade, imageBase);
                     break;
                  default:
                     answer = DiceModification.properties[value.sourceKey()].name;
               }

               return answer;
            };

            return React.createElement(InputPanel,
            {
               type: InputPanel.Type.RADIO,
               values: modifications,
               name: "selectModifyAttack",
               labelFunction: labelFunction,
               onChange: this.myOnChange,
               panelClass: "combatChoicePanel",
            });
         },

         myOnChange: function(event, selected)
         {
            LOGGER.trace("ModifyAttackUI.myOnChange()");
            LOGGER.debug("ModifyAttackUI.myOnChange() modification = " + selected + " " + (typeof selected));
            this.props.onChange(selected);
         },
      });

      CombatUI.ModifyDefenseUI = React.createClass(
      {
         propTypes:
         {
            defender: PropTypes.object.isRequired,
            imageBase: PropTypes.string.isRequired,
            modifications: PropTypes.array.isRequired,
            onChange: PropTypes.func.isRequired,
         },

         render: function()
         {
            var modifications = this.props.modifications;
            var defender = this.props.defender;
            var imageBase = this.props.imageBase;
            var labelFunction = function(value)
            {
               var answer;

               switch (value.source())
               {
                  case Pilot:
                     var pilot = Pilot.properties[value.sourceKey()];
                     answer = createPilotLabel(pilot, imageBase);
                     break;
                  case UpgradeCard:
                     var upgrade = UpgradeCard.properties[value.sourceKey()];
                     answer = createUpgradeLabel(upgrade, imageBase);
                     break;
                  default:
                     answer = DiceModification.properties[value.sourceKey()].name;
               }

               return answer;
            };

            return React.createElement(InputPanel,
            {
               type: InputPanel.Type.RADIO,
               values: modifications,
               name: "selectModifyDefense",
               labelFunction: labelFunction,
               onChange: this.myOnChange,
               panelClass: "combatChoicePanel",
            });
         },

         myOnChange: function(event, selected)
         {
            LOGGER.trace("ModifyDefenseUI.myOnChange()");
            LOGGER.debug("ModifyDefenseUI.myOnChange() modification = " + selected + " " + (typeof selected));
            this.props.onChange(selected);
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
            criticalHitCount: PropTypes.number.isRequired,
            hitCount: PropTypes.number.isRequired,
            imageBase: PropTypes.string.isRequired,
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

      function createPilotLabel(pilot, imageBase)
      {
         return React.createElement(AbilityUI.Pilot,
         {
            pilot: pilot,
            imageBase: imageBase,
         });
      }

      function createUpgradeLabel(upgrade, imageBase)
      {
         return React.createElement(AbilityUI.Upgrade,
         {
            upgrade: upgrade,
            imageBase: imageBase,
         });
      }

      return CombatUI;
   });
