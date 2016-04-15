define([ "game/Action", "game/Selector" ], function(Action, Selector)
{
    "use strict";
    function PlanningAction(store, adjudicator, agent, cards, callback)
    {
        InputValidator.validateNotNull("store", store);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("cards", cards);
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

        var store = this.store();
        var state = store.getState();
        var agent = this.agent();
        var cards = this.cards();

        cards.forEach(function(cardInstance)
        {
            // Remove cost of cardInstance from heroes.
            var cost = cardInstance.card.cost;
            var sphereKey = cardInstance.card.sphereKey;
            var heroes = Selector.heroes(state, agent.playAreaIds).filter(function(hero)
            {
                return hero.card.sphereKey === sphereKey;
            });
            heroes.forEach(function(hero)
            {
                var resources = hero.resourceCount;

                if (cost <= resources)
                {
                    store.dispatch(Action.addResources(hero, -cost));
                    cost = 0;
                }
                else
                {
                    store.dispatch(Action.addResources(hero, -resources));
                    cost -= resources;
                }
            });

            // Remove cardInstance from hand.
            store.dispatch(Action.removeFromHand(agent, cardInstance));

            // Place cardInstance in play area.
            store.dispatch(Action.addToPlayArea(agent, cardInstance));
        });

        LOGGER.trace("PlanningAction.doIt() end");

        var callback = this.callback();
        callback();
    };

    return PlanningAction;
});
