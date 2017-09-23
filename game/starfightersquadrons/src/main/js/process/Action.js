"use strict";

define(function()
{
   var Action = {};

   Action.ADD_TARGET_LOCK = "addTargetLock";
   Action.CLEAR_EVENT = "clearEvent";
   Action.CLEAR_PHASE = "clearPhase";
   Action.DEQUEUE_EVENT = "dequeueEvent";
   Action.DEQUEUE_PHASE = "dequeuePhase";
   Action.ENQUEUE_EVENT = "enqueueEvent";
   Action.ENQUEUE_PHASE = "enqueuePhase";
   Action.INCREMENT_NEXT_TARGET_LOCK_ID = "incrementNextTargetLockId";
   Action.REMOVE_TARGET_LOCK = "removeTargetLock";
   Action.SET_ADJUDICATOR = "setAdjudicator";
   Action.SET_ENVIRONMENT = "setEnvironment";
   Action.SET_GAME_OVER = "setGameOver";
   Action.SET_TOKEN_ACTIVATION_ACTION = "setTokenActivationAction";
   Action.SET_TOKEN_ATTACK_DICE = "setTokenAttackDice";
   Action.SET_TOKEN_COMBAT_ACTION = "setTokenCombatAction";
   Action.SET_TOKEN_DAMAGE_DEALER = "setTokenDamageDealer";
   Action.SET_TOKEN_DEFENDER_HIT = "setTokenDefenderHit";
   Action.SET_TOKEN_DEFENSE_DICE = "setTokenDefenseDice";
   Action.SET_TOKEN_IN_FIRING_ARC = "setTokenInFiringArc";
   Action.SET_TOKEN_MANEUVER = "setTokenManeuver";
   Action.SET_TOKEN_MANEUVER_ACTION = "setTokenManeuverAction";
   Action.SET_TOKEN_RANGE = "setTokenRange";
   Action.SET_USER_MESSAGE = "setUserMessage";

   Action.addTargetLock = function(targetLock)
   {
      InputValidator.validateNotNull("targetLock", targetLock);

      return (
      {
         type: Action.ADD_TARGET_LOCK,
         targetLock: targetLock,
      });
   };

   Action.clearEvent = function()
   {
      return (
      {
         type: Action.CLEAR_EVENT,
      });
   };

   Action.clearPhase = function()
   {
      return (
      {
         type: Action.CLEAR_PHASE,
      });
   };

   Action.dequeueEvent = function()
   {
      return (
      {
         type: Action.DEQUEUE_EVENT,
      });
   };

   Action.dequeuePhase = function()
   {
      return (
      {
         type: Action.DEQUEUE_PHASE,
      });
   };

   Action.enqueueEvent = function(eventKey, eventToken, eventCallback, eventContext)
   {
      InputValidator.validateNotNull("eventKey", eventKey);
      InputValidator.validateNotNull("eventToken", eventToken);
      // eventCallback optional.
      // eventContext optional.

      return (
      {
         type: Action.ENQUEUE_EVENT,
         eventKey: eventKey,
         eventToken: eventToken,
         eventCallback: eventCallback,
         eventContext: eventContext,
      });
   };

   Action.enqueuePhase = function(phaseKey, phaseToken, phaseCallback, phaseContext)
   {
      InputValidator.validateNotNull("phaseKey", phaseKey);
      // phaseToken optional.
      // phaseCallback optional.
      // phaseContext optional.

      return (
      {
         type: Action.ENQUEUE_PHASE,
         phaseKey: phaseKey,
         phaseToken: phaseToken,
         phaseCallback: phaseCallback,
         phaseContext: phaseContext,
      });
   };

   Action.incrementNextTargetLockId = function()
   {
      return (
      {
         type: Action.INCREMENT_NEXT_TARGET_LOCK_ID,
      });
   };

   Action.removeTargetLock = function(targetLock)
   {
      InputValidator.validateNotNull("targetLock", targetLock);

      return (
      {
         type: Action.REMOVE_TARGET_LOCK,
         targetLock: targetLock,
      });
   };

   Action.setAdjudicator = function(adjudicator)
   {
      InputValidator.validateNotNull("adjudicator", adjudicator);

      return (
      {
         type: Action.SET_ADJUDICATOR,
         adjudicator: adjudicator,
      });
   };

   Action.setEnvironment = function(environment)
   {
      InputValidator.validateNotNull("environment", environment);

      return (
      {
         type: Action.SET_ENVIRONMENT,
         environment: environment,
      });
   };

   Action.setGameOver = function(winner)
   {
      return (
      {
         type: Action.SET_GAME_OVER,
         winner: winner,
      });
   };

   Action.setTokenActivationAction = function(tokenId, activationActionValues)
   {
      InputValidator.validateIsNumber("tokenId", tokenId);
      // activationActionValues optional.

      return (
      {
         type: Action.SET_TOKEN_ACTIVATION_ACTION,
         tokenId: tokenId,
         activationActionValues: activationActionValues,
      });
   };

   Action.setTokenAttackDice = function(tokenId, attackDiceValues)
   {
      InputValidator.validateIsNumber("tokenId", tokenId);
      // attackDiceValues optional.

      return (
      {
         type: Action.SET_TOKEN_ATTACK_DICE,
         tokenId: tokenId,
         attackDiceValues: attackDiceValues,
      });
   };

   Action.setTokenCombatAction = function(token, combatAction)
   {
      InputValidator.validateNotNull("token", token);
      // combatAction optional.

      return (
      {
         type: Action.SET_TOKEN_COMBAT_ACTION,
         token: token,
         combatAction: combatAction,
      });
   };

   Action.setTokenDamageDealer = function(token, damageDealer)
   {
      InputValidator.validateNotNull("token", token);
      // damageDealer optional.

      return (
      {
         type: Action.SET_TOKEN_DAMAGE_DEALER,
         token: token,
         damageDealer: damageDealer,
      });
   };

   Action.setTokenDefenderHit = function(token, isDefenderHit)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("isDefenderHit", isDefenderHit);

      return (
      {
         type: Action.SET_TOKEN_DEFENDER_HIT,
         token: token,
         isDefenderHit: isDefenderHit,
      });
   };

   Action.setTokenDefenseDice = function(tokenId, defenseDiceValues)
   {
      InputValidator.validateIsNumber("tokenId", tokenId);
      // defenseDiceValues optional.

      return (
      {
         type: Action.SET_TOKEN_DEFENSE_DICE,
         tokenId: tokenId,
         defenseDiceValues: defenseDiceValues,
      });
   };

   Action.setTokenInFiringArc = function(token, isInFiringArc)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("isInFiringArc", isInFiringArc);

      return (
      {
         type: Action.SET_TOKEN_IN_FIRING_ARC,
         token: token,
         isInFiringArc: isInFiringArc,
      });
   };

   Action.setTokenManeuver = function(token, maneuver)
   {
      InputValidator.validateNotNull("token", token);
      // maneuver optional.

      return (
      {
         type: Action.SET_TOKEN_MANEUVER,
         token: token,
         maneuver: maneuver,
      });
   };

   Action.setTokenManeuverAction = function(tokenId, maneuverActionValues)
   {
      InputValidator.validateIsNumber("tokenId", tokenId);
      // maneuverActionValues optional.

      return (
      {
         type: Action.SET_TOKEN_MANEUVER_ACTION,
         tokenId: tokenId,
         maneuverActionValues: maneuverActionValues,
      });
   };

   Action.setTokenRange = function(token, rangeKey)
   {
      InputValidator.validateNotNull("token", token);
      // rangeKey optional.

      return (
      {
         type: Action.SET_TOKEN_RANGE,
         token: token,
         rangeKey: rangeKey,
      });
   };

   Action.setUserMessage = function(userMessage)
   {
      InputValidator.validateNotNull("userMessage", userMessage);

      return (
      {
         type: Action.SET_USER_MESSAGE,
         userMessage: userMessage,
      });
   };

   if (Object.freeze)
   {
      Object.freeze(Action);
   }

   return Action;
});
