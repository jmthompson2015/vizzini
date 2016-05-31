define(function()
{
    "use strict";
    var Action = {};

    Action.ADD_COUNT = "addCount";
    Action.ADD_ROUND = "addRound";
    Action.DISCARD_DAMAGE = "discardDamage";
    Action.DRAW_DAMAGE = "drawDamage";
    Action.PLACE_TOKEN = "placeToken";
    Action.REMOVE_TOKEN = "removeToken";
    Action.REMOVE_TOKEN_AT = "removeTokenAt";
    Action.REPLENISH_DAMAGE_DECK = "replenishDamageDeck";
    Action.SET_ACTIVE_TOKEN = "setActiveToken";
    Action.SET_COUNT = "setCount";
    Action.SET_DAMAGE_DECK = "setDamageDeck";
    Action.SET_FIRST_AGENT = "setFirstAgent";
    Action.SET_PHASE = "setPhase";
    Action.SET_PLAY_FORMAT = "setPlayFormat";
    Action.SET_SECOND_AGENT = "setSecondAgent";

    Action.addCount = function(tokenId, property, value)
    {
        InputValidator.validateIsNumber("tokenId", tokenId);
        InputValidator.validateNotNull("property", property);
        var myValue = (value !== undefined ? value : 1);

        return (
        {
            type: Action.ADD_COUNT,
            tokenId: tokenId,
            property: property,
            value: myValue,
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

    Action.discardDamage = function(damage)
    {
        InputValidator.validateNotNull("damage", damage);

        return (
        {
            type: Action.DISCARD_DAMAGE,
            damage: damage,
        });
    };

    Action.drawDamage = function(damage)
    {
        InputValidator.validateNotNull("damage", damage);

        return (
        {
            type: Action.DRAW_DAMAGE,
            damage: damage,
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

    Action.replenishDamageDeck = function()
    {
        return (
        {
            type: Action.REPLENISH_DAMAGE_DECK,
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

    Action.setCount = function(tokenId, property, value)
    {
        InputValidator.validateIsNumber("tokenId", tokenId);
        InputValidator.validateNotNull("property", property);
        var myValue = (value !== undefined ? value : 0);

        return (
        {
            type: Action.SET_COUNT,
            tokenId: tokenId,
            property: property,
            value: myValue,
        });
    };

    Action.setDamageDeck = function(damageDeck)
    {
        InputValidator.validateNotNull("damageDeck", damageDeck);

        return (
        {
            type: Action.SET_DAMAGE_DECK,
            damageDeck: damageDeck,
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
