/*
 * Provides pilot abilities for the Combat Phase.
 */
"use strict";

define(["Phase", "Pilot", "RangeRuler", "ShipAction",
   "process/AttackDice", "process/DefenseDice", "process/Selector", "process/TargetLock", "process/TokenAction"],
   function(Phase, Pilot, RangeRuler, ShipAction,
      AttackDice, DefenseDice, Selector, TargetLock, TokenAction)
   {
      var PilotAbility3 = {};

      ////////////////////////////////////////////////////////////////////////
      PilotAbility3[Phase.COMBAT_START] = {};

      PilotAbility3[Phase.COMBAT_START][Pilot.COMMANDER_ALOZEN] = {
         // At the start of the Combat phase, you may acquire a target lock on an enemy ship at Range 1.
         condition: function(store, token)
         {
            var environment = store.getState().environment;
            var enemies = environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE);
            return enemies.length > 0;
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var shipActions0 = [ShipAction.TARGET_LOCK];
            var that = this;
            var finishCallback = function(shipActionAbility)
            {
               that.finishConsequent(store, token, shipActionAbility, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

            // Wait for agent to respond.
         },
         finishConsequent: function(store, token, shipActionAbility, callback)
         {
            if (shipActionAbility)
            {
               var consequent = shipActionAbility.consequent();
               consequent(store, token, callback, shipActionAbility.context());
            }
            else
            {
               callback();
            }
         },
      };

      PilotAbility3[Phase.COMBAT_START][Pilot.EPSILON_LEADER] = {
         // At the start of the Combat phase, remove 1 stress token from each friendly ship at Range 1.
         condition: function(store, token)
         {
            return true;
         },
         consequent: function(store, token, callback)
         {
            var environment = getEnvironment(store);
            var friends = environment.getFriendlyTokensAtRange(token, RangeRuler.ONE);
            friends.forEach(function(friend)
            {
               store.dispatch(TokenAction.addStressCount(friend, -1));
            });
            store.dispatch(TokenAction.addStressCount(token, -1));
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_START][Pilot.GURI] = {
         // At the start of the Combat phase, if you are at Range 1 of an enemy ship, you may assign 1 focus token to your ship.
         condition: function(store, token)
         {
            var environment = store.getState().environment;
            var enemies = environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE);
            return enemies.length > 0;
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(TokenAction.addFocusCount(token));
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      PilotAbility3[Phase.COMBAT_DECLARE_TARGET] = {};

      PilotAbility3[Phase.COMBAT_DECLARE_TARGET][Pilot.TARN_MISON] = {
         // When an enemy ship declares you as the target of an attack, you may acquire a target lock on that ship.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            return token.equals(defender);
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            TargetLock.newInstance(store, token, attacker, callback);
         },
      };

      ////////////////////////////////////////////////////////////////////////
      PilotAbility3[Phase.COMBAT_ROLL_ATTACK_DICE] = {};

      PilotAbility3[Phase.COMBAT_ROLL_ATTACK_DICE][Pilot.COLONEL_VESSERY] = {
         // When attacking, immediately after you roll attack dice, you may acquire a target lock on the defender if it already has a red target lock token.
         condition: function(store, token)
         {
            var defender = getDefender(token);
            var targetLocks = TargetLock.getByDefender(store, defender);
            return isActiveToken(store, token) && targetLocks.length > 0;
         },
         consequent: function(store, token, callback)
         {
            var defender = getDefender(token);
            TargetLock.newInstance(store, token, defender, callback);
         },
      };

      ////////////////////////////////////////////////////////////////////////
      PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE] = {};

      PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][Pilot.BOBA_FETT_SCUM] = {
         // When attacking or defending, you may reroll 1 of your dice for each enemy ship at Range 1.
         condition: function(store, token)
         {
            var attackDice = getAttackDice(token);
            var environment = store.getState().environment;
            var shipCount = environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE).length;
            return isActiveToken(store, token) && shipCount > 0 && (attackDice.blankCount() > 0 || attackDice.focusCount() > 0);
         },
         consequent: function(store, token, callback)
         {
            var attackDice = getAttackDice(token);
            var environment = getEnvironment(store);
            var shipCount = environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE).length;
            attackDice.rerollBlankAndFocus(shipCount);
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][Pilot.HORTON_SALM] = {
         // When attacking at Range 2-3, you may reroll any of your blank results.
         condition: function(store, token)
         {
            var rangeKey = getRangeKey(token);
            var attackDice = getAttackDice(token);
            return isActiveToken(store, token) && [RangeRuler.TWO, RangeRuler.THREE].includes(rangeKey) && attackDice.blankCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var attackDice = getAttackDice(token);
            attackDice.rerollAllBlank();
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][Pilot.IBTISAM] = {
         // When attacking or defending, if you have at least 1 stress token, you may reroll 1 of your dice.
         condition: function(store, token)
         {
            var attackDice = getAttackDice(token);
            return isActiveToken(store, token) && token.isStressed() && (attackDice.blankCount() > 0 || attackDice.focusCount() > 0);
         },
         consequent: function(store, token, callback)
         {
            var attackDice = getAttackDice(token);
            if (attackDice.blankCount() > 0)
            {
               attackDice.rerollBlank();
            }
            else if (attackDice.focusCount() > 0)
            {
               attackDice.rerollFocus();
            }
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][Pilot.KEYAN_FARLANDER] = {
         // When attacking, you may remove 1 stress token to change all of your Focus results to Hit results.
         condition: function(store, token)
         {
            var attackDice = getAttackDice(token);
            return isActiveToken(store, token) && token.isStressed() && attackDice.focusCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            token.removeStress();
            var attackDice = getAttackDice(token);
            attackDice.changeAllToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][Pilot.KIR_KANOS] = {
         // When attacking at Range 2-3, you may spend 1 evade token to add 1 Hit result to your roll.
         condition: function(store, token)
         {
            var rangeKey = getRangeKey(token);
            var attackDice = getAttackDice(token);
            return isActiveToken(store, token) && [RangeRuler.TWO, RangeRuler.THREE].includes(rangeKey) && attackDice.evadeCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(TokenAction.addEvadeCount(token, -1));
            var attackDice = getAttackDice(token);
            attackDice.addDie(AttackDice.Value.HIT);
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][Pilot.KRASSIS_TRELIX] = {
         // When attacking with a secondary weapon, you may reroll 1 attack die.
         condition: function(store, token)
         {
            var weapon = getWeapon(token);
            var attackDice = getAttackDice(token);
            return isActiveToken(store, token) && !weapon.isPrimary() && (attackDice.blankCount() > 0 || attackDice.focusCount() > 0);
         },
         consequent: function(store, token, callback)
         {
            var attackDice = getAttackDice(token);
            if (attackDice.blankCount() > 0)
            {
               attackDice.rerollBlank();
            }
            else if (attackDice.focusCount() > 0)
            {
               attackDice.rerollFocus();
            }
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][Pilot.OMEGA_ACE] = {
         // When attacking, you may spend a focus token and a target lock you have on the defender to change all of your results to Critical Hit results.
         condition: function(store, token)
         {
            var defender = getDefender(token);
            var targetLocks = TargetLock.getByDefender(store, defender);
            var attackDice = getAttackDice(token);
            return isActiveToken(store, token) && token.focusCount() > 0 && targetLocks.length > 0 && (attackDice.blankCount() > 0 || attackDice.focusCount() > 0 || attackDice.hitCount() > 0);
         },
         consequent: function(store, token, callback)
         {
            var defender = getDefender(token);
            spendFocusToken(store, token);
            spendTargetLock(store, token, defender);
            var attackDice = getAttackDice(token);
            attackDice.changeAllToValue(AttackDice.Value.BLANK, AttackDice.Value.CRITICAL_HIT);
            attackDice.changeAllToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
            attackDice.changeAllToValue(AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT);
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][Pilot.POE_DAMERON] = {
         // While attacking or defending, if you have a Focus token, you may change 1 of your Focus results to a Hit or Evade result.
         condition: function(store, token)
         {
            var attackDice = getAttackDice(token);
            return isActiveToken(store, token) && token.focusCount() > 0 && attackDice.focusCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var attackDice = getAttackDice(token);
            attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][Pilot.REAR_ADMIRAL_CHIRANEAU] = {
         // When attacking at Range 1-2, you may change 1 of your Focus results to a Critical Hit result.
         condition: function(store, token)
         {
            var rangeKey = getRangeKey(token);
            var attackDice = getAttackDice(token);
            return isActiveToken(store, token) && [RangeRuler.ONE, RangeRuler.TWO].includes(rangeKey) && attackDice.focusCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var attackDice = getAttackDice(token);
            attackDice.changeOneToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_MODIFY_ATTACK_DICE][Pilot.WINGED_GUNDARK] = {
         // When attacking at Range 1, you may change 1 of your Hit results to a Critical Hit result.
         condition: function(store, token)
         {
            var rangeKey = getRangeKey(token);
            var attackDice = getAttackDice(token);
            return isActiveToken(store, token) && rangeKey === RangeRuler.ONE && attackDice.hitCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var attackDice = getAttackDice(token);
            attackDice.changeOneToValue(AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT);
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE] = {};

      PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][Pilot.BOBA_FETT_SCUM] = {
         // When attacking or defending, you may reroll 1 of your dice for each enemy ship at Range 1.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            var defenseDice = getDefenseDice(attacker);
            var environment = store.getState().environment;
            var shipCount = environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE).length;
            return token.equals(defender) && shipCount > 0 && (defenseDice.blankCount() > 0 || defenseDice.focusCount() > 0);
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            var defenseDice = getDefenseDice(attacker);
            var environment = store.getState().environment;
            var shipCount = environment.getUnfriendlyTokensAtRange(token, RangeRuler.ONE).length;
            defenseDice.rerollBlankAndFocus(shipCount);
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][Pilot.EZRA_BRIDGER] = {
         // When defending, if you are stressed, you may change up to 2 of your focus results to evade results.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            var defenseDice = getDefenseDice(attacker);
            return token.equals(defender) && token.isStressed() && defenseDice.focusCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            var defenseDice = getDefenseDice(attacker);
            defenseDice.changeOneToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
            defenseDice.changeOneToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][Pilot.IBTISAM] = {
         // When attacking or defending, if you have at least 1 stress token, you may reroll 1 of your dice.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            var defenseDice = getDefenseDice(attacker);
            return token.equals(defender) && token.isStressed() && (defenseDice.blankCount() > 0 || defenseDice.focusCount() > 0);
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            var defenseDice = getDefenseDice(attacker);
            if (defenseDice.blankCount() > 0)
            {
               defenseDice.rerollBlank();
            }
            else if (defenseDice.focusCount() > 0)
            {
               defenseDice.rerollFocus();
            }
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][Pilot.LUKE_SKYWALKER] = {
         // When defending, you may change 1 of your Focus results to an Evade result.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            var defenseDice = getDefenseDice(attacker);
            return token.equals(defender) && defenseDice.focusCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            var defenseDice = getDefenseDice(attacker);
            defenseDice.changeOneToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_MODIFY_DEFENSE_DICE][Pilot.POE_DAMERON] = {
         // While attacking or defending, if you have a Focus token, you may change 1 of your Focus results to a Hit or Evade result.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            var defenseDice = getDefenseDice(attacker);
            return token.equals(defender) && token.focusCount() > 0 && defenseDice.focusCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            var defenseDice = getDefenseDice(attacker);
            defenseDice.changeOneToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      PilotAbility3[Phase.COMBAT_DEAL_DAMAGE] = {};

      PilotAbility3[Phase.COMBAT_DEAL_DAMAGE][Pilot.WHISPER] = {
         // After you perform an attack that hits, you may assign 1 focus token to your ship.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            return isActiveToken(store, token) && isDefenderHit(attacker);
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(TokenAction.addFocusCount(token));
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      PilotAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE] = {};

      PilotAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][Pilot.IG_88A] = {
         // After you perform an attack that destroys the defender, you may recover 1 shield.
         condition: function(store, token)
         {
            var defender = getDefender(token);
            return isActiveToken(store, token) && defender.isDestroyed();
         },
         consequent: function(store, token, callback)
         {
            token.recoverShield();
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][Pilot.LAETIN_ASHERA] = {
         // After you defend against an attack, if the attack did not hit, you may assign 1 evade token to your ship.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            return token.equals(defender) && !isDefenderHit(attacker);
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(TokenAction.addEvadeCount(token));
            callback();
         },
      };

      PilotAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][Pilot.TURR_PHENNIR] = {
         // After you perform an attack, you may perform a free boost or barrel roll action.
         condition: function(store, token)
         {
            var combatAction = getCombatAction(token);
            return isActiveToken(store, token) && combatAction !== undefined;
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var shipActions0 = [ShipAction.BARREL_ROLL, ShipAction.BOOST];
            var that = this;
            var finishCallback = function(shipActionAbility)
            {
               that.finishConsequent(store, token, shipActionAbility, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback, shipActions0);

            // Wait for agent to respond.
         },
         finishConsequent: function(store, token, shipActionAbility, callback)
         {
            if (shipActionAbility)
            {
               var consequent = shipActionAbility.consequent();
               consequent(store, token, callback, shipActionAbility.context());
            }
            else
            {
               callback();
            }
         },
      };

      PilotAbility3[Phase.COMBAT_AFTER_DEAL_DAMAGE][Pilot.VALEN_RUDOR] = {
         // After defending, you may perform a free action.
         condition: function(store, token)
         {
            var defender = getDefender(token);
            return token.equals(defender);
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var that = this;
            var finishCallback = function(shipActionAbility)
            {
               that.finishConsequent(store, token, shipActionAbility, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback);

            // Wait for agent to respond.
         },
         finishConsequent: function(store, token, shipActionAbility, callback)
         {
            if (shipActionAbility)
            {
               var consequent = shipActionAbility.consequent();
               consequent(store, token, callback, shipActionAbility.context());
            }
            else
            {
               callback();
            }
         },
      };

      ////////////////////////////////////////////////////////////////////////
      function getActiveToken(store)
      {
         InputValidator.validateNotNull("store", store);

         var environment = store.getState().environment;

         return environment.activeToken();
      }

      function getAttackDice(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var store = attacker.store();
         var combatAction = getCombatAction(attacker);
         var attackDiceClass = combatAction.attackDiceClass();

         return attackDiceClass.get(store, attacker.id());
      }

      function getCombatAction(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var store = attacker.store();

         return Selector.combatAction(store.getState(), attacker);
      }

      function getDefender(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         return getCombatAction(attacker).defender();
      }

      function getDefenseDice(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var store = attacker.store();
         var combatAction = getCombatAction(attacker);
         var defenseDiceClass = combatAction.defenseDiceClass();

         return defenseDiceClass.get(store, attacker.id());
      }

      function getEnvironment(store)
      {
         InputValidator.validateNotNull("store", store);

         return Selector.environment(store.getState());
      }

      function getRangeKey(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var store = attacker.store();

         return Selector.rangeKey(store.getState(), attacker);
      }

      function getWeapon(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         return getCombatAction(attacker).weapon();
      }

      function isActiveToken(store, token)
      {
         var activeToken = getActiveToken(store);

         return token.equals(activeToken);
      }

      function isDefenderHit(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var store = attacker.store();

         return Selector.isDefenderHit(store.getState(), attacker);
      }

      function spendFocusToken(store, attacker)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);

         store.dispatch(TokenAction.addFocusCount(attacker, -1));
      }

      function spendTargetLock(store, attacker, defender)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("attacker", attacker);
         InputValidator.validateNotNull("defender", defender);

         var targetLock = TargetLock.getFirst(store, attacker, defender);
         targetLock.delete();
      }

      PilotAbility3.toString = function()
      {
         return "PilotAbility3";
      };

      if (Object.freeze)
      {
         Object.freeze(PilotAbility3);
      }

      return PilotAbility3;
   });
