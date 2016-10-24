define([ "game/Action", "game/Selector" ], function(Action, Selector)
{
    "use strict";
    function ResourceTask(store)
    {
        InputValidator.validateNotNull("store", store);

        this.store = function()
        {
            return store;
        };
    }

    ResourceTask.prototype.doIt = function()
    {
        LOGGER.trace("ResourceTask.doIt() start");

        // Increment the round.
        var store = this.store();
        store.dispatch(Action.incrementRound());

        // Add one resource to each hero's pool.
        var state = store.getState();
        var agents = Selector.agents(state, state.agentIds);
        agents.forEach(function(agent)
        {
            var cardInstances = Selector.heroes(state, agent.playAreaIds);

            cardInstances.forEach(function(cardInstance)
            {
                store.dispatch(Action.addResources(cardInstance));
            });
        });

        // Draw one card.
        agents.forEach(function(agent)
        {
            store.dispatch(Action.drawPlayerCard(agent));
        });

        LOGGER.trace("ResourceTask.doIt() end");
    };

    return ResourceTask;
});
