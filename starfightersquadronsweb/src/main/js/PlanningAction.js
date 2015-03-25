/*
 * Provides a planning action for Starfighter Squadrons.
 */
function PlanningAction(environmentIn, agentIn, tokenToManeuverIn)
{
    var environment = environmentIn;
    var agent = agentIn;
    var tokenToManeuver = tokenToManeuverIn;

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
