define(function()
{
    "use strict";
    function InitialState()
    {
        this.filters = [];
        this.gameDatabase = undefined;

        this.entityTimestamp = 0;
        this.entityMap = {};
        this.gameDetailTimestamp = 0;
        this.gameDetailMap = {};
        this.gameSummaryTimestamp = 0;
        this.gameSummaryMap = {};
    }

    if (Object.freeze)
    {
        Object.freeze(InitialState);
    }

    return InitialState;
});
