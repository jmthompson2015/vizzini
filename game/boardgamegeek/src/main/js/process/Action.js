define(function()
{
    "use strict";
    var Action = {};

    Action.MERGE_ENTITY_MAP = "mergeEntityMap";
    Action.MERGE_GAME_DETAIL_MAP = "mergeGameDetailMap";
    Action.MERGE_GAME_SUMMARY_MAP = "mergeGameSummaryMap";
    Action.REMOVE_FILTERS = "removeFilters";
    Action.RESET_GAME_DETAIL_MAP = "resetGameDetailMap";
    Action.SET_DEFAULT_FILTERS = "setDefaultFilters";
    Action.SET_ENTITY_TIMESTAMP = "setEntitiesTimestamp";
    Action.SET_FILTERS = "setFilters";
    Action.SET_GAME_DATABASE = "setGameDatabase";
    Action.SET_GAME_DETAIL_TIMESTAMP = "setGameDetailsTimestamp";
    Action.SET_GAME_SUMMARY_TIMESTAMP = "setGameSummariesTimestamp";

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

    Action.removeFilters = function()
    {
        return (
        {
            type: Action.REMOVE_FILTERS,
        });
    };

    Action.resetGameDetailMap = function()
    {
        return (
        {
            type: Action.RESET_GAME_DETAIL_MAP,
        });
    };

    Action.setDefaultFilters = function()
    {
        return (
        {
            type: Action.SET_DEFAULT_FILTERS,
        });
    };

    Action.setEntityTimestamp = function(entityTimestamp)
    {
        return (
        {
            type: Action.SET_ENTITY_TIMESTAMP,
            entityTimestamp: entityTimestamp,
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

    Action.setGameDetailTimestamp = function(gameDetailTimestamp)
    {
        return (
        {
            type: Action.SET_GAME_DETAIL_TIMESTAMP,
            gameDetailTimestamp: gameDetailTimestamp,
        });
    };

    Action.setGameSummaryTimestamp = function(gameSummaryTimestamp)
    {
        return (
        {
            type: Action.SET_GAME_SUMMARY_TIMESTAMP,
            gameSummaryTimestamp: gameSummaryTimestamp,
        });
    };

    if (Object.freeze)
    {
        Object.freeze(Action);
    }

    return Action;
});
