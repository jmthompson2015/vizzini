define(function()
{
    "use strict";

    function CombatState()
    {
        var attackDice;
        var combatAction;
        var damageDealer;
        var defenseDice;
        var initialAttackDice;
        var initialDefenseDice;
        var isDefenderHit;
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
            combatAction = undefined;
            defenseDice = undefined;
            initialAttackDice = false;
            initialDefenseDice = false;
            isDefenderHit = false;
            range = undefined;
        };

        this.combatAction = function(value)
        {
            if (value !== undefined)
            {
                combatAction = value;
            }

            return combatAction;
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
