define([ "game/Action", "game/Selector" ], function(Action, Selector)
{
    "use strict";
    function CombatAttackAction(store, adjudicator, agent, enemyIdToAttackers, callback)
    {
        InputValidator.validateNotNull("store", store);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("enemyIdToAttackers", enemyIdToAttackers);
        InputValidator.validateNotNull("callback", callback);

        this.store = function()
        {
            return store;
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
        var store = this.store();
        var state = store.getState();
        var enemies = Selector.cardInstances(state, agent.engagementAreaIds);
        var enemyIdToAttackers = this.enemyIdToAttackers();

        enemies.forEach(function(enemy)
        {
            // 1. Declare enemy to attack.
            // 2. Exhaust attacker(s).
            var attackers = enemyIdToAttackers[enemy.id];

            if (attackers.length > 0)
            {
                attackers.forEach(function(attacker)
                {
                    store.dispatch(Action.setExhausted(attacker, true));
                });

                // 3. Determine combat damage.
                var attackSum = 0;
                attackers.forEach(function(attacker)
                {
                    attackSum += attacker.card.attack;
                });
                var damage = attackSum - enemy.card.defense;
                LOGGER.debug(attackers + " vs " + enemy + " hits " + damage);

                if (damage > 0)
                {
                    store.dispatch(Action.addWounds(enemy, damage));

                    if (enemy.woundCount >= enemy.card.hitPoints)
                    {
                        LOGGER.debug("discarding " + enemy.id + " " + enemy.name);
                        store.dispatch(Action.discardEngagedCard(agent, enemy));
                    }
                }
            }
        });

        LOGGER.trace("CombatAttackAction.doIt() end");

        var callback = this.callback();
        callback();
    };

    return CombatAttackAction;
});
