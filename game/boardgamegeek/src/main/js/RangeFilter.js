define(function()
{
    "use strict";
    function RangeFilter(props)
    {
        InputValidator.validateNotNull("props", props);

        this.passes = function(gameSummary, gameDetail)
        {
            InputValidator.validateNotNull("gameSummary", gameSummary);

            var value = determineValue(gameSummary, gameDetail);

            return (!props.isMinEnabled || props.minValue <= value) && (!props.isMaxEnabled || value <= props.maxValue);
        };

        function determineValue(gameSummary, gameDetail)
        {
            var answer = gameSummary[props.columnKey];

            if (!answer && gameDetail)
            {
                answer = gameDetail[props.columnKey];
            }

            return answer;
        }
    }

    RangeFilter.newFilterProps = function(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue)
    {
        InputValidator.validateNotNull("columnKey", columnKey);
        InputValidator.validateNotNull("isMinEnabled", isMinEnabled);
        InputValidator.validateNotNull("minValue", minValue);
        InputValidator.validateNotNull("isMaxEnabled", isMaxEnabled);
        InputValidator.validateNotNull("maxValue", maxValue);

        return (
        {
            filterType: "range",
            columnKey: columnKey,
            isMinEnabled: isMinEnabled,
            minValue: minValue,
            isMaxEnabled: isMaxEnabled,
            maxValue: maxValue,
        });
    };

    return RangeFilter;
});
