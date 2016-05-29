define(function()
{
    "use strict";
    var Action = {};

    Action.ADD_ROUND = "addRound";
    Action.PLACE_TOKEN = "placeToken";
    Action.REMOVE_TOKEN = "removeToken";
    Action.REMOVE_TOKEN_AT = "removeTokenAt";
    Action.SET_ACTIVE_TOKEN = "setActiveToken";
    Action.SET_FIRST_AGENT = "setFirstAgent";
    Action.SET_PHASE = "setPhase";
    Action.SET_PLAY_FORMAT = "setPlayFormat";
    Action.SET_SECOND_AGENT = "setSecondAgent";

    Action.addRound = function(value)
    {
        var myValue = (value !== undefined ? value : 1);

        return (
        {
            type: Action.ADD_ROUND,
            value: myValue,
        });
    };

    Action.placeToken = function(position, token)
    {
        InputValidator.validateNotNull("position", position);
        InputValidator.validateNotNull("token", token);

        return (
        {
            type: Action.PLACE_TOKEN,
            position: position,
            token: token,
        });
    };

    Action.removeToken = function(token)
    {
        InputValidator.validateNotNull("token", token);

        return (
        {
            type: Action.REMOVE_TOKEN,
            token: token,
        });
    };

    Action.removeTokenAt = function(position)
    {
        InputValidator.validateNotNull("position", position);

        return (
        {
            type: Action.REMOVE_TOKEN_AT,
            position: position,
        });
    };

    Action.setActiveToken = function(tokenId)
    {
        return (
        {
            type: Action.SET_ACTIVE_TOKEN,
            tokenId: tokenId,
        });
    };

    Action.setFirstAgent = function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        return (
        {
            type: Action.SET_FIRST_AGENT,
            agent: agent,
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

    Action.setSecondAgent = function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        return (
        {
            type: Action.SET_SECOND_AGENT,
            agent: agent,
        });
    };

    if (Object.freeze)
    {
        Object.freeze(Action);
    }

    return Action;
});
