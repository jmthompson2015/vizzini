define(function()
{
    "use strict";
    var Action = {};

    Action.ADD_CARD_INSTANCES = "addCardInstances";
    Action.ADD_PROGRESS = "addProgress";
    Action.ADD_RESOURCES = "addResources";
    Action.ADD_THREAT_LEVEL = "addThreatLevel";
    Action.ADD_TO_PLAY_AREA = "addToPlayArea";
    Action.ADD_WOUNDS = "addWounds";
    Action.DISCARD_ENGAGED_CARD = "discardEngagedCard";
    Action.DISCARD_PLAYER_CARD = "discardPlayerCard";
    Action.DRAW_ENCOUNTER_CARD = "dealEncounterCardToStagingArea";
    Action.DRAW_PLAYER_CARD = "drawPlayerCard";
    Action.DRAW_QUEST_CARD = "drawQuestCard";
    Action.ELIMINATE_PLAYER = "eliminatePlayer";
    Action.ENGAGE_ENEMY = "engageEnemy";
    Action.INCREMENT_FIRST_PLAYER = "incrementFirstPlayer";
    Action.INCREMENT_ROUND = "incrementRound";
    Action.REMOVE_FROM_HAND = "removeFromHand";
    Action.SET_ACTIVE_AGENT = "setActiveAgent";
    Action.SET_ACTIVE_LOCATION = "setActiveLocation";
    Action.SET_AGENTS = "setAgents";
    Action.SET_ENCOUNTER_DECK_IDS = "setEncounterDeckIds";
    Action.SET_EXHAUSTED = "setExhausted";
    Action.SET_FIRST_PLAYER = "setFirstPlayer";
    Action.SET_PHASE = "setPhase";
    Action.SET_QUEST_DECK_IDS = "setQuestDeckIds";
    Action.SET_QUESTING = "setQuesting";

    Action.addCardInstances = function(cardInstances)
    {
        InputValidator.validateNotNull("cardInstances", cardInstances);

        return (
        {
            type: Action.ADD_CARD_INSTANCES,
            cardInstances: cardInstances,
        });
    };

    Action.addProgress = function(cardInstance, value)
    {
        InputValidator.validateNotNull("cardInstance", cardInstance);

        var myValue = (value !== undefined ? value : 1);

        return (
        {
            type: Action.ADD_PROGRESS,
            cardInstanceId: cardInstance.id,
            value: myValue,
        });
    };

    Action.addResources = function(cardInstance, value)
    {
        InputValidator.validateNotNull("cardInstance", cardInstance);

        var myValue = (value !== undefined ? value : 1);

        return (
        {
            type: Action.ADD_RESOURCES,
            cardInstanceId: cardInstance.id,
            value: myValue,
        });
    };

    Action.addToPlayArea = function(agent, cardInstance)
    {
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("cardInstance", cardInstance);

        return (
        {
            type: Action.ADD_TO_PLAY_AREA,
            agentId: agent.id,
            cardInstanceId: cardInstance.id,
        });
    };

    Action.addThreatLevel = function(agent, value)
    {
        InputValidator.validateNotNull("agent", agent);

        var myValue = (value !== undefined ? value : 1);

        return (
        {
            type: Action.ADD_THREAT_LEVEL,
            agentId: agent.id,
            value: myValue,
        });
    };

    Action.addWounds = function(cardInstance, value)
    {
        InputValidator.validateNotNull("cardInstance", cardInstance);

        var myValue = (value !== undefined ? value : 1);

        return (
        {
            type: Action.ADD_WOUNDS,
            cardInstanceId: cardInstance.id,
            value: myValue,
        });
    };

    Action.discardEngagedCard = function(agent, cardInstance)
    {
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("cardInstance", cardInstance);

        return (
        {
            type: Action.DISCARD_ENGAGED_CARD,
            agentId: agent.id,
            cardInstanceId: cardInstance.id,
        });
    };

    Action.discardPlayerCard = function(agent, cardInstance)
    {
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("cardInstance", cardInstance);

        return (
        {
            type: Action.DISCARD_PLAYER_CARD,
            agentId: agent.id,
            cardInstanceId: cardInstance.id,
        });
    };

    Action.drawEncounterCard = function()
    {
        return (
        {
            type: Action.DRAW_ENCOUNTER_CARD,
        });
    };

    Action.drawPlayerCard = function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        return (
        {
            type: Action.DRAW_PLAYER_CARD,
            agentId: agent.id,
        });
    };

    Action.drawQuestCard = function()
    {
        return (
        {
            type: Action.DRAW_QUEST_CARD,
        });
    };

    Action.eliminatePlayer = function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        return (
        {
            type: Action.ELIMINATE_PLAYER,
            agentId: agent.id,
        });
    };

    Action.engageEnemy = function(agent, enemy)
    {
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("enemy", enemy);

        return (
        {
            type: Action.ENGAGE_ENEMY,
            agentId: agent.id,
            enemyId: enemy.id,
        });
    };

    Action.incrementFirstPlayer = function()
    {
        return (
        {
            type: Action.INCREMENT_FIRST_PLAYER,
        });
    };

    Action.incrementRound = function()
    {
        return (
        {
            type: Action.INCREMENT_ROUND,
        });
    };

    Action.removeFromHand = function(agent, cardInstance)
    {
        InputValidator.validateNotNull("agent", agent);
        InputValidator.validateNotNull("cardInstance", cardInstance);

        return (
        {
            type: Action.REMOVE_FROM_HAND,
            agentId: agent.id,
            cardInstanceId: cardInstance.id,
        });
    };

    Action.setActiveAgent = function(agent)
    {
        return (
        {
            type: Action.SET_ACTIVE_AGENT,
            agentId: (agent ? agent.id : undefined),
        });
    };

    Action.setActiveLocation = function(locationInstance)
    {
        InputValidator.validateNotNull("locationInstance", locationInstance);

        return (
        {
            type: Action.SET_ACTIVE_LOCATION,
            locationInstanceId: locationInstance.id,
        });
    };

    Action.setAgents = function(agents)
    {
        InputValidator.validateNotNull("agents", agents);

        return (
        {
            type: Action.SET_AGENTS,
            agents: agents,
        });
    };

    Action.setEncounterDeckIds = function(encounterDeckIds)
    {
        InputValidator.validateNotNull("encounterDeckIds", encounterDeckIds);

        return (
        {
            type: Action.SET_ENCOUNTER_DECK_IDS,
            encounterDeckIds: encounterDeckIds,
        });
    };

    Action.setExhausted = function(cardInstance, isExhausted)
    {
        InputValidator.validateNotNull("cardInstance", cardInstance);

        var myFlag = ([ true, false ].vizziniContains(isExhausted) ? isExhausted : true);

        return (
        {
            type: Action.SET_EXHAUSTED,
            cardInstanceId: cardInstance.id,
            isExhausted: myFlag,
        });
    };

    Action.setFirstPlayer = function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        return (
        {
            type: Action.SET_FIRST_PLAYER,
            agentId: agent.id,
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

    Action.setQuestDeckIds = function(questDeckIds)
    {
        InputValidator.validateNotNull("questDeckIds", questDeckIds);

        return (
        {
            type: Action.SET_QUEST_DECK_IDS,
            questDeckIds: questDeckIds,
        });
    };

    Action.setQuesting = function(cardInstance, isQuesting)
    {
        InputValidator.validateNotNull("cardInstance", cardInstance);

        var myFlag = ([ true, false ].vizziniContains(isQuesting) ? isQuesting : true);

        return (
        {
            type: Action.SET_QUESTING,
            cardInstanceId: cardInstance.id,
            isQuesting: myFlag,
        });
    };

    return Action;
});
