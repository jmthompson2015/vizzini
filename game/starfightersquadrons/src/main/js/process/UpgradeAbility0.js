/*
 * Provides upgrade abilities for Events.
 */
define(["Ability", "Difficulty", "Event", "Maneuver", "ShipAction", "UpgradeCard",
  "process/ActivationAction", "process/ShipActionAbility", "process/TokenAction"],
   function(Ability, Difficulty, Event, Maneuver, ShipAction, UpgradeCard,
      ActivationAction, ShipActionAbility, TokenAction)
   {
      "use strict";
      var UpgradeAbility0 = {};

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility0[Event.AFTER_EXECUTE_MANEUVER] = {};

      UpgradeAbility0[Event.AFTER_EXECUTE_MANEUVER][UpgradeCard.K4_SECURITY_DROID] = {
         // After executing a green maneuver, you may acquire a Target Lock.
         condition: function(store, token)
         {
            var maneuver = getManeuver(token);
            var environment = store.getState().environment;
            var defenders = environment.getDefendersInRange(token);
            return isEventToken(store, token) && maneuver !== undefined && maneuver.difficultyKey === Difficulty.EASY && defenders !== undefined && defenders.length > 0;
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var shipActionKeys0 = [ShipAction.TARGET_LOCK];
            var that = this;
            var finishCallback = function(shipActionAbility)
            {
               that.finishConsequent(store, token, shipActionAbility, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback, shipActionKeys0);

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

      UpgradeAbility0[Event.AFTER_EXECUTE_MANEUVER][UpgradeCard.OUTLAW_TECH] = {
         // After you execute a red maneuver, you may assign 1 Focus token to your ship.
         condition: function(store, token)
         {
            var maneuver = getManeuver(token);
            return isEventToken(store, token) && maneuver !== undefined && maneuver.difficultyKey === Difficulty.HARD;
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(TokenAction.addFocusCount(token));
            callback();
         },
      };

      UpgradeAbility0[Event.AFTER_EXECUTE_MANEUVER][UpgradeCard.R2_D2] = {
         // After executing a green maneuver, you may recover 1 shield (up to your shield value).
         condition: function(store, token)
         {
            var maneuver = getManeuver(token);
            return isEventToken(store, token) && maneuver !== undefined && maneuver.difficultyKey === Difficulty.EASY;
         },
         consequent: function(store, token, callback)
         {
            token.recoverShield();
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility0[Event.SHIP_ACTION_PERFORMED] = {};

      UpgradeAbility0[Event.SHIP_ACTION_PERFORMED][UpgradeCard.PUSH_THE_LIMIT] = {
         // Once per round, after you perform an action, you may perform 1 free action shown in your action bar. Then receive 1 stress token.
         condition: function(store, token)
         {
            var isUsed = token.isAbilityUsed(UpgradeCard, UpgradeCard.PUSH_THE_LIMIT);
            var adjudicator = store.getState().adjudicator;
            var canSelectShipAction = adjudicator.canSelectShipAction(token);
            return isEventToken(store, token) && !isUsed && canSelectShipAction;
         },
         consequent: function(store, token, callback)
         {
            var agent = token.agent();
            var environment = store.getState().environment;
            var adjudicator = store.getState().adjudicator;
            var shipActionKeys0 = token.ship().shipActionKeys;
            var that = this;
            var finishCallback = function(shipActionAbility)
            {
               that.finishConsequent(store, token, shipActionAbility, callback);
            };
            agent.getShipAction(environment, adjudicator, token, finishCallback, shipActionKeys0);

            // Wait for agent to respond.
         },
         finishConsequent: function(store, token, shipActionAbility, callback)
         {
            if (shipActionAbility)
            {
               store.dispatch(TokenAction.addStressCount(token));
               var consequent = shipActionAbility.consequent();
               consequent(store, token, callback, shipActionAbility.context());
            }
            else
            {
               callback();
            }
         },
      };

      UpgradeAbility0[Event.SHIP_ACTION_PERFORMED][UpgradeCard.RECON_SPECIALIST] = {
         // When you perform a Focus action, assign 1 additional Focus token to your ship.
         condition: function(store, token)
         {
            var eventShipActionKey = getEventShipActionKey(store);
            return isEventToken(store, token) && eventShipActionKey === ShipAction.FOCUS;
         },
         consequent: function(store, token, callback)
         {
            store.dispatch(TokenAction.addFocusCount(token));
            callback();
         },
      };

      ////////////////////////////////////////////////////////////////////////
      UpgradeAbility0[Event.REMOVE_STRESS] = {};

      UpgradeAbility0[Event.REMOVE_STRESS][UpgradeCard.KYLE_KATARN] = {
         // After you remove a stress token from your ship, you may assign a Focus token to your ship.
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
      UpgradeAbility0[Event.TARGET_LOCK_ACQUIRED] = {};

      UpgradeAbility0[Event.TARGET_LOCK_ACQUIRED][UpgradeCard.TIE_V1] = {
         // After you acquire a target lock, you may perform a free evade action.
         condition: function(store, token)
         {
            return isEventToken(store, token);
         },
         consequent: function(store, token, callback)
         {
            var ability = new Ability(ShipAction, ShipAction.EVADE, ShipActionAbility, ShipActionAbility.ABILITY_KEY);
            ability.consequent(store, token, callback);
         },
      };

      ////////////////////////////////////////////////////////////////////////
      function getActivationAction(token)
      {
         InputValidator.validateNotNull("token", token);

         return ActivationAction.get(token.store(), token.id());
      }

      function getEventContext(store)
      {
         InputValidator.validateNotNull("store", store);

         var eventData = getEventData(store);

         return (eventData !== undefined ? eventData.get("eventContext") : undefined);
      }

      function getEventData(store)
      {
         InputValidator.validateNotNull("store", store);

         return store.getState().eventData;
      }

      function getEventShipActionKey(store)
      {
         InputValidator.validateNotNull("store", store);

         var answer;
         var eventContext = getEventContext(store);

         if (eventContext)
         {
            answer = eventContext.shipActionKey;
         }

         return answer;
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

      UpgradeAbility0.toString = function()
      {
         return "UpgradeAbility0";
      };

      if (Object.freeze)
      {
         Object.freeze(UpgradeAbility0);
      }

      return UpgradeAbility0;
   });
