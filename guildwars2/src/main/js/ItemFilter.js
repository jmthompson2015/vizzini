/*
 * Provides an item filter.
 */
var ItemFilter =
{
    filter: function(results, rarityId, isLowBidEnabled, lowBid,
            isHighBidEnabled, highBid, // bid range
            isLowSupplyEnabled, lowSupply, // supply
            isLowAskBidRatioEnabled, lowAskBidRatio, isHighAskBidRatioEnabled,
            highAskBidRatio, // ask/bid range
            isLowDemandRatioEnabled, lowDemandRatio)
    {
        LOGGER.debug("ItemFilter.filter()");
        LOGGER.debug("rarityId = " + rarityId);

        LOGGER.debug("isLowBidEnabled ? " + isLowBidEnabled);
        LOGGER.debug("lowBid = " + lowBid);
        LOGGER.debug("isHighBidEnabled ? " + isHighBidEnabled);
        LOGGER.debug("highBid = " + highBid);

        LOGGER.debug("isLowSupplyEnabled ? " + isLowSupplyEnabled);
        LOGGER.debug("lowSupply = " + lowSupply);

        LOGGER.debug("isLowAskBidRatioEnabled ? " + isLowAskBidRatioEnabled);
        LOGGER.debug("lowAskBidRatio = " + lowAskBidRatio);
        LOGGER.debug("isHighAskBidRatioEnabled ? " + isHighAskBidRatioEnabled);
        LOGGER.debug("highAskBidRatio = " + highAskBidRatio);

        LOGGER.debug("isLowDemandRatioEnabled ? " + isLowDemandRatioEnabled);
        LOGGER.debug("lowDemandRatio = " + lowDemandRatio);

        var start = new Date().getTime();
        var answer = [];

        if (results)
        {
            var len = results.length;

            for (var i = 0; i < len; i++)
            {
                var result = results[i];

                if (ItemFilter.passesFilters(result, rarityId, isLowBidEnabled,
                        lowBid, isHighBidEnabled, highBid, isLowSupplyEnabled,
                        lowSupply, isLowAskBidRatioEnabled, lowAskBidRatio,
                        isHighAskBidRatioEnabled, highAskBidRatio,
                        isLowDemandRatioEnabled, lowDemandRatio))
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

    passesFilters: function(result, rarityId, isLowBidEnabled, lowBid,
            isHighBidEnabled, highBid, isLowSupplyEnabled, lowSupply,
            isLowAskBidRatioEnabled, lowAskBidRatio, isHighAskBidRatioEnabled,
            highAskBidRatio, isLowDemandRatioEnabled, lowDemandRatio)
    {
        return (this.passesRarityFilter(result, rarityId)
                && this.passesLowBidFilter(result, isLowBidEnabled, lowBid)
                && this.passesHighBidFilter(result, isHighBidEnabled, highBid)
                && this.passesLowSupplyFilter(result, isLowSupplyEnabled,
                        lowSupply)
                && this.passesLowAskBidRatioFilter(result,
                        isLowAskBidRatioEnabled, lowAskBidRatio)
                && this.passesHighAskBidRatioFilter(result,
                        isHighAskBidRatioEnabled, highAskBidRatio) && this
                .passesLowDemandRatioFilter(result, isLowDemandRatioEnabled,
                        lowDemandRatio));
    },

    passesHighAskBidRatioFilter: function(result, isHighAskBidRatioEnabled,
            highAskBidRatio)
    {
        return (!isHighAskBidRatioEnabled || (ItemComputer
                .computeRatioAskToBid(result) < highAskBidRatio));
    },

    passesHighBidFilter: function(result, isHighBidEnabled, highBid)
    {
        return (!isHighBidEnabled || (ItemComputer.getBid(result) < highBid));
    },

    passesLowAskBidRatioFilter: function(result, isLowAskBidRatioEnabled,
            lowAskBidRatio)
    {
        return (!isLowAskBidRatioEnabled || (ItemComputer
                .computeRatioAskToBid(result) >= lowAskBidRatio));
    },

    passesLowBidFilter: function(result, isLowBidEnabled, lowBid)
    {
        return (!isLowBidEnabled || (ItemComputer.getBid(result) >= lowBid));
    },

    passesLowDemandRatioFilter: function(result, isLowDemandRatioEnabled,
            lowDemandRatio)
    {
        return (!isLowDemandRatioEnabled || (ItemComputer
                .computeRatioDemandToSupply(result) >= lowDemandRatio));
    },

    passesLowSupplyFilter: function(result, isLowSupplyEnabled, lowSupply)
    {
        return (!isLowSupplyEnabled || (ItemComputer.getSupply(result) >= lowSupply));
    },

    passesRarityFilter: function(result, rarityId)
    {
        return (rarityId === "*all*" || ItemComputer.getRarityId(result) == rarityId);
    },

    passesUnfilledDemandFilter: function(result, isUnfilledDemandEnabled)
    {
        return (!isUnfilledDemandEnabled || (ItemComputer.getDemand(result) > ItemComputer
                .getSupply(result)));
    },
}
