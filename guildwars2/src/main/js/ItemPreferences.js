/*
 * Provides accessors and modifiers for item preferences.
 */
function ItemPreferences(rootName)
{
    if (!rootName)
    {
        rootName = "gw2Commerce";
    }

    this.clear = function()
    {
        this.setTypeIndex(undefined);
        this.setRarityIndex(undefined);
        this.setBidRange(undefined);
        this.setAskRange(undefined);
        this.setSupplyRange(undefined);
        this.setDemandRange(undefined);
        this.setAskBidRatioRange(undefined);
        this.setDemandSupplyRatioRange(undefined);
    }

    this.getAskBidRatioRange = function()
    {
        var answer = getFilterRange("askBidRatio");

        if (!answer)
        {
            answer = new FilterRange(true, 3.0, true, 10.0);
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

    this.getBidRange = function()
    {
        var answer = getFilterRange("bid");

        if (!answer)
        {
            answer = new FilterRange(true, 50, true, 1000);
        }

        return answer;
    }

    this.getDemandRange = function()
    {
        var answer = getFilterRange("demand");

        if (!answer)
        {
            answer = new FilterRange(false, 100, false, 1000);
        }

        return answer;
    }

    this.getDemandSupplyRatioRange = function()
    {
        var answer = getFilterRange("demandSupplyRatio");

        if (!answer)
        {
            answer = new FilterRange(true, 5.0, false, 10.0);
        }

        return answer;
    }

    this.getRarityIndex = function()
    {
        var answer = localStorage.getItem(rootName + "/rarityIndex");

        if (!answer)
        {
            answer = 0;
        }

        return answer;
    }

    this.getSupplyRange = function()
    {
        var answer = getFilterRange("supply");

        if (!answer)
        {
            answer = new FilterRange(true, 100, false, 1000);
        }

        LOGGER.debug("getSupplyRange() answer = " + answer);

        return answer;
    }

    this.getTypeIndex = function()
    {
        var answer = localStorage.getItem(rootName + "/typeIndex");

        if (!answer)
        {
            answer = 0;
        }

        return answer;
    }

    this.setAskBidRatioRange = function(range)
    {
        setRange("askBidRatio", range);
    }

    this.setAskRange = function(range)
    {
        setRange("ask", range);
    }

    this.setBidRange = function(range)
    {
        setRange("bid", range);
    }

    this.setDemandRange = function(range)
    {
        setRange("demand", range);
    }

    this.setDemandSupplyRatioRange = function(range)
    {
        setRange("demandSupplyRatio", range);
    }

    this.setRarityIndex = function(index)
    {
        if (index >= 0)
        {
            localStorage.setItem(rootName + "/rarityIndex", index);
        }
        else
        {
            localStorage.removeItem(rootName + "/rarityIndex");
        }
    }

    this.setSupplyRange = function(range)
    {
        setRange("supply", range);
    }

    this.setTypeIndex = function(index)
    {
        if (index >= 0)
        {
            localStorage.setItem(rootName + "/typeIndex", index);
        }
        else
        {
            localStorage.removeItem(rootName + "/typeIndex");
        }
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
