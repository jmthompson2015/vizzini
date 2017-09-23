"use strict";

define(["process/EnvironmentAction"], function(EnvironmentAction)
{
   var EnvironmentReducer = {};

   EnvironmentReducer.reduce = function(state, action)
   {
      LOGGER.debug("reduce() type = " + action.type);

      var action2, newPositionToTokenId, newTokenIdToData, newTokens;

      switch (action.type)
      {
         case EnvironmentAction.ADD_ROUND:
            LOGGER.info("Round: " + (state.round + action.value));
            return Object.assign(
            {}, state,
            {
               round: state.round + action.value,
            });
         case EnvironmentAction.DISCARD_DAMAGE:
            return Object.assign(
            {}, state,
            {
               damageDiscardPile: EnvironmentReducer.damageDiscardPile(state.damageDiscardPile, action),
            });
         case EnvironmentAction.DRAW_DAMAGE:
         case EnvironmentAction.SET_DAMAGE_DECK:
            return Object.assign(
            {}, state,
            {
               damageDeck: EnvironmentReducer.damageDeck(state.damageDeck, action),
            });
         case EnvironmentAction.MOVE_TOKEN:
            var tokenId = state.positionToTokenId[action.fromPosition];
            action.id = tokenId;
            newPositionToTokenId = EnvironmentReducer.positionToTokenId(state.positionToTokenId, action);
            newTokenIdToData = EnvironmentReducer.tokenIdToPosition(state.tokenIdToPosition, action);
            return Object.assign(
            {}, state,
            {
               positionToTokenId: newPositionToTokenId,
               tokenIdToPosition: newTokenIdToData,
            });
         case EnvironmentAction.PLACE_TOKEN:
            newPositionToTokenId = EnvironmentReducer.positionToTokenId(state.positionToTokenId, action);
            newTokenIdToData = EnvironmentReducer.tokenIdToPosition(state.tokenIdToPosition, action);
            newTokens = EnvironmentReducer.tokens(state.tokens, action);
            return Object.assign(
            {}, state,
            {
               positionToTokenId: newPositionToTokenId,
               tokenIdToPosition: newTokenIdToData,
               tokens: newTokens,
            });
         case EnvironmentAction.REMOVE_TOKEN:
            newTokenIdToData = EnvironmentReducer.tokenIdToPosition(state.tokenIdToPosition, action);
            newTokens = EnvironmentReducer.tokens(state.tokens, action);
            var position = state.tokenIdToPosition[action.token.id()];
            if (position)
            {
               action2 = EnvironmentAction.removeTokenAt(position);
               newPositionToTokenId = EnvironmentReducer.positionToTokenId(state.positionToTokenId, action2);
               return Object.assign(
               {}, state,
               {
                  positionToTokenId: newPositionToTokenId,
                  tokenIdToPosition: newTokenIdToData,
                  tokens: newTokens,
               });
            }
            else
            {
               return Object.assign(
               {}, state,
               {
                  tokenIdToPosition: newTokenIdToData,
                  tokens: newTokens,
               });
            }
            return state;
         case EnvironmentAction.REMOVE_TOKEN_AT:
            // LOGGER.info("EnvironmentReducer REMOVE_TOKEN_AT state.positionToTokenId[action.position] = " + state.positionToTokenId[action.position]);
            tokenId = state.positionToTokenId[action.position];
            if (tokenId !== undefined)
            {
               tokenId = parseInt(tokenId);
               var environment = state.environment;
               action.token = environment.getTokenById(tokenId);
               action2 = EnvironmentAction.removeToken(action.token);
               newPositionToTokenId = EnvironmentReducer.positionToTokenId(state.positionToTokenId, action);
               newTokenIdToData = EnvironmentReducer.tokenIdToPosition(state.tokenIdToPosition, action2);
               newTokens = EnvironmentReducer.tokens(state.tokens, action2);
               return Object.assign(
               {}, state,
               {
                  positionToTokenId: newPositionToTokenId,
                  tokenIdToPosition: newTokenIdToData,
                  tokens: newTokens,
               });
            }
            return state;
         case EnvironmentAction.REPLENISH_DAMAGE_DECK:
            var newDamageDeck = state.damageDiscardPile.slice();
            newDamageDeck.vizziniShuffle();
            return Object.assign(
            {}, state,
            {
               damageDeck: newDamageDeck,
               damageDiscardPile: [],
            });
         case EnvironmentAction.SET_ACTIVE_TOKEN:
            LOGGER.info("Active Token: " + action.token);
            return Object.assign(
            {}, state,
            {
               activeTokenId: (action.token ? action.token.id() : undefined),
            });
         case EnvironmentAction.SET_FIRST_AGENT:
            return Object.assign(
            {}, state,
            {
               firstAgent: action.agent,
            });
         case EnvironmentAction.SET_FIRST_SQUAD:
            return Object.assign(
            {}, state,
            {
               firstSquad: action.squad,
            });
         case EnvironmentAction.SET_PLAY_AREA_SCALE:
            return Object.assign(
            {}, state,
            {
               playAreaScale: action.scale,
            });
         case EnvironmentAction.SET_PLAY_FORMAT:
            return Object.assign(
            {}, state,
            {
               playFormatKey: action.playFormatKey,
            });
         case EnvironmentAction.SET_SECOND_AGENT:
            return Object.assign(
            {}, state,
            {
               secondAgent: action.agent,
            });
         case EnvironmentAction.SET_SECOND_SQUAD:
            return Object.assign(
            {}, state,
            {
               secondSquad: action.squad,
            });
         case EnvironmentAction.SET_TOKEN_TOUCHING:
            // newTokenIdToData = EnvironmentReducer.tokenIdToData(state.tokenIdToIsTouching, Action.SET_TOKEN_TOUCHING, action.type, action.token.id(), action.isTouching);
            newTokenIdToData = Object.assign(
            {}, state.tokenIdToIsTouching);
            newTokenIdToData[action.token.id()] = action.isTouching;
            return Object.assign(
            {}, state,
            {
               tokenIdToIsTouching: newTokenIdToData,
            });
         default:
            LOGGER.warn("EnvironmentReducer.reduce: Unhandled action type: " + action.type);
            return state;
      }
   };

   EnvironmentReducer.damageDeck = function(state, action)
   {
      LOGGER.debug("EnvironmentReducer.positionToToken() type = " + action.type);

      var newDamageDeck;

      switch (action.type)
      {
         case EnvironmentAction.DRAW_DAMAGE:
            newDamageDeck = state.slice();
            newDamageDeck.vizziniRemove(action.damage);
            return newDamageDeck;
         case EnvironmentAction.SET_DAMAGE_DECK:
            newDamageDeck = action.damageDeck.slice();
            return newDamageDeck;
         default:
            LOGGER.warn("EnvironmentReducer.damageDeck: Unhandled action type: " + action.type);
            return state;
      }
   };

   EnvironmentReducer.damageDiscardPile = function(state, action)
   {
      LOGGER.debug("EnvironmentReducer.positionToToken() type = " + action.type);

      var newDamageDiscardPile;

      switch (action.type)
      {
         case EnvironmentAction.DISCARD_DAMAGE:
            newDamageDiscardPile = state.slice();
            newDamageDiscardPile.push(action.damage);
            return newDamageDiscardPile;
         default:
            LOGGER.warn("EnvironmentReducer.damageDiscardPile: Unhandled action type: " + action.type);
            return state;
      }
   };

   EnvironmentReducer.positionToTokenId = function(state, action)
   {
      LOGGER.debug("EnvironmentReducer.positionToTokenId() type = " + action.type);

      var newPositionToTokenId;

      switch (action.type)
      {
         case EnvironmentAction.MOVE_TOKEN:
            newPositionToTokenId = Object.assign(
            {}, state);
            delete newPositionToTokenId[action.fromPosition];
            newPositionToTokenId[action.toPosition] = action.id;
            return newPositionToTokenId;
         case EnvironmentAction.PLACE_TOKEN:
            newPositionToTokenId = Object.assign(
            {}, state);
            newPositionToTokenId[action.position] = action.token.id();
            return newPositionToTokenId;
         case EnvironmentAction.REMOVE_TOKEN_AT:
            newPositionToTokenId = Object.assign(
            {}, state);
            delete newPositionToTokenId[action.position];
            return newPositionToTokenId;
         default:
            LOGGER.warn("EnvironmentReducer.positionToTokenId: Unhandled action type: " + action.type);
            return state;
      }
   };

   EnvironmentReducer.tokenIdToPosition = function(state, action)
   {
      LOGGER.debug("EnvironmentReducer.tokenIdToPosition() type = " + action.type);

      var newTokenIdToPosition;

      switch (action.type)
      {
         case EnvironmentAction.MOVE_TOKEN:
            newTokenIdToPosition = Object.assign(
            {}, state);
            newTokenIdToPosition[action.id] = action.toPosition;
            return newTokenIdToPosition;
         case EnvironmentAction.PLACE_TOKEN:
            newTokenIdToPosition = Object.assign(
            {}, state);
            newTokenIdToPosition[action.token.id()] = action.position;
            return newTokenIdToPosition;
         case EnvironmentAction.REMOVE_TOKEN:
            newTokenIdToPosition = Object.assign(
            {}, state);
            delete newTokenIdToPosition[action.token.id()];
            return newTokenIdToPosition;
         default:
            LOGGER.warn("EnvironmentReducer.tokenIdToPosition: Unhandled action type: " + action.type);
            return state;
      }
   };

   EnvironmentReducer.tokens = function(state, action)
   {
      LOGGER.debug("EnvironmentReducer.tokens() type = " + action.type);

      switch (action.type)
      {
         case EnvironmentAction.PLACE_TOKEN:
            return state.set(action.token.id(), Immutable.Map(
            {
               id: action.token.id(),
               pilotKey: action.token.pilotKey(),
               agent: action.token.agent(),
               idFore: (action.token.tokenFore ? action.token.tokenFore().id() : undefined),
               idAft: (action.token.tokenAft ? action.token.tokenAft().id() : undefined),
            }));
         case EnvironmentAction.REMOVE_TOKEN:
            return state.delete(action.token.id());
         default:
            LOGGER.warn("EnvironmentReducer.tokens: Unhandled action type: " + action.type);
            return state;
      }
   };

   if (Object.freeze)
   {
      Object.freeze(EnvironmentReducer);
   }

   return EnvironmentReducer;
});
