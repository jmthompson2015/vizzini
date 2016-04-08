define(function()
{
    "use strict";
    function PlanningAction(environment, adjudicator, agent, cards, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("cards", cards);
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

        this.cards = function()
        {
            return cards;
        };

        this.callback = function()
        {
            return callback;
        };
    }

    PlanningAction.prototype.doIt = function()
    {
        LOGGER.trace("PlanningAction.doIt() start");

        var environment = this.environment();
        var agent = this.agent();
        var cards = this.cards();

        cards.forEach(function(token)
        {
            // Remove cost of token from heroes.
            var cost = token.card().cost;
            var sphere = token.card().sphere;
            var heroes = environment.heroes(agent).filter(function(hero)
            {
                return hero.card().sphere === sphere;
            });
            heroes.forEach(function(hero)
            {
                var resources = hero.resourceState().count();

                if (cost <= resources)
                {
                    hero.resourceState().decrease(cost);
                    cost = 0;
                }
                else
                {
                    hero.resourceState().decrease(resources);
                    cost -= resources;
                }
            });

            // Remove token from hand.
            var hand = environment.agentData(agent).hand();
            hand.vizziniRemove(token);

            // Place token in play area.
            var playArea = environment.agentData(agent).playArea();
            playArea.push(token);
        });

        LOGGER.trace("PlanningAction.doIt() end");

        var callback = this.callback();
        callback();
    };

    return PlanningAction;
});
