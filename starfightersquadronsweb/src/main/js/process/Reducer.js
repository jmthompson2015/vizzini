define([ "InitialState", "process/Action" ], function(InitialState, Action)
{
    "use strict";
    var Reducer = {};

    Reducer.root = function(state, action)
    {
        LOGGER.debug("rootReducer() type = " + action.type);

        if (typeof state === 'undefined') { return new InitialState(); }

        switch (action.type)
        {
        case Action.ADD_ROUND:
            var newRound = state.round + action.value;
            return Object.assign({}, state,
            {
                round: newRound,
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
