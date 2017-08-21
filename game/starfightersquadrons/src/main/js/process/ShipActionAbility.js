/*
 * Provides ship action abilities.
 */
define(["Event", "ShipAction", "process/Action", "process/ManeuverAction", "process/Selector", "process/TargetLock"],
   function(Event, ShipAction, Action, ManeuverAction, Selector, TargetLock)
   {
      "use strict";
      var ShipActionAbility = {};

      ShipActionAbility.ABILITY_KEY = "shipAction";

      ////////////////////////////////////////////////////////////////////////
      ShipActionAbility[ShipActionAbility.ABILITY_KEY] = {};

      ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.BARREL_ROLL] = {
         // Perform the barrel roll action to move laterally and adjust their position.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback, context)
         {
            var maneuverKey = context.maneuverKey;
            var maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);
            maneuverAction.doIt();
            notifyEvent(store, token, callback, ShipAction.BARREL_ROLL);
         },
      };

      ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.BOOST] = {
         // Perform the boost action to adjust their position.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback, context)
         {
            var maneuverKey = context.maneuverKey;
            var maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);
            maneuverAction.doIt();
            notifyEvent(store, token, callback, ShipAction.BOOST);
         },
      };

      ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.CLOAK] = {
         // Assign one cloak token to that ship.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback, context)
         {
            store.dispatch(Action.addCloakCount(token));
            notifyEvent(store, token, callback, ShipAction.CLOAK);
         },
      };

      ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.COORDINATE] = {
         // Choose another friendly ship at Range 1-2. That ship may immediately perform one free action.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback, context)
         {
            LOGGER.warn("ShipActionAbility Coordinate not yet implemented.");
            notifyEvent(store, token, callback, ShipAction.COORDINATE);
         },
      };

      ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.DECLOAK] = {
         // Spend a cloak token to decloak.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback, context)
         {
            var maneuverKey = context.maneuverKey;
            var maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);
            maneuverAction.doIt();
            store.dispatch(Action.addCloakCount(token, -1));
            notifyEvent(store, token, callback, ShipAction.DECLOAK);
         },
      };

      ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.EVADE] = {
         // Assign one evade token to the ship.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(Action.addEvadeCount(token));
            notifyEvent(store, token, callback, ShipAction.EVADE);
         },
      };

      ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.FOCUS] = {
         // Assign one focus token to the ship.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(Action.addFocusCount(token));
            notifyEvent(store, token, callback, ShipAction.FOCUS);
         },
      };

      ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.JAM] = {
         // Choose one enemy ship at Range 1-2 and assign Stress tokens until the ship has 2 total stress tokens.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback, context)
         {
            var defender = context.defender;
            if (defender.stressCount() < 2)
            {
               defender.receiveStress();
            }
            if (defender.stressCount() < 2)
            {
               defender.receiveStress();
            }
            notifyEvent(store, token, callback, ShipAction.JAM);
         },
      };

      ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.RECOVER] = {
         // Remove all energy tokens from the corresponding ship card. For each energy token removed, the ship recovers one shield, up to its maximum shield value.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback, context)
         {
            LOGGER.warn("ShipActionAbility Recover not yet implemented.");
            notifyEvent(store, token, callback, ShipAction.RECOVER);
         },
      };

      ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.REINFORCE] = {
         // Choose either the fore or aft side of a double-sided reinforce token and place the token with that side faceup near its ship token.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback, context)
         {
            store.dispatch(Action.addReinforceCount(token));
            notifyEvent(store, token, callback, ShipAction.REINFORCE);
         },
      };

      ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.SLAM] = {
         // Perform a SLAM (SubLight Acceleration Motor) action.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, token, callback, context)
         {
            var maneuverKey = context.maneuverKey;
            var maneuverAction = new ManeuverAction(store, token.id(), maneuverKey);
            maneuverAction.doIt();
            store.dispatch(Action.addWeaponsDisabledCount(token));
            notifyEvent(store, token, callback, ShipAction.SLAM);
         },
      };

      ShipActionAbility[ShipActionAbility.ABILITY_KEY][ShipAction.TARGET_LOCK] = {
         // Acquire a target lock on an enemy ship.
         condition: function(store, token)
         {
            var activeToken = getActiveToken(store);
            return token === activeToken;
         },
         consequent: function(store, attacker, callback, context)
         {
            var defender = context.defender;
            var targetLock = TargetLock.newInstance(store, attacker, defender);
            notifyEvent(store, attacker, callback, ShipAction.TARGET_LOCK);
         },
      };

      ////////////////////////////////////////////////////////////////////////
      function getActiveToken(store)
      {
         InputValidator.validateNotNull("store", store);

         return Selector.activeToken(store.getState());
      }

      ShipActionAbility.toString = function()
      {
         return "ShipActionAbility";
      };

      function notifyEvent(store, eventToken, eventCallback, shipActionKey)
      {
         InputValidator.validateNotNull("store", store);
         InputValidator.validateNotNull("eventToken", eventToken);
         InputValidator.validateNotNull("eventCallback", eventCallback);
         InputValidator.validateNotNull("shipActionKey", shipActionKey);

         // Mark as used.
         store.dispatch(Action.addTokenUsedShipAction(eventToken, shipActionKey));

         // Issue event.
         var eventKey = Event.SHIP_ACTION_PERFORMED;
         var eventContext = {
            shipActionKey: shipActionKey,
         };
         store.dispatch(Action.enqueueEvent(eventKey, eventToken, eventCallback, eventContext));
      }

      if (Object.freeze)
      {
         Object.freeze(ShipActionAbility);
      }

      return ShipActionAbility;
   });
