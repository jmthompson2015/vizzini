define([ "InitialState", "process/Action" ], function(InitialState, Action)
{
    "use strict";
    var Reducer = {};

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

    Reducer.positionToToken = function(state, action)
    {
        LOGGER.debug("positionToToken() type = " + action.type);

        var newPositionToToken;

        switch (action.type)
        {
        case Action.PLACE_TOKEN:
            newPositionToToken = Object.assign({}, state);
            newPositionToToken[action.position] = action.token;
            return newPositionToToken;
        case Action.REMOVE_TOKEN_AT:
            newPositionToToken = Object.assign({}, state);
            delete newPositionToToken[action.position];
            return newPositionToToken;
        default:
            LOGGER.warn("Reducer.positionToTokenId: Unhandled action type: " + action.type);
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

    Reducer.root = function(state, action)
    {
        LOGGER.debug("root() type = " + action.type);

        if (typeof state === 'undefined') { return new InitialState(); }

        switch (action.type)
        {
        case Action.ADD_ROUND:
            var newRound = state.round + action.value;
            return Object.assign({}, state,
            {
                round: newRound,
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
        case Action.PLACE_TOKEN:
            var newPositionToToken = Reducer.positionToToken(state.positionToToken, action);
            var newTokenIdToPosition = Reducer.tokenIdToPosition(state.tokenIdToPosition, action);
            return Object.assign({}, state,
            {
                positionToToken: newPositionToToken,
                tokenIdToPosition: newTokenIdToPosition,
            });
        case Action.REMOVE_TOKEN:
            var position = state.tokenIdToPosition[action.token.id()];
            var action2 = Action.removeTokenAt(position);
            var newPositionToToken = Reducer.positionToToken(state.positionToToken, action2);
            var newTokenIdToPosition = Reducer.tokenIdToPosition(state.tokenIdToPosition, action);
            return Object.assign({}, state,
            {
                positionToToken: newPositionToToken,
                tokenIdToPosition: newTokenIdToPosition,
            });
        case Action.REMOVE_TOKEN_AT:
            var token = state.positionToToken[action.position];
            var action2 = Action.removeToken(token);
            var newPositionToToken = Reducer.positionToToken(state.positionToToken, action);
            var newTokenIdToPosition = Reducer.tokenIdToPosition(state.tokenIdToPosition, action2);
            return Object.assign({}, state,
            {
                positionToToken: newPositionToToken,
                tokenIdToPosition: newTokenIdToPosition,
            });
        case Action.REPLENISH_DAMAGE_DECK:
            var newDamageDeck = state.damageDiscardPile.slice();
            newDamageDeck.vizziniShuffle();
            return Object.assign({}, state,
            {
                damageDeck: newDamageDeck,
                damageDiscardPile: [],
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
