define(function()
{
    "use strict";
    var Action = {};

    Action.MERGE_GAME_DETAIL_MAP = "mergeGameDetailMap";
    Action.REMOVE_FILTERS = "removeFilters";
    Action.SET_DEFAULT_FILTERS = "setDefaultFilters";
    Action.SET_FILTERS = "setFilters";
    Action.SET_GAME_DATABASE = "setGameDatabase";

    Action.mergeGameDetailMap = function(gameDetailMap)
    {
        return (
        {
            type: Action.MERGE_GAME_DETAIL_MAP,
            gameDetailMap: gameDetailMap,
        });
    };

    Action.removeFilters = function()
    {
        return (
        {
            type: Action.REMOVE_FILTERS,
        });
    };

    Action.setDefaultFilters = function()
    {
        return (
        {
            type: Action.SET_DEFAULT_FILTERS,
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

    if (Object.freeze)
    {
        Object.freeze(Action);
    }

    return Action;
});
