define(function()
{
    "use strict";
    var Action = {};

    Action.MERGE_ENTITY_MAP = "mergeEntityMap";
    Action.MERGE_GAME_DETAIL_MAP = "mergeGameDetailMap";
    Action.MERGE_GAME_SUMMARY_MAP = "mergeGameSummaryMap";
    Action.RESET_GAME_DETAIL_MAP = "resetGameDetailMap";
    Action.SET_ENTITIES_TIMESTAMP = "setEntitiesTimestamp";
    Action.SET_FILTERS = "setFilters";
    Action.SET_GAME_DATABASE = "setGameDatabase";
    Action.SET_GAME_DETAILS_TIMESTAMP = "setGameDetailsTimestamp";
    Action.SET_GAME_SUMMARIES_TIMESTAMP = "setGameSummariesTimestamp";

    Action.mergeEntityMap = function(entityMap)
    {
        return (
        {
            type: Action.MERGE_ENTITY_MAP,
            entityMap: entityMap,
        });
    };

    Action.mergeGameDetailMap = function(gameDetailMap)
    {
        return (
        {
            type: Action.MERGE_GAME_DETAIL_MAP,
            gameDetailMap: gameDetailMap,
        });
    };

    Action.mergeGameSummaryMap = function(gameSummaryMap)
    {
        return (
        {
            type: Action.MERGE_GAME_SUMMARY_MAP,
            gameSummaryMap: gameSummaryMap,
        });
    };

    Action.resetGameDetailMap = function()
    {
        return (
        {
            type: Action.RESET_GAME_DETAIL_MAP,
        });
    };

    Action.setEntitiesTimestamp = function(entitiesTimestamp)
    {
        return (
        {
            type: Action.SET_ENTITIES_TIMESTAMP,
            entitiesTimestamp: entitiesTimestamp,
        });
    };

    Action.setFilters = function(filters)
    {
        return (
        {
            type: Action.SET_FILTERS,
            filters: filters,
        });
    };

    Action.setGameDatabase = function(gameDatabase)
    {
        return (
        {
            type: Action.SET_GAME_DATABASE,
            gameDatabase: gameDatabase,
        });
    };

    Action.setGameDetailsTimestamp = function(gameDetailsTimestamp)
    {
        return (
        {
            type: Action.SET_GAME_DETAILS_TIMESTAMP,
            gameDetailsTimestamp: gameDetailsTimestamp,
        });
    };

    Action.setGameSummariesTimestamp = function(gameSummariesTimestamp)
    {
        return (
        {
            type: Action.SET_GAME_SUMMARIES_TIMESTAMP,
            gameSummariesTimestamp: gameSummariesTimestamp,
        });
    };

    if (Object.freeze)
    {
        Object.freeze(Action);
    }

    return Action;
});
