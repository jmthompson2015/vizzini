/*
 * Provides an enumeration of dice values.
 */
var AttackValue =
{
    HIT: "hit",
    CRITICAL_HIT: "criticalHit",
    FOCUS: "focus",
    BLANK: "blank"
}

/*
 * Provides attack dice for Starfighter Squadrons.
 */
function AttackDice(sizeIn)
{
    var size = sizeIn;
    var values;

    rerollAll();

    this.getBlankCount = function()
    {
        return getValueCount(AttackValue.BLANK);
    }

    this.getCriticalHitCount = function()
    {
        return getValueCount(AttackValue.CRITICAL_HIT);
    }

    this.getFocusCount = function()
    {
        return getValueCount(AttackValue.FOCUS);
    }

    this.getHitCount = function()
    {
        return getValueCount(AttackValue.HIT);
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
        // Value value;
        // final int roll = randomGenerator.generateInt(1, 8);
        var min = 1;
        var max = 8;
        var roll = Math.floor(Math.random() * (max - min + 1)) + min;

        // There are 2 focus, 3 hit, 1 critical hit, and 2 blank.
        switch (roll)
        {
        case 1:
        case 5:
            value = AttackValue.FOCUS;
            break;
        case 2:
        case 6:
        case 8:
            value = AttackValue.HIT;
            break;
        case 3:
            value = AttackValue.CRITICAL_HIT;
            break;
        case 4:
        case 7:
            value = AttackValue.BLANK;
            break;
        default:
            throw new RuntimeException("Unsupported roll: " + roll);
        }

        return value;
    }
}
