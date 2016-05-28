define(function()
{
    "use strict";
    var Action = {};

    Action.ADD_ROUND = "addRound";
    Action.SET_ACTIVE_TOKEN = "setActiveToken";
    Action.SET_PHASE = "setPhase";
    Action.SET_PLAY_FORMAT = "setPlayFormat";

    Action.setActiveToken = function(tokenId)
    {
        return (
        {
            type: Action.SET_ACTIVE_TOKEN,
            tokenId: tokenId,
        });
    };

    Action.addRound = function(value)
    {
        var myValue = (value !== undefined ? value : 1);

        return (
        {
            type: Action.ADD_ROUND,
            value: myValue,
        });
    };

    Action.setPhase = function(phaseKey)
    {
        InputValidator.validateNotNull("phaseKey", phaseKey);

        return (
        {
            type: Action.SET_PHASE,
            phaseKey: phaseKey,
        });
    };

    Action.setPlayFormat = function(playFormatKey)
    {
        InputValidator.validateNotNull("playFormatKey", playFormatKey);

        return (
        {
            type: Action.SET_PLAY_FORMAT,
            playFormatKey: playFormatKey,
        });
    };

    if (Object.freeze)
    {
        Object.freeze(Action);
    }

    return Action;
});
