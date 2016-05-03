define(function()
{
    "use strict";
    var Action = {};

    Action.SET_KEY_STATISTICS = "setKeyStatistics";
    Action.SET_PERFORMANCE = "setPerformance";
    Action.SET_SYMBOLS = "setSymbols";

    Action.setKeyStatistics = function(symbol, data)
    {
        InputValidator.validateNotNull("symbol", symbol);
        InputValidator.validateNotNull("data", data);

        return (
        {
            type: Action.SET_KEY_STATISTICS,
            symbol: symbol,
            data: data,
        });
    };

    Action.setPerformance = function(symbol, data)
    {
        InputValidator.validateNotNull("symbol", symbol);
        InputValidator.validateNotNull("data", data);

        return (
        {
            type: Action.SET_PERFORMANCE,
            symbol: symbol,
            data: data,
        });
    };

    Action.setSymbols = function(symbols)
    {
        InputValidator.validateNotNull("symbols", symbols);

        return (
        {
            type: Action.SET_SYMBOLS,
            symbols: symbols,
        });
    };

    return Action;
});
