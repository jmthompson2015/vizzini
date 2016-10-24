define([ "CardType" ], function(CardType)
{
    "use strict";
    var Selector = {};

    Selector.agents = function(state, ids)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateNotNull("ids", ids);

        var answer = [];

        ids.forEach(function(id)
        {
            var agent = state.agents[id];

            if (agent)
            {
                answer.push(agent);
            }
        });

        return answer;
    };

    Selector.allies = function(state, ids)
    {
        return Selector.cardInstances(state, ids, CardType.ALLY);
    };

    Selector.cardInstances = function(state, ids, cardTypeKey)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateNotNull("ids", ids);

        var answer = [];

        ids.forEach(function(id)
        {
            var cardInstance = state.cardInstances[id];

            if (!cardInstance)
            {
                LOGGER.warn("Can't find cardInstance for id = " + id);
            }

            if (cardInstance && ((cardTypeKey && cardInstance.card.cardTypeKey === cardTypeKey) || !cardTypeKey))
            {
                answer.push(cardInstance);
            }
        });

        return answer;
    };

    Selector.characters = function(state, ids)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateNotNull("ids", ids);

        var answer = [];

        ids.forEach(function(id)
        {
            var cardInstance = state.cardInstances[id];
            var cardTypeKey = cardInstance.card.cardTypeKey;

            if (cardTypeKey === CardType.HERO || cardTypeKey === CardType.ALLY)
            {
                answer.push(cardInstance);
            }
        });

        return answer;
    };

    Selector.enemies = function(state, ids)
    {
        return Selector.cardInstances(state, ids, CardType.ENEMY);
    };

    Selector.heroes = function(state, ids)
    {
        return Selector.cardInstances(state, ids, CardType.HERO);
    };

    Selector.locations = function(state, ids)
    {
        return Selector.cardInstances(state, ids, CardType.LOCATION);
    };

    return Selector;
});
