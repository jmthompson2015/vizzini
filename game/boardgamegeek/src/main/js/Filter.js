function Filter(columnKey, isMinEnabled, minValue, isMaxEnabled, maxValue)
{
    this.getColumnKey = function()
    {
        return columnKey;
    }

    this.isMinEnabled = function()
    {
        return isMinEnabled;
    }

    this.getMinValue = function()
    {
        return minValue;
    }

    this.isMaxEnabled = function()
    {
        return isMaxEnabled;
    }

    this.getMaxValue = function()
    {
        return maxValue;
    }

    this.passes = function(gameSummary, gameDetail)
    {
        var value = gameSummary[columnKey];

        if (!value && gameDetail)
        {
            value = gameDetail[columnKey];
        }

        return (!isMinEnabled || minValue <= value) && (!isMaxEnabled || value <= maxValue);
    }
}
