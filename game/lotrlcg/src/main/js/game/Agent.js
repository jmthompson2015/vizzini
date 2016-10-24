define([ "game/SimpleAgent" ], function(SimpleAgent)
{
    "use strict";
    var Agent = {};

    Agent.create = function(id, name, threatLevel, heroIds, playerCardIds)
    {
        InputValidator.validateNotNull("id", id);
        InputValidator.validateNotNull("name", name);
        InputValidator.validateNotNull("threatLevel", threatLevel);
        InputValidator.validateNotNull("heroIds", heroIds);
        InputValidator.validateNotNull("playerCardIds", playerCardIds);

        return (
        {
            id: id,
            name: name,
            threatLevel: threatLevel,

            // cardInstance IDs.
            playerCardIds: playerCardIds.slice(),
            playerDiscardIds: [],

            // cardInstance IDs.
            engagementAreaIds: [],

            // cardInstance IDs.
            playAreaIds: heroIds.slice(),

            // cardInstance IDs.
            handIds: [],

            behavior: SimpleAgent,
        });
    };

    return Agent;
});
