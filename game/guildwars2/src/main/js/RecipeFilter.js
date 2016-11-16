/*
 * Provides a recipe filter.
 */
function RecipeFilter(ratingRange, costRange, bidRange, askRange, supplyRange,
        demandRange, bidCostRatioRange, askCostRatioRange, askBidRatioRange,
        demandSupplyRatioRange)
{
    InputValidator.validateNotNull("ratingRange", ratingRange);
    InputValidator.validateNotNull("costRange", costRange);
    InputValidator.validateNotNull("bidRange", bidRange);
    InputValidator.validateNotNull("askRange", askRange);
    InputValidator.validateNotNull("supplyRange", supplyRange);
    InputValidator.validateNotNull("demandRange", demandRange);
    InputValidator.validateNotNull("bidCostRatioRange", bidCostRatioRange);
    InputValidator.validateNotNull("askCostRatioRange", askCostRatioRange);
    InputValidator.validateNotNull("askBidRatioRange", askBidRatioRange);
    InputValidator.validateNotNull("demandSupplyRatioRange",
            demandSupplyRatioRange);

    this.getRatingRange = function()
    {
        return ratingRange;
    }

    this.getCostRange = function()
    {
        return costRange;
    }

    this.getBidRange = function()
    {
        return bidRange;
    }

    this.getAskRange = function()
    {
        return askRange;
    }

    this.getBidCostRatioRange = function()
    {
        return bidCostRatioRange;
    }

    this.getAskCostRatioRange = function()
    {
        return askCostRatioRange;
    }

    this.getAskBidRatioRange = function()
    {
        return askBidRatioRange;
    }

    this.filter = function(results)
    {
        LOGGER.debug("RecipeFilter.filter()");

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
            LOGGER.time("RecipeFilter.filter()", start, new Date().getTime());
        }

        return answer;
    }

    this.passesFilters = function(result)
    {
        return (passesRatingFilter(result, ratingRange)
                && passesCostFilter(result, costRange)
                && passesBidFilter(result, bidRange)
                && passesAskFilter(result, askRange)
                && passesSupplyFilter(result, supplyRange)
                && passesDemandFilter(result, demandRange)
                && passesBidCostRatioFilter(result, bidCostRatioRange)
                && passesAskCostRatioFilter(result, askCostRatioRange)
                && passesAskBidRatioFilter(result, askBidRatioRange) && passesDemandSupplyRatioFilter(
                result, demandSupplyRatioRange));
    }

    function passesAskBidRatioFilter(result, range)
    {
        return range.passesRangeFilter(RecipeComputer
                .computeAskBidRatio(result));
    }

    function passesAskCostRatioFilter(result, range)
    {
        return range.passesRangeFilter(RecipeComputer
                .computeAskCostRatio(result));
    }

    function passesAskFilter(result, range)
    {
        return range.passesRangeFilter(RecipeComputer.getAsk(result));
    }

    function passesBidCostRatioFilter(result, range)
    {
        return range.passesRangeFilter(RecipeComputer
                .computeBidCostRatio(result));
    }

    function passesBidFilter(result, range)
    {
        return range.passesRangeFilter(RecipeComputer.getBid(result));
    }

    function passesCostFilter(result, range)
    {
        return range.passesRangeFilter(RecipeComputer.getCost(result));
    }

    function passesDemandFilter(result, range)
    {
        return range.passesRangeFilter(RecipeComputer.getDemand(result));
    }

    function passesDemandSupplyRatioFilter(result, range)
    {
        return range.passesRangeFilter(RecipeComputer
                .computeDemandSupplyRatio(result));
    }

    function passesRatingFilter(result, range)
    {
        return range.passesRangeFilter(RecipeComputer.getRating(result));
    }

    function passesSupplyFilter(result, range)
    {
        return range.passesRangeFilter(RecipeComputer.getSupply(result));
    }
}
