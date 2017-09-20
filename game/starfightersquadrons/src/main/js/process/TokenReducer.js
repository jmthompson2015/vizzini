define(["process/TokenAction"], function(TokenAction)
{
   var TokenReducer = {};

   TokenReducer.reduce = function(state, action)
   {
      LOGGER.debug("root() type = " + action.type);

      if (typeof state === 'undefined')
      {
         return new InitialState();
      }

      switch (action.type)
      {
         case TokenAction.ADD_COUNT:
         case TokenAction.SET_COUNT:
            // LOGGER.info("ADD_COUNT || SET_COUNT: token = " + action.token + " property = " + action.property + " value = " + action.value);
            var newTokenIdToCounts = TokenReducer.tokenIdToCounts(state.tokenIdToCounts, action);
            return Object.assign(
            {}, state,
            {
               tokenIdToCounts: newTokenIdToCounts,
            });
         case TokenAction.ADD_SECONDARY_WEAPON:
         case TokenAction.REMOVE_SECONDARY_WEAPON:
            var newTokenIdToSecondaryWeapons = TokenReducer.tokenIdToSecondaryWeapons(state.tokenIdToSecondaryWeapons, action);
            return Object.assign(
            {}, state,
            {
               tokenIdToSecondaryWeapons: newTokenIdToSecondaryWeapons,
            });
         case TokenAction.ADD_TOKEN_CRITICAL_DAMAGE:
         case TokenAction.REMOVE_TOKEN_CRITICAL_DAMAGE:
            var newTokenIdToCriticalDamages = TokenReducer.tokenIdToCriticalDamages(state.tokenIdToCriticalDamages, action);
            LOGGER.info("TokenReducer.reduce() newTokenIdToCriticalDamages = " + newTokenIdToCriticalDamages);
            return Object.assign(
            {}, state,
            {
               tokenIdToCriticalDamages: newTokenIdToCriticalDamages,
            });
         case TokenAction.ADD_TOKEN_DAMAGE:
         case TokenAction.REMOVE_TOKEN_DAMAGE:
            var newTokenIdToDamages = TokenReducer.tokenIdToDamages(state.tokenIdToDamages, action);
            return Object.assign(
            {}, state,
            {
               tokenIdToDamages: newTokenIdToDamages,
            });
         case TokenAction.ADD_TOKEN_UPGRADE:
         case TokenAction.REMOVE_TOKEN_UPGRADE:
            var newTokenIdToUpgrades = TokenReducer.tokenIdToUpgrades(state.tokenIdToUpgrades, action);
            return Object.assign(
            {}, state,
            {
               tokenIdToUpgrades: newTokenIdToUpgrades,
            });
         case TokenAction.ADD_TOKEN_UPGRADE_ENERGY:
         case TokenAction.SET_TOKEN_UPGRADE_ENERGY:
            var newTokenIdToUpgradeEnergy = TokenReducer.tokenIdToUpgradeEnergy(state.tokenIdToUpgradeEnergy, action);
            return Object.assign(
            {}, state,
            {
               tokenIdToUpgradeEnergy: newTokenIdToUpgradeEnergy,
            });
         case TokenAction.ADD_TOKEN_USED_ABILITY:
         case TokenAction.CLEAR_TOKEN_USED_ABILITIES:
         case TokenAction.REMOVE_TOKEN_USED_ABILITY:
            newTokenIdToData = TokenReducer.tokenIdToArray(state.tokenIdToUsedAbilities, action.type, action.token.id(), action.ability);
            return Object.assign(
            {}, state,
            {
               tokenIdToUsedAbilities: newTokenIdToData,
            });
         case TokenAction.ADD_TOKEN_USED_PER_ROUND_ABILITY:
         case TokenAction.CLEAR_TOKEN_USED_PER_ROUND_ABILITIES:
         case TokenAction.REMOVE_TOKEN_USED_PER_ROUND_ABILITY:
            newTokenIdToData = TokenReducer.tokenIdToArray(state.tokenIdToUsedPerRoundAbilities, action.type, action.token.id(), action.ability);
            return Object.assign(
            {}, state,
            {
               tokenIdToUsedPerRoundAbilities: newTokenIdToData,
            });
         case TokenAction.INCREMENT_NEXT_TOKEN_ID:
            return Object.assign(
            {}, state,
            {
               nextTokenId: state.nextTokenId + 1,
            });
         case TokenAction.SET_PRIMARY_WEAPON:
            var newTokenIdToPrimaryWeapon = state.tokenIdToPrimaryWeapon.set(action.token.id(), action.weapon);
            return Object.assign(
            {}, state,
            {
               tokenIdToPrimaryWeapon: newTokenIdToPrimaryWeapon,
            });
         case TokenAction.SET_TOKEN:
            // LOGGER.info("SET_TOKEN: payload = " + JSON.stringify(action.payload));
            var newTokens = state.tokens.set(action.payload.get("id"), action.payload);
            return Object.assign(
            {}, state,
            {
               tokens: newTokens,
            });
         default:
            LOGGER.warn("TokenReducer.reduce: Unhandled action type: " + action.type);
            return state;
      }
   };

   TokenReducer.counts = function(state, action)
   {
      LOGGER.debug("counts() type = " + action.type);

      var newCounts;

      switch (action.type)
      {
         case TokenAction.ADD_COUNT:
            var oldValue = (state.get(action.property) ? state.get(action.property) : 0);
            return state.set(action.property, Math.max(oldValue + action.value, 0));
         case TokenAction.SET_COUNT:
            return state.set(action.property, action.value);
         default:
            LOGGER.warn("TokenReducer.counts: Unhandled action type: " + action.type);
            return state;
      }
   };

   TokenReducer.damages = function(state, action)
   {
      LOGGER.debug("damages() type = " + action.type);

      // var newDamages;

      switch (action.type)
      {
         case TokenAction.ADD_TOKEN_CRITICAL_DAMAGE:
         case TokenAction.ADD_TOKEN_DAMAGE:
            // newDamages = (state ? state.slice() : []);
            // newDamages.push(action.damageKey);
            // return newDamages;
            LOGGER.info("TokenReducer.damages() action.damageKey = " + action.damageKey);
            var newDamages = (state ? state : Immutable.List());
            LOGGER.info("TokenReducer.damages() newDamages = " + newDamages);
            return newDamages.push(action.damageKey);
         case TokenAction.REMOVE_TOKEN_CRITICAL_DAMAGE:
         case TokenAction.REMOVE_TOKEN_DAMAGE:
            // newDamages = (state ? state.slice() : []);
            // newDamages.vizziniRemove(action.damageKey);
            // return newDamages;
            if (state)
            {
               var index = state.indexOf(action.damageKey);
               return state.delete(index);
            }
            return Immutable.List();
         default:
            LOGGER.warn("TokenReducer.damages: Unhandled action type: " + action.type);
            return state;
      }
   };

   TokenReducer.tokenIdToArray = function(state, actionType, actionTokenId, actionData)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("actionType", actionType);
      InputValidator.validateIsNumber("actionTokenId", actionTokenId);
      // actionData optional.

      LOGGER.debug("TokenReducer.tokenIdToArray() type = " + actionType);

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
         LOGGER.warn("TokenReducer.tokenIdToArray: Unhandled action type: " + actionType);
         return state;
      }
   };

   TokenReducer.tokenIdToCounts = function(state, action)
   {
      LOGGER.debug("tokenIdToCounts() type = " + action.type);

      var newTokenIdToCounts;

      switch (action.type)
      {
         case TokenAction.ADD_COUNT:
         case TokenAction.SET_COUNT:
            var oldTokenIdToCounts = (state.get(action.token.id()) ? state.get(action.token.id()) : Immutable.Map());
            return state.set(action.token.id(), TokenReducer.counts(oldTokenIdToCounts, action));
         default:
            LOGGER.warn("TokenReducer.tokenIdToCounts: Unhandled action type: " + action.type);
            return state;
      }
   };

   TokenReducer.tokenIdToCriticalDamages = function(state, action)
   {
      LOGGER.debug("tokenIdToCriticalDamages() type = " + action.type);

      // var newTokenIdToCriticalDamages;

      switch (action.type)
      {
         case TokenAction.ADD_TOKEN_CRITICAL_DAMAGE:
         case TokenAction.REMOVE_TOKEN_CRITICAL_DAMAGE:
            // newTokenIdToCriticalDamages = Object.assign(
            // {}, state);
            // newTokenIdToCriticalDamages[action.token.id()] = TokenReducer.damages(state[action.token.id()], action);
            // return newTokenIdToCriticalDamages;
            var id = action.token.id();
            LOGGER.info("TokenReducer.tokenIdToCriticalDamages() id = " + id);
            return state.set(id, TokenReducer.damages(state.get(id), action));
         default:
            LOGGER.warn("TokenReducer.tokenIdToCriticalDamages: Unhandled action type: " + action.type);
            return state;
      }
   };

   TokenReducer.tokenIdToDamages = function(state, action)
   {
      LOGGER.debug("tokenIdToDamages() type = " + action.type);

      // var newTokenIdToDamages;

      switch (action.type)
      {
         case TokenAction.ADD_TOKEN_DAMAGE:
         case TokenAction.REMOVE_TOKEN_DAMAGE:
            // newTokenIdToDamages = Object.assign(
            // {}, state);
            // newTokenIdToDamages[action.token.id()] = TokenReducer.damages(state[action.token.id()], action);
            // return newTokenIdToDamages;
            var id = action.token.id();
            return state.set(id, TokenReducer.damages(state.get(id), action));
         default:
            LOGGER.warn("TokenReducer.tokenIdToDamages: Unhandled action type: " + action.type);
            return state;
      }
   };

   TokenReducer.tokenIdToSecondaryWeapons = function(state, action)
   {
      LOGGER.debug("tokenIdToSecondaryWeapons() type = " + action.type);

      var newSecondaryWeapons, oldSecondaryWeapons;

      switch (action.type)
      {
         case TokenAction.ADD_SECONDARY_WEAPON:
            oldSecondaryWeapons = state.get(action.token.id());
            if (oldSecondaryWeapons === undefined)
            {
               oldSecondaryWeapons = Immutable.List();
            }
            newSecondaryWeapons = oldSecondaryWeapons.push(action.weapon);
            return state.set(action.token.id(), newSecondaryWeapons);
         case TokenAction.REMOVE_SECONDARY_WEAPON:
            oldSecondaryWeapons = state.get(action.token.id());
            if (oldSecondaryWeapons !== undefined)
            {
               var index = oldSecondaryWeapons.indexOf(action.weapon);
               newSecondaryWeapons = oldSecondaryWeapons.remove(index);
               return state.set(action.token.id(), newSecondaryWeapons);
            }
            return state;
         default:
            LOGGER.warn("TokenReducer.tokenIdToSecondaryWeapons: Unhandled action type: " + action.type);
            return state;
      }
   };

   TokenReducer.tokenIdToUpgradeEnergy = function(state, action)
   {
      LOGGER.debug("tokenIdToUpgradeEnergy() type = " + action.type);

      var newTokenIdToUpgradeEnergy;

      switch (action.type)
      {
         case TokenAction.ADD_TOKEN_UPGRADE_ENERGY:
         case TokenAction.SET_TOKEN_UPGRADE_ENERGY:
            var oldTokenIdToUpgradeEnergy = (state.get(action.token.id()) ? state.get(action.token.id()) : Immutable.Map());
            return state.set(action.token.id(), TokenReducer.upgradeEnergy(oldTokenIdToUpgradeEnergy, action));
         default:
            LOGGER.warn("TokenReducer.tokenIdToUpgradeEnergy: Unhandled action type: " + action.type);
            return state;
      }
   };

   TokenReducer.tokenIdToUpgrades = function(state, action)
   {
      LOGGER.debug("tokenIdToUpgrades() type = " + action.type);

      switch (action.type)
      {
         case TokenAction.ADD_TOKEN_UPGRADE:
         case TokenAction.REMOVE_TOKEN_UPGRADE:
            return state.set(action.token.id(), TokenReducer.upgrades(state.get(action.token.id()), action));
         default:
            LOGGER.warn("TokenReducer.tokenIdToUpgrades: Unhandled action type: " + action.type);
            return state;
      }
   };

   TokenReducer.upgradeEnergy = function(state, action)
   {
      LOGGER.debug("upgradeEnergy() type = " + action.type);

      var newUpgradeEnergy;

      switch (action.type)
      {
         case TokenAction.ADD_TOKEN_UPGRADE_ENERGY:
            var oldValue = (state.get(action.property) ? state.get(action.property) : 0);
            return state.set(action.upgradeKey, Math.max(oldValue + action.value, 0));
         case TokenAction.SET_TOKEN_UPGRADE_ENERGY:
            return state.set(action.upgradeKey, action.value);
         default:
            LOGGER.warn("TokenReducer.upgradeEnergy: Unhandled action type: " + action.type);
            return state;
      }
   };

   TokenReducer.upgrades = function(state, action)
   {
      LOGGER.debug("upgrades() type = " + action.type);

      switch (action.type)
      {
         case TokenAction.ADD_TOKEN_UPGRADE:
            var newUpgrades = (state ? state : Immutable.List());
            return newUpgrades.push(action.upgradeKey);
         case TokenAction.REMOVE_TOKEN_UPGRADE:
            if (state)
            {
               var index = state.indexOf(action.upgradeKey);
               return state.delete(index);
            }
            return Immutable.List();
         default:
            LOGGER.warn("TokenReducer.upgrades: Unhandled action type: " + action.type);
            return state;
      }
   };

   return TokenReducer;
});
