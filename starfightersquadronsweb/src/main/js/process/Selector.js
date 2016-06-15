define([ "Count" ], function(Count)
{
    "use strict";
    var Selector = {};

    Selector.activeToken = function(state)
    {
        InputValidator.validateNotNull("state", state);

        var answer;

        if (state.activeTokenId !== undefined && state.activeTokenId !== null)
        {
            answer = Selector.token(state, state.activeTokenId);
        }

        return answer;
    };

    Selector.attackerTargetLocks = function(state, attacker)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateNotNull("attacker", attacker);

        return state.targetLocks.filter(function(targetLock)
        {
            return targetLock.attacker().id() === attacker.id();
        });
    };

    Selector.cloakCount = function(state, tokenId)
    {
        return Selector.count(state, tokenId, Count.CLOAK);
    };

    Selector.count = function(state, tokenId, property)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateIsNumber("tokenId", tokenId);
        InputValidator.validateNotNull("property", property);

        var answer;
        var counts = state.tokenIdToCounts[tokenId];

        if (counts)
        {
            answer = counts[property];
        }

        return answer;
    };

    Selector.criticalDamages = function(state, tokenId)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateIsNumber("tokenId", tokenId);

        var answer = state.tokenIdToCriticalDamages[tokenId];

        return (answer ? answer.slice() : []);
    };

    Selector.damages = function(state, tokenId)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateIsNumber("tokenId", tokenId);

        var answer = state.tokenIdToDamages[tokenId];

        return (answer ? answer.slice() : []);
    };

    Selector.defenderTargetLocks = function(state, defender)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateNotNull("defender", defender);

        return state.targetLocks.filter(function(targetLock)
        {
            return targetLock.defender().id() === defender.id();
        });
    };

    Selector.energyCount = function(state, tokenId)
    {
        return Selector.count(state, tokenId, Count.ENERGY);
    };

    Selector.evadeCount = function(state, tokenId)
    {
        return Selector.count(state, tokenId, Count.EVADE);
    };

    Selector.focusCount = function(state, tokenId)
    {
        return Selector.count(state, tokenId, Count.FOCUS);
    };

    Selector.ionCount = function(state, tokenId)
    {
        return Selector.count(state, tokenId, Count.ION);
    };

    Selector.position = function(state, tokenId)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateIsNumber("tokenId", tokenId);

        return state.tokenIdToPosition[tokenId];
    };

    Selector.reinforceCount = function(state, tokenId)
    {
        return Selector.count(state, tokenId, Count.REINFORCE);
    };

    Selector.shieldCount = function(state, tokenId)
    {
        return Selector.count(state, tokenId, Count.SHIELD);
    };

    Selector.stressCount = function(state, tokenId)
    {
        return Selector.count(state, tokenId, Count.STRESS);
    };

    Selector.targetLock = function(targetLocks, attacker, defender)
    {
        InputValidator.validateNotNull("targetLocks", targetLocks);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("defender", defender);

        var answer;

        for (var i = 0; i < targetLocks.length; i++)
        {
            var targetLock = targetLocks[i];

            if (targetLock.attacker().id() === attacker.id() && targetLock.defender().id() === defender.id())
            {
                answer = targetLock;
                break;
            }
        }

        return answer;
    };

    Selector.token = function(state, tokenId)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateIsNumber("tokenId", tokenId);

        return state.tokens[tokenId];
    };

    Selector.tokenAt = function(state, position)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateNotNull("position", position);

        var answer;
        var tokenId = state.positionToTokenId[position];

        if (tokenId !== undefined)
        {
            answer = Selector.token(state, tokenId);
        }

        return answer;
    };

    Selector.upgrades = function(state, tokenId)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateIsNumber("tokenId", tokenId);

        var answer = state.tokenIdToUpgrades[tokenId];

        return (answer ? answer.slice() : []);
    };

    Selector.weaponsDisabledCount = function(state, tokenId)
    {
        return Selector.count(state, tokenId, Count.WEAPONS_DISABLED);
    };

    if (Object.freeze)
    {
        Object.freeze(Selector);
    }

    return Selector;
});
