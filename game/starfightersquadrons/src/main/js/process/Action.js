define(["Count"], function(Count)
{
   "use strict";
   var Action = {};

   Action.ADD_ROUND = "addRound";
   Action.ADD_TARGET_LOCK = "addTargetLock";
   Action.CLEAR_EVENT = "clearEvent";
   Action.CLEAR_PHASE = "clearPhase";
   Action.DEQUEUE_EVENT = "dequeueEvent";
   Action.DEQUEUE_PHASE = "dequeuePhase";
   Action.DISCARD_DAMAGE = "discardDamage";
   Action.DRAW_DAMAGE = "drawDamage";
   Action.ENQUEUE_EVENT = "enqueueEvent";
   Action.ENQUEUE_PHASE = "enqueuePhase";
   Action.INCREMENT_NEXT_TARGET_LOCK_ID = "incrementNextTargetLockId";
   Action.MOVE_TOKEN = "moveToken";
   Action.PLACE_TOKEN = "placeToken";
   Action.REMOVE_TARGET_LOCK = "removeTargetLock";
   Action.REMOVE_TOKEN = "removeToken";
   Action.REMOVE_TOKEN_AT = "removeTokenAt";
   Action.REPLENISH_DAMAGE_DECK = "replenishDamageDeck";
   Action.SET_ACTIVE_TOKEN = "setActiveToken";
   Action.SET_ADJUDICATOR = "setAdjudicator";
   Action.SET_DAMAGE_DECK = "setDamageDeck";
   Action.SET_ENVIRONMENT = "setEnvironment";
   Action.SET_FIRST_AGENT = "setFirstAgent";
   Action.SET_GAME_OVER = "setGameOver";
   Action.SET_PLAY_AREA_SCALE = "setPlayAreaScale";
   Action.SET_PLAY_FORMAT = "setPlayFormat";
   Action.SET_SECOND_AGENT = "setSecondAgent";
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
   Action.SET_TOKEN_TOUCHING = "setTokenTouching";
   Action.SET_USER_MESSAGE = "setUserMessage";

   Action.addRound = function(value)
   {
      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: Action.ADD_ROUND,
         value: myValue,
      });
   };

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

   Action.discardDamage = function(damage)
   {
      InputValidator.validateNotNull("damage", damage);

      return (
      {
         type: Action.DISCARD_DAMAGE,
         damage: damage,
      });
   };

   Action.drawDamage = function(damage)
   {
      InputValidator.validateNotNull("damage", damage);

      return (
      {
         type: Action.DRAW_DAMAGE,
         damage: damage,
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

   Action.moveToken = function(fromPosition, toPosition)
   {
      InputValidator.validateNotNull("fromPosition", fromPosition);
      InputValidator.validateNotNull("toPosition", toPosition);

      return (
      {
         type: Action.MOVE_TOKEN,
         fromPosition: fromPosition,
         toPosition: toPosition,
      });
   };

   Action.placeToken = function(position, token)
   {
      InputValidator.validateNotNull("position", position);
      InputValidator.validateNotNull("token", token);
      InputValidator.validateIsFunction("token.id", token.id);

      return (
      {
         type: Action.PLACE_TOKEN,
         position: position,
         token: token,
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

   Action.removeToken = function(token)
   {
      InputValidator.validateNotNull("token", token);

      return (
      {
         type: Action.REMOVE_TOKEN,
         token: token,
      });
   };

   Action.removeTokenAt = function(position)
   {
      InputValidator.validateNotNull("position", position);

      return (
      {
         type: Action.REMOVE_TOKEN_AT,
         position: position,
      });
   };

   Action.replenishDamageDeck = function()
   {
      return (
      {
         type: Action.REPLENISH_DAMAGE_DECK,
      });
   };

   Action.setActiveToken = function(token)
   {
      return (
      {
         type: Action.SET_ACTIVE_TOKEN,
         token: token,
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

   Action.setDamageDeck = function(damageDeck)
   {
      InputValidator.validateNotNull("damageDeck", damageDeck);

      return (
      {
         type: Action.SET_DAMAGE_DECK,
         damageDeck: damageDeck,
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

   Action.setFirstAgent = function(agent)
   {
      InputValidator.validateNotNull("agent", agent);

      return (
      {
         type: Action.SET_FIRST_AGENT,
         agent: agent,
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

   Action.setPlayAreaScale = function(scale)
   {
      InputValidator.validateNotNull("scale", scale);

      return (
      {
         type: Action.SET_PLAY_AREA_SCALE,
         scale: scale,
      });
   };

   Action.setPlayFormat = function(playFormatKey)
   {
      InputValidator.validateNotNull("playFormatKey", playFormatKey);

      return (
      {
         type: Action.SET_PLAY_FORMAT,
         playFormatKey: playFormatKey,
      });
   };

   Action.setSecondAgent = function(agent)
   {
      InputValidator.validateNotNull("agent", agent);

      return (
      {
         type: Action.SET_SECOND_AGENT,
         agent: agent,
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

   Action.setTokenTouching = function(token, isTouching)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("isTouching", isTouching);

      return (
      {
         type: Action.SET_TOKEN_TOUCHING,
         token: token,
         isTouching: isTouching,
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
