define(function()
{
    "use strict";
    function ResourceAction(environment)
    {
        InputValidator.validateNotNull("environment", environment);

        this.environment = function()
        {
            return environment;
        };
    }

    ResourceAction.prototype.doIt = function()
    {
        LOGGER.trace("ResourceAction.doIt() start");

        var environment = this.environment();
        var agents = environment.agents();

        agents.forEach(function(agent)
        {
            var heroes = environment.heroes(agent);
            heroes.forEach(function(token)
            {
                token.resourceState().resources().increase();
            });

            var playerDeck = environment.agentData(agent).playerDeck();
            var hand = environment.agentData(agent).hand();
            hand.push(playerDeck.draw());
        });

        LOGGER.trace("ResourceAction.doIt() end");
    };

    return ResourceAction;
});
