/*
 * Provides a planning action for Starfighter Squadrons.
 */
define(function()
{
    function PlanningAction(environment, agent, tokenToManeuver)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("tokenToManeuver", tokenToManeuver);

        this.getEnvironment = function()
        {
            return environment;
        }

        this.getAgent = function()
        {
            return agent;
        }

        this.getTokenToManeuver = function()
        {
            return tokenToManeuver;
        }

        /*
         * @param token Token.
         * 
         * @return the maneuver action for the given token.
         */
        this.getManeuver = function(token)
        {
            return tokenToManeuver[token];
        }

        this.getTeam = function()
        {
            return agent.getTeam();
        }
    }

    return PlanningAction;
});
