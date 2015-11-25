/*
 * Provides defense dice for Starfighter Squadrons.
 */
function DefenseDice(size)
{
    var values;

    rerollAll();

    this.getBlankCount = function()
    {
        return getValueCount(DefenseDice.Value.BLANK);
    }

    this.getEvadeCount = function()
    {
        return getValueCount(DefenseDice.Value.EVADE);
    }

    this.getFocusCount = function()
    {
        return getValueCount(DefenseDice.Value.FOCUS);
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

        for (var i = 0; i < values.length; i++)
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

        for (var i = 0; i < size; i++)
        {
            values[values.length] = rollRandomValue();
        }
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
            value = DefenseDice.Value.FOCUS;
            break;
        case 2:
        case 5:
        case 7:
            value = DefenseDice.Value.EVADE;
            break;
        case 3:
        case 6:
        case 8:
            value = DefenseDice.Value.BLANK;
            break;
        default:
            throw new RuntimeException("Unsupported roll: " + roll);
        }

        return value;
    }
}

/*
 * Provides an enumeration of dice values.
 */
DefenseDice.Value =
{
    EVADE: "evade",
    FOCUS: "focus",
    BLANK: "blank"
}
