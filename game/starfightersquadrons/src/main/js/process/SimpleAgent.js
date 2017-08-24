define(["Ability", "DamageCard", "DiceModification", "Maneuver", "ManeuverComputer", "Phase", "Pilot", "PlayFormat", "RangeRuler", "Ship", "ShipAction", "UpgradeCard", "UpgradeHeader",
  "process/DamageAbility2", "process/ModifyDiceAbility", "process/PilotAbility3", "process/Selector", "process/ShipActionAbility", "process/TargetLock", "process/UpgradeAbility2", "process/UpgradeAbility3"],
   function(Ability, DamageCard, DiceModification, Maneuver, ManeuverComputer, Phase, Pilot, PlayFormat, RangeRuler, Ship, ShipAction, UpgradeCard, UpgradeHeader,
      DamageAbility2, ModifyDiceAbility, PilotAbility3, Selector, ShipActionAbility, TargetLock, UpgradeAbility2, UpgradeAbility3)
   {
      "use strict";

      function SimpleAgent(name, teamKey)
      {
         InputValidator.validateNotEmpty("name", name);
         InputValidator.validateNotNull("teamKey", teamKey);

         this.name = function()
         {
            return name;
         };

         this.teamKey = function()
         {
            return teamKey;
         };
      }

      SimpleAgent.prototype.chooseAbility = function(environment, damageAbilities, pilotAbilities, upgradeAbilities, callback)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("damageAbilities", damageAbilities);
         InputValidator.validateNotNull("pilotAbilities", pilotAbilities);
         InputValidator.validateNotNull("upgradeAbilities", upgradeAbilities);
         InputValidator.validateNotNull("callback", callback);

         var ability = (damageAbilities.length > 0 ? damageAbilities.vizziniRandomElement() : undefined);

         if (ability === undefined)
         {
            ability = (upgradeAbilities.length > 0 ? upgradeAbilities.vizziniRandomElement() : undefined);

            if (ability === undefined)
            {
               ability = (pilotAbilities.length > 0 ? pilotAbilities.vizziniRandomElement() : undefined);
            }
         }

         var isAccepted = (ability !== undefined);

         callback(ability, isAccepted);
      };

      SimpleAgent.prototype.chooseWeaponAndDefender = function(environment, adjudicator, attacker, callback)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("adjudicator", adjudicator);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("callback", callback);

         var weapon;
         var defender;
         var attackerPosition = environment.getPositionFor(attacker);

         if (attackerPosition)
         {
            var choices = environment.createWeaponToRangeToDefenders(attacker);

            if (choices.length > 0)
            {
               var weaponData = choices.vizziniRandomElement();
               var myWeapon = weaponData.weapon;

               // The first entry should be the closest.
               var rangeToDefenders = weaponData.rangeToDefenders;
               var defenders = rangeToDefenders[0].defenders;
               weapon = myWeapon;
               defender = defenders[0];
            }
         }

         callback(weapon, defender);
      };

      SimpleAgent.prototype.dealDamage = function(environment, adjudicator, attacker, attackDice, defender, defenseDice,
         damageDealer, callback)
      {
         // Nothing to do.
      };

      SimpleAgent.prototype.determineValidDecloakActions = function(environment, adjudicator, token)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("adjudicator", adjudicator);
         InputValidator.validateNotNull("token", token);

         var answer = [];
         var context;

         if (adjudicator.canDecloak(environment, token, Maneuver.BARREL_ROLL_LEFT_2_STANDARD))
         {
            context = {
               maneuverKey: Maneuver.BARREL_ROLL_LEFT_2_STANDARD,
            };
            answer.push(new Ability(ShipAction, ShipAction.DECLOAK, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
         }

         if (adjudicator.canDecloak(environment, token, Maneuver.STRAIGHT_2_STANDARD))
         {
            context = {
               maneuverKey: Maneuver.STRAIGHT_2_STANDARD,
            };
            answer.push(new Ability(ShipAction, ShipAction.DECLOAK, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
         }

         if (adjudicator.canDecloak(environment, token, Maneuver.BARREL_ROLL_RIGHT_2_STANDARD))
         {
            context = {
               maneuverKey: Maneuver.BARREL_ROLL_RIGHT_2_STANDARD,
            };
            answer.push(new Ability(ShipAction, ShipAction.DECLOAK, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
         }

         return answer;
      };

      SimpleAgent.prototype.determineValidManeuvers = function(environment, token)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("token", token);

         var fromPosition = environment.getPositionFor(token);
         var shipBase = token.pilot().shipTeam.ship.shipBase;
         var maneuverKeys = token.maneuverKeys();
         LOGGER.trace("maneuverKeys.length = " + maneuverKeys.length + " for " + token);

         // Find the maneuvers which keep the ship on the battlefield.
         return maneuverKeys.filter(function(maneuverKey)
         {
            var maneuver = Maneuver.properties[maneuverKey];
            var toPosition = ManeuverComputer.computeToPosition(environment.playFormatKey(), maneuver, fromPosition,
               shipBase);
            var polygon;

            if (toPosition)
            {
               polygon = ManeuverComputer.computePolygon(shipBase, toPosition.x(), toPosition.y(), toPosition
                  .heading());
            }

            return (toPosition && PlayFormat.isPathInPlayArea(environment.playFormatKey(), polygon));
         });
      };

      SimpleAgent.prototype.determineValidModifyAttackDiceActions = function(store, attacker, defender)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);

         var answer = [];
         var modificationKey;
         var pilotKey;
         var targetLock = TargetLock.getFirst(store, attacker, defender);

         if (targetLock)
         {
            var upgrade = attacker.combatAction().weapon().upgrade();

            if (upgrade === undefined || upgrade.headerKey !== UpgradeHeader.ATTACK_TARGET_LOCK)
            {
               answer.push(new Ability(DiceModification, DiceModification.ATTACK_SPEND_TARGET_LOCK, ModifyDiceAbility, ModifyDiceAbility.ATTACK_KEY));
            }
         }

         if (attacker.focusCount() > 0)
         {
            answer.push(new Ability(DiceModification, DiceModification.ATTACK_SPEND_FOCUS, ModifyDiceAbility, ModifyDiceAbility.ATTACK_KEY));
         }

         var pilot = attacker.pilot();
         pilotKey = pilot.value;
         var attackerUsedPilots = Selector.attackerUsedPilots(store.getState(), attacker);

         if (!attackerUsedPilots.includes(pilotKey))
         {
            var pilotAbility = PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][pilotKey];

            if (pilotAbility !== undefined && pilotAbility.condition(store, attacker))
            {
               answer.push(new Ability(Pilot, pilotKey, PilotAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE));
            }
         }

         pilotKey = undefined;
         var attackerUsedUpgrades = Selector.attackerUsedUpgrades(store.getState(), attacker);

         attacker.upgradeKeys().forEach(function(upgradeKey)
         {
            if (!attackerUsedUpgrades.includes(upgradeKey))
            {
               var upgradeAbility = UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][upgradeKey];

               if (upgradeAbility !== undefined && upgradeAbility.condition(store, attacker))
               {
                  answer.push(new Ability(UpgradeCard, upgradeKey, UpgradeAbility3, Phase.COMBAT_MODIFY_ATTACK_DICE));
               }
            }
         });

         return answer;
      };

      SimpleAgent.prototype.determineValidModifyDefenseDiceActions = function(store, attacker, defender)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);

         var answer = [];
         var pilotKey;

         if (defender.evadeCount() > 0)
         {
            answer.push(new Ability(DiceModification, DiceModification.DEFENSE_SPEND_EVADE, ModifyDiceAbility, ModifyDiceAbility.DEFENSE_KEY));
         }

         if (defender.focusCount() > 0)
         {
            answer.push(new Ability(DiceModification, DiceModification.DEFENSE_SPEND_FOCUS, ModifyDiceAbility, ModifyDiceAbility.DEFENSE_KEY));
         }

         var pilot = defender.pilot();
         pilotKey = pilot.value;
         var defenderUsedPilots = Selector.defenderUsedPilots(store.getState(), attacker);

         if (!defenderUsedPilots.includes(pilotKey))
         {
            var pilotAbility = PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][pilotKey];

            if (pilotAbility !== undefined && pilotAbility.condition(store, defender))
            {
               answer.push(new Ability(Pilot, pilotKey, PilotAbility3, Phase.COMBAT_MODIFY_DEFENSE_DICE));
            }
         }

         pilotKey = undefined;
         var defenderUsedUpgrades = Selector.defenderUsedUpgrades(store.getState(), attacker);

         defender.upgradeKeys().forEach(function(upgradeKey)
         {
            var upgrade = UpgradeCard.properties[upgradeKey];

            if (!defenderUsedUpgrades.includes(upgradeKey))
            {
               var upgradeAbility = UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][upgradeKey];

               if (upgradeAbility !== undefined && upgradeAbility.condition(store, defender))
               {
                  answer.push(new Ability(UpgradeCard, upgradeKey, UpgradeAbility3, Phase.COMBAT_MODIFY_DEFENSE_DICE));
               }
            }
         });

         return answer;
      };

      SimpleAgent.prototype.determineValidShipActions = function(environment, adjudicator, token, shipActionKeys0)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("adjudicator", adjudicator);
         InputValidator.validateNotNull("token", token);

         var answer = [];

         if (!adjudicator.canSelectShipAction(token))
         {
            return answer;
         }

         var shipActionKeys = (shipActionKeys0 !== undefined ? shipActionKeys0 : token.shipActions());
         var store = environment.store();
         var usedShipActions = Selector.usedShipActions(store.getState(), token);
         shipActionKeys = shipActionKeys.filter(function(shipActionKey)
         {
            return !usedShipActions.includes(shipActionKey);
         });
         var context;

         if (shipActionKeys.includes(ShipAction.FOCUS))
         {
            answer.push(new Ability(ShipAction, ShipAction.FOCUS, ShipActionAbility, ShipActionAbility.ABILITY_KEY));
         }

         if (shipActionKeys.includes(ShipAction.TARGET_LOCK))
         {
            var defenders = environment.getDefendersInRange(token);

            if (defenders && defenders.length > 0)
            {
               defenders.forEach(function(defender)
               {
                  // Only put choices without a current target lock.
                  if (TargetLock.getFirst(store, token, defender) === undefined)
                  {
                     context = {
                        attacker: token,
                        defender: defender,
                     };
                     answer.push(new Ability(ShipAction, ShipAction.TARGET_LOCK, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
                  }
               });
            }
         }

         var maneuverKeys;

         if (shipActionKeys.includes(ShipAction.BARREL_ROLL))
         {
            maneuverKeys = [Maneuver.BARREL_ROLL_LEFT_1_STANDARD, Maneuver.BARREL_ROLL_RIGHT_1_STANDARD];

            maneuverKeys.forEach(function(maneuverKey)
            {
               if (adjudicator.canBarrelRoll(environment, token, maneuverKey))
               {
                  context = {
                     maneuverKey: maneuverKey,
                  };
                  answer.push(new Ability(ShipAction, ShipAction.BARREL_ROLL, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
               }
            });
         }

         if (shipActionKeys.includes(ShipAction.BOOST))
         {
            maneuverKeys = [Maneuver.BANK_LEFT_1_STANDARD, Maneuver.STRAIGHT_1_STANDARD, Maneuver.BANK_RIGHT_1_STANDARD];

            maneuverKeys.forEach(function(maneuverKey)
            {
               if (adjudicator.canBoost(environment, token, maneuverKey))
               {
                  context = {
                     maneuverKey: maneuverKey,
                  };
                  answer.push(new Ability(ShipAction, ShipAction.BOOST, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
               }
            });
         }

         if (shipActionKeys.includes(ShipAction.SLAM))
         {
            var ship = token.pilot().shipTeam.ship;
            maneuverKeys = ship.maneuverKeys;

            maneuverKeys.forEach(function(maneuverKey)
            {
               if (adjudicator.canSlam(environment, token, maneuverKey))
               {
                  context = {
                     maneuverKey: maneuverKey,
                  };
                  answer.push(new Ability(ShipAction, ShipAction.SLAM, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
               }
            });
         }

         if (shipActionKeys.includes(ShipAction.EVADE))
         {
            answer.push(new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY));
         }

         if (shipActionKeys.includes(ShipAction.CLOAK))
         {
            answer.push(new Ability(ShipAction, ShipAction.CLOAK, ShipActionAbility, ShipActionAbility.ABILITY_KEY));
         }

         if (shipActionKeys.includes(ShipAction.REINFORCE))
         {
            if (token.parent !== undefined)
            {
               if (!token.parent.tokenFore().isDestroyed())
               {
                  context = {
                     token: token.parent.tokenFore(),
                  };
                  answer.push(new Ability(ShipAction, ShipAction.REINFORCE, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
               }
               if (!token.parent.tokenAft().isDestroyed())
               {
                  context = {
                     token: token.parent.tokenAft(),
                  };
                  answer.push(new Ability(ShipAction, ShipAction.REINFORCE, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
               }
            }
            else
            {
               context = {
                  token: token,
               };
               answer.push(new Ability(ShipAction, ShipAction.REINFORCE, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
            }
         }

         var tokens;

         if (shipActionKeys.includes(ShipAction.COORDINATE))
         {
            tokens = environment.getFriendlyTokensAtRange(token, RangeRuler.ONE);
            tokens.vizziniAddAll(environment.getFriendlyTokensAtRange(token, RangeRuler.TWO));

            tokens.forEach(function(myToken)
            {
               if (myToken !== token && (token.parent === undefined || token.parent !== myToken))
               {
                  context = {
                     token: myToken,
                  };
                  answer.push(new Ability(ShipAction, ShipAction.COORDINATE, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
               }
            });
         }

         if (shipActionKeys.includes(ShipAction.JAM))
         {
            tokens = environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE);
            tokens.vizziniAddAll(environment.getUnfriendlyTokensAtRange(token, RangeRuler.TWO));

            tokens.forEach(function(myToken)
            {
               var isHuge = myToken.isHuge();

               if (!isHuge && myToken.stressCount() < 2)
               {
                  context = {
                     defender: myToken,
                  };
                  answer.push(new Ability(ShipAction, ShipAction.JAM, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
               }
            });
         }

         if (shipActionKeys.includes(ShipAction.RECOVER))
         {
            if (token.parent !== undefined)
            {
               if (!token.parent.tokenFore().isDestroyed())
               {
                  context = {
                     token: token.parent.tokenFore(),
                  };
                  answer.push(new Ability(ShipAction, ShipAction.RECOVER, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
               }
               if (!token.parent.tokenAft().isDestroyed())
               {
                  context = {
                     token: token.parent.tokenAft(),
                  };
                  answer.push(new Ability(ShipAction, ShipAction.RECOVER, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
               }
            }
            else
            {
               context = {
                  token: token,
               };
               answer.push(new Ability(ShipAction, ShipAction.RECOVER, ShipActionAbility, ShipActionAbility.ABILITY_KEY, context));
            }
         }

         if (shipActionKeys0 === undefined)
         {
            var phaseKey = Phase.ACTIVATION_PERFORM_ACTION;
            var usedUpgrades = Selector.usedUpgrades(store.getState(), token);

            token.upgradeKeys().forEach(function(upgradeKey)
            {
               var myUpgrade = UpgradeCard.properties[upgradeKey];

               if (myUpgrade && myUpgrade.headerKey === UpgradeHeader.ACTION)
               {
                  var myAbility = UpgradeAbility2[phaseKey][upgradeKey];

                  if (myAbility !== undefined && !usedUpgrades.includes(upgradeKey) && myAbility.condition(store, token))
                  {
                     answer.push(new Ability(UpgradeCard, upgradeKey, UpgradeAbility2, phaseKey));
                  }
               }
            });

            var usedDamages = Selector.usedDamages(store.getState(), token);

            token.criticalDamages().forEach(function(damageKey)
            {
               var myDamage = DamageCard.properties[damageKey];

               if (myDamage && myDamage.hasAction)
               {
                  var myAbility = DamageAbility2[phaseKey][damageKey];

                  if (myAbility !== undefined && !usedDamages.includes(damageKey) && myAbility.condition(store, token))
                  {
                     answer.push(new Ability(DamageCard, damageKey, DamageAbility2, phaseKey));
                  }
               }
            });
         }

         LOGGER.debug("SimpleAgent.determineValidShipActions() answer = " + answer);

         return answer;
      };

      SimpleAgent.prototype.getDecloakAction = function(environment, adjudicator, token, callback)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("adjudicator", adjudicator);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("callback", callback);

         var decloakActions = this.determineValidDecloakActions(environment, adjudicator, token);
         var answer = decloakActions.vizziniRandomElement();

         callback(token, answer);
      };

      SimpleAgent.prototype.getModifyAttackDiceAction = function(store, adjudicator, attacker, defender, callback)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("adjudicator", adjudicator);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);
         InputValidator.validateNotNull("callback", callback);

         var modifications = this.determineValidModifyAttackDiceActions(store, attacker, defender);
         modifications.push(null);

         var answer = modifications.vizziniRandomElement();

         callback(answer);
      };

      SimpleAgent.prototype.getModifyDefenseDiceAction = function(store, adjudicator, attacker, defender, callback)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("adjudicator", adjudicator);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);
         InputValidator.validateNotNull("callback", callback);

         var modifications = this.determineValidModifyDefenseDiceActions(store, attacker, defender);
         modifications.push(null);

         var answer = modifications.vizziniRandomElement();

         callback(answer);
      };

      SimpleAgent.prototype.getPlanningAction = function(environment, adjudicator, callback)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("adjudicator", adjudicator);
         InputValidator.validateNotNull("callback", callback);

         var team = this.teamKey();
         var tokens = environment.getTokensForTeam(team);
         var tokenToManeuver = {};

         tokens.forEach(function(token)
         {
            var validManeuvers = this.determineValidManeuvers(environment, token);

            LOGGER.trace("validManeuvers.length = " + validManeuvers.length + " for " + token);
            var maneuver = validManeuvers.vizziniRandomElement();

            LOGGER.trace("0 maneuver = " + maneuver + " for " + token);

            if (!maneuver)
            {
               // Ship fled the battlefield.
               var maneuvers = token.maneuverKeys();
               maneuver = maneuvers.vizziniRandomElement();
               LOGGER.trace("1 maneuver = " + maneuver + " for " + token);
            }

            tokenToManeuver[token] = maneuver;
         }, this);

         callback(tokenToManeuver);
      };

      SimpleAgent.prototype.getShipAction = function(environment, adjudicator, token, callback, shipActionKeys0)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("adjudicator", adjudicator);
         InputValidator.validateNotNull("token", token);
         // shipActionKeys0 optional.

         var shipActionKeys = this.determineValidShipActions(environment, adjudicator, token, shipActionKeys0);

         var answer = shipActionKeys.vizziniRandomElement();

         var isAccepted = (answer !== undefined);

         callback(answer, isAccepted);
      };

      SimpleAgent.prototype.isComputerAgent = function()
      {
         return true;
      };

      SimpleAgent.prototype.toString = function()
      {
         return this.name() + ", SimpleAgent, " + this.teamKey();
      };

      return SimpleAgent;
   });
