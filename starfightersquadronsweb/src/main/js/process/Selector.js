define(function()
{
    "use strict";
    var Selector = {};

    Selector.attackerTargetLocks = function(state, attacker)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateNotNull("attacker", attacker);

        return state.targetLocks.filter(function(targetLock)
        {
            return targetLock.attacker().id() === attacker.id();
        });
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

    Selector.position = function(state, tokenId)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateIsNumber("tokenId", tokenId);

        return state.tokenIdToPosition[tokenId];
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

    Selector.tokenById = function(state, tokenId0)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateIsNumber("tokenId0", tokenId0);

        var answer;

        var tokenIds = Object.keys(state.tokenIdToPosition);

        for (var i = 0; i < tokenIds.length; i++)
        {
            var tokenId = tokenIds[i];

            if (tokenId == tokenId0)
            {
                var position = state.tokenIdToPosition[tokenId];
                answer = state.positionToToken[position];
                break;
            }
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

    if (Object.freeze)
    {
        Object.freeze(Selector);
    }

    return Selector;
});
