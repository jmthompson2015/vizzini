define([ "InitialState", "process/Action" ], function(InitialState, Action)
{
    "use strict";
    var Reducer = {};

    Reducer.root = function(state, action)
    {
        LOGGER.debug("root() type = " + action.type);

        if (typeof state === 'undefined') { return new InitialState(); }

        var newEntityMap, newGameDetailMap, newGameSummaryMap;

        switch (action.type)
        {
        case Action.MERGE_ENTITY_MAP:
            LOGGER.info("Reducer merge entity map");
            newEntityMap = Object.assign({}, state.entityMap);
            objectMerge(newEntityMap, action.entityMap);
            return Object.assign({}, state,
            {
                entityMap: newEntityMap,
            });
        case Action.MERGE_GAME_DETAIL_MAP:
            LOGGER.info("Reducer merge game detail map");
            newGameDetailMap = Object.assign({}, state.gameDetailMap);
            objectMerge(newGameDetailMap, action.gameDetailMap);
            return Object.assign({}, state,
            {
                gameDetailMap: newGameDetailMap,
            });
        case Action.MERGE_GAME_SUMMARY_MAP:
            LOGGER.info("Reducer merge game summary map");
            newGameSummaryMap = Object.assign({}, state.gameSummaryMap);
            objectMerge(newGameSummaryMap, action.gameSummaryMap);
            return Object.assign({}, state,
            {
                gameSummaryMap: newGameSummaryMap,
            });
        case Action.RESET_GAME_DETAIL_MAP:
            LOGGER.info("Reducer reset game detail map");
            return Object.assign({}, state,
            {
                gameDetailMap: {},
            });
        case Action.SET_ENTITY_TIMESTAMP:
            LOGGER.info("Reducer entityTimestamp = " + action.entityTimestamp);
            return Object.assign({}, state,
            {
                entityTimestamp: action.entityTimestamp,
            });
        case Action.SET_FILTERS:
            LOGGER.info("Reducer filters = " + action.filters);
            return Object.assign({}, state,
            {
                filters: action.filters,
            });
        case Action.SET_GAME_DATABASE:
            LOGGER.info("Reducer gameDatabase = " + action.gameDatabase);
            return Object.assign({}, state,
            {
                gameDatabase: action.gameDatabase,
            });
        case Action.SET_GAME_DETAIL_TIMESTAMP:
            LOGGER.info("Reducer gameDetailTimestamp = " + action.gameDetailTimestamp);
            return Object.assign({}, state,
            {
                gameDetailTimestamp: action.gameDetailTimestamp,
            });
        case Action.SET_GAME_SUMMARY_TIMESTAMP:
            LOGGER.info("Reducer gameSummaryTimestamp = " + action.gameSummaryTimestamp);
            return Object.assign({}, state,
            {
                gameSummaryTimestamp: action.gameSummaryTimestamp,
            });
        default:
            LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
            return state;
        }

        function objectMerge(a, b)
        {
            var keys = Object.keys(b);

            for (var i = 0, len = keys.length; i < len; i++)
            {
                var key = keys[i];
                a[key] = b[key];
            }
        }
    };

    if (Object.freeze)
    {
        Object.freeze(Reducer);
    }

    return Reducer;
});
