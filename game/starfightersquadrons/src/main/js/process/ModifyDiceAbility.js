define(["DiceModification", "process/Action", "process/AttackDice", "process/DefenseDice", "process/Selector", "process/TargetLock"],
   function(DiceModification, Action, AttackDice, DefenseDice, Selector, TargetLock)
   {
      "use strict";
      var ModifyDiceAbility = {};

      ModifyDiceAbility.ATTACK_KEY = "modifyAttackDice";
      ModifyDiceAbility.DEFENSE_KEY = "modifyDefenseDice";

      ////////////////////////////////////////////////////////////////////////
      ModifyDiceAbility[ModifyDiceAbility.ATTACK_KEY] = {};

      ModifyDiceAbility[ModifyDiceAbility.ATTACK_KEY][DiceModification.ATTACK_SPEND_FOCUS] = {
         // Spend that token to change all of its focus results to hit results (on attack dice).
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            return token === attacker && token.focusCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            var attackDice = getAttackDice(attacker);
            attackDice.spendFocusToken();
            store.dispatch(Action.addFocusCount(attacker, -1));
            callback();
         },
      };

      ModifyDiceAbility[ModifyDiceAbility.ATTACK_KEY][DiceModification.ATTACK_SPEND_TARGET_LOCK] = {
         // Spend a target lock that it has on the defender to reroll any number of its attack dice.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            var targetLock = TargetLock.getFirst(store, attacker, defender);
            return token === attacker && targetLock !== undefined;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            var attackDice = getAttackDice(attacker);
            var defender = getDefender(attacker);
            attackDice.spendTargetLock();
            var targetLock = TargetLock.getFirst(store, attacker, defender);
            targetLock.delete();
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      ModifyDiceAbility[ModifyDiceAbility.DEFENSE_KEY] = {};

      ModifyDiceAbility[ModifyDiceAbility.DEFENSE_KEY][DiceModification.DEFENSE_SPEND_EVADE] = {
         // When defending, the ship may spend that token to add one additional evade result to his defense roll.
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            return token === attacker && token.evadeCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            var defenseDice = getDefenseDice(attacker);
            defenseDice.spendEvadeToken();
            store.dispatch(Action.addEvadeCount(defender, -1));
            callback();
         },
      };

      ModifyDiceAbility[ModifyDiceAbility.DEFENSE_KEY][DiceModification.DEFENSE_SPEND_FOCUS] = {
         // Spend that token to change all of its focus results to evade results (on defense dice).
         condition: function(store, token)
         {
            var attacker = getActiveToken(store);
            return token === attacker && token.focusCount() > 0;
         },
         consequent: function(store, token, callback)
         {
            var attacker = getActiveToken(store);
            var defender = getDefender(attacker);
            var defenseDice = getDefenseDice(attacker);
            defenseDice.spendFocusToken();
            store.dispatch(Action.addFocusCount(defender, -1));
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      function getActiveToken(store)
      {
         InputValidator.validateNotNull("store", store);

         return Selector.activeToken(store.getState());
      }

      function getAttackDice(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         var store = attacker.store();

         return AttackDice.get(store, attacker.id());
      }

      function getCombatAction(attacker)
      {
         InputValidator.validateNotNull("attacker", attacker);

         return attacker.combatAction();
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

         return DefenseDice.get(store, attacker.id());
      }

      ModifyDiceAbility.toString = function()
      {
         return "ModifyDiceAbility";
      };

      return ModifyDiceAbility;
   });
