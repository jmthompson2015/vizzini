/*
 * Provides damage abilities for Events.
 */
define(["process/AttackDice", "DamageCard", "Difficulty", "Event", "Maneuver", "process/Action"],
   function(AttackDice, DamageCard, Difficulty, Event, Maneuver, Action)
   {
      "use strict";
      var DamageAbility0 = {};

      ////////////////////////////////////////////////////////////////////////
      DamageAbility0[Event.AFTER_EXECUTE_MANEUVER] = {};

      DamageAbility0[Event.AFTER_EXECUTE_MANEUVER][DamageCard.LOOSE_STABILIZER_V2] = {
         // After you execute a white maneuver, receive 1 stress token.
         condition: function(store, token)
         {
            var eventToken = getEventToken(store);
            var maneuver = getManeuver(token);
            return token === eventToken && maneuver !== undefined && maneuver.difficultyKey === Difficulty.STANDARD;
         },
         consequent: function(store, token, callback)
         {
            token.receiveStress();
            callback();
         },
      };

      DamageAbility0[Event.AFTER_EXECUTE_MANEUVER][DamageCard.MINOR_HULL_BREACH] = {
         // After executing a red maneuver, roll 1 attack die. On a Hit result, suffer 1 damage.
         condition: function(store, token)
         {
            var eventToken = getEventToken(store);
            var maneuver = getManeuver(token);
            return token === eventToken && maneuver !== undefined && maneuver.difficultyKey === Difficulty.HARD;
         },
         consequent: function(store, token, callback)
         {
            if (AttackDice.rollRandomValue() === AttackDice.Value.HIT)
            {
               var environment = store.getState().environment;
               token.receiveDamage(environment.drawDamage());
            }
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE] = {};

      DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE][DamageCard.MAJOR_EXPLOSION_V2] = {
         // Roll 1 attack die. On a Hit result, suffer 1 critical damage. Then flip this card facedown.
         condition: function(store, token)
         {
            var eventToken = getEventToken(store);
            return token === eventToken;
         },
         consequent: function(store, token, callback)
         {
            if (AttackDice.rollRandomValue() === AttackDice.Value.HIT)
            {
               var environment = store.getState().environment;
               token.receiveCriticalDamage(environment.drawDamage());
            }
            flipCardFacedown(store, token, DamageCard.MAJOR_EXPLOSION_V2);
            callback();
         },
      };

      DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE][DamageCard.MINOR_EXPLOSION] = {
         // Immediately roll 1 attack die. On a Hit result, suffer 1 damage. Then flip this card facedown.
         condition: function(store, token)
         {
            var eventToken = getEventToken(store);
            return token === eventToken;
         },
         consequent: function(store, token, callback)
         {
            if (AttackDice.rollRandomValue() === AttackDice.Value.HIT)
            {
               var environment = store.getState().environment;
               if (environment)
               {
                  token.receiveDamage(environment.drawDamage());
               }
            }
            flipCardFacedown(store, token, DamageCard.MINOR_EXPLOSION);
            callback();
         },
      };

      DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE][DamageCard.THRUST_CONTROL_FIRE] = {
         // Immediately receive 1 stress token. Then flip this card facedown.
         condition: function(store, token)
         {
            var eventToken = getEventToken(store);
            return token === eventToken;
         },
         consequent: function(store, token, callback)
         {
            token.receiveStress();
            flipCardFacedown(store, token, DamageCard.THRUST_CONTROL_FIRE);
            callback();
         },
      };

      DamageAbility0[Event.RECEIVE_CRITICAL_DAMAGE][DamageCard.THRUST_CONTROL_FIRE_V2] = {
         // Receive 1 stress token. Then flip this card facedown.
         condition: function(store, token)
         {
            var eventToken = getEventToken(store);
            return token === eventToken;
         },
         consequent: function(store, token, callback)
         {
            token.receiveStress();
            flipCardFacedown(store, token, DamageCard.THRUST_CONTROL_FIRE_V2);
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      function flipCardFacedown(store, token, damageKey)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("damageKey", damageKey);

         store.dispatch(Action.removeTokenCriticalDamage(token, damageKey));
         store.dispatch(Action.addTokenDamage(token, damageKey));
      }

      function getActivationAction(token)
      {
         InputValidator.validateNotNull("token", token);

         return token.activationAction();
      }

      function getEventData(store)
      {
         InputValidator.validateNotNull("store", store);

         return store.getState().eventData;
      }

      function getEventToken(store)
      {
         InputValidator.validateNotNull("store", store);

         var eventData = getEventData(store);

         return (eventData !== undefined ? eventData.eventToken : undefined);
      }

      function getManeuver(token)
      {
         InputValidator.validateNotNull("token", token);

         var maneuverKey = getManeuverKey(token);
         return Maneuver.properties[maneuverKey];
      }

      function getManeuverKey(token)
      {
         InputValidator.validateNotNull("token", token);

         var answer;
         var activationAction = getActivationAction(token);

         if (activationAction)
         {
            answer = activationAction.maneuverKey();
         }

         return answer;
      }

      DamageAbility0.toString = function()
      {
         return "DamageAbility0";
      };

      if (Object.freeze)
      {
         Object.freeze(DamageAbility0);
      }

      return DamageAbility0;
   });
