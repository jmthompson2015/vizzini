define(function()
{
    "use strict";

    function EntityFilter(props)
    {
        InputValidator.validateNotNull("props", props);
        LOGGER.debug("EntityFilter props = " + JSON.stringify(props, null, "   "));

        this.columnKey = function()
        {
            return props.columnKey;
        };

        this.passes = function(gameSummary, gameDetail)
        {
            InputValidator.validateNotNull("gameSummary", gameSummary);
            LOGGER.debug("EntityFilter gameSummary = " + JSON.stringify(gameSummary, null, "   "));
            LOGGER.debug("EntityFilter gameDetail = " + JSON.stringify(gameDetail, null, "   "));

            var value = determineValue(gameSummary, gameDetail);
            LOGGER.debug("EntityFilter value = " + value);
            var passes = true;

            if (props.ids.length > 0)
            {
                passes = props.isAnd;

                props.ids.forEach(function(id)
                {
                    passes = (props.isAnd ? passes && value.vizziniContains(parseInt(id)) : passes ||
                        value.vizziniContains(parseInt(id)));
                });
            }

            return passes;
        };

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
            columnKey: columnKey,
            ids: ids,
            isAnd: isAnd,
        });
    };

    return EntityFilter;
});
