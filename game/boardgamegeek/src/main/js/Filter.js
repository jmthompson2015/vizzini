// require("Logger");
// require("InputValidator");
// require("ArrayAugments");

function EntityFilter(props)
{
    InputValidator.validateNotNull("props", props);

    this.passes = function(gameSummary, gameDetail)
    {
        InputValidator.validateNotNull("gameSummary", gameSummary);

        var value = determineValue(gameSummary, gameDetail);
        var passes = true;

        if (props.ids.length > 0)
        {
            passes = props.isAnd;

            props.ids.forEach(function(id)
            {
                passes = (props.isAnd ? passes && value.vizziniContains(parseInt(id)) : passes
                        || value.vizziniContains(parseInt(id)));
            });
        }

        return passes;
    }

    function determineValue(gameSummary, gameDetail)
    {
        var value = gameSummary[props.columnKey];

        if (!value && gameDetail)
        {
            value = gameDetail[props.columnKey];
        }

        var answer;

        if (value)
        {
            answer = value.map(function(entity)
            {
                return entity.id;
            });
        }

        return answer;
    }
}

EntityFilter.newFilterProps = function(columnKey, ids, isAnd)
{
    InputValidator.validateNotNull("columnKey", columnKey);
    InputValidator.validateNotNull("ids", ids);
    InputValidator.validateNotNull("isAnd", isAnd);

    return (
    {
        filterType: "entity",
        columnKey: columnKey,
        ids: ids,
        isAnd: isAnd,
    });
}

function RangeFilter(props)
{
    InputValidator.validateNotNull("props", props);

    this.passes = function(gameSummary, gameDetail)
    {
        InputValidator.validateNotNull("gameSummary", gameSummary);

        var value = determineValue(gameSummary, gameDetail);

        return (!props.isMinEnabled || props.minValue <= value) && (!props.isMaxEnabled || value <= props.maxValue);
    }

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
}
