define(function()
{
    "use strict";
    function CombatDefendAction(environment, adjudicator, agent, enemyIdToDefender, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("enemyIdToDefender", enemyIdToDefender);
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

        this.enemyIdToDefender = function()
        {
            return enemyIdToDefender;
        };

        this.callback = function()
        {
            return callback;
        };
    }

    CombatDefendAction.prototype.doIt = function()
    {
        LOGGER.trace("CombatDefendAction.doIt() start");

        var agent = this.agent();
        var environment = this.environment();
        var attackers = environment.agentData(agent).engagementArea().slice();
        var enemyIdToDefender = this.enemyIdToDefender();

        attackers.forEach(function(attacker)
        {
            // 1. Declare attacking enemy.
            // 2. Exhaust a defender, if any.
            var defender = enemyIdToDefender[attacker.id()];

            if (defender)
            {
                defender.exhaustState().isExhausted(true);
            }

            // 3. Resolve shadow effect, if any.

            // 4. Determine combat damage.
            var damage = attacker.card().attack - (defender ? defender.card().defense : 0);
            LOGGER.debug(attacker + " vs " + defender + " hits " + damage);

            if (damage > 0)
            {
                if (defender)
                {
                    defender.woundState().wounds().increase(damage);
                }
                else
                {
                    environment.addToThreatLevel(agent, damage);
                }
            }
        });

        LOGGER.trace("CombatDefendAction.doIt() end");

        var callback = this.callback();
        callback();
    };

    return CombatDefendAction;
});
