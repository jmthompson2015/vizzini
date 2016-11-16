/*
 * Provides a range for filtering.
 */
function FilterRange(isLowChecked, lowValue, isHighChecked, highValue)
{
    InputValidator.validateBoolean("isLowChecked", isLowChecked);
    InputValidator.validateNotNull("lowValue", lowValue);
    InputValidator.validateBoolean("isHighChecked", isHighChecked);
    InputValidator.validateNotNull("highValue", highValue);

    this.getHighValue = function()
    {
        return highValue;
    }

    this.getLowValue = function()
    {
        return lowValue;
    }

    this.isHighChecked = function()
    {
        return isHighChecked;
    }

    this.isLowChecked = function()
    {
        return isLowChecked;
    }

    this.passesRangeFilter = function(value)
    {
        return (!this.isLowChecked() || (this.getLowValue() <= value))
                && (!this.isHighChecked() || (value < this.getHighValue()));
    },

    this.toString = function()
    {
        return isLowChecked + " " + lowValue + " " + isHighChecked + " "
                + highValue;
    }
}
