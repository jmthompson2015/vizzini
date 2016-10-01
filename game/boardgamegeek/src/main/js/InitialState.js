define(function()
{
    "use strict";
    function InitialState()
    {
        this.filters = [];
        this.gameDatabase = undefined;

        this.entitiesTimestamp = 0;
        this.entityMap = {};
        this.gameDetailsTimestamp = 0;
        this.gameDetailMap = {};
        this.gameSummariesTimestamp = 0;
        this.gameSummaryMap = {};
    }

    if (Object.freeze)
    {
        Object.freeze(InitialState);
    }

    return InitialState;
});
