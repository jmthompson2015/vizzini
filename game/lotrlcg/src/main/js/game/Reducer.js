define([ "game/Action", "game/Store" ], function(Action, Store)
{
    "use strict";
    var Reducer = {};

    Reducer.agent = function(state, action)
    {
        // Here state is an agent

        LOGGER.debug("rootReducer() type = " + action.type);

        var newAgent;
        var newPlayAreaIds, newEngagementAreaIds, newHandIds;

        switch (action.type)
        {
        case Action.ADD_THREAT_LEVEL:
            return Object.assign({}, state,
            {
                threatLevel: state.threatLevel + action.value,
            });
        case Action.ADD_TO_PLAY_AREA:
            newPlayAreaIds = state.playAreaIds.slice();
            newPlayAreaIds.push(action.cardInstanceId);
            return Object.assign({}, state,
            {
                playAreaIds: newPlayAreaIds,
            });
        case Action.DISCARD_ENGAGED_CARD:
            newEngagementAreaIds = state.engagementAreaIds.slice();
            newEngagementAreaIds.vizziniRemove(action.cardInstanceId);
            return Object.assign({}, state,
            {
                engagementAreaIds: newEngagementAreaIds,
            });
        case Action.DISCARD_PLAYER_CARD:
            newPlayAreaIds = state.playAreaIds.slice();
            var newPlayerDiscardIds = state.playerDiscardIds.slice();
            newPlayAreaIds.vizziniRemove(action.cardInstanceId);
            newPlayerDiscardIds.push(action.cardInstanceId);
            return Object.assign({}, state,
            {
                playAreaIds: newPlayAreaIds,
                playerDiscardIds: newPlayerDiscardIds,
            });
        case Action.DRAW_PLAYER_CARD:
            var newPlayerCardIds = state.playerCardIds.slice();
            newHandIds = state.handIds.slice();
            newHandIds.push(newPlayerCardIds.shift());
            return Object.assign({}, state,
            {
                playerCardIds: newPlayerCardIds,
                handIds: newHandIds,
            });
        case Action.ENGAGE_ENEMY:
            newEngagementAreaIds = state.engagementAreaIds.slice();
            newEngagementAreaIds.push(action.enemyId);
            return Object.assign({}, state,
            {
                engagementAreaIds: newEngagementAreaIds,
            });
        case Action.REMOVE_FROM_HAND:
            newHandIds = state.handIds.slice();
            newHandIds.vizziniRemove(action.cardInstanceId);
            return Object.assign({}, state,
            {
                handIds: newHandIds,
            });
        default:
            LOGGER.warn("Reducer.agent: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.agents = function(state, action)
    {
        // Here state is state.agents

        LOGGER.debug("rootReducer() type = " + action.type);

        var newAgents;

        switch (action.type)
        {
        case Action.ADD_THREAT_LEVEL:
        case Action.ADD_TO_PLAY_AREA:
        case Action.DISCARD_ENGAGED_CARD:
        case Action.DISCARD_PLAYER_CARD:
        case Action.DRAW_PLAYER_CARD:
        case Action.ENGAGE_ENEMY:
        case Action.REMOVE_FROM_HAND:
            var oldAgent = state[action.agentId];
            newAgents = Object.assign({}, state);
            newAgents[action.agentId] = Reducer.agent(oldAgent, action);
            return newAgents;
        default:
            LOGGER.warn("Reducer.agents: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.cardInstance = function(state, action)
    {
        // Here state is a cardInstance

        LOGGER.debug("rootReducer() type = " + action.type);

        var newCardInstance;
        var sum;

        switch (action.type)
        {
        case Action.ADD_PROGRESS:
            sum = state.progressCount + action.value;
            newCardInstance = Object.assign({}, state);
            newCardInstance.progressCount = Math.max(0, sum);
            return newCardInstance;
        case Action.ADD_RESOURCES:
            sum = state.resourceCount + action.value;
            newCardInstance = Object.assign({}, state);
            newCardInstance.resourceCount = Math.max(0, sum);
            return newCardInstance;
        case Action.ADD_WOUNDS:
            sum = state.woundCount + action.value;
            newCardInstance = Object.assign({}, state);
            newCardInstance.woundCount = Math.max(0, sum);
            return newCardInstance;
        case Action.SET_EXHAUSTED:
            newCardInstance = Object.assign({}, state);
            newCardInstance.isExhausted = action.isExhausted;
            return newCardInstance;
        case Action.SET_QUESTING:
            newCardInstance = Object.assign({}, state);
            newCardInstance.isQuesting = action.isQuesting;
            return newCardInstance;
        default:
            LOGGER.warn("Reducer.cardInstance: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.cardInstances = function(state, action)
    {
        // Here state is state.cardInstances

        LOGGER.debug("rootReducer() type = " + action.type);

        var newCardInstances;

        switch (action.type)
        {
        case Action.ADD_CARD_INSTANCES:
            newCardInstances = Object.assign({}, state);
            action.cardInstances.forEach(function(cardInstance)
            {
                newCardInstances[cardInstance.id] = cardInstance;
            });
            return newCardInstances;
        case Action.ADD_PROGRESS:
        case Action.ADD_RESOURCES:
        case Action.ADD_WOUNDS:
        case Action.SET_EXHAUSTED:
        case Action.SET_QUESTING:
            var oldCardInstance = state[action.cardInstanceId];
            newCardInstances = Object.assign({}, state);
            newCardInstances[action.cardInstanceId] = Reducer.cardInstance(oldCardInstance, action);
            return newCardInstances;
        default:
            LOGGER.warn("Reducer.cardInstances: Unhandled action type: " + action.type);
            return state;
        }
    };

    Reducer.root = function(state, action)
    {
        LOGGER.debug("rootReducer() type = " + action.type);

        if (typeof state === 'undefined') { return Store.InitialState(); }

        var newCardInstances;
        var newAgents, newStagingAreaIds, index, newFirstAgentId, newEncounterDiscardIds, newAgentIds;

        switch (action.type)
        {
        case Action.ADD_THREAT_LEVEL:
        case Action.ADD_TO_PLAY_AREA:
        case Action.DISCARD_PLAYER_CARD:
        case Action.DRAW_PLAYER_CARD:
        case Action.REMOVE_FROM_HAND:
            return Object.assign({}, state,
            {
                agents: Reducer.agents(state.agents, action),
            });
        case Action.ADD_CARD_INSTANCES:
        case Action.ADD_PROGRESS:
        case Action.ADD_RESOURCES:
        case Action.ADD_WOUNDS:
        case Action.SET_EXHAUSTED:
        case Action.SET_QUESTING:
            return Object.assign({}, state,
            {
                cardInstances: Reducer.cardInstances(state.cardInstances, action),
            });
        case Action.DISCARD_ENGAGED_CARD:
            newAgents = Reducer.agents(state.agents, action);
            newEncounterDiscardIds = state.encounterDiscardIds.slice();
            newEncounterDiscardIds.push(action.cardInstanceId);
            return Object.assign({}, state,
            {
                encounterDiscardIds: newEncounterDiscardIds,
                agents: newAgents,
            });
        case Action.DRAW_ENCOUNTER_CARD:
            var newEncounterDeckIds = state.encounterDeckIds.slice();
            newStagingAreaIds = state.stagingAreaIds.slice();
            newStagingAreaIds.push(newEncounterDeckIds.shift());
            return Object.assign({}, state,
            {
                encounterDeckIds: newEncounterDeckIds,
                stagingAreaIds: newStagingAreaIds,
            });
        case Action.DRAW_QUEST_CARD:
            var newQuestDiscardIds = state.questDiscardIds.slice();
            if (state.activeQuestId !== undefined)
            {
                newQuestDiscardIds.push(state.activeQuestId);
            }
            var newQuestDeckIds = state.questDeckIds.slice();
            var newQuestId = newQuestDeckIds.shift();
            return Object.assign({}, state,
            {
                questDeckIds: newQuestDeckIds,
                questDiscardIds: newQuestDiscardIds,
                activeQuestId: newQuestId,
            });
        case Action.ELIMINATE_PLAYER:
            newFirstAgentId = state.firstAgentId;
            if (newFirstAgentId === action.agentId)
            {
                index = state.agentIds.indexOf(action.agentId) + 1;
                if (index >= state.agentIds.length)
                {
                    index = 0;
                }
                newFirstAgentId = state.agentIds[index];
            }
            newAgentIds = state.agentIds.slice();
            newAgentIds.vizziniRemove(action.agentId);
            return Object.assign({}, state,
            {
                agentIds: newAgentIds,
                firstAgentId: newFirstAgentId,
            });
        case Action.ENGAGE_ENEMY:
            newAgents = Reducer.agents(state.agents, action);
            newStagingAreaIds = state.stagingAreaIds.slice();
            newStagingAreaIds.vizziniRemove(action.enemyId);
            return Object.assign({}, state,
            {
                agents: newAgents,
                stagingAreaIds: newStagingAreaIds,
            });
        case Action.INCREMENT_FIRST_PLAYER:
            index = state.agentIds.indexOf(state.firstAgentId) + 1;
            if (index >= state.agentIds.length)
            {
                index = 0;
            }
            newFirstAgentId = state.agentIds[index];
            return Object.assign({}, state,
            {
                firstAgentId: newFirstAgentId,
            });
        case Action.INCREMENT_ROUND:
            return Object.assign({}, state,
            {
                round: state.round + 1,
            });
        case Action.SET_ACTIVE_AGENT:
            return Object.assign({}, state,
            {
                activeAgentId: action.agentId,
            });
        case Action.SET_ACTIVE_LOCATION:
            newEncounterDiscardIds = state.encounterDiscardIds.slice();
            if (state.activeLocationId !== undefined)
            {
                newEncounterDiscardIds.push(state.activeLocationId);
            }
            newStagingAreaIds = state.stagingAreaIds.slice();
            newStagingAreaIds.vizziniRemove(action.locationInstanceId);
            return Object.assign({}, state,
            {
                encounterDiscardIds: newEncounterDiscardIds,
                stagingAreaIds: newStagingAreaIds,
                activeLocationId: action.locationInstanceId,
            });
        case Action.SET_ACTIVE_QUEST:
            return Object.assign({}, state,
            {
                activeQuestId: action.questInstanceId,
            });
        case Action.SET_AGENTS:
            newAgentIds = action.agents.map(function(agent)
            {
                return agent.id;
            });
            return Object.assign({}, state,
            {
                agentIds: newAgentIds,
                agents: action.agents,
            });
        case Action.SET_ENCOUNTER_DECK_IDS:
            return Object.assign({}, state,
            {
                encounterDeckIds: action.encounterDeckIds.slice(),
            });
        case Action.SET_FIRST_PLAYER:
            return Object.assign({}, state,
            {
                firstAgentId: action.agentId,
            });
        case Action.SET_PHASE:
            return Object.assign({}, state,
            {
                phaseKey: action.phaseKey,
            });
        case Action.SET_QUEST_DECK_IDS:
            return Object.assign({}, state,
            {
                questDeckIds: action.questDeckIds.slice(),
            });
        default:
            LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
            return state;
        }
    };

    return Reducer;
});
