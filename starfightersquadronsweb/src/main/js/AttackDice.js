define(function()
{
    "use strict";
    function AttackDice(initialSize)
    {
        InputValidator.validateIsNumber("initialSize", initialSize);

        var values;

        rerollAll(initialSize);

        this.blankCount = function()
        {
            return valueCount(AttackDice.Value.BLANK);
        };

        this.changeAllToValue = function(oldValue, newValue)
        {
            values.forEach(function(value, i)
            {
                if (value === oldValue)
                {
                    values[i] = newValue;
                }
            });
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

        this.criticalHitCount = function()
        {
            return valueCount(AttackDice.Value.CRITICAL_HIT);
        };

        this.focusCount = function()
        {
            return valueCount(AttackDice.Value.FOCUS);
        };

        this.hitCount = function()
        {
            return valueCount(AttackDice.Value.HIT);
        };

        this.rerollBlank = function()
        {
            // Reroll a blank value.
            for (var i = 0; i < values.length; i++)
            {
                var value = values[i];

                if (value === AttackDice.Value.BLANK)
                {
                    values[i] = rollRandomValue();
                    break;
                }
            }
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
                var value0 = AttackDice.Value.properties[die0].sortOrder;
                var value1 = AttackDice.Value.properties[die1].sortOrder;

                return value0 - value1;
            });

            return answer;
        };

        this.spendFocusToken = function()
        {
            // Change all focus results to hits.
            this.changeAllToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
        };

        this.spendTargetLock = function()
        {
            // Reroll any blank or focus values.
            values.forEach(function(value, i)
            {
                if (value === AttackDice.Value.BLANK || value === AttackDice.Value.FOCUS)
                {
                    values[i] = rollRandomValue();
                }
            });
        };

        this.toString = function()
        {
            return "size = " + values.length + ", values = " + values;
        };

        this.value = function(index)
        {
            return values[index];
        };

        function rerollAll(size)
        {
            values = [];

            for (var i = 0; i < size; i++)
            {
                values.push(rollRandomValue());
            }
        }

        function rollRandomValue()
        {
            var min = 1;
            var max = 8;
            var roll = Math.floor(Math.random() * (max - min + 1)) + min;
            var value;

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

        function valueCount(target)
        {
            return values.reduce(function(previousValue, currentValue, i)
            {
                return previousValue + (currentValue === target ? 1 : 0);
            }, 0);
        }
    }

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
    };

    return AttackDice;
});
