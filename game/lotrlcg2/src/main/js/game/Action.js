define(function()
{
    "use strict";
    var Action = {};

    Action.INCREMENT_FIRST_PLAYER = "incrementFirstPlayer";
    Action.INCREMENT_ROUND = "incrementRound";
    Action.SET_ACTIVE_AGENT = "setActiveAgent";
    Action.SET_ACTIVE_LOCATION = "setActiveLocation";
    Action.SET_ACTIVE_QUEST = "setActiveQuest";
    Action.SET_PHASE = "setPhase";

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

    Action.setActiveAgent = function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        return (
        {
            type: Action.SET_ACTIVE_AGENT,
            agentId: agent.id,
        });
    };

    Action.setActiveLocation = function(locationInstance)
    {
        InputValidator.validateNotNull("agent", agent);

        return (
        {
            type: Action.SET_ACTIVE_LOCATION,
            location: locationInstance,
        });
    };

    Action.setActiveQuest = function(questInstance)
    {
        InputValidator.validateNotNull("agent", agent);

        return (
        {
            type: Action.SET_ACTIVE_QUEST,
            quest: questInstance,
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

    return Action;
});
