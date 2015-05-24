/*
 * Provides a play state.
 */
function PlayState(round, phase, activeToken, tokenPositions,
        maneuverAction, shipFledAction, combatAction,
        shipDestroyedAction, winner)
{
    this.getActiveToken = function()
    {
        return activeToken;
    }

    this.getCombatAction = function()
    {
        return combatAction;
    }

    this.getManeuverAction = function()
    {
        return maneuverAction;
    }

    this.getPhase = function()
    {
        return phase;
    }

    this.getRound = function()
    {
        return round;
    }

    this.getShipDestroyedAction = function()
    {
        return shipDestroyedAction;
    }

    this.getShipFledAction = function()
    {
        return shipFledAction;
    }

    this.getTokenPositions = function()
    {
        return tokenPositions;
    }

    this.getWinner = function()
    {
        return winner;
    }
}

PlayState.createShipFled = function(round, phase, activeToken, tokenPositions,
        shipFledAction)
{
    var maneuverAction;

    return new PlayState(round, phase, activeToken, tokenPositions,
            maneuverAction, shipFledAction);
}

PlayState.createCombat = function(round, phase, activeToken, tokenPositions,
        combatAction)
{
    var maneuverAction;
    var shipFledAction;

    return new PlayState(round, phase, activeToken, tokenPositions,
            maneuverAction, shipFledAction, combatAction);
}

PlayState.createShipDestroyed = function(round, phase, activeToken,
        tokenPositions, shipDestroyedAction)
{
    var maneuverAction;
    var shipFledAction;
    var combatAction;

    return new PlayState(round, phase, activeToken, tokenPositions,
            maneuverAction, shipFledAction, combatAction, shipDestroyedAction);
}

PlayState.createWinner = function(round, phase, activeToken, tokenPositions,
        winner)
{
    var maneuverAction;
    var shipFledAction;
    var combatAction;
    var shipDestroyedAction;

    return new PlayState(round, phase, activeToken, tokenPositions,
            maneuverAction, shipFledAction, combatAction, shipDestroyedAction,
            winner);
}

PlayState.createTokenPositions = function(environment)
{
    var answer = [];

    var tokens = environment.getTokens();

    for (var i = 0; i < tokens.length; i++)
    {
        var token = tokens[i];
        var position = environment.getPositionFor(token);
        answer[answer.length] =
        {
            token: token,
            position: position
        }
    }

    return answer;
}
