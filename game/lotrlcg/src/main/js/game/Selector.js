define([ "CardType" ], function(CardType)
{
    "use strict";
    var Selector = {};

    Selector.findById = function(array, id)
    {
        InputValidator.validateNotNull("array", array);
        InputValidator.validateNotNull("id", id);

        var answer;

        for (var i = 0; i < array.length; i++)
        {
            var element = array[i];

            if (element.id === id)
            {
                answer = element;
                break;
            }
        }

        return answer;
    };

    Selector.allies = function(state, ids)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateNotNull("ids", ids);

        var answer = [];

        ids.forEach(function(id)
        {
            var cardInstance = state.cardInstances[id];
            var cardTypeKey = cardInstance.card.cardTypeKey;

            if (cardTypeKey === CardType.ALLY)
            {
                answer.push(cardInstance);
            }
        });

        return answer;
    };

    Selector.cardInstances = function(state, ids)
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

            answer.push(cardInstance);
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
        InputValidator.validateNotNull("state", state);
        InputValidator.validateNotNull("ids", ids);

        var answer = [];

        ids.forEach(function(id)
        {
            var cardInstance = state.cardInstances[id];
            var cardTypeKey = cardInstance.card.cardTypeKey;

            if (cardTypeKey === CardType.ENEMY)
            {
                answer.push(cardInstance);
            }
        });

        return answer;
    };

    Selector.heroes = function(state, ids)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateNotNull("ids", ids);

        var answer = [];

        ids.forEach(function(id)
        {
            var cardInstance = state.cardInstances[id];
            var cardTypeKey = cardInstance.card.cardTypeKey;

            if (cardTypeKey === CardType.HERO)
            {
                answer.push(cardInstance);
            }
        });

        return answer;
    };

    Selector.locations = function(state, ids)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateNotNull("ids", ids);

        var answer = [];

        ids.forEach(function(id)
        {
            var cardInstance = state.cardInstances[id];
            var cardTypeKey = cardInstance.card.cardTypeKey;

            if (cardTypeKey === CardType.LOCATION)
            {
                answer.push(cardInstance);
            }
        });

        return answer;
    };

    Selector.resolveAgentIds = function(state, ids)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateNotNull("ids", ids);

        // LOGGER.info("state.agents = " + state.agents);
        // LOGGER.info("state.agents = " + JSON.stringify(state.agents));
        // LOGGER.info("state.agents.length = " + state.agents.length);
        //
        // if (state.agents)
        // {
        // return ids.map(function(id)
        // {
        // if (!state.agents[id])
        // {
        // LOGGER.error("Selector.resolveAgentIds(): Can't find agent for id: " + id);
        // }
        // return state.agents[id];
        // });
        // }
        // else
        // {
        // return [];
        // }
        var answer = [];

        ids.forEach(function(id)
        {
            var agent = state.agents[id];
            // LOGGER.info("Selector.resolveAgentIds() id = "+id+" agent = "+agent.name);

            if (agent)
            {
                answer.push(agent);
            }
        });

        return answer;
    };

    Selector.resolveCardInstanceIds = function(state, ids)
    {
        InputValidator.validateNotNull("state", state);
        InputValidator.validateNotNull("ids", ids);

        return ids.map(function(id)
        {
            return state.cardInstances[id];
        });
    };

    return Selector;
});
