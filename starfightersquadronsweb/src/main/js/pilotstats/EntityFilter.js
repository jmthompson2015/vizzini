define(function()
{
    "use strict";

    function EntityFilter(columnKey, values)
    {
        InputValidator.validateNotNull("columnKey", columnKey);
        InputValidator.validateNotNull("values", values);

        this.columnKey = function()
        {
            return columnKey;
        };

        this.values = function()
        {
            return values;
        };

        this.passes = function(data)
        {
            InputValidator.validateNotNull("data", data);

            var value = data[columnKey];

            return values.length === 0 || values.vizziniContains(value);
        };

        this.toString = function()
        {
            return "EntityFilter (" + columnKey + " in [" + values + "])";
        };
    }

    return EntityFilter;
});
