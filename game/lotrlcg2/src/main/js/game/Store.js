define([ "Phase", "game/Agent", "game/PlayerDeckBuilder", "game/ScenarioDeckBuilder" ], function(Phase, Agent,
        PlayerDeckBuilder, ScenarioDeckBuilder)
{
    "use strict";
    var Store = {};

    Store.InitialState = function()
    {
        // Setup.
        // 1. Shuffle Decks
        var playerDeck0 = PlayerDeckBuilder.BeornsPath1DeckBuilder.buildDeck();
        var playerDeck1 = PlayerDeckBuilder.BeornsPath2DeckBuilder.buildDeck();
        var heroes0 = playerDeck0.heroInstances();
        var heroes1 = playerDeck1.heroInstances();
        var playerCards0 = playerDeck0.playerInstances();
        playerCards0.vizziniShuffle();
        var playerCards1 = playerDeck1.playerInstances();
        playerCards1.vizziniShuffle();
        var scenarioDeck = ScenarioDeckBuilder.CoreSetPassageThroughMirkwoodDeckBuilder.buildDeck();
        var questDeck = scenarioDeck.questInstances();
        var encounterDeck = scenarioDeck.encounterInstances();
        encounterDeck.vizziniShuffle();

        // 2. Place Heroes and Set Initial Threat Levels
        var agents = [];
        agents.push(Agent.create(0, "Aaron", heroes0, playerCards0));
        agents.push(Agent.create(1, "Bruce", heroes1, playerCards1));

        // 3. Setup Token Bank
        // 4. Determine First Player
        // 5. Draw Setup Hand
        agents.forEach(function(agent)
        {
            for (var i = 0; i < 6; i++)
            {
                var cardInstance = agent.playerCards.shift();
                agent.hand.push(cardInstance);
            }
        });

        // 6. Set Quest Cards
        // 7. Follow Scenario Setup Instructions

        return (
        {
            agents: agents,
            questDeck: questDeck,
            encounterDeck: encounterDeck,

            round: 0,
            phaseKey: Phase.RESOURCE_START,
            activeAgentId: agents[0].id,
            firstAgentId: agents[0].id,
            activeLocation: undefined,
            activeQuest: questDeck[0],
            stagingArea: [],
        });
    };

    return Store;
});
