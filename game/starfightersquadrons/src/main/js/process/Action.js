define(["Count"], function(Count)
{
    "use strict";
    var Action = {};

    Action.ADD_COUNT = "addCount";
    Action.ADD_ROUND = "addRound";
    Action.ADD_TARGET_LOCK = "addTargetLock";
    Action.ADD_TOKEN_CRITICAL_DAMAGE = "addTokenCriticalDamage";
    Action.ADD_TOKEN_DAMAGE = "addTokenDamage";
    Action.ADD_TOKEN_PILOT_PER_ROUND = "addTokenPilotPerRound";
    Action.ADD_TOKEN_UPGRADE = "addTokenUpgrade";
    Action.ADD_TOKEN_UPGRADE_ENERGY = "addTokenUpgradeEnergy";
    Action.ADD_TOKEN_UPGRADE_PER_ROUND = "addTokenUpgradePerRound";
    Action.CLEAR_EVENT = "clearEvent";
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
    Action.SET_ADJUDICATOR = "setAdjudicator";
    Action.SET_COUNT = "setCount";
    Action.SET_DAMAGE_DECK = "setDamageDeck";
    Action.SET_ENVIRONMENT = "setEnvironment";
    Action.SET_EVENT = "setEvent";
    Action.SET_FIRST_AGENT = "setFirstAgent";
    Action.SET_PHASE = "setPhase";
    Action.SET_PLAY_AREA_SCALE = "setPlayAreaScale";
    Action.SET_PLAY_FORMAT = "setPlayFormat";
    Action.SET_SECOND_AGENT = "setSecondAgent";
    Action.SET_TOKEN_ACTIVATION_STATE = "setTokenActivationState";
    Action.SET_TOKEN_COMBAT_STATE = "setTokenCombatState";
    Action.SET_TOKEN_MANEUVER = "setTokenManeuver";
    Action.SET_TOKEN_PILOT_PER_ROUND = "setTokenPilotPerRound";
    Action.SET_TOKEN_UPGRADE_ENERGY = "setTokenUpgradeEnergy";
    Action.SET_TOKEN_UPGRADE_PER_ROUND = "setTokenUpgradePerRound";
    Action.SET_USER_MESSAGE = "setUserMessage";
    Action.SET_VALUE = "setValue";

    Action.addCloakCount = function(token, value)
    {
        return Action.addCount(token, Count.CLOAK, value);
    };

    Action.addCount = function(token, property, value)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("property", property);
        var myValue = (value !== undefined ? value : 1);

        return (
        {
            type: Action.ADD_COUNT,
            token: token,
            property: property,
            value: myValue,
        });
    };

    Action.addEnergyCount = function(token, value)
    {
        return Action.addCount(token, Count.ENERGY, value);
    };

    Action.addEvadeCount = function(token, value)
    {
        return Action.addCount(token, Count.EVADE, value);
    };

    Action.addFocusCount = function(token, value)
    {
        return Action.addCount(token, Count.FOCUS, value);
    };

    Action.addIonCount = function(token, value)
    {
        return Action.addCount(token, Count.ION, value);
    };

    Action.addReinforceCount = function(token, value)
    {
        return Action.addCount(token, Count.REINFORCE, value);
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

    Action.addShieldCount = function(token, value)
    {
        return Action.addCount(token, Count.SHIELD, value);
    };

    Action.addStressCount = function(token, value)
    {
        return Action.addCount(token, Count.STRESS, value);
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

    Action.addTokenCriticalDamage = function(token, damageKey)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("damageKey", damageKey);

        return (
        {
            type: Action.ADD_TOKEN_CRITICAL_DAMAGE,
            token: token,
            damageKey: damageKey,
        });
    };

    Action.addTokenDamage = function(token, damageKey)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("damageKey", damageKey);

        return (
        {
            type: Action.ADD_TOKEN_DAMAGE,
            token: token,
            damageKey: damageKey,
        });
    };

    Action.addTokenPilotPerRound = function(token, pilotKey, value)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("pilotKey", pilotKey);
        var myValue = (value !== undefined ? value : 1);

        return (
        {
            type: Action.ADD_TOKEN_PILOT_PER_ROUND,
            token: token,
            pilotKey: pilotKey,
            value: myValue,
        });
    };

    Action.addTokenUpgrade = function(token, upgradeKey)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("upgradeKey", upgradeKey);

        return (
        {
            type: Action.ADD_TOKEN_UPGRADE,
            token: token,
            upgradeKey: upgradeKey,
        });
    };

    Action.addTokenUpgradeEnergy = function(token, upgradeKey, value)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("upgradeKey", upgradeKey);
        var myValue = (value !== undefined ? value : 1);

        return (
        {
            type: Action.ADD_TOKEN_UPGRADE_ENERGY,
            token: token,
            upgradeKey: upgradeKey,
            value: myValue,
        });
    };

    Action.addTokenUpgradePerRound = function(token, upgradeKey, value)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("upgradeKey", upgradeKey);
        var myValue = (value !== undefined ? value : 1);

        return (
        {
            type: Action.ADD_TOKEN_UPGRADE_PER_ROUND,
            token: token,
            upgradeKey: upgradeKey,
            value: myValue,
        });
    };

    Action.addTractorBeamCount = function(token, value)
    {
        return Action.addCount(token, Count.TRACTOR_BEAM, value);
    };

    Action.addWeaponsDisabledCount = function(token, value)
    {
        return Action.addCount(token, Count.WEAPONS_DISABLED, value);
    };

    Action.clearEvent = function()
    {
        return (
        {
            type: Action.CLEAR_EVENT,
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

    Action.removeTokenCriticalDamage = function(token, damageKey)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("damageKey", damageKey);

        return (
        {
            type: Action.REMOVE_TOKEN_CRITICAL_DAMAGE,
            token: token,
            damageKey: damageKey,
        });
    };

    Action.removeTokenDamage = function(token, damageKey)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("damageKey", damageKey);

        return (
        {
            type: Action.REMOVE_TOKEN_DAMAGE,
            token: token,
            damageKey: damageKey,
        });
    };

    Action.removeTokenUpgrade = function(token, upgradeKey)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("upgradeKey", upgradeKey);

        return (
        {
            type: Action.REMOVE_TOKEN_UPGRADE,
            token: token,
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

    Action.setActiveToken = function(token)
    {
        return (
        {
            type: Action.SET_ACTIVE_TOKEN,
            token: token,
        });
    };

    Action.setAdjudicator = function(adjudicator)
    {
        InputValidator.validateNotNull("adjudicator", adjudicator);

        return (
        {
            type: Action.SET_ADJUDICATOR,
            adjudicator: adjudicator,
        });
    };

    Action.setCloakCount = function(token, value)
    {
        return Action.setCount(token, Count.CLOAK, value);
    };

    Action.setCount = function(token, property, value)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("property", property);
        var myValue = (value ? value : 0);

        return (
        {
            type: Action.SET_COUNT,
            token: token,
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

    Action.setEnergyCount = function(token, value)
    {
        return Action.setCount(token, Count.ENERGY, value);
    };

    Action.setEnvironment = function(environment)
    {
        InputValidator.validateNotNull("environment", environment);

        return (
        {
            type: Action.SET_ENVIRONMENT,
            environment: environment,
        });
    };

    Action.setEvadeCount = function(token, value)
    {
        return Action.setCount(token, Count.EVADE, value);
    };

    Action.setEvent = function(eventKey, token, callback)
    {
        InputValidator.validateNotNull("eventKey", eventKey);
        InputValidator.validateNotNull("token", token);

        return (
        {
            type: Action.SET_EVENT,
            eventKey: eventKey,
            eventToken: token,
            eventCallback: callback,
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

    Action.setFocusCount = function(token, value)
    {
        return Action.setCount(token, Count.FOCUS, value);
    };

    Action.setIonCount = function(token, value)
    {
        return Action.setCount(token, Count.ION, value);
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

    Action.setReinforceCount = function(token, value)
    {
        return Action.setCount(token, Count.REINFORCE, value);
    };

    Action.setShieldCount = function(token, value)
    {
        return Action.setCount(token, Count.SHIELD, value);
    };

    Action.setStressCount = function(token, value)
    {
        return Action.setCount(token, Count.STRESS, value);
    };

    Action.setTokenActivationState = function(token, activationState)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("activationState", activationState);

        return (
        {
            type: Action.SET_TOKEN_ACTIVATION_STATE,
            token: token,
            activationState: activationState,
        });
    };

    Action.setTokenCombatState = function(token, combatState)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("combatState", combatState);

        return (
        {
            type: Action.SET_TOKEN_COMBAT_STATE,
            token: token,
            combatState: combatState,
        });
    };

    Action.setTokenManeuver = function(token, maneuver)
    {
        InputValidator.validateNotNull("token", token);
        // maneuver optional.

        return (
        {
            type: Action.SET_TOKEN_MANEUVER,
            token: token,
            maneuver: maneuver,
        });
    };

    Action.setTokenPilotPerRound = function(token, pilotKey, value)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("pilotKey", pilotKey);
        var myValue = (value !== undefined ? value : 0);

        return (
        {
            type: Action.SET_TOKEN_PILOT_PER_ROUND,
            token: token,
            pilotKey: pilotKey,
            value: myValue,
        });
    };

    Action.setTokenUpgradeEnergy = function(token, upgradeKey, value)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("upgradeKey", upgradeKey);
        var myValue = (value !== undefined ? value : 0);

        return (
        {
            type: Action.SET_TOKEN_UPGRADE_ENERGY,
            token: token,
            upgradeKey: upgradeKey,
            value: myValue,
        });
    };

    Action.setTokenUpgradePerRound = function(token, upgradeKey, value)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("upgradeKey", upgradeKey);
        var myValue = (value !== undefined ? value : 0);

        return (
        {
            type: Action.SET_TOKEN_UPGRADE_PER_ROUND,
            token: token,
            upgradeKey: upgradeKey,
            value: myValue,
        });
    };

    Action.setTractorBeamCount = function(token, value)
    {
        return Action.setCount(token, Count.TRACTOR_BEAM, value);
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

    Action.setValue = function(token, property, value)
    {
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("property", property);
        var myValue = (value !== undefined ? value : 0);

        return (
        {
            type: Action.SET_VALUE,
            token: token,
            property: property,
            value: myValue,
        });
    };

    Action.setWeaponsDisabledCount = function(token, value)
    {
        return Action.setCount(token, Count.WEAPONS_DISABLED, value);
    };

    if (Object.freeze)
    {
        Object.freeze(Action);
    }

    return Action;
});
