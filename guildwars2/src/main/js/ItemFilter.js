/*
 * Provides an item filter.
 */
function ItemFilter(rarityId, bidRange, askRange, supplyRange, demandRange,
        askBidRatioRange, demandSupplyRatioRange)
{
    InputValidator.validateNotNull("rarityId", rarityId);
    InputValidator.validateNotNull("bidRange", bidRange);
    InputValidator.validateNotNull("askRange", askRange);
    InputValidator.validateNotNull("supplyRange", supplyRange);
    InputValidator.validateNotNull("demandRange", demandRange);
    InputValidator.validateNotNull("askBidRatioRange", askBidRatioRange);
    InputValidator.validateNotNull("demandSupplyRatioRange",
            demandSupplyRatioRange);

    this.filter = function(results)
    {
        LOGGER.debug("ItemFilter.filter()");
        LOGGER.debug("rarityId = " + rarityId);

        var start = new Date().getTime();
        var answer = [];

        if (results)
        {
            var len = results.length;

            for (var i = 0; i < len; i++)
            {
                var result = results[i];

                if (this.passesFilters(result))
                {
                    answer[answer.length] = result;
                }
            }
        }

        if (LOGGER.isTimeEnabled())
        {
            LOGGER.time("ItemFilter.filter()", start, new Date().getTime());
        }

        return answer;
    }

    this.passesFilters = function(result)
    {
        return (passesRarityFilter(result, rarityId)
                && passesBidFilter(result, bidRange)
                && passesAskFilter(result, askRange)
                && passesSupplyFilter(result, supplyRange)
                && passesDemandFilter(result, demandRange)
                && passesAskBidRatioFilter(result, askBidRatioRange) && passesDemandSupplyRatioFilter(
                result, demandSupplyRatioRange));
    }

    function passesAskBidRatioFilter(result, range)
    {
        return range.passesRangeFilter(ItemComputer.computeAskBidRatio(result));
    }

    function passesAskFilter(result, range)
    {
        return range.passesRangeFilter(ItemComputer.getAsk(result));
    }

    function passesBidFilter(result, range)
    {
        return range.passesRangeFilter(ItemComputer.getBid(result));
    }

    function passesDemandFilter(result, range)
    {
        return range.passesRangeFilter(ItemComputer.getDemand(result));
    }

    function passesDemandSupplyRatioFilter(result, range)
    {
        return range.passesRangeFilter(ItemComputer
                .computeDemandSupplyRatio(result));
    }

    function passesRarityFilter(result, rarityId)
    {
        return (rarityId === "*all*" || ItemComputer.getRarityId(result) == rarityId);
    }

    function passesSupplyFilter(result, range)
    {
        return range.passesRangeFilter(ItemComputer.getSupply(result));
    }
}
