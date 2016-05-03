define([ "InitialState", "process/Action" ], function(InitialState, Action)
{
    "use strict";
    var Reducer = {};

    Reducer.root = function(state, action)
    {
        LOGGER.debug("rootReducer() type = " + action.type);

        if (typeof state === 'undefined') { return InitialState.create(); }

        switch (action.type)
        {
        case Action.SET_KEY_STATISTICS:
            var newKeyStatistics = Object.assign({}, state.keyStatistics);
            newKeyStatistics[action.symbol] = action.data;
            return Object.assign({}, state,
            {
                keyStatistics: newKeyStatistics,
            });
        case Action.SET_PERFORMANCE:
            var newPerformance = Object.assign({}, state.performance);
            newPerformance[action.symbol] = action.data;
            return Object.assign({}, state,
            {
                performance: newPerformance,
            });
        case Action.SET_SYMBOLS:
            return Object.assign({}, state,
            {
                symbols: action.symbols,
            });
        default:
            LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
            return state;
        }
    };

    return Reducer;
});
