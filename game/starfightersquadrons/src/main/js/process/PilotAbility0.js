/*
 * Provides pilot abilities for Events.
 */
define(["Event", "Maneuver", "Pilot", "process/Action", "process/AttackDice", "process/Selector"],
   function(Event, Maneuver, Pilot, Action, AttackDice, Selector)
   {
      "use strict";
      var PilotAbility0 = {};

      ////////////////////////////////////////////////////////////////////////
      PilotAbility0[Event.AFTER_EXECUTE_MANEUVER] = {};

      PilotAbility0[Event.AFTER_EXECUTE_MANEUVER][Pilot.NIGHT_BEAST] = {
         // After executing a green maneuver, you may perform a free focus action.
         condition: function(store, token)
         {
            var eventToken = getEventToken(store);
            var maneuver = getManeuver(token);
            return token === eventToken && maneuver !== undefined && maneuver.difficultyKey === Difficulty.EASY;
         },
         consequent: function(store, token, callback)
         {
            var focusAction = new ShipActionAction.Focus(store, token);
            focusAction.doIt();
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      PilotAbility0[Event.RECEIVE_STRESS] = {};

      PilotAbility0[Event.RECEIVE_STRESS][Pilot.JEK_PORKINS] = {
         // When you receive a stress token, you may remove it and roll 1 attack die. On a Hit result, deal 1 facedown Damage card to this ship.
         condition: function(store, token)
         {
            var eventToken = getEventToken(store);
            return token === eventToken;
         },
         consequent: function(store, token, callback)
         {
            token.removeStress();
            if (AttackDice.rollRandomValue() === AttackDice.Value.HIT)
            {
               token.receiveDamage(environment.drawDamage());
            }
            callback();
         },
      };

      PilotAbility0[Event.RECEIVE_STRESS][Pilot.SOONTIR_FEL] = {
         // When you receive a stress token, you may assign 1 focus token to your ship.
         condition: function(store, token)
         {
            var eventToken = getEventToken(store);
            return token === eventToken;
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(Action.addFocusCount(token));
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      PilotAbility0[Event.REMOVE_SHIELD] = {};

      PilotAbility0[Event.REMOVE_SHIELD][Pilot.RED_ACE] = {
         // The first time you remove a shield token from your ship each round, assign 1 evade token to your ship.
         condition: function(store, token)
         {
            var eventToken = getEventToken(store);
            var isUsedThisRound = usedThisRound(store, token, Pilot.RED_ACE);
            return token === eventToken && !isUsedThisRound;
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(Action.addEvadeCount(token));
            store.dispatch(Action.addTokenPilotPerRound(token, Pilot.RED_ACE));
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
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

      function usedThisRound(store, token, pilotKey)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("pilotKey", pilotKey);

         return Selector.tokenToPilotPerRound(store.getState(), token.id(), pilotKey) > 0;
      }

      PilotAbility0.toString = function()
      {
         return "PilotAbility0";
      };

      if (Object.freeze)
      {
         Object.freeze(PilotAbility0);
      }

      return PilotAbility0;
   });
