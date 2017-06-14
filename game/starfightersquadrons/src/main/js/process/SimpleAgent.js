define(["Ability", "DamageCard", "Maneuver", "ManeuverComputer", "Phase", "PlayFormat", "RangeRuler", "Ship", "ShipAction", "UpgradeCard", "UpgradeHeader", "process/DamageAbility2", "process/ModifyAttackDiceAction", "process/ModifyDefenseDiceAction", "process/PilotAbility3", "process/Selector", "process/ShipActionAction", "process/UpgradeAbility2", "process/UpgradeAbility3"],
   function(Ability, DamageCard, Maneuver, ManeuverComputer, Phase, PlayFormat, RangeRuler, Ship, ShipAction, UpgradeCard, UpgradeHeader, DamageAbility2, ModifyAttackDiceAction, ModifyDefenseDiceAction, PilotAbility3, Selector, ShipActionAction, UpgradeAbility2, UpgradeAbility3)
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

         if (adjudicator.canDecloak(environment, token, Maneuver.BARREL_ROLL_LEFT_2_STANDARD))
         {
            answer.push(new ShipActionAction.Decloak(environment, token, Maneuver.BARREL_ROLL_LEFT_2_STANDARD));
         }

         if (adjudicator.canDecloak(environment, token, Maneuver.STRAIGHT_2_STANDARD))
         {
            answer.push(new ShipActionAction.Decloak(environment, token, Maneuver.STRAIGHT_2_STANDARD));
         }

         if (adjudicator.canDecloak(environment, token, Maneuver.BARREL_ROLL_RIGHT_2_STANDARD))
         {
            answer.push(new ShipActionAction.Decloak(environment, token, Maneuver.BARREL_ROLL_RIGHT_2_STANDARD));
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
         var targetLock = attacker.findTargetLockByDefender(defender);

         if (targetLock)
         {
            var upgrade = attacker.combatAction().weapon().upgrade();

            if (upgrade === undefined || upgrade.headerKey !== UpgradeHeader.ATTACK_TARGET_LOCK)
            {
               modificationKey = ModifyAttackDiceAction.Modification.SPEND_TARGET_LOCK;
               answer.push(new ModifyAttackDiceAction(store, attacker, defender, modificationKey));
            }
         }

         if (attacker.focusCount() > 0)
         {
            modificationKey = ModifyAttackDiceAction.Modification.SPEND_FOCUS;
            answer.push(new ModifyAttackDiceAction(store, attacker, defender, modificationKey));
         }

         var pilot = attacker.pilot();
         pilotKey = pilot.value;
         var attackerUsedPilots = Selector.attackerUsedPilots(store.getState(), attacker);

         if (!attackerUsedPilots.vizziniContains(pilotKey))
         {
            var pilotAbility = PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][pilotKey];

            if (pilotAbility !== undefined && pilotAbility.condition(store, attacker))
            {
               modificationKey = ModifyAttackDiceAction.Modification.USE_PILOT;
               answer.push(new ModifyAttackDiceAction(store, attacker, defender, modificationKey, pilotKey));
            }
         }

         modificationKey = ModifyAttackDiceAction.Modification.USE_UPGRADE;
         pilotKey = undefined;
         var attackerUsedUpgrades = Selector.attackerUsedUpgrades(store.getState(), attacker);

         attacker.upgradeKeys().forEach(function(upgradeKey)
         {
            if (!attackerUsedUpgrades.vizziniContains(upgradeKey))
            {
               var upgradeAbility = UpgradeAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][upgradeKey];

               if (upgradeAbility !== undefined && upgradeAbility.condition(store, attacker))
               {
                  answer.push(new ModifyAttackDiceAction(store, attacker, defender, modificationKey, pilotKey, upgradeKey));
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
         var modificationKey;
         var pilotKey;

         if (defender.evadeCount() > 0)
         {
            modificationKey = ModifyDefenseDiceAction.Modification.SPEND_EVADE;
            answer.push(new ModifyDefenseDiceAction(store, attacker, defender, modificationKey));
         }

         if (defender.focusCount() > 0)
         {
            modificationKey = ModifyDefenseDiceAction.Modification.SPEND_FOCUS;
            answer.push(new ModifyDefenseDiceAction(store, attacker, defender, modificationKey));
         }

         var pilot = defender.pilot();
         pilotKey = pilot.value;
         var defenderUsedPilots = Selector.defenderUsedPilots(store.getState(), attacker);

         if (!defenderUsedPilots.vizziniContains(pilotKey))
         {
            var pilotAbility = PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][pilotKey];

            if (pilotAbility !== undefined && pilotAbility.condition(store, defender))
            {
               modificationKey = ModifyDefenseDiceAction.Modification.USE_PILOT;
               answer.push(new ModifyDefenseDiceAction(store, attacker, defender, modificationKey, pilotKey));
            }
         }

         modificationKey = ModifyDefenseDiceAction.Modification.USE_UPGRADE;
         pilotKey = undefined;
         var defenderUsedUpgrades = Selector.defenderUsedUpgrades(store.getState(), attacker);

         defender.upgradeKeys().forEach(function(upgradeKey)
         {
            var upgrade = UpgradeCard.properties[upgradeKey];

            if (!defenderUsedUpgrades.vizziniContains(upgradeKey))
            {
               var upgradeAbility = UpgradeAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][upgradeKey];

               if (upgradeAbility !== undefined && upgradeAbility.condition(store, defender))
               {
                  answer.push(new ModifyDefenseDiceAction(store, attacker, defender, modificationKey, pilotKey, upgradeKey));
               }
            }
         });

         return answer;
      };

      SimpleAgent.prototype.determineValidShipActions = function(environment, adjudicator, token, shipActions0)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("adjudicator", adjudicator);
         InputValidator.validateNotNull("token", token);

         var shipActions = (shipActions0 !== undefined ? shipActions0 : token.shipActions());
         var answer = [];
         var store = environment.store();

         if (shipActions.vizziniContains(ShipAction.FOCUS))
         {
            answer.push(new ShipActionAction.Focus(store, token));
         }

         if (shipActions.vizziniContains(ShipAction.TARGET_LOCK))
         {
            var defenders = environment.getDefendersInRange(token);

            if (defenders && defenders.length > 0)
            {
               defenders.forEach(function(defender)
               {
                  // Only put choices without a current target lock.
                  if (!token.findTargetLockByDefender(defender))
                  {
                     answer.push(new ShipActionAction.SAATargetLock(store, token, defender));
                  }
               });
            }
         }

         if (shipActions.vizziniContains(ShipAction.BARREL_ROLL) &&
            adjudicator.canBarrelRoll(environment, token, Maneuver.BARREL_ROLL_LEFT_1_STANDARD))
         {
            answer.push(new ShipActionAction.BarrelRoll(environment, token, Maneuver.BARREL_ROLL_LEFT_1_STANDARD));
         }

         if (shipActions.vizziniContains(ShipAction.BARREL_ROLL) &&
            adjudicator.canBarrelRoll(environment, token, Maneuver.BARREL_ROLL_RIGHT_1_STANDARD))
         {
            answer.push(new ShipActionAction.BarrelRoll(environment, token, Maneuver.BARREL_ROLL_RIGHT_1_STANDARD));
         }

         if (shipActions.vizziniContains(ShipAction.BOOST) &&
            adjudicator.canBoost(environment, token, Maneuver.BANK_LEFT_1_STANDARD))
         {
            answer.push(new ShipActionAction.Boost(environment, token, Maneuver.BANK_LEFT_1_STANDARD));
         }

         if (shipActions.vizziniContains(ShipAction.BOOST) &&
            adjudicator.canBoost(environment, token, Maneuver.STRAIGHT_1_STANDARD))
         {
            answer.push(new ShipActionAction.Boost(environment, token, Maneuver.STRAIGHT_1_STANDARD));
         }

         if (shipActions.vizziniContains(ShipAction.BOOST) &&
            adjudicator.canBoost(environment, token, Maneuver.BANK_RIGHT_1_STANDARD))
         {
            answer.push(new ShipActionAction.Boost(environment, token, Maneuver.BANK_RIGHT_1_STANDARD));
         }

         if (shipActions.vizziniContains(ShipAction.SLAM))
         {
            var previousManeuver = token.maneuver();
            var speed = previousManeuver.speed;
            var ship = token.pilot().shipTeam.ship;
            var maneuverKeys = ship.maneuverKeys;

            maneuverKeys.forEach(function(maneuverKey)
            {
               // FIXME: check Adjudicator.canSlam()
               if (Maneuver.properties[maneuverKey].speed === speed)
               {
                  answer.push(new ShipActionAction.Slam(environment, token, maneuverKey));
               }
            });
         }

         if (shipActions.vizziniContains(ShipAction.EVADE))
         {
            answer.push(new ShipActionAction.Evade(store, token));
         }

         if (shipActions.vizziniContains(ShipAction.CLOAK))
         {
            answer.push(new ShipActionAction.Cloak(store, token));
         }

         if (shipActions.vizziniContains(ShipAction.REINFORCE))
         {
            if (token.parent !== undefined)
            {
               if (!token.parent.tokenFore().isDestroyed())
               {
                  answer.push(new ShipActionAction.Reinforce(store, token.parent.tokenFore()));
               }
               if (!token.parent.tokenAft().isDestroyed())
               {
                  answer.push(new ShipActionAction.Reinforce(store, token.parent.tokenAft()));
               }
            }
            else
            {
               answer.push(new ShipActionAction.Reinforce(store, token));
            }
         }

         var tokens;

         if (shipActions.vizziniContains(ShipAction.COORDINATE))
         {
            tokens = environment.getFriendlyTokensAtRange(token, RangeRuler.ONE);
            tokens.vizziniAddAll(environment.getFriendlyTokensAtRange(token, RangeRuler.TWO));

            tokens.forEach(function(myToken)
            {
               if (myToken !== token && (token.parent === undefined || token.parent !== myToken))
               {
                  answer.push(new ShipActionAction.Coordinate(myToken));
               }
            });
         }

         if (shipActions.vizziniContains(ShipAction.JAM))
         {
            tokens = environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE);
            tokens.vizziniAddAll(environment.getUnfriendlyTokensAtRange(token, RangeRuler.TWO));

            tokens.forEach(function(myToken)
            {
               var isHuge = myToken.isHuge();

               if (!isHuge && myToken.stressCount() < 2)
               {
                  answer.push(new ShipActionAction.Jam(store, myToken));
               }
            });
         }

         if (shipActions.vizziniContains(ShipAction.RECOVER))
         {
            if (token.parent !== undefined)
            {
               if (!token.parent.tokenFore().isDestroyed())
               {
                  answer.push(new ShipActionAction.Recover(token.parent.tokenFore()));
               }
               if (!token.parent.tokenAft().isDestroyed())
               {
                  answer.push(new ShipActionAction.Recover(token.parent.tokenAft()));
               }
            }
            else
            {
               answer.push(new ShipActionAction.Recover(token));
            }
         }

         if (shipActions0 === undefined)
         {
            var phaseKey = Phase.ACTIVATION_PERFORM_ACTION;

            token.upgradeKeys().forEach(function(upgradeKey)
            {
               var myAbility = UpgradeAbility2[phaseKey][upgradeKey];

               if (myAbility !== undefined && myAbility.condition(store, token))
               {
                  var ability = new Ability(UpgradeCard, upgradeKey, UpgradeAbility2, phaseKey);
                  answer.push(new ShipActionAction.SAAUpgradeCard(store, token, ability));
               }
            });

            token.criticalDamages().forEach(function(damageKey)
            {
               var myAbility = DamageAbility2[phaseKey][damageKey];

               if (myAbility !== undefined && myAbility.condition(store, token))
               {
                  var ability = new Ability(DamageCard, damageKey, DamageAbility2, phaseKey);
                  answer.push(new ShipActionAction.SAADamageCard(store, token, ability));
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

      SimpleAgent.prototype.getShipAction = function(environment, adjudicator, token, callback, shipActions0)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("adjudicator", adjudicator);
         InputValidator.validateNotNull("token", token);
         // shipActions0 optional.

         var shipActions = this.determineValidShipActions(environment, adjudicator, token, shipActions0);

         var answer = shipActions.vizziniRandomElement();

         callback(answer);
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
