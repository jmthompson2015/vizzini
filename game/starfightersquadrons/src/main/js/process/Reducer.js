"use strict";

define(["Event", "InitialState", "Phase",
  "process/Action", "process/EnvironmentAction", "process/EnvironmentReducer", "process/TokenAction", "process/TokenReducer"],
   function(Event, InitialState, Phase,
      Action, EnvironmentAction, EnvironmentReducer, TokenAction, TokenReducer)
   {
      var Reducer = {};

      Reducer.targetLocks = function(state, action)
      {
         LOGGER.debug("targetLocks() type = " + action.type);

         var newTargetLocks;

         switch (action.type)
         {
            case Action.ADD_TARGET_LOCK:
               newTargetLocks = state.push(action.targetLock);
               return newTargetLocks;
            case Action.REMOVE_TARGET_LOCK:
               var index = state.indexOf(action.targetLock);
               newTargetLocks = (index >= 0 ? state.delete(index) : state);
               return newTargetLocks;
            default:
               LOGGER.warn("Reducer.targetLocks: Unhandled action type: " + action.type);
               return state;
         }
      };

      Reducer.tokenIdToArray = function(state, actionType, actionTokenId, actionData)
      {
         InputValidator.validateNotNull("state", state);
         InputValidator.validateNotNull("actionType", actionType);
         InputValidator.validateIsNumber("actionTokenId", actionTokenId);
         // actionData optional.

         LOGGER.debug("Reducer.tokenIdToArray() type = " + actionType);

         var newTokenIdToArray, newArray, oldArray;

         if (actionType.startsWith("add"))
         {
            oldArray = state[actionTokenId];
            newArray = oldArray.slice();
            newArray.push(actionData);
            newTokenIdToArray = Object.assign(
            {}, state);
            newTokenIdToArray[actionTokenId] = newArray;
            return newTokenIdToArray;
         }
         else if (actionType.startsWith("clear"))
         {
            newTokenIdToArray = Object.assign(
            {}, state);
            newTokenIdToArray[actionTokenId] = [];
            return newTokenIdToArray;
         }
         else if (actionType.startsWith("remove"))
         {
            oldArray = state[actionTokenId];
            newArray = oldArray.slice();
            newArray.vizziniRemove(actionData);
            newTokenIdToArray = Object.assign(
            {}, state);
            newTokenIdToArray[actionTokenId] = newArray;
            return newTokenIdToArray;
         }
         else
         {
            LOGGER.warn("Reducer.tokenIdToArray: Unhandled action type: " + actionType);
            return state;
         }
      };

      Reducer.tokenIdToData = function(state, type, actionType, actionTokenId, actionData)
      {
         LOGGER.debug("tokenIdToData() type = " + actionType);

         switch (actionType)
         {
            case type:
               var newTokenIdToData = Object.assign(
               {}, state);
               newTokenIdToData[actionTokenId] = actionData;
               return newTokenIdToData;
            default:
               LOGGER.warn("Reducer.tokenIdToData: Unhandled action type: " + actionType);
               return state;
         }
      };

      Reducer.root = function(state, action)
      {
         LOGGER.debug("root() type = " + action.type);

         if (typeof state === 'undefined')
         {
            return new InitialState();
         }

         var newEventData, newEventQueue, newPhaseData, newPhaseQueue, newTokenIdToData, newTokenIdToValues;

         switch (action.type)
         {
            case EnvironmentAction.ADD_ROUND:
            case EnvironmentAction.DISCARD_DAMAGE:
            case EnvironmentAction.DRAW_DAMAGE:
            case EnvironmentAction.MOVE_TOKEN:
            case EnvironmentAction.PLACE_TOKEN:
            case EnvironmentAction.REMOVE_TOKEN:
            case EnvironmentAction.REMOVE_TOKEN_AT:
            case EnvironmentAction.REPLENISH_DAMAGE_DECK:
            case EnvironmentAction.SET_ACTIVE_TOKEN:
            case EnvironmentAction.SET_DAMAGE_DECK:
            case EnvironmentAction.SET_FIRST_AGENT:
            case EnvironmentAction.SET_FIRST_SQUAD:
            case EnvironmentAction.SET_PLAY_AREA_SCALE:
            case EnvironmentAction.SET_PLAY_FORMAT:
            case EnvironmentAction.SET_SECOND_AGENT:
            case EnvironmentAction.SET_SECOND_SQUAD:
            case EnvironmentAction.SET_TOKEN_TOUCHING:
               return EnvironmentReducer.reduce(state, action);
            case TokenAction.ADD_COUNT:
            case TokenAction.ADD_SECONDARY_WEAPON:
            case TokenAction.ADD_TOKEN_CRITICAL_DAMAGE:
            case TokenAction.ADD_TOKEN_DAMAGE:
            case TokenAction.ADD_TOKEN_UPGRADE:
            case TokenAction.ADD_TOKEN_UPGRADE_ENERGY:
            case TokenAction.ADD_TOKEN_USED_ABILITY:
            case TokenAction.ADD_TOKEN_USED_PER_ROUND_ABILITY:
            case TokenAction.CLEAR_TOKEN_USED_ABILITIES:
            case TokenAction.CLEAR_TOKEN_USED_PER_ROUND_ABILITIES:
            case TokenAction.INCREMENT_NEXT_TOKEN_ID:
            case TokenAction.REMOVE_SECONDARY_WEAPON:
            case TokenAction.REMOVE_TOKEN_CRITICAL_DAMAGE:
            case TokenAction.REMOVE_TOKEN_DAMAGE:
            case TokenAction.REMOVE_TOKEN_UPGRADE:
            case TokenAction.REMOVE_TOKEN_USED_ABILITY:
            case TokenAction.REMOVE_TOKEN_USED_PER_ROUND_ABILITY:
            case TokenAction.RESET_NEXT_TOKEN_ID:
            case TokenAction.SET_COUNT:
            case TokenAction.SET_PRIMARY_WEAPON:
            case TokenAction.SET_TOKEN:
            case TokenAction.SET_TOKEN_UPGRADE_ENERGY:
               return TokenReducer.reduce(state, action);
            case Action.ADD_TARGET_LOCK:
            case Action.REMOVE_TARGET_LOCK:
               return Object.assign(
               {}, state,
               {
                  targetLocks: Reducer.targetLocks(state.targetLocks, action),
               });
            case Action.CLEAR_EVENT:
               // LOGGER.info("Event: (cleared)");
               return Object.assign(
               {}, state,
               {
                  eventData: undefined,
               });
            case Action.CLEAR_PHASE:
               // LOGGER.info("Phase: (cleared)");
               return Object.assign(
               {}, state,
               {
                  phaseData: undefined,
               });
            case Action.DEQUEUE_EVENT:
               // LOGGER.info("EventQueue: (dequeue)");
               newEventData = state.eventQueue.first();
               newEventQueue = state.eventQueue.shift();
               return Object.assign(
               {}, state,
               {
                  eventData: newEventData,
                  eventQueue: newEventQueue,
               });
            case Action.DEQUEUE_PHASE:
               // LOGGER.info("PhaseQueue: (dequeue)");
               newPhaseData = state.phaseQueue.first();
               newPhaseQueue = state.phaseQueue.shift();
               return Object.assign(
               {}, state,
               {
                  phaseData: newPhaseData,
                  phaseKey: newPhaseData.get("phaseKey"),
                  phaseQueue: newPhaseQueue,
               });
            case Action.ENQUEUE_EVENT:
               LOGGER.info("EventQueue: " + Event.properties[action.eventKey].name + ", token = " + action.eventToken + ", context = " + JSON.stringify(action.eventContext));
               newEventData = Event.createData(action.eventKey, action.eventToken, action.eventCallback, action.eventContext);
               newEventQueue = state.eventQueue.push(newEventData);
               return Object.assign(
               {}, state,
               {
                  eventQueue: newEventQueue,
               });
            case Action.ENQUEUE_PHASE:
               LOGGER.info("PhaseQueue: " + Phase.properties[action.phaseKey].name + ", token = " + action.phaseToken + ", callback " + (action.phaseCallback === undefined ? " === undefined" : " !== undefined") + ", context = " + JSON.stringify(action.phaseContext));
               newPhaseData = Phase.createData(action.phaseKey, action.phaseToken, action.phaseCallback, action.phaseContext);
               newPhaseQueue = state.phaseQueue.push(newPhaseData);
               return Object.assign(
               {}, state,
               {
                  phaseQueue: newPhaseQueue,
               });
            case Action.INCREMENT_NEXT_TARGET_LOCK_ID:
               var newNextTargetLockId = state.nextTargetLockId + 1;
               if (newNextTargetLockId > 51)
               {
                  newNextTargetLockId = 0;
               }
               return Object.assign(
               {}, state,
               {
                  nextTargetLockId: newNextTargetLockId,
               });
            case Action.SET_ADJUDICATOR:
               return Object.assign(
               {}, state,
               {
                  adjudicator: action.adjudicator,
               });
            case Action.SET_ENVIRONMENT:
               return Object.assign(
               {}, state,
               {
                  environment: action.environment,
               });
            case Action.SET_GAME_OVER:
               return Object.assign(
               {}, state,
               {
                  isGameOver: true,
                  winner: action.winner,
               });
            case Action.SET_PHASE:
               LOGGER.info("Phase: " + Phase.properties[action.phaseKey].name);
               return Object.assign(
               {}, state,
               {
                  phaseKey: action.phaseKey,
               });
            case Action.SET_TOKEN_ACTIVATION_ACTION:
               newTokenIdToData = Reducer.tokenIdToData(state.tokenIdToActivationAction, Action.SET_TOKEN_ACTIVATION_ACTION, action.type, action.tokenId, action.activationActionValues);
               return Object.assign(
               {}, state,
               {
                  tokenIdToActivationAction: newTokenIdToData,
               });
            case Action.SET_TOKEN_ATTACK_DICE:
               // LOGGER.info("Reducer.root() SET_TOKEN_ATTACK_DICE action.tokenId = " + action.tokenId + " action.attackDiceValues = " + action.attackDiceValues);
               newTokenIdToData = Reducer.tokenIdToData(state.tokenIdToAttackDice, Action.SET_TOKEN_ATTACK_DICE, action.type, action.tokenId, action.attackDiceValues);
               return Object.assign(
               {}, state,
               {
                  tokenIdToAttackDice: newTokenIdToData,
               });
            case Action.SET_TOKEN_COMBAT_ACTION:
               newTokenIdToData = Reducer.tokenIdToData(state.tokenIdToCombatAction, Action.SET_TOKEN_COMBAT_ACTION, action.type, action.token.id(), action.combatAction);
               return Object.assign(
               {}, state,
               {
                  tokenIdToCombatAction: newTokenIdToData,
               });
            case Action.SET_TOKEN_DAMAGE_DEALER:
               newTokenIdToData = Reducer.tokenIdToData(state.tokenIdToDamageDealer, Action.SET_TOKEN_DAMAGE_DEALER, action.type, action.token.id(), action.damageDealer);
               return Object.assign(
               {}, state,
               {
                  tokenIdToDamageDealer: newTokenIdToData,
               });
            case Action.SET_TOKEN_DEFENDER_HIT:
               newTokenIdToData = Reducer.tokenIdToData(state.tokenIdToIsDefenderHit, Action.SET_TOKEN_DEFENDER_HIT, action.type, action.token.id(), action.isDefenderHit);
               return Object.assign(
               {}, state,
               {
                  tokenIdToIsDefenderHit: newTokenIdToData,
               });
            case Action.SET_TOKEN_DEFENSE_DICE:
               newTokenIdToData = Reducer.tokenIdToData(state.tokenIdToDefenseDice, Action.SET_TOKEN_DEFENSE_DICE, action.type, action.tokenId, action.defenseDiceValues);
               return Object.assign(
               {}, state,
               {
                  tokenIdToDefenseDice: newTokenIdToData,
               });
            case Action.SET_TOKEN_IN_FIRING_ARC:
               newTokenIdToData = Reducer.tokenIdToData(state.tokenIdToIsInFiringArc, Action.SET_TOKEN_IN_FIRING_ARC, action.type, action.token.id(), action.isInFiringArc);
               return Object.assign(
               {}, state,
               {
                  tokenIdToIsInFiringArc: newTokenIdToData,
               });
            case Action.SET_TOKEN_MANEUVER:
               newTokenIdToData = Reducer.tokenIdToData(state.tokenIdToManeuver, Action.SET_TOKEN_MANEUVER, action.type, action.token.id(), action.maneuver);
               return Object.assign(
               {}, state,
               {
                  tokenIdToManeuver: newTokenIdToData,
               });
            case Action.SET_TOKEN_MANEUVER_ACTION:
               newTokenIdToData = Reducer.tokenIdToData(state.tokenIdToManeuverAction, Action.SET_TOKEN_MANEUVER_ACTION, action.type, action.tokenId, action.maneuverActionValues);
               return Object.assign(
               {}, state,
               {
                  tokenIdToManeuverAction: newTokenIdToData,
               });
            case Action.SET_TOKEN_RANGE:
               newTokenIdToData = Reducer.tokenIdToData(state.tokenIdToRange, Action.SET_TOKEN_RANGE, action.type, action.token.id(), action.rangeKey);
               return Object.assign(
               {}, state,
               {
                  tokenIdToRange: newTokenIdToData,
               });
            case Action.SET_USER_MESSAGE:
               return Object.assign(
               {}, state,
               {
                  userMessage: action.userMessage,
               });
            case Action.SET_VALUE:
               newTokenIdToValues = Reducer.tokenIdToValues(state.tokenIdToValues, action);
               return Object.assign(
               {}, state,
               {
                  tokenIdToValues: newTokenIdToValues,
               });
            default:
               LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
               return state;
         }
      };

      if (Object.freeze)
      {
         Object.freeze(Reducer);
      }

      return Reducer;
   });
