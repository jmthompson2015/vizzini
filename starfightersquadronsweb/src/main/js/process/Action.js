define([ "Count" ], function(Count)
{
    "use strict";
    var Action = {};

    Action.ADD_COUNT = "addCount";
    Action.ADD_ROUND = "addRound";
    Action.ADD_TARGET_LOCK = "addTargetLock";
    Action.ADD_TOKEN_CRITICAL_DAMAGE = "addTokenCriticalDamage";
    Action.ADD_TOKEN_DAMAGE = "addTokenDamage";
    Action.ADD_TOKEN_UPGRADE = "addTokenUpgrade";
    Action.ADD_TOKEN_UPGRADE_ENERGY = "addTokenUpgradeEnergy";
    Action.DISCARD_DAMAGE = "discardDamage";
    Action.DRAW_DAMAGE = "drawDamage";
    Action.INCREMENT_NEXT_TARGET_LOCK_ID = "incrementNextTargetLockId";
    Action.INCREMENT_NEXT_TOKEN_ID = "incrementNextTokenId";
    Action.MOVE_TOKEN = "moveToken";
    Action.PLACE_TOKEN = "placeToken";
    Action.REMOVE_TARGET_LOCK = "removeTargetLock";
    Action.REMOVE_TOKEN = "removeToken";
    Action.REMOVE_TOKEN_AT = "removeTokenAt";
    Action.REMOVE_TOKEN_CRITICAL_DAMAGE = "removeTokenCriticalDamage";
    Action.REMOVE_TOKEN_DAMAGE = "removeTokenDamage";
    Action.REMOVE_TOKEN_UPGRADE = "removeTokenUpgrade";
    Action.REPLENISH_DAMAGE_DECK = "replenishDamageDeck";
    Action.RESET_NEXT_TOKEN_ID = "resetNextTokenId";
    Action.SET_ACTIVE_TOKEN = "setActiveToken";
    Action.SET_COUNT = "setCount";
    Action.SET_DAMAGE_DECK = "setDamageDeck";
    Action.SET_FIRST_AGENT = "setFirstAgent";
    Action.SET_PHASE = "setPhase";
    Action.SET_PLAY_AREA_SCALE = "setPlayAreaScale";
    Action.SET_PLAY_FORMAT = "setPlayFormat";
    Action.SET_SECOND_AGENT = "setSecondAgent";
    Action.SET_TOKEN_UPGRADE_ENERGY = "setTokenUpgradeEnergy";
    Action.SET_USER_MESSAGE = "setUserMessage";

    Action.addCloakCount = function(tokenId, value)
    {
        return Action.addCount(tokenId, Count.CLOAK, value);
    };

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

    Action.addEnergyCount = function(tokenId, value)
    {
        return Action.addCount(tokenId, Count.ENERGY, value);
    };

    Action.addEvadeCount = function(tokenId, value)
    {
        return Action.addCount(tokenId, Count.EVADE, value);
    };

    Action.addFocusCount = function(tokenId, value)
    {
        return Action.addCount(tokenId, Count.FOCUS, value);
    };

    Action.addIonCount = function(tokenId, value)
    {
        return Action.addCount(tokenId, Count.ION, value);
    };

    Action.addReinforceCount = function(tokenId, value)
    {
        return Action.addCount(tokenId, Count.REINFORCE, value);
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

    Action.addShieldCount = function(tokenId, value)
    {
        return Action.addCount(tokenId, Count.SHIELD, value);
    };

    Action.addStressCount = function(tokenId, value)
    {
        return Action.addCount(tokenId, Count.STRESS, value);
    };

    Action.addTargetLock = function(targetLock)
    {
        InputValidator.validateNotNull("targetLock", targetLock);

        return (
        {
            type: Action.ADD_TARGET_LOCK,
            targetLock: targetLock,
        });
    };

    Action.addTokenCriticalDamage = function(tokenId, damageKey)
    {
        InputValidator.validateIsNumber("tokenId", tokenId);
        InputValidator.validateNotNull("damageKey", damageKey);

        return (
        {
            type: Action.ADD_TOKEN_CRITICAL_DAMAGE,
            tokenId: tokenId,
            damageKey: damageKey,
        });
    };

    Action.addTokenDamage = function(tokenId, damageKey)
    {
        InputValidator.validateIsNumber("tokenId", tokenId);
        InputValidator.validateNotNull("damageKey", damageKey);

        return (
        {
            type: Action.ADD_TOKEN_DAMAGE,
            tokenId: tokenId,
            damageKey: damageKey,
        });
    };

    Action.addTokenUpgrade = function(tokenId, upgradeKey)
    {
        InputValidator.validateIsNumber("tokenId", tokenId);
        InputValidator.validateNotNull("upgradeKey", upgradeKey);

        return (
        {
            type: Action.ADD_TOKEN_UPGRADE,
            tokenId: tokenId,
            upgradeKey: upgradeKey,
        });
    };

    Action.addTokenUpgradeEnergy = function(tokenId, upgradeKey, value)
    {
        InputValidator.validateIsNumber("tokenId", tokenId);
        InputValidator.validateNotNull("upgradeKey", upgradeKey);
        var myValue = (value !== undefined ? value : 1);

        return (
        {
            type: Action.ADD_TOKEN_UPGRADE_ENERGY,
            tokenId: tokenId,
            upgradeKey: upgradeKey,
            value: myValue,
        });
    };

    Action.addWeaponsDisabledCount = function(tokenId, value)
    {
        return Action.addCount(tokenId, Count.WEAPONS_DISABLED, value);
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

    Action.incrementNextTargetLockId = function()
    {
        return (
        {
            type: Action.INCREMENT_NEXT_TARGET_LOCK_ID,
        });
    };

    Action.incrementNextTokenId = function()
    {
        return (
        {
            type: Action.INCREMENT_NEXT_TOKEN_ID,
        });
    };

    Action.moveToken = function(fromPosition, toPosition)
    {
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("toPosition", toPosition);

        return (
        {
            type: Action.MOVE_TOKEN,
            fromPosition: fromPosition,
            toPosition: toPosition,
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

    Action.removeTargetLock = function(targetLock)
    {
        InputValidator.validateNotNull("targetLock", targetLock);

        return (
        {
            type: Action.REMOVE_TARGET_LOCK,
            targetLock: targetLock,
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

    Action.removeTokenCriticalDamage = function(tokenId, damageKey)
    {
        InputValidator.validateIsNumber("tokenId", tokenId);
        InputValidator.validateNotNull("damageKey", damageKey);

        return (
        {
            type: Action.REMOVE_TOKEN_CRITICAL_DAMAGE,
            tokenId: tokenId,
            damageKey: damageKey,
        });
    };

    Action.removeTokenDamage = function(tokenId, damageKey)
    {
        InputValidator.validateIsNumber("tokenId", tokenId);
        InputValidator.validateNotNull("damageKey", damageKey);

        return (
        {
            type: Action.REMOVE_TOKEN_DAMAGE,
            tokenId: tokenId,
            damageKey: damageKey,
        });
    };

    Action.removeTokenUpgrade = function(tokenId, upgradeKey)
    {
        InputValidator.validateIsNumber("tokenId", tokenId);
        InputValidator.validateNotNull("upgradeKey", upgradeKey);

        return (
        {
            type: Action.REMOVE_TOKEN_UPGRADE,
            tokenId: tokenId,
            upgradeKey: upgradeKey,
        });
    };

    Action.replenishDamageDeck = function()
    {
        return (
        {
            type: Action.REPLENISH_DAMAGE_DECK,
        });
    };

    Action.resetNextTokenId = function()
    {
        return (
        {
            type: Action.RESET_NEXT_TOKEN_ID,
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

    Action.setCloakCount = function(tokenId, value)
    {
        return Action.setCount(tokenId, Count.CLOAK, value);
    };

    Action.setCount = function(tokenId, property, value)
    {
        InputValidator.validateIsNumber("tokenId", tokenId);
        InputValidator.validateNotNull("property", property);
        var myValue = (value ? value : 0);

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

    Action.setEnergyCount = function(tokenId, value)
    {
        return Action.setCount(tokenId, Count.ENERGY, value);
    };

    Action.setEvadeCount = function(tokenId, value)
    {
        return Action.setCount(tokenId, Count.EVADE, value);
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

    Action.setFocusCount = function(tokenId, value)
    {
        return Action.setCount(tokenId, Count.FOCUS, value);
    };

    Action.setIonCount = function(tokenId, value)
    {
        return Action.setCount(tokenId, Count.ION, value);
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

    Action.setPlayAreaScale = function(scale)
    {
        InputValidator.validateNotNull("scale", scale);

        return (
        {
            type: Action.SET_PLAY_AREA_SCALE,
            scale: scale,
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

    Action.setReinforceCount = function(tokenId, value)
    {
        return Action.setCount(tokenId, Count.REINFORCE, value);
    };

    Action.setShieldCount = function(tokenId, value)
    {
        return Action.setCount(tokenId, Count.SHIELD, value);
    };

    Action.setStressCount = function(tokenId, value)
    {
        return Action.setCount(tokenId, Count.STRESS, value);
    };

    Action.setTokenUpgradeEnergy = function(tokenId, upgradeKey, value)
    {
        InputValidator.validateIsNumber("tokenId", tokenId);
        InputValidator.validateNotNull("upgradeKey", upgradeKey);
        var myValue = (value !== undefined ? value : 0);

        return (
        {
            type: Action.SET_TOKEN_UPGRADE_ENERGY,
            tokenId: tokenId,
            upgradeKey: upgradeKey,
            value: myValue,
        });
    };

    Action.setUserMessage = function(userMessage)
    {
        InputValidator.validateNotNull("userMessage", userMessage);

        return (
        {
            type: Action.SET_USER_MESSAGE,
            userMessage: userMessage,
        });
    };

    Action.setWeaponsDisabledCount = function(tokenId, value)
    {
        return Action.setCount(tokenId, Count.WEAPONS_DISABLED, value);
    };

    if (Object.freeze)
    {
        Object.freeze(Action);
    }

    return Action;
});
