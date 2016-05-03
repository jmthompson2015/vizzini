define(function()
{
    "use strict";
    var InitialState = {};

    InitialState.create = function()
    {
        return (
        {
            symbols: [],

            // ////////////////////////////////////////////////////////////////
            // Entities.
            keyStatistics: {
            // symbol: data
            },

            performance: {
            // symbol: data
            }
        });
    };

    return InitialState;
});
