define([ "game/Action", "game/Selector" ], function(Action, Selector)
{
    "use strict";
    function CombatDefendTask(store, adjudicator, agent, enemyIdToDefender, callback)
    {
        InputValidator.validateNotNull("store", store);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("enemyIdToDefender", enemyIdToDefender);
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

        this.enemyIdToDefender = function()
        {
            return enemyIdToDefender;
        };

        this.callback = function()
        {
            return callback;
        };
    }

    CombatDefendTask.prototype.doIt = function()
    {
        LOGGER.trace("CombatDefendTask.doIt() start");

        var agent = this.agent();
        var store = this.store();
        var state = store.getState();
        // var attackers = environment.agentData(agent).engagementArea().slice();
        var attackers = Selector.resolveCardInstanceIds(state, agent.engagementAreaIds);
        var enemyIdToDefender = this.enemyIdToDefender();

        attackers.forEach(function(attacker)
        {
            // 1. Declare attacking enemy.
            // 2. Exhaust a defender, if any.
            var defender = enemyIdToDefender[attacker.id];

            if (defender)
            {
                // defender.exhaustState().isMarked(true);
                store.dispatch(Action.setExhausted(defender, true));
            }

            // 3. Resolve shadow effect, if any.

            // 4. Determine combat damage.
            var damage = attacker.card.attack - (defender ? defender.card.defense : 0);
            LOGGER.debug(attacker + " vs " + defender + " hits " + damage);

            if (damage > 0)
            {
                if (defender)
                {
                    // defender.woundState().increase(damage);
                    store.dispatch(Action.addWounds(defender, damage));

                    if (defender.woundCount >= defender.card.hitPoints)
                    {
                        LOGGER.debug("discarding " + defender.id + " " + defender.name);
                        store.dispatch(Action.discardPlayerCard(agent, defender));
                    }
                }
                else
                {
                    // environment.addToThreatLevel(agent, damage);
                    store.dispatch(Action.addThreatLevel(agent, damage));

                    if (agent.threatLevel >= 50)
                    {
                        store.dispatch(Action.eliminatePlayer(agent));
                    }
                }
            }
        });

        LOGGER.trace("CombatDefendTask.doIt() end");

        var callback = this.callback();
        callback();
    };

    return CombatDefendTask;
});
