/*
 * Provides a planning action for Starfighter Squadrons.
 */
function PlanningAction(environment, agent, tokenToManeuver)
{
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
