define(function()
{
    "use strict";
    function PlayState(round, phase, activeToken, tokenPositions, maneuverAction, shipFledAction, combatAction,
            shipDestroyedAction, winner)
    {
        this.activeToken = function()
        {
            return activeToken;
        };

        this.combatAction = function()
        {
            return combatAction;
        };

        this.maneuverAction = function()
        {
            return maneuverAction;
        };

        this.phase = function()
        {
            return phase;
        };

        this.round = function()
        {
            return round;
        };

        this.shipDestroyedAction = function()
        {
            return shipDestroyedAction;
        };

        this.shipFledAction = function()
        {
            return shipFledAction;
        };

        this.tokenPositions = function()
        {
            return tokenPositions;
        };

        this.winner = function()
        {
            return winner;
        };
    }

    PlayState.createShipFled = function(round, phase, activeToken, tokenPositions, shipFledAction)
    {
        var maneuverAction;

        return new PlayState(round, phase, activeToken, tokenPositions, maneuverAction, shipFledAction);
    };

    PlayState.createCombat = function(round, phase, activeToken, tokenPositions, combatAction)
    {
        var maneuverAction;
        var shipFledAction;

        return new PlayState(round, phase, activeToken, tokenPositions, maneuverAction, shipFledAction, combatAction);
    };

    PlayState.createShipDestroyed = function(round, phase, activeToken, tokenPositions, shipDestroyedAction)
    {
        var maneuverAction;
        var shipFledAction;
        var combatAction;

        return new PlayState(round, phase, activeToken, tokenPositions, maneuverAction, shipFledAction, combatAction,
                shipDestroyedAction);
    };

    PlayState.createWinner = function(round, phase, activeToken, tokenPositions, winner)
    {
        var maneuverAction;
        var shipFledAction;
        var combatAction;
        var shipDestroyedAction;

        return new PlayState(round, phase, activeToken, tokenPositions, maneuverAction, shipFledAction, combatAction,
                shipDestroyedAction, winner);
    };

    PlayState.createTokenPositions = function(environment)
    {
        var answer = [];

        var tokens = environment.tokens();

        for (var i = 0; i < tokens.length; i++)
        {
            var token = tokens[i];
            var position = environment.getPositionFor(token);
            answer[answer.length] =
            {
                token: token,
                position: position
            };
        }

        return answer;
    };

    return PlayState;
});
