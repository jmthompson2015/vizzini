define(["AttackDice"], function(AttackDice)
{
    "use strict";

    function MockAttackDice()
    {
        var values;

        rerollAll();

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

        this.rerollBlank = function() {};

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

        this.spendTargetLock = function() {};

        this.toString = function()
        {
            return "size = " + values.length + ", values = " + values;
        };

        this.value = function(index)
        {
            return values[index];
        };

        function rerollAll()
        {
            values = [];

            values.push(AttackDice.Value.BLANK);
            values.push(AttackDice.Value.CRITICAL_HIT);
            values.push(AttackDice.Value.FOCUS);
            values.push(AttackDice.Value.HIT);
        }

        function valueCount(target)
        {
            return values.reduce(function(previousValue, currentValue, i)
            {
                return previousValue + (currentValue === target ? 1 : 0);
            }, 0);
        }
    }

    return MockAttackDice;
});
