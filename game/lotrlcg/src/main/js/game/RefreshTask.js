define([ "game/Action", "game/Selector" ], function(Action, Selector)
{
    "use strict";
    function RefreshTask(store)
    {
        InputValidator.validateNotNull("store", store);

        this.store = function()
        {
            return store;
        };
    }

    RefreshTask.prototype.doIt = function()
    {
        LOGGER.trace("RefreshTask.doIt() start");

        var store = this.store();
        var state = store.getState();
        var agents = Selector.agents(state, state.agentIds);

        agents.forEach(function(agent)
        {
            var playArea = Selector.cardInstances(state, agent.playAreaIds);
            playArea.forEach(function(token)
            {
                store.dispatch(Action.setQuesting(token, false));
                store.dispatch(Action.setExhausted(token, false));
            });

            store.dispatch(Action.addThreatLevel(agent));

            if (agent.threatLevel >= 50)
            {
                store.dispatch(Action.eliminatePlayer(agent));
            }
        });

        store.dispatch(Action.incrementFirstPlayer());

        LOGGER.trace("RefreshTask.doIt() end");
    };

    return RefreshTask;
});
