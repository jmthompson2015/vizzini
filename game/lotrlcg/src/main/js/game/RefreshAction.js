define(function()
{
    "use strict";
    function RefreshAction(environment)
    {
        InputValidator.validateNotNull("environment", environment);

        this.environment = function()
        {
            return environment;
        };
    }

    RefreshAction.prototype.doIt = function()
    {
        LOGGER.trace("RefreshAction.doIt() start");

        var environment = this.environment();
        var agents = environment.agents();

        agents.forEach(function(agent)
        {
            var playArea = environment.agentData(agent).playArea();
            playArea.forEach(function(token)
            {
                token.questerState().isQuesting(false);
                token.exhaustState().isExhausted(false);
            });

            environment.addToThreatLevel(agent, 1);
        });

        LOGGER.trace("RefreshAction.doIt() end");
    };

    return RefreshAction;
});
