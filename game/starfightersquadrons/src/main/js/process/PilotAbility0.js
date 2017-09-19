/*
 * Provides pilot abilities for Events.
 */
define(["Ability", "Event", "Maneuver", "Pilot", "ShipAction", "process/ActivationAction", "process/AttackDice", "process/ShipActionAbility", "process/TokenAction"],
   function(Ability, Event, Maneuver, Pilot, ShipAction, ActivationAction, AttackDice, ShipActionAbility, TokenAction)
   {
      "use strict";
      var PilotAbility0 = {};

      ////////////////////////////////////////////////////////////////////////
      PilotAbility0[Event.AFTER_EXECUTE_MANEUVER] = {};

      PilotAbility0[Event.AFTER_EXECUTE_MANEUVER][Pilot.NIGHT_BEAST] = {
         // After executing a green maneuver, you may perform a free focus action.
         condition: function(store, token)
         {
            var maneuver = getManeuver(token);
            return isEventToken(store, token) && maneuver !== undefined && maneuver.difficultyKey === Difficulty.EASY;
         },
         consequent: function(store, token, callback)
         {
            var ability = new Ability(ShipAction, ShipAction.FOCUS, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
            ability.consequent(store, token, callback);
         },
      };

      ////////////////////////////////////////////////////////////////////////
      PilotAbility0[Event.RECEIVE_STRESS] = {};

      PilotAbility0[Event.RECEIVE_STRESS][Pilot.JEK_PORKINS] = {
         // When you receive a stress token, you may remove it and roll 1 attack die. On a Hit result, deal 1 facedown Damage card to this ship.
         condition: function(store, token)
         {
            return isEventToken(store, token);
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
            return isEventToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(TokenAction.addFocusCount(token));
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      PilotAbility0[Event.REMOVE_SHIELD] = {};

      PilotAbility0[Event.REMOVE_SHIELD][Pilot.RED_ACE] = {
         // The first time you remove a shield token from your ship each round, assign 1 evade token to your ship.
         condition: function(store, token)
         {
            var pilotKey = Pilot.RED_ACE;
            return isEventToken(store, token) && !token.isPerRoundAbilityUsed(Pilot, pilotKey);
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(TokenAction.addEvadeCount(token));
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      function getActivationAction(token)
      {
         InputValidator.validateNotNull("token", token);

         var store = token.store();

         return ActivationAction.get(store, token.id());
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

         return (eventData !== undefined ? eventData.get("eventToken") : undefined);
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

      function isEventToken(store, token)
      {
         var eventToken = getEventToken(store);

         return token.equals(eventToken);
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
