define(function()
{
    "use strict";
    var Selector = {};

    Selector.attackerTargetLocks = function(targetLocks, attacker)
    {
        InputValidator.validateNotNull("targetLocks", targetLocks);
        InputValidator.validateNotNull("attacker", attacker);

        return targetLocks.filter(function(targetLock)
        {
            return targetLock.attacker().id() === attacker.id();
        });
    };

    Selector.defenderTargetLocks = function(targetLocks, defender)
    {
        InputValidator.validateNotNull("targetLocks", targetLocks);
        InputValidator.validateNotNull("defender", defender);

        return targetLocks.filter(function(targetLock)
        {
            return targetLock.defender().id() === defender.id();
        });
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

    if (Object.freeze)
    {
        Object.freeze(Selector);
    }

    return Selector;
});
