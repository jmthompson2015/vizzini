/*
 * Provides an enumeration of dice values.
 */
var DefenseValue =
{
    EVADE: "evade",
    FOCUS: "focus",
    BLANK: "blank"
}

/*
 * Provides defense dice for Starfighter Squadrons.
 */
function DefenseDice(sizeIn)
{
    var size = sizeIn;
    var values;

    rerollAll();

    this.getBlankCount = function()
    {
        return getValueCount(DefenseValue.BLANK);
    }

    this.getEvadeCount = function()
    {
        return getValueCount(DefenseValue.EVADE);
    }

    this.getFocusCount = function()
    {
        return getValueCount(DefenseValue.FOCUS);
    }

    this.getValue = function(index)
    {
        return values[index];
    }

    this.toString = function()
    {
        return "size = " + size + ", values = " + values;
    }

    /*
     * @param target Target value.
     * 
     * @return the number of target values.
     */
    function getValueCount(target)
    {
        var answer = 0;

        for ( var i = 0; i < values.length; i++)
        {
            var value = values[i];
            if (value == target)
            {
                answer++;
            }
        }

        return answer;
    }

    /*
     * Reroll all dice.
     * 
     * @param size Size.
     */
    function rerollAll()
    {
        values = [];

        for ( var i = 0; i < size; i++)
        {
            values[values.length] = rollRandomValue();
        }

        // Collections.sort(values);

        // fireValuesPropertyChange(null, values);
    }

    /**
     * @return a random value.
     */
    function rollRandomValue()
    {
        var min = 1;
        var max = 8;
        var roll = Math.floor(Math.random() * (max - min + 1)) + min;

        // There are 2 focus, 3 evade, and 3 blank.
        switch (roll)
        {
        case 1:
        case 4:
            value = DefenseValue.FOCUS;
            break;
        case 2:
        case 5:
        case 7:
            value = DefenseValue.EVADE;
            break;
        case 3:
        case 6:
        case 8:
            value = DefenseValue.BLANK;
            break;
        default:
            throw new RuntimeException("Unsupported roll: " + roll);
        }

        return value;
    }
}
