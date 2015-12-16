/*
 * Provides defense dice for Starfighter Squadrons.
 */
define(function()
{
    function DefenseDice(size)
    {
        this.getSize = function()
        {
            return size;
        }

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

        this.getSortedValues = function()
        {
            var answer = values.slice();

            answer.sort(function(die0, die1)
            {
                var value0 = DefenseDice.Value.properties[die0].sortOrder;
                var value1 = DefenseDice.Value.properties[die1].sortOrder;

                return value0 - value1;
            });

            return answer;
        }

        this.getValue = function(index)
        {
            return values[index];
        }

        /*
         * Spend an evade token. Add an evade result.
         */
        this.spendEvadeToken = function()
        {
            values.push(DefenseDice.Value.EVADE);
        }

        /*
         * Spend a focus token. Change all focus results to evades.
         */
        this.spendFocusToken = function()
        {
            changeAllToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
        }

        this.toString = function()
        {
            return "size = " + size + ", values = " + values;
        }

        /*
         * @param oldValue Old value.
         * 
         * @param newValue New value.
         */
        function changeAllToValue(oldValue, newValue)
        {
            for (var i = 0; i < values.length; i++)
            {
                if (values[i] === oldValue)
                {
                    values[i] = newValue;
                }
            }
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
                values.push(rollRandomValue());
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
        BLANK: "blank",

        properties:
        {
            "evade":
            {
                name: "Evade",
                sortOrder: 0,
            },
            "focus":
            {
                name: "Focus",
                sortOrder: 1,
            },
            "blank":
            {
                name: "Blank",
                sortOrder: 2,
            },
        },
    }

    return DefenseDice;
});
