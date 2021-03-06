/*
 * Provides damage abilities for the Activation Phase.
 */
"use strict";

define(["process/AttackDice", "DamageCard", "Phase", "process/Action", "process/Selector", "process/TokenAction"],
   function(AttackDice, DamageCard, Phase, Action, Selector, TokenAction)
   {
      var DamageAbility2 = {};

      ////////////////////////////////////////////////////////////////////////
      DamageAbility2[Phase.ACTIVATION_REVEAL_DIAL] = {};

      DamageAbility2[Phase.ACTIVATION_REVEAL_DIAL][DamageCard.SHAKEN_PILOT_V2] = {
         // During the Planning phase, you cannot be assigned straight maneuvers. When you reveal a maneuver, flip this card facedown.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            flipCardFacedown(store, token, DamageCard.SHAKEN_PILOT_V2);
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION] = {};

      DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.CONSOLE_FIRE] = {
         // Action: Flip this card facedown.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            flipCardFacedown(store, token, DamageCard.CONSOLE_FIRE);
            callback();
         },
      };

      DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.CONSOLE_FIRE_V2] = {
         // Action: Flip this card facedown.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            flipCardFacedown(store, token, DamageCard.CONSOLE_FIRE_V2);
            callback();
         },
      };

      DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.DAMAGED_SENSOR_ARRAY] = {
         // Action: Roll 1 attack die. On a Hit result, flip this card facedown.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            if (AttackDice.rollRandomValue() === AttackDice.Value.HIT)
            {
               flipCardFacedown(store, token, DamageCard.DAMAGED_SENSOR_ARRAY);
            }
            callback();
         },
      };

      DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.DAMAGED_SENSOR_ARRAY_V2] = {
         // Action: Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            var attackDie = AttackDice.rollRandomValue();
            if ([AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT].includes(attackDie))
            {
               flipCardFacedown(store, token, DamageCard.DAMAGED_SENSOR_ARRAY_V2);
            }
            callback();
         },
      };

      DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.LOOSE_STABILIZER_V2] = {
         // Action: Flip this card facedown.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            flipCardFacedown(store, token, DamageCard.LOOSE_STABILIZER_V2);
            callback();
         },
      };

      DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.MAJOR_HULL_BREACH_V2] = {
         // Action: Flip this card facedown.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            flipCardFacedown(store, token, DamageCard.MAJOR_HULL_BREACH_V2);
            callback();
         },
      };

      DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.STRUCTURAL_DAMAGE] = {
         // Action: Roll 1 attack die. On a Hit result, flip this card facedown.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            if (AttackDice.rollRandomValue() === AttackDice.Value.HIT)
            {
               flipCardFacedown(store, token, DamageCard.STRUCTURAL_DAMAGE);
            }
            callback();
         },
      };

      DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.STRUCTURAL_DAMAGE_V2] = {
         // Action: Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            var attackDie = AttackDice.rollRandomValue();
            if ([AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT].includes(attackDie))
            {
               flipCardFacedown(store, token, DamageCard.STRUCTURAL_DAMAGE_V2);
            }
            callback();
         },
      };

      DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.WEAPON_MALFUNCTION] = {
         // Action: Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            var attackDie = AttackDice.rollRandomValue();
            if ([AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT].includes(attackDie))
            {
               flipCardFacedown(store, token, DamageCard.WEAPON_MALFUNCTION);
            }
            callback();
         },
      };

      DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][DamageCard.WEAPONS_FAILURE_V2] = {
         // Action: Roll 1 attack die. On a Hit or Critical Hit result, flip this card facedown.
         condition: function(store, token)
         {
            return isActiveToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            var attackDie = AttackDice.rollRandomValue();
            if ([AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT].includes(attackDie))
            {
               flipCardFacedown(store, token, DamageCard.WEAPONS_FAILURE_V2);
            }
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      function flipCardFacedown(store, token, damageKey)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("damageKey", damageKey);

         store.dispatch(TokenAction.removeTokenCriticalDamage(token, damageKey));
         store.dispatch(TokenAction.addTokenDamage(token, damageKey));
      }

      function getActiveToken(store)
      {
         InputValidator.validateNotNull("store", store);

         var environment = store.getState().environment;

         return environment.activeToken();
      }

      function isActiveToken(store, token)
      {
         var activeToken = getActiveToken(store);

         return token.equals(activeToken);
      }

      DamageAbility2.toString = function()
      {
         return "DamageAbility2";
      };

      if (Object.freeze)
      {
         Object.freeze(DamageAbility2);
      }

      return DamageAbility2;
   });
