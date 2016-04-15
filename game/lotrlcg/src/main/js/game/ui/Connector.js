define([ "game/Selector" ], function(Selector)
{
    "use strict";
    var Connector = {};

    Connector.AgentUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            var agent = ownProps.agent;
            var engagementArea = Selector.resolveCardInstanceIds(state, agent.engagementAreaIds);
            var playArea = Selector.resolveCardInstanceIds(state, agent.playAreaIds);
            var hand = Selector.resolveCardInstanceIds(state, agent.handIds);

            return (
            {
                agent: agent,
                engagementArea: engagementArea,
                playArea: playArea,
                hand: hand,
            });
        },
    };

    Connector.CardAreaUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            var area = Selector.resolveCardInstanceIds(state, ownProps.cardInstanceIds);

            return (
            {
                label: ownProps.label,
                area: area,
            });
        },
    };

    Connector.CardInstanceUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            var cardInstance = state.cardInstances[ownProps.cardInstanceId];

            return (
            {
                label: ownProps.label,
                cardInstance: cardInstance,
            });
        },
    };

    Connector.EnvironmentUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            var agents = Selector.resolveAgentIds(state, state.agentIds);

            return (
            {
                round: state.round,
                phaseKey: state.phaseKey,
                activeQuestId: state.activeQuestId,
                stagingAreaIds: state.stagingAreaIds,
                agents: agents,

                activeLocationId: state.activeLocationId,
            });
        },
    };

    Connector.StatusBarUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            var activeQuest = state.cardInstances[state.activeQuestId];
            var scenarioName = (activeQuest ? activeQuest.card.encounterSet.name : " ");

            var firstAgentId = state.firstAgentId;
            var firstAgent = state.agents[firstAgentId];

            var activeAgentId = state.activeAgentId;
            var activeAgent = state.agents[activeAgentId];

            return (
            {
                scenarioName: scenarioName,
                round: state.round,
                phaseKey: state.phaseKey,
                firstAgentName: (firstAgent ? firstAgent.name : undefined),
                activeAgentName: (activeAgent ? activeAgent.name : undefined),
            });
        },
    };

    return Connector;
});
