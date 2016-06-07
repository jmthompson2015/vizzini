define([ "InitialState", "process/Action" ], function(InitialState, Action)
{
    "use strict";
    var Reducer = {};

    Reducer.counts = function(state, action)
    {
        LOGGER.debug("counts() type = " + action.type);

        var newCounts;

        switch (action.type)
        {
        case Action.ADD_COUNT:
            var oldValue = (state[action.property] ? state[action.property] : 0);
            newCounts = Object.assign({}, state);
            newCounts[action.property] = Math.max(oldValue + action.value, 0);
            return newCounts;
        case Action.SET_COUNT:
            newCounts = Object.assign({}, state);
            newCounts[action.property] = action.value;
            return newCounts;
        default:
            LOGGER.warn("Reducer.counts: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.damages = function(state, action)
    {
        LOGGER.debug("damages() type = " + action.type);

        var newDamages;

        switch (action.type)
        {
        case Action.ADD_TOKEN_CRITICAL_DAMAGE:
        case Action.ADD_TOKEN_DAMAGE:
            newDamages = (state ? state.slice() : []);
            newDamages.push(action.damageKey);
            return newDamages;
        case Action.REMOVE_TOKEN_CRITICAL_DAMAGE:
        case Action.REMOVE_TOKEN_DAMAGE:
            newDamages = (state ? state.slice() : []);
            newDamages.vizziniRemove(action.damageKey);
            return newDamages;
        default:
            LOGGER.warn("Reducer.damages: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.damageDeck = function(state, action)
    {
        LOGGER.debug("positionToToken() type = " + action.type);

        var newDamageDeck;

        switch (action.type)
        {
        case Action.DRAW_DAMAGE:
            newDamageDeck = state.slice();
            newDamageDeck.vizziniRemove(action.damage);
            return newDamageDeck;
        case Action.SET_DAMAGE_DECK:
            newDamageDeck = action.damageDeck.slice();
            return newDamageDeck;
        default:
            LOGGER.warn("Reducer.damageDeck: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.damageDiscardPile = function(state, action)
    {
        LOGGER.debug("positionToToken() type = " + action.type);

        var newDamageDiscardPile;

        switch (action.type)
        {
        case Action.DISCARD_DAMAGE:
            newDamageDiscardPile = state.slice();
            newDamageDiscardPile.push(action.damage);
            return newDamageDiscardPile;
        default:
            LOGGER.warn("Reducer.damageDiscardPile: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.positionToTokenId = function(state, action)
    {
        LOGGER.debug("positionToTokenId() type = " + action.type);

        var newPositionToTokenId;

        switch (action.type)
        {
        case Action.PLACE_TOKEN:
            newPositionToTokenId = Object.assign({}, state);
            newPositionToTokenId[action.position] = action.token.id();
            return newPositionToTokenId;
        case Action.REMOVE_TOKEN_AT:
            newPositionToTokenId = Object.assign({}, state);
            delete newPositionToTokenId[action.position];
            return newPositionToTokenId;
        default:
            LOGGER.warn("Reducer.positionToTokenId: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.targetLocks = function(state, action)
    {
        LOGGER.debug("targetLocks() type = " + action.type);

        var newTargetLocks;

        switch (action.type)
        {
        case Action.ADD_TARGET_LOCK:
            newTargetLocks = state.slice();
            newTargetLocks.push(action.targetLock);
            return newTargetLocks;
        case Action.REMOVE_TARGET_LOCK:
            newTargetLocks = state.slice();
            newTargetLocks.vizziniRemove(action.targetLock);
            return newTargetLocks;
        default:
            LOGGER.warn("Reducer.targetLocks: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.tokenIdToCounts = function(state, action)
    {
        LOGGER.debug("tokenIdToCounts() type = " + action.type);

        var newTokenIdToCounts;

        switch (action.type)
        {
        case Action.ADD_COUNT:
        case Action.SET_COUNT:
            var oldTokenIdToCounts = (state[action.tokenId] ? state[action.tokenId] : {});
            newTokenIdToCounts = Object.assign({}, state);
            newTokenIdToCounts[action.tokenId] = Reducer.counts(oldTokenIdToCounts, action);
            return newTokenIdToCounts;
        default:
            LOGGER.warn("Reducer.tokenIdToCounts: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.tokenIdToCriticalDamages = function(state, action)
    {
        LOGGER.debug("tokenIdToCriticalDamages() type = " + action.type);

        var newTokenIdToCriticalDamages;

        switch (action.type)
        {
        case Action.ADD_TOKEN_CRITICAL_DAMAGE:
        case Action.REMOVE_TOKEN_CRITICAL_DAMAGE:
            newTokenIdToCriticalDamages = Object.assign({}, state);
            newTokenIdToCriticalDamages[action.tokenId] = Reducer.damages(state[action.tokenId], action);
            return newTokenIdToCriticalDamages;
        default:
            LOGGER.warn("Reducer.tokenIdToDamages: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.tokenIdToDamages = function(state, action)
    {
        LOGGER.debug("tokenIdToDamages() type = " + action.type);

        var newTokenIdToDamages;

        switch (action.type)
        {
        case Action.ADD_TOKEN_DAMAGE:
        case Action.REMOVE_TOKEN_DAMAGE:
            newTokenIdToDamages = Object.assign({}, state);
            newTokenIdToDamages[action.tokenId] = Reducer.damages(state[action.tokenId], action);
            return newTokenIdToDamages;
        default:
            LOGGER.warn("Reducer.tokenIdToDamages: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.tokenIdToPosition = function(state, action)
    {
        LOGGER.debug("tokenIdToPosition() type = " + action.type);

        var newTokenIdToPosition;

        switch (action.type)
        {
        case Action.PLACE_TOKEN:
            newTokenIdToPosition = Object.assign({}, state);
            newTokenIdToPosition[action.token.id()] = action.position;
            return newTokenIdToPosition;
        case Action.REMOVE_TOKEN:
            newTokenIdToPosition = Object.assign({}, state);
            delete newTokenIdToPosition[action.token.id()];
            return newTokenIdToPosition;
        default:
            LOGGER.warn("Reducer.tokenIdToPosition: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.tokenIdToUpgrades = function(state, action)
    {
        LOGGER.debug("tokenIdToUpgrades() type = " + action.type);

        var newTokenIdToUpgrades;

        switch (action.type)
        {
        case Action.ADD_TOKEN_UPGRADE:
        case Action.REMOVE_TOKEN_UPGRADE:
            newTokenIdToUpgrades = Object.assign({}, state);
            newTokenIdToUpgrades[action.tokenId] = Reducer.upgrades(state[action.tokenId], action);
            return newTokenIdToUpgrades;
        default:
            LOGGER.warn("Reducer.tokenIdToUpgrades: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.tokens = function(state, action)
    {
        LOGGER.debug("tokens() type = " + action.type);

        var newTokens;

        switch (action.type)
        {
        case Action.PLACE_TOKEN:
            newTokens = Object.assign({}, state);
            newTokens[action.token.id()] = action.token;
            return newTokens;
        case Action.REMOVE_TOKEN:
            newTokens = Object.assign({}, state);
            delete newTokens[action.token.id()];
            return newTokens;
        default:
            LOGGER.warn("Reducer.tokens: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.upgrades = function(state, action)
    {
        LOGGER.debug("upgrades() type = " + action.type);

        var newUpgrades;

        switch (action.type)
        {
        case Action.ADD_TOKEN_UPGRADE:
            newUpgrades = (state ? state.slice() : []);
            newUpgrades.push(action.upgradeKey);
            return newUpgrades;
        case Action.REMOVE_TOKEN_UPGRADE:
            newUpgrades = (state ? state.slice() : []);
            newUpgrades.vizziniRemove(action.upgradeKey);
            return newUpgrades;
        default:
            LOGGER.warn("Reducer.upgrades: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.root = function(state, action)
    {
        LOGGER.debug("root() type = " + action.type);

        if (typeof state === 'undefined') { return new InitialState(); }

        var newPositionToTokenId, newTokenIdToPosition, newTokens, action2;

        switch (action.type)
        {
        case Action.ADD_COUNT:
        case Action.SET_COUNT:
            var newTokenIdToCounts = Reducer.tokenIdToCounts(state.tokenIdToCounts, action);
            return Object.assign({}, state,
            {
                tokenIdToCounts: newTokenIdToCounts,
            });
        case Action.ADD_ROUND:
            return Object.assign({}, state,
            {
                round: state.round + action.value,
            });
        case Action.ADD_TARGET_LOCK:
        case Action.REMOVE_TARGET_LOCK:
            return Object.assign({}, state,
            {
                targetLocks: Reducer.targetLocks(state.targetLocks, action),
            });
        case Action.ADD_TOKEN_CRITICAL_DAMAGE:
        case Action.REMOVE_TOKEN_CRITICAL_DAMAGE:
            var newTokenIdToCriticalDamages = Reducer.tokenIdToCriticalDamages(state.tokenIdToCriticalDamages, action);
            return Object.assign({}, state,
            {
                tokenIdToCriticalDamages: newTokenIdToCriticalDamages,
            });
        case Action.ADD_TOKEN_DAMAGE:
        case Action.REMOVE_TOKEN_DAMAGE:
            var newTokenIdToDamages = Reducer.tokenIdToDamages(state.tokenIdToDamages, action);
            return Object.assign({}, state,
            {
                tokenIdToDamages: newTokenIdToDamages,
            });
        case Action.ADD_TOKEN_UPGRADE:
        case Action.REMOVE_TOKEN_UPGRADE:
            var newTokenIdToUpgrades = Reducer.tokenIdToUpgrades(state.tokenIdToUpgrades, action);
            return Object.assign({}, state,
            {
                tokenIdToUpgrades: newTokenIdToUpgrades,
            });
        case Action.DISCARD_DAMAGE:
            return Object.assign({}, state,
            {
                damageDiscardPile: Reducer.damageDiscardPile(state.damageDiscardPile, action),
            });
        case Action.DRAW_DAMAGE:
        case Action.SET_DAMAGE_DECK:
            return Object.assign({}, state,
            {
                damageDeck: Reducer.damageDeck(state.damageDeck, action),
            });
        case Action.INCREMENT_NEXT_TARGET_LOCK_ID:
            var newNextTargetLockId = state.nextTargetLockId + 1;
            if (newNextTargetLockId > 51)
            {
                newNextTargetLockId = 0;
            }
            return Object.assign({}, state,
            {
                nextTargetLockId: newNextTargetLockId,
            });
        case Action.INCREMENT_NEXT_TOKEN_ID:
            return Object.assign({}, state,
            {
                nextTokenId: state.nextTokenId + 1,
            });
        case Action.PLACE_TOKEN:
            newPositionToTokenId = Reducer.positionToTokenId(state.positionToTokenId, action);
            newTokenIdToPosition = Reducer.tokenIdToPosition(state.tokenIdToPosition, action);
            newTokens = Reducer.tokens(state.tokens, action);
            return Object.assign({}, state,
            {
                positionToTokenId: newPositionToTokenId,
                tokenIdToPosition: newTokenIdToPosition,
                tokens: newTokens,
            });
        case Action.REMOVE_TOKEN:
            var position = state.tokenIdToPosition[action.token.id()];
            action2 = Action.removeTokenAt(position);
            newPositionToTokenId = Reducer.positionToTokenId(state.positionToTokenId, action2);
            newTokenIdToPosition = Reducer.tokenIdToPosition(state.tokenIdToPosition, action);
            newTokens = Reducer.tokens(state.tokens, action);
            return Object.assign({}, state,
            {
                positionToTokenId: newPositionToTokenId,
                tokenIdToPosition: newTokenIdToPosition,
                tokens: newTokens,
            });
        case Action.REMOVE_TOKEN_AT:
            var tokenId = state.positionToTokenId[action.position];
            var token = state.tokens[tokenId];
            action2 = Action.removeToken(token);
            newPositionToTokenId = Reducer.positionToTokenId(state.positionToTokenId, action);
            newTokenIdToPosition = Reducer.tokenIdToPosition(state.tokenIdToPosition, action2);
            newTokens = Reducer.tokens(state.tokens, action2);
            return Object.assign({}, state,
            {
                positionToTokenId: newPositionToTokenId,
                tokenIdToPosition: newTokenIdToPosition,
                tokens: newTokens,
            });
        case Action.REPLENISH_DAMAGE_DECK:
            var newDamageDeck = state.damageDiscardPile.slice();
            newDamageDeck.vizziniShuffle();
            return Object.assign({}, state,
            {
                damageDeck: newDamageDeck,
                damageDiscardPile: [],
            });
        case Action.RESET_NEXT_TOKEN_ID:
            return Object.assign({}, state,
            {
                nextTokenId: 1,
            });
        case Action.SET_ACTIVE_TOKEN:
            return Object.assign({}, state,
            {
                activeTokenId: action.tokenId,
            });
        case Action.SET_FIRST_AGENT:
            return Object.assign({}, state,
            {
                firstAgent: action.agent,
            });
        case Action.SET_PHASE:
            return Object.assign({}, state,
            {
                phaseKey: action.phaseKey,
            });
        case Action.SET_PLAY_FORMAT:
            return Object.assign({}, state,
            {
                playFormatKey: action.playFormatKey,
            });
        case Action.SET_SECOND_AGENT:
            return Object.assign({}, state,
            {
                secondAgent: action.agent,
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
