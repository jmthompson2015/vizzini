define(function()
{
    "use strict";

    function DefenseDice(initialSize)
    {
        InputValidator.validateIsNumber("initialSize", initialSize);

        var values;

        rerollAll(initialSize);

        this.blankCount = function()
        {
            return valueCount(DefenseDice.Value.BLANK);
        };

        this.changeOneToValue = function(oldValue, newValue)
        {
            for (var i = 0; i < values.length; i++)
            {
                var value = values[i];

                if (value === oldValue)
                {
                    values[i] = newValue;
                    break;
                }
            }
        };

        this.evadeCount = function()
        {
            return valueCount(DefenseDice.Value.EVADE);
        };

        this.focusCount = function()
        {
            return valueCount(DefenseDice.Value.FOCUS);
        };

        this.newInstance = function()
        {
            var size = this.size();
            var answer = new DefenseDice(size);
            var newValues = answer.values();

            for (var i = 0; i < size; i++)
            {
                newValues[i] = this.value(i);
            }

            return answer;
        };

        this.rerollAllFocus = function()
        {
            // Reroll all focus values.
            for (var i = 0; i < values.length; i++)
            {
                var value = values[i];

                if (value === DefenseDice.Value.FOCUS)
                {
                    values[i] = rollRandomValue();
                }
            }
        };

        this.rerollBlank = function(count)
        {
            rerollType(DefenseDice.Value.BLANK, count);
        };

        this.rerollBlankAndFocus = function(count)
        {
            var blankCount = this.blankCount();
            var focusCount = this.focusCount();

            if (blankCount >= count)
            {
                this.rerollBlank(count);
            }
            else
            {
                // 0 <= blankCount < count
                if (blankCount > 0)
                {
                    this.rerollBlank(count);
                }

                var myCount = count - blankCount;

                if (myCount > 0)
                {
                    this.rerollFocus(myCount);
                }
            }
        };

        this.rerollFocus = function(count)
        {
            rerollType(DefenseDice.Value.FOCUS, count);
        };

        this.size = function()
        {
            return values.length;
        };

        this.sortedValues = function()
        {
            var answer = values.slice();

            answer.sort(function(die0, die1)
            {
                var value0 = DefenseDice.Value.properties[die0].sortOrder;
                var value1 = DefenseDice.Value.properties[die1].sortOrder;

                return value0 - value1;
            });

            return answer;
        };

        this.spendEvadeToken = function()
        {
            // Add an evade result.
            values.push(DefenseDice.Value.EVADE);
        };

        this.spendFocusToken = function()
        {
            // Change all focus results to evades.
            changeAllToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
        };

        this.toString = function()
        {
            return "size = " + values.length + ", values = " + values;
        };

        this.value = function(index)
        {
            return values[index];
        };

        this.values = function()
        {
            return values;
        };

        function changeAllToValue(oldValue, newValue)
        {
            values.forEach(function(value, i)
            {
                if (value === oldValue)
                {
                    values[i] = newValue;
                }
            });
        }

        function rerollAll(size)
        {
            values = [];

            for (var i = 0; i < size; i++)
            {
                values.push(rollRandomValue());
            }
        }

        function rerollType(type, count)
        {
            InputValidator.validateNotNull("type", type);
            // count optional; default: 1

            // Reroll type values.
            var myCount = (count === undefined ? 1 : count);

            for (var i = 0; i < values.length; i++)
            {
                var value = values[i];

                if (value === type)
                {
                    values[i] = rollRandomValue();
                    myCount--;

                    if (myCount === 0)
                    {
                        break;
                    }
                }
            }
        }

        function rollRandomValue()
        {
            var min = 1;
            var max = 8;
            var roll = Math.floor(Math.random() * (max - min + 1)) + min;
            var value;

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

        function valueCount(target)
        {
            return values.reduce(function(previousValue, currentValue)
            {
                return previousValue + (currentValue === target ? 1 : 0);
            }, 0);
        }
    }

    DefenseDice.Value = {
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
    };

    return DefenseDice;
});
