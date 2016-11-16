/*
 * Provides accessors and modifiers for recipe preferences.
 */
function RecipePreferences(rootName)
{
    if (!rootName)
    {
        rootName = "gw2Crafting";
    }

    this.clear = function()
    {
        this.setDisciplineIndex(undefined);
        this.setRatingRange(undefined);
        this.setCostRange(undefined);
        this.setBidRange(undefined);
        this.setAskRange(undefined);
        this.setSupplyRange(undefined);
        this.setDemandRange(undefined);
        this.setBidCostRatioRange(undefined);
        this.setAskBidRatioRange(undefined);
        this.setAskCostRatioRange(undefined);
        this.setDemandSupplyRatioRange(undefined);
    }

    this.getAskBidRatioRange = function()
    {
        var answer = getFilterRange("askBidRatio");

        if (!answer)
        {
            answer = new FilterRange(false, 1.0, false, 10.0);
        }

        return answer;
    }

    this.getAskCostRatioRange = function()
    {
        var answer = getFilterRange("askCostRatio");

        if (!answer)
        {
            answer = new FilterRange(true, 1.20, false, 10.0);
        }

        return answer;
    }

    this.getAskRange = function()
    {
        var answer = getFilterRange("ask");

        if (!answer)
        {
            answer = new FilterRange(false, 50, false, 1000);
        }

        return answer;
    }

    this.getBidCostRatioRange = function()
    {
        var answer = getFilterRange("bidCostRatio");

        if (!answer)
        {
            answer = new FilterRange(false, 1.0, false, 10.0);
        }

        return answer;
    }

    this.getBidRange = function()
    {
        var answer = getFilterRange("bid");

        if (!answer)
        {
            answer = new FilterRange(false, 50, false, 1000);
        }

        return answer;
    }

    this.getCostRange = function()
    {
        var answer = getFilterRange("cost");

        if (!answer)
        {
            answer = new FilterRange(false, 50, true, 10000);
        }

        return answer;
    }

    this.getDemandRange = function()
    {
        var answer = getFilterRange("demand");

        if (!answer)
        {
            answer = new FilterRange(true, 50, false, 1000);
        }

        return answer;
    }

    this.getDemandSupplyRatioRange = function()
    {
        var answer = getFilterRange("demandSupplyRatio");

        if (!answer)
        {
            answer = new FilterRange(true, 1.20, false, 10.0);
        }

        return answer;
    }

    this.getDisciplineIndex = function()
    {
        var answer = localStorage.getItem(rootName + "/disciplineIndex");

        if (!answer)
        {
            answer = 0;
        }

        return answer;
    }

    this.getRatingRange = function()
    {
        var answer = getFilterRange("rating");

        if (!answer)
        {
            answer = new FilterRange(false, 0, false, 400);
        }

        return answer;
    }

    this.getSupplyRange = function()
    {
        var answer = getFilterRange("supply");

        if (!answer)
        {
            answer = new FilterRange(false, 100, false, 1000);
        }

        LOGGER.debug("getSupplyRange() answer = " + answer);

        return answer;
    }

    this.setAskBidRatioRange = function(range)
    {
        setRange("askBidRatio", range);
    }

    this.setAskCostRatioRange = function(range)
    {
        setRange("askCostRatio", range);
    }

    this.setAskRange = function(range)
    {
        setRange("ask", range);
    }

    this.setBidCostRatioRange = function(range)
    {
        setRange("bidCostRatio", range);
    }

    this.setBidRange = function(range)
    {
        setRange("bid", range);
    }

    this.setCostRange = function(range)
    {
        setRange("cost", range);
    }

    this.setDemandRange = function(range)
    {
        setRange("demand", range);
    }

    this.setDemandSupplyRatioRange = function(range)
    {
        setRange("demandSupplyRatio", range);
    }

    this.setDisciplineIndex = function(index)
    {
        if (index >= 0)
        {
            localStorage.setItem(rootName + "/disciplineIndex", index);
        }
        else
        {
            localStorage.removeItem(rootName + "/disciplineIndex");
        }
    }

    this.setRatingRange = function(range)
    {
        setRange("rating", range);
    }

    this.setSupplyRange = function(range)
    {
        setRange("supply", range);
    }

    function getBooleanValue(path)
    {
        var answer;

        var value = localStorage.getItem(path);

        if (value === "true")
        {
            answer = true;
        }
        else if (value === "false")
        {
            answer = false;
        }

        return answer;
    }

    function getFilterRange(name)
    {
        InputValidator.validateNotEmpty("name", name);

        var path = rootName + "/" + name;

        var isLowChecked = getBooleanValue(path + "/isLowChecked");
        var lowValue = localStorage.getItem(path + "/lowValue");
        var isHighChecked = getBooleanValue(path + "/isHighChecked");
        var highValue = localStorage.getItem(path + "/highValue");

        var answer;

        if (!(isUndefinedOrNull(isLowChecked) || isUndefinedOrNull(lowValue)
                || isUndefinedOrNull(isHighChecked) || isUndefinedOrNull(highValue)))
        {
            answer = new FilterRange(isLowChecked, lowValue, isHighChecked,
                    highValue);
        }

        return answer;
    }

    function isUndefinedOrNull(value)
    {
        return (value === undefined || value === null);
    }

    function setRange(name, range)
    {
        InputValidator.validateNotEmpty("name", name);

        var path = rootName + "/" + name;

        if (range)
        {
            localStorage.setItem(path + "/isLowChecked", range.isLowChecked());
            localStorage.setItem(path + "/lowValue", range.getLowValue());
            localStorage
                    .setItem(path + "/isHighChecked", range.isHighChecked());
            localStorage.setItem(path + "/highValue", range.getHighValue());
        }
        else
        {
            localStorage.removeItem(path + "/isLowChecked");
            localStorage.removeItem(path + "/lowValue");
            localStorage.removeItem(path + "/isHighChecked");
            localStorage.removeItem(path + "/highValue");
            localStorage.removeItem(path);
        }
    }
}
