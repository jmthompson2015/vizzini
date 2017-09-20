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

      var newTokenIdToData;

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
            newTokenIdToData = TokenReducer.tokenIdToArray(state.tokenIdToSecondaryWeapons, action.type, action.token.id(), action.weapon);
            return Object.assign(
            {}, state,
            {
               tokenIdToSecondaryWeapons: newTokenIdToData,
            });
         case TokenAction.ADD_TOKEN_CRITICAL_DAMAGE:
         case TokenAction.REMOVE_TOKEN_CRITICAL_DAMAGE:
            newTokenIdToData = TokenReducer.tokenIdToArray(state.tokenIdToCriticalDamages, action.type, action.token.id(), action.damageKey);
            return Object.assign(
            {}, state,
            {
               tokenIdToCriticalDamages: newTokenIdToData,
            });
         case TokenAction.ADD_TOKEN_DAMAGE:
         case TokenAction.REMOVE_TOKEN_DAMAGE:
            newTokenIdToData = TokenReducer.tokenIdToArray(state.tokenIdToDamages, action.type, action.token.id(), action.damageKey);
            return Object.assign(
            {}, state,
            {
               tokenIdToDamages: newTokenIdToData,
            });
         case TokenAction.ADD_TOKEN_UPGRADE:
         case TokenAction.REMOVE_TOKEN_UPGRADE:
            newTokenIdToData = TokenReducer.tokenIdToArray(state.tokenIdToUpgrades, action.type, action.token.id(), action.upgradeKey);
            return Object.assign(
            {}, state,
            {
               tokenIdToUpgrades: newTokenIdToData,
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

   TokenReducer.tokenIdToArray = function(state, actionType, actionTokenId, actionData)
   {
      InputValidator.validateNotNull("state", state);
      InputValidator.validateNotNull("actionType", actionType);
      InputValidator.validateIsNumber("actionTokenId", actionTokenId);
      // actionData optional.

      LOGGER.debug("TokenReducer.tokenIdToArray() type = " + actionType);

      var newArray, oldArray;

      switch (actionType)
      {
         case TokenAction.ADD_SECONDARY_WEAPON:
         case TokenAction.ADD_TOKEN_CRITICAL_DAMAGE:
         case TokenAction.ADD_TOKEN_DAMAGE:
         case TokenAction.ADD_TOKEN_UPGRADE:
         case TokenAction.ADD_TOKEN_USED_ABILITY:
         case TokenAction.ADD_TOKEN_USED_PER_ROUND_ABILITY:
            oldArray = state.get(actionTokenId);
            newArray = (oldArray ? oldArray : Immutable.List());
            newArray = newArray.push(actionData);
            return state.set(actionTokenId, newArray);
         case TokenAction.CLEAR_TOKEN_USED_ABILITIES:
         case TokenAction.CLEAR_TOKEN_USED_PER_ROUND_ABILITIES:
            return state.set(actionTokenId, Immutable.List());
         case TokenAction.REMOVE_SECONDARY_WEAPON:
         case TokenAction.REMOVE_TOKEN_CRITICAL_DAMAGE:
         case TokenAction.REMOVE_TOKEN_DAMAGE:
         case TokenAction.REMOVE_TOKEN_UPGRADE:
         case TokenAction.REMOVE_TOKEN_USED_ABILITY:
         case TokenAction.REMOVE_TOKEN_USED_PER_ROUND_ABILITY:
            oldArray = state.get(actionTokenId);
            newArray = (oldArray ? oldArray : Immutable.List());
            var index = newArray.indexOf(actionData);
            newArray = newArray.delete(index);
            return state.set(actionTokenId, newArray);
         default:
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

   return TokenReducer;
});
