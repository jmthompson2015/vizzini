define(["Phase", "process/AttackDice", "process/DefenseDice", "process/SimpleAgent", "process/ui/AbilityChooser", "process/ui/CombatUI", "process/ui/PlanningPanel", "process/ui/WeaponAndDefenderChooser"],
   function(Phase, AttackDice, DefenseDice, SimpleAgent, AbilityChooser, CombatUI, PlanningPanel, WeaponAndDefenderChooser)
   {
      "use strict";

      function HumanAgent(name, teamKey, inputAreaId, iconBase, imageBase)
      {
         InputValidator.validateNotEmpty("name", name);
         InputValidator.validateNotNull("teamKey", teamKey);
         InputValidator.validateNotNull("inputAreaId", inputAreaId);
         InputValidator.validateNotNull("iconBase", iconBase);
         InputValidator.validateNotNull("imageBase", imageBase);

         this.name = function()
         {
            return name;
         };

         this.teamKey = function()
         {
            return teamKey;
         };

         this.inputAreaId = function()
         {
            return inputAreaId;
         };

         this.imageBase = function()
         {
            return imageBase;
         };

         this.isComputerAgent = function()
         {
            return false;
         };

         var store;
         var environment;
         var attacker;
         var attackDice;
         var defender;
         var defenseDice;
         var chooseAbilityCallback;
         var dealDamageCallback;
         var decloakActionCallback;
         var modifyAttackCallback;
         var modifyDefenseCallback;
         var planningCallback;
         var shipActionCallback;
         var weaponAndDefenderCallback;

         this.chooseAbilityCallback = function()
         {
            return chooseAbilityCallback;
         };

         this.dealDamageCallback = function()
         {
            return dealDamageCallback;
         };

         this.decloakActionCallback = function()
         {
            return decloakActionCallback;
         };

         this.modifyAttackCallback = function()
         {
            return modifyAttackCallback;
         };

         this.modifyDefenseCallback = function()
         {
            return modifyDefenseCallback;
         };

         this.planningCallback = function()
         {
            return planningCallback;
         };

         this.shipActionCallback = function()
         {
            return shipActionCallback;
         };

         this.weaponAndDefenderCallback = function()
         {
            return weaponAndDefenderCallback;
         };

         this.chooseAbility = function(environment, damageAbilities, pilotAbilities, upgradeAbilities, callback)
         {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("damageAbilities", damageAbilities);
            InputValidator.validateNotNull("pilotAbilities", pilotAbilities);
            InputValidator.validateNotNull("upgradeAbilities", upgradeAbilities);
            InputValidator.validateNotNull("callback", callback);

            chooseAbilityCallback = callback;

            if (damageAbilities.length > 0 || pilotAbilities.length > 0 || upgradeAbilities.length > 0)
            {
               var element = React.createElement(AbilityChooser,
               {
                  damages: damageAbilities,
                  iconBase: iconBase,
                  imageBase: imageBase,
                  onChange: this.finishChooseAbility.bind(this),
                  pilots: pilotAbilities,
                  shipActions: [],
                  token: environment.activeToken(),
                  upgrades: upgradeAbilities,
               });
               ReactDOM.render(element, document.getElementById(this.inputAreaId()));
               window.dispatchEvent(new Event('resize'));

               // Wait for the user to respond.
            }
            else
            {
               setTimeout(this.finishChooseAbility.bind(this), 100);
            }
         };

         this.chooseWeaponAndDefender = function(environment, adjudicator, attacker, callback)
         {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("callback", callback);

            weaponAndDefenderCallback = callback;

            var choices = environment.createWeaponToRangeToDefenders(attacker);

            if (choices.length > 0)
            {
               var element = React.createElement(WeaponAndDefenderChooser,
               {
                  attacker: attacker,
                  choices: choices,
                  callback: this.finishWeaponAndDefender.bind(this),
               });
               ReactDOM.render(element, document.getElementById(this.inputAreaId()));
               window.dispatchEvent(new Event('resize'));

               // Wait for the user to respond.
            }
            else
            {
               weaponAndDefenderCallback();
            }
         };

         this.dealDamage = function(environment, adjudicator, attacker, attackDice, defender, defenseDice,
            damageDealer, callback)
         {
            InputValidator.validateNotNull("damageDealer", damageDealer);
            InputValidator.validateNotNull("callback", callback);

            dealDamageCallback = callback;

            var element = React.createElement(CombatUI,
            {
               attacker: attacker,
               attackDice: attackDice,
               criticalHitCount: damageDealer.criticalHits(),
               defender: defender,
               defenseDice: defenseDice,
               hitCount: damageDealer.hits(),
               iconBase: iconBase,
               imageBase: imageBase,
               okFunction: this.finishDealDamage.bind(this),
               phase: Phase.properties[store.getState().phaseKey],
            });

            ReactDOM.render(element, document.getElementById(this.inputAreaId()));
            window.dispatchEvent(new Event('resize'));
         };

         this.getDecloakAction = function(environmentIn, adjudicator, tokenIn, callback)
         {
            InputValidator.validateNotNull("environment", environmentIn);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("token", tokenIn);
            InputValidator.validateNotNull("callback", callback);

            environment = environmentIn;
            attacker = tokenIn;
            decloakActionCallback = callback;

            var decloakActions = SimpleAgent.prototype.determineValidDecloakActions(environment, adjudicator, attacker);

            var callback2 = function(decloakAction)
            {
               this.finishDecloakAction(environment, attacker, decloakAction);
            };
            var element = React.createElement(AbilityChooser,
            {
               damages: [],
               iconBase: iconBase,
               imageBase: imageBase,
               onChange: callback2.bind(this),
               pilots: [],
               shipActions: decloakActions,
               token: attacker,
               upgrades: [],
            });
            ReactDOM.render(element, document.getElementById(this.inputAreaId()));
            window.dispatchEvent(new Event('resize'));

            // Wait for the user to respond.
         };

         this.getModifyAttackDiceAction = function(storeIn, adjudicator, attackerIn, defenderIn, callback)
         {
            InputValidator.validateNotNull("store", storeIn);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("attacker", attackerIn);
            InputValidator.validateNotNull("defender", defenderIn);
            InputValidator.validateNotNull("callback", callback);

            store = storeIn;
            attacker = attackerIn;
            attackDice = AttackDice.get(store, attacker.id());
            defender = defenderIn;
            modifyAttackCallback = callback;

            var modifications = SimpleAgent.prototype.determineValidModifyAttackDiceActions.call(this, store, attacker, defender);

            if (modifications.length > 0)
            {
               var element = React.createElement(CombatUI,
               {
                  attacker: attacker,
                  attackDice: attackDice,
                  defender: defender,
                  iconBase: iconBase,
                  imageBase: imageBase,
                  modifications: modifications,
                  okFunction: finishModifyAttackDice,
                  phase: Phase.properties[store.getState().phaseKey],
               });
               ReactDOM.render(element, document.getElementById(this.inputAreaId()));
               window.dispatchEvent(new Event('resize'));

               // Wait for the user to respond.
            }
            else
            {
               modifyAttackCallback();
            }
         };

         this.getModifyDefenseDiceAction = function(storeIn, adjudicator, attackerIn, defenderIn, callback)
         {
            store = storeIn;
            attacker = attackerIn;
            attackDice = AttackDice.get(store, attacker.id());
            defender = defenderIn;
            defenseDice = DefenseDice.get(store, attacker.id());
            modifyDefenseCallback = callback;

            var modifications = SimpleAgent.prototype.determineValidModifyDefenseDiceActions.call(this, store, attacker, defender);

            if (modifications.length > 0)
            {
               var element = React.createElement(CombatUI,
               {
                  attacker: attacker,
                  attackDice: attackDice,
                  defender: defender,
                  defenseDice: defenseDice,
                  iconBase: iconBase,
                  imageBase: imageBase,
                  modifications: modifications,
                  okFunction: finishModifyDefenseDice,
                  phase: Phase.properties[store.getState().phaseKey],
               });
               ReactDOM.render(element, document.getElementById(this.inputAreaId()));
               window.dispatchEvent(new Event('resize'));

               // Wait for the user to respond.
            }
            else
            {
               modifyDefenseCallback();
            }
         };

         this.getPlanningAction = function(environment, adjudicator, callback)
         {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("callback", callback);

            planningCallback = callback;

            var tokens = environment.getTokensForTeam(teamKey);
            tokens.sort(function(token0, token1)
            {
               var id0 = token0.id();
               var id1 = token1.id();
               return id0 - id1;
            });
            var self = this;
            var element = React.createElement(PlanningPanel,
            {
               agent: self,
               callback: this.finishPlanningAction.bind(this),
               environment: environment,
               imageBase: imageBase,
               tokens: tokens,
            });
            ReactDOM.render(element, document.getElementById(this.inputAreaId()));
            window.dispatchEvent(new Event('resize'));

            // Wait for the user to respond.
         };

         this.getShipAction = function(environment, adjudicator, token, callback, shipActions0)
         {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);
            InputValidator.validateNotNull("token", token);

            shipActionCallback = callback;

            var shipActions = SimpleAgent.prototype.determineValidShipActions.call(this, environment, adjudicator, token, shipActions0);

            if (shipActions.length > 0)
            {
               var element = React.createElement(AbilityChooser,
               {
                  damages: [],
                  iconBase: iconBase,
                  imageBase: imageBase,
                  onChange: this.finishShipAction.bind(this),
                  pilots: [],
                  shipActions: shipActions,
                  token: environment.activeToken(),
                  upgrades: [],
               });
               ReactDOM.render(element, document.getElementById(this.inputAreaId()));
               window.dispatchEvent(new Event('resize'));

               // Wait for the user to respond.
            }
            else
            {
               setTimeout(this.finishShipAction.bind(this), 1000);
            }
         };

         function finishModifyAttackDice(modification)
         {
            var answer;

            if (modification && modification !== null && modification !== "null")
            {
               answer = modification;
            }

            var isAccepted = (answer !== undefined && answer !== null);

            modifyAttackCallback(answer, isAccepted);
         }

         function finishModifyDefenseDice(modification)
         {
            var answer;

            if (modification && modification !== null && modification !== "null")
            {
               answer = modification;
            }

            var isAccepted = (answer !== undefined && answer !== null);

            modifyDefenseCallback(answer, isAccepted);
         }
      }

      HumanAgent.prototype.finishChooseAbility = function(ability, isAccepted, inputAreaId)
      {
         LOGGER.trace("HumanAgent.finishChooseAbility() start");

         // Handle the user response.
         var element = document.getElementById(this.inputAreaId());
         element.innerHTML = "";
         window.dispatchEvent(new Event('resize'));
         LOGGER.trace("HumanAgent.finishChooseAbility() end");

         this.chooseAbilityCallback()(ability, isAccepted);
      };

      HumanAgent.prototype.finishDealDamage = function()
      {
         LOGGER.trace("HumanAgent.finishDealDamage() start");

         // Handle the user response.
         var element = document.getElementById(this.inputAreaId());
         element.innerHTML = "";
         window.dispatchEvent(new Event('resize'));
         LOGGER.trace("HumanAgent.finishDealDamage() end");

         this.dealDamageCallback()();
      };

      HumanAgent.prototype.finishDecloakAction = function(environment, token, decloakAbility)
      {
         LOGGER.trace("HumanAgent.finishDecloakAction() start");
         LOGGER.debug("decloakAbility = " + decloakAbility);
         LOGGER.debug("decloakAbility.context().maneuverKey = " + decloakAbility.context().maneuverKey);

         // Handle the user response.
         var element = document.getElementById(this.inputAreaId());
         element.innerHTML = "";
         window.dispatchEvent(new Event('resize'));
         LOGGER.trace("HumanAgent.finishDecloakAction() end");

         this.decloakActionCallback()(token, decloakAbility);
      };

      HumanAgent.prototype.finishPlanningAction = function(tokenToManeuver)
      {
         LOGGER.trace("HumanAgent.finishPlanningAction() start");

         // Handle the user response.
         var element = document.getElementById(this.inputAreaId());
         element.innerHTML = "";
         window.dispatchEvent(new Event('resize'));
         LOGGER.trace("HumanAgent.finishPlanningAction() end");

         this.planningCallback()(tokenToManeuver);
      };

      HumanAgent.prototype.finishShipAction = function(shipAction, isAccepted)
      {
         LOGGER.trace("HumanAgent.finishShipAction() start");

         // Handle the user response.
         var element = document.getElementById(this.inputAreaId());
         element.innerHTML = "";
         window.dispatchEvent(new Event('resize'));
         LOGGER.trace("HumanAgent.finishShipAction() end");

         this.shipActionCallback()(shipAction, isAccepted);
      };

      HumanAgent.prototype.finishWeaponAndDefender = function(weapon, defender)
      {
         LOGGER.trace("HumanAgent.finishWeaponAndDefender() start");

         // Handle the user response.
         var element = document.getElementById(this.inputAreaId());
         element.innerHTML = "";
         window.dispatchEvent(new Event('resize'));
         LOGGER.trace("HumanAgent.finishWeaponAndDefender() end");

         this.weaponAndDefenderCallback()(weapon, defender);
      };

      HumanAgent.prototype.toString = function()
      {
         return this.name() + ", HumanAgent, " + this.teamKey();
      };

      return HumanAgent;
   });
