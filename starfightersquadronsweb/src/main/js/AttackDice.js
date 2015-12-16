/*
 * Provides attack dice for Starfighter Squadrons.
 */
define(function()
{
    function AttackDice(size)
    {
        this.getSize = function()
        {
            return size;
        }

        var values;

        rerollAll();

        this.getBlankCount = function()
        {
            return getValueCount(AttackDice.Value.BLANK);
        }

        this.getCriticalHitCount = function()
        {
            return getValueCount(AttackDice.Value.CRITICAL_HIT);
        }

        this.getFocusCount = function()
        {
            return getValueCount(AttackDice.Value.FOCUS);
        }

        this.getHitCount = function()
        {
            return getValueCount(AttackDice.Value.HIT);
        }

        this.getSortedValues = function()
        {
            var answer = values.slice();

            answer.sort(function(die0, die1)
            {
                var value0 = AttackDice.Value.properties[die0].sortOrder;
                var value1 = AttackDice.Value.properties[die1].sortOrder;

                return value0 - value1;
            });

            return answer;
        }

        this.getValue = function(index)
        {
            return values[index];
        }

        /*
         * Spend a focus token. Change all focus results to evades.
         */
        this.spendFocusToken = function()
        {
            changeAllToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
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

            // There are 2 focus, 3 hit, 1 critical hit, and 2 blank.
            switch (roll)
            {
            case 1:
            case 5:
                value = AttackDice.Value.FOCUS;
                break;
            case 2:
            case 6:
            case 8:
                value = AttackDice.Value.HIT;
                break;
            case 3:
                value = AttackDice.Value.CRITICAL_HIT;
                break;
            case 4:
            case 7:
                value = AttackDice.Value.BLANK;
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
    AttackDice.Value =
    {
        HIT: "hit",
        CRITICAL_HIT: "criticalHit",
        FOCUS: "focus",
        BLANK: "blank",

        properties:
        {
            "hit":
            {
                name: "Hit",
                sortOrder: 0,
            },
            "criticalHit":
            {
                name: "Critical Hit",
                sortOrder: 1,
            },
            "focus":
            {
                name: "Focus",
                sortOrder: 2,
            },
            "blank":
            {
                name: "Blank",
                sortOrder: 3,
            },
        },
    }

    return AttackDice;
});
