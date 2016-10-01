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
        case Action.SET_ENTITIES_TIMESTAMP:
            LOGGER.info("Reducer entitiesTimestamp = " + action.entitiesTimestamp);
            return Object.assign({}, state,
            {
                entitiesTimestamp: action.entitiesTimestamp,
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
        case Action.SET_GAME_DETAILS_TIMESTAMP:
            LOGGER.info("Reducer gameDetailsTimestamp = " + action.gameDetailsTimestamp);
            return Object.assign({}, state,
            {
                gameDetailsTimestamp: action.gameDetailsTimestamp,
            });
        case Action.SET_GAME_SUMMARIES_TIMESTAMP:
            LOGGER.info("Reducer gameSummariesTimestamp = " + action.gameSummariesTimestamp);
            return Object.assign({}, state,
            {
                gameSummariesTimestamp: action.gameSummariesTimestamp,
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
