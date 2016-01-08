define(function()
{
    "use strict";
    function PlanningAction(environment, agent, tokenToManeuver)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("tokenToManeuver", tokenToManeuver);

        this.getEnvironment = function()
        {
            return environment;
        };

        this.getAgent = function()
        {
            return agent;
        };

        this.getTokenToManeuver = function()
        {
            return tokenToManeuver;
        };

        this.getManeuver = function(token)
        {
            return tokenToManeuver[token];
        };

        this.getTeam = function()
        {
            return agent.teamKey();
        };
    }

    return PlanningAction;
});
