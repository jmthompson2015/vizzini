define(["Count"], function(Count)
{
   "use strict";
   var Action = {};

   Action.ADD_ATTACKER_USED_DAMAGE = "addAttackerUsedDamage";
   Action.ADD_ATTACKER_USED_PILOT = "addAttackerUsedPilot";
   Action.ADD_ATTACKER_USED_UPGRADE = "addAttackerUsedUpgrade";
   Action.ADD_COUNT = "addCount";
   Action.ADD_DEFENDER_USED_DAMAGE = "addDefenderUsedDamage";
   Action.ADD_DEFENDER_USED_PILOT = "addDefenderUsedPilot";
   Action.ADD_DEFENDER_USED_UPGRADE = "addDefenderUsedUpgrade";
   Action.ADD_ROUND = "addRound";
   Action.ADD_TARGET_LOCK = "addTargetLock";
   Action.ADD_TOKEN_CRITICAL_DAMAGE = "addTokenCriticalDamage";
   Action.ADD_TOKEN_DAMAGE = "addTokenDamage";
   Action.ADD_TOKEN_PILOT_PER_ROUND = "addTokenPilotPerRound";
   Action.ADD_TOKEN_UPGRADE = "addTokenUpgrade";
   Action.ADD_TOKEN_UPGRADE_ENERGY = "addTokenUpgradeEnergy";
   Action.ADD_TOKEN_UPGRADE_PER_ROUND = "addTokenUpgradePerRound";
   Action.ADD_TOKEN_USED_DAMAGE = "addTokenUsedDamage";
   Action.ADD_TOKEN_USED_PILOT = "addTokenUsedPilot";
   Action.ADD_TOKEN_USED_UPGRADE = "addTokenUsedUpgrade";
   Action.CLEAR_ATTACKER_USED_DAMAGES = "clearAttackerUsedDamages";
   Action.CLEAR_ATTACKER_USED_PILOTS = "clearAttackerUsedPilots";
   Action.CLEAR_ATTACKER_USED_UPGRADES = "clearAttackerUsedUpgrades";
   Action.CLEAR_DEFENDER_USED_DAMAGES = "clearDefenderUsedDamages";
   Action.CLEAR_DEFENDER_USED_PILOTS = "clearDefenderUsedPilots";
   Action.CLEAR_DEFENDER_USED_UPGRADES = "clearDefenderUsedUpgrades";
   Action.CLEAR_EVENT = "clearEvent";
   Action.CLEAR_TOKEN_USED_DAMAGES = "clearTokenUsedDamages";
   Action.CLEAR_TOKEN_USED_PILOTS = "clearTokenUsedPilots";
   Action.CLEAR_TOKEN_USED_UPGRADES = "clearTokenUsedUpgrades";
   Action.DISCARD_DAMAGE = "discardDamage";
   Action.DRAW_DAMAGE = "drawDamage";
   Action.INCREMENT_NEXT_TARGET_LOCK_ID = "incrementNextTargetLockId";
   Action.INCREMENT_NEXT_TOKEN_ID = "incrementNextTokenId";
   Action.MOVE_TOKEN = "moveToken";
   Action.PLACE_TOKEN = "placeToken";
   Action.REMOVE_ATTACKER_USED_UPGRADE = "removeAttackerUsedUpgrade";
   Action.REMOVE_TARGET_LOCK = "removeTargetLock";
   Action.REMOVE_TOKEN = "removeToken";
   Action.REMOVE_TOKEN_AT = "removeTokenAt";
   Action.REMOVE_TOKEN_CRITICAL_DAMAGE = "removeTokenCriticalDamage";
   Action.REMOVE_TOKEN_DAMAGE = "removeTokenDamage";
   Action.REMOVE_TOKEN_UPGRADE = "removeTokenUpgrade";
   Action.REPLENISH_DAMAGE_DECK = "replenishDamageDeck";
   Action.RESET_NEXT_TOKEN_ID = "resetNextTokenId";
   Action.SET_ACTIVE_TOKEN = "setActiveToken";
   Action.SET_ADJUDICATOR = "setAdjudicator";
   Action.SET_COUNT = "setCount";
   Action.SET_DAMAGE_DECK = "setDamageDeck";
   Action.SET_ENVIRONMENT = "setEnvironment";
   Action.SET_EVENT = "setEvent";
   Action.SET_FIRST_AGENT = "setFirstAgent";
   Action.SET_GAME_OVER = "setGameOver";
   Action.SET_PHASE = "setPhase";
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
   Action.SET_TOKEN_PILOT_PER_ROUND = "setTokenPilotPerRound";
   Action.SET_TOKEN_RANGE = "setTokenRange";
   Action.SET_TOKEN_TOUCHING = "setTokenTouching";
   Action.SET_TOKEN_UPGRADE_ENERGY = "setTokenUpgradeEnergy";
   Action.SET_TOKEN_UPGRADE_PER_ROUND = "setTokenUpgradePerRound";
   Action.SET_USER_MESSAGE = "setUserMessage";
   Action.SET_VALUE = "setValue";

   Action.addAttackerUsedDamage = function(attacker, damageKey)
   {
      InputValidator.validateNotNull("attacker", attacker);
      InputValidator.validateNotNull("damageKey", damageKey);

      return (
      {
         type: Action.ADD_ATTACKER_USED_DAMAGE,
         attacker: attacker,
         damageKey: damageKey,
      });
   };

   Action.addAttackerUsedPilot = function(attacker, pilotKey)
   {
      InputValidator.validateNotNull("attacker", attacker);
      InputValidator.validateNotNull("pilotKey", pilotKey);

      return (
      {
         type: Action.ADD_ATTACKER_USED_PILOT,
         attacker: attacker,
         pilotKey: pilotKey,
      });
   };

   Action.addAttackerUsedUpgrade = function(attacker, upgradeKey)
   {
      InputValidator.validateNotNull("attacker", attacker);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);

      return (
      {
         type: Action.ADD_ATTACKER_USED_UPGRADE,
         attacker: attacker,
         upgradeKey: upgradeKey,
      });
   };

   Action.addCloakCount = function(token, value)
   {
      return Action.addCount(token, Count.CLOAK, value);
   };

   Action.addCount = function(token, property, value)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("property", property);
      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: Action.ADD_COUNT,
         token: token,
         property: property,
         value: myValue,
      });
   };

   Action.addDefenderUsedDamage = function(defender, damageKey)
   {
      InputValidator.validateNotNull("defender", defender);
      InputValidator.validateNotNull("damageKey", damageKey);

      return (
      {
         type: Action.ADD_DEFENDER_USED_DAMAGE,
         defender: defender,
         damageKey: damageKey,
      });
   };

   Action.addDefenderUsedPilot = function(defender, pilotKey)
   {
      InputValidator.validateNotNull("defender", defender);
      InputValidator.validateNotNull("pilotKey", pilotKey);

      return (
      {
         type: Action.ADD_DEFENDER_USED_PILOT,
         defender: defender,
         pilotKey: pilotKey,
      });
   };

   Action.addDefenderUsedUpgrade = function(defender, upgradeKey)
   {
      InputValidator.validateNotNull("defender", defender);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);

      return (
      {
         type: Action.ADD_DEFENDER_USED_UPGRADE,
         defender: defender,
         upgradeKey: upgradeKey,
      });
   };

   Action.addEnergyCount = function(token, value)
   {
      return Action.addCount(token, Count.ENERGY, value);
   };

   Action.addEvadeCount = function(token, value)
   {
      return Action.addCount(token, Count.EVADE, value);
   };

   Action.addFocusCount = function(token, value)
   {
      return Action.addCount(token, Count.FOCUS, value);
   };

   Action.addIonCount = function(token, value)
   {
      return Action.addCount(token, Count.ION, value);
   };

   Action.addReinforceCount = function(token, value)
   {
      return Action.addCount(token, Count.REINFORCE, value);
   };

   Action.addRound = function(value)
   {
      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: Action.ADD_ROUND,
         value: myValue,
      });
   };

   Action.addShieldCount = function(token, value)
   {
      return Action.addCount(token, Count.SHIELD, value);
   };

   Action.addStressCount = function(token, value)
   {
      return Action.addCount(token, Count.STRESS, value);
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

   Action.addTokenCriticalDamage = function(token, damageKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("damageKey", damageKey);

      return (
      {
         type: Action.ADD_TOKEN_CRITICAL_DAMAGE,
         token: token,
         damageKey: damageKey,
      });
   };

   Action.addTokenDamage = function(token, damageKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("damageKey", damageKey);

      return (
      {
         type: Action.ADD_TOKEN_DAMAGE,
         token: token,
         damageKey: damageKey,
      });
   };

   Action.addTokenPilotPerRound = function(token, pilotKey, value)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("pilotKey", pilotKey);
      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: Action.ADD_TOKEN_PILOT_PER_ROUND,
         token: token,
         pilotKey: pilotKey,
         value: myValue,
      });
   };

   Action.addTokenUpgrade = function(token, upgradeKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);

      return (
      {
         type: Action.ADD_TOKEN_UPGRADE,
         token: token,
         upgradeKey: upgradeKey,
      });
   };

   Action.addTokenUpgradeEnergy = function(token, upgradeKey, value)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);
      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: Action.ADD_TOKEN_UPGRADE_ENERGY,
         token: token,
         upgradeKey: upgradeKey,
         value: myValue,
      });
   };

   Action.addTokenUpgradePerRound = function(token, upgradeKey, value)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);
      var myValue = (value !== undefined ? value : 1);

      return (
      {
         type: Action.ADD_TOKEN_UPGRADE_PER_ROUND,
         token: token,
         upgradeKey: upgradeKey,
         value: myValue,
      });
   };

   Action.addTokenUsedDamage = function(token, damageKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("damageKey", damageKey);

      return (
      {
         type: Action.ADD_TOKEN_USED_DAMAGE,
         token: token,
         damageKey: damageKey,
      });
   };

   Action.addTokenUsedPilot = function(token, pilotKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("pilotKey", pilotKey);

      return (
      {
         type: Action.ADD_TOKEN_USED_PILOT,
         token: token,
         pilotKey: pilotKey,
      });
   };

   Action.addTokenUsedUpgrade = function(token, upgradeKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);

      return (
      {
         type: Action.ADD_TOKEN_USED_UPGRADE,
         token: token,
         upgradeKey: upgradeKey,
      });
   };

   Action.addTractorBeamCount = function(token, value)
   {
      return Action.addCount(token, Count.TRACTOR_BEAM, value);
   };

   Action.addWeaponsDisabledCount = function(token, value)
   {
      return Action.addCount(token, Count.WEAPONS_DISABLED, value);
   };

   Action.clearAttackerUsedDamages = function(attacker)
   {
      InputValidator.validateNotNull("attacker", attacker);

      return (
      {
         type: Action.CLEAR_ATTACKER_USED_DAMAGES,
         attacker: attacker,
      });
   };

   Action.clearAttackerUsedPilots = function(attacker)
   {
      InputValidator.validateNotNull("attacker", attacker);

      return (
      {
         type: Action.CLEAR_ATTACKER_USED_PILOTS,
         attacker: attacker,
      });
   };

   Action.clearAttackerUsedUpgrades = function(attacker)
   {
      InputValidator.validateNotNull("attacker", attacker);

      return (
      {
         type: Action.CLEAR_ATTACKER_USED_UPGRADES,
         attacker: attacker,
      });
   };

   Action.clearDefenderUsedDamages = function(defender)
   {
      InputValidator.validateNotNull("defender", defender);

      return (
      {
         type: Action.CLEAR_DEFENDER_USED_DAMAGES,
         defender: defender,
      });
   };

   Action.clearDefenderUsedPilots = function(defender)
   {
      InputValidator.validateNotNull("defender", defender);

      return (
      {
         type: Action.CLEAR_DEFENDER_USED_PILOTS,
         defender: defender,
      });
   };

   Action.clearDefenderUsedUpgrades = function(defender)
   {
      InputValidator.validateNotNull("defender", defender);

      return (
      {
         type: Action.CLEAR_DEFENDER_USED_UPGRADES,
         defender: defender,
      });
   };

   Action.clearEvent = function()
   {
      return (
      {
         type: Action.CLEAR_EVENT,
      });
   };

   Action.clearTokenUsedDamages = function(token)
   {
      InputValidator.validateNotNull("token", token);

      return (
      {
         type: Action.CLEAR_TOKEN_USED_DAMAGES,
         token: token,
      });
   };

   Action.clearTokenUsedPilots = function(token)
   {
      InputValidator.validateNotNull("token", token);

      return (
      {
         type: Action.CLEAR_TOKEN_USED_PILOTS,
         token: token,
      });
   };

   Action.clearTokenUsedUpgrades = function(token)
   {
      InputValidator.validateNotNull("token", token);

      return (
      {
         type: Action.CLEAR_TOKEN_USED_UPGRADES,
         token: token,
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

   Action.incrementNextTargetLockId = function()
   {
      return (
      {
         type: Action.INCREMENT_NEXT_TARGET_LOCK_ID,
      });
   };

   Action.incrementNextTokenId = function()
   {
      return (
      {
         type: Action.INCREMENT_NEXT_TOKEN_ID,
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

      return (
      {
         type: Action.PLACE_TOKEN,
         position: position,
         token: token,
      });
   };

   Action.removeAttackerUsedUpgrade = function(attacker, upgradeKey)
   {
      InputValidator.validateNotNull("attacker", attacker);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);

      return (
      {
         type: Action.REMOVE_ATTACKER_USED_UPGRADE,
         attacker: attacker,
         upgradeKey: upgradeKey,
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

   Action.removeTokenCriticalDamage = function(token, damageKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("damageKey", damageKey);

      return (
      {
         type: Action.REMOVE_TOKEN_CRITICAL_DAMAGE,
         token: token,
         damageKey: damageKey,
      });
   };

   Action.removeTokenDamage = function(token, damageKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("damageKey", damageKey);

      return (
      {
         type: Action.REMOVE_TOKEN_DAMAGE,
         token: token,
         damageKey: damageKey,
      });
   };

   Action.removeTokenUpgrade = function(token, upgradeKey)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);

      return (
      {
         type: Action.REMOVE_TOKEN_UPGRADE,
         token: token,
         upgradeKey: upgradeKey,
      });
   };

   Action.replenishDamageDeck = function()
   {
      return (
      {
         type: Action.REPLENISH_DAMAGE_DECK,
      });
   };

   Action.resetNextTokenId = function()
   {
      return (
      {
         type: Action.RESET_NEXT_TOKEN_ID,
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

   Action.setCloakCount = function(token, value)
   {
      return Action.setCount(token, Count.CLOAK, value);
   };

   Action.setCount = function(token, property, value)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("property", property);
      var myValue = (value ? value : 0);

      return (
      {
         type: Action.SET_COUNT,
         token: token,
         property: property,
         value: myValue,
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

   Action.setEnergyCount = function(token, value)
   {
      return Action.setCount(token, Count.ENERGY, value);
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

   Action.setEvadeCount = function(token, value)
   {
      return Action.setCount(token, Count.EVADE, value);
   };

   Action.setEvent = function(eventKey, token, callback)
   {
      InputValidator.validateNotNull("eventKey", eventKey);
      InputValidator.validateNotNull("token", token);

      return (
      {
         type: Action.SET_EVENT,
         eventKey: eventKey,
         eventToken: token,
         eventCallback: callback,
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

   Action.setFocusCount = function(token, value)
   {
      return Action.setCount(token, Count.FOCUS, value);
   };

   Action.setIonCount = function(token, value)
   {
      return Action.setCount(token, Count.ION, value);
   };

   Action.setPhase = function(phaseKey)
   {
      InputValidator.validateNotNull("phaseKey", phaseKey);

      return (
      {
         type: Action.SET_PHASE,
         phaseKey: phaseKey,
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

   Action.setReinforceCount = function(token, value)
   {
      return Action.setCount(token, Count.REINFORCE, value);
   };

   Action.setShieldCount = function(token, value)
   {
      return Action.setCount(token, Count.SHIELD, value);
   };

   Action.setStressCount = function(token, value)
   {
      return Action.setCount(token, Count.STRESS, value);
   };

   Action.setTokenActivationAction = function(token, activationAction)
   {
      InputValidator.validateNotNull("token", token);
      // activationAction optional.

      return (
      {
         type: Action.SET_TOKEN_ACTIVATION_ACTION,
         token: token,
         activationAction: activationAction,
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

   Action.setTokenManeuverAction = function(token, maneuverAction)
   {
      InputValidator.validateNotNull("token", token);
      // maneuverAction optional.

      return (
      {
         type: Action.SET_TOKEN_MANEUVER_ACTION,
         token: token,
         maneuverAction: maneuverAction,
      });
   };

   Action.setTokenPilotPerRound = function(token, pilotKey, value)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("pilotKey", pilotKey);
      var myValue = (value !== undefined ? value : 0);

      return (
      {
         type: Action.SET_TOKEN_PILOT_PER_ROUND,
         token: token,
         pilotKey: pilotKey,
         value: myValue,
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

   Action.setTokenUpgradeEnergy = function(token, upgradeKey, value)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);
      var myValue = (value !== undefined ? value : 0);

      return (
      {
         type: Action.SET_TOKEN_UPGRADE_ENERGY,
         token: token,
         upgradeKey: upgradeKey,
         value: myValue,
      });
   };

   Action.setTokenUpgradePerRound = function(token, upgradeKey, value)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("upgradeKey", upgradeKey);
      var myValue = (value !== undefined ? value : 0);

      return (
      {
         type: Action.SET_TOKEN_UPGRADE_PER_ROUND,
         token: token,
         upgradeKey: upgradeKey,
         value: myValue,
      });
   };

   Action.setTractorBeamCount = function(token, value)
   {
      return Action.setCount(token, Count.TRACTOR_BEAM, value);
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

   Action.setValue = function(token, property, value)
   {
      InputValidator.validateNotNull("token", token);
      InputValidator.validateNotNull("property", property);
      var myValue = (value !== undefined ? value : 0);

      return (
      {
         type: Action.SET_VALUE,
         token: token,
         property: property,
         value: myValue,
      });
   };

   Action.setWeaponsDisabledCount = function(token, value)
   {
      return Action.setCount(token, Count.WEAPONS_DISABLED, value);
   };

   if (Object.freeze)
   {
      Object.freeze(Action);
   }

   return Action;
});
