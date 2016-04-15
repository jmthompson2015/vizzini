define([ "Phase" ], function(Phase)
{
    "use strict";
    var Store = {};

    Store.InitialState = function()
    {
        return (
        {
            round: 0,
            phaseKey: Phase.SETUP,

            // cardInstance IDs.
            questDeckIds: [],
            questDiscardIds: [],

            // cardInstance IDs.
            encounterDeckIds: [],
            encounterDiscardIds: [],

            // cardInstance ID.
            activeLocationId: undefined,

            // cardInstance ID.
            activeQuestId: undefined,

            // cardInstance IDs.
            stagingAreaIds: [],

            // agent IDs.
            agentIds: [],

            // agent ID.
            activeAgentId: undefined,

            // agent ID.
            firstAgentId: undefined,

            // ////////////////////////////////////////////////////////////////
            // Dictionaries.
            agents: {
            // id: agent
            },

            cardInstances: {
            // id: cardInstance
            },
        });
    };

    return Store;
});
