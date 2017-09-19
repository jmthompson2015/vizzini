define(function()
{
   "use strict";
   var Selector = {};

   Selector.activeToken = function(state)
   {
      InputValidator.validateNotNull("state", state);

      var answer;

      if (state.activeTokenId !== undefined && state.activeTokenId !== null)
      {
         answer = state.environment.getTokenById(state.activeTokenId);
      }

      return answer;
   };

   Selector.adjudicator = function(state)
   {
      return state.adjudicator;
   };

   Selector.combatAction = function(state, token)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);

      return state.tokenIdToCombatAction[token.id()];
   };

   Selector.damageDealer = function(state, attacker)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("attacker", attacker);

      return state.tokenIdToDamageDealer[attacker.id()];
   };

   Selector.environment = function(state)
   {
      return state.environment;
   };

   Selector.isDefenderHit = function(state, token)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);

      return state.tokenIdToIsDefenderHit[token.id()];
   };

   Selector.isInFiringArc = function(state, token)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);

      return state.tokenIdToIsInFiringArc[token.id()];
   };

   Selector.isTouching = function(state, token)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);

      return state.tokenIdToIsTouching[token.id()];
   };

   Selector.maneuver = function(state, token)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("token", token);

      return state.tokenIdToManeuver[token.id()];
   };

   Selector.rangeKey = function(state, attacker)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("attacker", attacker);

      return state.tokenIdToRange[attacker.id()];
   };

   if (Object.freeze)
   {
      Object.freeze(Selector);
   }

   return Selector;
});
