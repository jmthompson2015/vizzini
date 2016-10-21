define(function()
{
    "use strict";

    function RangeFilter(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue)
    {
        InputValidator.validateNotNull("columnKey", columnKey);
        InputValidator.validateNotNull("isMinEnabled", isMinEnabled);
        InputValidator.validateNotNull("minValue", minValue);
        InputValidator.validateNotNull("isMaxEnabled", isMaxEnabled);
        InputValidator.validateNotNull("maxValue", maxValue);

        this.columnKey = function()
        {
            return columnKey;
        };

        this.isMinEnabled = function()
        {
            return isMinEnabled;
        };

        this.minValue = function()
        {
            return minValue;
        };

        this.isMaxEnabled = function()
        {
            return isMaxEnabled;
        };

        this.maxValue = function()
        {
            return maxValue;
        };

        this.passes = function(data)
        {
            InputValidator.validateNotNull("data", data);

            var value = data[columnKey];

            return (!isMinEnabled || minValue <= value) && (!isMaxEnabled || value <= maxValue);
        };

        this.toObject = function()
        {
            return (
            {
                type: "RangeFilter",
                columnKey: columnKey,
                isMinEnabled: isMinEnabled,
                minValue: minValue,
                isMaxEnabled: isMaxEnabled,
                maxValue: maxValue,
            });
        };

        this.toString = function()
        {
            return "RangeFilter (" + isMinEnabled + " " + minValue + "\u2264" + columnKey + "\u2264" + isMaxEnabled + " " + maxValue + ")";
        };
    }

    RangeFilter.fromObject = function(object)
    {
        InputValidator.validateNotNull("object", object);

        var columnKey = object.columnKey;
        var isMinEnabled = object.isMinEnabled;
        var minValue = object.minValue;
        var isMaxEnabled = object.isMaxEnabled;
        var maxValue = object.maxValue;

        return new RangeFilter(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue);
    };

    return RangeFilter;
});
