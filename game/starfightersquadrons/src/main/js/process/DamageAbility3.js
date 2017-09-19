/*
 * Provides damage abilities for the Combat Phase.
 */
define(["process/AttackDice", "DamageCard", "Phase", "process/Selector"],
   function(AttackDice, DamageCard, Phase, Selector)
   {
      "use strict";
      var DamageAbility3 = {};

      ////////////////////////////////////////////////////////////////////////
      DamageAbility3[Phase.COMBAT_START] = {};

      DamageAbility3[Phase.COMBAT_START][DamageCard.CONSOLE_FIRE] = {
         // At the start of each Combat phase, roll 1 attack die. On a Hit result, suffer 1 damage.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            if (AttackDice.rollRandomValue() === AttackDice.Value.HIT)
            {
               var environment = store.getState().environment;
               token.receiveDamage(environment.drawDamage());
            }
            if (callback !== undefined) callback();
         },
      };

      DamageAbility3[Phase.COMBAT_START][DamageCard.CONSOLE_FIRE_V2] = {
         // At the start of each Combat phase, roll 1 attack die. On a Hit result, suffer 1 damage.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            if (AttackDice.rollRandomValue() === AttackDice.Value.HIT)
            {
               var environment = store.getState().environment;
               token.receiveDamage(environment.drawDamage());
            }
            if (callback !== undefined) callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      function getActiveToken(store)
      {
         InputValidator.validateNotNull("store", store);

         return Selector.activeToken(store.getState());
      }

      function isActiveToken(store, token)
      {
         var activeToken = getActiveToken(store);

         return token.equals(activeToken);
      }

      DamageAbility3.toString = function()
      {
         return "DamageAbility3";
      };

      if (Object.freeze)
      {
         Object.freeze(DamageAbility3);
      }

      return DamageAbility3;
   });
