define([ "game/ui/EnvironmentUI" ], function(EnvironmentUI)
{
    "use strict";
    var Connector = {};

    Connector.EnvironmentUI =
    {
        mapStateToProps: function(state, ownProps)
        {
            return (
            {
                round: state.round,
                phaseKey: state.phaseKey,
                firstAgentId: state.firstAgentId,
                activeAgentId: state.activeAgentId,
                activeLocation: state.activeLocation,
                activeQuest: state.activeQuest,
                stagingArea: state.stagingArea,
                agents: state.agents,
            });
        },
    };

    return Connector;
});
