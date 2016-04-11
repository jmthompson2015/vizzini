define([ "game/Action", "game/Store" ], function(Action, Store)
{
    "use strict";
    var Reducer = {};

    Reducer.Root = function(state, action)
    {
        LOGGER.debug("rootReducer() type = " + action.type);

        if (typeof state === 'undefined') { return Store.InitialState(); }

        switch (action.type)
        {
        case Action.INCREMENT_FIRST_PLAYER:
            var index = state.firstPlayerId + 1;
            index = (index >= state.agents.length ? 0 : index);
            return Object.assign({}, state,
            {
                firstPlayerId: index,
            });
        case Action.INCREMENT_ROUND:
            return Object.assign({}, state,
            {
                round: state.round + 1,
            });
        case Action.SET_ACTIVE_AGENT:
            return Object.assign({}, state,
            {
                activeAgentId: action.agentId,
            });
        case Action.SET_ACTIVE_LOCATION:
            return Object.assign({}, state,
            {
                activeLocation: action.location,
            });
        case Action.SET_ACTIVE_QUEST:
            return Object.assign({}, state,
            {
                activeQuest: action.quest,
            });
        case Action.SET_PHASE:
            return Object.assign({}, state,
            {
                phaseKey: action.phaseKey,
            });
        default:
            LOGGER.warn("Unhandled action type: " + action.type);
            return state;
        }
    };

    return Reducer;
});
