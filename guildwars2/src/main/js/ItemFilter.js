/*
 * Provides an item filter.
 */
var ItemFilter =
{
    filter: function(results, rarityId, bidRange, askRange, supplyRange,
            demandRange, askBidRatioRange, demandSupplyRatioRange)
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

                if (ItemFilter.passesFilters(result, rarityId, bidRange,
                        askRange, supplyRange, demandRange, askBidRatioRange,
                        demandSupplyRatioRange))
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
    },

    passesFilters: function(result, rarityId, bidRange, askRange, supplyRange,
            demandRange, askBidRatioRange, demandSupplyRatioRange)
    {
        return (this.passesRarityFilter(result, rarityId)
                && this.passesBidFilter(result, bidRange)
                && this.passesAskFilter(result, askRange)
                && this.passesSupplyFilter(result, supplyRange)
                && this.passesDemandFilter(result, demandRange)
                && this.passesAskBidRatioFilter(result, askBidRatioRange) && this
                .passesDemandSupplyRatioFilter(result, demandSupplyRatioRange));
    },

    passesAskBidRatioFilter: function(result, range)
    {
        return range.passesRangeFilter(ItemComputer.computeAskBidRatio(result));
    },

    passesAskFilter: function(result, range)
    {
        return range.passesRangeFilter(ItemComputer.getAsk(result));
    },

    passesBidFilter: function(result, range)
    {
        return range.passesRangeFilter(ItemComputer.getBid(result));
    },

    passesDemandFilter: function(result, range)
    {
        return range.passesRangeFilter(ItemComputer.getDemand(result));
    },

    passesDemandSupplyRatioFilter: function(result, range)
    {
        return range.passesRangeFilter(ItemComputer
                .computeDemandSupplyRatio(result));
    },

    passesRarityFilter: function(result, rarityId)
    {
        return (rarityId === "*all*" || ItemComputer.getRarityId(result) == rarityId);
    },

    passesSupplyFilter: function(result, range)
    {
        return range.passesRangeFilter(ItemComputer.getSupply(result));
    },
}
