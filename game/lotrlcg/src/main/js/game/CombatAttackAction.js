define(function()
{
    "use strict";
    function CombatAttackAction(environment, adjudicator, agent, enemyIdToAttackers, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("enemyIdToAttackers", enemyIdToAttackers);
        InputValidator.validateNotNull("callback", callback);

        this.environment = function()
        {
            return environment;
        };

        this.adjudicator = function()
        {
            return adjudicator;
        };

        this.agent = function()
        {
            return agent;
        };

        this.enemyIdToAttackers = function()
        {
            return enemyIdToAttackers;
        };

        this.callback = function()
        {
            return callback;
        };
    }

    CombatAttackAction.prototype.doIt = function()
    {
        LOGGER.trace("CombatAttackAction.doIt() start");

        var agent = this.agent();
        var environment = this.environment();
        var enemies = environment.agentData(agent).engagementArea().slice();
        var enemyIdToAttackers = this.enemyIdToAttackers();

        enemies.forEach(function(enemy)
        {
            // 1. Declare enemy to attack.
            // 2. Exhaust attacker(s).
            var attackers = enemyIdToAttackers[enemy.id()];

            if (attackers.length > 0)
            {
                attackers.forEach(function(attacker)
                {
                    attacker.exhaustState().isMarked(true);
                });

                // 3. Determine combat damage.
                var attackSum = 0;
                attackers.forEach(function(attacker)
                {
                    attackSum += attacker.card().attack;
                });
                var damage = attackSum - enemy.card().defense;
                LOGGER.debug(attackers + " vs " + enemy + " hits " + damage);

                if (damage > 0)
                {
                    enemy.woundState().increase(damage);
                }
            }
        });

        LOGGER.trace("CombatAttackAction.doIt() end");

        var callback = this.callback();
        callback();
    };

    return CombatAttackAction;
});
