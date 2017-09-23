"use strict";

define(function()
{
   var EnvironmentAction = {};

   EnvironmentAction.ADD_ROUND = "addRound";
   EnvironmentAction.DISCARD_DAMAGE = "discardDamage";
   EnvironmentAction.DRAW_DAMAGE = "drawDamage";
   EnvironmentAction.MOVE_TOKEN = "moveToken";
   EnvironmentAction.PLACE_TOKEN = "placeToken";
   EnvironmentAction.REMOVE_TOKEN = "removeToken";
   EnvironmentAction.REMOVE_TOKEN_AT = "removeTokenAt";
   EnvironmentAction.REPLENISH_DAMAGE_DECK = "replenishDamageDeck";
   EnvironmentAction.SET_ACTIVE_TOKEN = "setActiveToken";
   EnvironmentAction.SET_DAMAGE_DECK = "setDamageDeck";
   EnvironmentAction.SET_FIRST_AGENT = "setFirstAgent";
   EnvironmentAction.SET_FIRST_SQUAD = "setFirstSquad";
   EnvironmentAction.SET_PLAY_AREA_SCALE = "setPlayAreaScale";
   EnvironmentAction.SET_PLAY_FORMAT = "setPlayFormat";
   EnvironmentAction.SET_SECOND_AGENT = "setSecondAgent";
   EnvironmentAction.SET_SECOND_SQUAD = "setSecondSquad";
   EnvironmentAction.SET_TOKEN_TOUCHING = "setTokenTouching";

   EnvironmentAction.addRound = function(value)
   {
      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: EnvironmentAction.ADD_ROUND,
         value: myValue,
      });
   };

   EnvironmentAction.discardDamage = function(damage)
   {
      InputValidator.validateNotNull("damage", damage);

      return (
      {
         type: EnvironmentAction.DISCARD_DAMAGE,
         damage: damage,
      });
   };

   EnvironmentAction.drawDamage = function(damage)
   {
      InputValidator.validateNotNull("damage", damage);

      return (
      {
         type: EnvironmentAction.DRAW_DAMAGE,
         damage: damage,
      });
   };

   EnvironmentAction.moveToken = function(fromPosition, toPosition)
   {
      InputValidator.validateNotNull("fromPosition", fromPosition);
      InputValidator.validateNotNull("toPosition", toPosition);

      return (
      {
         type: EnvironmentAction.MOVE_TOKEN,
         fromPosition: fromPosition,
         toPosition: toPosition,
      });
   };

   EnvironmentAction.placeToken = function(position, token)
   {
      InputValidator.validateNotNull("position", position);
      InputValidator.validateNotNull("token", token);
      InputValidator.validateIsFunction("token.id", token.id);

      return (
      {
         type: EnvironmentAction.PLACE_TOKEN,
         position: position,
         token: token,
      });
   };

   EnvironmentAction.removeToken = function(token)
   {
      InputValidator.validateNotNull("token", token);

      return (
      {
         type: EnvironmentAction.REMOVE_TOKEN,
         token: token,
      });
   };

   EnvironmentAction.removeTokenAt = function(position)
   {
      InputValidator.validateNotNull("position", position);

      return (
      {
         type: EnvironmentAction.REMOVE_TOKEN_AT,
         position: position,
      });
   };

   EnvironmentAction.replenishDamageDeck = function()
   {
      return (
      {
         type: EnvironmentAction.REPLENISH_DAMAGE_DECK,
      });
   };

   EnvironmentAction.setActiveToken = function(token)
   {
      return (
      {
         type: EnvironmentAction.SET_ACTIVE_TOKEN,
         token: token,
      });
   };

   EnvironmentAction.setDamageDeck = function(damageDeck)
   {
      InputValidator.validateNotNull("damageDeck", damageDeck);

      return (
      {
         type: EnvironmentAction.SET_DAMAGE_DECK,
         damageDeck: damageDeck,
      });
   };

   EnvironmentAction.setFirstAgent = function(agent)
   {
      InputValidator.validateNotNull("agent", agent);

      return (
      {
         type: EnvironmentAction.SET_FIRST_AGENT,
         agent: agent,
      });
   };

   EnvironmentAction.setFirstSquad = function(squad)
   {
      InputValidator.validateNotNull("squad", squad);

      return (
      {
         type: EnvironmentAction.SET_FIRST_SQUAD,
         squad: squad,
      });
   };

   EnvironmentAction.setPlayAreaScale = function(scale)
   {
      InputValidator.validateNotNull("scale", scale);

      return (
      {
         type: EnvironmentAction.SET_PLAY_AREA_SCALE,
         scale: scale,
      });
   };

   EnvironmentAction.setPlayFormat = function(playFormatKey)
   {
      InputValidator.validateNotNull("playFormatKey", playFormatKey);

      return (
      {
         type: EnvironmentAction.SET_PLAY_FORMAT,
         playFormatKey: playFormatKey,
      });
   };

   EnvironmentAction.setSecondAgent = function(agent)
   {
      InputValidator.validateNotNull("agent", agent);

      return (
      {
         type: EnvironmentAction.SET_SECOND_AGENT,
         agent: agent,
      });
   };

   EnvironmentAction.setSecondSquad = function(squad)
   {
      InputValidator.validateNotNull("squad", squad);

      return (
      {
         type: EnvironmentAction.SET_SECOND_SQUAD,
         squad: squad,
      });
   };

   EnvironmentAction.setTokenTouching = function(token, isTouching)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateIsBoolean("isTouching", isTouching);

      return (
      {
         type: EnvironmentAction.SET_TOKEN_TOUCHING,
         token: token,
         isTouching: isTouching,
      });
   };

   if (Object.freeze)
   {
      Object.freeze(EnvironmentAction);
   }

   return EnvironmentAction;
});
