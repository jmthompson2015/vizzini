define(function()
{
    "use strict";

    function CombatState()
    {
        var attackDice;
        var damageDealer;
        var defenseDice;
        var initialAttackDice;
        var initialDefenseDice;
        var isDefenderHit;
        var isInFiringArc;
        var range;

        this.attackDice = function(value)
        {
            if (value !== undefined)
            {
                initialAttackDice = {
                    blankCount: value.blankCount(),
                    criticalHitCount: value.criticalHitCount(),
                    focusCount: value.focusCount(),
                    hitCount: value.hitCount(),
                };
                attackDice = value;
            }

            return attackDice;
        };

        this.clear = function()
        {
            attackDice = undefined;
            defenseDice = undefined;
            initialAttackDice = undefined;
            initialDefenseDice = undefined;
            isDefenderHit = false;
            range = undefined;
        };

        this.damageDealer = function(value)
        {
            if (value !== undefined)
            {
                damageDealer = value;
            }

            return damageDealer;
        };

        this.defenseDice = function(value)
        {
            if (value !== undefined)
            {
                initialDefenseDice = {
                    blankCount: value.blankCount(),
                    evadeCount: value.evadeCount(),
                    focusCount: value.focusCount(),
                };
                defenseDice = value;
            }

            return defenseDice;
        };

        this.initialAttackDice = function()
        {
            return initialAttackDice;
        };

        this.initialDefenseDice = function()
        {
            return initialDefenseDice;
        };

        this.isDefenderHit = function(value)
        {
            if (value === true || value === false)
            {
                isDefenderHit = value;
            }

            return isDefenderHit;
        };

        this.isInFiringArc = function(value)
        {
            if (value === true || value === false)
            {
                isInFiringArc = value;
            }

            return isInFiringArc;
        };

        this.rangeKey = function(value)
        {
            if (value !== undefined)
            {
                range = value;
            }

            return range;
        };
    }

    return CombatState;
});
